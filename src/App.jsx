
import { Home, List, Menu, X } from 'lucide-react';
import { useRef, useState,useEffect } from 'react';
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SpotlightPreview } from './components/ui/SpotlightPreview';



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
      <section id='home' ref={homePageRef} className='bg-white w-full h-full'>
        {/* top content  */}
        <header className='bg-gray-400 w-full md:h-[100px] h-[90px] flex justify-center md:items-center'>  {/* //you can set backimg in here in feture */}
          <div className='bg-gray-50/30 md:backdrop-blur-2xl w-full md:mr-4 md:h-[100px] h-[90px] flex justify-center md:items-center absolute z-50'> 
            
            <nav className='bg-white/30 md:w-[90%] w-full md:h-[70%] h-full md:rounded-full border border-white/30 backdrop-blur-2xl flex justify-between items-center gap-5'>
              {/* nav-left-box */}
              <div className='w-[20%] h-full flex justify-start items-center pl-3'>
                <a href="/"><img className='w-[50px]' src="/aliens-line.svg" alt="logo" /></a>
                <h1 className='md:flex hidden ml-1'>Sharwan jung kunwar</h1>
              </div>
                {/* nav-middle-box */}
              <div className=' w-[60%] h-full flex justify-center items-center'>
                <ul className='md:flex w-full h-full justify-end items-center gap-10 hidden'>
                  <a id='home' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#home" className={activeSection === 'home' ? 'text-white border-b border-black' : ''}>Home</a>
                  <a id='about' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#about" className={activeSection === 'about' ? 'text-white border-b border-black' : ''}>About</a>
                  <a id='resume' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#resume" className={activeSection === 'resume' ? 'text-white border-b border-black' : ''}>Resume</a>
                  <a id='work' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#Work" className={activeSection === 'work' ? 'text-white border-b border-black' : ''}>Work</a>
                  <a id='contact' onClick={(e) => { e.preventDefault(); scrollToPages(e); }} href="#contact" className={activeSection === 'contact' ? 'text-white border-b border-black' : ''}>Contact</a>
                </ul>
              </div>

              {/* nav-right-box */}
              <div className=' w-[20%] h-full flex justify-center items-center'>
                {/* laptop */}
                <section className=' w-full h-full md:flex justify-center items-center gap-5 hidden'>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-neutral-500 text-white p-1 rounded-full hover:bg-blue-700 transition">
                    <FaFacebookF />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-neutral-500 text-white p-1 rounded-full hover:bg-gray-900 transition">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                    className="bg-neutral-500 text-white p-1 rounded-full hover:bg-blue-600 transition">
                    <FaLinkedinIn />
                  </a>
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
                          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                            <FaFacebookF />
                          </a>
                          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition">
                            <FaGithub />
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition">
                            <FaLinkedinIn />
                          </a>
                      </div>
                    </div>
                  </div>
                )}
              
              </div>
            </nav>

          </div>
        </header>

        {/* bottom content */}
        <main className=' w-full'>
          <SpotlightPreview/>
          {/* <section className='bg-yellow-400 h-[20%] md:hidden lg:block'>love</section> */}
        </main>
      </section>
      {/* Home page  end ---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}


















      {/* About page --------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      <section id='about' ref={aboutPageRef} className='bg-red-200 w-full h-screen'>about</section>


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
