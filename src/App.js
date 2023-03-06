import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const searchData = useRef(null);
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])
  useEffect(()=> {

    const params = {
      method: "flickr.photos.search",
      api_key: "f4a89c194dae0233afa22bbbc50514a3",
      text: searchText,
      sort: "",
      per_page: 126,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
   
    const parameters = new URLSearchParams(params);
    
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })

  }, [searchText])
  const fetchFlickrImageUrl = (photo, size)=> {
   
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
    <> 
   
    <div className='main'>
    <h1>Snapshots</h1>
    <div className='searinp'>
      <input placeholder='Search'className='inp' onChange={(event)=> {searchData.current = event.target.value} }/>
    <button className='inpbut' onClick={()=> {setSearchText(searchData.current)}}>Search</button>
    </div>
    
    <section className='butto'>
      <button onClick={()=> {setSearchText("mountains")}}>Mountains</button>
      <button onClick={()=> {setSearchText("beaches")}}>Beaches</button>
      <button onClick={()=> {setSearchText("birds")}}>Birds</button>
      <button onClick={()=> {setSearchText("food")}}>Food</button>
    </section>

    </div>
    <section className='image-container'>
   
        {imageData.map((imageurl, key)=> {
          return (
            <article className='flickr-image'>
              <img src={imageurl} key={key}/>
            </article>
          )
          
        })}
      
    </section>
    </>
  );
}

export default App;
