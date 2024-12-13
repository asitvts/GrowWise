const stockOptions = [
  "AAPL",
  "NVDA",
  "MSFT",
  "GOOG",
  "GOOGL",
  "AMZN",
  "META",
  "BRK.B",
  "AVGO",
  "LLY",
  "TSLA",
  "WMT",
  "JPM",
  "V",
  "XOM",
  "UNH",
  "ORCL",
  "MA",
  "HD",
  "PG",
  "COST",
  "JNJ",
  "NFLX",
  "ABBV",
  "BAC",
  "KO",
  "CRM",
  "CVX",
  "MRK",
  "TMUS",
  "AMD",
  "PEP",
  "ACN",
  "LIN",
  "TMO",
  "MCD",
  "CSCO",
  "ADBE",
  "WFC",
  "IBM",
];
import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Navbar3 from "./components/Navbar2";

function AddMoreStocks() {
  const [selectedStock, setSelectedStock] = useState("");
  const [amount, setAmount] = useState(0);
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

  const handleInvest = async (e) => {
    e.preventDefault();

    if (!selectedStock || amount <= 0) {
      alert("Please select a stock and enter a valid amount.");
      return;
    }

    if (tokenData) {
      const stock_bought = selectedStock;
      const amountValue = amount;

      try {
        const response = await fetch(
          `http://localhost:8000/add_stock_for_user?stock_bought=${encodeURIComponent(
            stock_bought
          )}&amount=${amountValue}&token=${encodeURIComponent(tokenData)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Failed to add stock");
        }

        const data = await response.json();
        alert(data.message);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("User is not authenticated.");
    }
  };

  return (
    <>
    <Navbar3></Navbar3>
      <div className="flex">
        <div className="mr-60">
          <SideBar />
        </div>
        <div className="ml-60 min-h-screen pt-20 pb-20 flex flex-col justify-center items-center relative font-poppins text-white from-indigo-900 via-purple-900 to-black">
          {/* Add Stock Form Box */}
          <div className="relative border-white border-opacity-20 hover:border-opacity-30 border-[0.5px] bg-opacity-95 rounded-xl pl-10 pr-10 pt-5 pb-10 max-w-md w-full">
            <h1>GrowWise</h1>
            <h4 className="text-4xl mt-10 font-semibold opacity-65">
              Add Stocks
            </h4>
            <p className="text-gray-400 mb-8">Invest in the best stocks</p>
            <form onSubmit={handleInvest}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 opacity-60">
                  Select Stock
                </label>
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-[1px] border-white border-opacity-70 text-white placeholder-gray-500 focus:ring-1 focus:border-opacity-10 focus:ring-opacity-100 focus:ring-orange-500 focus:outline-none"
                >
                  <option className=" " value="">
                    -- Select a Stock --
                  </option>
                  {/* Replace with your stock options */}
                  {stockOptions.map((stock) => (
                    <option key={stock} value={stock}>
                      {stock}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 opacity-60">
                  Enter Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-lg border-[1px] border-white border-opacity-50 text-white placeholder-gray-500 focus:ring-1 focus:border-opacity-10 focus:ring-opacity-100 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
              <button
                className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
                type="submit"
              >
                Invest
              </button>
            </form>
          </div>
          {/* Footer Section */}
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

export default AddMoreStocks;
