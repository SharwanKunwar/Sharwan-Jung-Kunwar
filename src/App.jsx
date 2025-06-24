import './App.css';
import { List, Menu, X } from 'lucide-react';
import { useRef, useState,useEffect } from 'react';
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { SpotlightPreview } from './components/ui/SpotlightPreview';
import {motion} from 'motion/react';
import { ShootingStars } from "@/components/ui/ShootingStars";
import { StarsBackground } from "@/components/ui/StarsBackground";



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
                  <a id='home' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#home" className={activeSection === 'home' ? 'text-white border-b border-black ' : ''}>Home</a>
                  <a id='about' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#about" className={activeSection === 'about' ? 'text-white border-b border-black ' : ''}>About</a>
                  <a id='resume' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#resume" className={activeSection === 'resume' ? 'text-white border-b border-black ' : ''}>Resume</a>
                  <a id='work' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#Work" className={activeSection === 'work' ? 'text-white border-b border-black ' : ''}>Work</a>
                  <a id='contact' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#contact" className={activeSection === 'contact' ? 'text-white border-b border-black ' : ''}>Contact</a>
                </ul>
              </div>

              {/* nav-right-box */}
              <div className=' w-[20%] h-full flex justify-center items-center'>
                {/* laptop */}
                <section className=' w-full h-full md:flex justify-center items-center gap-5 hidden'>
                  <a href="#facebook"><FaFacebook size={22} color="#1877F2" /></a>
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
      <section id='about' ref={aboutPageRef} className='bg-black w-full flex flex-col relative md:mt-10 mt-20 rounded-t-2xl'>

        <div className='w-full text-white pt-30 pb-10 flex flex-col justify-center items-center'>
          <h2 className='text-2xl'>About</h2>
          <section className=' w-6/12'>
            <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" stroke-width="1"></path>
          </svg>
          </section>
          <p className='mt-2 text-center'>"Passionate about coding, learning, and creating impactful solutions."</p>
        </div>
        {/* content */}
        <div className='bg-yellow-400 w-full md:p-5 md:flex'>
          <div className='bg-purple-400 md:w-6/12  flex justify-center items-center p-2'>
          <img className='w-[430px] rounded-lg shadow-md' src="sharwanjungkunwar0007.jpg" alt="img" />
          </div>
          <div className='bg-red-400 md:w-6/12  p-2 flex flex-col gap-2 md:pr-20'>
          <span className='text-sky-400'>About Me</span>
          <h1 className='text-3xl'>Full-Stack Developer</h1>
          <p className='text-start pt-2'>Hi, I'm Sharwan Jung Kunwar, a full-stack developer skilled in React, Spring Boot, Tailwind CSS, Three.js, and PostgreSQL. I enjoy building seamless and responsive web applications from frontend to backend. With a strong foundation in Java and experience in tools like Android Studio, I bring both creativity and structure to my projects. I'm passionate about continuous learning, exploring emerging technologies, and sharing knowledge with others. Beyond coding, I enjoy playing guitar and gaming. Let’s connect and build something amazing!</p>
          <p className='text-start pt-2'>"From interactive frontends to robust backends—crafting full-stack experiences that inspire." 🚀</p>
          <div className="bg-white w-full h-[300px] rounded-xl shadow-md p-6 mt-5 flex flex-col justify-center">
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-4 gap-y-3   md:gap-x-12 gap-x-1 md:overflow-hidden overflow-y-auto">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="font-semibold text-lg">Sharwan jung kunwar</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-semibold text-lg text-blue-800">+9779763290022</p>
                </div>
                <div>
                  <p className="text-gray-500">Age</p>
                  <p className="font-semibold text-lg">21 Years</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-semibold text-lg">sharwankunwar07@gmail.com</p>
                </div>
                <div>
                  <p className="text-gray-500">Occupation</p>
                  <p className="font-semibold text-lg">Software Developer</p>
                </div>
                <div>
                  <p className="text-gray-500">Nationality</p>
                  <p className="font-semibold text-lg">Nepali</p>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      
        <ShootingStars />
        <StarsBackground />
      </section>















      {/* Resume page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='resume' ref={resumePageRef} className='bg-red-400 w-full h-screen'>resume</section>


      {/* Work  --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='work' ref={workPageRef}  className='bg-red-300 w-full  flex flex-col gap-10'>
        <div className='bg-yellow-400 w-[90%] h-screen'>box</div>
        <div className='bg-yellow-400 w-[90%] h-[400px]'>box</div>
        
        
      </section>


      {/* Contact page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='contact' ref={contactPageRef} className='bg-red-400 w-full h-screen'>contact</section>
                
        
    </>
  );
}

export default App;
