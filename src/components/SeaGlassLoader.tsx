interface SeaGlassLoaderProps {
  message?: string;
  size?: number;
}

export function SeaGlassLoader({ message, size = 200 }: SeaGlassLoaderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ocean-950">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-[48px]" />

        <svg
          viewBox="0 0 200 200"
          className="h-full w-full"
        >
          <defs>
            <filter id="frosted-glass" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Vert Menthe Givré */}
          <g className="sg-orbit" style={{ "--sg-orbit-dir": "sg-orbit-cw", "--sg-orbit-dur": "12s" } as React.CSSProperties}>
            <g transform="translate(100, 100)">
              <g className="sg-float" style={{ "--sg-float-dur": "4s", "--sg-start": "25px", "--sg-end": "40px" } as React.CSSProperties}>
                <g className="sg-spin" style={{ "--sg-spin-dir": "sg-spin-cw", "--sg-spin-dur": "8s" } as React.CSSProperties}>
                  <path
                    d="M-15,-20 C-5,-28 12,-22 18,-10 C26,2 20,18 8,24 C-8,30 -22,18 -26,2 C-29,-12 -22,-15 -15,-20 Z"
                    fill="#A8E6CF"
                    opacity="0.75"
                    filter="url(#frosted-glass)"
                    stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* Bleu Turquoise Pâle */}
          <g className="sg-orbit" style={{ "--sg-orbit-dir": "sg-orbit-ccw", "--sg-orbit-dur": "15s" } as React.CSSProperties}>
            <g transform="translate(100, 100)">
              <g className="sg-float" style={{ "--sg-float-dur": "5s", "--sg-start": "45px", "--sg-end": "65px" } as React.CSSProperties}>
                <g className="sg-spin" style={{ "--sg-spin-dir": "sg-spin-ccw", "--sg-spin-dur": "10s" } as React.CSSProperties}>
                  <path
                    d="M-22,-12 C-10,-25 18,-22 25,-8 C32,6 22,25 5,28 C-12,30 -30,10 -22,-12 Z"
                    fill="#45B7D1"
                    opacity="0.7"
                    filter="url(#frosted-glass)"
                    stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* Blanc de Mer */}
          <g className="sg-orbit" style={{ "--sg-orbit-dir": "sg-orbit-cw", "--sg-orbit-dur": "18s" } as React.CSSProperties}>
            <g transform="translate(100, 100)">
              <g className="sg-float" style={{ "--sg-float-dur": "3.5s", "--sg-start": "15px", "--sg-end": "30px" } as React.CSSProperties}>
                <g className="sg-spin" style={{ "--sg-spin-dir": "sg-spin-ccw", "--sg-spin-dur": "12s" } as React.CSSProperties}>
                  <path
                    d="M-12,-18 C2,-25 18,-15 22,-2 C25,12 12,25 0,22 C-15,18 -25,2 -12,-18 Z"
                    fill="#E0F7FA"
                    opacity="0.85"
                    filter="url(#frosted-glass)"
                    stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8"
                  />
                </g>
              </g>
            </g>
          </g>

          {/* Vert Bouteille Dépoli */}
          <g className="sg-orbit" style={{ "--sg-orbit-dir": "sg-orbit-ccw", "--sg-orbit-dur": "20s" } as React.CSSProperties}>
            <g transform="translate(100, 100)">
              <g className="sg-float" style={{ "--sg-float-dur": "6s", "--sg-start": "60px", "--sg-end": "80px" } as React.CSSProperties}>
                <g className="sg-spin" style={{ "--sg-spin-dir": "sg-spin-cw", "--sg-spin-dur": "15s" } as React.CSSProperties}>
                  <path
                    d="M-25,-15 C-15,-30 15,-25 25,-10 C35,5 25,30 5,30 C-20,30 -35,5 -25,-15 Z"
                    fill="#2E8B57"
                    opacity="0.6"
                    filter="url(#frosted-glass)"
                    stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.3"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {message && (
        <p className="font-[family-name:var(--font-display)] text-sm text-text-secondary">
          {message}
        </p>
      )}
    </div>
  );
}
