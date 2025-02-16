import { Button } from "@/components/ui/button"

const sampleQuestions = [
  "Explain Newton's laws of motion mathematically.",
  "Show me how to visualize matrix multiplication.",
  "What's the big deal about the Fibonacci sequence?",
  "How does a neural network 'learn'?",
]

export default function SampleInput({ onSelect }: { onSelect: (question: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sampleQuestions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onSelect(question)}
          className="bg-accent/30 border border-white/10 rounded-sm hover:bg-accent/50 transition-colors"
        >
          {question}
        </Button>
      ))}
    </div>
  )
}