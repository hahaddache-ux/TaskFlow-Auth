import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "../api/axios";

function Tasks({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });
      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Bonjour, {user?.name} 👋
        </h1>
        <Button variant="danger" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>

      {/* Formulaire Ajout */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Nouvelle tâche</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-3">
          <Input
            label="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la tâche"
          />
          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Ajout..." : "Ajouter"}
          </Button>
        </form>
      </div>

      {/* Liste des tasks */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">
            Aucune tâche pour le moment
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm">
              {editId === task.id ? (
                // Mode édition
                <div className="flex flex-col gap-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="pending">pending</option>
                    <option value="done">done</option>
                  </select>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(task.id)}>
                      Sauvegarder
                    </Button>
                    <Button variant="secondary" onClick={() => setEditId(null)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                // Mode affichage
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        task.status === "done"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(task)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Tasks;
