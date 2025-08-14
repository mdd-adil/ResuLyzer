import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { resumes } from "constants/index"
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuLyzer" },
    { name: "description", content: "Get feedBack for Your Job!!" },
  ];
}

export default function Home() {
  const{isLoading,auth}=usePuterStore();
    const location=useLocation();
    const next=location.search.split('next=')[1];
    const navigate=useNavigate();
    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next);
        }
    }, [auth.isAuthenticated,next]);
  return  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading ">
        <h1>Track Your Applications & Resume Ratings</h1>
        
          <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
      
    
      

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      
    </section>
  </main>
}
