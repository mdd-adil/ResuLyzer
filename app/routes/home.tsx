import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => {
        try {
          const parsed = JSON.parse(resume.value) as Resume;
          console.log('Loaded resume:', parsed);
          console.log('Feedback type:', typeof parsed.feedback);
          console.log('Feedback value:', parsed.feedback);
          
          // Handle case where feedback might still be a string or null
          if (typeof parsed.feedback === 'string') {
            console.warn('Feedback is a string, trying to parse:', parsed.feedback);
            if (parsed.feedback === '' || parsed.feedback === null) {
              // Set default feedback structure
              parsed.feedback = {
                overallScore: 0,
                ATS: { score: 0, tips: [] },
                toneAndStyle: { score: 0, tips: [] },
                content: { score: 0, tips: [] },
                structure: { score: 0, tips: [] },
                skills: { score: 0, tips: [] }
              };
            } else {
              try {
                parsed.feedback = JSON.parse(parsed.feedback);
              } catch (e) {
                console.error('Failed to parse feedback string:', e);
                parsed.feedback = {
                  overallScore: 0,
                  ATS: { score: 0, tips: [] },
                  toneAndStyle: { score: 0, tips: [] },
                  content: { score: 0, tips: [] },
                  structure: { score: 0, tips: [] },
                  skills: { score: 0, tips: [] }
                };
              }
            }
          }
          
          console.log('Final ATS score:', parsed.feedback?.ATS?.score);
          return parsed;
        } catch (error) {
          console.error('Failed to parse resume:', error);
          return null;
        }
      }).filter(Boolean) as Resume[];

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar tittle={"Upload Resume"} link={"/upload"}/>

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ): (
          <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
      </div>
      {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onDelete={async (id: string) => {
                  await kv.delete(`resume:${id}`);
                  setResumes((prev) => prev.filter((r) => r.id !== id));
                }}
              />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
      )}
    </section>
  </main>
}