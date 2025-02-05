import "./UserDashboard.css"
import { LuSearch } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa6";
import { TbDrone } from "react-icons/tb";
import { AiOutlineMedicineBox } from "react-icons/ai";
// import { MdOutlineSensorOccupied } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";
const Userdashboard = () => {
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
      
  return (
   <>
     <div className="main-dashboard">
        <div className="left-dash">
                <h1 className="welcome">Welcome Zion</h1>
                <div className="top-icons">
                  <p className="search-icon"><LuSearch /></p>
                  <p className="search-icon"><FaRegBell /></p>
                </div>
        
                <div className="numbers-div">
                  <div className="each-number">
                    <p className="icon-number"><TbDrone />  20</p>
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
                          <th>Weight</th>
                          <th>State</th>
                          <th>Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {evolts.map((evolt, index) => (
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
                        ))} */}
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