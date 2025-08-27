import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './customButton'

function Notification({title, description, showPreview=false, path, onClose }) {
  const navigate = useNavigate()
  const [isExiting, setIsExiting] = useState(false)
  
  let time = new Date();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500);
  }

  return (
    <motion.div 
    initial={{scale: 0}} 
    animate={{scale: 1}} 
    transition={{duration: 0.5, ease: 'easeInOut'}} 
    className={`${isExiting && 'scale-0'} transition-all duration-600 mr-2 mb-2`}
    >
      <div className={`
        card w-[220px] md:w-[320px] lg:w-[420px] bg-[#0000007a] 
        min-h-[140px] backdrop-blur-sm rounded-2xl 
        flex justify-center items-center
      `}>
        <div className="spacer m-4 w-full h-full">
          <div className="info mb-4">
            <div className="flex justify-between">
              <h1 className={`text-[22px] wrap-break-word ${title == "Error" && "text-red-500"}`}>{title ? title : "Title"}</h1>
              <h5 className={`pt-2`}>
                {
                  `${time.getHours() > 12 ? time.getHours() - 12 : time.getHours()}:${time.getMinutes().toString().padStart(2, '0')} ${time.getHours() >= 12 ? "PM" : "AM"}`
                }
              </h5>
            </div>
            <p className='wrap-break-word'>{description ? description : "Description"}</p>
          </div>
          <div className="btns-container flex flex-row justify-center">
            {showPreview && 
              <Button 
                func={() => {
                  navigate(path)
                  handleClose()
                }}
                text={"Review"} 
                customStyle={
                  "text-[white] w-[130px] h-[30px] bg-[#5324e4] rounded-[8px] mr-2 cursor-pointer pointer-events-auto"
                } 
              />
            }
            <Button 
              text={"Dismiss"} 
              customStyle={
                "text-[white] w-[130px] h-[30px] bg-[#383845] rounded-[8px] mr-2 cursor-pointer pointer-events-auto"
              }
              func={() => {handleClose()}}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Notification