import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, Card, Typography } from '@mui/material';
import "./Dashboard.css";

// Dashboard component
const Dashboard = () => {
  const [medications, setMedications] = useState([]);
  const [evolts, setEvolts] = useState([]);
  const [selectedEvolt, setSelectedEvolt] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [medicationData, setMedicationData] = useState({
    name: '',
    weight: 0,
    code: '',
    image: ''
  });
  const [error, setError] = useState('');

  // Load eVOLT and medication data on mount
  useEffect(() => {
    axios.get('/api/evtols')
      .then(response => setEvolts(response.data.evolts))
      .catch(error => setError(error.message));

    if (selectedEvolt) {
      checkBatteryLevel(selectedEvolt);
      loadMedications(selectedEvolt);
    }
  }, [selectedEvolt]);

  // Check battery level
  const checkBatteryLevel = (serialNumber) => {
    axios.get(`/api/evtols/battery-check/${serialNumber}`)
      .then(response => setBatteryLevel(response.data.batteryLevel))
      .catch(error => setError(error.message));
  };

  // Load medications for selected eVOLT
  const loadMedications = (serialNumber) => {
    axios.get(`/api/evtols/medications/${serialNumber}`)
      .then(response => setMedications(response.data.medications))
      .catch(error => setError(error.message));
  };

  // Handle medication form submission
  const handleLoadMedication = () => {
    if (batteryLevel < 25) {
      setError('Battery level is too low to load medications!');
      return;
    }

    // API call to load medication
    axios.post(`/api/evtols/load-medication/${selectedEvolt}`, medicationData)
      .then(response => {
        setMedications([...medications, medicationData]); // Update state with new medication
        setError('');
      })
      .catch(error => setError(error.message));
  };

  // Handle eVOLT registration
  const handleRegisterEVOLT = () => {
    const { serialNumber, state, batteryLevel, weight } = medicationData;
    axios.post('/api/evtols/register', { serialNumber, state, batteryLevel, weight })
      .then(response => {
        setEvolts([...evolts, response.data.evolt]);
        setError('');
      })
      .catch(error => setError(error.message));
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h4" className="dashboard-header">EVOLT Dashboard</Typography>

   <div className="top-div">
       {/* Register EVOLT Card */}
       <Card className="card">
        <Typography variant="h6" className="card-header">Register eVOLT</Typography>
        <TextField
          label="Serial Number"
          className="text-field"
          onChange={(e) => setMedicationData({ ...medicationData, serialNumber: e.target.value })}
        />
        <TextField
          label="State"
          className="text-field"
          onChange={(e) => setMedicationData({ ...medicationData, state: e.target.value })}
        />
        <TextField
          label="Battery Level"
          className="text-field"
          onChange={(e) => setMedicationData({ ...medicationData, batteryLevel: e.target.value })}
        />
        <TextField
          label="Weight"
          className="text-field"
          onChange={(e) => setMedicationData({ ...medicationData, weight: e.target.value })}
        />
        <Button className="button" onClick={handleRegisterEVOLT}>Register</Button>
      </Card>

      <Card className="card">
  <Typography variant="h6" className="card-header">Load Medication</Typography>
  
  <Select value={selectedEvolt} onChange={(e) => setSelectedEvolt(e.target.value)} className="MuiSelect-root">
    {evolts.map((evolt) => (
      <MenuItem key={evolt.serialNumber} value={evolt.serialNumber}>{evolt.serialNumber}</MenuItem>
    ))}
  </Select>

  <TextField
    label="Medication Name"
    className="text-field"
    onChange={(e) => setMedicationData({ ...medicationData, name: e.target.value })}
  />
  <TextField
    label="Code"
    className="text-field"
    onChange={(e) => setMedicationData({ ...medicationData, code: e.target.value })}
  />
  <TextField
    label="Weight"
    className="text-field"
    onChange={(e) => setMedicationData({ ...medicationData, weight: e.target.value })}
  />
  <TextField
    label="Image URL"
    className="text-field"
    onChange={(e) => setMedicationData({ ...medicationData, image: e.target.value })}
  />
     
  <Button className="button" onClick={handleLoadMedication}>Load Medication</Button>
</Card>

   </div>

      {/* Error Message */}
      {error && <Typography variant="body1" className="MuiTypography-colorError">{error}</Typography>}

      {/* Medications List */}
      <Card className="card">
        <Typography variant="h6" className="card-header">Medications</Typography>
        <ul className="medication-list">
          {medications.map((med, index) => (
            <li key={index} className="medication-item">
              <span className="medication-name">{med.name}</span> - 
              <span className="medication-code">{med.code}</span>
              <div className="medication-action">
                <button>Delete</button>
                <button>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Battery Section */}
      {batteryLevel !== null && (
        <div className="battery-section">
          <Typography variant="h6" className="battery-level">Battery Level: {batteryLevel}%</Typography>
          <div className="battery-bar">
          <div
  className={`battery-bar-fill ${batteryLevel !== null && batteryLevel < 25 ? 'low' : ''}`}
  style={{ width: `${batteryLevel}%` }}
></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
