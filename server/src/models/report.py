from extensions import db

class Report(db.Model):
    __tablename__ = "report"   # ✅ IMPORTANT

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    reporter = db.Column(db.String(100))
    reported_user = db.Column(db.String(100))
    status = db.Column(db.String(50), default="PENDING")
    priority = db.Column(db.String(50), default="LOW")
    category = db.Column(db.String(100))
    content = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "reporter": self.reporter,
            "reported_user": self.reported_user,
            "status": self.status,
            "priority": self.priority,
            "category": self.category,
            "content": self.content,
        }