import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import { confirmedContact, footerNav, legalNav, siteConfig } from '@/lib/site';
import { TextLink } from '@/components/ui/links';
import Rich from '@/components/ui/Rich';
import LogoMark from '@/components/ui/LogoMark';
import MrzStrip from '@/components/ui/MrzStrip';
import SecurityPattern from '@/components/ui/SecurityPattern';

/** v8 Passport document: the back cover, with a machine-readable zone along the bottom. */
export default function Footer() {
  const year = new Date().getFullYear();
  const contact = Object.values(confirmedContact()).filter((v): v is string => Boolean(v));
  const label = { fontFamily: fontStacks.mono, fontSize: '0.7rem', letterSpacing: '0.2em', color: colors.accentLight, mb: 1.5 } as const;
  return (
    <Box component="footer" sx={{ position: 'relative', overflow: 'hidden', bgcolor: colors.base, color: '#fff' }}>
      <SecurityPattern opacity={0.07} color={colors.accentLight} lines={18} amplitude={90} centre={0.3} />
      <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 7, md: 9 }, pb: 3 }}>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '1.3fr 1.2fr 1fr' } }}>
          <Box>
            <LogoMark color="#FFFFFF" height={38} />
            <Typography sx={{ mt: 2.5, fontFamily: fontStacks.heading, fontSize: '1.5rem', lineHeight: 1.2 }}>{siteConfig.tagline}</Typography>
            <Typography sx={{ mt: 0.5, fontFamily: fontStacks.mono, fontSize: '0.72rem', letterSpacing: '0.18em', opacity: 0.75 }}>{siteConfig.nameLine.toUpperCase()}</Typography>
          </Box>
          <Box component="nav" aria-label="Footer">
            <Typography sx={label}>PAGES</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 3, rowGap: 1 }}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.93rem', '&:hover': { color: '#fff' } }}>{item.label}</TextLink>
                </li>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography sx={label}>ISSUING OFFICE</Typography>
            {contact.map((v) => (
              <Typography key={v} variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 2 }}><Rich text={v} /></Typography>
            ))}
            <TextLink href="/contact" sx={{ display: 'inline-block', mt: 1, color: colors.accentLight, fontWeight: 600 }}>Request a confidential briefing →</TextLink>
          </Box>
        </Box>
        <Box sx={{ mt: 6, pt: 2.5, borderTop: '1px dashed rgba(255,255,255,0.3)' }}>
          <MrzStrip color="rgb(var(--gvp-accent-light) / 0.7)" />
        </Box>
        <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: '0.72rem', letterSpacing: '0.1em', opacity: 0.7 }}>© {year} GVP | {siteConfig.nameLine.toUpperCase()}. ALL RIGHTS RESERVED.</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {legalNav.map((item) => (
              <TextLink key={item.href} href={item.href} sx={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', '&:hover': { color: '#fff' } }}>{item.label}</TextLink>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
