'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * v8 "system film": the border management explainer, framed like a
 * document page. It is silent, so it plays by itself, muted and looping,
 * while on screen (reduced-motion users see the poster).
 */
export default function SystemFilm({ src, poster }: { src: string; poster: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          v.play().catch(() => undefined);
        } else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box sx={{ position: 'relative', bgcolor: '#1A0810', borderRadius: '14px', p: { xs: 1, md: 1.5 }, boxShadow: '0 40px 80px -40px rgb(119 23 59 / 0.6)', border: `1px solid ${colors.line}` }}>
        <Box sx={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16 / 9', bgcolor: '#1A0810' }}>
          <video
            ref={ref}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Thirty-second film: how the border management system clears a traveller"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>
      <Typography component="figcaption" sx={{ mt: 1.5, fontFamily: fontStacks.mono, fontSize: '0.75rem', letterSpacing: '0.04em', color: colors.muted }}>
        e-Visa and permits · e-Passport and biometrics · Watchlist and risk alerts
      </Typography>
    </Box>
  );
}
