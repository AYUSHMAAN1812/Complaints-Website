"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";

// Fetch data from Firestore
async function fetchDatafromFirestore(username) {
  try {
    let allData = [];
    const q = query(
      collection(db, "one"),
      // orderBy("mailSent"),
      // orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    // Filter user-specific data
    const userData = data.filter((item) => item.name === username);
    allData = [...allData, ...userData];

    return allData;
  } catch (error) {
    console.log("Error while fetching the data ", error);
    return [];
  }
}

const Issues = () => {
  const { user } = useAuth();
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    if (!user?.displayName) return; // Prevents unnecessary calls

    async function fetchData() {
      const data = await fetchDatafromFirestore(user.displayName);
      setUserdata(data || []);
    }

    fetchData();
  }, [user?.displayName]);
  // Prevent `.map()` error by ensuring `userdata` is always an array
  if (!Array.isArray(userdata)) {
    return <div>Loading...</div>; // ✅ Show loading state instead of crashing
  }
  const handleCheckBoxChange = async (docId, index) => {
    try {
      const docRef = doc(db, "one", docId);
      await updateDoc(docRef, { resolved: true });

      setUserdata((prevData) =>
        prevData.map((item, i) =>
          i === index ? { ...item, resolved: true } : item
        )
      );
      alert(`Document ${docId} updated successfully`);
    }
    catch (error) {
      alert("Error updating document:", error);
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
                <td className="px-6 py-4 whitespace-nowrap text-right font-normal text-black z-20">
                <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10 " onClick={async ()=>{await fetch("https://script.google.com/a/macros/iith.ac.in/s/AKfycbz9NOclVuCxtvH6LFF9D7YGdq2Bpku76USYzb--vRSPsJi5t4b0a9WXEh_T705zgDlG/exec",{method:"GET"});
                    handleCheckBoxChange(problem.id,index);}}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      Resolved
                    </span>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issues;
