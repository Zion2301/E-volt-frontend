import "./Main.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import img from "../assets/drone.avif";
import { Link } from "react-router-dom";

const Main = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Search state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/evtols');

                console.log("Full API Response:", response.data);

                if (!Array.isArray(response.data.evolts)) {
                    console.error("Expected an array but got:", response.data.evolts);
                    return;
                }

                setItems(response.data.evolts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Failed to fetch products. Check console for details.");
            }
        };

        console.log("Fetching products...");
        fetchProducts();
    }, []);

    // Function to filter items based on search input
    const filteredItems = items.filter((item) =>
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <StyledWrapper>
                <div className="dot-spinner">
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                </div>
            </StyledWrapper>
        );
    }

    return (
        <>
            <section className="banner">
                <div className="inner-div">
                    <div className="inner-inner">
                        <h1 className="title">We Are here to Save the Day</h1>
                        <p className="more">
                            Juiced Up, Amped for Action, and Fully Charged to Shock the World!
                            Whether its power,<br></br> precision, or pure electrifying innovation, we’ve got
                            the voltage to keep things buzzing!
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <input
                    type="search"
                    className="inp"
                    placeholder="Search by Serial Number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Grid for Products */}
                <div className="grid">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="product" key={item.id}>
                                <img src={img} alt="" className="idk" />
                                <h2 className="title">{item.serialNumber}</h2>
                                <p>{item.weightLimit}mg</p>
                                <p>{item.batteryLevel}%</p>
                                <p>{item.weight}</p>
                                <p>{item.state}</p>
                                <Link 
                                    to="/dashboard" 
                                    className="view-more">
                                    Add Medication →
                                </Link>
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
  .dot-spinner {
    --uib-size: 2.8rem;
    --uib-speed: .9s;
    --uib-color: #183153;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
    margin-left: 700px;
    margin-top: 200px;
  }

  .dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
  }

  .dot-spinner__dot::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
  }

  @keyframes pulse0112 {
    0%,
    100% {
      transform: scale(0);
      opacity: 0.5;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .no-results {
    text-align: center;
    font-size: 18px;
    color: #555;
    margin-top: 20px;
  }
`;

export default Main;
