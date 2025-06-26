import './App.css';
import { List, Menu, X } from 'lucide-react';
import { useRef, useState,useEffect } from 'react';
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { SpotlightPreview } from './components/ui/SpotlightPreview';
import {motion} from 'motion/react';
import { ShootingStars } from "@/components/ui/ShootingStars";
import { StarsBackground } from "@/components/ui/StarsBackground";
import SkillCard from './components/SkillsCard';
import AllWork from './components/Work/AllWork';



function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  //page refrences
  const homePageRef = useRef(null);
  const aboutPageRef = useRef(null);
  const resumePageRef = useRef(null);
  const workPageRef = useRef(null);
  const contactPageRef = useRef(null);

  useEffect(() => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 } // Adjust to trigger when 50% of the section is visible
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, []);






  //This is for scroll down to the pages
  const scrollToPages = (e) => {
  const id = e.target.id;
  setActiveSection(`${id}`);
  // console.log(e.target)
  switch (id) {
    case 'home':
      homePageRef.current?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'about':
      aboutPageRef.current?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'resume':
      resumePageRef.current?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'work':
      workPageRef.current?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'contact':
      contactPageRef.current?.scrollIntoView({ behavior: 'smooth' });
      break;
    default:
      break;
  }
};





  return (
    <>

      {/* Home page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='home' ref={homePageRef} className='w-full h-full'>
        
        {/* top content  */}
        <header id='header' className=' w-full md:h-[100px] h-[90px] flex justify-center md:items-center'>  {/* //you can set backimg in here in feture */}
          <div className='bg-gray-50/30 md:backdrop-blur-2xl w-full md:mr-4 md:h-[100px] h-[90px] flex justify-center md:items-center absolute z-50'> 
            
            <nav className='bg-white/30 md:w-[90%] w-full md:h-[70%] h-full md:rounded-full border border-white/30 backdrop-blur-2xl flex justify-between items-center gap-5'>
              {/* nav-left-box */}
              <div className='w-[20%] h-full flex justify-start items-center pl-3'>
                <a href="/"><motion.img 
                initial={{ rotateZ: 1080, opacity: 0,scale:0}}
                animate={{ rotateZ: 0, opacity: 1 ,scale:1}}
                transition={{ duration: 0.3 }}
                whileHover={{rotate:720, scale:1.1}}
                className='w-[50px]' src="/aliens-line.svg" alt="logo" /></a>
                <h1 className='md:flex hidden ml-1'>Sharwan jung kunwar</h1>
              </div>
                {/* nav-middle-box */}
              <div className=' w-[60%] h-full flex justify-center items-center'>
                <ul className='md:flex w-full h-full justify-end items-center gap-10 hidden'>
                  <a id='home' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#home" className={activeSection === 'home' ? 'text-blue-400 border-b border-black' : ''}>Home</a>
                  <a id='about' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#about" className={activeSection === 'about' ? 'text-blue-400 border-b border-black' : ''}>About</a>
                  <a id='resume' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#resume" className={activeSection === 'resume' ? 'text-sky-400 border-b border-black ' : ''}>Resume</a>
                  <a id='work' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#Work" className={activeSection === 'work' ? 'text-sky-400 border-b border-black ' : ''}>Work</a>
                  <a id='contact' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#contact" className={activeSection === 'contact' ? 'text-sky-400 border-b border-black ' : ''}>Contact</a>
                </ul>
              </div>

              {/* nav-right-box */}
              <div className=' w-[20%] h-full flex justify-center items-center'>
                {/* laptop */}
                <section className=' w-full h-full md:flex justify-center items-center gap-5 hidden'>
                  <a target='_blank' href="https://www.facebook.com/sravana.kumvara/"><FaFacebook size={22} color="#1877F2" /></a>
                  <a href="#instagram"><FaInstagram size={22} color="#E1306C" /></a>
                 <a href="https://github.com/SharwanKunwar"><FaGithub size={22} color="#333" /></a>
                </section>
                {/* phone */}
                <section className='mr-5 md:hidden'>
                  {!isOpen? <Menu onClick={(e)=>setIsOpen(!isOpen)} size={40}/>: <List size={40}/>}
                </section>
                {isOpen&&(
                  <div className='bg-gray-50/30 backdrop-blur-2xl absolute top-0 right-0 w-screen h-screen flex justify-center items-center z-50'>
                    <div id='phone-menu-box' className='bg-gray-50 border border-white w-[85%] h-[65%] rounded-2xl backdrop-blur-4xl shadow-sm'>
                      <div className=' w-full h-[15%] flex justify-between items-center px-5'>
                        <h1 className='text-2xl'>Menu</h1>
                        <X onClick={()=>setIsOpen(!isOpen)} size={30}/>
                      </div>
                      <div className=' w-full h-[70%]'>
                        <ul className='flex flex-col w-full h-full justify-start items-center gap-7 py-5 '>
                        <a id='home' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#home" className={activeSection === 'home' ? 'text-sky-400 border-b border-black text-[20px]' : 'text-[20px] text-neutral-600'}>Home</a>
                        <a id='about' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#about" className={activeSection === 'about' ? 'text-sky-400 border-b border-black text-[20px]' : 'text-[20px] text-neutral-600'}>About</a>
                        <a id='resume' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#resume" className={activeSection === 'resume' ? 'text-sky-400 border-b border-black text-[20px]' : 'text-[20px] text-neutral-600'}>Resume</a>
                        <a id='work' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#Work" className={activeSection === 'work' ? 'text-sky-400 border-b border-black text-[20px]' : 'text-[20px] text-neutral-600'}>Work</a>
                        <a id='contact' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#contact" className={activeSection === 'contact' ? 'text-sky-400 border-b border-black text-[20px]' : 'text-[20px] text-neutral-600'}>Contact</a>
                      </ul>
                      </div>
                      <div className=' w-full h-[15%] flex justify-center items-center gap-10'>
                        <a href="#facebook"><FaFacebook size={25} color="#1877F2" /></a>
                        <a href="#instagram"><FaInstagram size={25} color="#E1306C" /></a>
                        <a href="https://github.com/SharwanKunwar"><FaGithub size={25} color="#333" /></a>
                      </div>
                    </div>
                  </div>
                )}
              
              </div>
            </nav>

          </div>
        </header>

        {/* bottom content */}
        <main className=' w-full relative'>
          <SpotlightPreview/>
          {/* <section className='bg-yellow-400 h-[20%] md:hidden lg:block'>love</section> */}
          <ShootingStars />
        <StarsBackground />
        </main>
      </section>
      {/* Home page  end ---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}


      {/* About page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='about' ref={aboutPageRef} className='bg-black w-full  flex flex-col relative md:mt-10 mt-20 rounded-t-md'>

        <motion.div 
        initial={{scale:0.80, opacity:0, filter:'blur(10px)'}}
        whileInView={{scale:1, x: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className='w-full  text-white pt-30 md:pb-20 pb-10 flex flex-col justify-center items-center'>
          <h2 className='text-2xl'>About</h2>
          <section className=' md:w-6/40 w-6/12 '>
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" stroke-width="1"></path>
          </svg>
          </section>
          <p className='mt-2 text-center p-1'>"Passionate about coding, learning, and creating impactful solutions."</p>
        </motion.div>
        {/* content */}
        <div id='about' ref={aboutPageRef} className=' w-full md:p-5 md:flex'>
          <div className=' md:w-6/12  flex justify-center items-center p-2'>
          <motion.img 
          initial={{ x: -200, opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration:0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className='w-[430px] z-20 rounded-lg shadow-md' src="sharwanjungkunwar0007.jpg" alt="img" />
          </div>
          <motion.div 
          initial={{ x: 200, opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-gray-50 md:w-6/12  md:p-2 p-6 flex flex-col gap-3 md:pr-20'>
          <span className='text-sky-400'>About Me</span>
          <h1 className='text-3xl'>Full-Stack Developer</h1>
          <p className='text-start pt-2'>Hi, I'm Sharwan Jung Kunwar, a Full-stack developer from Nepal skilled in React, Spring Boot, Tailwind CSS, and PostgreSQL. Passionate about building seamless apps, exploring new tech, and sharing knowledge. Guitar player and gamer at heart. Let’s build something awesome!</p>
          <p className='text-start pt-3 pb-3 text-neutral-300'>"From interactive frontends to robust backends—crafting full-stack experiences that inspire." 🚀</p>
          <motion.div 
          initial={{x:-50,scale:1, opacity:0, filter:'blur(5px)'}}
          whileInView={{scale:1, x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.3, delay:0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-gray-50/30 text-gray-50 w-full md:h-[250px] h-[450px] rounded-xl border border-white/90 backdrop-blur-2xl p-6 mt-5 flex flex-col justify-center">
              <div className=" grid md:grid-cols-2 grid-cols-1 md:gap-y-4 gap-y-3   md:gap-x-4 gap-x-1 md:overflow-hidden overflow-auto">
                <div>
                  <p className="text-gray-400">Full Name</p>
                  <p className="font-semibold text-lg">Sharwan jung kunwar</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-semibold text-lg text-blue-800">+9779763290022</p>
                </div>
                <div>
                  <p className="text-gray-400">Age</p>
                  <p className="font-semibold text-lg">21 Years</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-semibold text-lg">sharwankunwar07@gmail.com</p>
                </div>
                <div>
                  <p className="text-gray-400">Occupation</p>
                  <p className="font-semibold text-lg">Software Developer</p>
                </div>
                <div>
                  <p className="text-gray-400">Nationality</p>
                  <p className="font-semibold text-lg">Nepali</p>
                </div>
              </div>    
            </motion.div>
          </motion.div>
        </div>

        <section className='text-white  p-5 md:pl-40 md:flex md:flex-wrap md:flex-row flex flex-col gap-5 py-20'>
          <SkillCard 
            title='C Language' 
            description='Strong foundation in C programming, including pointers, memory, data structures, and procedural logic. Built various small console apps.' 
            value={95} 
          />
          <SkillCard 
            title='Java' 
            description='Skilled in Java with Spring Boot and Android development. Strong in OOP, RESTful APIs, and building scalable backend solutions.' 
            value={87} 
          />
          <SkillCard 
            title="JavaScript" 
            description="Comfortable with JS basics, DOM, and ES6+. Exploring async programming and using JavaScript with React in frontend development." 
            value={50} 
          />
          <SkillCard 
            title="React js" 
            description="Builds UIs using components, hooks, and props. Familiar with APIs, routing, and context. Exploring more of the React ecosystem." 
            value={70} 
          />
          <SkillCard 
            title="Tailwindcss" 
            description="Uses utility classes to create modern, responsive layouts. Confident in custom themes and integration with frameworks like React." 
            value={75} 
          />
          <SkillCard 
            title="Motion" 
            description="Understands basics of framer-motion for animations in React. Can create transitions and hover effects, still learning advanced control." 
            value={50} 
          />
          <SkillCard 
            title="Spring Boot" 
            description="Learning Spring Boot for backend. Exploring REST APIs, dependency injection, and app structure in Java projects." 
            value={0} 
          />
          <SkillCard 
            title="PostgreSQL" 
            description="Knows database basics, PostgreSQL syntax, and queries. Can handle joins and schema design. Still building hands-on experience." 
            value={30} 
          />
        </section>
      
          
      
        <ShootingStars />
        <StarsBackground />
      </section>


      {/* Resume page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='resume' ref={resumePageRef} className=' w-full flex flex-col gap-10 relative py-20'>

        {/* title */}
        <motion.div 
        initial={{y:100,opacity:0,scale:0.98,filter:'blur(10px)'}}
        whileInView={{y:0,opacity:1,scale:1,filter:'blur(0px)'}}
        transition={{duration:0.5}}
        className=' w-full flex justify-center flex-col items-center text-white text-center'>
          <h1 className='text-4xl'>Resume</h1>
          <section className=' md:w-6/40 w-6/12 '>
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" stroke-width="1"></path>
          </svg>
          </section>
          <p className='md:w-6/11 pt-5 p-3 text-neutral-400'>Experienced in backend development with Java, C, Android, and Spring Boot. Pursuing a Bachelor’s in Computer Applications, constantly exploring full-stack development and new technologies. 🚀</p>
        </motion.div>
        {/* work experience */}
        <div className='relative text-white py-15'>
            <motion.h1 
            initial={{y:100,opacity:0,scale:1,filter:'blur(10px)'}}
        whileInView={{y:0,opacity:1,scale:1,filter:'blur(0px)'}}
        transition={{duration:0.5}}
            className='text-3xl md:pl-30 pl-5 mb-2'>Work Experience</motion.h1>
            <motion.p 
            initial={{y:100,opacity:0,scale:1,filter:'blur(10px)'}}
        whileInView={{y:0,opacity:1,scale:1,filter:'blur(0px)'}}
        transition={{duration:0.5}}
            className='md:pl-30 pl-5 text-neutral-400'>A summary of my professional roles, responsibilities, and contributions, showcasing my growth, skills, and expertise in the field.</motion.p>

            <div className='w-full md:h-[800px] h-[1300px] mt-15 md:pl-20 pl-3 flex flex-col md:gap-15 gap-10 '>
              {/* one */}
              <motion.div 
              initial={{y:100,opacity:0,filter:'blur(0px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.5,delay:0.4}}
              className=' w-full md:h-[300px] p-1 md:flex md:flex-row justify-between flex flex-col gap-5'>
                <div className=' md:w-[23.6%] md:h-[20%] md:ml-30  md:border-r-10 md:border-l-0 border-l-10 border-r-0 border-sky-400 md:border-sky-400'>
                  <h1 className='md:text-[20px] text-2xl  mb-1 pl-5'>Frontend Development</h1>
                  <p className='text-sky-400 md:text-[15px] pl-5'>July, 2025 - Current</p>
                </div>
                <div className=' md:w-6/10 md:h-[90%] md:mr-10 pl-10'>
                  <h1 className='md:text-[20px] mb-2 '> JavaScript / ReactJS </h1>
                  <p className='text-neutral-400 md:pr-15'>I began my frontend journey with HTML, CSS, and JavaScript, building simple static pages. Later, I explored React.js, which transformed the way I build modern web interfaces.</p>
                  <p className='md:text-[14px] mt-3'>I’ve worked on several frontend projects where I focused on:</p>
                  <ul className='md:text-[13px] mt-2 text-neutral-400'>
                    <li className='pt-1'><span className='text-red-500'>#</span> <span>Component-based design using React</span></li>
                    <li className='pt-3'><span className='text-red-500'>#</span> <span>Responsive UI using Tailwind CSS</span></li>
                    <li className='pt-3'><span className='text-red-500'>#</span> <span>Smooth animations with Framer Motion</span></li>
                    <li className='pt-3'><span className='text-red-500'>#</span> <span>Icon libraries like lucide-react and react-icons</span></li>
                    <li className='pt-3'><span className='text-red-500'>#</span> Implementing scroll-based navigation where the active nav item highlights based on the visible section</li>
                  </ul>
                </div>
              </motion.div>

              {/* two */}
              <div className='bg-white w-[2px] h-[75%] absolute md:left-6/17  rounded-full left-5 z-10'> </div>
              <motion.div 
              initial={{y:100,opacity:0,filter:'blur(0px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.5,delay:0.3}}
              className=' w-full h-[180px] md:flex md:flex-row pl-1 md:pl-0 justify-between flex flex-col gap-5'>
                <div className=' md:w-[23.5%] md:h-[30%] md:ml-31  md:border-r-10 md:border-l-0 border-l-10 border-r-0 border-sky-400 md:border-sky-400'>
                  <h1 className='md:text-[20px] text-2xl  mb-1 pl-5'>Exploring Programming</h1>
                  <p className='text-sky-400 pl-5'>Before 2025</p>
                </div>
                <div className=' md:w-6/10 md:h-[90%] md:mr-10 pl-10'>
                  <h1 className='md:text-[20px] mb-2'> C / Java and Other programming Practices</h1>
                  <p className='text-neutral-400 md:pr-15'>I focused mainly on programming fundamentals using C and Java. I practiced problem-solving, logic building, and core concepts like data structures and algorithms, without diving into frontend or backend frameworks.</p>
                  <p className='mt-3 text-gray-50'>I've worked on several projects:</p>
                  <ul className='md:text-[13px] mt-2 text-neutral-400'>
                    <li className='pt-3'><span className='text-red-500'># </span> Library management system in both languages</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Encryption and Decryption</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Lucifer AI but static</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Student management system</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Several games</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Menu based systems</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Password generator</li>
                    <li className='pt-3'><span className='text-red-500'># </span> Units convertor</li>
                  </ul>
                </div>
              </motion.div>
            </div>
        </div>

        {/* my education */}
        <div className='relative text-white py-0'>
            <motion.h1 
            initial={{y:100,opacity:0,filter:'blur(0px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.3}}
            className='text-3xl md:pl-30 pl-5 mb-2'>Education</motion.h1>
            <motion.p 
            initial={{y:100,opacity:0,filter:'blur(10px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.3}}
            className='md:pl-30 pl-5 text-neutral-400'>An overview of my academic journey, highlighting my qualifications, coursework, and skills gained to support my professional growth.</motion.p>

            <div className='w-full md:h-[400px] h-[600px] mt-15 md:pl-20 pl-3 flex flex-col md:gap-15 gap-10 '>
              {/* one */}
              <motion.div 
              initial={{y:100,opacity:0,filter:'blur(0px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.5,delay:0.4}}
              className=' w-full md:h-[150px] p-1 md:flex md:flex-row justify-between flex flex-col gap-5 '>
                <div className=' md:w-[23.6%] md:h-[80px] md:ml-30  md:border-r-10 md:border-l-0 border-l-10 border-r-0 border-sky-400 md:border-sky-400 '>
                  <h1 className='md:text-[20px] text-2xl  mb-1 pl-5'>Durga Laxmi Model School, Kailali</h1>
                  <p className='text-sky-400 md:text-[15px] pl-5'>2076-2078</p>
                </div>
                <div className=' md:w-6/10 md:h-[90%] md:mr-10 pl-10'>
                  <h1 className='md:text-[20px] mb-2 '>High School Diploma, Passed +2</h1>
                  <p className='text-neutral-400 md:pr-15'>Graduated with a strong academic record. Engaged in extracurricular activities and clubs.</p>
                </div>
              </motion.div>

              {/* two */}
              <div className='bg-white w-[2px] md:h-[70%] h-[75%] absolute md:left-6/17  rounded-full left-5 z-10'> </div>
              <motion.div 
              initial={{y:100,opacity:0,filter:'blur(0px)'}}
              whileInView={{y:0,opacity:1,filter:'blur(0px)'}}
              transition={{duration:0.5,delay:0.4}}
              className=' w-full h-[180px] md:flex md:flex-row pl-1 md:pl-0 justify-between flex flex-col gap-5'>
                <div className=' md:w-[23.5%] md:h-[45%] md:ml-31  md:border-r-10 md:border-l-0 border-l-10 border-r-0 border-sky-400 md:border-sky-400 '>
                  <h1 className='md:text-[20px] text-2xl  mb-1 pl-5'>Ratna RajyaLaxmi campus (TU)</h1>
                  <p className='text-sky-400 pl-5'>2081-2084</p>
                </div>
                <div className=' md:w-6/10 md:h-[90%] md:mr-10 pl-10'>
                  <h1 className='md:text-[20px] mb-2'>Bachelor's Student BCA</h1>
                  <p className='text-neutral-400 md:pr-15'>Currently pursuing a Bachelor's degree, I focus on academic growth and skill development through hands-on projects, coding club events, and tech meetups, while also dedicating time to online courses and personal projects.</p>
                  
                </div>
              </motion.div>
              
            </div>

            


        </div>


        <ShootingStars />
        <StarsBackground />
      </section>


      {/* Work  --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='work' ref={workPageRef}  className=' w-full  flex flex-col gap-10 text-white'>
        
        {/* ///// */}
        <div className=' w-full h-screen flex flex-col items-center'>
          
          {/* title */}
          <div className=' md:w-[50%] w-[90%] flex flex-col justify-center items-center py-5 text-center'>
            <h1 className='text-4xl'>My Work</h1>
            <section className=' md:w-6/40 w-6/12 '>
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" stroke-width="1"></path>
          </svg>
          </section>
            <p className='pt-5 pb-5 text-neutral-400'>I have built diverse projects, including an Online Casino Platform with secure transactions, a Library Management System and more. 🚀</p>
          </div>

          {/* nav menu */}
          <div className=' md:w-[50%] w-[90%] h-[250px] flex gap-5 justify-around items-center flex-wrap md:py-0 py-10'>
              <button className='bg-purple-400 rounded-full py-2 text-[15px] px-10'>All Work</button>
              <button className='bg-purple-400 rounded-full py-2 text-[15px] px-10'>Web Design</button>
              <button className='bg-purple-400 rounded-full py-2 text-[15px] px-10'>Motion</button>
              <button className='bg-purple-400 rounded-full py-2 text-[15px] px-10'>Small Project</button>
          </div>

          <div className=' w-[90%] h-full overflow-y-auto overflow-x-hidden'>

            <AllWork/>
          </div>
        </div>
        {/* ///// */}
        
        
      </section>
















      {/* Contact page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='contact' ref={contactPageRef} className='bg-gray-400 w-full h-screen'>contact</section>
                
        
    </>
  );
}

export default App;
