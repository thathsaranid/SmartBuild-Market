// src/components/VehicleManagement.jsx
import "../assets/css/admin-dashboard.css";
import React, { useState } from "react";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, type: "Truck", number: "NB-1234" },
    { id: 2, type: "Loader", number: "CP-5678" },
  ]);
  const [newVehicle, setNewVehicle] = useState({ type: "", number: "" });

  const handleAddVehicle = () => {
    if (!newVehicle.type || !newVehicle.number) return;
    setVehicles([
      ...vehicles,
      {
        id: vehicles.length + 1,
        type: newVehicle.type,
        number: newVehicle.number,
      },
    ]);
    setNewVehicle({ type: "", number: "" });
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="management-section">
      <h2>Vehicle Management</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Vehicle Type"
          value={newVehicle.type}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Vehicle Number"
          value={newVehicle.number}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, number: e.target.value })
          }
        />
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      </div>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.type} - {vehicle.number}
            <button onClick={() => handleDeleteVehicle(vehicle.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleManagement;
