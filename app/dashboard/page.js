"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

const issues = [
  "Radiant Cooling", "LAN Issues", "House Keeping", "Plumbing Issues",
  "Mess", "Water supply", "Hot water", "Washing machine",
  "Electrical", "Drinking Water", "Others"
];

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({});
  const [complaints, setComplaints] = useState([]);

  // Ensure component is mounted before rendering user data
  useEffect(() => {
    if (!user) {
      router.push("/home");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setComplaints([...complaints, form]);
    console.log("Complaint Submitted:", form);
  };


  return (
    (loading ? null 
      : <div className="absolute inset-0 -z-10 h-full w-full bg-white">
      <Navbar />
      <div className="flex flex-col">
        <form className="flex flex-col gap-4" onSubmit={handleAdd}>
          <div className="flex gap-2 text-2xl">
            <label htmlFor="email">Email:</label>
            <input
              className="w-xl ml-5 border-2 border-l-white"
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              required
              readOnly
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>)
  );
};

export default Dashboard;
