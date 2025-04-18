import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, LogOutBtn } from '..'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom' //use link only but programtically we can redirect without clicking anything

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

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
      name: "SignUp",
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
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to = "/">
              <Logo width='70px'/>
            </Link>
          </div>

        <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
            <li key={item.name}>
                <button
                onClick={() => navigate(item.url)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >
                  {item.name}
                </button>
            </li> )
            : null
            )}
            {
              authStatus && (
                <li>
                  <LogOutBtn />
                </li>
              )
            }
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
