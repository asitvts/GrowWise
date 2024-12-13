import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Navbar3 from "./components/NavBar3";

function FolioAnalysis() {
  const [tokenData, setTokenData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const fetchPortfolioAnalysis = async () => {
    if (!tokenData) {
      setError("User token not found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/folio_analysis_gemini?token=${encodeURIComponent(
          tokenData
        )}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio analysis.");
      }

      const data = await response.json();
      setPortfolioData(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            <header className="mb-8">
              <h1 className="mb-10">GrowWise</h1>
              <h1 className="text-4xl font-bold mb-1 text-orange-700 opacity-90">
                Portfolio Analysis
              </h1>
              <p className="text-sm opacity-40 mb-20">
                Analyze the diversity and spread of your portfolio across
                industries.
              </p>
            </header>
            <main className="flex flex-col items-center gap-8">
              <button
                onClick={fetchPortfolioAnalysis}
                className={`px-8 py-4 text-lg font-semibold rounded-full transition-transform duration-300 ${
                  loading
                    ? "bg-gray-300 text-gray-800 cursor-not-allowed animate-pulse"
                    : "bg-gradient-to-r from-orange-500 to-orange-800 text-white hover:scale-105"
                }`}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Get Portfolio Analysis"}
              </button>

              {loading && (
                <div className="mt-6">
                  <div className="loader border-t-4 border-indigo-500 w-10 h-10 rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">
                    Analyzing your portfolio...
                  </p>
                </div>
              )}

              {error && <p className="text-red-500 text-lg mt-6">{error}</p>}

              {portfolioData && (
                <div className="w-full max-w-lg rounded-lg  p-6 mt-8">
                  <h2 className="mb-4 text-white opacity-40 text-center">
                    Portfolio Insights
                  </h2>
                  <ul className="space-y-4 list-disc list-inside text-left">
                    {portfolioData.map((point, index) => (
                      <li
                        key={index}
                        className="p-4 rounded-lg  border-white border-[1px] border-opacity-20 hover:border-opacity-40"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
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

export default FolioAnalysis;
