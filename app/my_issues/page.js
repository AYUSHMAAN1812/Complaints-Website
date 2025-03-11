"use client"
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig'
import { collection, getDocs, getFirestore, orderBy, query,listCollections } from 'firebase/firestore'

async function fetchDatafromFirestore(username) {
  try {
    const firestore = getFirestore();
    const collections = await listCollections(firestore);
    let allData = [];
    for (const col of collections) {
      const q = query(collection(db, col.id), orderBy("mailSent"), orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const userData = data.filter((item) => item.name === username);
      allData = [...allData, ...userData];

    }
    return allData;
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
      const data = await fetchDatafromFirestore(user?.displayName);
      setUserdata(data);
    }
    fetchData();
  }, [user]);
  return (

    <div className="absolute inset-0 -z-10 h-full w-full  px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] items-center"
    >
      <div className='flex justify-center items-start mt-20 bg-transparent'>
        <table className="w-[70vw] divide-y divide-x divide-gray-100 border border-gray-200 bg-transparent text-white z-20 ">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-center font-medium uppercase tracking-wider">
                Issue
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium uppercase tracking-wider">
                Resolved?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-x divide-gray-200">
            {userdata.map((problem, index) => (
              <tr key={index}>
                <td className="ml-4 px-6 py-4 whitespace-nowrap text-left font-normal text-white z-20">
                  {problem.issue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-normal text-white z-20 " >
                  <input
                    className="h-6 w-6 text-blue-600 border-gray-300 rounded mr-6"
                    type="checkbox"
                    checked={Boolean(problem.resolved)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Issues
