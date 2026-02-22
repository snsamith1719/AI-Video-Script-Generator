# AI Prompt Intelligence & Video Script Generator
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/snsamith1719/AI-Video-Script-Generator)

This is a full-stack web application designed to transform simple video ideas into detailed, production-ready cinematic scripts. It leverages the Groq API with the Llama 3.3 model to understand, enhance, and generate content based on user prompts.

## Features

*   **Prompt Intelligence**: Enter a basic idea for a video.
*   **Automatic Option Extraction**: The application intelligently extracts key parameters from your prompt, such as duration, language, video format (size), platform, and category.
*   **Prompt Enhancement**: Refines and structures your initial idea into a more detailed prompt, optimized for AI video generation tools.
*   **Cinematic Script Generation**: Generates a complete, scene-by-scene video script including visual descriptions, narration, camera directions, mood, and emotional tone.
*   **Interactive UI**: A clean and responsive interface built with React and Tailwind CSS allows for easy interaction and modification of the generated content.

## Tech Stack

*   **Frontend**:
    *   **Framework**: React (Vite)
    *   **Styling**: Tailwind CSS
    *   **Animations**: Framer Motion
    *   **HTTP Client**: Axios

*   **Backend**:
    *   **Framework**: FastAPI (Python)
    *   **AI Integration**: Groq API (`llama-3.3-70b-versatile` model)
    *   **Data Validation**: Pydantic
    *   **Server**: Uvicorn

## Project Structure

The repository is organized into two main directories:

*   `frontend/`: Contains the React application for the user interface.
*   `backend/`: Contains the FastAPI application that communicates with the Groq API.

```
/
├── backend/
│   ├── config.py
│   ├── groq_agent.py
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── package.json
```

## Local Setup and Installation

To run this project on your local machine, follow these steps.

### Prerequisites

*   Python 3.8+
*   Node.js and npm
*   A Groq API key

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/snsamith1719/ai-video-script-generator.git
    cd ai-video-script-generator/backend
    ```

2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add your Groq API key:
    ```
    GROQ_API_KEY="your_groq_api_key_here"
    ```

5.  **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    The frontend expects the backend API URL to be available as an environment variable. The code uses `import.meta.env.VITE_API_URL`. You can create a `.env.local` file in the `frontend` directory:
    ```
    VITE_API_URL="http://127.0.0.1:8000"
    ```

4.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## API Endpoints

The backend provides the following API endpoints:

*   **`GET /health`**
    *   A health check endpoint to confirm the server is running.
    *   **Response**: `{"status": "healthy"}`

*   **`POST /extract-options`**
    *   Extracts video parameters from a user prompt.
    *   **Request Body**: `{"prompt": "A short video for YouTube..."}`
    *   **Response Body**: `{"duration": "short", "platform": "YouTube", ...}`

*   **`POST /enhance-prompt`**
    *   Enhances the original prompt based on specified options.
    *   **Request Body**: `{"original_prompt": "...", "options": {"duration": "1 minute", ...}}`
    *   **Response Body**: `{"enhanced_prompt": "An enhanced, structured prompt..."}`

*   **`POST /generate-script`**
    *   Generates a full cinematic script from a prompt.
    *   **Request Body**: `{"prompt": "An enhanced prompt..."}`
    *   **Response Body**: `{"script": "Scene 1..."}`