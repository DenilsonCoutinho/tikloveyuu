import React, { useState, useRef, useCallback } from 'react';

interface HoldToConfirmButtonProps {
  onConfirm?: () => void;
  duration?: number;
  text?: string;
  className?: string;
}

const HoldToConfirmButton: React.FC<HoldToConfirmButtonProps> = ({
  onConfirm,
  duration = 1500,
  text = "Não aperte!",
  className = ""
}) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = useCallback(() => {
    if (isCompleted) return;

    setIsHolding(true);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setIsCompleted(true);
        setIsHolding(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (onConfirm) onConfirm();
      }
    }, 16);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, duration);
  }, [duration, onConfirm, isCompleted]);

  const stopHold = useCallback(() => {
    if (isCompleted) return;

    setIsHolding(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const startProgress = progress;
    const startTime = Date.now();
    const animationDuration = 300;

    const animateBack = () => {
      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min(elapsed / animationDuration, 1);
      const newProgress = startProgress * (1 - animationProgress);

      setProgress(newProgress);

      if (animationProgress < 1) {
        requestAnimationFrame(animateBack);
      }
    };

    requestAnimationFrame(animateBack);
  }, [progress, isCompleted]);

  const reset = useCallback(() => {
    setProgress(0);
    setIsCompleted(false);
    setIsHolding(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const circumference = 2 * Math.PI * 180;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`flex items-center justify-center w-full noSelect ${className}`}>
      <div className="relative w-[90vw] max-w-[400px] aspect-square">
        {/* Glow */}
        <div
          className={`absolute rounded-full transition-all duration-300 z-0 ${isCompleted
              ? "blur-3xl scale-125"
              : isHolding
                ? "blur-2xl scale-110"
                : "blur-xl scale-100"
            }`}
          style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: isCompleted
              ? 'radial-gradient(circle, rgba(69, 0, 229, 0.4) 0%, rgba(102, 56, 198, 0.3) 100%)'
              : isHolding
                ? 'radial-gradient(circle, rgba(69, 0, 229, 0.3) 0%, rgba(102, 56, 198, 0.2) 100%)'
                : 'radial-gradient(circle, rgba(69, 0, 229, 0.2) 0%, rgba(102, 56, 198, 0.1) 100%)'
          }}
        />

        {/* SVG Circle */}
        <svg viewBox="0 0 400 400" className="absolute w-full h-full top-0 left-0 rotate-[-90deg]">
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(102, 56, 198, 0.1)" />
              <stop offset="50%" stopColor="rgba(69, 0, 229, 0.2)" />
              <stop offset="100%" stopColor="rgba(102, 56, 198, 0.3)" />
            </linearGradient>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6638C6" />
              <stop offset="30%" stopColor="#0B00E5" />
              <stop offset="70%" stopColor="#0B00E5" />
              <stop offset="100%" stopColor="#6638C6" />
            </linearGradient>
            <filter id="romanticGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="200" cy="200" r="180" stroke="url(#bgGradient)" strokeWidth="16" fill="none" />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="url(#progressGradient)"
            strokeWidth="16"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: isCompleted || isHolding ? "url(#romanticGlow)" : "none"
            }}
          />
        </svg>

        {/* Inner hearts */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className={`w-3/5 h-3/5 rounded-full border-2 transition-all duration-500 relative ${isHolding ? "rotate-45 scale-110" : "rotate-0 scale-100"
              }`}
            style={{ borderColor: 'rgba(102, 56, 198, 0.2)' }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 transition-all duration-500 ${isHolding ? "scale-125 opacity-100" : "scale-100 opacity-60"
                  }`}
                style={{
                  left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                  top: `${50 + Math.sin(i * Math.PI / 3) * 40}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className="text-purple-400 text-sm">💕</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botão */}
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            startHold();
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            stopHold();
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            stopHold();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            startHold();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            stopHold();
          }}
          // ⚠️ Evita bug de "duplo clique" em iOS
          onClick={(e) => {
            e.preventDefault();
            if (isCompleted) reset();
          }}
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            px-5 py-3 rounded-full font-semibold text-sm
            transition-all duration-300 ease-out
            select-none cursor-pointer z-20 text-center
            backdrop-blur-sm border-2 min-w-[8rem]
            ${isCompleted
              ? "text-white shadow-2xl scale-110"
              : isHolding
                ? "text-purple-200 scale-95 shadow-lg"
                : "text-purple-300 hover:scale-105"
            }
          `}
          style={{
            backgroundColor: isCompleted
              ? '#6638C6'
              : isHolding
                ? 'rgba(69, 0, 229, 0.3)'
                : 'rgba(102, 56, 198, 0.1)',
            borderColor: isCompleted
              ? '#4500E5'
              : isHolding
                ? 'rgba(69, 0, 229, 0.5)'
                : 'rgba(102, 56, 198, 0.3)',
            boxShadow: isCompleted
              ? '0 25px 50px -12px rgba(102, 56, 198, 0.5)'
              : isHolding
                ? '0 10px 25px -5px rgba(69, 0, 229, 0.3)'
                : 'none',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            {isCompleted ? (
              <>
                {/* <span className="text-xl">💖</span> */}
                <span className="whitespace-nowrap">Eu avisei!</span>
              </>
            ) : (
              <>
                <span className="text-xl">💖</span>
                <span className="whitespace-nowrap">{text}</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default HoldToConfirmButton;
