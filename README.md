# Internship Finder (InternLink)

## 📌 Project Description
Internship Finder is a web application that helps students find internships, explore companies, and apply for positions online.
The platform solves the problem of scattered internship information by providing a centralized system for searching and applying.

---

## 🎯 Project Goal
The main goal of this project is to create a full-stack web application using:
* Angular (Frontend)
* Django + Django REST Framework (Backend)

---

## 👥 Team Members
* Azhar — Backend Developer
* Aruzhan — Frontend Developer
* Dariya — Integration & Presentation

---

## ⚙️ Technologies Used

### Frontend:
* Angular 17
* TypeScript 5
* HTML/CSS

### Backend:
* Python 3.11
* Django 4.2
* Django REST Framework 3.15
* SQLite

### Other:
* GitHub
* Postman

---

## 🧩 Features

### Authentication:
* User registration
* User login
* Token-based authentication
* Logout

### Internship Management:
* View internships
* Create internship
* Delete internship
* View details

### Applications:
* Apply to internship
* View my applications

---

## 🗂️ Project Structure

### Backend:
* Models: Company, Internship, Application, Review
* Serializers: Serializer & ModelSerializer
* Views: FBV & CBV
* API endpoints

### Frontend:
* Pages:
  * Login
  * Register
  * Internship List
  * Internship Detail
  * Create Internship
  * My Applications
* Services for API communication
* Routing between pages

---

## 🔗 API Endpoints (examples)
* POST /api/register/
* POST /api/login/
* GET /api/internships/
* POST /api/internships/
* POST /api/applications/

---

## 🚀 How to Run the Project

### Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend:
```bash
cd frontend
npm install
ng serve
```

---

## 📬 Postman Collection
All API requests are available in the Postman collection included in the repository.

---

## 💡 Conclusion
This project demonstrates a full-stack web application with authentication, CRUD operations, and API integration between frontend and backend.

---

## 🔗 GitHub Repository
https://github.com/dariyanaz/project-internlink