# 🏥 Hospital Management System

A **full‑stack MERN (MongoDB, Express.js, React.js, Node.js)** based Hospital Management System designed to streamline patient appointment booking and simplify administrative operations such as doctor onboarding, appointment approval, and patient data management. The system focuses on clarity, role separation, and scalability, making it suitable for real‑world hospital workflows.

---

## 🎯 Project Overview

This application provides:

* A **public-facing patient interface** for appointment requests.
* A **secure admin dashboard** to manage doctors and patient appointments.

The architecture follows clean separation between frontend and backend, enabling maintainability and future expansion (e.g., role-based access, analytics, notifications).

---

## ✨ Key Features

### 👤 Patient Module

* **Quick Appointment Registration**
  Patients can submit essential details directly from the homepage to request an appointment.

* **Simple & Accessible UI**
  Minimal form design ensures ease of use for all age groups.

---

### 🧑‍⚕️ Admin Module

* **Doctor Management**

  * Register new doctors
  * View all doctors with specialization details
  * Manage doctor availability

* **Appointment Management**

  * View incoming appointment requests
  * Approve or reject appointments based on doctor availability
  * Maintain structured appointment records

* **Centralized Dashboard**
  A single interface to monitor doctors, patients, and appointments efficiently.

---

### 🔐 System Design & Reliability

* **Secure Backend APIs** built with Express.js
* **Scalable Architecture** following REST principles
* **MongoDB Data Modeling** for flexible schema management
* **Separation of Concerns** between UI, business logic, and data layer

---

## 🖼️ Application Screenshots

### 1️⃣ Homepage – Patient Appointment Registration

![Homepage](Project_Screenshots/HMS_Homepage.png)
## To Take Appointment From Doctors
![Homepage](Project_Screenshots/HMS_Appointment.png)


### 2️⃣ Admin Dashboard – Appointment Management

![Admin Dashboard](Project_Screenshots/HMS_Admin.png)



## 🚀 Live Deployment

* **Patient Homepage**
  🔗 [https://hms-careconnect.netlify.app/](https://hms-careconnect.netlify.app/)

* **Admin Dashboard**
  🔗 [https://hms-admin-careconnect.netlify.app/](https://hms-admin-careconnect.netlify.app/)

---

## 🛠️ Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (NoSQL)

### Deployment

* Netlify (Frontend)
* Backend: Configurable for Render / Railway / Heroku

---

## 📂 Project Structure (High Level)

```
hospital-management-system/
│
├── frontend/          # React frontend
│   └── src/
│       └── Screenshots/
│
├── backend/           # Node + Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── config/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v16+ recommended)
* MongoDB (local or cloud)
* Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Anuj-jnv/Hospital-Management-Syst.git
cd Hospital-Management-Syst
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 3️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and the backend on the configured server port.

---

## 📈 Future Enhancements

* Role‑based authentication (Admin / Doctor / Patient)
* Doctor‑wise appointment slots
* Email/SMS notifications
* Appointment history & analytics
* Improved UI with dashboard insights

---

## 📌 Conclusion

This Hospital Management System demonstrates a **production‑ready MERN application** with real‑world use cases, emphasizing clean architecture, modular design, and practical admin workflows. It serves as a strong foundation for further enhancements and enterprise‑level healthcare solutions.
