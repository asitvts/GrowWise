import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import SideBar from "./components/SideBar";
import stockOptions from "./stockOptions";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

function Dashboard() {
  const [bestPerformingStockProfit, setBestPerformingStockProfit] = useState(0);
  const [bestPerformingStock, setBestPerformingStock] = useState("");
  const [currentWorth, setCurrentWorth] = useState(0);
  const [heatMapData, setHeatMapData] = useState();
  const [amountInvested, setAmountInvested] = useState(0);
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStockData, setSearchedStockData] = useState([]);
  const [latestStockData, setLatestStockData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [graphLoading, setGraphLoading] = useState(false);
  const [datesBought, setDatesBought] = useState([]);

  const chartData = {
    labels: searchedStockData.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${searchQuery.toUpperCase()} Stock Price`,
        data: searchedStockData.map((item) => item.close),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromCookie = () => {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split(";");
      let token = null;

      for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.startsWith("token=")) {
          const tokenString = cookie.substring("token=".length);
          token = JSON.parse(decodeURIComponent(tokenString));
          break;
        }
      }

      return token;
    };

    const token = getTokenFromCookie();
    setTokenData(token);
    if (!token) {
      alert("You need to login first!");
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    handleGetAllUserInfo();
  }, [tokenData]);

  const handleGetAllUserInfo = async () => {
    if (tokenData) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/get_portfolio_evaluation?token=${encodeURIComponent(
            tokenData
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Failed to fetch portfolio valuation");
        }

        const data = await response.json();
        setAmountInvested(data["total_spend"]);
        setCurrentWorth(data["total_value_now"]);
        setBestPerformingStock(data["best_performing_stock"]);
        setBestPerformingStockProfit(data["best_performing_stock_profit"]);
        setHeatMapData(data["heatmap_dict"]);
        setDatesBought(data["dates_bought"]);
        console.log(datesBought);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = () => {
    setGraphLoading(true);
    if (searchQuery.trim() === "") {
      alert("Please enter a stock name to search.");
      return;
    }

    const isValidStock = stockOptions.some(
      (stock) => stock.value.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (!isValidStock) {
      alert("Please enter a valid stock.");
      return;
    }

    getSearchedStock();
  };

  const getSearchedStock = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/get_searched_stock?stock=${encodeURIComponent(
          searchQuery
        )}`,
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
      console.log("API Response:", data); // Check if 'data' is an array or object

      if (!Array.isArray(data)) {
        alert("Unexpected API response format");
        return;
      }

      setSearchedStockData(data);
      const sortedData = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setLatestStockData(sortedData[0]);
    } catch (error) {
      alert(error.message);
    } finally {
      setGraphLoading(false);
    }
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
      alert("You have been logged out.");
      navigate("/Login");
      setLogoutLoading(false);
    }, 2000);
  };

  const colorPalette = [
    "#22223b", // Deep Dark Blue-Gray (Professional, modern look)
    "#4a4e69", // Muted Slate Blue (Cool, balanced, and sophisticated)
    "#9a8c98", // Desaturated Mauve (Muted pinkish-purple for subtle contrast)
    "#c9ada7", // Soft Rosewood (Light, earthy tone with a calm feel)
    "#f2e9e4", // Pale Off-White (Soft, neutral background tone)
    "#a5a58d", // Desaturated Olive (Muted earthy green, blends well with naturals)
    "#b7b7a4", // Light Warm Gray (Simple, clean, and modern)
    "#f8f9fa", // Very Light Gray (Subtle background tone for minimal contrast)
    "#6c757d", // Muted Gray-Blue (Balanced gray with a hint of blue)
  ];

  const pieChartData = heatMapData
    ? {
        labels: Object.keys(heatMapData), // Stock names (like AAPL, TSLA)
        datasets: [
          {
            label: "Amount in USD",
            data: Object.values(heatMapData), // The values for each stock
            backgroundColor: Object.keys(heatMapData).map(
              (stock, index) => colorPalette[index % colorPalette.length] // Cycle through fixed color palette
            ),
            borderColor: "rgba(255, 255, 255, 1)", // White border
            borderWidth: 2,
          },
        ],
      }
    : null;

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  //const monthsData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const extractMonths = () => {
    const monthCounts = {};
  
    datesBought.forEach((date) => {
      const month = new Date(date).getMonth(); // Get the month (0-based)
      const year = new Date(date).getFullYear(); // Get the year
      const monthYear = `${month}-${year}`;
  
      // Count the occurrences of each month-year combination
      if (monthCounts[monthYear]) {
        monthCounts[monthYear] += 1;
      } else {
        monthCounts[monthYear] = 1;
      }
    });
  
    return monthCounts;
  };
  
  const monthsData = extractMonths(); // Get the month counts from the function
  
  const monthsPieChartData = monthsData
    ? {
        labels: Object.keys(monthsData).map(monthYear => {
          const [month, year] = monthYear.split('-');
          return `${new Date(0, month).toLocaleString('en', { month: 'short' })} ${year}`; // Format to "Jan 2024"
        }),
        datasets: [
          {
            label: "No of Purchases", // Label for the dataset
            data: Object.values(monthsData), // Values for each month
            backgroundColor: Object.keys(monthsData).map(
              (monthYear, index) => colorPalette[index % colorPalette.length] // Cycle through a fixed color palette
            ),
            borderColor: "rgba(255, 255, 255, 1)", // White border color for each slice
            borderWidth: 2, // Border width
          },
        ],
      }
    : null;
  
  const monthsPieChartOptions = {
    responsive: true, // Make the chart responsive to window size changes
    maintainAspectRatio: false, // Allow the chart to not maintain aspect ratio
    plugins: {
      legend: {
        display: true, // Show the legend
        position: "top", // Position the legend at the top
      },
    },
  };
  

  return (
    <>
      <Navbar2 />
      <div className="from-blue-50 to-gray-100 p-8 flex">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="ml-60 px-10 w-full">
          {/* Logout Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`rounded-md bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold ${
                logoutLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {logoutLoading ? (
                <span className="animate-pulse">Logging Out...</span>
              ) : (
                "Logout"
              )}
            </button>
          </div>

          {/* Page Heading */}
          <h1 className="text-5xl font-semibold text-center text-white opacity-70 mb-8">
            Portfolio Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Current Worth */}
            <div className="border-white border-[1px] border-opacity-50 p-6 shadow-2xl rounded-xl border border-gray-200 transform hover:scale-105 transition-all">
              <h2 className="text-xl font-semibold text-white opacity-70 mb-8">
                Current Worth
              </h2>
              <p className="text-4xl font-bold text-green-600 opacity-70">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `$${currentWorth?.toFixed(2)}`
                )}
              </p>
            </div>

            {/* Amount Invested */}
            <div className="border-white border-[1px] border-opacity-50 p-6 shadow-2xl rounded-xl border border-gray-200 transform hover:scale-105 transition-all">
              <h2 className="text-xl font-semibold text-white opacity-70 mb-8">
                Amount Invested
              </h2>
              <p className="text-4xl font-bold text-blue-600 opacity-70">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `$${amountInvested?.toFixed(2)}`
                )}
              </p>
            </div>

            {/* Total Gain/Loss */}
            <div className="border-white border-[1px] border-opacity-50 p-6 shadow-2xl rounded-xl border border-gray-200 transform hover:scale-105 transition-all">
              <h2 className="text-xl font-semibold text-white opacity-70 mb-8">
                Total Gain/Loss
              </h2>
              <p
                className={`text-4xl font-bold opacity-70 ${
                  currentWorth - amountInvested > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  `$ ${(currentWorth - amountInvested).toFixed(2)}`
                )}
              </p>
            </div>

            {/* Best Performing Stock */}
            <div className="border-white border-[1px] border-opacity-50 p-6 shadow-2xl rounded-xl border border-gray-200 transform hover:scale-105 transition-all">
              <h2 className="text-xl font-semibold text-white opacity-70 mb-8">
                Best Performing Stock
              </h2>
              <p className="text-4xl font-bold text-blue-600 opacity-70">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>
                    {bestPerformingStock}{" "}
                    <span
                      className={`text-3xl font-bold ${
                        bestPerformingStockProfit > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {`($${bestPerformingStockProfit.toFixed(2)})`}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          {/* piechart */}
          <div className="mt-20 mb-20">
            <h2
              className={`text-xl font-semibold text-white opacity-70 mb-5 align-centre text-center ${
                !pieChartData ? "animate-pulse" : ""
              }`}
            >
              Distribution Chart for each stock
            </h2>
            {pieChartData && (
              <div style={{ width: "100%", height: "340px" }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            )}
          </div>

          {/* piechart2 */}
          <div className="mt-20 mb-20">
            <h2
              className={`text-xl font-semibold text-white opacity-70 mb-5 align-centre text-center ${
                !datesBought ? "animate-pulse" : ""
              }`}
            >
              Monthly Transaction Activity
            </h2>
            {pieChartData && (
              <div style={{ width: "100%", height: "340px" }}>
                <Pie data={monthsPieChartData} options={monthsPieChartOptions} />
              </div>
            )}
          </div>


          {/* Search Bar */}
          <div className="relative mt-10 flex justify-center mb-20">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search a stock..."
              value={searchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery); // Call handleSearch on Enter
                  setShowDropdown(false); // Close dropdown
                }
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true); // Show dropdown on input change
              }}
              onFocus={() => setShowDropdown(true)} // Show dropdown on focus
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)} // Hide dropdown after a short delay
              className="rounded-3xl border-white border-[1px] border-opacity-30 w-full max-w-xl px-4 py-3 text-white placeholder-white placeholder-opacity-50"
            />
            <button
              className="ml-10 text-white text-opacity-70 border-white border-[1px] border-opacity-30 p-2 rounded-3xl"
              onClick={() => handleSearch(searchQuery)}
            >
              search
            </button>

            {/* Dropdown List */}
            {showDropdown && (
              <ul className="mb-20 absolute top-14 border-white border-[1px] border-opacity-30 rounded-md shadow-lg z-50 w-full max-w-xl">
                {stockOptions
                  .filter((stock) =>
                    stock.value
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 3) // Limit to 5 suggestions
                  .map((filteredStock, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-white opacity-70 hover:bg-opacity-10 p-2"
                      onClick={() => {
                        setSearchQuery(filteredStock.value);
                        setShowDropdown(false); // Close dropdown on selection
                      }}
                    >
                      {filteredStock.value}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div>
            {graphLoading && (
              <div className="flex m-10 items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
              </div>
            )}
            {latestStockData && (
              <div className="border-white border-[1px] border-opacity-30 p-6 shadow-2xl rounded-xl border border-gray-200 transform hover:scale-100 transition-all">
                <h2 className="text-xl font-semibold text-white opacity-55 mb-8">
                  Latest Stock Data for {searchQuery.toUpperCase()}
                </h2>

                <div className="w-full h-96">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-10 mb-5 text-center text-gray-400 text-sm">
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

export default Dashboard;
