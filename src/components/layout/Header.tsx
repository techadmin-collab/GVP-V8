'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { colors, fontStacks } from '@/theme/tokens';
import { HOME_ONLY, moreNav, navHref, primaryNav, siteConfig } from '@/lib/site';
import LogoMark from '@/components/ui/LogoMark';
import SecurityPattern from '@/components/ui/SecurityPattern';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** v8 Passport document: a maroon "passport cover" header with monospaced navigation and a document strip. */
export default function Header() {
  const pathname = usePathname() ?? '/';
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [moreAnchor, setMoreAnchor] = React.useState<null | HTMLElement>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  React.useEffect(() => {
    setDrawerOpen(false);
    setMoreAnchor(null);
  }, [pathname]);

  const stay = (e: React.MouseEvent) => {
    if (HOME_ONLY) e.preventDefault();
  };
  const moreActive = moreNav.some((n) => isActive(pathname, n.href));

  const navSx = (active: boolean) => ({
    color: '#fff',
    opacity: active ? 1 : 0.8,
    fontFamily: fontStacks.mono,
    fontSize: '0.74rem',
    letterSpacing: '0.16em',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    px: 1.5,
    py: 1,
    minWidth: 0,
    borderRadius: '4px',
    border: `1px solid ${active ? 'rgba(255,255,255,0.5)' : 'transparent'}`,
    '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.08)' },
  });

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: colors.base, color: '#fff', boxShadow: scrolled ? '0 10px 30px -18px rgba(0,0,0,0.5)' : 'none', overflow: 'hidden' }}>
      <SecurityPattern opacity={0.08} color={colors.accentLight} lines={14} amplitude={40} centre={0.5} />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 74 }, gap: 1 }}>
          <Box component={NextLink} href={navHref('/')} onClick={stay} aria-label="GVP, home" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 'auto', textDecoration: 'none' }}>
            <LogoMark color="#FFFFFF" height={28} />
          </Box>
          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {primaryNav.map((item) => (
              <Button key={item.href} component={NextLink} href={navHref(item.href)} onClick={stay} sx={navSx(isActive(pathname, item.href))}>
                {item.label}
              </Button>
            ))}
            <Button onClick={(e) => setMoreAnchor(e.currentTarget)} endIcon={<KeyboardArrowDownRoundedIcon />} aria-haspopup="true" aria-expanded={moreAnchor ? 'true' : undefined} sx={navSx(moreActive)}>
              More
            </Button>
            <Menu anchorEl={moreAnchor} open={Boolean(moreAnchor)} onClose={() => setMoreAnchor(null)} disableScrollLock anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} slotProps={{ paper: { sx: { mt: 1, minWidth: 330, borderRadius: '10px', border: `1px dashed ${colors.primary}`, p: 0.5 } } }}>
              {moreNav.map((item) => (
                <MenuItem key={item.href} component={NextLink} href={navHref(item.href)} onClick={(e: React.MouseEvent) => { stay(e); setMoreAnchor(null); }} sx={{ py: 1.25, display: 'block', whiteSpace: 'normal', borderRadius: '6px' }}>
                  <Typography sx={{ fontFamily: fontStacks.mono, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.primary }}>{item.label}</Typography>
                  {item.description ? <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>{item.description}</Typography> : null}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button component={NextLink} href={navHref('/contact')} onClick={stay} variant="contained" sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: 1.5, whiteSpace: 'nowrap', bgcolor: '#fff', color: colors.primary, '&:hover': { bgcolor: colors.accentLight } }}>
            Request a Briefing
          </Button>
          <IconButton aria-label="Open menu" onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '6px' }}>
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {/* document strip */}
      <Box sx={{ position: 'relative', bgcolor: colors.accentLight, color: colors.base }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.5 }}>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: '0.68rem', letterSpacing: '0.2em' }}>TYPE P · CODE ARE · GVP</Typography>
          <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: fontStacks.mono, fontSize: '0.68rem', letterSpacing: '0.2em' }}>
            {siteConfig.nameLine.toUpperCase()} · {siteConfig.tagline.toUpperCase()}
          </Typography>
        </Container>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 400 }, bgcolor: colors.base, color: '#fff', p: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <LogoMark color="#FFFFFF" height={24} />
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile">
          {[{ label: 'Home', href: '/' }, ...primaryNav, ...moreNav].map((item, i) => (
            <Box key={item.href} component={NextLink} href={navHref(item.href)} onClick={(e: React.MouseEvent) => { stay(e); setDrawerOpen(false); }} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px dashed rgba(255,255,255,0.3)', color: '#fff', textDecoration: 'none', fontFamily: fontStacks.mono, fontSize: '0.85rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              <span>{item.label}</span>
              <span style={{ opacity: 0.6 }}>P.{String(i + 1).padStart(2, '0')}</span>
            </Box>
          ))}
        </Box>
        <Button component={NextLink} href={navHref('/contact')} onClick={(e: React.MouseEvent) => { stay(e); setDrawerOpen(false); }} variant="contained" fullWidth size="large" sx={{ mt: 3, bgcolor: '#fff', color: colors.primary, '&:hover': { bgcolor: colors.accentLight } }}>
          Request a Briefing
        </Button>
      </Drawer>
    </AppBar>
  );
}
