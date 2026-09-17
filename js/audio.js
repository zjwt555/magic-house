/* ============ 音效模块：WebAudio 合成音 + 中文语音夸奖 ============
   iOS 需要用户手势后才能出声，首次触摸时解锁 AudioContext。 */
(function () {
  'use strict';

  let ctx = null;
  let unlocked = false;

  function ensureCtx() {
    if (!window.AudioContext && !window.webkitAudioContext) return null;
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // 首次任意触摸即解锁
  function unlock() {
    if (unlocked) return;
    unlocked = true;
    ensureCtx();
  }
  document.addEventListener('touchstart', unlock, { passive: true });
  document.addEventListener('pointerdown', unlock, { passive: true });

  /* 基础音：某个频率、时长、波形、音量的音符 */
  function tone(freq, start, dur, { type = 'sine', vol = 0.22, slide = 0 } = {}) {
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + start;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /* 噪声脉冲（咀嚼/翻炒等） */
  function noise(start, dur, vol = 0.15) {
    const c = ensureCtx();
    if (!c) return;
    const t0 = c.currentTime + start;
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource();
    src.buffer = buf;
    const gain = c.createGain();
    gain.gain.value = vol;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 900;
    src.connect(filter).connect(gain).connect(c.destination);
    src.start(t0);
  }

  const N = { // 音名→频率
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, C6: 1046.5
  };

  const muted = () => !!(window.Store && window.Store.state && Store.state.sound === false);

  const Sound = {
    /* 点击/拿起物品：轻快泡泡音 */
    pop() {
      if (muted()) return;
      tone(520, 0, 0.09, { type: 'sine', vol: 0.2, slide: 260 });
    },
    /* 穿上衣服/选中：叮 */
    chime() {
      if (muted()) return;
      tone(N.E5, 0, 0.16, { type: 'triangle', vol: 0.22 });
      tone(N.G5, 0.07, 0.22, { type: 'triangle', vol: 0.18 });
    },
    /* 闪光庆祝：上行琶音 */
    sparkle() {
      if (muted()) return;
      [N.C5, N.E5, N.G5, N.C6].forEach((f, i) =>
        tone(f, i * 0.07, 0.18, { type: 'triangle', vol: 0.16 }));
    },
    /* 放置家具：咚 */
    thud() {
      if (muted()) return;
      tone(180, 0, 0.12, { type: 'sine', vol: 0.25, slide: -60 });
      noise(0, 0.05, 0.05);
    },
    /* 收走物品：嗖+泡泡 */
    poof() {
      if (muted()) return;
      tone(700, 0, 0.14, { type: 'sine', vol: 0.15, slide: -420 });
      noise(0, 0.1, 0.08);
    },
    /* 搅拌：咕嘟 */
    stir() {
      if (muted()) return;
      tone(240 + Math.random() * 80, 0, 0.1, { type: 'sine', vol: 0.12, slide: 90 });
      noise(0, 0.08, 0.05);
    },
    /* 吃东西：咀嚼 */
    munch() {
      if (muted()) return;
      noise(0, 0.09, 0.2);
      noise(0.16, 0.09, 0.16);
      tone(340, 0.3, 0.08, { type: 'sine', vol: 0.1 });
    },
    /* 大功告成：小号角旋律 */
    fanfare() {
      if (muted()) return;
      const seq = [[N.C5, 0], [N.E5, 0.12], [N.G5, 0.24], [N.C6, 0.4]];
      seq.forEach(([f, t]) => tone(f, t, 0.28, { type: 'triangle', vol: 0.2 }));
      tone(N.G5, 0.62, 0.5, { type: 'sine', vol: 0.12 });
    },
    /* 门/切换：吱呀开门 */
    door() {
      if (muted()) return;
      tone(300, 0, 0.18, { type: 'sawtooth', vol: 0.06, slide: 160 });
      tone(N.C5, 0.14, 0.2, { type: 'triangle', vol: 0.15 });
    },

    /* 中文语音夸奖（TTS 可用才说，不可用静默） */
    praise(text) {
      try {
        if (!window.speechSynthesis || !Store.state.sound) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        u.rate = 0.95;
        u.pitch = 1.25;
        u.volume = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      } catch (e) { /* 静默降级 */ }
    },
    praiseRandom(arr) {
      this.praise(arr[Math.floor(Math.random() * arr.length)]);
    }
  };

  window.Sound = Sound;
})();
