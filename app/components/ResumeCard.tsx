import {Link} from "react-router";
import ScoreCircle from "./scoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "lib/puter";

interface ResumeCardProps {
    resume: Resume;
    onDelete: (id: string) => void;
}

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath }, onDelete }: ResumeCardProps) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    // Debug logging
    console.log('ResumeCard feedback:', feedback);
    console.log('ResumeCard ATS score:', feedback?.ATS?.score);

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <div className="resume-card animate-in fade-in duration-1000 relative">
            <Link to={`/resume/${id}`} className="block">
                <div className="resume-card-header flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                        {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                        {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                    </div>
                    <div className="flex items-center gap-2">
                        <ScoreCircle score={feedback.ATS?.score ?? 0} />
                        <button
                            className="ml-2 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs absolute top-2 right-2 z-10"
                            title="Remove Resume"
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete(id);
                            }}
                        >
                            &#10005;
                        </button>
                    </div>
                </div>
                {resumeUrl && (
                    <div className="gradient-border animate-in fade-in duration-1000">
                        <div className="w-full h-full">
                            <img
                                src={resumeUrl}
                                alt="resume"
                                className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                            />
                        </div>
                    </div>
                )}
            </Link>
        </div>
    )
}
export default ResumeCard