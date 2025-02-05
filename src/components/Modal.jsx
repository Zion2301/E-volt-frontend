import "./Modal.css";
import PropTypes from 'prop-types';
import img from "../assets/drone-background.png"

const Modal = ({ item, onClose }) => {
  if (!item) return null;  // Guard clause to prevent rendering when no item is passed
  
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close button at top-right */}
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="modal-div">
            <img src={img} alt="" width={300}/>
        <div className="right-modal-div">
        <h2 className="modal-title">{item.serialNumber}</h2>
        <p className="modal-info">{item.weightLimit}mg</p>
        <p className="modal-info">{item.state}</p>
        <div className="modal-buttons">
          <button className="checkout-btn">Checkout</button>
        </div>
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
