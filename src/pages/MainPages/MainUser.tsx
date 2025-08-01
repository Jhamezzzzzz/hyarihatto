import { useEffect } from "react";
import { FaBook,FaEnvelopeOpenText} from "react-icons/fa"; // ✅ pakai ikon Font Awesome
import "../../css/home.css"; // ✅ pastikan file CSS ini ada
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import LabelMark from "./LabelMark";
import LogoSafety from "../../components/image/000ab1bef0f166ad984632cf1b4d63fb.png";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";

export default function MainUser() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleBackMainPage = () => {
    navigate("/"); // atau "/dashboard", "/user", dst
  };

  return (
    <section className="home">
      <div className="absolute top-1 right-2">
        <img src={LogoSafety} alt="Logo Safety" className="w-14 h-14 mr-1" />
      </div>
      <PageMeta title="Warehouse Member | Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <button
        onClick={handleBackMainPage}
         className="absolute top-4 left-4 inline-flex items-center 
          px-3 py-2 text-xs sm:text-sm
          bg-gradient-to-r from-green-400 to-gray-400 text-white 
          font-semibold rounded-full shadow-lg 
          hover:scale-105 transition-transform duration-300
          hover:from-gray-500 hover:to-green-800"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali
      </button>

      <div className="mb-10">
        <ThemeToggleButton/>
      </div>
      <div className="hyarihato">
        <motion.p
          className="title-little-1 dark:text-gray-200"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selamat datang di
        </motion.p>
        <motion.p
          className="title-little-online dark:text-gray-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Online
        </motion.p>

        <motion.p
          className="title-bigger dark:text-green-400!"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          HYARIHATTO
        </motion.p>

        <motion.p
          className="title-little dark:text-blue-600!"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          & Voice Member
        </motion.p>
      </div>
      <div className="colomn">
        <button
          data-aos="fade-up"
          data-aos-delay="0"
          className="button-user"
          onClick={() => (window.location.href = "/member/hyarihatto")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaBook size={24} />
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                lineHeight: "1.4",
              }}
            >
              <label className="justify-start" style={{ fontWeight: "bold" }}>
                ONLINE HYARIHATTO
              </label>
              <label>Catatan digital Hyarihatto</label>
            </div>
          </div>
        </button>

        <button
          data-aos="fade-up"
          className="button-leader"
          data-aos-delay="200"
          onClick={() => (window.location.href = "/member/voice-member")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaEnvelopeOpenText size={24} />
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                lineHeight: "1.4",
              }}
            >
              <label className="justify-start" style={{ fontWeight: "bold" }}>
                VOICE MEMBER
              </label>
              <label>Laporan keluhan dan kejadian</label>
            </div>
          </div>
        </button>
      </div>
      <div className="absolute bottom-1 left-2">
          <LabelMark />
        </div>
    </section>
  );
}
