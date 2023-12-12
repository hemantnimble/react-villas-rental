import { BrowserRouter as Main, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DescriptionPage from './pages/DescriptionPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import EditVilla from './components/compAdminPage/EditVilla'
import AddVilla from './components/compAdminPage/AddVilla'
import Login from './components/compAdminPage/Login'
import ProtectedRoutes from './components/compAdminPage/ProtectedRoutes'
import NotFound from './components/common/NotFound'

function App() {

  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/villa/:villaId' element={<DescriptionPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/admin' element={<ProtectedRoutes Component={AdminPage} />} />
          <Route path='/admin/add' element={<ProtectedRoutes Component={AddVilla} />} />
          <Route path='/edit/:villaId' element={<ProtectedRoutes Component={EditVilla} />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </>
  )
}

export default App
