// src/components/WorkerManagement.jsx
import "../assets/css/admin-dashboard.css";
import { useState } from "react";

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Kasun", role: "Mason" },
    { id: 2, name: "Amal", role: "Electrician" },
  ]);
  const [newWorker, setNewWorker] = useState({ name: "", role: "" });

  const handleAddWorker = () => {
    if (!newWorker.name || !newWorker.role) return;
    setWorkers([
      ...workers,
      { id: workers.length + 1, name: newWorker.name, role: newWorker.role },
    ]);
    setNewWorker({ name: "", role: "" });
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter((worker) => worker.id !== id));
  };

  return (
    <div className="management-section">
      <h2>Worker Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Worker Name"
          value={newWorker.name}
          onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newWorker.role}
          onChange={(e) => setNewWorker({ ...newWorker, role: e.target.value })}
        />
        <button onClick={handleAddWorker}>Add Worker</button>
      </div>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            {worker.name} - {worker.role}
            <button onClick={() => handleDeleteWorker(worker.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerManagement;
