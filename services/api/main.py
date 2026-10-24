from fastapi import FastAPI

app = FastAPI(title="VANTAGE API")


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}