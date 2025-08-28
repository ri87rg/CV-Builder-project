import { Link } from "react-router-dom"
import { useAccountStore } from '../../store/accountInfo'
import { useNavigate } from 'react-router-dom'
import { useNotificationStore } from "../../store/notificationsStore"

import CustomButton from '../customButton'


export default function Navbar() {
  const {isSignedIn, logOut, setRedirectionPath, redirectionPath} = useAccountStore()
  const {addNotification} = useNotificationStore()
  const navigate = useNavigate()

  function handleSignIn() {
    if (isSignedIn()) {
      setRedirectionPath('/')
      navigate('/')
      logOut()
    }
    else {
      setRedirectionPath('/')
      navigate('/sign-in')
    }
  }

  function handleNavigating(path) {
    if (isSignedIn()) {
      navigate(path)
    }
    else {
      addNotification({title:"Error", description:"You are not signed in. Please sign in before using our services."}, false)
      setRedirectionPath('/')
      navigate('/sign-in')
    }
  }

  return <div className="navbar flex justify-center pt-7.5 top-0 z-50 sticky">
      <nav className="
      flex flex-col gap-4 justify-between items-center border-2 border-white p-2 rounded-2xl 
      md:flex-row lg:flex-row w-[200px] md:w-[460px] lg:w-[600px]  md:gap-0 lg:gap-0
      ">
        <Link to='/' className="px-2">CV Builder</Link>
        <div className="flex gap-3">
          <CustomButton 
            func={() => navigate('/')} 
            customStyle="py-1 px-2 hover:bg-[#d4d4d4] hover:text-black rounded-2xl transition-all duration-300"
            text={"Home"} 
          />
          <CustomButton 
            func={() => handleNavigating('/cv')} 
            customStyle="py-1 px-2 hover:bg-[#d4d4d4] hover:text-black rounded-2xl transition-all duration-300"
            text={"CV's"} 
          />
        </div>
        <CustomButton func={() => handleSignIn()} text={isSignedIn() ? "Sign out" : "Sign in"} customStyle={`
          py-2 px-5 rounded-2xl border-2 text-black cursor-pointer 
          border-transparent bg-[#d4d4d4] 
          hover:bg-transparent hover:border-white ${isSignedIn() ? "hover:text-red-500" : "hover:text-white"}
          transition-all duration-300
          ${isSignedIn() && "text-red-600"}`
        } />
      </nav>
    </div>

}