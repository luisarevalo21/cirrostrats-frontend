import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Details = () => {
  const [airportData, setAirportData] = useState([]);
  const location = useLocation();
  const searchValue = location?.state?.searchValue;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/flight_info`);
        if (res.status !== 200) {
          throw new Error("Network error occurred");
        }
        setAirportData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle error state or display an error message
      }
    }
    if (searchValue) {
      fetchData();
    }
  }, [searchValue]);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Gate</th>
            <th>Flight</th>
            <th>Scheduled</th>
            <th>Actual</th>
          </tr>
        </thead>

        <tbody>
          {airportData.map((flight, index) => (
            <tr key={index}>

              <td> "flight.gate"</td>
              <td>{flight.flight_number}</td>
              <td>{flight.scheduled}</td>
              <td>{flight.actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Details;
