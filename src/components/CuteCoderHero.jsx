import React from 'react';
import { Sparkles, Terminal, CheckCircle2, Zap } from 'lucide-react';
import './CuteCoderHero.css';

export default function CuteCoderHero() {
  return (
    <div className="cute-coder-container">
      {/* Soft radiant ambient glow backdrop */}
      <div className="cute-coder-backdrop" />

      {/* Floating Badges */}
      {/* 1. Floating Python Badge 🐍 */}
      <div className="float-python-badge">
        <span className="text-base select-none">🐍</span>
        <span className="text-[11px] font-extrabold text-emerald-800 tracking-tight">
          Python 3.12
        </span>
      </div>

      {/* 2. Floating </> Code Tag Badge */}
      <div className="float-code-badge">
        <span className="text-xs font-mono font-black text-indigo-700 select-none">&lt;/&gt;</span>
        <span className="text-[11px] font-bold text-indigo-800">
          def solve():
        </span>
      </div>

      {/* 3. Floating +20 XP Achievement Notification */}
      <div className="float-xp-badge">
        <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        <span>+20 XP Quest Clear!</span>
      </div>

      {/* Floating Twinkling Stars */}
      <span className="sparkle-star sparkle-1 select-none">✦</span>
      <span className="sparkle-star sparkle-2 select-none">✧</span>
      <span className="sparkle-star sparkle-3 select-none">★</span>
      <span className="sparkle-star sparkle-4 select-none">✦</span>

      {/* Main Glass Card */}
      <div className="cute-coder-card">
        {/* Vector SVG Animation (2D Cartoon Student Girl Coding) */}
        <svg
          viewBox="0 0 400 320"
          className="cute-coder-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background window gradient */}
            <linearGradient id="bgWindowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="50%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#fdf2f8" />
            </linearGradient>

            {/* Laptop screen glow */}
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Hair color gradient */}
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#58311d" />
              <stop offset="50%" stopColor="#452313" />
              <stop offset="100%" stopColor="#321608" />
            </linearGradient>

            {/* Hoodie gradient */}
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="70%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Desk gradient */}
            <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>

            {/* Soft Drop Shadow Filter */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7c3aed" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* 1. ROOM BACKGROUND: Pastel Arch Window */}
          <path
            d="M 120 220 L 120 70 A 80 80 0 0 1 280 70 L 280 220 Z"
            fill="url(#bgWindowGrad)"
            opacity="0.85"
          />
          {/* Subtle stars in window */}
          <circle cx="160" cy="50" r="2" fill="#fbbf24" opacity="0.8" />
          <circle cx="230" cy="40" r="2.5" fill="#f472b6" opacity="0.7" />
          <circle cx="260" cy="70" r="1.5" fill="#818cf8" opacity="0.8" />
          <path d="M 180 32 Q 183 38 189 40 Q 183 42 180 48 Q 177 42 171 40 Q 177 38 180 32 Z" fill="#fbbf24" opacity="0.85" />

          {/* 2. CUTE ACCESSORIES: Potted plant on left desk */}
          <g transform="translate(45, 180)">
            <ellipse cx="20" cy="42" rx="14" ry="4" fill="#cbd5e1" opacity="0.4" />
            {/* Pot */}
            <path d="M 10 24 L 30 24 L 27 42 L 13 42 Z" fill="#a7f3d0" stroke="#6ee7b7" strokeWidth="1.5" />
            {/* Leaves */}
            <path d="M 20 24 Q 10 10 12 4 Q 20 14 20 24 Z" fill="#10b981" />
            <path d="M 20 24 Q 30 10 28 4 Q 20 14 20 24 Z" fill="#34d399" />
            <path d="M 20 24 Q 20 6 22 2 Q 22 14 20 24 Z" fill="#059669" />
          </g>

          {/* Cute Warm Tea Mug on right desk */}
          <g transform="translate(325, 185)">
            <ellipse cx="18" cy="38" rx="12" ry="3" fill="#cbd5e1" opacity="0.4" />
            {/* Mug body */}
            <rect x="8" y="16" width="20" height="22" rx="4" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
            {/* Mug handle */}
            <path d="M 28 20 Q 36 24 28 32" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
            {/* Heart on mug */}
            <path d="M 18 25 C 18 23 15 22 15 25 C 15 27 18 30 18 30 C 18 30 21 27 21 25 C 21 22 18 23 18 25 Z" fill="#ec4899" />
            {/* Animated Steam */}
            <path d="M 14 12 Q 13 6 16 2" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" className="mug-steam" />
            <path d="M 22 12 Q 23 6 20 2" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" className="mug-steam" style={{ animationDelay: '1.2s' }} />
          </g>

          {/* 3. GIRL CHARACTER GROUP (Animated Breathing & Celebration) */}
          <g className="girl-body-group">
            {/* Girl Back Hair */}
            <path
              d="M 135 150 C 120 220 130 250 145 260 C 160 270 240 270 255 260 C 270 250 280 220 265 150 Z"
              fill="url(#hairGrad)"
            />

            {/* Girl Torso & Lavender Hoodie */}
            <g>
              <path
                d="M 145 240 C 150 200 250 200 255 240 L 268 300 C 268 305 132 305 132 300 Z"
                fill="url(#hoodieGrad)"
                filter="url(#softShadow)"
              />
              {/* Hoodie Collar & Strings */}
              <path
                d="M 175 208 C 185 224 215 224 225 208 C 220 230 180 230 175 208 Z"
                fill="#ddd6fe"
              />
              {/* Drawstrings */}
              <path d="M 188 222 L 186 242" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="186" cy="243" r="2" fill="#34d399" />
              <path d="M 212 222 L 214 242" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="214" cy="243" r="2" fill="#34d399" />
            </g>

            {/* Girl Head & Face Group */}
            <g className="girl-head-group">
              {/* Neck */}
              <rect x="188" y="180" width="24" height="24" rx="6" fill="#fcd9c5" />

              {/* Face Shape */}
              <ellipse cx="200" cy="150" rx="46" ry="44" fill="#fee3d2" />

              {/* Ears */}
              <circle cx="153" cy="154" r="8" fill="#fee3d2" />
              <circle cx="153" cy="154" r="4" fill="#fbcfe8" />
              <circle cx="247" cy="154" r="8" fill="#fee3d2" />
              <circle cx="247" cy="154" r="4" fill="#fbcfe8" />

              {/* Cute Blushing Pink Cheeks (intense on celebration) */}
              <ellipse cx="172" cy="162" rx="9" ry="5.5" fill="#f472b6" className="blush-cheeks" />
              <ellipse cx="228" cy="162" rx="9" ry="5.5" fill="#f472b6" className="blush-cheeks" />

              {/* Cute Little Nose */}
              <circle cx="200" cy="152" r="1.5" fill="#e28c68" />

              {/* Eyes Normal (Open with cute highlights & blinks) */}
              <g className="eyes-open">
                {/* Left Eye */}
                <ellipse cx="178" cy="144" rx="7" ry="9" fill="#2d1606" />
                <circle cx="176" cy="141" r="3.5" fill="#ffffff" />
                <circle cx="180" cy="148" r="1.5" fill="#ffffff" />
                <path d="M 170 134 Q 178 131 186 135" fill="none" stroke="#2d1606" strokeWidth="2" strokeLinecap="round" />
                {/* Right Eye */}
                <ellipse cx="222" cy="144" rx="7" ry="9" fill="#2d1606" />
                <circle cx="220" cy="141" r="3.5" fill="#ffffff" />
                <circle cx="224" cy="148" r="1.5" fill="#ffffff" />
                <path d="M 214 135 Q 222 131 230 134" fill="none" stroke="#2d1606" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Eyes Celebration (Happy anime closed eyes ( ^ ‿ ^ )) */}
              <g className="eyes-happy-closed">
                <path d="M 170 146 Q 178 136 186 146" fill="none" stroke="#2d1606" strokeWidth="3" strokeLinecap="round" />
                <path d="M 214 146 Q 222 136 230 146" fill="none" stroke="#2d1606" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Mouth Normal: Sweet gentle smile */}
              <path
                d="M 194 163 Q 200 168 206 163"
                fill="none"
                stroke="#c2410c"
                strokeWidth="2"
                strokeLinecap="round"
                className="mouth-normal"
              />

              {/* Mouth Celebrate: Cheerful open laugh smile */}
              <g className="mouth-celebrate">
                <path
                  d="M 192 161 Q 200 174 208 161 Z"
                  fill="#e11d48"
                  stroke="#be123c"
                  strokeWidth="1.5"
                />
                <path d="M 195 166 Q 200 172 205 166" fill="#fbcfe8" />
              </g>

              {/* Girl Hair Front / Bangs & Star Clip */}
              <g className="hair-bounce">
                {/* Hair Top / Crown */}
                <path
                  d="M 148 140 C 145 90 255 90 252 140 C 240 120 220 115 200 116 C 180 115 160 120 148 140 Z"
                  fill="url(#hairGrad)"
                />
                {/* Cute Front Bangs */}
                <path
                  d="M 152 136 Q 165 148 178 134 Q 192 148 205 134 Q 222 150 248 136 Q 235 118 200 118 Q 165 118 152 136 Z"
                  fill="url(#hairGrad)"
                />
                {/* Side hair locks */}
                <path d="M 150 140 Q 146 170 152 186 Q 156 165 156 142 Z" fill="url(#hairGrad)" />
                <path d="M 250 140 Q 254 170 248 186 Q 244 165 244 142 Z" fill="url(#hairGrad)" />

                {/* Cute Star Hairclip in Mint/Yellow */}
                <g transform="translate(162, 116)">
                  <path
                    d="M 0 -7 L 2 -2 L 7 -2 L 3 1 L 5 6 L 0 3 L -5 6 L -3 1 L -7 -2 L -2 -2 Z"
                    fill="#fef08a"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  <circle cx="0" cy="0" r="1.5" fill="#f59e0b" />
                </g>
              </g>
            </g>

            {/* Left Arm & Hand (Typing taps & Celebration fist pump) */}
            <g className="left-arm-group">
              <path
                d="M 150 235 Q 155 270 178 268"
                fill="none"
                stroke="#c4b5fd"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Sleeve cuff */}
              <ellipse cx="178" cy="268" rx="8" ry="7" fill="#a78bfa" />
              {/* Cute hand */}
              <circle cx="184" cy="268" r="6" fill="#fee3d2" />
            </g>

            {/* Right Arm & Hand (Typing taps & Celebration fist pump) */}
            <g className="right-arm-group">
              <path
                d="M 250 235 Q 245 270 222 268"
                fill="none"
                stroke="#c4b5fd"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Sleeve cuff */}
              <ellipse cx="222" cy="268" rx="8" ry="7" fill="#a78bfa" />
              {/* Cute hand */}
              <circle cx="216" cy="268" r="6" fill="#fee3d2" />
            </g>
          </g>

          {/* 4. THE LAPTOP ON THE DESK */}
          <g transform="translate(130, 215)">
            {/* Screen Lid / Backing */}
            <rect
              x="12"
              y="10"
              width="116"
              height="75"
              rx="6"
              fill="#334155"
              stroke="#64748b"
              strokeWidth="2"
            />
            {/* Screen Display */}
            <rect
              x="16"
              y="14"
              width="108"
              height="67"
              rx="4"
              fill="url(#screenGrad)"
            />

            {/* Screen Code Lines Animated */}
            {/* Line 1: def quest(hero): */}
            <g className="screen-code-line-1">
              <rect x="22" y="24" width="22" height="3" rx="1.5" fill="#f472b6" />
              <rect x="47" y="24" width="28" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="78" y="24" width="12" height="3" rx="1.5" fill="#a78bfa" />
            </g>

            {/* Line 2: print("Hello World!") */}
            <g className="screen-code-line-2">
              <rect x="28" y="32" width="18" height="3" rx="1.5" fill="#fbbf24" />
              <rect x="49" y="32" width="38" height="3" rx="1.5" fill="#34d399" />
            </g>

            {/* Line 3: return xp + 20 */}
            <g className="screen-code-line-3">
              <rect x="28" y="40" width="24" height="3" rx="1.5" fill="#f472b6" />
              <rect x="55" y="40" width="16" height="3" rx="1.5" fill="#38bdf8" />
              <rect x="74" y="40" width="8" height="3" rx="1.5" fill="#fbbf24" />
            </g>

            {/* Blinking typing cursor */}
            <rect x="85" y="40" width="2.5" height="4" fill="#34d399" className="typing-cursor" />

            {/* Screen Success Celebration Flash Banner */}
            <g className="screen-success-glow">
              <rect x="18" y="50" width="104" height="25" rx="3" fill="#065f46" opacity="0.95" />
              <circle cx="32" cy="62" r="6" fill="#34d399" />
              <path d="M 29 62 L 31 65 L 36 59" fill="none" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
              <text x="43" y="65" fill="#a7f3d0" fontSize="8" fontWeight="bold" fontFamily="monospace">
                100% PASSED!
              </text>
            </g>

            {/* Laptop Base / Keyboard deck */}
            <polygon
              points="0,85 140,85 130,96 10,96"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Glowing Keyboard Trackpad */}
            <rect x="56" y="88" width="28" height="6" rx="2" fill="#94a3b8" />
            <line x1="16" y1="87" x2="124" y2="87" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* 5. DESK SURFACE (Forefront clean modern desk) */}
          <path
            d="M 20 295 L 380 295 C 386 295 390 299 390 305 L 390 316 C 390 318 388 320 385 320 L 15 320 C 12 320 10 318 10 316 L 10 305 C 10 299 14 295 20 295 Z"
            fill="url(#deskGrad)"
            stroke="#fcd34d"
            strokeWidth="1.5"
            filter="url(#softShadow)"
          />
          {/* Desk shadow bevel */}
          <line x1="10" y1="305" x2="390" y2="305" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
        </svg>

        {/* Coder Status Pill at Bottom of Card */}
        <div className="coder-status-pill">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-extrabold text-slate-800">
              Interactive Coding Session
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
            <Zap className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span>Learning in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
