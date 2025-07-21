import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import imageSafety from "../../components/image/warehouse_assident_05.jpg";
import useAuthService from "../../services/AuthService";
import "../../css/home.css";
import useShowAlert from "../../hooks/useShowAlert";


export default function SignInLead() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { alertError } = useShowAlert();
  const navigate = useNavigate();
  const { login } = useAuthService();

  const Auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alertError("Username dan password harus diisi");
      return;
    }

    if (password.length < 6) {
      alertError("Password harus lebih dari 6 karakter");
      return;
    }

    try {
      setLoading(true);
      await login(username, password);
      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page ">
      <div style={{ zIndex: 1, maxWidth: "900px", width: "750px" }}>
        <button
                onClick={()=>navigate("/")}
                className="absolute top-4 left-4 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:from-green-600 hover:to-green-800"
            >
            <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
                Kembali
            </button>
        <div className="w-full max-w-4xl bg-white bg-opacity-60 backdrop-blur-md shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden z-10">
          {/* KIRI */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center bg-white/70">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hello!</h1>
              <h6 className="text-lg text-gray-600">Welcome To</h6>
              <h5 className="text-xl font-semibold text-blue-600 mb-4">
                Dashboard Leader
              </h5>
              <img src={imageSafety} alt="Safety" className="w-4/5 mx-auto" />
            </div>
          </div>

          {/* KANAN */}
          <div className="w-full md:w-1/2 p-8 flex items-center bg-white/80">
            <form onSubmit={Auth} className="w-full space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Login</h1>
                <p className="text-sm text-gray-500">Sign In to your account</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full outline-none bg-transparent"
                  autoComplete="username"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none bg-transparent"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition 
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
