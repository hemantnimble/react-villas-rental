import './css/App.css'
import { BrowserRouter as Main, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DescriptionPage from './pages/DescriptionPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import EditVilla from './components/compAdminPage/EditVilla'
import UserPanel from './pages/UserPanel'
import Login from './components/compUser/Login'
import SignUp from './components/compUser/SignUp'

function App() {


  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:villaId' element={<DescriptionPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/edit/:villaId' element={<EditVilla />} />
          <Route path='/user/:id' element={<UserPanel />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </Main>
    </>
  )
}

export default App
