import * as React from 'react';
import Box from '@mui/material/Box';
import { colors, fontStacks } from '@/theme/tokens';

type Shape = 'circle' | 'rect' | 'oval' | 'octagon';

/**
 * A rubber-stamp impression drawn in CSS: double border, monospaced lettering,
 * slight rotation. Optional "animate" plays a stamping motion when shown.
 */
export default function InkStamp({ top, main, bottom, shape = 'circle', rotate = -8, size = 120, animate = false, color = colors.primary }: { top?: string; main: string; bottom?: string; shape?: Shape; rotate?: number; size?: number; animate?: boolean; color?: string }) {
  const radius = shape === 'circle' ? '50%' : shape === 'oval' ? '50% / 40%' : shape === 'rect' ? '8px' : '18%';
  const w = shape === 'oval' || shape === 'rect' ? size * 1.45 : size;
  return (
    <Box
      aria-hidden="true"
      className={animate ? 'gvp8-stamp' : undefined}
      style={{ '--r': `${rotate}deg` } as React.CSSProperties}
      sx={{
        width: w,
        height: size,
        borderRadius: radius,
        border: `3px solid ${color}`,
        boxShadow: `inset 0 0 0 4px #fff, inset 0 0 0 5.5px ${color}`,
        color,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        transform: `rotate(${rotate}deg)`,
        opacity: 0.88,
        fontFamily: fontStacks.mono,
        lineHeight: 1.15,
        p: 1.5,
        mixBlendMode: 'multiply',
      }}
    >
      <Box>
        {top ? <Box sx={{ fontSize: size * 0.085, letterSpacing: '0.18em' }}>{top}</Box> : null}
        <Box sx={{ fontSize: size * 0.17, fontWeight: 700, letterSpacing: '0.06em', my: 0.25 }}>{main}</Box>
        {bottom ? <Box sx={{ fontSize: size * 0.085, letterSpacing: '0.18em' }}>{bottom}</Box> : null}
      </Box>
    </Box>
  );
}
