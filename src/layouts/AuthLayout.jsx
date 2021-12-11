import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='bg-pink-100 flex flex-col md:flex-row flex-no-wrap h-screen'>
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <div className="items-center">
          {/* <span>Bienvenido al Sistema de Gestión de Proyectos Digitspace</span> */}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
