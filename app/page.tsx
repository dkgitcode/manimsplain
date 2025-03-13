"use client"
import SearchInput from "@/components/search-input"
import FollowUpInput from "@/components/follow-up-input"
import TopNavBar from "@/components/top-nav-bar"
import { useState, useRef } from "react"
import SampleInput from "@/components/sample-input"
import DynamicLesson from "@/components/dynamic-lesson"

// Define the types for our lesson data
interface ContentItem {
  type: string;
  content: string;
  link?: string | null;
  definition?: string | null;
}

interface LessonData {
  content: ContentItem[];
  combined_markdown?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [showData, setShowData] = useState(false)
  const [answer, setAnswer] = useState("")
  const [userPrompt, setUserPrompt] = useState("")
  const [data, setData] = useState<LessonData | null>(null)
  const [error, setError] = useState<string | null>(null)
  // Add state for current mode
  const [currentMode, setCurrentMode] = useState<'answer' | 'visualizer'>('answer')

  // Create a ref to store the fetch controller for cancellation
  const controllerRef = useRef<AbortController | null>(null);

  // HANDLE USER SEARCH INPUT 🔍
  const handleSearch = async (prompt: string, mode: 'answer' | 'visualizer' = 'answer') => {
    if (!prompt.trim()) return;

    setUserPrompt(prompt);
    setIsLoading(true);
    setIsRemoved(true);
    setError(null);
    setCurrentMode(mode);
    
    // Reset previous data
    setData(null);
    setAnswer("");
    setShowData(false);

    // Cancel any in-progress fetches
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new controller for this fetch
    controllerRef.current = new AbortController();

    try {
      // MAKE API CALL TO FETCH LESSON DATA 🚀
      console.log(`🚀 FETCHING ${mode.toUpperCase()} DATA with prompt:`, prompt);

      // DETERMINE ENDPOINT BASED ON MODE 🔀
      const endpoint = mode === 'answer' ? 'api/query' : 'api/query-data';
      
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: prompt }),
        signal: controllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // PARSE THE RESPONSE CAREFULLY 🧐
      const json_data = await response.json();
      console.log(`🔍 FULL ${mode.toUpperCase()} API RESPONSE:`, json_data);
      
      // Extract data with safety checks
      const tool_used = json_data.tool_used || 'unknown';
      console.log(`Used tool: ${tool_used}`);
      
      // SAFELY EXTRACT DATA WITH DETAILED LOGGING 📊
      let extractedData = null;
      let extractedAnswer = "";
      
      if (json_data.tool_result && json_data.tool_result.data) {
        extractedData = json_data.tool_result.data;
        console.log("✅ EXTRACTED DATA:", extractedData);
      } else {
        console.warn("⚠️ NO DATA FOUND IN TOOL RESULT");
        // Create a minimal valid data structure
        extractedData = { content: [] };
      }
      
      // ENSURE DATA HAS THE CORRECT STRUCTURE 🧩
      if (!extractedData.content) {
        console.warn("⚠️ DATA MISSING CONTENT ARRAY, ADDING EMPTY CONTENT ARRAY");
        extractedData.content = [];
      }
      
      if (json_data.answer) {
        extractedAnswer = json_data.answer;
        console.log("✅ EXTRACTED ANSWER:", extractedAnswer.substring(0, 100) + "...");
      } else {
        console.warn("⚠️ NO ANSWER FOUND IN RESPONSE");
        extractedAnswer = "Sorry, I couldn't generate an answer for your query.";
      }
      
      // DEBUG LOGS TO CHECK DATA BEFORE SETTING STATE 🔍
      console.log("📊 DATA BEFORE STATE UPDATE:", {
        mode,
        data: extractedData,
        answer: extractedAnswer,
        isDataValid: !!extractedData,
        answerLength: extractedAnswer ? extractedAnswer.length : 0
      });
      
      // Update state with extracted data
      setAnswer(extractedAnswer);
      setData(extractedData);
      
      // IMPORTANT: Set showData to true AFTER setting the data and answer
      setTimeout(() => {
        setShowData(true);
        console.log("🔄 STATE AFTER UPDATE WITH TIMEOUT:", {
          mode,
          showData: true,
          dataExists: !!extractedData,
          errorExists: !!error
        });
      }, 100);
      
    } catch (err) {
      // Only log errors that aren't from aborting the request
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        console.error(`❌ ERROR FETCHING ${mode.toUpperCase()} DATA:`, err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const LoadingSkeleton = ({ delay }: { delay: number }) => (
    <div
      className="animate-slide-up-in opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-24 bg-accent/20 rounded-lg animate-pulse" />
    </div>
  )

  // ADD A TRANSITION EFFECT BETWEEN LOADING AND CONTENT 🔄
  const transitionToContent = () => {
    // This function helps create a smooth transition between loading and content
    if (isLoading && data) {
      return "animate-slide-up-out";
    }
    return "";
  }

  const resetChat = () => {
    setIsLoading(false)
    setIsRemoved(false)
    setShowData(false)
    setUserPrompt("")
    setData(null)
    setError(null)
    setCurrentMode('answer')

    // Cancel any in-progress fetches
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative bg-gradient-to-br from-background to-accent/5">
      <TopNavBar onReset={resetChat} />

      {/* MAIN CONTENT CONTAINER 📝 */}
      <div className="w-full max-w-3xl mx-auto px-4 flex-1 flex flex-col my-[200px]">
        {/* INITIAL SEARCH SECTION 🔎 */}
        {!isRemoved && (
          <div className={`space-y-8 w-full my-auto ${isLoading ? 'opacity-0 transition-opacity duration-300' : ''}`}>
            <h1 className="text-4xl text-left mx-auto">
              Ask me anything...
            </h1>
            <SearchInput onSearch={handleSearch} />
            <SampleInput onSelect={(question) => {
              // Handle the selected sample question
              console.log(question);
              handleSearch(question, 'answer');
            }} />
          </div>
        )}

        {/* Display prompt at top when loading or showing data */}
        {isRemoved && userPrompt && (
          <div className="w-full mt-8 animate-slide-up-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">{userPrompt}</h2>
              {/* MODE INDICATOR BADGE 🏷️ */}
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentMode === 'answer' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-indigo-500/10 text-indigo-500'
              }`}>
                {currentMode === 'answer' ? 'Answer Mode' : 'Visualizer'}
              </span>
            </div>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && !showData && (
          <div className={`space-y-6 mt-6 w-full ${transitionToContent()}`}>
            {/* Content Skeletons */}
            <div className="space-y-4 mt-4">
              <LoadingSkeleton delay={0.3} />
              <LoadingSkeleton delay={0.4} />
              <LoadingSkeleton delay={0.5} />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-3xl mx-auto space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-red-500">Error Loading Lesson</h2>
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm">Please check that your local API is running at http://localhost:8000</p>
            <button
              onClick={() => handleSearch(userPrompt, currentMode)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* DYNAMIC LESSON SECTION - FADES IN WHEN DATA IS LOADED ✨ */}
        {/* SHOULD RENDER WHEN: showData && data && !error */}
        {showData && data && !error && (
          <div className="flex-1 flex items-start justify-center mt-6 min-h-[80vh] animate-fade-in opacity-0">
            <DynamicLesson data={data} prompt={userPrompt} answer={answer} />
          </div>
        )}
      </div>

      {/* Fixed Follow-up Input
      {showData && !error && (
        <div className="fixed bottom-0 left-0 right-0 p-4 ">
          <div className="w-full max-w-3xl mx-auto animate-slide-up-in opacity-0" style={{ animationDelay: "1.2s" }}>
            <FollowUpInput onSubmit={(value) => console.log('Follow-up:', value)} />
          </div>
        </div>
      )} */}
    </main>
  )
}