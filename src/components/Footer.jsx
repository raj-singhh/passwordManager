import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-4 text-center mt-auto shadow-inner">
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Logo */}
        <div className="logo font-bold text-2xl flex items-center gap-1">
          <span className="text-green-500">&lt;</span> 
          Pwd 
          <span className="text-green-500">/Mgr&gt;</span>
        </div>

        {/* Created with Love Text */}
        <div className="flex items-center gap-2 text-sm">
          <span>Created with</span>
          <img src="icons/heart.png" alt="Heart" className="w-5 h-5" />
          <span>by Raj</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
