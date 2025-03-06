import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className='logo font-bold text-2xl'>
          <span className='text-green-500'>&lt;</span>
          Pwd
          <span className='text-green-500'>/Mgr&gt;</span>
        </div>
        {/* <ul >
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
          </li>


        </ul> */}
        <button className="ring-white ring-1 h-10 px-4 flex items-center gap-2 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition">
          <img src="icons/github.svg" alt="GitHub" className="w-6 h-6" />
          <span className='font-bold'>GitHub</span>
        </button>


      </div>
    </nav>
  )
}

export default Navbar