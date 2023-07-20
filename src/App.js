import './App.css';
import { Auth } from './components/auth';
import {db, auth,storage} from './config/firebase'
import {useState,useEffect} from 'react'
import {getDocs,collection, addDoc, deleteDoc,updateDoc, doc} from 'firebase/firestore'
import {ref, uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);

  //new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)


  //update title state
  const [updateTitle, setUpdateTitle] = useState("")

  //file upload state
  const [fileUpload, setFileUpload] = useState("")


  const movieCollectionRef = collection(db,"movies")

  const getMovieList = async() => {
   //read the data from database
   //set the movie list 
   try {
     const data = await getDocs(movieCollectionRef) 
     const filteredData = data.docs.map((doc)=> ({...doc.data(),id:doc.id}))
     setMovieList(filteredData);
     console.log(filteredData);
   } catch (error) {
     console.error(error);
   }
  

 }
 
 const onSubmitMovie = async() => {
   try{
     await addDoc(movieCollectionRef,
      {
        title:newMovieTitle, 
        releaseDate:newReleaseDate,
        receivedAnOscar:isNewMovieOscar,
        userId:auth?.currentUser.uid,
      })
      getMovieList();
    }catch(error){
      console.error(error)
    }
    
  }
  
  const deletMovie = async(id) => {
    const movieDoc = doc(db, "movies",id )
    await deleteDoc(movieDoc)
  }
  const updateMovieTitle = async(id) => {
    const movieDoc = doc(db, "movies",id )
    await updateDoc(movieDoc,{title:updateTitle})
  }

  const uploadFile = async() =>{
    if(!fileUpload) return ;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload)

    }catch(err){
      console.log(err);
    }


  }
  
  useEffect(() => {
    getMovieList();
 
  },[])

  

  return (
    <div className="App">
      <Auth/>
      <div>
        <input placeholder='Movie Title...' onChange={(e)=> setNewMovieTitle(e.target.value)}/>
        <input placeholder='Release Date...' onChange={(e)=> setNewReleaseDate(Number(e.target.value))} type='number'/>
        <input type='checkbox' checked={setIsNewMovieOscar} onChange={(e)=> setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
        
      </div>
      <div>
        {movieList.map((movie)=> (
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green":"red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={()=>deletMovie(movie.id)}>Delete Movie</button>
            <input placeholder='new title...' onChange={(e)=> setUpdateTitle(e.target.value)}/>
            <button onClick={()=> updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e)=> setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>

      
    </div>
  );
}

export default App;
