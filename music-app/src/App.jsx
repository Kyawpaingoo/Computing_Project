import { useEffect, useState } from 'react'
import ImageComponent from './ImageComponent'
import { staticData } from './data'

import './App.css'
import PlayList from './PlayList'

const App = () =>{
  const [data, setData] = useState(null);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = ()=>{
    const response = staticData
    setData(response);
  }

  return(
    <div className='container mx-auto px-4 mt-8'>
      <h1 className='text-2xl font-bold'>
        Playlist name: example
      </h1>
      <ImageComponent/>
      {data && <PlayList data={data} />}
    </div>
  )
}

export default App
