import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeMessage } from '../states/messagesSlice';

const Messages = ({ message, type, index, messageId }) => {

    const [visible, setVisible] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const [animationDelay, setAnimationDelay] = useState(0);
    const [animationDuration, setAnimationDuration] = useState(5000);
    const [timerPaused, setTimerPaused] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        let timer;
    
        if (!timerPaused) {
          timer = setTimeout(() => {
            setVisible(false);
            dispatch(removeMessage({ messageId: messageId }))
          }, 5000 - animationDelay); // Adjust timeout based on animation delay
        }
    
        return () => {
          clearTimeout(timer)
        };
      }, [timerPaused, animationDelay]);

      const handleMouseEnter = () => {
        setIsHovered(true);
        setTimerPaused(true)
        setAnimationDuration(5000 - animationDelay);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
        setTimerPaused(false)
        setAnimationDelay(5000 - animationDuration); // Track how much time has passed
        setAnimationDuration(5000);
      };

  return (
    <div className={`w-[300px] grid ${index > 4 && 'grid-cols-2'}`}>
        {visible && <div 
        className={`bg-white rounded-md shadow-lg p-[8px] relative  break-all w-[300px] mb-2 `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
            <div className=' flex justify-between gap-2'>
                <div className=' flex items-center p-[6px] my-[8px]'>
                    {type === 'Success' ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path fill="#4CAF50" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.41l-3.59-3.59L7 13.41l4 4 8-8-1.41-1.41-7.59 7.59z"/>
                        <path fill="white" d="M9.29 13.71L7.88 12.3 7 13.17l2.29 2.29L16 9.58l-.71-.7z"/>
                    </svg>)
                    :
                    (<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill={`${type === 'info' ? '#007bff' : '#FF204E'}`} d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>)}
                    <p className=' text-[10px] text-[#757575] ml-1 '>{message}</p>
                </div>
                <div>
                    <button>
                        <svg onClick={()=>setVisible(false)} xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20"><path fill="#757575" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="overflow-hidden
            ">{visible && 
            (
                <div 
                    className={`w-full h-1 ${type === 'Success' ? 'bg-[#4CAF50]': type === 'info' ? 'bg-[#007bff]' : 'bg-[#FF204E]' } absolute bottom-0 left-0 animate-shrink `}
                    style={{
                        animationPlayState: isHovered ? 'paused' : 'running',
                        animationDelay: `-${animationDelay}ms`,
                        animationDuration: `${animationDuration}ms`
                    }}
                    >    
                </div>
            )}
    </div>
    </div>}
    </div>
  )
}

export default Messages