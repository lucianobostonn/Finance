import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from "./Components/pages/Home"
import Projetos from "./Components/pages/Projetos"
import Empresa from "./Components/pages/Empresa"
import Contato from "./Components/pages/Contato"
import Footer from './Components/Footer'
import NewProject from './Components/pages/NewProject'
import Edit from './Components/pages/Edit'


function App() {
  
  return (
    <BrowserRouter>
    <Navbar/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/projetos' element={<Projetos/>} />
      <Route path='/empresa' element={<Empresa/>}/>
      <Route path='/contato' element={<Contato/>}/>
      <Route path='/newproject' element={<NewProject/>}/>
      <Route path="/projetos/:id" element={<Edit/>}/>
    </Routes>

    <Footer/>
    </BrowserRouter>
  )
}

export default App
