# LabFinder 🔬

A full-stack web application that allows users to search for diagnostic lab tests in a specific pincode and compare available providers based on the true lowest final price.

Live URL :
Frontend : https://lab-finder-seven.vercel.app/
Backend : http://labfinders.onrender.com/

## Features

- Search for laboratory tests by name
- Search by pincode
- Filter providers based on pincode availability
- Search both standalone tests and health packages
- Detect tests included inside health packages
- Calculate the true final price
- Sort results from lowest to highest final price
- Display MRP and offer price
- Display home collection charges
- Display report turnaround time
- Show NABL certification badge
- Responsive and mobile-friendly UI

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- REST API
- JSON mock database

---

## Project Structure

```text
LabFinder/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   │   └── labs.json
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md

```
Thinking Question Answere
Scraper Architecture: I would first use official APIs or permitted data sources wherever available and respect the website's robots.txt and terms of service. For permitted scraping, I would use a queue-based worker architecture with controlled, rate-limited requests per domain instead of sending a large number of requests at once. I would use caching and incremental crawling to avoid repeatedly requesting pages whose prices have not changed, along with exponential backoff when temporary failures occur. The collected data would be normalized into a common schema and stored with price history so the application can continue serving cached results if a source is temporarily unavailable. I would also monitor request failures, response times, and parsing errors so changes to individual sources can be detected and handled without affecting the entire system.
