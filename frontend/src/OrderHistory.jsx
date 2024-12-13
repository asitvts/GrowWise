import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Navbar3 from "./components/NavBar3";

function OrderHistory() {
  const [tokenData, setTokenData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const token = getTokenFromCookie();
    setTokenData(token);
    if (!token) {
      setError("Token not found. Please log in again.");
    }
  }, [tokenData]);

  useEffect(() => {
    const handleGetOrderHistory = async () => {
      if (!tokenData) return;

      try {
        const response = await fetch(
          `http://localhost:8000/get_order_history?token=${encodeURIComponent(
            tokenData
          )}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to fetch order history.");
        }

        const data = await response.json();
        console.log(data);
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error.message);
      }
    };

    handleGetOrderHistory();
  }, [tokenData]);

  return (
    <>
    <Navbar3></Navbar3>
      <div className="flex">
        <div className="mr-60">
          <SideBar></SideBar>
        </div>
        <div className="ml-60 min-h-screen pt-20 pb-20 p-8 flex flex-col justify-center items-center relative">
          <div className="relative border-white border-opacity-20 hover:border-opacity-30 border-[0.5px] bg-opacity-95 rounded-xl pl-10 pr-10 pt-5 pb-10 max-w-md w-full">
            <header className="mb-8">
              <h1 className="mb-10">GrowWise</h1>
              <h1 className="text-4xl font-bold mb-1 text-orange-700 opacity-90">
                Transaction History
              </h1>
              <p className="text-sm opacity-40 mb-10">
                All your past investments are listed below..
              </p>
            </header>
            <main className="flex flex-col items-center gap-8">
              {error && <p className="text-red-500 text-lg mt-6">{error}</p>}

              {orderHistory.length > 0 ? (
                <div className="w-full max-w-lg rounded-lg p-6">
                  <ul className="space-y-4 list-disc list-inside text-left">
                    {orderHistory.map((order, index) => (
                      <li
                        key={index}
                        className="p-4 rounded-lg border-white border-[1px] border-opacity-20 hover:border-opacity-40 opacity-75"
                      >
                        <p>Name: {order.Name}</p>
                        <p>Stocks Bought: {order.stocks_bought.toFixed(2)}</p>
                        <p>Amount Spent: ${order.amount_spent}</p>
                        <p>
                          Stock Price at Purchase: $
                          {order.stock_price_that_time}
                        </p>
                        <p>Date of Purchase: {order.date_of_purchase}</p>
                        <p>Time of Purchase: {order.time_of_purchase}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 text-lg mt-6">
                  {error
                    ? "Error fetching data."
                    : "No transaction history available."}
                </p>
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

export default OrderHistory;
