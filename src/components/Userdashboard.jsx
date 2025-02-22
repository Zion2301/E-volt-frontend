import "./UserDashboard.css"
import { LuSearch } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { MdOutlineSensorOccupied } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";
const Userdashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [purchasedItems, setPurchasedItems] = useState([]);
    const lineChartData = [
        { name: "Jan", uv: 500, pv: 2000, amt: 4000 },
        { name: "Feb", uv: 600, pv: 2200, amt: 4200 },
        { name: "Mar", uv: 700, pv: 2500, amt: 4500 },
        { name: "Apr", uv: 800, pv: 2700, amt: 4800 },
        { name: "May", uv: 900, pv: 3000, amt: 5000 },
        { name: "Jun", uv: 1000, pv: 3500, amt: 5500 }
      ];

      const barChartData = [
        { name: "Q1", value: 2000 },
        { name: "Q2", value: 3000 },
        { name: "Q3", value: 4000 },
        { name: "Q4", value: 5000 }
      ];

      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        } else {
          setUserName(localStorage.getItem("name"));
        }
    
        // Retrieve checked-out items from localStorage
        const storedItems = localStorage.getItem("purchasedItems");
        if (storedItems) {
          setPurchasedItems(JSON.parse(storedItems));
        }
      }, [navigate]);


      const count = purchasedItems.length
    
  return (
   <>
     <div className="main-dashboard">
        <div className="left-dash">
                <h1 className="welcome">Welcome {userName}</h1>
                <div className="top-icons">
                  <p className="search-icon"><LuSearch /></p>
                  <p className="search-icon"><FaRegBell /></p>
                </div>
        
                <div className="numbers-div">
                  <div className="each-number">
                    <p className="icon-number"><TbDrone />{count}</p>
                    <p className="deployed">Evolts ordered by me</p>
                  </div>
        
                  <div className="each-number">
                    <p className="icon-number"><AiOutlineMedicineBox />  20</p>
                    <p className="deployed">Total medications</p>
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
        
                <div className="table-evolts">
                  <h3 className="top">My Orders</h3>
                  <div className="table-container">
                  <table className="custom-table">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Weight Limit</th>
                          <th>State</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchasedItems.length > 0 ? (
                          purchasedItems.map((item, index) => (
                            <tr key={index}>
                              <td>{item.serialNumber}</td>
                              <td>{item.weightLimit} mg</td>
                              <td>{item.state}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="no-orders">No orders yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
     </div>
   </>
  )
}

export default Userdashboard