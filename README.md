CRM-App
A modern, responsive Customer Relationship Management (CRM) web application built with React, Redux Toolkit, and Tailwind CSS. This app provides user authentication, a dynamic dashboard with data visualizations, and product management with full CRUD operations, leveraging the DummyJSON API for authentication and product data.
 
Features

Secure Authentication:

Login page with password visibility toggle using the DummyJSON Auth API (https://dummyjson.com/auth/login).
Token-based authentication with public (/login) and private routes (/dashboard, /product).
Persistent login state via localStorage.


Interactive Dashboard:

Visualizes product sales data with three Chart.js graphs (line, bar, pie).
Unique, theme-adaptive colors for each product.
Responsive design with glassmorphism UI.


Product Management:

Full CRUD operations (Create, Read, Update, Delete) for products.
Initial product data fetched from DummyJSON Products API (https://dummyjson.com/products?limit=5).
Client-side persistence of user-added products in localStorage.


Modern UI/UX:

Built with Tailwind CSS for a sleek, dark-themed interface.
Glassmorphism effects and smooth transitions.
Heroicons for intuitive icons (e.g., password toggle, navigation).


Robust Architecture:

State management with Redux Toolkit.
Client-side routing with React Router.
SPA routing configured for deployment on GitHub Pages.



Tech Stack

Frontend: React (18.2.0), React Router (6.3.0), Redux Toolkit (1.9.5), React Redux (8.0.5)
Styling: Tailwind CSS (3.3.2), Heroicons (2.0.18)
Data Visualization: Chart.js (4.3.0), React ChartJS-2 (5.2.0)
API Integration: Axios (1.4.0), DummyJSON API
Build Tool: Create React App (react-scripts@5.0.1)
Deployment: GitHub Pages, gh-pages (6.0.0)

Getting Started
Prerequisites

Node.js (v16 or higher recommended; check with node -v)
npm (v8 or higher; check with npm -v)
Git (for cloning the repository)

Installation

Clone the Repository:
git clone https://github.com/your-username/crm-app.git
cd crm-app


Install Dependencies:
npm install


Run Locally:
npm start


Opens at http://localhost:3000/crm-app (due to homepage setting).
Login with credentials: Username: emilys, Password: emilyspass (DummyJSON API).



Available Scripts

npm start: Runs the app in development mode.
npm run build: Builds the app for production to the build folder.
npm run deploy: Builds and deploys to GitHub Pages (requires gh-pages setup).
npm test: Launches the test runner.
npm run eject: Ejects from Create React App (irreversible).

Deployment
GitHub Pages

Configure package.json:

Set "homepage": "https://your-username.github.io/crm-app".
Ensure gh-pages is installed (npm install gh-pages --save-dev).


Set Base Path:

In src/index.js, set <BrowserRouter basename="/crm-app">.


SPA Routing:

Copy public/index.html to public/404.html to handle routes like /crm-app/dashboard.


Deploy:
npm run deploy


Pushes the build folder to the gh-pages branch.
Enable GitHub Pages in repository settings (Source: gh-pages, / (root)).


Access:

Visit https://your-username.github.io/crm-app after 1–10 minutes.



Troubleshooting Deployment

Blank Page: Verify homepage matches the GitHub Pages URL and check console errors (F12).
404 Errors: Ensure public/404.html exists for SPA routing.
API Issues: DummyJSON API calls should work; fallback to mocked login if CORS arises.

Project Structure
crm-app/
├── public/
│   ├── index.html
│   ├── 404.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── ProductManagement.js
│   │   ├── Navbar.js
│   │   └── PrivateRoute.js
│   ├── redux/
│   │   ├── authSlice.js
│   │   ├── productSlice.js
│   │   └── store.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
└── README.md

Built by [Krish Panchal] for a React-based CRM application demo.
