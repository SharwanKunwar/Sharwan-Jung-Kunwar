import React from 'react'
import WorkCard from '../WorkCard'

function AllWork() {
  return (
    <div className=' m-1 flex flex-col'>
      <section id='webDesign' className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5'>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"workImg/stranger_web.jpg"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
        <WorkCard title={"web 01"} imgPath={"tackStack/atom.png"}/>
      </section>
      <section  className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5 '>
        <WorkCard/>
      </section>
      <section className='flex w-full flex-wrap gap-5 justify-center items-center pt-3 border-b-1 border-black pb-5'>
        <WorkCard id={"stranger01"} title={"web 01"} imgPath={"workImg/stranger_web.jpg"}/>
        </section>
      
    </div>
  )
}

export default AllWork
