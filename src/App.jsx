import './css/App.css'
import { BrowserRouter as Main,Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DescriptionPage from './pages/DescriptionPage'
import AboutPage from './pages/AboutPage'

function App() {

  return (
    <>
      <Main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/:villaId' element={<DescriptionPage/>} />
          <Route path='/about' element={<AboutPage/>} />
        </Routes>
      </Main>
    </>
  )
}

export default App
