"use client"
import { Button } from "@/components/ui/button"
import TopNavBar from "@/components/top-nav-bar"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"

export default function PricingPage() {
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  // Handle navigation back to home
  const handleBackToHome = () => {
    router.push("/")
  }

  // Handle subscription (this would connect to payment in a real app)
  const handleSubscribe = (plan: string) => {
    // This is just a placeholder - in a real app, this would initiate payment
    console.log(`Subscribing to ${plan} plan`)
    // Show a toast or redirect to payment page
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation */}
      <TopNavBar onReset={handleBackToHome} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get unlimited access to NBA insights, stats, and analysis with our AI-powered chatbot.
            </p>
            
            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center p-1 bg-accent/30 rounded-lg">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingPeriod === "monthly" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingPeriod === "yearly" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly <span className="text-xs opacity-80">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pro Plan */}
            <div className="border border-border rounded-xl p-8 bg-card hover:border-primary/50 transition-all">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Pro</h2>
                <p className="text-muted-foreground">Perfect for casual NBA fans</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${billingPeriod === "monthly" ? "8" : "77"}</span>
                  <span className="text-muted-foreground ml-2">/ {billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
                {billingPeriod === "yearly" && (
                  <p className="text-sm text-muted-foreground mt-1">Equivalent to $6.40/month</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Unlimited NBA stats and data queries</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Real-time game updates and scores</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Player performance insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Basic team analytics</span>
                </li>
              </ul>
              
              <Button 
                className="w-full"
                onClick={() => handleSubscribe("pro")}
              >
                Get Started
              </Button>
            </div>
            
            {/* Premium Plan */}
            <div className="border border-primary rounded-xl p-8 bg-card relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="absolute -top-3 right-8 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                RECOMMENDED
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Premium</h2>
                <p className="text-muted-foreground">For the serious NBA enthusiast</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-4xl font-bold">${billingPeriod === "monthly" ? "20" : "192"}</span>
                  <span className="text-muted-foreground ml-2">/ {billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
                {billingPeriod === "yearly" && (
                  <p className="text-sm text-muted-foreground mt-1">Equivalent to $16/month</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Everything in Pro plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced statistical analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Personalized insights and recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Historical data comparisons</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Fantasy basketball predictions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
              
              <Button 
                variant="default"
                className="w-full"
                onClick={() => handleSubscribe("premium")}
              >
                Get Premium
              </Button>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-lg font-medium mb-2">What data sources does NBA Genie use?</h3>
                <p className="text-muted-foreground">NBA Genie uses official NBA data sources to provide accurate, up-to-date information about games, players, and teams.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">How often is the data updated?</h3>
                <p className="text-muted-foreground">Our data is updated in real-time during games and multiple times daily for other statistics and information.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a free trial available?</h3>
                <p className="text-muted-foreground">We offer limited free queries to try out the service before subscribing to a paid plan.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to elevate your NBA knowledge?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of NBA fans who use NBA Genie to stay informed and gain deeper insights into the game they love.
            </p>
            <Button 
              size="lg" 
              onClick={() => router.push("/")}
            >
              Try NBA Genie Now
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NBA Genie. All rights reserved.</p>
          <p className="mt-2">
            {/* DISCLAIMER: NOT AFFILIATED WITH THE NBA 🏀 */}
            <span className="opacity-70">Not affiliated with or endorsed by the National Basketball Association.</span>
          </p>
        </div>
      </footer>
    </div>
  )
} 