'use client'

import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { RSVPFormData, rsvpSchema } from '@/lib/schemas';
import FloralDivider from './FloralDivider';

export default function RSVPSection() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [choice, setChoice] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number | null>(null);
  const [guestNames, setGuestNames] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  function updateGuestName(i: number, val: string) {
    const arr = [...guestNames];
    arr[i] = val;
    setGuestNames(arr);
  }

  async function submit() {
    setError('');
    if (!name.trim()) { setError(t('rsvpName') as string); return; }
    if (!choice) { setError(t('rsvpCome') as string); return; }

    setSubmitting(true);

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      choice,
      guestCount: choice === 'with' ? guestCount : null,
      guestNames: choice === 'with' ? guestNames.slice(0, guestCount || 0).map(s => s || '') : [],
    };

    try {
      // Try real backend
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          attendance: payload.choice,
          guestsCount: payload.guestCount,
          guestNames: payload.guestNames,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        setDone(true);
      } else {
        setError(result.error || 'Submission failed');
      }
    } catch (e: any) {
      setError(String(e.message || e));
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="px-6 py-6">
        <div className="fade-in text-center px-3 py-6">
          <FloralDivider width={200} />
          <div
            className="mt-[14px] mb-1.5"
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: 32,
              color: 'var(--accent2)'
            }}
          >
            {t('rsvpThanks') as string}
          </div>
          <div style={{ fontSize: 13, color: 'var(--sub)', fontFamily: 'Jost' }}>
            {t('rsvpAccepted') as string}
          </div>
        </div>
      </section>
    );
  }

  const inputStyle = {
    width: '100%',
    height: 46,
    border: '0.5px solid var(--border)',
    borderRadius: 8,
    padding: '0 14px',
    fontSize: 14,
    color: 'var(--text)',
    background: 'var(--card)',
    transition: 'border-color 0.15s',
    fontFamily: 'Jost',
    outline: 'none',
  };

  return (
    <section className="px-6 py-6">
      <div
        className="text-center mb-[14px]"
        style={{
          fontFamily: 'Cormorant Garamond',
          fontSize: 23,
          color: 'var(--text)'
        }}
      >
        {t('rsvpTitle') as string}
      </div>

      <div className="flex flex-col gap-2.5 mx-auto max-w-md">
        <input
          type="text"
          placeholder={t('rsvpName') as string}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <div className="flex flex-col gap-1.5">
          {[['come', t('rsvpCome') as string], ['with', t('rsvpWith') as string], ['no', t('rsvpNo') as string]].map(([v, label]) => (
            <div
              key={v}
              onClick={() => {
                setChoice(v);
                if (v !== 'with') { setGuestCount(null); setGuestNames([]); }
              }}
              className="flex items-center gap-2.5 p-3 rounded-lg cursor-pointer transition-all duration-150"
              style={{
                border: `0.5px solid ${choice === v ? 'var(--accent)' : 'var(--border)'}`,
                background: choice === v ? 'rgba(243, 195, 178, 0.13)' : 'transparent'
              }}
            >
              <div
                className="w-[18px] h-[18px] rounded-full shrink-0 flex items-center justify-center transition-all duration-150"
                style={{
                  border: `1.5px solid ${choice === v ? 'var(--accent)' : 'var(--border)'}`,
                  background: choice === v ? 'var(--accent)' : 'transparent'
                }}
              >
                {choice === v && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
              </div>
              <span style={{ fontSize: 14, color: 'var(--text)', fontFamily: 'Jost' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {choice === 'with' && (
          <div className="fade-in">
            <div
              className="mb-2"
              style={{ fontSize: 12, color: 'var(--sub)', fontFamily: 'Jost', letterSpacing: '0.3px' }}
            >
              {t('rsvpGuests') as string}
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(n => (
                <div
                  key={n}
                  onClick={() => {
                    setGuestCount(n);
                    setGuestNames(prev => Array.from({ length: n }, (_, i) => prev[i] || ''));
                  }}
                  className="flex-1 h-[42px] rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center"
                  style={{
                    border: `0.5px solid ${guestCount === n ? 'var(--accent)' : 'var(--border)'}`,
                    background: guestCount === n ? 'var(--accent)' : 'transparent',
                    fontSize: 15,
                    fontWeight: 600,
                    color: guestCount === n ? '#FFFFFF' : 'var(--text)'
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {choice === 'with' && guestCount && (
          <div className="fade-in flex flex-col gap-1.5">
            {Array.from({ length: guestCount }, (_, i) => (
              <input
                key={i}
                type="text"
                placeholder={`${t('rsvpGuest') as string} ${i + 1}`}
                value={guestNames[i] || ''}
                onChange={(e) => updateGuestName(i, e.target.value)}
                style={{ ...inputStyle, height: 40, fontSize: 13 }}
              />
            ))}
          </div>
        )}

        {error && (
          <div
            className="text-center"
            style={{ fontSize: 12, color: '#B85040', fontFamily: 'Jost' }}
          >
            {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={submitting}
          className="mt-1 transition-opacity duration-150"
          style={{
            background: 'var(--btn)',
            color: 'var(--btnText)',
            border: 'none',
            borderRadius: 8,
            padding: 15,
            cursor: submitting ? 'wait' : 'pointer',
            fontSize: 13,
            letterSpacing: 2,
            fontFamily: 'Jost',
            fontWeight: 500,
            opacity: submitting ? 0.6 : 1
          }}
        >
          {submitting ? '...' : t('rsvpSubmit') as string}
        </button>
      </div>
    </section>
  );
}