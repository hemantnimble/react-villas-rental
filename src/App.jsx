import { BrowserRouter as Main, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DescriptionPage from './pages/DescriptionPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import EditVilla from './components/compAdminPage/EditVilla'
import AddVilla from './components/compAdminPage/AddVilla'
import Login from './components/compAdminPage/Login'

function App() {

  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:villaId' element={<DescriptionPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/add' element={<AddVilla />} />
          <Route path='/edit/:villaId' element={<EditVilla />} />
          <Route path='/login' element={<Login></Login>} />
        </Routes>
      </Main>
    </>
  )
}

export default App
