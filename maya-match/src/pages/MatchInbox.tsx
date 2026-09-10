import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Mic, Square, Lock } from 'lucide-react';
import { Page } from '../components/Layout';
import { Card } from '../components/ui';
import { PickPhoto } from '../components/PickPhoto';
import { ProfilesGate } from '../components/ProfilesGate';
import { useStore } from '../data/store';

const MAX_RECORD_SECONDS = 30;

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const MatchInbox: React.FC = () => {
  const { dateId } = useParams();
  const { currentMember, db, pickById, ensureInboxOpened, sendTextMessage, sendAudioMessage, messagesForDate } =
    useStore();

  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [micError, setMicError] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const secRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const date = db.scheduledDates.find((d) => d.id === dateId);

  useEffect(() => {
    if (dateId && date?.mutual) ensureInboxOpened(dateId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateId, date?.mutual]);

  const messages = dateId ? messagesForDate(dateId) : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length]);

  useEffect(
    () => () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    },
    []
  );

  if (!currentMember) return <Navigate to="/request-invitation" replace />;
  if (!date || !date.mutual) return <Navigate to="/matches" replace />;
  const pick = pickById(date.pickId);
  if (!pick) return <Navigate to="/matches" replace />;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !dateId) return;
    sendTextMessage(dateId, trimmed);
    setText('');
  }

  async function startRecording() {
    setMicError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      secRef.current = 0;
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (dateId && secRef.current > 0) {
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
          const dataUrl = await blobToDataUrl(blob);
          sendAudioMessage(dateId, dataUrl, secRef.current);
        }
        setRecordSeconds(0);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      intervalRef.current = window.setInterval(() => {
        secRef.current += 1;
        setRecordSeconds(secRef.current);
        if (secRef.current >= MAX_RECORD_SECONDS) stopRecording();
      }, 1000);
    } catch {
      setMicError('Microphone access is needed to record a voice note.');
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setRecording(false);
  }

  return (
    <Page>
      <ProfilesGate member={currentMember}>
        <section className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
          <Link to="/matches" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/50 hover:text-ink">
            <ArrowLeft size={15} /> Mutual Matches
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <PickPhoto pick={pick} blurred={false} variant="circle" />
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink">{pick.firstName}</h1>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-maya-emerald">
                <Lock size={11} /> Maya Match Inbox — unlocked
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-ink/40">
            Messages and voice notes only, inside Maya. Phone numbers and video calls are still up to the two
            of you, whenever you're ready.
          </p>

          <Card className="mt-6 flex max-h-[50vh] min-h-[280px] flex-col gap-3 overflow-y-auto p-5">
            {messages.length === 0 && (
              <p className="m-auto text-sm text-ink/40">Say hi to {pick.firstName} — Maya's already introduced you.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'member' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.sender === 'member'
                      ? 'rounded-br-sm bg-gradient-to-br from-maya-amethyst to-maya-ruby text-white'
                      : 'rounded-bl-sm border border-ink/8 bg-sand text-ink'
                  }`}
                >
                  {m.kind === 'text' ? (
                    <p className="leading-relaxed">{m.text}</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <div
                        className={`flex items-center gap-1.5 text-xs font-medium ${
                          m.sender === 'member' ? 'text-white/80' : 'text-ink/50'
                        }`}
                      >
                        <Mic size={12} /> Voice note · {formatClock(m.audioDurationSec ?? 0)}
                      </div>
                      <audio controls src={m.audioDataUrl} className="h-9 w-56 max-w-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </Card>

          {micError && <p className="mt-3 text-center text-xs font-medium text-maya-ruby">{micError}</p>}

          <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
            {recording ? (
              <div className="flex flex-1 items-center gap-3 rounded-full bg-maya-ruby/10 px-4 py-2.5 text-sm font-medium text-maya-rubyDark">
                <span className="h-2 w-2 animate-pulse rounded-full bg-maya-ruby" />
                Recording… {formatClock(recordSeconds)}
                <button
                  type="button"
                  onClick={stopRecording}
                  className="ml-auto flex items-center gap-1 rounded-full bg-maya-ruby px-3 py-1 text-xs font-semibold text-white"
                >
                  <Square size={11} /> Stop &amp; Send
                </button>
              </div>
            ) : (
              <>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Message ${pick.firstName}…`}
                  className="flex-1 rounded-full border border-ink/12 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-maya-amethyst focus:outline-none focus:ring-2 focus:ring-maya-amethyst/20"
                />
                <button
                  type="button"
                  onClick={startRecording}
                  aria-label="Record a voice note"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/60 transition hover:border-maya-amethyst hover:text-maya-amethyst"
                >
                  <Mic size={16} />
                </button>
                <button
                  type="submit"
                  disabled={!text.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-maya-amethyst to-maya-ruby text-white transition disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </>
            )}
          </form>
        </section>
      </ProfilesGate>
    </Page>
  );
};
