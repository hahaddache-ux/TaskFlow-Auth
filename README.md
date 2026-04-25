# TaskFlow Auth 🚀

Application Full Stack de gestion de tâches avec authentification JWT.
<img width="540" height="352" alt="image" src="https://github.com/user-attachments/assets/746e7938-19a5-4216-ae55-93cfe708051c" />

<img width="1343" height="581" alt="image" src="https://github.com/user-attachments/assets/00089049-7523-4d6a-a471-ede09bd05b97" />


## Technologies

**Backend**
- Node.js + Express
- MySQL (mysql2)
- JWT (jsonwebtoken)
- Bcrypt (bcryptjs)
- CORS + Dotenv

**Frontend**
- React + Vite
- Tailwind CSS v3
- Axios

## Structure du projet
TaskFlow_Auth/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
└── src/
├── api/
│   └── axios.js
├── components/
│   ├── Button.jsx
│   └── Input.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Tasks.jsx
└── App.jsx

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Créer un compte |
| POST | /api/auth/login | Se connecter |
| POST | /api/auth/logout | Se déconnecter |

### Tasks (protégées)
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Toutes les tâches |
| GET | /api/tasks/:id | Une tâche |
| POST | /api/tasks | Créer une tâche |
| PUT | /api/tasks/:id | Modifier une tâche |
| DELETE | /api/tasks/:id | Supprimer une tâche |

## Features

- ✅ Register / Login / Logout
- ✅ JWT Authentication
- ✅ Password hashé avec Bcrypt
- ✅ Routes protégées (401 sans token)
- ✅ CRUD complet des tâches
- ✅ Chaque utilisateur voit uniquement ses tâches
- ✅ Inline editing
- ✅ Composants réutilisables (Button, Input)
- ✅ State management avec useState + useEffect
