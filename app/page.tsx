"use client"
import SearchInput from "@/components/search-input"
import FollowUpInput from "@/components/follow-up-input"
import TopNavBar from "@/components/top-nav-bar"
import { useState } from "react"
import SampleInput from "@/components/sample-input"
import SampleLesson from "@/components/sample-lesson"
export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [showLesson, setShowLesson] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    setIsRemoved(true)

    // After 3 seconds, show the lesson
    setTimeout(() => {
      setShowLesson(true)
    }, 3000)
  }
  const LoadingSkeleton = ({ delay }: { delay: number }) => (
    <div
      className="animate-slide-up-in opacity-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-24 bg-accent/20 rounded-lg animate-pulse" />
    </div>
  )

  const resetChat = () => {
    setIsLoading(false)
    setIsRemoved(false)
    setShowLesson(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative bg-gradient-to-br from-background to-accent/5">
      <TopNavBar onReset={resetChat} />

      {/* Content Container */}
      <div className="w-full max-w-3xl mx-auto px-4 flex-1 flex flex-col mb-[200px]">
        {/* Initial Search Section */}
        {!isRemoved && (
          <div className={`space-y-8 w-full my-auto ${isLoading ? 'opacity-0 transition-opacity duration-300' : ''}`}>
            <h1 className="text-4xl text-left mx-auto">
              What are we learning today?
            </h1>
            <SearchInput onSearch={handleSearch} />
            <SampleInput onSelect={(question) => {
              // You can handle the selected question here
              console.log('Selected:', question)
            }} />
          </div>
        )}

        {/* Rest of the content remains the same */}
        {isLoading && !showLesson && (
          <div className="space-y-6 my-auto">
            {/* Header Skeletons */}
            <div className="space-y-2">
              <div
                className="animate-slide-up-in opacity-0 h-4 bg-accent/30 rounded-full w-3/4"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="animate-slide-up-in opacity-0 h-4 bg-accent/30 rounded-full w-1/2"
                style={{ animationDelay: "0.3s" }}
              />
            </div>

            {/* Content Skeletons */}
            <div className="space-y-4 mt-8">
              <LoadingSkeleton delay={0.4} />
              <LoadingSkeleton delay={0.5} />
              <LoadingSkeleton delay={0.6} />
            </div>
          </div>
        )}

        {/* Sample Lesson */}
        {showLesson && (
          <div className="flex-1 flex items-center justify-center mt-[150px] min-h-[80vh]">
            <SampleLesson />
          </div>
        )}
      </div>

      {/* Fixed Follow-up Input */}
      {showLesson && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-border">
          <div className="w-full max-w-3xl mx-auto animate-slide-up-in opacity-0" style={{ animationDelay: "1.2s" }}>
            <FollowUpInput onSubmit={(value) => console.log('Follow-up:', value)} />
          </div>
        </div>
      )}
    </main>
  )
}