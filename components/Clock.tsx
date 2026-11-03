'use client';

import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
});

export default function Clock() {
  const [t, setT] = useState('--:--');
  useEffect(() => {
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t} IST</span>;
}
