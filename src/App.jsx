import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbarComponents/navbar";

import Home from './pages/home'
import NotificationsContainer from "./components/notificationsContainer";
import SignInPage from "./pages/signInPage"
import CVPage from "./pages/cvCreate";
import CVsPage from './pages/cv_s'
import { useCVStore } from "./store/cvStore";
import CV from './components/CVsComponents/cv'

function App() {
  const {CVs} = useCVStore()
  return (
    <>
      <NotificationsContainer />
        <Navbar />
        <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-in' element={<SignInPage />} />
              <Route path='/cv/create' element={<CVPage />} />
              <Route path='/cv' element={<CVsPage />} />
              <Route path='/test' element={<div></div>} />
              {CVs.map((cv) => (
                  <Route path={`/cv/display/${cv.id}`} element={<CV cv={cv} key={cv.id} />} />
                ))
              }
            </Routes>
        </main>
    </>
  )
}

export default App

