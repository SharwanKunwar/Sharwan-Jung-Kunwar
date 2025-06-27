import { Eye, EyeClosed, EyeOff, X } from 'lucide-react'
import React, { useState } from 'react'
import {motion} from 'motion/react';
import { RxEyeOpen } from 'react-icons/rx';
import { GiSemiClosedEye } from 'react-icons/gi';


function WorkCard({id,title,imgPath}) {
    const [preview, setPreview] = useState(false);

    const handleLivePreivew = (e) =>{
            e.preventDefault();
            if(e.target.id === 'stranger01'){
                window.open("https://stranger-cyan.vercel.app/", "_blank");
            }

                
    }
    
  return (
    <>
    <motion.div 
    exit={{opacity:0, scale:0.5}}
    initial={{y:10,opacity:0,filter:'blur(10px)',scale:0.5}}
    whileInView={{y:0,opacity:1,filter:'blur(0px)',scale:1}}
    transition={{duration:0.3}}
    className='workCard bg-gray-50 md:w-[300px] md:h-[300px] w-[330px] h-[360px] flex justify-center items-center flex-col rounded-lg '>
      <div className='w-[100%] h-[80%]  flex justify-center items-center '>
        <img className=' w-[90%] h-[90%] object-contain rounded-sm ' src={imgPath} alt="Site img" />
        <motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{duration:0.5,delay:0.3}}
        className='absolute w-full h-full flex justify-end items-end pr-3 pb-5'>
        <div className='w-[40px] h-[40px] flex justify-center items-center text-black '>
            {preview? <EyeOff className='mb-10' onClick={()=>setPreview(!preview)} size={30}/>: <Eye className='mb-10' onClick={()=>setPreview(!preview)} size={30}/>}
        </div>
        </motion.div>
    
        
      </div>
      <div className='w-full h-[20%]  flex justify-center items-center'>
        <button className='WorkBtn text-[13px] w-[160px] h-[40px] rounded-full'>Source code</button>
        <button id={id} onClick={handleLivePreivew} className='WorkBtn text-[13px] w-[160px] h-[40px] rounded-full'>Live preview</button>
      </div>
      
    </motion.div>
        {preview&&(
                <div className='   w-screen  bg-red-400 text-black z-30'>
                    <X onClick={()=>setPreview(!preview)} size={40}/>

                        <div className=' flex justify-center items-center'>
                            <img className=' w-[210px] h-full rounded-md' src={imgPath} alt="img" />
                        </div>
                </div>
        )}

    </>
    
  )
}

export default WorkCard
