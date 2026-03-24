// All sounds generated with Web Audio API — no files needed!

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Coin/stamp collection — like a Mario coin
export function playStampSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'square';
  osc.frequency.setValueAtTime(988, ctx.currentTime); // B5
  osc.frequency.setValueAtTime(1319, ctx.currentTime + 0.08); // E6

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

// Uncollect — descending tone
export function playUncollectSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

// Mission tap — bubbly pop
export function playMissionSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);
  osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

// Mission complete — triumphant two-note chime
export function playMissionCompleteSound() {
  const ctx = getCtx();
  // First note — bright ping
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(784, ctx.currentTime); // G5
  gain1.gain.setValueAtTime(0.12, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.15);

  // Second note — higher resolution
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(1047, ctx.currentTime + 0.12); // C6
  gain2.gain.setValueAtTime(0, ctx.currentTime);
  gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.12);
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
  osc2.start(ctx.currentTime + 0.12);
  osc2.stop(ctx.currentTime + 0.45);

  // Shimmery overtone
  const osc3 = ctx.createOscillator();
  const gain3 = ctx.createGain();
  osc3.connect(gain3);
  gain3.connect(ctx.destination);
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(2093, ctx.currentTime + 0.12); // C7
  gain3.gain.setValueAtTime(0, ctx.currentTime);
  gain3.gain.setValueAtTime(0.05, ctx.currentTime + 0.12);
  gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
  osc3.start(ctx.currentTime + 0.12);
  osc3.stop(ctx.currentTime + 0.4);
}

// Day complete — bigger fanfare, 3 rising chords
export function playDayCompleteSound() {
  const ctx = getCtx();
  const chords = [
    [523, 659, 784],    // C major
    [587, 740, 880],    // D major
    [659, 831, 988],    // E major
  ];
  const timing = [0, 0.2, 0.4];

  chords.forEach((chord, ci) => {
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timing[ci]);

      gain.gain.setValueAtTime(0, ctx.currentTime + timing[ci]);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + timing[ci] + 0.02);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + timing[ci] + (ci === 2 ? 0.5 : 0.15));
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + timing[ci] + (ci === 2 ? 0.8 : 0.19));

      osc.start(ctx.currentTime + timing[ci]);
      osc.stop(ctx.currentTime + timing[ci] + (ci === 2 ? 0.8 : 0.2));
    });
  });
}

// Victory fanfare — all stamps collected!
export function playVictoryFanfare() {
  const ctx = getCtx();
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  const timing = [0, 0.15, 0.3, 0.45];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + timing[i]);

    gain.gain.setValueAtTime(0, ctx.currentTime + timing[i]);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + timing[i] + 0.02);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + timing[i] + (i === 3 ? 0.4 : 0.12));
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + timing[i] + (i === 3 ? 0.8 : 0.14));

    osc.start(ctx.currentTime + timing[i]);
    osc.stop(ctx.currentTime + timing[i] + (i === 3 ? 0.8 : 0.15));
  });
}

// Packing checklist — satisfying click/tick
export function playCheckSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

// Uncheck — soft low pop
export function playUncheckSound() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

// Map marker tap — different sound per stop
export function playMapSound(index: number) {
  const ctx = getCtx();
  const sounds: Array<() => void> = [
    // Home — doorbell
    () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
    },
    // Vineyard — gentle harp-like
    () => {
      [523, 659, 784].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);
        osc.start(ctx.currentTime + i * 0.1); osc.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    },
    // Goat — baa sound (filtered noise burst)
    () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.35);
    },
    // Ocean — whoosh
    () => {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.2);
      filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.5);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      source.start(ctx.currentTime); source.stop(ctx.currentTime + 0.5);
    },
    // Castle/Resort — regal trumpet
    () => {
      [523, 659, 784, 1047].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.2);
        osc.start(ctx.currentTime + i * 0.12); osc.stop(ctx.currentTime + i * 0.12 + 0.2);
      });
    },
  ];

  const idx = Math.min(index, sounds.length - 1);
  sounds[idx]();
}
