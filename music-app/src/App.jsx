import './App.css'
import PlayList from './PlayList'

const App = () =>{
  
  return(
    <div className='p-8 bg-gray-100'>
      
      <h1 className='text-2xl font-bold'>
        Playlist name: example
      </h1>
      <img src='/src/assets/spotify_icon.png' alt="Playlist image" className="w-24 mt-4 rounded-md" style={{ width: '50px', height: '50px' }} />
      <PlayList/>
    </div>
  )
}

export default App
