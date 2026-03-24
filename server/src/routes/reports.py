from flask_restx import Namespace, Resource
from models.report import Report
from extensions import db
from flask import request

api = Namespace("reports", description="Reports operations")

@api.route("/")
class ReportList(Resource):

    def get(self):
        try:
            reports = Report.query.all()
            return [r.to_dict() for r in reports]
        except Exception as e:
            print(e)
            return {"error": str(e)}, 500

    def post(self):
        try:
            data = request.json

            report = Report(
                title=data["title"],
                reporter=data["reporter"],
                reported_user=data["reported_user"],
                status=data.get("status", "PENDING"),
                priority=data.get("priority", "MEDIUM"),
                category=data.get("category"),
                content=data.get("content"),
            )

            db.session.add(report)
            db.session.commit()

            return report.to_dict(), 201

        except Exception as e:
            print(e)
            return {"error": str(e)}, 500


@api.route("/<int:id>")
class ReportDetail(Resource):

    def get(self, id):
        report = Report.query.get_or_404(id)
        return report.to_dict()

    def put(self, id):
        data = request.json
        report = Report.query.get_or_404(id)

        report.title = data.get("title", report.title)
        report.status = data.get("status", report.status)

        db.session.commit()
        return report.to_dict()

    def delete(self, id):
        report = Report.query.get_or_404(id)
        db.session.delete(report)
        db.session.commit()
        return {"message": "Deleted"}