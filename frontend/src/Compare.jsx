import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import SideBar from "./components/SideBar";
import Navbar3 from "./components/NavBar3";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import stockOptions from "./stockOptions";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

function Compare() {
  const [stock1, setStock1] = useState("");
  const [stock2, setStock2] = useState("");
  const [openDataStockOne, setOpenDataStockOne] = useState([]);
  const [openDataStockTwo, setOpenDataStockTwo] = useState([]);
  const [noteVisible, setNoteVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCompare = async (e) => {
    e.preventDefault();

    if (stock1 === "" || stock2 === "") {
      alert("Please select two valid stocks to compare!");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/compare_two_stocks?stock1=${encodeURIComponent(
          stock1
        )}&stock2=${encodeURIComponent(stock2)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to fetch stock data");
      }

      const data = await response.json();
      const arr1 = data["stock_1_dict"].map((item) => item.open);
      const arr2 = data["stock_2_dict"].map((item) => item.open);
      setOpenDataStockOne(arr1);
      setOpenDataStockTwo(arr2);
      setNoteVisible(true);
    } catch (error) {
      alert(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: Array.from({ length: openDataStockOne.length }, (_, i) => i + 1),
    datasets: [
      {
        label: `${stock1} Open Prices`,
        data: openDataStockOne,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: `${stock2} Open Prices`,
        data: openDataStockTwo,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
      {
        label: `${stock1} All-Time High`,
        data: openDataStockOne.map((value, index) =>
          index === openDataStockOne.indexOf(Math.max(...openDataStockOne))
            ? value
            : null
        ),
        borderColor: "green",
        backgroundColor: "green",
        pointRadius: 6,
        pointHoverRadius: 8,
        type: "scatter",
      },
      {
        label: `${stock1} All-Time Low`,
        data: openDataStockOne.map((value, index) =>
          index === openDataStockOne.indexOf(Math.min(...openDataStockOne))
            ? value
            : null
        ),
        borderColor: "red",
        backgroundColor: "red",
        pointRadius: 6,
        pointHoverRadius: 8,
        type: "scatter",
      },
      {
        label: `${stock2} All-Time High`,
        data: openDataStockTwo.map((value, index) =>
          index === openDataStockTwo.indexOf(Math.max(...openDataStockTwo))
            ? value
            : null
        ),
        borderColor: "green",
        backgroundColor: "green",
        pointRadius: 6,
        pointHoverRadius: 8,
        type: "scatter",
      },
      {
        label: `${stock2} All-Time Low`,
        data: openDataStockTwo.map((value, index) =>
          index === openDataStockTwo.indexOf(Math.min(...openDataStockTwo))
            ? value
            : null
        ),
        borderColor: "red",
        backgroundColor: "red",
        pointRadius: 6,
        pointHoverRadius: 8,
        type: "scatter",
      },
    ],
  };

  return (
    <>
    <Navbar3></Navbar3>
    <SideBar></SideBar>
      <div className="ml-20 pl-20 min-h-screen text-white font-poppins flex flex-col items-center">
        <div className="flex flex-col w-full max-w-md bg-opacity-95 border-[0.5px] border-white border-opacity-20 rounded-lg shadow-lg p-6 mb-8 mt-20">
          <h1 className="mb-10">GrowWise</h1>
          <h1 className="text-4xl font-bold  mb-1 text-orange-700 opacity-80 mb-10">
            Compare Two Stocks
          </h1>
          <label htmlFor="stock1" className="text-sm mb-2 opacity-40">
            Select Stock 1:
          </label>
          <select
            id="stock1"
            value={stock1}
            onChange={(e) => setStock1(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-transparent border-[1px] border-white border-opacity-70 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">First pick</option>
            {stockOptions.map((stock) => (
              <option key={stock.value} value={stock.value}>
                {stock.label}
              </option>
            ))}
          </select>

          <label htmlFor="stock2" className="text-sm mb-2 opacity-40">
            Select Stock 2:
          </label>
          <select
            id="stock2"
            value={stock2}
            onChange={(e) => setStock2(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-transparent border-[1px] border-white border-opacity-70 focus:ring-1 focus:ring-orange-500"
          >
            <option value="">Second pick</option>
            {stockOptions.map((stock) => (
              <option key={stock.value} value={stock.value}>
                {stock.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleCompare}
            className={`mt-10 bg-gradient-to-r from-orange-500 to-orange-800 hover:from-orange-400 hover:to-orange-700 w-full py-3 rounded-lg font-semibold ${
              loading
              ? "bg-gray-300 text-gray-800 cursor-not-allowed animate-pulse"
              : "bg-gradient-to-r from-orange-500 to-orange-800 text-white hover:scale-105"
            }`} 
          >
            Compare
          </button>
        </div>

        {noteVisible && (
          <p className="text-sm text-red-300 mb-4">
            <span className="font-bold">Note:</span> Graph only shows data for
            days the stock market is open.
          </p>
        )}

        {openDataStockOne.length > 0 && openDataStockTwo.length > 0 && (
          <div className="w-full max-w-4xl bg-opacity-95 border-[0.5px] border-white border-opacity-20 rounded-lg shadow-lg p-6 mt-6">
            <Line data={chartData} />
          </div>
        )}
      </div>
      <footer className="mt-10 mb-10 text-center text-gray-400 text-sm">
        <div className="mb-4">
          <span
            className="hover:text-gray-200 cursor-pointer"
            onClick={() => alert("Terms of Use page coming soon!")}
          >
            Terms of Use
          </span>{" "}
          |{" "}
          <span
            className="hover:text-gray-200 cursor-pointer"
            onClick={() => alert("About Us page coming soon!")}
          >
            About Us
          </span>{" "}
          |{" "}
          <span
            className="hover:text-gray-200 cursor-pointer"
            onClick={() => alert("Contact Us page coming soon!")}
          >
            Contact Us
          </span>
        </div>
        <p>&copy; 2024 GrowWise. All rights reserved.</p>
      </footer>
    </>
  );
}

export default Compare;
