import { PLUSH_COLOURS, PlushColour } from './colours';

export type PlushSize = 'Mini 15 cm' | 'Medium 25 cm' | 'Jumbo 40 cm';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  colourId: string;
  defaultSize: PlushSize;
  price: number;
  originalPrice: number;
  ageGroup: '2+' | '3+' | '5+';
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFestivePick?: boolean;
  description: string;
  features: string[];
  dimensions: {
    mini: string;
    medium: string;
    jumbo: string;
  };
}

export const SIZE_PRICES: Record<PlushSize, { price: number; originalPrice: number; heightCm: number; weightG: number }> = {
  'Mini 15 cm': { price: 399, originalPrice: 599, heightCm: 15, weightG: 180 },
  'Medium 25 cm': { price: 899, originalPrice: 1299, heightCm: 25, weightG: 420 },
  'Jumbo 40 cm': { price: 1999, originalPrice: 2799, heightCm: 40, weightG: 980 },
};

export const PRODUCTS: Product[] = [
  {
    id: 'fp-lavender-original',
    name: 'Mochi the Lavender Dream',
    subtitle: 'The Original Iconic Sensory Companion',
    colourId: 'lavender-purple',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 4.9,
    reviewCount: 384,
    isBestSeller: true,
    isFestivePick: true,
    description: 'The beloved signature FluffyPal! Features ultra-dense soothing purple fur, big glossy anime eyes, and weighted squishy mochi softness for deep bedtime relaxation.',
    features: ['Hypoallergenic OEKO-TEX plush', 'Safe embroidered details & child-safe eyes', '100% Machine washable on gentle cycle', 'Double-stitched seams for rough-and-tumble play'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-mint-mochi',
    name: 'Pudina the Mint Fluff',
    subtitle: 'Gentle Calming Naptime Buddy',
    colourId: 'mint-green',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 219,
    isBestSeller: true,
    description: 'Fresh soothing mint-green fur with light jade tips. Perfect for calming energetic toddlers and easing sensory overload.',
    features: ['Zero microplastic shedding', 'Reinforced seams & lock-stitch eyes', 'Machine washable', 'Anti-bacterial plush treatment'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-brown-bhalu',
    name: 'Bhalu the Brown Cuddler',
    subtitle: 'Classic Woodland Storytime Bear',
    colourId: 'chocolate-brown',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 4.9,
    reviewCount: 412,
    isBestSeller: true,
    isFestivePick: true,
    description: 'Warm cocoa-brown plush blob inspired by friendly jungle bears. The jumbo size makes the ultimate huggable body pillow for kids.',
    features: ['Extra-cushioned organic cotton fill', 'Safe for toddlers 3+', 'Hypoallergenic outer fur', 'Stands on flat base naturally'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-bubblegum-mithai',
    name: 'Mithai the Bubblegum Puff',
    subtitle: 'Sweet Cotton-Candy Cuddle Ball',
    colourId: 'bubblegum-pink',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 4.9,
    reviewCount: 328,
    isBestSeller: true,
    description: 'Irresistibly pastel and sweet as festival barfi. Features pastel pink gradient fur and warm rosy cheek blush patches.',
    features: ['Non-shedding silky micro-fiber', 'Passed 15kg pull safety test', 'Gentle machine wash safe', 'Includes gift tag in box'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-sunshine-suraj',
    name: 'Suraj the Golden Sunshine',
    subtitle: 'Cheerful Morning Playmate',
    colourId: 'sunshine-yellow',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 176,
    isNew: true,
    description: 'Bright golden sunshine fur that brings immediate smiles on rainy mornings. Super tactile and stimulating for developing senses.',
    features: ['Stimulates sensory exploration', 'Zero toxic azo dyes', 'BIS certified IS 9873 safe', 'Lightweight for small toddler hands'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-sky-aakash',
    name: 'Aakash the Sky Angel',
    subtitle: 'Daydreaming Cloud Pal',
    colourId: 'sky-blue',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 194,
    description: 'Soft baby-blue coat with white cloud-like highlights. A peaceful friend for quiet reading corners and nursery cribs.',
    features: ['Cloud-soft microfiber feel', 'Safe for newborn nursery decor', 'Removable tag', 'Tumble dry low safe'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-forest-van',
    name: 'Vanraj the Forest Explorer',
    subtitle: 'Deep Woodland Canopy Friend',
    colourId: 'forest-green',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '3+',
    rating: 4.7,
    reviewCount: 142,
    description: 'Rich mossy green fur inspired by misty mountain treks. Built sturdy for adventurous kids who love outdoor pretend games.',
    features: ['Durable reinforced stitching', 'Washable dirt-resistant fibers', 'BPA & Phthalate free', 'Eco-friendly recycled polyester fill'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-royal-neel',
    name: 'Neelu the Royal Prince',
    subtitle: 'Noble Sapphire Cuddle King',
    colourId: 'royal-blue',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 4.9,
    reviewCount: 265,
    isFestivePick: true,
    description: 'Deep cobalt body with luminous electric-blue tip highlights. A standout centerpiece for kids’ bedroom decor and festival gifts.',
    features: ['Luxurious dual-tone sheen', 'Sturdy weighted base', 'Hypoallergenic fill', 'Tested against oral ingestion hazards'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-ruby-gulab',
    name: 'Gulab the Festive Ruby',
    subtitle: 'Diwali & Rakhi Celebration Edition',
    colourId: 'ruby-red',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '2+',
    rating: 5.0,
    reviewCount: 298,
    isFestivePick: true,
    isBestSeller: true,
    description: 'Radiant ruby red fur crafted specifically for Indian festival gifting. Comes with an optional golden rakhi or Diwali ribbon wrap.',
    features: ['Festive limited celebration coat', 'Safe for all festive rituals', 'Gift-boxed packaging ready', 'Color-fast wash guarantee'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-snow-himalaya',
    name: 'Himmat the Snow Puff',
    subtitle: 'Himalayan Cloud Companion',
    colourId: 'snow-white',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 167,
    description: 'Crisp white marshmallow fur that is surprisingly easy to wash! Designed with stain-release plush fiber technology.',
    features: ['Stain-release fiber weave', 'Easy 30°C machine wash', 'Non-yellowing coat', 'Safe embroidered nose bean'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-orange-narangi',
    name: 'Narangi the Bouncy Spark',
    subtitle: 'Zesty Citrus Playtime Joy',
    colourId: 'orange',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '3+',
    rating: 4.7,
    reviewCount: 118,
    isNew: true,
    description: 'Vibrant marigold and tangerine fur with energetic fluff. Excellent for energetic pretend play and car journeys.',
    features: ['High-contrast colors for sensory tracking', 'Crush-resistant bounce', 'Tested for choking safety', 'No loose fur fibers'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-lime-nimbu',
    name: 'Nimbu the Lime Spark',
    subtitle: 'Bouncy Citrus Toddler Friend',
    colourId: 'lime-green',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.6,
    reviewCount: 88,
    description: 'Zesty electric lime fluff that kids love to toss and cuddle. Sized perfectly for little backpack pockets on trips.',
    features: ['Pocket-friendly mini size', 'Squishy squeeze rebound', 'Safe non-toxic dyes', 'Machine washable'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-teal-mayur',
    name: 'Mayur the Peacock Teal',
    subtitle: 'Jewel-Toned Majestic Plush',
    colourId: 'teal',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '3+',
    rating: 4.9,
    reviewCount: 210,
    isFestivePick: true,
    description: 'Shimmering peacock teal coat with aquatic highlights. Highly admired by parents for its artistic modern nursery look.',
    features: ['Sophisticated nursery palette', 'Zero dye bleed in laundry', 'Super-soft velour undertone', 'Hypoallergenic fill'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-hotpink-rani',
    name: 'Rani the Hot Pink Star',
    subtitle: 'Bold Indian Magenta Cuddle',
    colourId: 'hot-pink',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '3+',
    rating: 4.9,
    reviewCount: 345,
    isBestSeller: true,
    description: 'Rich royal rani pink that lights up the room. A favorite birthday gift and celebration return favor across Mumbai and Delhi.',
    features: ['Vibrant colorfast pigment', 'Tested according to BIS IS 9873', 'No small detachable components', 'Wash and air dry easily'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-peach-gulaabi',
    name: 'Gulaabi the Peach Whisper',
    subtitle: 'Ultra-Gentle Soothing Plush',
    colourId: 'peach',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 156,
    description: 'Subtle warm peach fur with marshmallow tips. Created in collaboration with pediatric sleep consultants for bedtime calm.',
    features: ['Sleep-association companion', 'No harsh dyes or perfumes', 'Tear-resistant stitching', 'Soft velour paws and cheeks'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-black-badal',
    name: 'Badal the Midnight Fluff',
    subtitle: 'Velvety Night Sky Guardian',
    colourId: 'black',
    defaultSize: 'Medium 25 cm',
    price: 899,
    originalPrice: 1299,
    ageGroup: '5+',
    rating: 4.8,
    reviewCount: 172,
    description: 'Charcoal and obsidian fur with deep gloss anime eyes. Resists everyday playground dust while staying ultra soft.',
    features: ['Great for messy toddlers', 'Hides dust & playroom scuffs', 'Safe reinforced stitching', 'Washable without fading'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  // Additional size variants and special editions to make 24 complete products
  {
    id: 'fp-mini-lavender',
    name: 'Lil Mochi (Mini Lavender)',
    subtitle: 'Pocket-Sized Bedtime Charm',
    colourId: 'lavender-purple',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.9,
    reviewCount: 220,
    isBestSeller: true,
    description: 'The pint-sized edition of our classic Lavender Mochi! Fits inside strollers, diaper bags, and tiny toddler palms.',
    features: ['Perfect travel companion', 'Fits in cup holders & strollers', 'Machine washable', 'Anti-choke design'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-jumbo-lavender',
    name: 'Big Mochi (Jumbo Lavender)',
    subtitle: 'Giant 40cm Snuggle Body Pillow',
    colourId: 'lavender-purple',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 5.0,
    reviewCount: 489,
    isBestSeller: true,
    isFestivePick: true,
    description: 'Our largest 40cm hug pillow! Heavy, extra squishy, and deeply calming for children (and parents) needing a comforting hug.',
    features: ['Massive 40 cm cuddle size', 'Sensory weighted feel (approx 1kg)', 'Washable removable outer jacket', 'Sturdy reinforced zipper'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-mini-bhalu',
    name: 'Chhotu Bhalu (Mini Brown)',
    subtitle: 'Pocket Storybook Bear',
    colourId: 'chocolate-brown',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.7,
    reviewCount: 134,
    description: 'Tiny brown forest cuddler with warm amber eyes. Built for preschool show-and-tell and bedtime holding.',
    features: ['Tear-proof seam testing', 'Non-toxic recycled polyester fill', 'Machine washable', 'Fits in small hands'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-mini-suraj',
    name: 'Little Suraj (Mini Yellow)',
    subtitle: 'Pocket Ray of Happiness',
    colourId: 'sunshine-yellow',
    defaultSize: 'Mini 15 cm',
    price: 399,
    originalPrice: 599,
    ageGroup: '2+',
    rating: 4.8,
    reviewCount: 104,
    isNew: true,
    description: 'A cheery little companion to accompany your child on school bus rides and weekend family outings.',
    features: ['Bright sensory stimulation', 'Lightweight 180g', 'Easy-clean microfiber', 'BPA & lead free'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-jumbo-mithai',
    name: 'Jumbo Mithai (Giant Pink Puff)',
    subtitle: 'Enormous 40cm Princess Cushion',
    colourId: 'bubblegum-pink',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 4.9,
    reviewCount: 302,
    isBestSeller: true,
    description: 'A colossal, cloud-like pink puff of joy. Transforms any nursery or playroom reading tent into a magical wonderland.',
    features: ['High-resilience rebound memory', 'Ultra-dense 64-layer fur feel', 'Child-safe certified materials', 'Gift-wrapped ready'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-jumbo-forest',
    name: 'Jumbo Vanraj (Giant Green Guardian)',
    subtitle: '40cm Gentle Giant of the Western Ghats',
    colourId: 'forest-green',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '5+',
    rating: 4.8,
    reviewCount: 198,
    description: 'An enormous forest-green gentle giant. Makes a cozy backrest for bedtime reading and imaginative jungle adventures.',
    features: ['Heavyweight plush comfort', 'High-density fiber core', 'Stain-resistant fabric', 'Reinforced bottom seam'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-jumbo-ruby',
    name: 'Grand Ruby (Jumbo Diwali Pick)',
    subtitle: '40cm Festive Luxury Centerpiece',
    colourId: 'ruby-red',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 5.0,
    reviewCount: 240,
    isFestivePick: true,
    description: 'The ultimate festival gift for kids and grandchildren. Deep festive ruby fur that looks royal under festive Diwali lights.',
    features: ['Comes with festive gold ribbon', 'Premium gift box packaging', 'Certified safe for all ages', 'Washable durable fur'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  },
  {
    id: 'fp-jumbo-snow',
    name: 'Jumbo Himmat (Giant Snow Cloud)',
    subtitle: '40cm Cloud of Pure Peace',
    colourId: 'snow-white',
    defaultSize: 'Jumbo 40 cm',
    price: 1999,
    originalPrice: 2799,
    ageGroup: '3+',
    rating: 4.8,
    reviewCount: 154,
    description: 'Like hugging a real, warm Himalayan snow cloud. Features stain-resistant fibers for easy washing.',
    features: ['Stain-guard wash formula', 'Machine washable outer layer', 'Hypoallergenic fill', 'Extra plush fiber pile'],
    dimensions: { mini: '15 x 14 x 14 cm', medium: '25 x 24 x 24 cm', jumbo: '40 x 38 x 38 cm' }
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductByColourId(colourId: string): Product | undefined {
  return PRODUCTS.find(p => p.colourId === colourId) || PRODUCTS[0];
}

export function getColourById(colourId: string): PlushColour {
  return PLUSH_COLOURS.find(c => c.id === colourId) || PLUSH_COLOURS[9]; // default Lavender
}
