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
    }
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
            <h1 className='font-semibold text-gray-800 dark:text-gray-200'>Member Leaderboard</h1>
            <CardContent className=''>
                {  (!loading && dataLeaderboard.length > 0 ) && dataLeaderboard.map((item, index)=>{
                    const barWidth = item.count / maxSubmission
                    const colorCrown = index+1 === 1 ? "#C8B653"
                        : index+1 === 2
                        ? "#A9A9A9" 
                            : index+1 === 3 ? "#B65800" 
                                : "" 
                    const barColor = barWidth === 1 
                        ? "#61BD98"
                        :barWidth >= 0.75 
                            ? "#81BD61"
                            : barWidth >= 0.5
                                ? "#81BD61"
                                : barWidth >= 0.25
                                    ? "#B9BB36"
                                    : "#F5FF2F"
                    
                    console.log(`imagenya ${item.user.name}: ${item.user.img}`)
                    return(
                        <div key={index} className='grid grid-cols-12 border dark:border-gray-700 rounded-md mb-3 p-5'>
                            <div className='flex gap-3 items-center col-span-3 '>
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
                            <div className='flex col-span-9 items-center justify-between gap-2'>
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