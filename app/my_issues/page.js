"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
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
      toast('Complaint has been Resolved!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setStatus("Done");

      window.open("https://script.google.com/a/macros/iith.ac.in/s/AKfycbwg9a_91o3LLsDbpdVC8icAj2urlLaSNIc25gmk3alxMmQcXRFCZtqKxxRM44WwN0FJ/exec");

      
 
    } catch (error) {
      console.error("Error updating or deleting document: ", error);
    }
  };

  return <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <div className="absolute inset-0 -z-10 h-full w-full px-2 py-12 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex items-center justify-center">
      <div className="bg-transparent max-h-[80vh] max-w-[90vw] overflow-auto">
        <table className="max-w-[95vw] md:max-w-[80vw] lg:max-w-[60vw] divide-y divide-x divide-gray-100 border border-gray-200 bg-transparent text-white">

          <thead>
            <tr>
              <th scope="col" className="px-2 py-2 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                Issue
              </th>
              <th scope="col" className="px-2 py-2 text-center text-xs md:text-sm font-medium uppercase tracking-wider">
                Issue Description
              </th>
              <th scope="col" className="px-2 py-2 text-right text-xs md:text-sm font-medium uppercase tracking-wider pl-2">
                View Mail
              </th>
              <th scope="col" className="px-2 py-2 text-right text-xs md:text-sm font-medium uppercase tracking-wider pl-2">
                Resolved?
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-x divide-gray-200">
            {userdata.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-2 py-4 text-center text-white">
                  No unresolved issues found.
                </td>
              </tr>
            ) : (
              userdata.map((problem, index) => (
                <tr key={index}>
                  <td className="px-2 py-2 text-left text-xs md:text-sm font-normal text-white break-words">
                    {problem.issue}
                  </td>
                  <td className="px-2 py-2 align-top text-left whitespace-normal break-words text-xs md:text-sm font-normal text-white">
                    {problem.description}
                  </td>
                  <td className="px-2 py-2 align-center text-left whitespace-normal break-words text-xs md:text-sm font-normal text-white underline ">
                    <Link href={problem.threadID} target="_blank ">View</Link>
                  </td>
                  <td className="px-2 py-2 text-right text-xs md:text-sm font-normal md:text-black text-white">
                    <button
                      className="md:text-black text-white hover:cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-1 overflow-hidden text-xs md:text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300"
                      onClick={(e) => handleDelete(problem.id, e)}
                    >
                      <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent">
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

  </>
};


export default Issues;
