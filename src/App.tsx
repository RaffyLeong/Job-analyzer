import { useState } from "react";

interface AnalysisType {
  match: string;
  techSKill: string[];

  requirements: string[];
  suggestions: string[];
}

function App() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisType>({
    match: "",
    techSKill: [],
    requirements: [],
    suggestions: [],
  });

  const mySkills = [
    "JavaScript", "React", "Git", "TypeScript", "CSS", "Tailwind CSS", "EHR", "Appointment Booking Software"
  ];

  const techSkills = [ 
    "React", "TypeScript", "JavaScript","Python","Java", "C#", "Go", "Node.js","Express","Next.js","Vue",
    "Angular", "Tailwind CSS", "CSS", "SCSS", "Bootstrap", "HTML", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Docker",
    "Git", "REST", "GraphQL", "Redux", "Jest", "React Native", "Flutter", "Dart", "Swift", "Figma", "Vite", "REST API",
  ];



  const handleAnalyzeButton = () => {
    // if text is empty or has white space than return
    if (!text.trim()) return;

    // Skill - Look through techSkill and pick only the one skill in the text(job description)
    const requireSkills = techSkills.filter((skill) =>
      text.toLowerCase().includes(skill.toLowerCase())
    );


    const allRequireSkills = [...requireSkills]

    // look though for each skill in MySkills and pick one skill that has in the requireSkills
    const matchSkills = mySkills.filter((skill) =>
      requireSkills.includes(skill)
    );

    // look though for each one skill in requireSKills and pick one skill that  don't have in the mySkills
    const missingSkills = requireSkills.filter(
      (skill) => !mySkills.includes(skill)
    );

    const techMatch = requireSkills.length > 0 ? (matchSkills.length / requireSkills.length) * 100 : 0
  

    const totalMatch = Math.round(techMatch)

    // split it each sentence for each line, and Filter each line for keywords like "experience", "skill", etc.
    // and found the first 5 sentence that has those keyword
    const requirements = text
      .split("\n")
      .filter(
        (line) =>
          line.includes("experience") ||
          line.includes("knowledge") ||
          line.includes("skill") ||
          line.includes("require") ||
          line.includes("ability") ||
          line.includes("qualification") ||
          line.includes("Support") ||
          line.includes("Test") ||
          line.includes("functionality")
      )
      .slice(0, 5);

      // Suggestion
    // start with empty, if more than 1 showing what skill u need to focus, if none display great match
    const suggestions = []

    if (missingSkills.length > 0) {
      suggestions.push(`Technical: Focus on ${missingSkills.slice(0, 2).join(", ")}`)
    }

    if (missingSkills.length === 0) {
      suggestions.push("Great match! Focus behavioral questions")
    }
      

    // Overall the Analysis state - match, techStack, requirement and suggestion
    setAnalysis({
      match: totalMatch.toString(),
      techSKill: allRequireSkills,
      requirements:
        requirements.length > 0
          ? requirements
          : ["Not specified in the job description"],
      suggestions: suggestions,
    });
  };

  // clear button
  const handleClearButton = () => {
    setText("");
    setAnalysis({
      match: "",
      techSKill: [],
      requirements: [],
      suggestions: [],
    });
  };

  return (
    <div className="min-h-screen p-4 mb-10 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-[36px] font-bold text-black mb-4">
          Job Post Analyzer
        </h1>
        <p className="text-[24px] text-black mt-2">
          Paste any job description. Get instant insights on requirements and
          tech stack.
        </p>
      </header>
      <div className="mb-10 max-w-6xl mx-auto flex flex-col gap-4">
        {/* How to use */}
        <div className="mb-2">
          <h2 className="text-2xl font-semibold mb-2">How to Use</h2>
          <ol className="list-decimal list-inside text-gray-700">
            <li>Copy a job description from any job posting.</li>
            <li>Paste above and click "Analyze"</li>
            <li>See required tech stack instantly</li>
            <li>Get personalized study suggestions</li>
          </ol>
        </div>

        {/* job description input area and button */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 
        focus:border-transparent resize-none"
          placeholder="Paste any job description here"
          required
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAnalyzeButton}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
          >
            Analyze this Job
          </button>
          <button
            onClick={handleClearButton}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
          >
            Clear
          </button>
        </div>

        {text.length > 0 && (
          <div className="text-[16px] text-gray-500 mt-2">
            {text.length} characters • Paste your job description above
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>

        {/* if analysis.match is true then show the code OR show Empty state */}
        {analysis.match ? (
          <div className="space-y-6">
            {/* Match Score */}
            <section>
              <div className="flex gap-2 items-center mb-2">
                <h1 className=" text-gray-900 font-bold">Role Suitability:</h1>
                <p className="text-gray-700">{analysis.match}%</p>
              </div>
            </section>

            {/* Tech Skill */}
            <section>
              <div className="flex gap-2 items-center mb-2">
                <h1 className="text-gray-900 font-bold">Required Tech Skills:</h1>
                <div className="flex flex-wrap gap-2">
                  {analysis.techSKill.length > 0 ? (
                    analysis.techSKill.map((skill, index) => {
                      const hasSkill = mySkills.includes(skill);
                      return (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-lg font-medium border ${
                            hasSkill
                              ? "bg-white text-green-600 "
                              : "bg-white text-red-800 "
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-gray-700">
                      No tech stack identified
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <div className="flex flex-col gap-2 items-start">
                <h1 className=" text-gray-900 font-bold">Key Requirements:</h1>
                <ul className="text-gray-700 list-disc list-inside space-y-2 mt-5">
                  {analysis.requirements.map((req, index) => {
                    return <li key={index}>{req}</li>;
                  })}
                </ul>
              </div>
            </section>

            {/* Suggestions */}
            <section>
              <div className="flex gap-2 items-center">
                <h1 className=" text-gray-900 font-bold mt-4">Study Suggestions:</h1>
                
                  {analysis.suggestions.map((suggestion, index) =>
                    <p key={index} className="text-red-800 font-bold mt-4">{suggestion}</p>
                  )}
                
              </div>
            </section>
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-12 bg-gray-50 mt-10 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Job Analyzed Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Paste a job description above and click "Analyze this job" button to see your match score.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
