import React from 'react';

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-maya-amethyst disabled:opacity-40 disabled:pointer-events-none';
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-maya-amethyst to-maya-ruby text-white shadow-jewel hover:brightness-110 active:brightness-95',
    secondary: 'bg-white text-ink border border-ink/10 shadow-soft hover:border-ink/20',
    outline: 'border-2 border-maya-amethyst text-maya-amethyst hover:bg-maya-amethyst/5',
    ghost: 'text-ink/70 hover:text-ink hover:bg-ink/5',
    dark: 'bg-ink text-cream hover:bg-plum',
  };
  const sizes: Record<string, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-7 text-[0.95rem]',
    lg: 'h-14 px-9 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { muted?: boolean }> = ({
  children,
  className = '',
  muted,
  ...props
}) => (
  <div
    className={`rounded-3xl ${muted ? 'bg-sand/70' : 'bg-white'} border border-ink/5 shadow-soft ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.25em] text-maya-amethyst ${className}`}>{children}</p>
);

const pillTones: Record<string, string> = {
  amethyst: 'bg-maya-amethyst/10 text-maya-amethystDark',
  sapphire: 'bg-maya-sapphire/10 text-maya-sapphireDark',
  ruby: 'bg-maya-ruby/10 text-maya-rubyDark',
  gold: 'bg-maya-gold/15 text-[#8a651f]',
  emerald: 'bg-maya-emerald/10 text-maya-emerald',
  neutral: 'bg-ink/5 text-ink/60',
  red: 'bg-red-100 text-red-700',
};

export const Pill: React.FC<{ tone?: keyof typeof pillTones; children: React.ReactNode; className?: string; dot?: boolean }> = ({
  tone = 'neutral',
  children,
  className = '',
  dot,
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${pillTones[tone]} ${className}`}
  >
    {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {children}
  </span>
);

export function poolStatusTone(status: string): keyof typeof pillTones {
  switch (status) {
    case 'ACTIVE':
      return 'emerald';
    case 'READY':
      return 'sapphire';
    case 'GROWING':
    case 'BUILDING':
      return 'amethyst';
    default:
      return 'red';
  }
}

export const ProgressBar: React.FC<{ value: number; className?: string; gradient?: boolean }> = ({
  value,
  className = '',
  gradient = true,
}) => (
  <div className={`h-2.5 w-full overflow-hidden rounded-full bg-ink/8 ${className}`}>
    <div
      className={`h-full rounded-full transition-all duration-700 ease-out ${
        gradient ? 'bg-gradient-to-r from-maya-amethyst via-maya-sapphire to-maya-ruby' : 'bg-maya-amethyst'
      }`}
      style={{ width: `${Math.max(4, value)}%` }}
    />
  </div>
);

export const StepDots: React.FC<{ steps: string[]; activeIndex: number }> = ({ steps, activeIndex }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
    {steps.map((step, i) => (
      <React.Fragment key={step}>
        <div className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
              i <= activeIndex ? 'bg-maya-amethyst text-white' : 'bg-ink/8 text-ink/40'
            }`}
          >
            {i + 1}
          </span>
          <span className={`text-sm font-medium ${i <= activeIndex ? 'text-ink' : 'text-ink/40'}`}>{step}</span>
        </div>
        {i < steps.length - 1 && <span className="h-px w-5 bg-ink/15" />}
      </React.Fragment>
    ))}
  </div>
);

export const Field: React.FC<{
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ label, hint, required, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 flex items-baseline justify-between">
      <span className="text-sm font-semibold text-ink/80">
        {label}
        {required && <span className="text-maya-ruby"> *</span>}
      </span>
      {hint && <span className="text-xs text-ink/40">{hint}</span>}
    </span>
    {children}
  </label>
);

const inputBase =
  'w-full rounded-xl border border-ink/12 bg-white px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-ink/35 transition focus:border-maya-amethyst focus:outline-none focus:ring-2 focus:ring-maya-amethyst/20';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input className={`${inputBase} ${className}`} {...props} />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea className={`${inputBase} min-h-[90px] resize-y ${className}`} {...props} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...props }) => (
  <select className={`${inputBase} appearance-none bg-white ${className}`} {...props}>
    {children}
  </select>
);

export const CheckboxRow: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}> = ({ checked, onChange, children }) => (
  <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/75">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-4 w-4 rounded border-ink/25 text-maya-amethyst focus:ring-maya-amethyst"
    />
    <span>{children}</span>
  </label>
);
