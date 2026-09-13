import { cn } from '@/lib/utils';
import * as React from 'react';

export function SpendyLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            .chart-lines {
                stroke: hsl(var(--muted-foreground));
                opacity: 0.6;
            }
            .dot-1, .dot-2, .dot-3 {
                animation: drop-in 1.5s cubic-bezier(0.32, 0, 0.67, 0) infinite;
                transform-origin: center;
                opacity: 0;
            }
            .dot-2 { animation-delay: 0.15s; }
            .dot-3 { animation-delay: 0.3s; }
            @keyframes drop-in {
                0% {
                    transform: translateY(-20px) scale(0.5);
                    opacity: 0;
                }
                25%, 50% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(20px) scale(0.5);
                    opacity: 0;
                }
            }
          `}
        </style>
        
        {/* Wallet Icon */}
        <path d="M22.0583 31.0566C20.6543 31.0566 18.666 31.5458 17.5 32.4999V20.8333C17.5 19.2711 18.7711 18 20.3333 18H39.6667C41.2289 18 42.5 19.2711 42.5 20.8333V25.3333M22.0583 31.0566C23.1118 30.1032 25.1009 29.6133 26.5051 29.6133C29.6015 29.6133 32.0469 31.0566 34.1203 31.0566C36.1937 31.0566 38.3813 30.1032 39.7854 28.4233L42.5 25.3333M22.0583 31.0566V39.1666C22.0583 40.7288 23.3294 42 24.8917 42H39.6667C41.2289 42 42.5 40.7288 42.5 39.1666V25.3333" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M37.8333 22.6667H39.6667" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Animated Dots */}
        <circle cx="34" cy="14" r="3" fill="hsl(var(--primary))" className="dot-1" />
        <circle cx="28" cy="10" r="3" fill="hsl(var(--primary))" className="dot-2" />
        <circle cx="22" cy="8" r="3" fill="hsl(var(--primary))" className="dot-3" />
      </svg>
    </div>
  );
}
