import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { colors, fontStacks } from '@/theme/tokens';
import { ButtonLink } from './links';

export type CtaAction = { label: string; href: string };

type Props = { title: string; body?: string; actions: CtaAction[] };

const label = { fontFamily: fontStacks.mono, fontSize: '0.66rem', letterSpacing: '0.22em', color: colors.muted } as const;

/** v8 Passport document: a boarding-pass style ticket with a perforated stub holding the action. */
export default function CtaBanner({ title, body, actions }: Props) {
  return (
    <Box component="section" aria-label="Next step" sx={{ bgcolor: colors.background, py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 340px' }, bgcolor: colors.surface, borderRadius: '16px', border: `1px solid ${colors.line}`, boxShadow: '0 30px 60px -42px rgb(var(--gvp-base) / 0.55)', position: 'relative' }}>
          <Box sx={{ p: { xs: 3, sm: 4.5, md: 6 } }}>
            <Typography sx={{ ...label, color: colors.primary }}>BOARDING · GOVERNMENT BRIEFING</Typography>
            <Typography variant="h2" component="h2" sx={{ mt: 1.5, color: colors.text }}>{title}</Typography>
            {body ? <Typography variant="subtitle1" sx={{ mt: 1.5, color: colors.muted }}>{body}</Typography> : null}
          </Box>
          {/* stub */}
          <Box sx={{ position: 'relative', p: { xs: 3, md: 4.5 }, borderTop: { xs: `2px dashed ${colors.line}`, md: 'none' }, borderLeft: { md: `2px dashed rgb(var(--gvp-primary) / 0.3)` }, bgcolor: 'rgb(var(--gvp-primary) / 0.04)', borderRadius: { xs: '0 0 16px 16px', md: '0 16px 16px 0' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
            {/* punched notches on the perforation (desktop) */}
            <Box aria-hidden="true" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', left: -13, top: -13, width: 24, height: 24, borderRadius: '50%', bgcolor: colors.background, border: `1px solid ${colors.line}` }} />
            <Box aria-hidden="true" sx={{ display: { xs: 'none', md: 'block' }, position: 'absolute', left: -13, bottom: -13, width: 24, height: 24, borderRadius: '50%', bgcolor: colors.background, border: `1px solid ${colors.line}` }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Box>
                <Typography sx={label}>GATE</Typography>
                <Typography sx={{ fontFamily: fontStacks.mono, fontWeight: 600, color: colors.text }}>BRIEFING</Typography>
              </Box>
              <Box>
                <Typography sx={label}>CLASS</Typography>
                <Typography sx={{ fontFamily: fontStacks.mono, fontWeight: 600, color: colors.text }}>OFFICIAL</Typography>
              </Box>
            </Box>
            <Stack spacing={1.5}>
              {actions.map((a, i) => (
                <ButtonLink key={a.label} href={a.href} size="large" color="primary" fullWidth variant={i === 0 ? 'contained' : 'outlined'} endIcon={i === 0 ? <ArrowForwardRoundedIcon /> : undefined}>
                  {a.label}
                </ButtonLink>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
