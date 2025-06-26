import React from 'react'
import WorkCard from '../WorkCard'

function AllWork() {
  return (
    <div className=' m-1 flex flex-col'>
      <section id='webDesign' className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5'>
        <WorkCard title={"web 01"}/>
        <WorkCard title={"web 02"}/>
        <WorkCard title={"web 03"}/>
        <WorkCard title={"web 04"}/>
        <WorkCard title={"web 05"}/>
        <WorkCard title={"web 06"}/>
      </section>
      <section id='motion' className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5'>
        <WorkCard/>
      </section>
      <section id='smallProjects' className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5'>
        <WorkCard/>
        </section>
      
    </div>
  )
}

export default AllWork
