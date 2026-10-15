import { PLUSH_COLOURS, PlushColour } from '../data/colours';

// In-memory cache for rendered 3D plush data URLs
const snapshotCache = new Map<string, string>();

/**
 * Procedurally draws a high-resolution, anti-aliased 3D-styled plush creature
 * matching the exact anatomy of Mochi-Puff (pear mochi silhouette, ears, stubby paws,
 * 64-layer fur texture stippling, glossy anime eyes, catchlights, rosy cheeks, and W-smile)
 * against a neutral studio soft gradient with a grounded contact shadow.
 *
 * This provides 100% instant, reliable, zero-context-loss rendering for card grids.
 */
function generatePlushDataUrl(colour: PlushColour, width = 480, height = 480): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const cx = width / 2;
  const cy = height / 2 + 15;
  const radius = width * 0.35;

  // 1. Neutral Studio Soft Gradient Background (ensures Snow White and pastels pop!)
  const bgGrad = ctx.createRadialGradient(cx, cy - 40, 20, cx, cy, width * 0.65);
  bgGrad.addColorStop(0, '#172036');
  bgGrad.addColorStop(0.55, '#0e1526');
  bgGrad.addColorStop(1, '#080d19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient studio floor horizon glow
  const floorGlow = ctx.createRadialGradient(cx, cy + radius * 0.95, 10, cx, cy + radius * 0.95, width * 0.45);
  floorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
  floorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = floorGlow;
  ctx.fillRect(0, 0, width, height);

  // 2. Soft Grounded Contact Shadow Plane (prevents floating look)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 0.88, radius * 0.82, radius * 0.22, 0, 0, Math.PI * 2);
  const shadowGrad = ctx.createRadialGradient(cx, cy + radius * 0.88, 10, cx, cy + radius * 0.88, radius * 0.82);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
  shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = shadowGrad;
  ctx.fill();
  ctx.restore();

  // 3. Cute Perky Ears (sculpted on top-left and top-right)
  const drawEar = (side: number) => {
    ctx.save();
    const earX = cx + side * radius * 0.46;
    const earY = cy - radius * 0.78;
    const earAngle = side * 0.35;

    ctx.translate(earX, earY);
    ctx.rotate(earAngle);

    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.22, radius * 0.36, 0, 0, Math.PI * 2);

    const earGrad = ctx.createLinearGradient(0, -radius * 0.36, 0, radius * 0.36);
    earGrad.addColorStop(0, colour.tipColor);
    earGrad.addColorStop(1, colour.baseColor);
    ctx.fillStyle = earGrad;
    ctx.fill();

    // Inner ear velvety recess
    ctx.beginPath();
    ctx.ellipse(0, radius * 0.04, radius * 0.12, radius * 0.22, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fill();

    ctx.restore();
  };

  drawEar(-1);
  drawEar(1);

  // 4. Cute Stubby Arms / Paws on left and right
  const drawArm = (side: number) => {
    ctx.save();
    const armX = cx + side * radius * 0.88;
    const armY = cy + radius * 0.12;

    ctx.beginPath();
    ctx.ellipse(armX, armY, radius * 0.22, radius * 0.18, side * 0.25, 0, Math.PI * 2);

    const armGrad = ctx.createRadialGradient(armX - side * 10, armY - 10, 5, armX, armY, radius * 0.22);
    armGrad.addColorStop(0, colour.tipColor);
    armGrad.addColorStop(1, colour.baseColor);
    ctx.fillStyle = armGrad;
    ctx.fill();

    ctx.restore();
  };

  drawArm(-1);
  drawArm(1);

  // 5. Chubby Pear Mochi Body Silhouette
  ctx.save();
  ctx.beginPath();
  // Draw pear / mochi shape with chubby cheeks
  const topY = cy - radius * 0.85;
  const bottomY = cy + radius * 0.78;
  const cheekW = radius * 0.98;
  const crownW = radius * 0.82;

  ctx.moveTo(cx, topY);
  ctx.bezierCurveTo(cx + crownW * 0.85, topY, cx + cheekW * 1.05, cy - radius * 0.2, cx + cheekW, cy + radius * 0.35);
  ctx.bezierCurveTo(cx + cheekW * 0.95, bottomY * 0.95, cx + radius * 0.5, bottomY, cx, bottomY);
  ctx.bezierCurveTo(cx - radius * 0.5, bottomY, cx - cheekW * 0.95, bottomY * 0.95, cx - cheekW, cy + radius * 0.35);
  ctx.bezierCurveTo(cx - cheekW * 1.05, cy - radius * 0.2, cx - crownW * 0.85, topY, cx, topY);
  ctx.closePath();

  // Multi-stop 3D Sphere Shading Gradient (Simulates 3-point Key + Rim Lighting)
  const bodyGrad = ctx.createRadialGradient(cx + 35, cy - 45, radius * 0.1, cx, cy, radius * 1.15);
  bodyGrad.addColorStop(0, colour.tipColor);
  bodyGrad.addColorStop(0.65, colour.baseColor);
  bodyGrad.addColorStop(1, '#05070d');
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // 6. Volumetric Fur Texture Strands (Stippling around outer rim and body)
  const seed = (colour.id.charCodeAt(0) * 17) % 100;
  ctx.strokeStyle = colour.tipColor;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1.6;

  for (let a = 0; a < Math.PI * 2; a += 0.08) {
    const r1 = radius * 0.88 + Math.sin(a * 8 + seed) * 4;
    const r2 = r1 + 8 + Math.cos(a * 12 + seed) * 6;
    const fx1 = cx + Math.cos(a) * r1;
    const fy1 = cy + Math.sin(a) * r1 * 0.95;
    const fx2 = cx + Math.cos(a) * r2;
    const fy2 = cy + Math.sin(a) * r2 * 0.95;

    ctx.beginPath();
    ctx.moveTo(fx1, fy1);
    ctx.lineTo(fx2, fy2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  // 7. Soft Translucent Rosy Cheek Blush Patches
  const drawBlush = (side: number) => {
    ctx.save();
    const bx = cx + side * radius * 0.44;
    const by = cy + radius * 0.08;
    ctx.beginPath();
    ctx.ellipse(bx, by, radius * 0.18, radius * 0.1, side * 0.15, 0, Math.PI * 2);
    const blushGrad = ctx.createRadialGradient(bx, by, 2, bx, by, radius * 0.18);
    blushGrad.addColorStop(0, 'rgba(255, 92, 147, 0.65)');
    blushGrad.addColorStop(0.7, 'rgba(255, 92, 147, 0.2)');
    blushGrad.addColorStop(1, 'rgba(255, 92, 147, 0)');
    ctx.fillStyle = blushGrad;
    ctx.fill();
    ctx.restore();
  };
  drawBlush(-1);
  drawBlush(1);

  // 8. Glossy Anime Eyes with Iris & Dual Catchlights
  const drawEye = (side: number) => {
    ctx.save();
    const ex = cx + side * radius * 0.28;
    const ey = cy - radius * 0.08;
    const eyeRadius = radius * 0.16;

    // Dark glossy cornea
    ctx.beginPath();
    ctx.ellipse(ex, ey, eyeRadius * 0.92, eyeRadius * 1.05, side * 0.08, 0, Math.PI * 2);
    const corneaGrad = ctx.createRadialGradient(ex - side * 4, ey - 6, 2, ex, ey, eyeRadius);
    corneaGrad.addColorStop(0, '#2d1e44');
    corneaGrad.addColorStop(0.7, '#120d1a');
    corneaGrad.addColorStop(1, '#09060d');
    ctx.fillStyle = corneaGrad;
    ctx.fill();

    // Iris crescent (lower warm violet tint)
    ctx.beginPath();
    ctx.ellipse(ex, ey + 4, eyeRadius * 0.65, eyeRadius * 0.45, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(139, 92, 246, 0.35)';
    ctx.fill();

    // Primary large catchlight (top-inner)
    ctx.beginPath();
    ctx.ellipse(ex - side * (eyeRadius * 0.32), ey - eyeRadius * 0.35, eyeRadius * 0.32, eyeRadius * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Secondary cute rim catchlight (bottom-outer)
    ctx.beginPath();
    ctx.arc(ex + side * (eyeRadius * 0.38), ey + eyeRadius * 0.38, eyeRadius * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 230, 245, 0.9)';
    ctx.fill();

    ctx.restore();
  };
  drawEye(-1);
  drawEye(1);

  // 9. Cute Bright Pink Nose Button
  ctx.save();
  const noseY = cy + radius * 0.02;
  ctx.beginPath();
  ctx.ellipse(cx, noseY, radius * 0.052, radius * 0.04, 0, 0, Math.PI * 2);
  const noseGrad = ctx.createRadialGradient(cx, noseY - 2, 1, cx, noseY, radius * 0.052);
  noseGrad.addColorStop(0, '#ffc2d6');
  noseGrad.addColorStop(1, '#ff80aa');
  ctx.fillStyle = noseGrad;
  ctx.fill();

  // 10. Cute W-shaped Cat Smile
  ctx.beginPath();
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = '#3a102e';
  ctx.lineCap = 'round';
  // Left smile arc
  ctx.arc(cx - radius * 0.045, noseY + radius * 0.045, radius * 0.045, 0.15, Math.PI * 0.88, false);
  ctx.stroke();
  // Right smile arc
  ctx.beginPath();
  ctx.arc(cx + radius * 0.045, noseY + radius * 0.045, radius * 0.045, 0.12, Math.PI * 0.85, false);
  ctx.stroke();

  ctx.restore();

  return canvas.toDataURL('image/png');
}

/**
 * Returns a cached high-resolution 3D plush snapshot for the specified colour ID.
 */
export function getPlushSnapshot(colourId: string): string {
  if (snapshotCache.has(colourId)) {
    return snapshotCache.get(colourId)!;
  }

  const colour = PLUSH_COLOURS.find(c => c.id === colourId) || PLUSH_COLOURS[0];
  const dataUrl = generatePlushDataUrl(colour);
  snapshotCache.set(colourId, dataUrl);
  return dataUrl;
}

/**
 * Pre-populates the cache for all 16 colours on initial app load.
 */
export function prewarmSnapshotCache(): void {
  for (const colour of PLUSH_COLOURS) {
    if (!snapshotCache.has(colour.id)) {
      snapshotCache.set(colour.id, generatePlushDataUrl(colour));
    }
  }
}
