from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

@app.get("/")
def home():
    return {"message": "VoiceGPT AI Backend Running"}

@app.post("/ask")
async def ask_ai(data: dict):
    prompt = data["prompt"]

    completion = client.chat.completions.create(
        model="meta-llama/llama-3-8b-instruct",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return {"response": completion.choices[0].message.content}


