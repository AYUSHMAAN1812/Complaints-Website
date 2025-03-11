import React,{useState,useEffect} from 'react'
import {db} from '../firebaseConfig'
import { collection,getDocs,listCollections } from 'firebase/firestore'

async function fetchDatafromFirestore() {
  try {
    const collections = await listCollections(db);
    let allData = [];
    for (const col in collections)
    {
      const querySnapshot = await getDocs(collection(db,col));
      querySnapshot.docs.map((doc)=>({id : doc.id, ...doc.data()}));
      allData = [...allData, ...data];

      return allData;
    }
  } catch (error) {
    console.log("Error while fetching the data ", error);
    return [];
  }
}
const Issues = () => {
  const [userdata, setUserdata] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const data = await fetchDatafromFirestore();
      setUserdata(data);
    }
    fetchData();
  },[]);
  return (
    <div>
      
    </div>
  )
}

export default Issues
