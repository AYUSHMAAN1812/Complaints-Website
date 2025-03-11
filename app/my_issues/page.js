import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig'
import { collection, getDocs, listCollections, orderBy, query } from 'firebase/firestore'

async function fetchDatafromFirestore(user) {
  try {
    const collections = await listCollections(db);
    let allData = [];
    for (const col in collections) {
      const q = query(collection(db,col),orderBy("mailSent"),orderBy("timestamp","asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (data.name === user?.name)
        allData = [...allData, ...data];

      return allData;
    }
  } catch (error) {
    console.log("Error while fetching the sorted data ", error);
    return [];
  }
}
const Issues = () => {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDatafromFirestore(user);
      setUserdata(data);
    }
    fetchData();
  }, []);
  return (
    <div>

    </div>
  )
}

export default Issues
