"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc,getDoc } from "firebase/firestore";

// Fetch data from Firestore
async function fetchDatafromFirestore(username) {
  try {
    let allData = [];
    const q = query(
      collection(db, "one"),
      where("name", "==", username),
      where("mailSent", "==", true),
      where("resolved", "==", false)
    );
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    allData = [...allData, ...data];
    return allData;
  } catch (error) {
    console.log("Error while fetching the data ", error);
    return [];
  }
}

const Issues = () => {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Resolved");

  useEffect(() => {
    if (!user?.displayName) return;

    async function fetchData() {
      setLoading(true);
      const data = await fetchDatafromFirestore(user.displayName);
      setUserdata(data || []);
      setLoading(false);
    }

    fetchData();
  }, [user?.displayName]);

  if (loading) return <div>Loading...</div>;


  const handleDelete = async (docId, e) => {
    e.preventDefault();
  
    // Open the Google Apps Script URL immediately to ensure it's triggered by the user action.
    
    try {
      // Get the reference to the document in Firestore and update the 'resolved' field
      const docRef = doc(db, "one", docId);
      await updateDoc(docRef, { resolved: true });
      
      // Log to check if 'resolved' is being updated in Firestore
      const updatedDoc = await getDoc(docRef);
      console.log("Document after update:", updatedDoc.data());
      
      // Inform the user that the complaint has been resolved
      alert("Complaint has been resolved!");
      setStatus("Done");
      
      window.open("https://script.google.com/a/macros/iith.ac.in/s/AKfycbzfPttcSOBIEnvVdTEgXCSd69To1fbn0xatjQc9FIBw_L6RwsOVG8h6oCLQI4jvEcZP/exec");
      
  
    } catch (error) {
      console.error("Error updating or deleting document: ", error);
    }
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] items-center">
      <div className="flex justify-center items-start mt-20 bg-transparent">
        <table className="w-[70vw] divide-y divide-x divide-gray-100 border border-gray-200 bg-transparent text-white z-20">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-center font-medium uppercase tracking-wider">
                Issue
              </th>
              <th scope="col" className="px-6 py-3 text-center font-medium uppercase tracking-wider">
                Issue Description
              </th>
              <th scope="col" className="px-6 py-3 text-right font-medium uppercase tracking-wider">
                Resolved?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-x divide-gray-200">
            {userdata.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-white">
                  No unresolved issues found.
                </td>
              </tr>
            ) : (
              userdata.map((problem, index) => (
                <tr key={index}>
                  <td className="ml-4 px-6 py-4 whitespace-nowrap text-left font-normal text-white z-20">
                    {problem.issue}
                  </td>
                  <td className="ml-4 px-6 py-4 whitespace-nowrap text-left font-normal text-white z-20">
                    {problem.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-normal text-black z-20">
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10"
                      onClick={(e) => handleDelete(problem.id,e)}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        {status}
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issues;
