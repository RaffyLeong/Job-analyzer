// HistoryDropdown.tsx - Simplified Version
import { useState, useEffect } from "react";

interface HistoryItem {
  id: string;
  date: string;
  role: string;
  experience: string;
  skills: string[];
  description: string;
  matchPercentage: string;
}


interface HistoryDropdownProps {
  onSelectHistory: (profile: any) => void; // Callback when user selects a history item
  darkMode: boolean; // dark/light mode
}

const HistoryDropdown = ({ onSelectHistory, darkMode }: HistoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [history, setHistory] = useState<HistoryItem[]>([]); // Stores loaded history items

  useEffect(() => {
  const loadHistory = async () => {
    try {
      // Fetch history from backend REST API endpoint
      const response = await fetch('http://localhost:5000/api/history');
      if (response.ok) {
        const data = await response.json();
        // Add id and date if missing (for backward compatibility)
        const formattedData = data.map((item: any) => ({
          id: item._id || Date.now().toString(),
          date: item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }),
          role: item.role,
          experience: item.experience,
          skills: item.skills,
          description: item.description,
          matchPercentage: item.matchPercentage || "0" // Default to 0 if not present
        }));
        setHistory(formattedData); // Update state with formatted data
      } else {
        throw new Error('Backend failed');
      }
    } catch (error) {
      console.log('Using localStorage as fallback');
      const savedHistory = localStorage.getItem('jobAnalyzerHistory'); // Retrieve history from browser's localStorage
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory)); // Parse and set history from localStorage
      }
    }
  };
  loadHistory(); // Execute the load function
}, []); // run once

// === Clear button ===
  const clearHistory = async () => {
  try {
    // Clear history from backend API
    await fetch('http://localhost:5000/api/history', {
      method: 'DELETE' // HTTP DELETE request to clear backend data
    });
  } catch (error) {
    console.log('Could not clear backend history:', error);
  }
  
  // Clear from frontend state and localStorage
  setHistory([]); // Clear React state
  localStorage.removeItem('jobAnalyzerHistory'); // Remove from browser storage
  setIsOpen(false); // Close dropdown after clearing
  };

// === Handle Select History ===
  const handleSelectHistory = (item: HistoryItem) => {
    const profile = {
      role: item.role,
      skills: item.skills,
      experience: item.experience,
      description: item.description
    };
    onSelectHistory(profile); // Pass profile data to parent component
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
        className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2 border border-gray-400 ${
          darkMode 
            ? 'bg-gray-700 text-white hover:bg-gray-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        History ({history.length})
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-xl z-50 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Recent Analyses
              </h3>
              {/* Clear Button */}
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>No analysis history yet</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectHistory(item)}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                      darkMode 
                        ? 'hover:bg-gray-700 border-gray-700' 
                        : 'hover:bg-blue-50 border-gray-200'
                    } border`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.role || "No role"}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        parseInt(item.matchPercentage) >= 80 
                          ? 'bg-green-100 text-green-800'  // Good match (80-100%)
                          : parseInt(item.matchPercentage) >= 60 
                          ? 'bg-yellow-100 text-yellow-800' // Average match (60-79%)
                          : 'bg-red-100 text-red-800'  // Poor match (0-59%)
                      }`}>
                        {item.matchPercentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {item.experience || "No exp"}
                      </span>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {item.date}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.skills.slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 text-xs rounded ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{item.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a history item to load that analysis
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryDropdown;