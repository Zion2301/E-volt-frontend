import "./Services.css";
import { useState, useEffect } from "react";
import axios from "axios";
import img from "../assets/drone-background.png";
import errorBg from "../assets/new.png"; // Background image for error state
import styled from 'styled-components';
import Modal from "./Modal";
import { Link } from "react-router-dom";

const Services = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const filteredItems = items.filter(item => 
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token from local storage
    
                if (!token) {
                    throw new Error("No authentication token found");
                }
    
                const response = await axios.get("http://localhost:3020/api/evtols", {
                    headers: {
                        Authorization: `Bearer ${token}` // Add token to headers
                    }
                });
    
                if (!Array.isArray(response.data.evolts)) {
                    throw new Error("Invalid response format");
                }
    
                const updatedItems = response.data.evolts.map(item => ({
                    ...item,
                    originalBattery: item.batteryLevel
                }));
    
                setItems(updatedItems);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(true);
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);
    

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prevItems =>
                prevItems.map(item => {
                    let newBattery = item.batteryLevel - 5;
                    if (newBattery < 0) newBattery = item.originalBattery;
                    return { ...item, batteryLevel: newBattery };
                })
            );
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <StyledWrapper>
                <svg viewBox="25 25 50 50">
                    <circle r={20} cy={50} cx={50} />
                </svg>
            </StyledWrapper>
        );
    }

    if (error) {
        return (
            <ErrorWrapper style={{ backgroundImage: `url(${errorBg})` }}>
                <div className="error-content">
                    <h1>Wanna Check Us Out?</h1>
                    <Link to="/register">Create an Account with Us!!!!</Link>
                </div>
            </ErrorWrapper>
        );
    }

    return (
        <>
            <section className="shop-banner">
                <div className="inner-shop">
                    <h1 className="get">GET YOUR E-VOLT</h1>
                    <p className="more">
                        If you’re booking an evolt for the first time, you may want to consider the features, flight <br />
                        time, medications loaded, accessories and ease of use.
                    </p>
                </div>
            </section>

            <section className="fetch-products">
                <div className="inner-search-div">
                    <p className="show">Showing all results</p>
                    <input
                        type="search"
                        className="inp"
                        placeholder="Search by Serial Number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="product" key={item.id || item.serialNumber}>
                                <img src={img} alt="" className="idk" />
                                <h2 className="title">{item.serialNumber}</h2>
                                <p>{item.weightLimit}mg</p>
                                <p>{item.weight}</p>
                                <p>{item.state}</p>

                                <div className="battery-container">
                                    <div
                                        className="battery-bar"
                                        style={{
                                            width: `${item.batteryLevel}%`,
                                            backgroundColor: item.batteryLevel < 25 ? "red" : "green"
                                        }}
                                    ></div>
                                </div>
                                <p className="battery-text">{item.batteryLevel}%</p>

                                <button className="view-more" onClick={() => openModal(item)}>
                                    View More →
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No results found</p>
                    )}

                    {isModalOpen && selectedItem && (
                        <Modal item={selectedItem} onClose={closeModal} />
                    )}
                </div>
            </section>
        </>
    );
};

const StyledWrapper = styled.div`
  svg {
   width: 3.25em;
   transform-origin: center;
   animation: rotate4 2s linear infinite;
  }

  circle {
   fill: none;
   stroke: hsl(214, 97%, 59%);
   stroke-width: 2;
   stroke-dasharray: 1, 200;
   stroke-dashoffset: 0;
   stroke-linecap: round;
   animation: dash4 1.5s ease-in-out infinite;
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  height: 80vh;
  background-size: contain;
  background-position: center;
  color: white;
  text-align: center;
  background-repeat: no-repeat; 
  color: black;
`;

export default Services;
