import React from 'react'
import { VideoComponent } from '@/components/ui/video-component'

export default function LinearRegressionLesson() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <header className="space-y-4">
        <h1 
          className="text-4xl font-bold text-primary animate-slide-up-in opacity-0"
          style={{ animationDelay: "0s" }}
        >
          Mastering Linear Regression: A Deep Dive
        </h1>
        <p 
          className="text-lg text-muted-foreground animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          Learn everything about Linear Regression—from fundamentals to advanced techniques.
        </p>
      </header>

      <section className="space-y-12">
        {/* Introduction */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">1. What is Linear Regression?</h2>
          <p className="text-muted-foreground">
            Linear Regression is a <span className="bg-purple-100 dark:bg-purple-800/30 px-1 rounded-[4px]">supervised learning algorithm</span> that models the relationship between a dependent variable (Y) and one or more independent variables (X). The goal is to find the best-fitting straight line that minimizes the error in predictions.
          </p>
          <VideoComponent 
            title="Introduction to Linear Regression" 
            description="Visualizing the concept of best-fit lines"
            src="/1.mp4"
          />
        </div>

        {/* The Math Behind It */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">2. The Mathematics</h2>
          <p className="text-muted-foreground">
            The equation of a simple linear regression model is:
          </p>
          <pre className="bg-muted p-4 rounded-md">y = mx + b</pre>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">y</span>: The predicted value</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">x</span>: The independent variable</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">m</span>: The slope (rate of change)</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">b</span>: The y-intercept</li>
          </ul>
          <VideoComponent 
            title="The Linear Regression Formula" 
            description="Breaking down y = mx + b"
            src="/2.mp4"
          />
        </div>

        {/* Assumptions of Linear Regression */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">3. Assumptions of Linear Regression</h2>
          <p className="text-muted-foreground">
            To ensure accurate predictions, linear regression relies on several assumptions:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Linearity:</span> The relationship between X and Y must be linear.</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Independence:</span> The observations should be independent of each other.</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Homoscedasticity:</span> The variance of residuals should be constant across all values of X.</li>
            <li><span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Normality:</span> Residuals should be normally distributed.</li>
          </ul>
        </div>

        {/* Error and Loss Function */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">4. Error and Cost Function</h2>
          <p className="text-muted-foreground">
            The accuracy of our model depends on how well it minimizes error. The most commonly used error function is <span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Mean Squared Error (MSE):</span>
          </p>
          <pre className="bg-muted p-4 rounded-md">MSE = (1/n) * Σ (y - ŷ)²</pre>

          <VideoComponent 
            title="Mean Squared Error" 
            description="Visualizing the concept of Mean Squared Error"
            src="/3.mp4"
          />
        </div>

        {/* Gradient Descent */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">5. Optimizing Using Gradient Descent</h2>
          <p className="text-muted-foreground">
            To find the best parameters (m, b), we use <span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">Gradient Descent</span>:
          </p>
          <pre className="bg-muted p-4 rounded-md">m := m - α * (∂MSE/∂m)</pre>
          <pre className="bg-muted p-4 rounded-md">b := b - α * (∂MSE/∂b)</pre>
          <p className="text-muted-foreground">
            where <span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">α</span> is the learning rate that controls how big of steps we take when updating our parameters.
          </p>

          <p className="text-muted-foreground">
            The gradient descent algorithm works by iteratively adjusting our parameters to minimize the loss function. Let&apos;s visualize this process:
          </p>

          <VideoComponent 
            title="Gradient Descent" 
            description="Visualizing the loss function and the gradient descent"
            src="/4.mp4"
          />

          <p className="text-muted-foreground">
            In the visualization above, we can see how the algorithm navigates the loss function landscape, taking steps in the direction that reduces our error the most. The size of these steps is controlled by our learning rate α.
          </p>

          <p className="text-muted-foreground">
            Once we&apos;ve found the optimal parameters through gradient descent, we can see how our final line fits the data:
          </p>

          <VideoComponent 
            title="Gradient Descent" 
            description="Visualizing the results to the original line"
            src="/5.mp4"
          />

          <p className="text-muted-foreground">
            The final line represents our optimized linear regression model, where we&apos;ve found the values of m and b that minimize our mean squared error. This line gives us the best linear approximation of our data points.
          </p>
        </div>

        {/* Real-world Example */}
        <div 
          className="space-y-4 animate-slide-up-in opacity-0"
          style={{ animationDelay: "1s" }}
        >
          <h2 className="text-2xl font-semibold text-primary">6. Practical Example</h2>
          <p className="text-muted-foreground">
            Let&apos;s predict house prices based on square footage using linear regression.
          </p>
          <VideoComponent 
            title="House Price Prediction" 
            description="Real-world application with house prices"
            src="/6.mp4"
          />
        </div>
      </section>

      <footer 
        className="pt-8 border-t border-border animate-slide-up-in opacity-0"
        style={{ animationDelay: "1.1s" }}
      >
        <p className="text-sm text-muted-foreground">
          This lesson was generated with the help of <span className="bg-purple-100 dark:bg-purple-900/30 px-1 rounded-[4px]">manim</span>.
        </p>
      </footer>
    </div>
  )
}
