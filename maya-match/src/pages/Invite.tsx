import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Copy, Check, Gift, Send, Mail } from 'lucide-react';
import { Page } from '../components/Layout';
import { Button, Card, Eyebrow, Field, Input, Pill } from '../components/ui';
import { useStore } from '../data/store';

export const Invite: React.FC = () => {
  const { currentMember, sendReferralInvite, referralInvitesForMember } = useStore();
  const [copied, setCopied] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [justSent, setJustSent] = useState<string | null>(null);

  if (!currentMember) return <Navigate to="/request-invitation" replace />;

  const link = `www.mayamatch.com/request-invitation?ref=${currentMember.referralCode}`;
  function copyLink() {
    navigator.clipboard?.writeText(`https://${link}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const sentInvites = referralInvitesForMember(currentMember.id);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = friendName.trim();
    const trimmedEmail = friendEmail.trim();
    if (!trimmedName || !trimmedEmail) return;
    const invite = sendReferralInvite(currentMember!.id, trimmedName, trimmedEmail);
    setJustSent(invite.id);
    setFriendName('');
    setFriendEmail('');
  }

  return (
    <Page>
      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <Eyebrow>Your Maya Invite Link</Eyebrow>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Help Build Your Dating Pool</h1>
        <p className="mt-3 text-ink/60">
          Know a great single person Maya should meet? A stronger, more balanced pool means better matches
          for you and everyone else in {currentMember.region}.
        </p>

        <Card className="mt-9 p-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 truncate rounded-xl border border-ink/10 bg-sand px-4 py-3 font-mono text-sm text-ink/70">
              {link}
            </div>
            <Button onClick={copyLink}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Link'}
            </Button>
          </div>
        </Card>

        <Card className="mt-6 p-8">
          <Eyebrow>Or send it directly</Eyebrow>
          <h2 className="mt-2 font-display text-lg font-semibold text-ink">Invite a friend by name</h2>
          <p className="mt-1 text-sm text-ink/60">
            Tell Maya who to invite — we'll send them a personal invitation with your name on it.
          </p>
          <form onSubmit={handleSend} className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Friend's name" required>
              <Input required value={friendName} onChange={(e) => setFriendName(e.target.value)} placeholder="e.g. Rina Shah" />
            </Field>
            <Field label="Friend's email" required>
              <Input
                required
                type="email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="rina@example.com"
              />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full sm:w-auto">
                <Send size={15} /> Send Invitation
              </Button>
            </div>
          </form>

          {sentInvites.length > 0 && (
            <div className="mt-6 flex flex-col gap-3 border-t border-ink/8 pt-6">
              {sentInvites.map((invite) => (
                <div key={invite.id} className="rounded-2xl bg-sand/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Mail size={14} className="text-maya-amethyst" /> To {invite.friendName}
                    </span>
                    {justSent === invite.id && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-maya-emerald">
                        <Check size={13} /> Sent
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm italic leading-relaxed text-ink/60">"{invite.message}"</p>
                  <p className="mt-2 text-xs text-ink/35">{invite.friendEmail}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card muted className="mt-6 flex items-start gap-4 p-7">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-maya-gold/15 text-maya-gold">
            <Gift size={20} />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">Earn a $20 future credit</h3>
            <p className="mt-1 text-sm text-ink/60">
              After you and your referral each complete an eligible paid Maya Match service purchase valued
              over <strong>$200</strong>, you'll receive a <strong>$20 Maya Match credit</strong> toward a
              future eligible purchase after verification. The credit is not cash back and cannot be
              transferred.
            </p>
          </div>
        </Card>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Card className="p-6 text-center">
            <p className="font-display text-3xl font-semibold text-ink">{currentMember.referredCount}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink/40">Friends Referred</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="font-display text-3xl font-semibold text-ink">${currentMember.referralCreditsEarned}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-ink/40">Credits Earned</p>
          </Card>
        </div>
        <div className="mt-4 flex justify-center">
          <Pill tone="amethyst">Maya tracks referral quality, not just quantity</Pill>
        </div>
      </section>
    </Page>
  );
};
