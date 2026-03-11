# VoiceGPT – AI Voice Assistant

VoiceGPT is a voice-enabled AI assistant that allows users to interact with a large language model using both text and speech.

## 🚀 Live Demo

Frontend (App):
https://voicegpt-ai-voice-assistant.netlify.app

Backend API:
https://voicegpt-ai-voice-assistant.onrender.com

API Docs (Swagger):
https://voicegpt-ai-voice-assistant.onrender.com/docs

## Works on Chrome Browser

## Features

- Voice input using Speech Recognition
- AI-powered responses using LLM
- Text-to-speech voice replies
- Real-time conversational interface
- Loading indicator while AI processes queries
- Stop speech functionality
- Supports both voice and text prompts

## Tech Stack

Frontend
- React
- Vite
- Web Speech API

Backend
- FastAPI
- OpenRouter API
- Llama 3 Model

## Project Structure


voicegpt-ai-assistant
├── backend
│ └── server.py
├── frontend
│ └── src
│ └── App.jsx
├── README.md


## Setup

### Backend


cd backend
pip install -r requirement.txt
uvicorn server:app --reload


### Frontend


cd frontend
npm install
npm run dev


## Environment Variables

Create `.env` file:


OPENROUTER_API_KEY=your_api_key_here


## Future Improvements

- Chat history interface
- Better UI design
- Mobile optimization
- Wake word detection
