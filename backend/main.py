from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message" : "Notion Clone Backend is running !!"}