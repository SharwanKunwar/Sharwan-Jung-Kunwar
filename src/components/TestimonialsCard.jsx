
import {motion} from 'motion/react';


function TestimonialsCard() {
     

  return (
                <motion.div 
                initial={{ opacity: 0, scale: 0.5, filter:'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1,filter:'blur(0px)' }}
                transition={{ duration: 0.3 }}
                className='w-[350px] h-[350px] bg-gray-50 rounded-md flex justify-center items-center'>
                this is card
                </motion.div>
            )}
            

export default TestimonialsCard
