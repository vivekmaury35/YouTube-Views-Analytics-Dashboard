# YouTube Views Analytics Dashboard 📊

![Dashboard Screenshot](website_screenshots/examplescreenshot.png)

A full-stack web application that tracks, analyzes, and visualizes YouTube video statistics in real-time. This project is the **v2 web evolution** of the original CLI-based [youtube-views-tracker](https://github.com/vivekmaury35/youtube-views-tracker).

## 🚀 Features

*   **Real-time Monitoring:** Continuously tracks views, likes, and comments for configured YouTube videos.
*   **Interactive Dashboard:** A sleek React frontend displaying modern cards, charts, and metrics.
*   **Robust Backend:** Built with FastAPI for high performance and asynchronous request handling.
*   **Smart API Rotation:** Automatically rotates through multiple Google API keys to prevent rate-limiting and quota exhaustion during continuous monitoring.
*   **Historical Tracking:** Stores data snapshots in SQLite via SQLAlchemy to calculate view velocity and gain/loss over time.

## 🛠️ Technology Stack

**Frontend:**
*   React + Vite
*   TailwindCSS (for modern, responsive styling)

**Backend:**
*   Python 3 & FastAPI
*   SQLAlchemy & SQLite DB
*   Uvicorn & Requests

## 💻 Running the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/vivekmaury35/YouTube-Views-Analytics-Dashboard.git
cd YouTube-Views-Analytics-Dashboard
```

### 2. Backend Setup (Python)
Ensure you have Python installed. You must provide your own YouTube Data API v3 keys.

```bash
# Install required Python packages
pip install -r requirements.txt

# Create your environment variables file
# Look at the .env file and add your own YouTube Data API keys separated by commas
```

Start the FastAPI server:
```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup (React/Vite)
Open a second terminal window for the frontend.

```bash
cd yt-views-frontend
npm install
npm run dev
```

The application will now be running at `http://localhost:5173`.

## 🔄 Upgrading from v1
If you are looking for the original lightweight terminal/CLI version of this tool that runs without a web server, you can find it at [vivekmaury35/youtube-views-tracker](https://github.com/vivekmaury35/youtube-views-tracker).

## 📝 License
This project is open-source and available under the MIT License.