# AI FLOW MERN

A Simple Ai Mern Stack Application where users can enter a prompt , visualize the flow using React Flow

----

## Features

- AI response using OpenRouter API

- Flow Visualize using React Flow

- Save and reposne using MongoDB
- Clean UI using Tailwind CSS
- Markdown support for formatted Responses4


## Tech Stack

- Frontend: React , ReactFlow ,Tailwindcss
- Backend: Node js , Express js
- Database: MongoDB
- API: OpenRouter  (Free AI Models)


## Floder Structure

```
Frontend/ -> React Frotend
Backend/ -> Node/Express Backend
```

 ## Setup Instructions

 1. Clone Repo
 ```bash
 cd backend
npm install
```

Create `.env` file:
```
PORT = 5000
MONGOURI= mongodb+srv://tbasuchoudhury_db_user:Tanusree97@cluster0.9n6c5cu.mongodb.net/?appName=Cluster0  || mongodb://localhost:27017/ai-mern
API_KEY = your_openrouter_api_key
```

Run Backend:
``` bash
npm run dev
```
3.Frontend Setup
```
bash
cd frontend
npm run dev
```
### API EndPoint

### ASK AI
```
POST /api/ai/ask-ai

```
Body:
```JSON
{
    "prompt":"your prompt"
}
```
---

### Save Chat


```
POST /api/ai/save


Body:
```JSON
{
    "prompt":question,
    "answer":"answer
}

```

---

## 📸 Screenshots



---

## 🎯 Future Improvements

- Authentication system
- Chat history UI
- Dark mode
- Deployment

---

## 👩‍💻 Author

Tanusree Basu Choudhury


 

