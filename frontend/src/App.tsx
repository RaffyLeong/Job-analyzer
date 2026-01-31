
import { useEffect, useState } from "react";
import MainApp from "./pages/MainApp";

interface UserProfile {
    role: string;
    skills: string[];
    experience: string; 
    description: string;
}

// Main App component - controls whether to show the analyzer or completion screen
function App() {
    const [hasCompletedPage, setHasCompletedPage] = useState(false) // Check if user has already completed the profile setup
    // Store the user's profile data
    const [userProfile, setUserProfile] = useState<UserProfile>({
        role: '',
        skills: [],
        experience: '', 
        description: '',
    })

    // On component mount, check localStorage for saved profile
    useEffect(() => {
        const savedProfile = localStorage.getItem('jobAnalyzerProfile')
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile))
            setHasCompletedPage(true) // User already has a profile
        }
    }, [])

    // Called when user completes the analysis flow
    const handleCompletedPage = (profile: UserProfile) => {
        setUserProfile(profile)
        setHasCompletedPage(true)
        localStorage.setItem('jobAnalyzerProfile', JSON.stringify(profile))
    }

    // Reset everything - clears localStorage and starts fresh
    const handleReset = () => {
        localStorage.removeItem('jobAnalyzerProfile')
        setUserProfile({ role: '', skills: [], experience: '', description: '' })
        setHasCompletedPage(false)
    }


    // If user hasn't completed profile, show the MainApp
    // if user has completed, then show the success screen
    return (
        <div>
            {!hasCompletedPage ? (
                <MainApp onComplete={handleCompletedPage}/>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 p-4 dark:from-gray-900 dark:to-gray-800">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md dark:bg-gray-700 ">
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">Profile Saved!</h1>
            <p className="text-gray-600 mb-6 dark:text-white">
              Your profile has been saved successfully. You can now analyze job descriptions and get personalized insights.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left dark:bg-gray-700">
              <p className="text-sm text-gray-700 dark:text-white border border-gray-200 p-4 rounded-lg">
                <strong className="dark:text-blue-500">Role:</strong> {userProfile.role || "Not set"}<br />
                <strong className="dark:text-blue-500">Experience:</strong> {userProfile.experience || "Not set"}<br />
                <strong className="dark:text-blue-500">Skills:</strong> {userProfile.skills.length} selected
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
    );
}

export default App;