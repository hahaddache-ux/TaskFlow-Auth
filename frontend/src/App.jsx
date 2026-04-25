import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'

function App() {
  const [page, setPage] = useState(
    localStorage.getItem('token') ? 'tasks' : 'login'
  )

  return (
    <div>
      {page === 'login' && (
        <Login onLogin={() => setPage('tasks')} />
      )}
      {page === 'register' && (
        <Register onRegister={() => setPage('login')} />
      )}
      {page === 'tasks' && (
        <Tasks onLogout={() => setPage('login')} />
      )}

      {/* Navigation Login / Register */}
      {page !== 'tasks' && (
        <div className="text-center mt-4">
          {page === 'login' ? (
            <p className="text-sm text-gray-500">
              Pas de compte ?{' '}
              <span
                onClick={() => setPage('register')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                S'inscrire
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Déjà un compte ?{' '}
              <span
                onClick={() => setPage('login')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Se connecter
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default App