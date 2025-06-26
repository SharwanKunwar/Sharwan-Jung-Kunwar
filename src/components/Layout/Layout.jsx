import { Outlet} from 'react-router';


function Layout() {
  return (
    <div className='flex w-full flex-col items-center '>
      {/* Content Area */}
      <div className='w-[100%] h-full overflow-y-auto overflow-x-hidden relative'>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
