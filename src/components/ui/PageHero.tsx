import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { colors, fontStacks } from '@/theme/tokens';
import { siteConfig } from '@/lib/site';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import MrzStrip from './MrzStrip';
import SecurityPattern from './SecurityPattern';
import LogoMark from './LogoMark';
import Rich from './Rich';

type Props = {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  note?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  asideOnMobile?: boolean;
  asideWidth?: { md: number; lg: number };
  image?: string;
  video?: HeroVideoSource;
  size?: 'large' | 'standard';
  tone?: 'dark' | 'light';
  videoTint?: 'brand' | 'neutral';
};

const fieldLabel = { fontFamily: fontStacks.mono, fontSize: '0.66rem', letterSpacing: '0.22em', color: colors.muted, textTransform: 'uppercase' } as const;

/**
 * v8 Passport document hero: the page is a passport "data page" card, with
 * a photo panel (artwork, video or the GVP mark), labelled fields and a
 * machine-readable zone along the bottom edge.
 */
export default function PageHero({ overline, title, subtitle, note, actions, aside, video, size = 'standard' }: Props) {
  const large = size === 'large';
  return (
    <Box component="header" sx={{ bgcolor: colors.background, py: large ? { xs: 4, md: 7 } : { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box className="gvp-hero-in" sx={{ position: 'relative', overflow: 'hidden', bgcolor: colors.surface, borderRadius: '16px', border: `1px solid ${colors.line}`, boxShadow: '0 30px 60px -40px rgb(var(--gvp-base) / 0.55)' }}>
          <SecurityPattern opacity={0.06} color={colors.primary} lines={26} amplitude={150} centre={0.45} />
          <Box sx={{ position: 'relative', m: { xs: 1.25, md: 1.75 }, border: `1px dashed rgb(var(--gvp-primary) / 0.35)`, borderRadius: '10px', p: { xs: 2.5, sm: 4, md: 5 } }}>
            {/* document header row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: { xs: 3, md: 4 } }}>
              <Typography sx={{ ...fieldLabel, color: colors.primary }}>{siteConfig.nameLine}</Typography>
              <Typography sx={{ ...fieldLabel, color: colors.primary, display: { xs: 'none', sm: 'block' } }}>Type P · ARE</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: large ? '5fr 7fr' : '3fr 9fr' }, gap: { xs: 4, md: 6 }, alignItems: 'start' }}>
              {/* photo panel */}
              <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '10px', bgcolor: aside ? colors.background : colors.base, aspectRatio: large ? undefined : '4 / 5', minHeight: large ? 320 : undefined, display: 'grid', placeItems: 'center', p: aside ? { xs: 2, md: 2.5 } : 2 }}>
                {video && !aside ? <HeroVideo {...video} opacity={1} /> : null}
                {aside ? <Box sx={{ position: 'relative', width: '100%' }}>{aside}</Box> : video ? null : <LogoMark color="#FFFFFF" height={36} />}
              </Box>

              {/* fields */}
              <Box>
                <Typography component="p" sx={fieldLabel}>Document / {overline}</Typography>
                <Typography variant="h1" component="h1" sx={{ mt: 1, color: colors.text, fontSize: large ? undefined : { xs: '2.2rem', md: '2.9rem' } }}>
                  {title}
                </Typography>
                {subtitle ? (
                  <>
                    <Typography component="p" sx={{ ...fieldLabel, mt: 3.5 }}>Particulars</Typography>
                    <Typography variant="subtitle1" component="p" sx={{ mt: 0.75, color: colors.text, maxWidth: 680 }}>
                      <Rich text={subtitle} />
                    </Typography>
                  </>
                ) : null}
                {note ? (
                  <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '140px 1fr' }, gap: 1, py: 1.5, borderTop: `1px dashed ${colors.line}`, borderBottom: `1px dashed ${colors.line}` }}>
                    <Typography sx={fieldLabel}>Funding</Typography>
                    <Typography sx={{ color: colors.primary, fontWeight: 600 }}>{note}</Typography>
                  </Box>
                ) : null}
                {actions ? (
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
                    {actions}
                  </Stack>
                ) : null}
              </Box>
            </Box>
          </Box>
          {/* machine-readable zone */}
          <Box sx={{ position: 'relative', bgcolor: 'rgb(var(--gvp-primary) / 0.05)', borderTop: `1px solid ${colors.line}`, px: { xs: 2.5, md: 4 }, py: 1.5 }}>
            <MrzStrip color="rgb(var(--gvp-primary) / 0.55)" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
