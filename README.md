🕵️‍♂️ Live Search ScraperA real-time web scraping application that fetches search results programmatically using a headless browser. This project demonstrates advanced DOM manipulation, backend API development, and modern UI design with glassmorphism and interactive cursor effects.(Replace this link with an actual screenshot of your site once deployed!)🚀 FeaturesReal-Time Scraping: Launches a headless Chromium instance on-demand to fetch live data via Puppeteer.Anti-Bot Strategy: Targets specific HTML-only endpoints to ensure reliability and speed without triggering CAPTCHAs.Modern UI/UX: Features a stunning Glassmorphism design, parallax space background, and interactive cursor glow effects.REST API: Custom Node.js backend that serves scraped JSON data to the frontend.Responsive Design: Works seamlessly across desktop and mobile devices.🛠️ Tech StackFrontend: HTML5, CSS3 (CSS Variables, Backdrop Filter), JavaScript (ES6+).Backend: Node.js, Express.js.Automation: Puppeteer (Headless Chrome Automation).Development: Vite, Nodemon.⚙️ Installation & Local SetupFollow these steps to run the project locally on your machine.1. Clone the Repositorygit clone https://github.com/yourusername/search-scraper.git
cd search-scraper
2. Backend SetupThe backend runs the Puppeteer engine on port 4000.cd backend
# Install dependencies (Express, Puppeteer, Cors)
npm install

# Start the backend server
npm start
You should see: Server is running on http://localhost:40003. Frontend SetupOpen a new terminal window, navigate to the frontend folder, and start the dev server.cd frontend
# Install dependencies
npm install

# Start the local development server
npm run dev
Open the URL provided (usually http://localhost:5173 or http://127.0.0.1:8080) to view the app.📂 Project Structure├── backend/
│   ├── index.js         # Express API entry point
│   ├── scraper.js       # Puppeteer logic & DOM selectors
│   └── package.json     # Backend dependencies
└── frontend/
    ├── index.html       # Main UI structure
    ├── style.css        # Glassmorphism styling & Cursor effects
    ├── script.js        # Frontend logic & API integration
    └── package.json     # Frontend scripts
💡 Implementation DetailsThe Scraping EngineThe app uses Puppeteer to control a headless Chrome browser. When a user searches:The browser navigates to html.duckduckgo.com.It programmatically types the query and submits the form.It waits for the DOM to render specific .result classes.It extracts the Title, Link, and Snippet text and returns it as JSON.Why DuckDuckGo?You might notice this scraper targets DuckDuckGo instead of Google. This is a deliberate architectural choice for this portfolio demonstration. Major search engines like Google utilize aggressive anti-bot systems (CAPTCHAs) that require complex IP rotation networks to bypass. Using DuckDuckGo's HTML version allows this project to remain fast, reliable, and free while still demonstrating the core concepts of web scraping.🤝 ContributingContributions, issues, and feature requests are welcome! Feel free to check the issues page.📝 LicenseThis project is MIT licensed.
