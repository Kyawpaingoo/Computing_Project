import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Home.jsx'
import Playlist  from './PlayList.jsx'
const App = () =>{
  
  return(
    <div className='container w-screen mx-auto p-0'>
      <Routes>
          <Route path='/' element= {<Home />} />
          <Route path='/playlist' element= {<Playlist />} />
      </Routes>
      </div> 
  )
}

export default App
