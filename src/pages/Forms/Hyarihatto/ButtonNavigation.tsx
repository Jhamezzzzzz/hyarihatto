import { useNavigate } from 'react-router';

const ButtonNavigation = () => {
    const navigate = useNavigate()

    const ButtonPrevious = (toStep: string | number) => {
        const handleNavigate = () => {
            if(toStep===0){
                navigate(`/member/hyarihatto`)
            }else{
                navigate(`/member/hyarihatto/${toStep}`)
            }
        };
        return (
            <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNavigate}
                    >
                      Kembali
                  </button>
              </div>
          </div>
        )
    }
    const ButtonNext = (toStep: string | number) => {
        const handleNavigate = () => {
            navigate(`/member/hyarihatto/${toStep}`)
        };
        return (
          <div>
              <div className="mt-8 text-right">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNavigate}
                  >
                      Selanjutnya
                  </button>
              </div>
          </div>
        )
    }

    return{ ButtonPrevious, ButtonNext}

}

export default ButtonNavigation