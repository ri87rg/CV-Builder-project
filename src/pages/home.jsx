import { Button } from '../components/ui/button'

import { useNavigate } from 'react-router-dom'
import { useNotificationStore } from '../store/notificationsStore'
import { useAccountStore } from '../store/accountInfo'

import SectionHeader from '../components/sectionHeader'

function Home() {
  const {addNotification} = useNotificationStore()
  const {isSignedIn, setRedirectionPath} = useAccountStore()
  const navigate = useNavigate()

  function handleCreateCV() {
    if (isSignedIn()) {
      navigate('/cv/create')
      setRedirectionPath('/')
    }
    else {
      addNotification({title:"Error", description:"You are not signed in. Please sign in before using our services."}, false)
      setRedirectionPath('/cv/create')
      navigate('/sign-in')
    }
  }

  return (
    <div className="flex justify-center items-center flex-col w-full h-[calc(100vh_-_92.82px)]">
      <div className="about-us my-[198px] flex justify-center items-center flex-col">
        <SectionHeader text={`ABOUT US`} id={`about-us`} /> <div id="about-us"></div>
        <p className='wrap-break-word text-[40px] w-[100%] text-center leading-14 my-2'>
          Bulid Your Own 
          <span className='text-cyan-600 glow-effect'> CV </span> 
          Efficiently<br />Using Our Services
        </p>
        <p className='wrap-break-word text-center my-2'>
          We have provided services for 
          <span className='text-cyan-600 glow-effect'> 15+ YEARS</span>! 
          <br />reaching 
          <span className='text-cyan-600 glow-effect'> 1000+ client </span>over the years</p>
        <div className="btns-container flex gap-2 my-4">
          <Button onClick={handleCreateCV}>Create Your Own CV Now!</Button>
        </div>
      </div>
    </div> 
  )
}

export default Home