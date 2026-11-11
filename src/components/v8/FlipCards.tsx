'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import { faqs } from '@/lib/faqs';

const label = { fontFamily: fontStacks.mono, fontSize: '0.66rem', letterSpacing: '0.22em' } as const;

/** v8: "interview cards". Each card shows a question; flip it to read the answer on the back. */
export default function FlipCards() {
  const items = faqs.slice(0, 6);
  const [open, setOpen] = React.useState<Record<number, boolean>>({});
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' } }}>
      {items.map((f, i) => {
        const flipped = Boolean(open[i]);
        return (
          <ButtonBase
            key={f.q}
            onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
            aria-pressed={flipped}
            aria-label={flipped ? `${f.q} Answer: ${f.a}` : `${f.q} Show answer`}
            sx={{ display: 'block', textAlign: 'left', perspective: '1200px', borderRadius: '14px', minHeight: 250 }}
          >
            <Box component="span" sx={{ display: 'block', position: 'relative', width: '100%', minHeight: 250, transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              {/* front: question */}
              <Box component="span" sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', borderRadius: '14px', bgcolor: colors.surface, border: `1.5px dashed rgb(var(--gvp-primary) / 0.4)`, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography component="span" sx={{ display: 'block', ...label, color: colors.primary }}>OFFICER&apos;S QUESTION {String(i + 1).padStart(2, '0')}</Typography>
                <Typography component="span" sx={{ display: 'block', fontFamily: fontStacks.heading, fontSize: '1.45rem', lineHeight: 1.2, color: colors.text }}>{f.q}</Typography>
                <Typography component="span" sx={{ display: 'block', ...label, color: colors.muted }}>TAP TO TURN ↻</Typography>
              </Box>
              {/* back: answer */}
              <Box component="span" sx={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: '14px', bgcolor: colors.primary, color: '#fff', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'auto' }}>
                <Typography component="span" sx={{ display: 'block', ...label, color: colors.accentLight }}>ANSWER</Typography>
                <Typography component="span" sx={{ display: 'block', fontSize: '0.98rem', lineHeight: 1.6 }}>{f.a}</Typography>
                <Typography component="span" sx={{ display: 'block', ...label, color: 'rgba(255,255,255,0.7)' }}>TAP TO TURN BACK ↻</Typography>
              </Box>
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
