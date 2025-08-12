import { useNavigate } from 'react-router';
import { ThemeToggleButton } from '../../../components/common/ThemeToggleButton';
import { useTheme } from '../../../context/ThemeContext';

type TitleFormHyarihatto = {
    showBack: boolean;
    backToHome?: boolean;
}

const TitleFormHyarihatto = ({ showBack, backToHome }: TitleFormHyarihatto) => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    
    const handleBackMainPage = () => {
        if(backToHome){
            navigate("/")
        }else{
            navigate("/member"); // atau "/dashboard", "/user", dst
        }
    };

    return (
    <div>
        { showBack && (
             <button
                onClick={handleBackMainPage}
               className="absolute top-4 left-4 inline-flex items-center 
                px-3 py-2 text-xs sm:text-sm
                bg-gradient-to-r from-green-400 to-green-600 text-white 
                font-semibold rounded-full shadow-lg 
                hover:scale-105 transition-transform duration-300
                hover:from-green-600 hover:to-green-400"
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
        <div className="absolute top-3 right-20 flex items-center gap-3">
            <p className='dark:text-gray-300'>{theme[0].toUpperCase()+theme.slice(1)} Mode</p>
            <ThemeToggleButton/>
        </div>
        <div className="mb-2 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 dark:text-gray-200">HYARIHATTO</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">“Mari ber-Hyarihatto untuk mencegah kecelakaan menimpa kita”</p>
        </div>
    </div>
  )
}

export default TitleFormHyarihatto