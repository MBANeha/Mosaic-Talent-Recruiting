import React, { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Button, Card, Field, Input } from './ui';
import { useStore } from '../data/store';
import { isProfilesUnlocked, markProfilesUnlocked } from '../data/unlock';
import type { Member } from '../types';

/**
 * Gates the member-facing profile-browsing screens (Picks, Dates, Matches, Feedback) behind a
 * password the member sets the first time they reach their curated profiles. The password lives
 * on the member record (the shared store); whether *this browser* has unlocked it this session
 * is tracked separately so returning members are asked again next time, like a real privacy lock.
 */
export const ProfilesGate: React.FC<{ member: Member; children: React.ReactNode }> = ({ member, children }) => {
  const { setDreamDatesPassword } = useStore();
  const [unlocked, setUnlockedState] = useState(() => isProfilesUnlocked(member.id));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (unlocked) return <>{children}</>;

  const hasPassword = !!member.dreamDatesPassword;

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 4) {
      setError('Use at least 4 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setDreamDatesPassword(member.id, password);
    markProfilesUnlocked(member.id);
    setUnlockedState(true);
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (password !== member.dreamDatesPassword) {
      setError('Incorrect password.');
      return;
    }
    markProfilesUnlocked(member.id);
    setUnlockedState(true);
  }

  return (
    <section className="mx-auto max-w-md px-5 py-20 text-center sm:px-8">
      <div
        className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-white ${
          hasPassword ? 'bg-ink/80' : 'bg-gradient-to-br from-maya-amethyst to-maya-ruby'
        }`}
      >
        {hasPassword ? <Lock size={22} /> : <ShieldCheck size={22} />}
      </div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        {hasPassword ? 'Enter Your Dream Dates Password' : 'Protect Your Maya Picks'}
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink/60">
        {hasPassword
          ? "Your curated profiles are private — verify it's you before Maya shows them."
          : 'Every profile Maya shows you is private. Set a password now so only you can open them — Maya will ask again each time you return.'}
      </p>

      <Card className="mt-7 p-6 text-left">
        <form onSubmit={hasPassword ? handleUnlock : handleCreate} className="flex flex-col gap-4">
          <Field label={hasPassword ? 'Password' : 'Create a password'}>
            <Input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
          </Field>
          {!hasPassword && (
            <Field label="Confirm password">
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
              />
            </Field>
          )}
          {error && <p className="text-xs font-medium text-maya-ruby">{error}</p>}
          <Button type="submit" className="w-full">
            {hasPassword ? 'Unlock My Profiles' : 'Secure My Profiles'}
          </Button>
        </form>
      </Card>
    </section>
  );
};
