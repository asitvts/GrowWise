import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartArea,
  Coins,
  ChartSpline,
  TestTubeDiagonal,
  CircleDollarSign,
  LayoutDashboard,
  ReceiptText,
} from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();

  const handleGoToInvest = () => navigate("/AddMoreStocks");
  const handleGoToCompare = () => navigate("/Compare");
  const handleEstimateClick = () => navigate("/Estimate");
  const handleGoToAnalysis = () => navigate("/PortfolioAnalysis");
  const handleOrderHistoryClick = () => navigate("/OrderHistory");
  const handleGoToDashboard = () => navigate("/Dashboard");

  return (
    <div id="sidebar-comp">
      <div className="z-0 pt-20 w-64 p-6 shadow-xl border-[1px] border-opacity-10 border-white fixed top-15 left-0 h-full bottom-0">
        <h2 className="text-xl font-semibold text-white opacity-70 mb-4">
          Navigation
        </h2>

        <div className="space-y-4">
          <button
            onClick={handleGoToDashboard}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <span className="pr-1">
              <LayoutDashboard />
            </span>
            Dashboard
          </button>
          <button
            onClick={handleEstimateClick}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <span className="pr-1">
              <TestTubeDiagonal />
            </span>
            Estimate
          </button>
          <button
            onClick={handleGoToCompare}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <span className="pr-1">
              <ChartArea />
            </span>
            Compare Stocks
          </button>
          <button
            onClick={handleGoToAnalysis}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <span className="pr-1">
              <ChartSpline />
            </span>
            Analyze Portfolio
          </button>
          <button
            onClick={handleGoToInvest}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <span className="pr-1">
              <Coins />
            </span>
            Invest More
          </button>
          <button
            onClick={handleOrderHistoryClick}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center"
          >
            <ReceiptText />
            <span className="pl-1">{"Order History"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
