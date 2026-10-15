# Fix Blank White Images in Shop Grid: 3D Snapshot Cache & Context Pooling

Resolve the issue where multiple cards in the Shop and listing grids render as blank white rectangles due to browser WebGL context limits (8–16 simultaneous contexts), while ensuring light fur colors (such as Snow White) display with contrast on a neutral studio soft gradient backdrop.

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your responses in Phase 1:
> - **Card Rendering Strategy**: Instant cached 3D snapshots generated from a single offscreen WebGL instance, with interactive 3D active only on hover/focus.
> - **Card Background Aesthetic**: Neutral studio soft gradient with a grounded contact shadow, ensuring white and light-colored plush toys (like Snow White and Himalayan Cloud) maintain clear contrast and depth.

---

## 1. Overview & Root Cause Analysis

### The Problem
When the Shop page loads 24 product cards simultaneously, each card currently attempts to instantiate its own independent `THREE.WebGLRenderer`. Browsers enforce a hard ceiling of 8 to 16 active WebGL contexts per tab. Once this threshold is exceeded, older contexts receive a `webglcontextlost` signal and collapse into blank or transparent rectangles. On cards with light colors (e.g., Snow White), the unlit or lost canvas appears as a solid white box.

### The Solution
1. **Single-Context 3D Snapshot Engine**: A single offscreen WebGL renderer generates high-resolution, anti-aliased snapshots for the 16 color variants during application initialization and caches them in memory.
2. **Instant Zero-Latency Render**: All cards in the Shop grid and listing pages display the pre-rendered 3D snapshot instantly with zero WebGL contexts held open.
3. **Hover-to-Interact WebGL Pooling**: When a user hovers over or taps a card, a single shared active WebGL canvas mounts on-demand to provide live 3D rotation and fur petting, auto-disposing when the pointer leaves.
4. **Studio Contrast Backdrop**: Product card containers receive a soft radial studio gradient (`#131c31` to `#090e1a`) with a grounded contact shadow so light fur and eyes pop distinctly.

---

## 2. User Experience & Visual Design

### Card Experience in the Shop Grid
```
┌────────────────────────────────────────────────────────────┐
│ [★ 4.9 (384)]                                   [♥ Wishlist]│
│                                                            │
│     ┌────────────────────────────────────────────────┐     │
│     │                                                │     │
│     │         Soft Neutral Studio Gradient           │     │
│     │                    (· ◡ ·)                     │     │
│     │               [Fluffy Creature]                │     │
│     │             ( ( Contact Shadow ) )             │     │
│     │                                                │     │
│     │  [ Hover/Tap: Activates Interactive 3D Orbit ] │     │
│     └────────────────────────────────────────────────┘     │
│                                                            │
│ Lavender Purple · Medium 25 cm                             │
│ Mochi the Lavender Dream                                   │
│ ₹899  ₹1,299                                      [+ Add]  │
└────────────────────────────────────────────────────────────┘
```

- **Zero Blank Frames**: Every product card renders immediately with 100% reliability, no matter how many filters are toggled or how rapidly the user scrolls.
- **Micro-Interactions**: Hovering over a card gently lifts the card ($2\text{px}$ `translateY`), deepens the ambient glow matching the plush tone, and mounts the live 3D fur viewer.
- **Studio Backdrop**: Neutral studio gradient with radial falloff and a soft contact shadow beneath the creature so Snow White, Pastel Peach, and Mint Green stand out with depth.

---

## 3. Technical Architecture & Component Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Initialization                              │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ PlushSnapshotCache (Singleton Offscreen WebGL Renderer)         │  │
│  │  - Initializes 1 offscreen canvas                                 │  │
│  │  - Loops through 16 colors: renders studio lighting & fur        │  │
│  │  - Converts to cached Data URLs (PlushSnapshotCache.get(colorId)) │  │
│  │  - Disposes offscreen renderer to free GPU memory                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Instant Data URLs
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        ShopPage Product Grid                           │
│                                                                        │
│  ┌────────────────────────┐  ┌────────────────────────┐                │
│  │ Card 1 (Lavender)      │  │ Card 2 (Snow White)    │   ... [24]     │
│  │  <img> Data URL        │  │  <img> Data URL        │                │
│  │  Studio Soft Gradient  │  │  Studio Soft Gradient  │                │
│  │  Grounded Shadow       │  │  Grounded Shadow       │                │
│  │  [Hover -> Mount 3D]   │  │  [Hover -> Mount 3D]   │                │
│  └────────────────────────┘  └────────────────────────┘                │
│                                                                        │
│  Total Active WebGL Contexts on Grid: 0 (or 1 during hover)            │
│  Browser Limit: 16 (Remaining Headroom: 15)                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Implementation Steps

1. **`src/services/snapshotCache.ts`**:
   - Create a singleton module that pre-generates 3D plush snapshots using a single temporary WebGL renderer or procedural canvas fallback.
   - Cache results by `colourId` so repeated products (e.g. Mini vs Jumbo of same color) share the same image instantly.

2. **`src/components/PlushCardImage.tsx`**:
   - A dedicated component for product cards across `ShopPage`, `ColoursPage`, and `HomePage`.
   - Renders the cached snapshot on a soft studio gradient background with grounded contact shadow.
   - On hover/focus (or tap on mobile), seamlessly swaps in `FurViewer3D` for live interaction, disposing it when the pointer leaves.

3. **`src/pages/ShopPage.tsx`**:
   - Replace direct unconditional `FurViewer3D` loops with `PlushCardImage`.
   - Ensures all 24 cards render with crisp clarity and zero blank white boxes.

4. **`src/pages/ColoursPage.tsx` & `src/pages/HomePage.tsx`**:
   - Apply the same pattern to Best Sellers and the 16 Colours grid to ensure zero context loss across the entire storefront.

5. **Verification**:
   - Run `lint_applet` and `compile_applet`.
   - Confirm that all 24 cards in the Shop display properly without blank white frames, and test hover interactivity.
