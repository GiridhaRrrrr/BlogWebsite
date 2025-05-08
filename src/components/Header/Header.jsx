// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Container, Logo, LogOutBtn } from '..'
// import { useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom' //use link only but programtically we can redirect without clicking anything

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       name: "Home",
//       url: '/',
//       active: true
//     },
//     {
//       name: "Login",
//       url: '/login',
//       active: !authStatus
//     },
//     {
//       name: "SignUp",
//       url: '/signup',
//       active: !authStatus
//     },
//     {
//       name: "All Posts",
//       url: '/all-posts',
//       active: authStatus
//     },
//     {
//       name: "Add Post",
//       url: '/add-post',
//       active: authStatus
//     },
//   ]

//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to = "/">
//               <Logo width='70px'/>
//             </Link>
//           </div>

//         <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//             <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.url)}
//                 className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >
//                   {item.name}
//                 </button>
//             </li> )
//             : null
//             )}
//             {
//               authStatus && (
//                 <li>
//                   <LogOutBtn />
//                 </li>
//               )
//             }
//           </ul>

//         </nav>
//       </Container>
//     </header>
//   )
// }

// export default Header

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Logo, LogOutBtn } from '..';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      url: '/',
      active: true
    },
    {
      name: "Login",
      url: '/login',
      active: !authStatus
    },
    {
      name: "Sign Up",
      url: '/signup',
      active: !authStatus
    },
    {
      name: "All Posts",
      url: '/all-posts',
      active: authStatus
    },
    {
      name: "Add Post",
      url: '/add-post',
      active: authStatus
    },
  ];

  // Animation variants
  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.header 
      className={`py-4 fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white dark:bg-gray-900 shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90' 
          : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <Container animation={false}>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to="/" className='relative overflow-hidden group'>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Logo width='150px' />
                <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex items-center space-x-1'>
            {navItems.map((item, i) => 
              item.active ? (
                <motion.li key={item.name} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => navigate(item.url)}
                    className={`relative overflow-hidden px-5 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ${
                      location.pathname === item.url ? 
                        'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 
                        ''
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.url && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                        layoutId="underline" 
                      />
                    )}
                  </button>
                </motion.li>
              ) : null
            )}
            {authStatus && (
              <motion.li 
                custom={navItems.length} 
                variants={navItemVariants} 
                initial="hidden" 
                animate="visible"
              >
                <LogOutBtn />
              </motion.li>
            )}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <motion.span 
                  className="absolute top-0 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="absolute top-2 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="absolute top-4 left-0 w-6 h-0.5 bg-current rounded-full"
                  animate={mobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      <motion.div 
        className="md:hidden fixed inset-y-0 right-0 w-3/4 bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col pt-20 px-4"
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
      >
        <ul className="space-y-4">
          {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className="border-b border-gray-100 dark:border-gray-800 pb-2">
                <button
                  onClick={() => {
                    navigate(item.url);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 ${
                    location.pathname === item.url ? 
                      'text-blue-600 dark:text-blue-400 font-medium' : 
                      'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li className="pt-2">
              <LogOutBtn onClick={() => setMobileMenuOpen(false)} fullWidth />
            </li>
          )}
        </ul>
      </motion.div>

      {/* Overlay to close menu when clicked outside */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </motion.header>
  );
}

export default Header;
