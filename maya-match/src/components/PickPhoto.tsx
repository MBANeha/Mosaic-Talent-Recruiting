import React from 'react';
import { Lock } from 'lucide-react';
import type { PickCandidate } from '../types';

type Variant = 'card' | 'circle' | 'thumb';

const SHAPE: Record<Variant, string> = {
  card: 'h-36 w-full',
  circle: 'h-12 w-12 rounded-full shrink-0',
  thumb: 'h-14 w-14 rounded-2xl shrink-0',
};

/**
 * Stand-in "photo" for a curated profile: a jewel-toned portrait silhouette.
 * `blurred` simulates face-blur privacy on the member-facing app; admin views pass `blurred={false}`
 * to show the clear photo the backend has on file.
 */
export const PickPhoto: React.FC<{ pick: PickCandidate; blurred: boolean; variant?: Variant; className?: string }> = ({
  pick,
  blurred,
  variant = 'card',
  className = '',
}) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${pick.photoGradient} ${SHAPE[variant]} ${className}`}>
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full transition-all duration-300 ${blurred ? 'scale-110 blur-md' : ''}`}
    >
      <ellipse cx="50" cy="114" rx="46" ry="34" fill="rgba(255,255,255,0.32)" />
      <circle cx="50" cy="52" r="26" fill="rgba(255,255,255,0.42)" />
    </svg>
    {blurred && variant === 'card' && (
      <span className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
        <Lock size={10} /> Face blurred
      </span>
    )}
  </div>
);
