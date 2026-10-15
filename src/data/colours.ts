export interface PlushColour {
  id: string;
  name: string;
  category: 'Greens' | 'Blues' | 'Warm' | 'Pastels' | 'Dark';
  baseColor: string;
  tipColor: string;
  mood: string;
  tagline: string;
  description: string;
}

export const PLUSH_COLOURS: PlushColour[] = [
  {
    id: 'forest-green',
    name: 'Forest Green',
    category: 'Greens',
    baseColor: '#14532d',
    tipColor: '#4ade80',
    mood: 'Jungle Buddy 🌿',
    tagline: 'Loves nature trails & quiet cuddles',
    description: 'Deep woodland green base with fresh meadow tips, inspired by the lush Western Ghats.'
  },
  {
    id: 'mint-green',
    name: 'Mint Green',
    category: 'Greens',
    baseColor: '#065f46',
    tipColor: '#6ee7b7',
    mood: 'Pudina Pop 🍃',
    tagline: 'Cool, soothing & refreshingly soft',
    description: 'Crisp mint tones that calm active toddlers during naptime.'
  },
  {
    id: 'lime-green',
    name: 'Lime Green',
    category: 'Greens',
    baseColor: '#3f6212',
    tipColor: '#a3e635',
    mood: 'Nimbu Zest 🍋',
    tagline: 'Full of bouncy morning energy',
    description: 'Zesty citrus lime fur that brightens up any nursery playroom.'
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    category: 'Blues',
    baseColor: '#0369a1',
    tipColor: '#7dd3fc',
    mood: 'Aakash Cloud ☁️',
    tagline: 'Dreamy & light as morning skies',
    description: 'Gentle sky blue shades that make bedtime stories extra cozy.'
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    category: 'Blues',
    baseColor: '#1e3a8a',
    tipColor: '#60a5fa',
    mood: 'Neel Raja 👑',
    tagline: 'Noble guardian of sweet dreams',
    description: 'Rich royal blue with sapphire highlights, majestic yet delightfully squishy.'
  },
  {
    id: 'teal',
    name: 'Teal',
    category: 'Blues',
    baseColor: '#115e59',
    tipColor: '#5eead4',
    mood: 'Mayur Teal 🦚',
    tagline: 'Inspired by Indian peacock feathers',
    description: 'Stunning oceanic teal blending cool emerald and deep ocean blues.'
  },
  {
    id: 'sunshine-yellow',
    name: 'Sunshine Yellow',
    category: 'Warm',
    baseColor: '#a16207',
    tipColor: '#fde047',
    mood: 'Suraj Sunshine ☀️',
    tagline: 'Warm hugs on cloudy afternoons',
    description: 'Golden yellow fur like cheerful Indian morning sunshine.'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'Warm',
    baseColor: '#9a3412',
    tipColor: '#fb923c',
    mood: 'Narangi Spark 🍊',
    tagline: 'Playful, vibrant & ready for fun',
    description: 'Sweet Nagpur orange tones that bring laughter to play dates.'
  },
  {
    id: 'peach',
    name: 'Peach',
    category: 'Warm',
    baseColor: '#c2410c',
    tipColor: '#fed7aa',
    mood: 'Gulaabi Peach 🍑',
    tagline: 'Velvety sweetness and warmth',
    description: 'Warm pastel peach with golden undertones for gentle sensory soothing.'
  },
  {
    id: 'ruby-red',
    name: 'Ruby Red',
    category: 'Warm',
    baseColor: '#881337',
    tipColor: '#fb7185',
    mood: 'Gulab Ruby 🌹',
    tagline: 'Heartwarming festival companion',
    description: 'Deep ruby red celebrating festive Indian celebrations and warm love.'
  },
  {
    id: 'bubblegum-pink',
    name: 'Bubblegum Pink',
    category: 'Pastels',
    baseColor: '#9d174d',
    tipColor: '#f472b6',
    mood: 'Mithai Puff 🍬',
    tagline: 'Sweet as festive cotton candy',
    description: 'Fluffy pink marshmallow vibes loved by toddlers everywhere.'
  },
  {
    id: 'hot-pink',
    name: 'Hot Pink',
    category: 'Warm',
    baseColor: '#831843',
    tipColor: '#fb7185',
    mood: 'Rani Gulabi 💖',
    tagline: 'Bold, joyful & full of love',
    description: 'Vibrant Indian rani pink that stands out in any toy collection.'
  },
  {
    id: 'lavender-purple',
    name: 'Lavender Purple',
    category: 'Pastels',
    baseColor: '#4c1d95',
    tipColor: '#c084fc',
    mood: 'Kashmir Lavender 🪻',
    tagline: 'The original iconic bedtime puff',
    description: 'Calming valley lavender that helps little ones drift off to dreamland.'
  },
  {
    id: 'snow-white',
    name: 'Snow White',
    category: 'Pastels',
    baseColor: '#64748b',
    tipColor: '#ffffff',
    mood: 'Himalayan Snow ❄️',
    tagline: 'Pure, cloud-like and heavenly soft',
    description: 'Sparkling cloud white with silver-tipped strands, ultra-plush.'
  },
  {
    id: 'chocolate-brown',
    name: 'Chocolate Brown',
    category: 'Dark',
    baseColor: '#451a03',
    tipColor: '#d97706',
    mood: 'Bhalu Bear 🐻',
    tagline: 'Classic warm teddy hugs',
    description: 'Cozy cocoa brown reminiscent of friendly storybook forest bears.'
  },
  {
    id: 'black',
    name: 'Black',
    category: 'Dark',
    baseColor: '#0f172a',
    tipColor: '#475569',
    mood: 'Kaala Badal 🐾',
    tagline: 'Velvety midnight companion',
    description: 'Sleek midnight black fur with subtle charcoal luster that stays neat.'
  }
];

export const COLOUR_CATEGORIES = ['All', 'Greens', 'Blues', 'Warm', 'Pastels', 'Dark'] as const;
export type ColourCategory = typeof COLOUR_CATEGORIES[number];

export function getColourById(colourId: string): PlushColour {
  return PLUSH_COLOURS.find(c => c.id === colourId) || PLUSH_COLOURS[0];
}
