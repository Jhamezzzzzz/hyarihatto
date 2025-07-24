
import { useNavigate } from 'react-router';

type TitleFormHyarihatto = {
    showBack: boolean;
}

const TitleFormHyarihatto = ({ showBack }: TitleFormHyarihatto) => {
    const navigate = useNavigate()
    
    const handleBackMainPage = () => {
        navigate("/member"); // atau "/dashboard", "/user", dst
    };

    return (
    <div>
        { showBack && (
             <button
                onClick={handleBackMainPage}
                className="absolute top-4 left-4 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300
                 hover:from-blue-600 hover:to-blue-800"
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
        )}
        <div className="mb-2 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Voice Member</h2>
            <p className="text-lg text-gray-600">“Pekerjaan Yang baik dimulai dari Ber-Improvement”</p>
        </div>
    </div>
  )
}

export default TitleFormHyarihatto