from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from extensions import db
from routes.reports import api as reports_ns
from dotenv import load_dotenv
import os

# ✅ LOAD .env
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

# ✅ CREATE APP
app = Flask(__name__)

# ✅ ENABLE CORS (for React frontend)
CORS(app, resources={r"/*": {"origins": "*"}})

# ✅ DATABASE CONFIG
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("❌ DATABASE_URL not found. Check your .env file!")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ✅ INIT DB
db.init_app(app)

# ✅ API SETUP
api = Api(
    app,
    title="Reports API",
    version="1.0",
    description="Reports Management Backend API",
)

api.add_namespace(reports_ns, path="/api/reports")

# ✅ HOME ROUTE (health check)
@app.route("/")
def home():
    return {"message": "Backend running 🚀"}

# ✅ RUN SERVER
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # create tables if not exist

    app.run(
        debug=True,
        host="0.0.0.0",   # 🔥 IMPORTANT (fix connection issues)
        port=5000
    )