import { Link } from "react-router-dom"
import { useAccountStore } from '../store/accountInfo'
import { useNavigate } from 'react-router-dom'
import { useNotificationStore } from "../store/notificationsStore"
import { useState } from "react"

import { Button } from './ui/button'

export default function Navbar() {
  const handleClick = () => {
    console.log("Button clicked!")
    // Add your logic here
  }

  const {isSignedIn, logOut, setRedirectionPath, redirectionPath} = useAccountStore()
  const {addNotification} = useNotificationStore()
  const navigate = useNavigate()

  const [isDark, setIsDark] = useState(true)

  function toggleTheme() {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }

  function handleSignIn() {
    if (isSignedIn()) {
      logOut()
    }
    else {
      setRedirectionPath('/')
      navigate('/sign-in')
    }
  }

  function handleNavigating(path, immediate = false) {
    if (immediate) {
      navigate(path)
      return
    }

    if (isSignedIn()) {
      navigate(path)
    }
    else {
      addNotification({title:"Error", description:"You are not signed in. Please sign in before using our services."}, false)
      setRedirectionPath('/')
      navigate('/sign-in')
    }
  }

  return (
    <div className="navbar flex justify-center items-center gap-4 pt-7.5 top-0 z-50 sticky">
      <nav className="
        flex flex-col gap-4 justify-between items-center border-2 border-black dark:border-white p-2 rounded-2xl 
        md:flex-row lg:flex-row w-[200px] md:w-[460px] lg:w-[600px]  md:gap-0 lg:gap-0
      ">
        <Link to='/' className="px-2">CV Builder</Link>
        <div className="flex gap-3">
          <Button variant="ghost" className="text-black dark:text-white" onClick={() => handleNavigating('/', true)}>
            Home
          </Button>
          <Button variant="ghost" className="text-black dark:text-white" onClick={() => handleNavigating('/cv')}>
            CVs
          </Button>
        </div>

        <Button className={`${isSignedIn() && "text-red-600"}`} onClick={handleSignIn}>
          {isSignedIn() ? "Sign out" : "Sign in"} 
        </Button>

      </nav>
      <Button onClick={toggleTheme}>
        {isDark ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  )
}
