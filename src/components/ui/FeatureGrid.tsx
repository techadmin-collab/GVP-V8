import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import Rich from './Rich';
import Reveal from './Reveal';

export type Feature = { title: string; body: string; icon?: React.ReactNode };

type Props = { items: Feature[]; columns?: 2 | 3 | 4; numbered?: boolean; dark?: boolean };

/** v8 Passport document: each item is an "entry" with a dashed border and a stamp-ring icon. */
export default function FeatureGrid({ items, columns = 3, numbered = false, dark = false }: Props) {
  const ink = dark ? colors.accentLight : colors.primary;
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: `repeat(${columns}, minmax(0, 1fr))` } }}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % columns) * 80} style={{ height: '100%' }}>
          <Box sx={{ height: '100%', p: { xs: 2.5, md: 3 }, borderRadius: '10px', border: `1.5px dashed ${dark ? 'rgba(255,255,255,0.35)' : 'rgb(var(--gvp-primary) / 0.35)'}`, bgcolor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              {item.icon ? (
                <Box sx={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', color: ink, border: `2px solid ${ink}`, boxShadow: `inset 0 0 0 4px ${dark ? colors.base : '#fff'}, inset 0 0 0 5px ${ink}`, transform: `rotate(${i % 2 ? 6 : -6}deg)`, '& svg': { fontSize: 22 } }}>
                  {item.icon}
                </Box>
              ) : (
                <span />
              )}
              {numbered ? <Typography sx={{ fontFamily: fontStacks.mono, fontSize: '0.7rem', letterSpacing: '0.2em', color: ink }}>ENTRY {String(i + 1).padStart(2, '0')}</Typography> : null}
            </Box>
            <Typography variant="h5" component="h3" sx={{ color: dark ? '#fff' : colors.text, mb: 1 }}>{item.title}</Typography>
            <Typography variant="body2" sx={{ color: dark ? 'rgba(255,255,255,0.78)' : colors.muted }}>
              <Rich text={item.body} />
            </Typography>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}
