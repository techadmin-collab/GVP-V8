'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { onAccent, colors, fontStacks } from './tokens';

const { heading, body, mono } = fontStacks;

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.primary, light: colors.primaryLight, dark: colors.primaryDark, contrastText: '#FFFFFF' },
    secondary: { main: colors.accent, dark: colors.accentHover ?? colors.accentDark, light: colors.accentLight, contrastText: onAccent },
    success: { main: colors.status.cleared },
    warning: { main: colors.status.pending },
    error: { main: colors.status.denied },
    info: { main: colors.status.hold },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.muted },
    divider: colors.line,
  },
  shape: { borderRadius: 4 },
  typography: {
    // v8 Passport document: serif headlines, monospaced field labels
    fontFamily: body,
    fontSize: 16,
    h1: { fontFamily: heading, fontWeight: 500, fontSize: '3.6rem', lineHeight: 1.06, letterSpacing: '-0.015em' },
    h2: { fontFamily: heading, fontWeight: 500, fontSize: '2.5rem', lineHeight: 1.14, letterSpacing: '-0.01em' },
    h3: { fontFamily: heading, fontWeight: 500, fontSize: '1.8rem', lineHeight: 1.2 },
    h4: { fontFamily: heading, fontWeight: 500, fontSize: '1.4rem', lineHeight: 1.3 },
    h5: { fontFamily: body, fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.4 },
    h6: { fontFamily: body, fontWeight: 600, fontSize: '1rem', lineHeight: 1.45 },
    subtitle1: { fontSize: '1.15rem', lineHeight: 1.6 },
    body1: { fontSize: '1.05rem', lineHeight: 1.7 },
    body2: { fontSize: '0.94rem', lineHeight: 1.65 },
    overline: { fontFamily: mono, fontSize: '0.74rem', letterSpacing: '0.22em', fontWeight: 500, lineHeight: 1.6 },
    button: { fontFamily: mono, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.86rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: colors.background, color: colors.text },
        '::selection': { backgroundColor: colors.accentLight, color: colors.base },
        a: { color: 'inherit' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 4, paddingInline: 22, paddingBlock: 12, fontSize: '0.86rem' },
        sizeLarge: { paddingInline: 28, paddingBlock: 15, fontSize: '0.9rem' },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
      },
    },
    // Dropdowns and popovers don't lock page scroll. Locking hides the
    // scrollbar and shifts the whole layout sideways while a menu is open.
    MuiMenu: {
      defaultProps: { disableScrollLock: true },
    },
    MuiPopover: {
      defaultProps: { disableScrollLock: true },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: `1px solid ${colors.line}`, backgroundColor: colors.surface } },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0, disableGutters: true },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.line}`,
          '&::before': { display: 'none' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF', borderRadius: 4 },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: colors.base, fontSize: '0.8rem' },
        arrow: { color: colors.base },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 2.4 });

export default theme;
