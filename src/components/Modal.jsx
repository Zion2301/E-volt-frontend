import "./Modal.css";
import PropTypes from 'prop-types';
import img from "../assets/drone-background.png";
import drug from "../assets/drug.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ item, onClose }) => {
  const token = localStorage.getItem("token");
  const [medications, setMedications] = useState([]);
  const [error, setError] = useState("");

  if (!item) return null;  // Prevent rendering if no item is provided

  // Function to fetch medications
  const loadMedications = async (serialNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:3020/api/evtols/medications/${serialNumber}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMedications(response.data.medications || []); // Ensure we set an array
    } catch (error) {
      setError(error.response?.data?.error || "Failed to load medications");
    }
  };

  // Load medications when the modal opens
  useEffect(() => {
    if (item?.serialNumber) {
      loadMedications(item.serialNumber);
    }
  }, [item]);

  // Function to handle checkout
  const handleCheckout = () => {
    const storedItems = localStorage.getItem("purchasedItems");
    const purchasedItems = storedItems ? JSON.parse(storedItems) : [];

    // Add the new item if it's not already in the purchased list
    if (!purchasedItems.find((p) => p.serialNumber === item.serialNumber)) {
      const updatedItems = [...purchasedItems, item];
      localStorage.setItem("purchasedItems", JSON.stringify(updatedItems));
    }

    // Close modal after checkout
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close button at top-right */}
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-div">
          <img src={img} alt="Product" width={300} />
          <div className="right-modal-div">
            <h2 className="modal-title">{item.serialNumber}</h2>
            <p className="modal-info">{item.weightLimit}mg</p>
            <p className="modal-info">{item.state}</p>
            <div className="modal-buttons">
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
            {error && <p className="error-message">{error}</p>}

            {/* Display medications if available */}
            {medications.length > 0 ? (
              <div className="medications-container">
                {medications.map((med, index) => (
                  <div key={index} className="medication-card">
                    <img src={drug} alt={med.name} />
                    <p><strong>Name:</strong> {med.name}</p>
                    <p><strong>Weight:</strong> {med.weight}mg</p>
                    <p><strong>Code:</strong> {med.code}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No medications found for this serial number.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  item: PropTypes.shape({
    serialNumber: PropTypes.string.isRequired,
    weightLimit: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
