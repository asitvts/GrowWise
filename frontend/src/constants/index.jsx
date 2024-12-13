import { GlobeLock } from "lucide-react";
import { Edit2Icon } from "lucide-react";
import { GitGraphIcon } from "lucide-react";
import { TimerIcon } from "lucide-react";
import { MousePointer } from "lucide-react";
import { ScreenShareIcon } from "lucide-react"

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export const navItems2 = [
  {
    label: "Premium",
    href: "#premium",
    onClick: () => alert("Navigate to Premium"),
  },
  {
    label: "Invest",
    href: "#invest",
    onClick: () => alert("Navigate to Invest"),
  },
  {
    label: "T&C",
    href: "#terms",
    onClick: () => alert("Navigate to Terms and Conditions"),
  },
  {
    label: "More",
    href: "#more",
    onClick: () => alert("Navigate to More options"),
  },
];



export const testimonials = [
  {
    user: "Ayushi Garg",
    company: "Stock Portfolio Inc.",
    image: user6,  // Replace with the actual image import if needed
    text: "The stock portfolio tracking system has completely transformed the way I manage my investments. The real-time stock data updates and portfolio insights are invaluable!",
  },
  {
    user: "Arnavi Garg",
    company: "Investor Insights",
    image: user2,  // Replace with the actual image import if needed
    text: "This platform has been an absolute game-changer for my investment strategy. The portfolio valuation tools and historical data analysis have helped me make more informed decisions.",
  },
  {
    user: "Arpit Gupta",
    company: "MarketWatch Solutions",
    image: user3,  // Replace with the actual image import if needed
    text: "I highly recommend this platform for anyone serious about managing their stock investments. The intuitive UI and powerful analytics features are top-notch.",
  },
  {
    user: "Anant Sharma",
    company: "Tech Investors Group",
    image: user4,  // Replace with the actual image import if needed
    text: "The stock comparison feature has been a great addition to my investment strategy. It has allowed me to easily analyze and track my portfolio against key benchmarks.",
  },
  {
    user: "A. Rashmika",
    company: "Equity Growth Partners",
    image: user5,  // Replace with the actual image import if needed
    text: "I was able to significantly improve my portfolio performance using the insights provided by this tool. The live stock prices and alerts are extremely helpful.",
  },
  {
    user: "Ananya Solanki",
    company: "Smart Investor Co.",
    image: user1,  // Replace with the actual image import if needed
    text: "Using this platform has made investing easier and more efficient. The ability to view the portfolio value in real-time is a feature I can't live without.",
  },
];


export const features = [
  {
    icon: <ScreenShareIcon />,
    text: "Intuitive Portfolio Management",
    description:
      "Effortlessly manage your stocks with a user-friendly interface designed for seamless portfolio tracking and analysis.",
  },
  {
    icon: <MousePointer />,
    text: "Multi-Device Accessibility",
    description:
      "Access your portfolio and insights on any device, whether you're on desktop, tablet, or mobile.",
  },
  {
    icon: <GitGraphIcon />,
    text: "Comprehensive Insights",
    description:
      "Dive into detailed insights about your stock performance, including diversity, trends, and key financial metrics.",
  },
  {
    icon: <TimerIcon />,
    text: "Real-Time Stock Data",
    description:
      "Stay updated with real-time stock prices, market trends, and alerts to make informed investment decisions.",
  },
  {
    icon: <Edit2Icon />,
    text: "Customizable Alerts",
    description:
      "Set personalized notifications for stock price changes to ensure you never miss critical opportunities.",
  },
  {
    icon: <GlobeLock />,
    text: "Secure Analytics Dashboard",
    description:
      "Analyze your investments with a secure and comprehensive dashboard, offering insights into profits, losses, and future projections.",
  },
];


export const checklistItems = [
  {
    title: "Effortless Portfolio Tracking",
    description:
      "Easily monitor your investments, total returns, and stock performance at a glance",
  },
  {
    title: "Real-Time Stock Analysis",
    description:
      "Stay updated with live stock prices and market trends for smarter investment decisions",
  },
  {
    title: "Custom Alerts for Key Events",
    description:
      "Receive instant notifications for price changes, all-time highs, or lows to seize opportunities",
  },
  {
    title: "Intuitive Performance Insights",
    description:
      "Visualize portfolio growth, compare stocks, and estimate future valuations seamlessly",
  },
  {
    title: "AI assist",
    description:
      "Get smart AI to analyze the diversity of your portfolio",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Add stocks to Portfolio",
      "Compare stocks",
      "Professional Dashboard",
      "Data Encryption and Security",
    ],
  },
  {
    title: "Pro",
    price: "$9",
    features: [
      "Estimate future Portfolio Value",
      "AI Analysis of Portfolio",
      "Get personal notifications",
      "Get notified about stock prices",
    ],
  },
  {
    title: "Enterprise",
    price: "$19",
    features: [
      "Maintain multiple Portfolios",
      "Unlimited Storage",
      "Tax Reports",
      "Contact Experts",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#testimonials", text: "Testimonials" },
];

export const platformLinks = [
  { href: "#features", text: "Features" },
  { href: "#", text: "Downloads" },
  { href: "#pricing", text: "Pricing" },
];

