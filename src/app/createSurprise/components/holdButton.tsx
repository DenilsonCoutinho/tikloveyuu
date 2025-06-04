import React, { useState, useRef, useCallback } from 'react';

interface HoldToConfirmButtonProps {
  onConfirm?: () => void;
  duration?: number;
  text?: string;
  className?: string;
}

const HoldToConfirmButton: React.FC<HoldToConfirmButtonProps> = ({
  onConfirm,
  duration = 1000,
  text = "Não clique!",
  className = ""
}) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = useCallback(() => {
    if (isCompleted || isLoading) return;
    
    setIsLoading(true);
    const startTime = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        setIsCompleted(true);
        setIsLoading(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (onConfirm) onConfirm();
      }
    }, 16);
  }, [duration, onConfirm, isCompleted, isLoading]);

  const reset = useCallback(() => {
    setProgress(0);
    setIsCompleted(false);
    setIsLoading(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const circumference = 2 * Math.PI * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 ${className}`} style={{ backgroundColor: '#0E0813' }}>
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Outer romantic glow effect */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isCompleted 
            ? "blur-2xl scale-110" 
            : isLoading 
              ? "blur-xl scale-105" 
              : "blur-lg scale-100"
        }`} style={{ 
          background: isCompleted 
            ? 'radial-gradient(circle, rgba(69, 0, 229, 0.4) 0%, rgba(102, 56, 198, 0.3) 100%)'
            : isLoading 
              ? 'radial-gradient(circle, rgba(69, 0, 229, 0.3) 0%, rgba(102, 56, 198, 0.2) 100%)'
              : 'radial-gradient(circle, rgba(69, 0, 229, 0.2) 0%, rgba(102, 56, 198, 0.1) 100%)'
        }} />
        
        {/* Background circle */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 240 240"
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(102, 56, 198, 0.1)" />
              <stop offset="50%" stopColor="rgba(69, 0, 229, 0.2)" />
              <stop offset="100%" stopColor="rgba(102, 56, 198, 0.3)" />
            </linearGradient>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6638C6" />
              <stop offset="30%" stopColor="#4500E5" />
              <stop offset="70%" stopColor="#6638C6" />
              <stop offset="100%" stopColor="#4500E5" />
            </linearGradient>
            <filter id="romanticGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="url(#bgGradient)"
            strokeWidth="10"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx="120"
            cy="120"
            r="100"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-75 ease-out"
            style={{
              filter: isCompleted ? "url(#romanticGlow)" : isLoading ? "url(#romanticGlow)" : "none"
            }}
          />
        </svg>
        
        {/* Inner decorative hearts pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-32 h-32 rounded-full border-2 transition-all duration-500 ${
            isLoading ? "rotate-45 scale-110" : "rotate-0 scale-100"
          }`} style={{ borderColor: 'rgba(102, 56, 198, 0.2)' }}>
            {/* Small hearts around the circle */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 transition-all duration-500 ${
                  isLoading ? "scale-125 opacity-100" : "scale-100 opacity-60"
                }`}
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 2) * 35}%`,
                  top: `${50 + Math.sin(i * Math.PI / 2) * 35}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="text-purple-400 text-xs">💕</span>
              </div>
            ))}
          </div>
          <div className={`absolute top-2 left-2 w-28 h-28 rounded-full border transition-all duration-700 ${
            isLoading ? "rotate-90 scale-95" : "rotate-0 scale-100"
          }`} style={{ borderColor: 'rgba(69, 0, 229, 0.15)' }} />
        </div>
        
        {/* Button */}
        <button
          onClick={isCompleted ? reset : handleClick}
          disabled={isLoading}
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            px-4 py-3 rounded-full font-semibold text-sm
            transition-all duration-300 ease-out
            select-none cursor-pointer w-28 h-14
            backdrop-blur-sm border-2
            ${isCompleted 
              ? "text-white shadow-2xl scale-110" 
              : isLoading 
                ? "text-purple-200 scale-95 shadow-lg cursor-not-allowed" 
                : "text-purple-300 hover:scale-105"
            }
          `}
          style={{
            backgroundColor: isCompleted 
              ? '#6638C6' 
              : isLoading 
                ? 'rgba(69, 0, 229, 0.3)' 
                : 'rgba(102, 56, 198, 0.1)',
            borderColor: isCompleted 
              ? '#4500E5' 
              : isLoading 
                ? 'rgba(69, 0, 229, 0.5)' 
                : 'rgba(102, 56, 198, 0.3)',
            boxShadow: isCompleted 
              ? '0 15px 30px -8px rgba(102, 56, 198, 0.5)' 
              : isLoading 
                ? '0 8px 20px -4px rgba(69, 0, 229, 0.3)' 
                : 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none'
          }}
        >
          <div className="flex flex-col items-center justify-center gap-0.5">
            {isCompleted ? (
              <>
                <span className="text-base">💖</span>
                <span className="text-xs leading-tight">Love sent!</span>
              </>
            ) : isLoading ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse scale-150" />
                <span className="text-xs leading-tight">Agurde...</span>
                <span className="text-xs">💕</span>
              </>
            ) : (
              <>
                {/* <div className="w-1.5 h-1.5 rounded-full bg-current scale-100" /> */}
                <span className="text-xs leading-tight">{text}</span>
                <span className="text-xs">💕</span>
              </>
            )}
          </div>
          
          {/* Progress indicator inside button */}
          {!isCompleted && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(102, 56, 198, 0.2)' }}>
              <div 
                className="h-full transition-all duration-75 ease-out rounded-full"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: '#6638C6'
                }}
              />
            </div>
          )}
        </button>
        
        
        {/* Romantic sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-0.5 h-0.5 rounded-full transition-all duration-1000 ${
                isLoading ? "opacity-100 scale-150" : "opacity-30 scale-100"
              }`}
              style={{
                left: `${25 + (i * 12) % 50}%`,
                top: `${20 + (i * 15) % 60}%`,
                animationDelay: `${i * 250}ms`,
                backgroundColor: i % 2 === 0 ? '#6638C6' : '#4500E5'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HoldToConfirmButton;