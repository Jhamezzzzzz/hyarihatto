import { useEffect } from "react";
import { FaUser, FaTrash } from "react-icons/fa"; // ✅ pakai ikon Font Awesome
import "../../css/home.css"; // ✅ pastikan file CSS ini ada
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';


const MainHome = () => {
    useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);

  return (
    <section className='home'>

        <div className='hyarihato'>
             <motion.p
                className="title-little-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                Selamat datang di
            </motion.p>
            <motion.p
    className="title-little-online"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    Online
  </motion.p>

  <motion.p
    className="title-bigger"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.6, duration: 0.6 }}
  >
    HYARIHATTO
  </motion.p>

  <motion.p
    className="title-little"
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
            onClick={() => window.location.href = "/quest-user"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaUser size={24} />
                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
                        <label 
                        className="justify-start"
                        style={{ fontWeight: "bold" }}>ONLINE HYARIHATTO</label>
                        <label>Catatan digital Hyarihatto</label>
                    </div>
                </div>
            </button>

            <button 
            data-aos="fade-up"
            className="button-leader"
            data-aos-delay="200"
            onClick={() => window.location.href = "/signin"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaUser size={24} />
                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
                        <label className="justify-start"
                        style={{fontWeight:'bold'}}>VOICE MEMBER</label>
                        <label>Laporan keluhan dan kejadian</label>
                    </div>
                </div>
            </button>

              
        </div>
    </section>
  );
};

export default MainHome;
