import "./Services.css"
import { useState, useEffect } from "react";
import axios from "axios";
import img from "../assets/drone-background.png"
// import { Link } from "react-router-dom";
import styled from 'styled-components';

const Services = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/evtols');

                if (!Array.isArray(response.data.evolts)) {
                    console.error("Expected an array but got:", response.data.evolts);
                    return;
                }

                // Initialize items with an additional `originalBattery` property
                const updatedItems = response.data.evolts.map(item => ({
                    ...item,
                    originalBattery: item.batteryLevel // Save original battery percentage
                }));

                setItems(updatedItems);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Failed to fetch products. Check console for details.");
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prevItems =>
                prevItems.map(item => {
                    let newBattery = item.batteryLevel - 5;
                    if (newBattery < 0) newBattery = item.originalBattery; // Reset if it reaches 0
                    return { ...item, batteryLevel: newBattery };
                })
            );
        }, 30 * 60 * 1000); // 30 minutes

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

                {/* Grid for Products */}
                <div className="grid">
                    {items.filter(item => item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                        items
                            .filter(item => item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((item) => (
                                <div className="product" key={item.id}>
                                    <img src={img} alt="" className="idk" />
                                    <h2 className="title">{item.serialNumber}</h2>
                                    <p>{item.weightLimit}mg</p>
                                    <p>{item.weight}</p>
                                    <p>{item.state}</p>

                                    {/* Battery Bar */}
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


                                    <button className="view-more">
                                        View More →
                                    </button>
                                </div>
                            ))
                    ) : (
                        <p className="no-results">No results found</p>
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

  @keyframes rotate4 {
   100% {
    transform: rotate(360deg);
   }
  }

  @keyframes dash4 {
   0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
   }

   50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
   }

   100% {
    stroke-dashoffset: -125px;
   }
  }
`;


export default Services;
