import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import SecurityPattern from './SecurityPattern';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import Rich from './Rich';

export type Tone = 'light' | 'surface' | 'dark' | 'brand';

/* v8 Passport document: every section is a "visa page" card on the blush background */
const toneStyles: Record<Tone, { page: string; fg: string; muted: string; rule: string }> = {
  light: { page: colors.surface, fg: colors.text, muted: colors.muted, rule: 'rgb(var(--gvp-primary) / 0.3)' },
  surface: { page: '#FFFCFC', fg: colors.text, muted: colors.muted, rule: 'rgb(var(--gvp-primary) / 0.3)' },
  dark: { page: colors.base, fg: '#FFFFFF', muted: 'rgba(255,255,255,0.78)', rule: 'rgba(255,255,255,0.35)' },
  brand: { page: colors.primary, fg: '#FFFFFF', muted: 'rgba(255,255,255,0.8)', rule: 'rgba(255,255,255,0.35)' },
};

export function isDark(tone: Tone) {
  return tone === 'dark' || tone === 'brand';
}

type SectionProps = {
  id?: string;
  tone?: Tone;
  pattern?: boolean;
  py?: { xs: number; md: number } | number;
  children: React.ReactNode;
  ariaLabel?: string;
  narrow?: boolean;
  video?: HeroVideoSource;
};

/** Perforated edge, like the stitched gutter of a passport page. */
const perforation = (dark: boolean) => ({
  height: 10,
  backgroundImage: `radial-gradient(circle, ${dark ? 'rgba(255,255,255,0.35)' : 'rgb(var(--gvp-primary) / 0.25)'} 1.6px, transparent 2px)`,
  backgroundSize: '14px 10px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'center',
});

export default function Section({ id, tone = 'light', pattern = false, py = { xs: 2, md: 3 }, children, ariaLabel, narrow = false, video }: SectionProps) {
  const t = toneStyles[tone];
  const dark = isDark(tone);
  const tint = tone === 'brand' ? '--gvp-primary' : '--gvp-base';
  return (
    <Box component="section" id={id} aria-label={ariaLabel} sx={{ bgcolor: colors.background, py }}>
      <Container maxWidth={narrow ? 'md' : 'lg'}>
        <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: t.page, color: t.fg, borderRadius: '16px', border: dark ? 'none' : `1px solid ${colors.line}` }}>
          {video ? (
            <>
              <HeroVideo {...video} opacity={1} />
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `rgb(var(${tint}) / 0.82)` }} />
            </>
          ) : (
            <SecurityPattern opacity={dark ? 0.07 : pattern ? 0.06 : 0.035} color={dark ? colors.accentLight : colors.primary} lines={20} amplitude={130} />
          )}
          <Box aria-hidden="true" sx={{ position: 'relative', ...perforation(dark) }} />
          <Box sx={{ position: 'relative', px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 4, md: 6 } }}>{children}</Box>
        </Box>
      </Container>
    </Box>
  );
}

type HeadingProps = {
  overline?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  align?: 'left' | 'center';
  maxWidth?: number;
  as?: 'h2' | 'h3';
};

/** Visa-page heading: a monospaced field label with a dashed rule, then a serif title. */
export function SectionHeading({ overline, title, intro, tone = 'light', align = 'left', maxWidth = 780, as = 'h2' }: HeadingProps) {
  const t = toneStyles[tone];
  const dark = isDark(tone);
  return (
    <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth, mx: align === 'center' ? 'auto' : 0, textAlign: align }}>
      {overline ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <Typography component="p" sx={{ fontFamily: fontStacks.mono, fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: dark ? colors.accentLight : colors.primary }}>
            {overline}
          </Typography>
          {align === 'center' ? null : <Box aria-hidden="true" sx={{ flex: 1, maxWidth: 160, borderTop: `1px dashed ${t.rule}` }} />}
        </Box>
      ) : null}
      <Typography variant={as === 'h2' ? 'h2' : 'h3'} component={as} sx={{ color: t.fg }}>
        <Rich text={title} />
      </Typography>
      {intro ? (
        <Typography variant="subtitle1" sx={{ mt: 2, color: t.muted }}>
          <Rich text={intro} />
        </Typography>
      ) : null}
    </Box>
  );
}
