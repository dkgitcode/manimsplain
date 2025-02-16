"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"


export default function SearchInput({ onSearch }: { onSearch: () => void }) {
  const [value, setValue] = useState('')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const { toast } = useToast()

  const placeholders = [
    "Explain Linear Regression to a 5 year old.",
    "Explain the chain rule in calculus.",
    "What's t-sne and how does it work?",
    "What's a neural network?",
    "What's a convolutional neural network?",
    "What's a recurrent neural network?",
    "What's a transformer?",
    "What's a language model under the hood?",
    "What's a generative adversarial network?",
    "What's a random forest?",
    "What's a support vector machine?",
    "What does QKV mean in transformers?",
  ]

  const handleSearch = () => {
    if (!value.trim()) {
      toast({
        title: "Hmm...",
        description: "We don't teach that here.",
      })
      return
    }
    onSearch()
    console.log('Searching:', value)
  }


  useEffect(() => {
    if (isTyping) {
      setDisplayedPlaceholder('')
      return
    }

    let currentText = ''
    let direction = 'typing'
    let currentIndex = placeholderIndex

    const interval = setInterval(() => {
      if (direction === 'typing') {
        if (currentText.length < placeholders[currentIndex].length) {
          currentText = placeholders[currentIndex].slice(0, currentText.length + 1)
          setDisplayedPlaceholder(currentText)
        } else {
          setTimeout(() => {
            direction = 'deleting'
          }, 2000)
        }
      } else {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1)
          setDisplayedPlaceholder(currentText)
        } else {
          direction = 'typing'
          const randomIndex = Math.floor(Math.random() * placeholders.length)
          setPlaceholderIndex(randomIndex)
          currentIndex = randomIndex
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [placeholderIndex, isTyping, placeholders])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <Textarea
          placeholder={displayedPlaceholder}
          className="pr-14 py-4 text-lg min-h-[100px] max-h-[300px] rounded-xl bg-background text-foreground placeholder-muted-foreground/50 border-2 border-border focus:border-primary/50 focus:ring-0 resize-none overflow-hidden transition-all duration-200 ease-in-out"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => {
            if (!value) setIsTyping(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSearch()
            }
          }}
          style={{ height: Math.max(100, Math.min(value.split('\n').length * 24 + 40, 300)) }}
        />
        <Button
          size="icon"
          onClick={handleSearch}
          className="absolute right-3 bottom-3 rounded-full bg-transparent hover:bg-accent/50 text-primary border border-primary/30 hover:border-primary transition-colors"
        >
          <Sparkles className="h-3 w-3" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </div>
  )
}
