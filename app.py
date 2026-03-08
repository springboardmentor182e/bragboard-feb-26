from flask import Flask, render_template, request, redirect

app = Flask(__name__)

leaderboard = [
    {"name": "Abarna", "score": 95},
    {"name": "John", "score": 88},
    {"name": "Priya", "score": 92}
]

@app.route('/')
def home():
    sorted_board = sorted(leaderboard, key=lambda x: x["score"], reverse=True)
    return render_template("index.html", board=sorted_board)

@app.route('/add', methods=['POST'])
def add():
    name = request.form['name']
    score = int(request.form['score'])
    leaderboard.append({"name": name, "score": score})
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)