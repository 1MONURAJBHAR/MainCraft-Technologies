import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch Tasks
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${API_URL}/task`)
      .then((res) => setTasks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Add Task
  const addTask = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/add`, { text });
      setTasks((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update Task
  const updateTask = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/update/${id}`, {
        text: editText,
      });

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">📝 MERN To-Do</h1>
        <p className="subtitle">Stay productive, stay focused</p>

        {/* Input */}
        <div className="input-group">
          <input
            type="text"
            value={text}
            placeholder="What do you want to do?"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* List */}
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks yet 🚀</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className="task">
                {editingId === task._id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                    />

                    <div className="actions">
                      <button
                        className="save-btn"
                        onClick={() => updateTask(task._id)}
                      >
                        Save
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>

                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingId(task._id);
                          setEditText(task.text);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
