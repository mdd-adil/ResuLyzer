import React from 'react'
import Navbar  from '~/components/Navbar';
import FileUploader from '~/components/FileUploader';
function upload() {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const[statusText, setStatusText] = React.useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);
        setStatusText('Processing your resume...');}
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar link={"/"} tittle={"Go To Home"}/>
    
        <section className="main-section">
            <div className="page-heading py-16 mt-8">
            <h1>Smart Feedback to Your Dream Job</h1>
            {isProcessing? (<>
                <h2>{statusText}</h2>
                <img src="/images/resume-scan.gif" className='w-full'/>
                </>
               ):(<><h2>Upload your Resume for an ATS score and improvement tips </h2></>)
                    }
                    {!isProcessing && (
                    <form onSubmit={handleSubmit} id='upload-form'className="flex flex-col gap-4">
                        <div className="form-div">
                            <label htmlFor="company-name">Company Name</label>
                            <input type="text" id="company-name" name="companyName" placeholder="Company Name" required />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-title">Job Title</label>
                            <input type="text" id="job-title" name="jobTitle" placeholder="Job Title" required />
                        </div>
                        <div className="form-div">
                            <label htmlFor="job-description">Job Description</label>
                            <textarea name="job -description" id="job-description" rows={5} placeholder='Job Description'></textarea>
                        </div>
                        <div className="form-div">
                            <label htmlFor="uploader">Upload Resume</label>
                           <FileUploader />
                        </div>
                        
                        <button type='submit' className='primary-button'>Analyze Resume</button>
                    </form>
                    )}
                    </div>

        </section>
        </main>
  )
}

export default upload