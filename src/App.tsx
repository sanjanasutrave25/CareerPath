import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Search, Map as MapIcon, Target, Briefcase, Sparkles, Loader2, Users, BookOpen, ArrowLeft, ChevronRight } from "lucide-react";
import { generateCareerPaths } from "./services/geminiService";
import { CareerPath } from "./types";
import Roadmap from "./components/Roadmap";
import SkillsGap from "./components/SkillsGap";
import Projects from "./components/Projects";
import Concepts from "./components/Concepts";
import Mentors from "./components/Mentors";
import Resources from "./components/Resources";
import { cn } from "./lib/utils";

type ViewState = "home" | "results" | "mentors" | "resources";

export default function App() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetJobs, setTargetJobs] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CareerPath[]>([]);
  const [selectedPathIndex, setSelectedPathIndex] = useState(0);
  const [view, setView] = useState<ViewState>("home");
  const [activeTab, setActiveTab] = useState<"roadmap" | "skills" | "projects" | "concepts">("roadmap");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSkills || !targetJobs) return;

    setLoading(true);
    try {
      const data = await generateCareerPaths(currentSkills, targetJobs);
      setResults(data);
      setSelectedPathIndex(0);
      setView("results");
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentPath = results[selectedPathIndex];

  const sortedProjects = useMemo(() => {
    if (!currentPath) return [];
    const order = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
    return [...currentPath.projects].sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }, [currentPath]);

  const reset = () => {
    setResults([]);
    setView("home");
    setActiveTab("roadmap");
    setSelectedPathIndex(0);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-slate-200">
      {/* Header */}
      <header className="bg-brand-surface/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-brand-primary cursor-pointer" onClick={reset}>
            <Compass className="w-8 h-8" />
            <span className="tracking-tight">Career GPS</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button 
              onClick={() => results.length > 0 ? setView("results") : setView("home")}
              className={cn("hover:text-brand-primary transition-colors", (view === "home" || view === "results") && "text-brand-primary")}
            >
              Explore Paths
            </button>
            <button 
              onClick={() => setView("mentors")}
              className={cn("hover:text-brand-primary transition-colors", view === "mentors" && "text-brand-primary")}
            >
              Mentors
            </button>
            <button 
              onClick={() => setView("resources")}
              className={cn("hover:text-brand-primary transition-colors", view === "resources" && "text-brand-primary")}
            >
              Resources
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100 mb-6">
                  Your Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">GPS</span>
                </h1>
                <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Stop guessing. Get a data-driven roadmap from where you are to where you want to be.
                </p>
              </div>

              <form onSubmit={handleGenerate} className="bg-brand-surface p-8 rounded-3xl shadow-2xl shadow-brand-primary/5 border border-brand-border space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-brand-primary" />
                    Current Skills & Experience
                  </label>
                  <textarea
                    value={currentSkills}
                    onChange={(e) => setCurrentSkills(e.target.value)}
                    placeholder="e.g. HTML, CSS, Basic JavaScript, Marketing background..."
                    className="w-full p-4 rounded-2xl bg-brand-bg border border-brand-border text-slate-100 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all h-32 resize-none placeholder:text-slate-600"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold flex items-center gap-2 text-slate-300">
                    <Target className="w-4 h-4 text-brand-primary" />
                    Target Job Role(s)
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                    <input
                      type="text"
                      value={targetJobs}
                      onChange={(e) => setTargetJobs(e.target.value)}
                      placeholder="e.g. Data Scientist and Web Developer..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-bg border border-brand-border text-slate-100 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 italic">Tip: You can enter two roles to compare paths!</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Calculating Route...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate My Path
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {view === "results" && currentPath && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1">
                  <button 
                    onClick={reset}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-primary mb-3 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Start Over
                  </button>
                  <div className="flex items-center gap-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                      Path to <span className="text-brand-primary">{currentPath.targetRole}</span>
                    </h2>
                    {results.length > 1 && (
                      <div className="flex gap-2">
                        {results.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedPathIndex(idx)}
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                              selectedPathIndex === idx 
                                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30" 
                                : "bg-brand-surface border border-brand-border text-slate-400 hover:border-brand-primary"
                            )}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex bg-brand-surface p-1.5 rounded-2xl border border-brand-border shadow-inner overflow-x-auto">
                  {[
                    { id: "roadmap", label: "Roadmap", icon: MapIcon },
                    { id: "skills", label: "Skill Gaps", icon: Target },
                    { id: "projects", label: "Projects", icon: Briefcase },
                    { id: "concepts", label: "Real Concepts", icon: Sparkles }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                        activeTab === tab.id 
                          ? "bg-brand-primary text-white shadow-lg" 
                          : "text-slate-400 hover:bg-slate-800"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "roadmap" && (
                  <div className="max-w-3xl mx-auto">
                    <Roadmap steps={currentPath.roadmap} />
                  </div>
                )}
                {activeTab === "skills" && (
                  <div className="max-w-4xl mx-auto bg-brand-surface p-10 rounded-3xl border border-brand-border shadow-sm">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-100">
                      <Target className="w-7 h-7 text-brand-primary" />
                      Skills Gap Analysis
                    </h3>
                    <SkillsGap data={currentPath.skillsGap} />
                  </div>
                )}
                {activeTab === "projects" && (
                  <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                      <h3 className="text-2xl font-bold mb-3 text-slate-100">Portfolio Projects</h3>
                      <p className="text-slate-400">Build these from beginner to advanced to prove your skills.</p>
                    </div>
                    <Projects projects={sortedProjects} />
                  </div>
                )}
                {activeTab === "concepts" && (
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-10 text-center">
                      <h3 className="text-3xl font-bold mb-3 text-slate-100">Real Path Concepts</h3>
                      <p className="text-slate-400">Key takeaways from professionals who successfully made this transition.</p>
                    </div>
                    <Concepts concepts={currentPath.realPathConcepts} />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {view === "mentors" && (
            <motion.div
              key="mentors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-4 text-slate-100">
                  <Users className="w-10 h-10 text-brand-primary" />
                  Industry Mentors
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {currentPath 
                    ? `Connect with experts who have successfully navigated the path to ${currentPath.targetRole}.`
                    : "Generate a career path first to see mentors specific to your target role."}
                </p>
              </div>
              
              {currentPath ? (
                <Mentors mentors={currentPath.mentors} />
              ) : (
                <div className="text-center p-16 bg-brand-surface rounded-3xl border border-dashed border-brand-border">
                  <p className="text-slate-500">No mentors available yet. Please generate a path first.</p>
                  <button onClick={() => setView("home")} className="mt-6 text-brand-primary font-bold hover:underline">
                    Go to Generator
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {view === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-4 text-slate-100">
                  <BookOpen className="w-10 h-10 text-brand-primary" />
                  Learning Resources
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {currentPath 
                    ? `Hand-picked courses, books, and tools to help you master ${currentPath.targetRole} skills.`
                    : "Generate a career path first to see curated resources for your journey."}
                </p>
              </div>
              
              {currentPath ? (
                <div className="max-w-3xl mx-auto">
                  <Resources resources={currentPath.recommendedResources} />
                </div>
              ) : (
                <div className="text-center p-16 bg-brand-surface rounded-3xl border border-dashed border-brand-border">
                  <p className="text-slate-500">No resources available yet. Please generate a path first.</p>
                  <button onClick={() => setView("home")} className="mt-6 text-brand-primary font-bold hover:underline">
                    Go to Generator
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-surface border-t border-brand-border py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-600 mb-6">
            <Compass className="w-8 h-8" />
            <span className="text-lg">Career GPS</span>
          </div>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Built with Gemini AI to help you navigate your professional future. Designed for clarity and growth.
          </p>
        </div>
      </footer>
    </div>
  );
}
