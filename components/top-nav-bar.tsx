import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface TopNavBarProps {
  onReset: () => void
}

export default function TopNavBar({ onReset }: TopNavBarProps) {
  const { toast } = useToast()

  const showDemoToast = () => {
    toast({
      title: "Oops!",
      description: "This is just a demo application!",
    })
  }

  return (
    <nav className="absolute top-4 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onReset}
            className="text-2xl text-primary hover:opacity-80 transition-opacity"
          >
            <strong>manim</strong> <span className="text-muted-foreground ml-[-5px]">splain</span>
          </button>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-accent/50 rounded-md"
              onClick={showDemoToast}
            >
              Pricing
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary/30 hover:bg-accent/50 hover:border-primary rounded-md"
              onClick={showDemoToast}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}