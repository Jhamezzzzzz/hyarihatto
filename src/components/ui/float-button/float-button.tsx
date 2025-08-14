// import React from 'react'
import Button from '../button/Button'
import { FaArrowUp } from 'react-icons/fa';

const FloatButton = () => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
  return (
    <div className='fixed bottom-4 right-4 flex flex-col items-center'>
        <Button
            className='rounded-full! size-10! flex items-center justify-center p-0!'
            onClick={handleScrollToTop}
        >
            <FaArrowUp/>
        </Button>
       <p className='dark:text-gray-300'>Kembali ke Atas</p>
    </div>
  )
}

export default FloatButton