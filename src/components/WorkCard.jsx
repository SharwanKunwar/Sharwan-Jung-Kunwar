import React from 'react'

function WorkCard({title}) {
  return (
    <div className='bg-red-400 md:w-[300px] md:h-[300px] w-[330px] h-[360px] flex justify-center items-center'>
      {title}
    </div>
  )
}

export default WorkCard
