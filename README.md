# LabFinder 🔬

A full-stack web application that allows users to search for diagnostic lab tests in a specific pincode and compare available providers based on the true lowest final price.

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
