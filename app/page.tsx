"use client"

import { useState, useRef } from "react"
import { Heart, Sparkles, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Stage = "question" | "selection" | "reveal"

const destinations = [
  {
    id: 1,
    image: "/images/restaurant.png",
    revealImage: "/images/chilis-reveal.jpeg",
    name: "Chili's Restaurant",
    revealName: "Chili's Restaurant",
    travelMethod: "via commute",
    companion: "just the two of us",
    description: "Cozy indoor dining",
  },
  {
    id: 2,
    image: "/images/outdoor-cafe.jpeg",
    revealImage: "/images/hilltop-night.jpeg",
    name: "Overlooking Cafe",
    revealName: "Kabesera Cafe",
    travelMethod: "via motorcycle",
    companion: "w/ Tine and Rusell",
    description: "Beautiful outdoor views",
  },
]

export default function ValentinePage() {
  const [stage, setStage] = useState<Stage>("question")
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const funnyMessages = [
    "Are you sure?",
    "Think again...",
    "Really?!",
    "Pretty please?",
    "Last chance!",
    "Come on!",
  ]

  const moveNoButton = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      const buttonWidth = 100
      const buttonHeight = 50
      const padding = 20

      const maxX = container.width - buttonWidth - padding
      const maxY = container.height - buttonHeight - padding

      const newX = Math.max(padding, Math.random() * maxX)
      const newY = Math.max(padding, Math.random() * maxY)

      setNoButtonPosition({ x: newX, y: newY })
      setIsNoButtonMoved(true)
      setNoClickCount((prev) => Math.min(prev + 1, funnyMessages.length - 1))
    }
  }

  const handleYes = () => {
    setStage("selection")
  }

  const handleSelectDestination = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination)
    setStage("reveal")
  }

  // Selection screen - Choose a destination
  if (stage === "selection") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient" />
        
        {/* Floating hearts */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-primary/15 fill-primary/10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${6 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in relative z-10 px-4">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-3">
              <Heart className="w-10 h-10 text-primary fill-primary animate-heartbeat" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Where should we go?
            </h1>
            <p className="text-muted-foreground text-lg">
              Pick your favorite spot for our date!
            </p>
          </div>
          
          {/* Destination cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {destinations.map((destination) => (
              <button
                key={destination.id}
                onClick={() => handleSelectDestination(destination)}
                className="group relative bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-left shadow-xl"
              >
                {/* Glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
                
                <div className="relative">
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">
                        {destination.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground">
                      {destination.description}
                    </p>
                    
                    {/* Select indicator */}
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 fill-primary" />
                        Select this place
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Reveal screen - Show selected destination
  if (stage === "reveal" && selectedDestination) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-start justify-start pt-6 pb-8 px-4 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 animate-gradient" />
        
        {/* Confetti hearts */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-30px`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            >
              <Heart
                className="text-primary fill-primary"
                style={{
                  width: `${12 + Math.random() * 16}px`,
                  height: `${12 + Math.random() * 16}px`,
                  opacity: 0.5 + Math.random() * 0.4,
                }}
              />
            </div>
          ))}
        </div>

        <div className="max-w-md w-full mx-auto text-center space-y-4 animate-fade-in relative z-10">
          {/* Compact header */}
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
            <span className="text-xl md:text-2xl font-bold text-foreground">
              I knew you{"'"}d say <span className="text-primary">Yes!</span>
            </span>
            <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>
          
          {/* Image card with glow - larger portrait */}
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity animate-gradient" />
            <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 bg-card shadow-2xl">
              <div className="relative w-full" style={{ aspectRatio: "3/4.5" }}>
                <Image
                  src={selectedDestination.revealImage || "/placeholder.svg"}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Text overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="bg-card/80 backdrop-blur-md rounded-lg p-4 border border-primary/20 shadow-xl">
                  <p className="text-lg md:text-xl font-bold text-foreground mb-1">
                    We{"'"}re going to {selectedDestination.revealName}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    {selectedDestination.companion}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <span className="text-base md:text-lg font-semibold">{selectedDestination.travelMethod}</span>
                    <span className="text-xl">{selectedDestination.id === 1 ? "🚌" : "🏍️"}</span>
                  </div>
                  <p className="text-sm md:text-base text-accent font-medium mt-3 pt-3 border-t border-primary/20">
                    I{"'"}ll pick you up by 4:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-base">
            Get ready for an unforgettable adventure together!
          </p>
          
          {/* Dancing hearts */}
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="text-primary fill-primary animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.12}s`,
                  width: `${14 + Math.abs(2 - i) * 3}px`,
                  height: `${14 + Math.abs(2 - i) * 3}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 fill-primary/5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${24 + Math.random() * 40}px`,
              height: `${24 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main card */}
      <div
        ref={containerRef}
        className="relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-border max-w-md w-full min-h-[500px] overflow-hidden"
      >
        {/* Card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl" />
        
        <div className="relative text-center space-y-8">
          {/* Animated heart icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Heart className="w-24 h-24 text-primary fill-primary animate-heartbeat drop-shadow-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-24 h-24 text-primary fill-primary animate-ping opacity-30" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
              A Special Question
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Will you be my
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold text-primary tracking-tight">
              Valentine?
            </h2>
          </div>

          {/* Dynamic message */}
          <p className="text-muted-foreground text-lg min-h-[28px] transition-all duration-300">
            {isNoButtonMoved ? funnyMessages[noClickCount] : "I promise to make it special..."}
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              onClick={handleYes}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-7 text-xl rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Yes!
            </Button>

            {!isNoButtonMoved && (
              <Button
                onClick={moveNoButton}
                variant="outline"
                size="lg"
                className="border-2 border-muted text-muted-foreground hover:bg-muted/10 font-bold px-10 py-7 text-xl rounded-full transition-all duration-300 bg-transparent"
              >
                No
              </Button>
            )}
          </div>
        </div>

        {/* Floating No button */}
        {isNoButtonMoved && (
          <Button
            onClick={moveNoButton}
            variant="outline"
            className="absolute border-2 border-muted text-muted-foreground hover:bg-muted/10 font-bold px-6 py-4 text-base rounded-full transition-all duration-300 ease-out bg-card/90 backdrop-blur-sm shadow-lg"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
            }}
          >
            No
          </Button>
        )}
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-8 flex gap-3 opacity-60">
        {[...Array(3)].map((_, i) => (
          <Heart
            key={i}
            className="w-4 h-4 text-primary fill-primary"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
