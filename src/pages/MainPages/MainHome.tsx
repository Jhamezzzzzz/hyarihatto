import { useEffect } from "react";
import { FaUsers, FaUserTie, FaRegClipboard } from "react-icons/fa"; // FaTrash tidak dipakai, bisa dihapus jika tidak perlu
import "../../css/home.css";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageMeta from "../../components/common/PageMeta";
import LabelMark from "./LabelMark";
import LogoSafety from "../../components/image/000ab1bef0f166ad984632cf1b4d63fb.png";
import { ThemeToggleButton } from "../../components/common/ThemeToggleButton";

export default function MainHome() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className='home bg-[#f0f0f0] dark:bg-gray-900'>  
      <div className="absolute top-1 right-2">
        <img src={LogoSafety} alt="Logo Safety" className="w-14 h-14 mr-1" />
      </div>
      <PageMeta title="Online Hyarihatto & Voice Member" description="Online sistem sebagai digitalisasi buku catatan Hyarihatto" />
      <div className="mb-10">
        <ThemeToggleButton/>
      </div>
      <div className='hyarihato'>
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
          onClick={() => (window.location.href = "/member")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUsers size={24} />
            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
              <label className="justify-start" style={{ fontWeight: "bold" }}>
                Warehouse Member
              </label>
              <label>Lakukan pencatatan harian</label>
            </div>
          </div>
        </button>

        <button
          data-aos="fade-up"
          className="button-leader"
          data-aos-delay="200"
          onClick={() => (window.location.href = "/signin")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUserTie size={24} />
            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
              <label className="justify-start" style={{ fontWeight: "bold" }}>
                Group Leader
              </label>
              <label>Lihat laporan dan buat penanggulangan</label>
            </div>
          </div>
        </button>

        <button
          data-aos="fade-up"
          data-aos-delay="400"
          className="button-panduan"
          onClick={() => (window.location.href = "/panduan")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaRegClipboard size={24} />
            <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
              <label className="justify-start" style={{ fontWeight: "bold" }}>
                Panduan
              </label>
              <label className=""
              >Petunjuk pengisian catatan bagi Member</label>
            </div>
          </div>
        </button>
      </div>
      <div className="absolute bottom-1 left-2">
    <LabelMark />
  </div>
    </section>
  );
};

