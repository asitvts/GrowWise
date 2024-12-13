import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Navbar3 from "./components/NavBar3";

function Estimate() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [timeFrame, setTimeFrame] = useState(30);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(30);
  const [tokenData, setTokenData] = useState(null);

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
    if (!token) console.log("Token not found in cookie.");
  }, []);

  const handleEstimate = async () => {
    if (tokenData && result != null) {
      setLoading(true);
      setTimeout(() => {}, 5000);
      setLoading(false);
      return;
    }
    setLoading(true);
    setResult(null);

    if (tokenData) {
      try {
        const response = await fetch(
          `http://localhost:8000/estimate_portfolio_valuation?token=${encodeURIComponent(
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
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        const { each_stock_dict, stock_with_past_data } = data;
        console.log("Each Stock:", each_stock_dict);
        console.log("Stock with Past Data:", stock_with_past_data);

        const calculateAverageGrowthRate = (pastData) => {
          let totalGrowth = 0;
          for (let i = 1; i < pastData.length; i++) {
            totalGrowth += (pastData[i] - pastData[i - 1]) / pastData[i - 1];
          }
          return totalGrowth / (pastData.length - 1);
        };

        const estimateFuturePrice = (currentPrice, growthRate, days) => {
          return currentPrice * Math.pow(1 + growthRate, days);
        };

        const timePeriods = [30, 60, 90, 180, 365];
        const portfolioValues = {};

        timePeriods.forEach((days) => {
          portfolioValues[days] = 0;
        });

        for (const stock in stock_with_past_data) {
          const pastData = stock_with_past_data[stock];
          const currentPrice = pastData[pastData.length - 1];
          const growthRate = calculateAverageGrowthRate(pastData);
          const stockAmount = each_stock_dict[stock];

          timePeriods.forEach((days) => {
            const futurePrice = estimateFuturePrice(
              currentPrice,
              growthRate,
              days
            );
            portfolioValues[days] += futurePrice * stockAmount;
          });
        }

        setResult(portfolioValues);
        console.log(portfolioValues);
      } catch (error) {
        console.error("Error fetching portfolio valuation:", error);
        setResult(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Invalid token");
    }
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(parseInt(event.target.value));
  };

  const handleEstimateClick = () => {
    setSelectedTimeFrame(timeFrame);
    handleEstimate();
  };

  return (
    <>
    <Navbar3></Navbar3>
      <div className="flex">
        <div className="mr-60">
          <SideBar></SideBar>
        </div>
        <div className="ml-60 min-h-screen pt-20 pb-20 p-8 flex flex-col justify-center items-center relative">
          <div className="relative border-white border-opacity-20 hover:border-opacity-30 border-[0.5px] bg-opacity-95 rounded-xl pl-10 pr-10 pt-5 pb-10 max-w-md w-full">
            {/* Main Content */}
            <header className=" mb-8 ">
              <h1 className="mb-10">GrowWise</h1>
              <h1 className="text-4xl font-bold  mb-1 text-orange-700 opacity-90">
                Estimate Your Portfolio Valuation
              </h1>
              <p className="text-sm opacity-40 mb-20">
                Set the time frame and click on the estimate button
              </p>
            </header>
            <main className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <div className="relative w-full">
                  <select
                    id="timeFrame"
                    value={timeFrame}
                    onChange={handleTimeFrameChange}
                    className="w-full mr-3 px-4 py-3 text-white opacity-50 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-orange-800 focus:ring-opacity-100 border border-white border-opacity-30 transition-all duration-300 cursor-pointer appearance-none"
                  >
                    <option value={30}>30 days from now</option>
                    <option value={60}>60 days from now</option>
                    <option value={90}>90 days from now</option>
                    <option value={180}>6 months from now</option>
                    <option value={365}>1 year from now</option>
                  </select>

                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEstimateClick}
                className={`px-8 py-4 text-lg font-semibold rounded-full transition-transform duration-300 ${
                  loading
                    ? "bg-gray-300 text-gray-800 cursor-not-allowed animate-pulse"
                    : "bg-gradient-to-r from-orange-500 to-orange-800 text-white hover:scale-105"
                }`}
                disabled={loading}
              >
                {loading ? "Estimating..." : "Estimate"}
              </button>

              {result && (
                <div className="w-full max-w-lg border-white border-[1px] border-opacity-20 rounded-lg shadow-lg p-6 mt-8">
                  <h2 className=" mb-4 text-white opacity-40 text-center">
                    Estimated Portfolio Valuation
                  </h2>
                  <p className=" text-center text-white text-opacity-40 font-bold">
                    {selectedTimeFrame === 30 && result[30] !== undefined ? (
                      <>
                        In 30 days:{" "}
                        <span className="text-green-700 text-3xl font-bold opacity-80">
                          ${result[30].toFixed(2)}
                        </span>
                      </>
                    ) : selectedTimeFrame === 60 && result[60] !== undefined ? (
                      <>
                        In 60 days:{" "}
                        <span className="text-green-700 text-3xl font-bold">
                          ${result[60].toFixed(2)}
                        </span>
                      </>
                    ) : selectedTimeFrame === 90 && result[90] !== undefined ? (
                      <>
                        In 90 days:{" "}
                        <span className="text-green-700 text-3xl font-bold">
                          ${result[90].toFixed(2)}
                        </span>
                      </>
                    ) : selectedTimeFrame === 180 &&
                      result[180] !== undefined ? (
                      <>
                        In 6 months:{" "}
                        <span className="text-green-700 text-3xl font-bold">
                          ${result[180].toFixed(2)}
                        </span>
                      </>
                    ) : selectedTimeFrame === 365 &&
                      result[365] !== undefined ? (
                      <>
                        In 1 year:{" "}
                        <span className="text-green-700 text-3xl font-bold">
                          ${result[365].toFixed(2)}
                        </span>
                      </>
                    ) : (
                      "Invalid or incomplete data"
                    )}
                  </p>
                </div>
              )}
            </main>
          </div>
          <footer className="mt-10 text-center text-gray-400 text-sm">
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
        </div>
      </div>
    </>
  );
}

export default Estimate;
