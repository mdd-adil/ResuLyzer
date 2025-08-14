interface Resume{
    id: string;
    companyName: string;
    jobTitle: string;
    imagePath: string;
    resumePath: string;
    feedback: {
        overallScore: number;
        ATS: {
        score: number;
        tips: string[];
        };
        toneAndStyle: {
        score: number;
        tips: string[];
        };
        content: {
        score: number;
        tips: string[];
        };
        structure: {
        score: number;
        tips: string[];
        };
        skills: {
        score: number;
        tips: string[];
        };
    };
}
interface feedback {
    overallScore: number; //max 100
    ATS: {
        score: number; //max 100
        tips: string[];
    };
    toneAndStyle: {
        score: number; //max 100
        tips: string[];
    };
    content: {
        score: number; //max 100
        tips: string[];
    };
    structure: {
        score: number; //max 100
        tips: string[];
    };
    skills: {
        score: number; //max 100
        tips: string[];
    };
}