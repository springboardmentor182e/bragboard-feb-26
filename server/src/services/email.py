import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.sender_email = os.getenv("SENDER_EMAIL", "")
        self.sender_password = os.getenv("SENDER_PASSWORD", "")
        self.use_mock = os.getenv("EMAIL_MOCK_MODE", "false").lower() == "true"

    def send_otp_email(self, recipient_email: str, otp: str, user_name: str = "User") -> bool:
        """
        Send OTP email to the recipient.
        
        Args:
            recipient_email: Email address to send OTP
            otp: 6-digit OTP code
            user_name: User's name for personalization
            
        Returns:
            bool: True if email sent successfully, False otherwise
        """
        
        if self.use_mock:
            print(f"\n🎯 MOCK EMAIL MODE ACTIVE 🎯")
            print(f"📧 OTP Email would be sent to: {recipient_email}")
            print(f"🔐 OTP Code: {otp}")
            print(f"👤 User Name: {user_name}")
            print(f"⏰ Valid for 15 minutes\n")
            logger.info(f"📧 MOCK EMAIL MODE: OTP for {recipient_email}: {otp}")
            return True

        try:
            subject = "BragBoard - Password Reset OTP"
            
            # HTML email template
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px;">
                        <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
                        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Hi {user_name},</p>
                        
                        <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
                            We received a request to reset your password. Use the code below to reset your password.
                        </p>
                        
                        <div style="background-color: #f9f9f9; border: 2px dashed #ddd; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 30px;">
                            <p style="color: #999; margin: 0; font-size: 12px; margin-bottom: 10px;">YOUR OTP CODE</p>
                            <p style="color: #6366f1; font-size: 32px; font-weight: bold; letter-spacing: 2px; margin: 0;">{otp}</p>
                            <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">Valid for 15 minutes</p>
                        </div>
                        
                        <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
                            ⏰ This code expires in <strong>15 minutes</strong>.
                        </p>
                        
                        <p style="color: #666; font-size: 14px; margin-bottom: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
                            If you didn't request a password reset, please ignore this email or contact support.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                        
                        <p style="color: #999; font-size: 12px; text-align: center;">
                            © 2026 BragBoard. All rights reserved.
                        </p>
                    </div>
                </body>
            </html>
            """
            
            # Create message
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = self.sender_email
            message["To"] = recipient_email
            
            # Attach HTML body
            message.attach(MIMEText(html_body, "html"))
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.send_message(message)
            
            logger.info(f"✅ OTP email sent successfully to {recipient_email}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Failed to send OTP email to {recipient_email}: {str(e)}")
            return False


# Create singleton instance
email_service = EmailService()
