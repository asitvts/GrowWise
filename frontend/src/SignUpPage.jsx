import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoToLoginPage = () => {
    navigate("/Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      alert("Password must contain at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Signup failed");
      }

      const data = await response.json();
      alert(
        "Sign Up Successful, a verification email has been sent to your mailbox"
      );
      handleGoToLoginPage();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 flex flex-col justify-center items-center relative font-poppins text-white from-indigo-900 via-purple-900 to-black">
      {/* Signup Form Box */}
      <div className="relative border-white border-opacity-20 hover:border-opacity-40 border-[0.5px] bg-opacity-95 rounded-xl pl-10 pr-10 pt-5 pb-10 max-w-md w-full">
        <h1>GrowWise</h1>
        <h4 className="text-4xl mt-10 font-semibold opacity-65">
          Create an Account
        </h4>
        <p className="text-gray-400 mb-8">Sign up to get started</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border-[1px] border-white border-opacity-70 text-white placeholder-gray-500 focus:ring-1 focus:border-opacity-10 focus:ring-opacity-100 focus:ring-orange-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border-[1px] border-white border-opacity-70 text-white placeholder-gray-500 focus:ring-1 focus:border-opacity-10 focus:ring-opacity-100 focus:ring-orange-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg border-[1px] border-white border-opacity-70 text-white placeholder-gray-500 focus:ring-1 focus:border-opacity-10 focus:ring-opacity-100 focus:ring-orange-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className={`rounded-md bg-gradient-to-r from-orange-500 to-orange-800 w-full py-3 px-4 hover:from-orange-400 hover:to-orange-800 text-lg font-semibold flex items-center justify-center ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <div
          className="mt-6 text-center text-white-600 opacity-60 hover:opacity-80 cursor-pointer underline"
          onClick={handleGoToLoginPage}
        >
          Already have an account? Login
        </div>
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
  );
}

export default SignupPage;
