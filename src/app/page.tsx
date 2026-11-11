import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import Section, { SectionHeading } from '@/components/ui/Section';
import CtaBanner from '@/components/ui/CtaBanner';
import SecurityPattern from '@/components/ui/SecurityPattern';
import LogoMark from '@/components/ui/LogoMark';
import Reveal from '@/components/ui/Reveal';
import InkStamp from '@/components/v8/InkStamp';
import PassportBook from '@/components/v8/PassportBook';
import FlipCards from '@/components/v8/FlipCards';
import SystemFilm from '@/components/v8/SystemFilm';
import { ButtonLink, TextLink } from '@/components/ui/links';
import { colors, fontStacks } from '@/theme/tokens';
import { siteConfig } from '@/lib/site';

/*
 * v8 Passport document home page, built from scratch: a full data page,
 * an interactive passport you page through, entry stamps for the model,
 * a customs-declaration style transparency form, luggage-tag safeguards
 * and flip-over interview cards. It reuses no v4, v5, v6 or v7 home blocks.
 */

const label = { fontFamily: fontStacks.mono, fontSize: '0.66rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: colors.muted } as const;

const fields = [
  ['Type', 'P · Programme'],
  ['Issued by', `GVP | ${siteConfig.nameLine}`],
  ['Financed by', 'GVP'],
  ['Governed by', 'The State'],
  ['Revenue', 'Shared openly'],
  ['Validity', 'Agreed term, then transferred'],
];

const stamps = [
  { word: 'Build', top: 'PHASE I', bottom: 'FINANCED BY GVP', shape: 'circle' as const, rotate: -10, body: 'GVP designs, finances and installs the system, starting at one priority site.' },
  { word: 'Operate', top: 'PHASE II', bottom: 'SERVICE LEVELS', shape: 'rect' as const, rotate: 6, body: 'GVP runs and maintains it against agreed service levels, with technology refresh included.' },
  { word: 'Share', top: 'PHASE III', bottom: 'GOVT. FIRST', shape: 'oval' as const, rotate: -4, body: 'Published fees are collected and recorded. Government’s share is allocated first.' },
  { word: 'Transfer', top: 'PHASE IV', bottom: 'TO GOVERNMENT', shape: 'octagon' as const, rotate: 9, body: 'At the end of the agreed term, the system is handed over to Government.' },
];

const declaration = [
  'The fee schedule is set and published by Government',
  'Government’s share of every fee is allocated first',
  'Government has real-time access to transaction and collection data',
  'Volumes, collections and distributions are reported on an agreed schedule',
  'An independent auditor verifies the figures',
];

const tags = [
  { code: 'DATA', title: 'Data sovereignty', body: 'Hosted in-country or in a Government-approved location. Government owns all traveller and operational data.' },
  { code: 'SEC', title: 'Security by design', body: 'Encryption, role-based access, complete audit trails and regular penetration testing.' },
  { code: 'AUD', title: 'Independent audit', body: 'Volumes, collections and distributions verified on a schedule agreed with Government.' },
  { code: 'GOV', title: 'Human oversight', body: 'Automation supports officers. Decisions remain with the State, within national law.' },
];

const MRZ = ['P<ARE<GVP<<BORDER<MANAGEMENT<PARTNERS<<<<<<<<<<<<<<<', 'GVP0000001<ARE<FINANCED<BY<GVP<<GOVERNED<BY<THE<STATE<<'];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Data page                                                     */}
      {/* ------------------------------------------------------------ */}
      <Box component="section" aria-label="Introduction" sx={{ bgcolor: colors.background, py: { xs: 4, md: 7 } }}>
        <Container maxWidth="lg">
          <Box className="gvp-hero-in" sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#FFFCFC', borderRadius: '18px', border: `1px solid ${colors.line}`, boxShadow: '0 40px 80px -50px rgb(var(--gvp-base) / 0.6)' }}>
            {/* page header strip */}
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2.5, md: 5 }, py: 1.5, bgcolor: 'rgb(var(--gvp-primary) / 0.06)', borderBottom: `1px solid ${colors.line}` }}>
              <Typography sx={{ ...label, color: colors.primary }}>Border management partnership</Typography>
              <Typography sx={{ ...label, color: colors.primary, display: { xs: 'none', sm: 'block' } }}>Data page</Typography>
            </Box>

            <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '260px 1fr' }, gap: { xs: 4, md: 6 }, px: { xs: 2.5, md: 5 }, py: { xs: 4, md: 5 } }}>
              {/* holder panel */}
              <Box>
                <Box sx={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: '12px', bgcolor: colors.base, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                  <SecurityPattern opacity={0.18} color={colors.accentLight} lines={16} amplitude={90} />
                  <Box sx={{ position: 'relative', display: 'grid', justifyItems: 'center', gap: 2 }}>
                    <LogoMark color="#FFFFFF" height={40} />
                    <Box sx={{ width: 54, height: 42, borderRadius: '8px', border: '2px solid rgba(255,255,255,0.7)', display: 'grid', placeItems: 'center', color: '#fff' }}>
                      <MemoryRoundedIcon />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <InkStamp top="GOVERNED BY" main="STATE" bottom="OPEN BOOKS" rotate={-12} size={104} animate />
                </Box>
              </Box>

              {/* fields */}
              <Box>
                <Typography sx={label}>Surname / Statement</Typography>
                <Typography variant="h1" component="h1" sx={{ mt: 0.75, color: colors.text, fontSize: { xs: '2.4rem', md: '3.6rem' } }}>
                  Modern borders, financed by GVP. Governed by the State. Revenue shared openly.
                </Typography>
                <Box sx={{ mt: 3.5, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2.5, py: 2.5, borderTop: `1px dashed rgb(var(--gvp-primary) / 0.35)`, borderBottom: `1px dashed rgb(var(--gvp-primary) / 0.35)` }}>
                  {fields.map(([k, v]) => (
                    <Box key={k}>
                      <Typography sx={label}>{k}</Typography>
                      <Typography sx={{ mt: 0.25, fontWeight: 600, color: colors.text }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography sx={{ mt: 3, color: colors.muted, fontSize: '1.08rem', maxWidth: 680 }}>
                  GVP finances, builds and operates intelligent border management systems through a build-operate-transfer partnership. We recover our
                  investment only through published, user-funded fees. Government retains control and receives a transparent revenue share.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3.5 }}>
                  <ButtonLink href="/solution" variant="contained" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />}>
                    Explore Our Solution
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="outlined" color="primary" size="large">
                    Speak to Our Government Team
                  </ButtonLink>
                </Stack>
              </Box>
            </Box>

            {/* static machine-readable zone */}
            <Box aria-hidden="true" sx={{ position: 'relative', px: { xs: 2.5, md: 5 }, py: 2, bgcolor: 'rgb(var(--gvp-primary) / 0.05)', borderTop: `1px solid ${colors.line}`, overflow: 'hidden' }}>
              {MRZ.map((l) => (
                <Typography key={l} sx={{ fontFamily: fontStacks.mono, fontSize: { xs: 11, md: 15 }, letterSpacing: { xs: '0.18em', md: '0.32em' }, color: colors.text, opacity: 0.75, whiteSpace: 'nowrap' }}>
                  {l}
                </Typography>
              ))}
            </Box>
          </Box>
          <Typography sx={{ mt: 2, textAlign: 'center', fontFamily: fontStacks.mono, fontSize: '0.72rem', letterSpacing: '0.18em', color: colors.primary }}>
            FUNDED BY PUBLISHED TRAVELLER FEES, SHARED OPENLY WITH GOVERNMENT
          </Typography>
        </Container>
      </Box>

      {/* ------------------------------------------------------------ */}
      {/* The system film                                               */}
      {/* ------------------------------------------------------------ */}
      <Box component="section" aria-label="The system in thirty seconds" sx={{ bgcolor: colors.surface, py: { xs: 6, md: 9 }, borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
        <Container maxWidth="lg" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' }, gap: { xs: 4, md: 6 }, alignItems: 'center' }}>
          <Box>
            <Typography sx={{ ...label, color: colors.primary }}>The system · 30 seconds</Typography>
            <Typography variant="h2" component="h2" sx={{ mt: 1.5, fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
              How a traveller is cleared
            </Typography>
            <Typography sx={{ mt: 2, color: colors.muted }}>
              From an online application to a confirmed identity at the gate, tailored to each country&apos;s airports, land and sea ports.
            </Typography>
            <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3 }}>
              {['e-Visa and permits', 'e-Passport and biometrics', 'Watchlist and risk alerts'].map((t, i) => (
                <Box component="li" key={t} sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, py: 1.25, borderTop: `1px dashed ${colors.line}` }}>
                  <Typography component="span" sx={{ ...label, color: colors.primary }}>{String(i + 1).padStart(2, '0')}</Typography>
                  <Typography component="span" sx={{ fontWeight: 600 }}>{t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <SystemFilm src="/videos/border-management-system-720p-web.mp4" poster="/videos/border-management-system-poster.jpg" />
        </Container>
      </Box>

      {/* ------------------------------------------------------------ */}
      {/* Open the passport                                             */}
      {/* ------------------------------------------------------------ */}
      <Box component="section" aria-label="A traveller's journey" sx={{ bgcolor: colors.background, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionHeading overline="Open the passport" title="One traveller, four visa pages" intro="Turn the pages to see how a traveller moves through a GVP border." />
          <PassportBook />
        </Container>
      </Box>

      {/* ------------------------------------------------------------ */}
      {/* Entry stamps: the model                                       */}
      {/* ------------------------------------------------------------ */}
      <Section tone="light">
        <SectionHeading overline="Entry stamps" title="The partnership model, stamped in four phases" intro="GVP finances the programme. Government commits no upfront capital." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 3, md: 2 } }}>
          {stamps.map((s, i) => (
            <Reveal key={s.word} delay={i * 120}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 170 }}>
                  <InkStamp top={s.top} main={s.word.toUpperCase()} bottom={s.bottom} shape={s.shape} rotate={s.rotate} size={130} />
                </Box>
                <Typography sx={{ mt: 1.5, fontFamily: fontStacks.heading, fontSize: '1.5rem' }}>{s.word}</Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: colors.muted, maxWidth: 240, mx: 'auto' }}>{s.body}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <TextLink href="/partnership-model" sx={{ fontFamily: fontStacks.mono, fontSize: '0.8rem', letterSpacing: '0.16em', color: colors.primary }}>READ THE FULL MODEL →</TextLink>
        </Box>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Customs declaration: transparency                             */}
      {/* ------------------------------------------------------------ */}
      <Box component="section" aria-label="Transparency declaration" sx={{ bgcolor: colors.background, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="md">
          <Box sx={{ bgcolor: colors.surface, borderRadius: '6px', border: `1px solid ${colors.line}`, boxShadow: '0 30px 60px -45px rgb(var(--gvp-base) / 0.6)', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: colors.primary, color: '#fff', px: { xs: 3, md: 4 }, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontFamily: fontStacks.mono, letterSpacing: '0.2em', fontSize: '0.8rem' }}>REVENUE DECLARATION</Typography>
              <Typography sx={{ fontFamily: fontStacks.mono, letterSpacing: '0.2em', fontSize: '0.7rem', opacity: 0.8 }}>FORM GVP-01</Typography>
            </Box>
            <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 3, md: 4 } }}>
              <Typography variant="h3" component="h2" sx={{ color: colors.text }}>What travellers pay is public. What Government receives is visible.</Typography>
              <Typography sx={{ mt: 1, color: colors.muted }}>GVP declares the following for every programme:</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 3 }}>
                {declaration.map((d, i) => (
                  <Box component="li" key={d} sx={{ display: 'grid', gridTemplateColumns: '28px 1fr 60px', gap: 2, alignItems: 'center', py: 1.5, borderBottom: `1px dotted ${colors.line}` }}>
                    <CheckBoxRoundedIcon sx={{ color: colors.primary }} />
                    <Typography sx={{ color: colors.text }}>{d}</Typography>
                    <Typography sx={{ ...label, textAlign: 'right' }}>{String(i + 1).padStart(2, '0')}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, alignItems: 'end' }}>
                <Box>
                  <Typography sx={label}>Declared by</Typography>
                  <Typography sx={{ mt: 1, fontFamily: fontStacks.heading, fontStyle: 'italic', fontSize: '1.6rem', color: colors.primary, borderBottom: `1px solid ${colors.text}`, pb: 0.5 }}>
                    GVP | {siteConfig.nameLine}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: colors.muted }}>The revenue split is agreed with Government for each programme. Illustrative only, not an offer.</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ------------------------------------------------------------ */}
      {/* Luggage tags: safeguards                                      */}
      {/* ------------------------------------------------------------ */}
      <Section tone="light">
        <SectionHeading overline="Safeguards" title="Your data. Your laws. Your control." intro="Four commitments that travel with every programme." />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 3, md: 2.5 }, pt: 3 }}>
          {tags.map((t, i) => (
            <Reveal key={t.code} delay={i * 100}>
              <Box sx={{ position: 'relative', transform: `rotate(${[-2, 1.5, -1, 2][i]}deg)`, transition: 'transform 0.3s ease', '&:hover': { transform: 'rotate(0deg) translateY(-4px)' } }}>
                {/* string */}
                <Box aria-hidden="true" sx={{ position: 'absolute', top: -26, left: '50%', width: 2, height: 30, bgcolor: colors.accentLight, transform: 'translateX(-50%)' }} />
                <Box sx={{ bgcolor: i % 2 ? colors.surface : colors.primary, color: i % 2 ? colors.text : '#fff', border: i % 2 ? `1px solid ${colors.line}` : 'none', clipPath: 'polygon(18% 0, 82% 0, 100% 12%, 100% 100%, 0 100%, 0 12%)', pt: 6, pb: 3, px: 3, minHeight: 260, position: 'relative' }}>
                  {/* punched hole */}
                  <Box aria-hidden="true" sx={{ position: 'absolute', top: 16, left: '50%', width: 18, height: 18, borderRadius: '50%', transform: 'translateX(-50%)', bgcolor: colors.surface, border: `2px solid ${i % 2 ? colors.line : 'rgba(255,255,255,0.5)'}` }} />
                  <Typography sx={{ fontFamily: fontStacks.mono, fontWeight: 700, fontSize: '2.2rem', letterSpacing: '0.12em', color: i % 2 ? colors.primary : '#fff' }}>{t.code}</Typography>
                  <Typography sx={{ mt: 1, fontWeight: 700, fontSize: '1.1rem' }}>{t.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.85 }}>{t.body}</Typography>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Interview cards                                               */}
      {/* ------------------------------------------------------------ */}
      <Box component="section" aria-label="Questions" sx={{ bgcolor: colors.background, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <SectionHeading overline="The interview" title="Questions officials ask" intro="Turn a card over to read the answer." />
          <FlipCards />
          <Box sx={{ mt: 4 }}>
            <TextLink href="/faqs" sx={{ fontFamily: fontStacks.mono, fontSize: '0.8rem', letterSpacing: '0.16em', color: colors.primary }}>ALL QUESTIONS →</TextLink>
          </Box>
        </Container>
      </Box>

      <CtaBanner
        title="Planning a border modernisation programme?"
        body="Our team will walk your officials through a tailored model, with no obligation."
        actions={[{ label: 'Request a Government Briefing', href: '/contact' }]}
      />
    </>
  );
}
