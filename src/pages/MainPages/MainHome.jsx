import React from "react";
import { FaUser, FaTrash } from "react-icons/fa"; // ✅ pakai ikon Font Awesome
import "../../css/home.css"; // ✅ pastikan file CSS ini ada

const Home = () => {
  return (
    <section className='home'>
        <div className='hyarihato'>
            <p className="title-little-1">Selamat datang di</p>
            <p className="title-bigger">HYARIHATTO</p>
            <p className="title-little">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</p>
         </div>
      <div className="colomn">
            <button 
            className="button-user"
            onClick={() => window.location.href = "/user-hyarihatto"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaUser size={24} />
                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
                        <label 
                        className="justify-start"
                        style={{ fontWeight: "bold" }}>Warehouse Member</label>
                        <label>Lakukan pencatatan harian</label>
                    </div>
                </div>
            </button>

            <button 
            className="button-leader"
            onClick={() => window.location.href = "/login"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaUser size={24} />
                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
                        <label className="justify-start"
                        style={{fontWeight:'bold'}}>Group Leader</label>
                        <label>Lihat laporan dan buat penanggulangan</label>
                    </div>
                </div>
            </button>

              <button 
              className="button-leader"
               onClick={() => window.location.href = "/panduan"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FaUser size={24} />
                    <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", lineHeight: "1.4" }}>
                        <label className="justify-start"
                        style={{fontWeight:'bold'}}>Panduan</label>
                        <label>Petunjuk pengisian catatan bagi Member</label>
                    </div>
                </div>
            </button>
        </div>
    </section>
  );
};

export default Home;
