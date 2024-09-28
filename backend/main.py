from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from config import settings

app = FastAPI()
co = cohere.Client(api_key=settings.COHERE_API_KEY)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class SearchQuery(BaseModel):
    q: str = Field(..., min_length=1, max_length=100, description="The search phrase")

@app.get("/")
async def root():
    return {"message": "Welcome to the search API"}

@app.get("/search")
async def search(query: SearchQuery):
    # Placeholder for search implementation
    return {"results": "Search results will be implemented here"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
