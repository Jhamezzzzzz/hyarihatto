import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import imageSafety from "../../components/image/warehouse_assident_05.jpg";
import useAuthService from "../../services/AuthService";
import "../../css/home.css";
import PageMeta from "../../components/common/PageMeta";
import useVerify from "../../hooks/useVerify";

interface Errors{
  username: string;
  password: string;
}

export default function SignInLead() {
  const { name } = useVerify()
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Errors>({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState<Errors>({
    username: "",
    password: ""
  })
  const navigate = useNavigate();
  const { login } = useAuthService();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setErrors({ ...errors, [name]: ""})
    setForm({ ...form, [name]: value})
  }

  const validateForm = () => {
    const newErrors: Partial<Errors> = {}
    if(form.username === "" || !form.username){
      newErrors.username = "Username tidak boleh kosong!"
    }
    if(form.password === "" || !form.password){
      newErrors.password = "Password tidak boleh kosong!"
    }
    setErrors({ ...errors, ...newErrors})
    return Object.keys(newErrors).length === 0
  }

  const Auth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm()
    if(!isValid){
      return
    }

    try {
      setLoading(true);
      await login(form.username, form.password);
      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(name){
      navigate("/home")
    }
  }, [name])

  return (
    <div className="login-page ">
      <PageMeta title="Leader Login | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
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
          <div className="w-full md:w-1/2 p-8 flex flex-col justif-start items-center text-start bg-white/70">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hello!</h1>
              <h6 className="text-lg text-gray-600 px-3">Welcome To</h6>
              <h5 className="text-2xl font-semibold text-green-600 mb-4 text-center">
                Dashboard Leader
              </h5>
              <img src={imageSafety} alt="Safety" className="w-4/5 mx-auto" />
            </div>
          </div>

          {/* KANAN */}
          <div className="w-full md:w-1/2 p-8 flex items-center bg-white/80">
            <form onSubmit={Auth} className="w-full space-y-7">
              <div>
                <p className="text-4xl font-bold mb-1">Login</p>
                <p className="text-sm text-gray-500">Sign In to your account</p>
              </div>
              <div>
                <div className={`flex items-center border ${errors.username !== "" ? "border-error-500" :  "border-gray-300"} rounded px-3 py-2`}>
                  <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChangeInput}
                    className="w-full outline-none bg-transparent"
                    autoComplete="username"
                  />
                </div>
                { errors.username !== "" && <p className="text-error-500">{errors.username}</p>}
              </div>
              <div>
                <div className={`flex items-center border ${errors.password !== "" ? "border-error-500" : "border-gray-300"} rounded px-3 py-2`}>
                  <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChangeInput}
                    className="w-full outline-none bg-transparent"
                    autoComplete="current-password"
                  />
                </div>
                { errors.password !== "" && <p className="text-error-500">{errors.password}</p>}
              </div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition 
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
