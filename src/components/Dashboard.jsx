import { Button, TextField, Select, MenuItem } from "@mui/material";
import "./Dashboard.css";
import { LuSearch } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineSensorOccupied } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";
import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [evoltData, setEvoltData] = useState({
    serialNumber: "",
    state: "",
    batteryLevel: "",
    weight: ""
  });
  const [evolts, setEvolts] = useState([]);
  const [medications, setMedications] = useState([]);
  const [selectedEvolt, setSelectedEvolt] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [medicationData, setMedicationData] = useState({
    name: "",
    weight: "",
    code: "",
    image: "" // image URL field
  });
  
  const [error, setError] = useState("");

  // Static options for weight and state
  const weightOptions = ["LIGHTWEIGHT", "MIDDLEWEIGHT", "HEAVYWEIGHT", "CRUISEWEIGHT"];
  const stateOptions = ["IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING"];

  // Load eVOLT and medication data on mount
  useEffect(() => {
    axios
      .get("/api/evtols")
      .then((response) => setEvolts(response.data.evolts))
      .catch((error) => setError(error.message));

    // Fetch medication data
    if (selectedEvolt) {
      checkBatteryLevel(selectedEvolt);
      loadMedications(selectedEvolt);
    }
  }, [selectedEvolt]);

  // Check battery level
  const checkBatteryLevel = (serialNumber) => {
    axios
      .get(`/api/evtols/battery-check/${serialNumber}`)
      .then((response) => setBatteryLevel(response.data.batteryLevel))
      .catch((error) => setError(error.message));
  };

  // Load medications for selected eVOLT
  const loadMedications = (serialNumber) => {
    axios
      .get(`/api/evtols/medications/${serialNumber}`)
      .then((response) => setMedications(response.data.medications))
      .catch((error) => setError(error.message));
  };

  // Handle medication form submission
  const handleLoadMedication = () => {
    if (batteryLevel < 25) {
      setError("Battery level is too low to load medications!");
      return;
    }
  
    axios
      .post(`/api/evtols/load-medication/${selectedEvolt}`, medicationData)
      .then(() => {
        setMedications([...medications, medicationData]);
        setError("");
  
        Swal.fire({
          title: "Success!",
          text: "Medication loaded successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        // Reset form after success
        setMedicationData({
          name: "",
          weight: "",
          code: "",
          image: "",
        });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: "Failed to load medication.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  // Handle eVOLT registration
  const handleRegisterEVOLT = () => {
    const { serialNumber, state, batteryLevel, weight } = evoltData;
  
    // Convert batteryLevel to a number
    const batteryLevelInt = Number(batteryLevel);
    if (isNaN(batteryLevelInt)) {
      Swal.fire({
        title: "Error",
        text: "Battery level must be a number.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    axios
      .post("/api/evtols/register", { serialNumber, state, batteryLevel: batteryLevelInt, weight })
      .then((response) => {
        setEvolts([...evolts, response.data.evolt]);
        setError("");
  
        Swal.fire({
          title: "Success!",
          text: "E-volt registered successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        // Reset only the E-volt form fields
        setEvoltData({
          serialNumber: "",
          state: "",
          batteryLevel: "",
          weight: "",
        });
  
        setTimeout(() => checkBatteryLevel(serialNumber), 500);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: "Failed to register E-volt.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  

  const batteryerror = "Cannot load evolt because battery is too low";
  const batteryClass = batteryLevel < 25 ? "low" : "";

  // Dynamically calculate the data for the charts
  const lineChartData = [
    { name: "Jan", uv: evolts.length * 100, pv: evolts.length * 500, amt: evolts.length * 1000 },
    { name: "Feb", uv: evolts.length * 120, pv: evolts.length * 600, amt: evolts.length * 1100 },
    { name: "Mar", uv: evolts.length * 150, pv: evolts.length * 700, amt: evolts.length * 1200 },
    { name: "Apr", uv: evolts.length * 180, pv: evolts.length * 800, amt: evolts.length * 1300 },
    { name: "May", uv: evolts.length * 200, pv: evolts.length * 900, amt: evolts.length * 1400 },
    { name: "Jun", uv: evolts.length * 250, pv: evolts.length * 1000, amt: evolts.length * 1500 }
  ];

  const barChartData = [
    { name: "Q1", value: evolts.length * 200 },
    { name: "Q2", value: evolts.length * 300 },
    { name: "Q3", value: evolts.length * 400 },
    { name: "Q4", value: evolts.length * 500 }
  ];

  return (
    <div className="main-dashboard">
      <div className="left-dash">
        <h1 className="welcome">Welcome Admin</h1>
        <div className="top-icons">
          <p className="search-icon"><LuSearch /></p>
          <p className="search-icon"><FaRegBell /></p>
        </div>

        <div className="numbers-div">
          <div className="each-number">
            <p className="icon-number"><TbDrone />  {evolts.length}</p>
            <p className="deployed">Fully deployed E-volts</p>
          </div>

          <div className="each-number">
            <p className="icon-number"><AiOutlineMedicineBox />  {medications.length}</p>
            <p className="deployed">Totally loaded medications</p>
          </div>

          <div className="each-number">
            <p className="icon-number"><MdOutlineSensorOccupied />  20</p>
            <p className="deployed">Totally E-volts booked</p>
          </div>
        </div>

        <div className="line-and-bar">
          <div className="line">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bar">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {selectedEvolt && medications.length > 0 && (
          <div className="medications-display">
            <h3>Medications Loaded for {selectedEvolt}</h3>
            <div className="medications-list">
              {medications.map((medication, index) => (
                <div key={index} className="medication-item">
                  <p><strong>Name:</strong> {medication.name}</p>
                  <p><strong>Code:</strong> {medication.code}</p>
                  {medication.imageUrl && (
                    <img src={medication.imageUrl} alt={medication.name} className="medication-image" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="table-evolts">
          <h3 className="top">Top Products</h3>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Weight Limit</th>
                  <th>Weight</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {evolts.map((evolt, index) => (
                  <tr key={index}>
                    <td>
                      <div className="product-info">
                        <span>{evolt.serialNumber}</span>
                      </div>
                    </td>
                    <td>{evolt.weightLimit} kg</td>
                    <td>{evolt.weight} kg</td>
                    <td>{evolt.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="right-dash">
      <div className="form-box">
  <form className="form" onSubmit={(e) => { e.preventDefault(); handleRegisterEVOLT(); }}>
    <span className="title">Register E-volt</span>
    <span className="subtitle">Create a new Evolt</span>

    <div className="form-item">
      <label>Serial Number</label>
      <TextField
        fullWidth
        type="text"
        value={evoltData.serialNumber}  
        onChange={(e) => setEvoltData({ ...evoltData, serialNumber: e.target.value })} 
      />
    </div>

    <div className="form-item">
      <label>Weight</label>
      <Select
        fullWidth
        value={evoltData.weight} 
        onChange={(e) => setEvoltData({ ...evoltData, weight: e.target.value })}  
      >
        {weightOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>

    <div className="form-item">
      <label>State</label>
      <Select
        fullWidth
        value={evoltData.state}  
        onChange={(e) => setEvoltData({ ...evoltData, state: e.target.value })}  
      >
        {stateOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>

    <div className="form-item">
      <label>Battery Level</label>
      <TextField
        fullWidth
        type="number"
        value={evoltData.batteryLevel}
        onChange={(e) => setEvoltData({ ...evoltData, batteryLevel: e.target.value })} 
      />
    </div>

    <Button
      variant="contained"
      color="primary"
      onClick={handleRegisterEVOLT}
    >
      Register E-volt
    </Button>
    {error && <p className="error">{error}</p>}
  </form>
</div>


<StyledWrapper>
  <div className="form-box">
    <form className="form" onSubmit={handleLoadMedication}>
      <span className="title">Load Medication</span>
      <span className="subtitle">Add medications to E-volt</span>

      <div className="form-item">
        <label>Serial Number</label>
        <Select
          fullWidth
          value={selectedEvolt}
          onChange={(e) => setSelectedEvolt(e.target.value)}
        >
          {evolts.map((evolt) => (
            <MenuItem key={evolt.serialNumber} value={evolt.serialNumber}>
              {evolt.serialNumber}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="form-item">
        <label>Medication Name</label>
        <TextField
          fullWidth
          type="text"
          value={medicationData.name}
          onChange={(e) => setMedicationData({ ...medicationData, name: e.target.value })}
        />
      </div>

      <div className="form-item">
        <label>Medication Code</label>
        <TextField
          fullWidth
          type="text"
          value={medicationData.code}
          onChange={(e) => setMedicationData({ ...medicationData, code: e.target.value })}
        />
      </div>

      <div className="form-item">
        <label>Medication Picture (URL)</label>
        <TextField
          fullWidth
          type="text"
          value={medicationData.image}
          onChange={(e) => setMedicationData({ ...medicationData, image: e.target.value })}
        />
      </div>

      <div className="form-item">
        <label>Weight</label>
        <TextField
          fullWidth
          type="number"
          value={medicationData.weight}
          onChange={(e) => setMedicationData({ ...medicationData, weight: e.target.value })}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleLoadMedication}  // Ensure you call this function on form submission
      >
        Load Medication
      </Button>
      {error && <p className="error">{error}</p>}
    </form>
  </div>
</StyledWrapper>

      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .form-box {
    max-width: 300px;
    background: #f1f7fe;
    overflow: hidden;
    border-radius: 16px;
    color: #010101;
    margin-top: 40px;
  }

  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 32px 24px 24px;
    gap: 16px;
    text-align: center;
  }

  /*Form text*/
  .title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 1rem;
    color: #666;
  }

  /*Inputs box*/
  .form-container {
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    margin: 1rem 0 .5rem;
    width: 100%;
  }

  .input {
    background: none;
    border: 0;
    outline: 0;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-size: .9rem;
    padding: 8px 15px;
  }

  .form-section {
    padding: 16px;
    font-size: .85rem;
    background-color: #e0ecfb;
    box-shadow: rgb(0 0 0 / 8%) 0 -1px;
  }

  .form-section a {
    font-weight: bold;
    color: #0066ff;
    transition: color .3s ease;
  }

  .form-section a:hover {
    color: #005ce6;
    text-decoration: underline;
  }

  /*Button*/
  .form button {
    background-color: #0066ff;
    color: #fff;
    border: 0;
    border-radius: 24px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color .3s ease;
  }

  .form button:hover {
    background-color: #005ce6;
  }`

export default Dashboard;

