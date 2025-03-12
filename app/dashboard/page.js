"use client"
import { useState, useEffect, use } from 'react'
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import { db } from '../firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
const issues = ["Radiant Cooling ", "House Keeping", "Plumbing Issues", "Mess", "Water supply", "Hot water ", "Washing machine", "Electrical", "Drinking Water"]
const hostels = [
  "Charaka",
  "Susruta",
  "Kautilya",
  "Vyasa",
  "Brahmagupta",
  "Varahamihira",
  "Ramanuja",
  "Vivekananda",
  "SN Bose",
  "Ramanujan",
  "Raman",
  "Kalam",
  "Bhabha",
  "Sarabhai",
  "Visweswaraya",
  "Kapila",
  "Aryabhatta",
  "Bhaskara",
  "Maitreyi",
  "Gargi",
  "Kalpana Chawla",
  "Anandi",
  "Sarojini Naidu"
];
const recipentsMap = new Map();
recipentsMap.set("radiant_cooling", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("house_keeping", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("plumbing_issues", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("mess", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("water_supply", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("hot_water", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("washing_machine", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("electrical", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("drinking_water", ["co23btech11020@iith.ac.in"]);
recipentsMap.set("others", ["co23btech11020@iith.ac.in"]);

async function addDataToFireStore(name, email, hostelName, hostelRoom, description, issue) {
  try {
    if (!issue || typeof issue !== "string") {
      throw new Error("Invalid issue type provided");
    }

    // Clean up issue name
    const sanitizedIssue = String(issue)
      .trim()
      .replace(/\s+/g, " ") // Convert multiple spaces to a single space
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_");

    // Ensure sanitized issue is valid
    if (!sanitizedIssue) {
      throw new Error("Issue type contains only invalid characters");
    }

    alert("Sanitized Issue:", sanitizedIssue);
    alert("All Keys:", [...recipentsMap.keys()]);
    alert("Recipients:", recipentsMap.get(sanitizedIssue) || []);
    const docRef = await addDoc(collection(db, "one"), {
      name: name,
      email: email,
      hostelName: hostelName,
      hostelRoom: hostelRoom,
      description: description,
      issue: issue,
      resolved: false,
      mailSent: false,
      threadID: "",
      recipents: recipentsMap.get(sanitizedIssue) || [],
      timestamp: serverTimestamp(),
    });
    console.log("Document written with ID:", docRef.id);
    return true; // for adding data successfully
  } catch (error) {
    console.log("Error encountered while adding document to Database ", error);
    return false; // to indicate that the data was not added successfully
  }
}

const Dashboard = () => {
  const { user } = useAuth();
  const arr = { name: user?.displayName, roll: user?.email?.slice(0, -11) };
  const [form, setForm] = useState({ name: user?.displayName, email: user?.email, hostelName: "", hostelRoom: "", description: "", issue: "", resolved: false, mailSent: false, threadID: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(
      form.name,
      form.email,
      form.hostelName,
      form.hostelRoom,
      form.description,
      form.issue
    );
    if (added) {
      alert("Complaint has been logged!");
      try {
        const response = await fetch("https://script.google.com/a/macros/iith.ac.in/s/AKfycbzIGaBFyHqiyfy02P50NTuswcBveEeelQ3_J-OR4_euuVxF9ofzl5aS8--a_pFKQBgTAQ/exec");
        const data = await response.json();
        console.log("Response from Apps Script:", data);
        if (response.ok) {
          alert("Complaint email has been sent successfully!");
        } else {
          alert("Error submitting the complaint!");
        }
      } catch (error) {
        console.error("Error submitting form to Google Apps Script:", error);
      }
    }
  };
  
  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar />
      <span className="block border-t-2 border-gray-600 w-full"></span>
      <div className='flex flex-col ml-20 gap-4 text-white font-semibold text-2xl mt-3'>
        <span> Name: {arr.name}</span>
        <span> Roll Number: {arr.roll}</span>

      </div>
      <div className='flex flex-col justify-center items-center'>
        <form className="flex flex-col gap-4 mt-10 items-start text-white z-40 " onSubmit={handleAdd}>
          <div className="flex gap-2 text-2xl items-start max-h-10">
            <label className="w-50" htmlFor="issue">Hostel Name:</label>
            <select
              className="w-xl ml-2 border-2 border-l-white  overflow-y-scroll bg-[#050110] text-[rgba(255,255,255,0.5)] "
              id="hostelName"
              name="hostelName"
              value={form.hostelName}
              required
              onChange={handleChange}
            >
              <option value="">Select the hostel name</option>
              {hostels.map((hostel, index) => (
                <option className=" max-h-10" key={index} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 text-2xl items-start">
            <label className="w-50" htmlFor="room number">Room Number:</label>
            <input
              className="w-xl ml-2 border-2 border-l-white "
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              id="hostelRoom"
              name="hostelRoom"
              value={form.hostelRoom}
              placeholder='Enter your room number'
              required
              onChange={handleChange}
            />

          </div>
          <div className="flex gap-2 text-2xl items-start">
            <label className="w-50" htmlFor="issue">Issue Type:</label>
            <select

              className="w-xl ml-2 border-2 overflow-y-scroll border-l-white bg-[#050110] text-[rgba(255,255,255,0.5)]"
              id="issue"
              name="issue"
              value={form.issue}
              required
              onChange={handleChange}
            >
              <option value="">Select an issue type</option>
              {issues.map((issue, index) => (
                <option key={index} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 text-2xl ">
            <label className="w-50" htmlFor="other-issue">Description:</label>
            <textarea
              className="border-2 border-l-white h-48 p-2 w-xl text-white z-50"
              id="description"
              name="description"
              value={form.description}
              placeholder="Description of the issue"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="self-center relative inline-flex items-center justify-center p-0.5 mb-8 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="hover:cursor-pointer relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Submit
            </span>
          </button>
        </form>
        <span className="block border-t-2 border-gray-600 w-full"></span>
      </div>
      <Footer />
    </div>
  )
}
export default Dashboard
