import React, { useState } from 'react';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className='w-full bg-gray-900 text-white'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center font-Custom'>
                {/* Logo */}
                <div className='text-xl font-semibold'>
                    Logo
                </div>

                {/* Search Bar */}
                <div className='flex-1 px-4 ml-10 '>
                    <input
                        type="text"
                        placeholder="Search..."
                        className='w-full max-w-md px-4 py-2 ml-7 bg-gray-700 text-black rounded-lg focus:outline-none focus:ring-8 focus:ring-primary'
                    />
                </div>

                {/* Desktop Menu */}
                <div className='space-x-6 hidden md:flex'>
                    <a href="#" className='hover:text-gray-400'>Discover</a>
                    <a href="#" className='hover:text-gray-400'>My Library</a>
                    <a href="#" className='hover:text-gray-400'>Community</a>
                    <a href="#" className='hover:text-gray-400'>Publish</a>
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <button onClick={toggleMobileMenu} className='text-white'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 text-white py-4`}>
                <a href="#" className='block px-6 py-2 hover:text-gray-400'>Discover</a>
                <a href="#" className='block px-6 py-2 hover:text-gray-400'>My Library</a>
                <a href="#" className='block px-6 py-2 hover:text-gray-400'>Community</a>
                <a href="#" className='block px-6 py-2 hover:text-gray-400'>Publish</a>

                {/* Mobile Search Bar */}
                <div className='block px-6 py-2'>
                    <input
                        type="text"
                        placeholder="Search..."
                        className='w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
