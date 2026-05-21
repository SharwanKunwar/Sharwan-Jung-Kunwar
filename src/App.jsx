
import { DarkModeContext, DarkModeProvider } from './context/DarkModeContext';
import { useContext } from "react";
import RootLayout from './Main/RootLayout';
import { ShootingStarsAndStarsBackgroundDemo } from './components/ui/ShootingStarsAndStarsBackgroundDemo';

function App() {

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className={`min-h-screen flex justify-center items-start no-scrollbar ${isDarkMode ? 'bg-transparent text-white' : ' text-black'}`}>
        <ShootingStarsAndStarsBackgroundDemo />
        {/* <RootLayout /> */}
      </div>
    </>
  )
}

export default App
