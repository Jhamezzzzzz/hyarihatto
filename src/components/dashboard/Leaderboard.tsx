import  { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card/card'
import { FaCrown, FaUser } from 'react-icons/fa'
import useHyarihattoDataService from '../../services/HyarihattoDataService'
import { Filter } from '../../pages/QuestLeader/HomeLeader'
import NoDataOrLoading from '../ui/table/NoDataOrLoading'


interface DataLeaderboard{
    count: number,
    user: {
        name: string;
        img: string;
        username: string;
    },
      type: string;
}

const Leaderboard = ({ filter } : { filter: Filter}) => {
    const { getDashboardLeaderboard } = useHyarihattoDataService()
    const [loading, setLoading] = useState(true)
    const [maxSubmission, setMaxSubmission] = useState<number>(0)
    const [dataLeaderboard, setDataLeaderboard] = useState<DataLeaderboard[]>([])
    const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

    const fetchLeaderboard = async() => {
        try {
            setLoading(true)
            const response = await getDashboardLeaderboard(filter.type, filter.year, filter.month)
            const data = response?.data?.data
            setDataLeaderboard(data)
            if (data && data.length > 0) {
                const maxCount = Math.max(
                    ...data.map((item: { count: number }) => item.count)
                );
                setMaxSubmission(maxCount)
            }
        } catch (error) {
            console.error(error)
            setDataLeaderboard([])
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchLeaderboard()
    }, [filter.type, filter.month, filter.year])

    const handleImgErrors = (id: string) => {
        setImgErrors({
            ...imgErrors,
            [id]: true
        })
    }

  return (
    <div>
        <Card className='border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 shadow-none'>
            {filter.type == 'voice member' &&(
                <h1 className='font-semibold text-gray-800 dark:text-gray-200'>Voice Member Leaderboard</h1>
            )}
            {filter.type == 'hyarihatto' &&(
                <h1 className='font-semibold text-gray-800 dark:text-gray-200'>Hyarihatto Leaderboard</h1>
            )}
            
            <CardContent className=''>
                {  (!loading && dataLeaderboard.length > 0 ) && dataLeaderboard.map((item, index)=>{
                     const barWidth = item.count / maxSubmission 
                     const colorCrown = index+1 === 1 ? "#C8B653"
                        : index+1 === 2
                        ? "#A9A9A9" 
                            : index+1 === 3 ? "#B65800" 
                                : "" 
                  const barColor =
                        filter.type === "voice member"
                            ? "#91C8E4"
                            : filter.type === "hyarihatto"
                            ? "#81BD61"
                            : "#CCCCCC"; // fallback kalau type nggak cocok
                    
                    console.log(`imagenya ${item.user.name}: ${item.user.img}`)
                    return(
                        <div key={index} className='grid grid-cols-12 border dark:border-gray-700 rounded-md mb-3 p-5'>
                            <div className='flex gap-3 items-center lg:col-span-3 md:col-span-6 col-span-12 '>
                                <div className='dark:text-gray-400'>
                                    {index+1}
                                </div>
                                <div className=' rounded-full border size-[50px] flex items-center justify-center relative'>
                                    <div className='overflow-hidden rounded-full border size-[50px]'>
                                        {imgErrors[item.user.username] ? (
                                            <div className='flex items-center justify-center h-full'>
                                                <FaUser className='text-gray-400'/>
                                            </div>
                                        ) : (
                                            item.user.img ? (
                                                <img src={item.user.img} onError={()=>handleImgErrors(item.user.username)}/>
                                            ) : (
                                                <div className='flex items-center justify-center h-full'>
                                                    <FaUser className='text-gray-400'/>
                                                </div>
                                            )
                                        )}
                                    </div>
                                    { index+1 <= 3 && <FaCrown className='absolute -top-5 text-3xl' style={{ color: colorCrown}}/>}
                                </div>
                                <div className='flex flex-col'>
                                    <p className='dark:text-gray-400'>{item.user.name}</p>
                                    <p className='text-sm text-gray-500'>{0+item.user.username}</p>
                                </div>
                            </div>
                            <div className='flex lg:col-span-9 md:col-span-6 col-span-12 md:mt-0 mt-4 md:pl-0 pl-4 items-center justify-between gap-2'>
                                <div className={`h-[40px] transition-all duration-100`} style={{ backgroundColor: barColor, width: `${barWidth*100}%`}}></div>
                                <p className='text-2xl dark:text-gray-200 font-bold'>{item.count}</p>
                            </div>
                        </div>
                    )
                })}
                <NoDataOrLoading data={dataLeaderboard} loading={loading}/>
            </CardContent>
        </Card>
    </div>
  )
}

export default Leaderboard