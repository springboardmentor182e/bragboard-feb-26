from fastapi import FastAPI

app = FastAPI()

@app.post("/login")
def login():
    return {"access_token":"sampletoken"}

@app.post("/register")
def register():
    return {"message":"User created"}