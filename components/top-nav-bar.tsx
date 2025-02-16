import { Button } from "@/components/ui/button"

interface TopNavBarProps {
  onReset: () => void
}

export default function TopNavBar({ onReset }: TopNavBarProps) {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onReset}
            className="text-2xl text-primary hover:opacity-80 transition-opacity"
          >
            <strong>manim</strong> <span className="text-muted-foreground ml-[-5px]">splain</span>
          </button>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-primary hover:bg-accent/50 rounded-md">
              Pricing
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary/30 hover:bg-accent/50 hover:border-primary rounded-md"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}