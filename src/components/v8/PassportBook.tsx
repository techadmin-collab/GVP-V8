'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { colors, fontStacks } from '@/theme/tokens';
import SecurityPattern from '@/components/ui/SecurityPattern';
import InkStamp from './InkStamp';

type Page = { kind: 'intro' | 'step' | 'end'; title: string; body: string; stamp?: { top: string; main: string; bottom: string; shape: 'circle' | 'rect' | 'oval' | 'octagon'; rotate: number } };

const pages: Page[] = [
  { kind: 'intro', title: 'Visas', body: 'Turn the pages to follow one traveller through a GVP border, from application to welcome.' },
  { kind: 'step', title: 'Apply online', body: 'The traveller applies for an ETA before departure and pays a clear, published fee.', stamp: { top: 'ETA', main: 'ISSUED', bottom: 'ONLINE', shape: 'rect', rotate: -9 } },
  { kind: 'step', title: 'Pre-screened', body: 'The application is checked against watchlists and risk rules set by Government.', stamp: { top: 'RULES SET BY', main: 'SCREENED', bottom: 'GOVERNMENT', shape: 'oval', rotate: 7 } },
  { kind: 'step', title: 'Verified at the gate', body: 'A biometric eGate confirms identity in seconds. Officers focus on complex cases.', stamp: { top: 'EGATE', main: 'VERIFIED', bottom: 'BIOMETRIC', shape: 'circle', rotate: -5 } },
  { kind: 'step', title: 'Welcomed', body: 'A faster, more predictable arrival, with destination information from the first click.', stamp: { top: 'ARRIVAL', main: 'WELCOME', bottom: 'ENTRY', shape: 'octagon', rotate: 10 } },
  { kind: 'end', title: 'Entry complete', body: 'Better information for officers, a faster journey for travellers, complete visibility for Government.' },
];

const label = { fontFamily: fontStacks.mono, fontSize: '0.66rem', letterSpacing: '0.22em', color: colors.muted } as const;

function PageFace({ page, n, side }: { page: Page; n: number; side: 'left' | 'right' }) {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#FFFCFC', minHeight: { xs: 340, md: 420 }, p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: side === 'left' ? '14px 0 0 14px' : '0 14px 14px 0' }}>
      <SecurityPattern opacity={0.06} color={colors.primary} lines={18} amplitude={110} centre={0.55} />
      {/* gutter shading */}
      <Box aria-hidden="true" sx={{ position: 'absolute', top: 0, bottom: 0, width: 28, [side === 'left' ? 'right' : 'left']: 0, background: `linear-gradient(${side === 'left' ? '270deg' : '90deg'}, rgb(var(--gvp-base) / 0.12), transparent)` }} />
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={label}>{page.kind === 'step' ? `VISA · STEP ${n}` : 'GVP · BORDER JOURNEY'}</Typography>
        <Typography sx={label}>P.{String(n + 1).padStart(2, '0')}</Typography>
      </Box>
      <Box sx={{ position: 'relative' }}>
        {page.stamp ? (
          <Box sx={{ display: 'flex', justifyContent: side === 'left' ? 'flex-start' : 'flex-end', mb: 3 }}>
            <InkStamp {...page.stamp} size={110} animate />
          </Box>
        ) : null}
        <Typography sx={{ fontFamily: fontStacks.heading, fontSize: { xs: '1.9rem', md: '2.4rem' }, lineHeight: 1.1, color: colors.text }}>{page.title}</Typography>
        <Typography sx={{ mt: 1.5, color: colors.muted, maxWidth: 380 }}>{page.body}</Typography>
      </Box>
    </Box>
  );
}

/** v8: an open passport you page through, two pages per spread, with stamps landing on each visa page. */
export default function PassportBook() {
  const spreads = Math.ceil(pages.length / 2);
  const [s, setS] = React.useState(0);
  const left = pages[s * 2];
  const right = pages[s * 2 + 1];
  return (
    <Box>
      <Box sx={{ p: { xs: 1, md: 1.5 }, bgcolor: colors.base, borderRadius: '20px', boxShadow: '0 40px 70px -40px rgb(var(--gvp-base) / 0.7)' }}>
        <Box key={s} className="gvp8-turn" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 1, md: 0 } }} aria-live="polite">
          <PageFace page={left} n={s * 2} side="left" />
          {right ? <PageFace page={right} n={s * 2 + 1} side="right" /> : null}
        </Box>
      </Box>
      <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Button onClick={() => setS((v) => Math.max(0, v - 1))} disabled={s === 0} startIcon={<ArrowBackRoundedIcon />} variant="outlined" color="primary">
          Previous
        </Button>
        <Typography sx={{ ...label, color: colors.primary }}>
          SPREAD {s + 1} / {spreads}
        </Typography>
        <Button onClick={() => setS((v) => Math.min(spreads - 1, v + 1))} disabled={s === spreads - 1} endIcon={<ArrowForwardRoundedIcon />} variant="contained" color="primary">
          Turn page
        </Button>
      </Box>
    </Box>
  );
}
