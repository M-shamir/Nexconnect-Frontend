# 💬 Nexconnect

A simple real-time chat application where users can create and join chat rooms.  
Built using **React.js** for the frontend and **Django** (with Django Channels) for the backend.

---

## 🔧 Tech Stack

- **Frontend**: React.js, WebSocket API
- **Backend**: Django, Django Channels, Django REST Framework
- **Database**:  PostgreSQL
- **Real-time**: WebSockets via Django Channels

---

## 🚀 Features

- User authentication (login/signup)
- Create chat rooms
- Join existing chat rooms
- Real-time messaging using WebSockets

---

## 📦 Setup Instructions

### 1. Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
