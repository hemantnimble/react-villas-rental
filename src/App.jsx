import { BrowserRouter as Main, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DescriptionPage from './pages/DescriptionPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import EditVilla from './components/compAdminPage/EditVilla'

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
        </Routes>
      </Main>
    </>
  )
}

export default App
