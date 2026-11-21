/**
 * GLAZE CRAFT - Artisan Donut Studio
 * Interactive Core Application Engine
 */

// --- Audio Synthesizer (Zero-dependency Web Audio API) ---
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  playCrunch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }
}

const sfx = new SoundFX();

// --- DONUT DATA REPOSITORY ---
const DONUTS = [
  {
    id: 'vanilla-og',
    name: 'The OG Bourbon Vanilla',
    category: 'classic',
    price: 3.75,
    tag: 'Bestseller',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: '24-hour slow-fermented brioche glazed in pure Madagascar bourbon vanilla bean with delicate crystallized sugar crust.',
    calories: 290,
    sweetness: 3,
    crunch: 2,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Creamy Vanilla', 'Toasted Butter', 'Subtle Bourbon Oak'],
    colors: {
      dough: '#F6C186',
      glaze: '#FDF0DB',
      glazeBorder: '#F3D9B5',
      topping: 'none',
      drizzle: 'none'
    }
  },
  {
    id: 'ruby-strawberry',
    name: 'Ruby Strawberry Shortcake',
    category: 'fruity',
    price: 4.65,
    tag: 'Signature',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    description: 'Wild Oregon strawberry reduction glaze, freeze-dried strawberry powder, and hand-piped vanilla bean mascarpone.',
    calories: 340,
    sweetness: 4,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Tart Berry', 'Velvety Cream', 'Fresh Strawberry Glaze'],
    colors: {
      dough: '#F6C186',
      glaze: '#FF5E8E',
      glazeBorder: '#E63973',
      topping: 'sprinkles',
      drizzle: '#FFFFFF'
    }
  },
  {
    id: 'midnight-ganache',
    name: 'Midnight Valrhona Ganache',
    category: 'chocolate',
    price: 4.75,
    tag: 'Chocoholic',
    badgeColor: 'bg-stone-800 text-amber-100 border-stone-700',
    description: 'Silky 72% Valrhona dark chocolate glaze topped with roasted Piedmont hazelnuts and crunchy roasted cacao nibs.',
    calories: 380,
    sweetness: 3,
    crunch: 4,
    allergens: ['Wheat / Gluten', 'Dairy', 'Tree Nuts (Hazelnuts)'],
    tastingNotes: ['Deep Bittersweet Cocoa', 'Toasted Nutty', 'Caramelized Nib Crunch'],
    colors: {
      dough: '#D28B45',
      glaze: '#3D1C12',
      glazeBorder: '#230E08',
      topping: 'nuts',
      drizzle: '#C68B59'
    }
  },
  {
    id: 'salted-caramel-pretzel',
    name: 'Salted Caramel Pretzel Crisp',
    category: 'classic',
    price: 4.50,
    tag: 'Staff Favorite',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Slow-cooked amber caramel glaze, crushed artisanal Bavarian pretzels, and crunchy flakes of Cornish sea salt.',
    calories: 360,
    sweetness: 4,
    crunch: 5,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Burnt Sugar', 'Buttery Salt', 'Snappy Pretzel Snap'],
    colors: {
      dough: '#F6C186',
      glaze: '#D97706',
      glazeBorder: '#B45309',
      topping: 'nuts',
      drizzle: '#3D1C12'
    }
  },
  {
    id: 'kyoto-matcha',
    name: 'Kyoto Ceremonial Matcha',
    category: 'special',
    price: 4.95,
    tag: 'Artisan',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    description: 'First-harvest Uji ceremonial matcha glaze, ivory white chocolate drizzle, and slivered Iranian green pistachios.',
    calories: 330,
    sweetness: 2,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Dairy', 'Tree Nuts (Pistachio)'],
    tastingNotes: ['Grassy Umami', 'Floral White Chocolate', 'Earthy Pistachio'],
    colors: {
      dough: '#F6C186',
      glaze: '#34D399',
      glazeBorder: '#059669',
      topping: 'nuts',
      drizzle: '#FFFFFF'
    }
  },
  {
    id: 'lemon-lavender',
    name: 'Meyer Lemon & French Lavender',
    category: 'fruity',
    price: 4.45,
    tag: 'Refreshing',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-200',
    description: 'Freshly zested Meyer lemon glaze kissed with organic Provence culinary lavender blossoms and lemon sugar crystals.',
    calories: 295,
    sweetness: 3,
    crunch: 2,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Zesty Citrus', 'Subtle Floral Honey', 'Crisp Sugar Crackle'],
    colors: {
      dough: '#F6C186',
      glaze: '#FDE047',
      glazeBorder: '#EAB308',
      topping: 'none',
      drizzle: '#8B5CF6'
    }
  },
  {
    id: 'smoky-maple-bacon',
    name: 'Vermont Maple & Crisp Bacon',
    category: 'special',
    price: 4.95,
    tag: 'Cult Hit',
    badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
    description: 'Pure Grade-A Vermont maple glaze topped with thick-cut applewood smoked bacon pieces candied in brown sugar.',
    calories: 410,
    sweetness: 4,
    crunch: 4,
    allergens: ['Wheat / Gluten', 'Dairy', 'Pork'],
    tastingNotes: ['Smoky Maple Syrupy', 'Savory Bacon', 'Sweet & Salty Bliss'],
    colors: {
      dough: '#E8A766',
      glaze: '#B45309',
      glazeBorder: '#78350F',
      topping: 'bacon',
      drizzle: '#D97706'
    }
  },
  {
    id: 'ube-coconut-vegan',
    name: 'Ube Velvet Dream (100% Vegan)',
    category: 'special',
    price: 4.65,
    tag: 'Vegan Friendly',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    description: 'Silky Philippine purple yam glaze over organic oat-milk brioche, crowned with toasted organic coconut snowflakes.',
    calories: 310,
    sweetness: 3,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Coconut'],
    tastingNotes: ['Earthy Sweet Potato', 'Mellow Vanilla Cream', 'Nutty Toasted Coconut'],
    colors: {
      dough: '#F6C186',
      glaze: '#9333EA',
      glazeBorder: '#6B21A8',
      topping: 'coconut',
      drizzle: '#FFFFFF'
    }
  },
  {
    id: 'cinnamon-churro',
    name: 'Cinnamon Churro Dulce Drop',
    category: 'classic',
    price: 4.35,
    tag: 'Warm Favorite',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Crisp fried exterior dusted in cinnamon and raw cane sugar, filled with molten argentinian dulce de leche.',
    calories: 350,
    sweetness: 5,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Warm Cinnamon Spice', 'Milky Caramel Toffee', 'Crispy Dough'],
    colors: {
      dough: '#E19955',
      glaze: '#C27837',
      glazeBorder: '#96551E',
      topping: 'none',
      drizzle: '#D97706'
    }
  },
  {
    id: 'blueberry-cheesecake',
    name: 'Blueberry Graham Cheesecake',
    category: 'fruity',
    price: 4.80,
    tag: 'Seasonal',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    description: 'Wild Maine blueberry glaze with buttery spiced graham cracker crumble and a dollop of cream cheese frosting.',
    calories: 375,
    sweetness: 4,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Juicy Dark Berry', 'Buttery Honey Graham', 'Tangy Cream Cheese'],
    colors: {
      dough: '#F6C186',
      glaze: '#4338CA',
      glazeBorder: '#312E81',
      topping: 'nuts',
      drizzle: '#FFFFFF'
    }
  },
  {
    id: 'espresso-brownie',
    name: 'Espresso Brownie Blitz',
    category: 'chocolate',
    price: 4.85,
    tag: 'Perk Up',
    badgeColor: 'bg-stone-200 text-stone-900 border-stone-300',
    description: 'Single-origin Ethiopian espresso infused chocolate glaze with chewy fudge brownie chunks and cocoa powder sprinkle.',
    calories: 390,
    sweetness: 3,
    crunch: 3,
    allergens: ['Wheat / Gluten', 'Dairy', 'Eggs'],
    tastingNotes: ['Dark Roasted Coffee', 'Gooey Fudge Brownie', 'Velvety Cocoa'],
    colors: {
      dough: '#C57E3B',
      glaze: '#2E1A11',
      glazeBorder: '#1A0C06',
      topping: 'chocolate-chips',
      drizzle: '#78350F'
    }
  },
  {
    id: 'gold-hazelnut-truffle',
    name: '24K Gold Hazelnut Truffle',
    category: 'special',
    price: 5.50,
    tag: 'VIP Luxury',
    badgeColor: 'bg-yellow-200 text-yellow-900 border-yellow-400',
    description: 'Golden caramelized hazelnut praline glaze, dark gianduja truffle center, and shimmering 24K edible gold leaf flakes.',
    calories: 420,
    sweetness: 4,
    crunch: 4,
    allergens: ['Wheat / Gluten', 'Dairy', 'Tree Nuts (Hazelnuts)'],
    tastingNotes: ['Praline Cream', 'Rich Hazelnut Gianduja', 'Silky Chocolate Truffle'],
    colors: {
      dough: '#F6C186',
      glaze: '#D97706',
      glazeBorder: '#92400E',
      topping: 'gold',
      drizzle: '#3D1C12'
    }
  }
];

// --- SVG DONUT RENDERER HELPER ---
function renderDonutSVG({ dough = '#F6C186', glaze = '#FF5E8E', glazeBorder = '#E63973', topping = 'sprinkles', drizzle = 'none', size = 160 }) {
  // Deterministic scatter for toppings
  let toppingsSVG = '';
  
  if (topping === 'sprinkles') {
    const sprinkleColors = ['#FFFFFF', '#FDE047', '#38BDF8', '#4ADE80', '#F43F5E', '#C084FC'];
    const sprinkleCoords = [
      { x: 50, y: 35, rot: 25, c: 0 },
      { x: 75, y: 25, rot: -15, c: 1 },
      { x: 105, y: 30, rot: 45, c: 2 },
      { x: 125, y: 55, rot: -30, c: 3 },
      { x: 135, y: 85, rot: 20, c: 4 },
      { x: 130, y: 115, rot: -40, c: 5 },
      { x: 110, y: 135, rot: 15, c: 0 },
      { x: 80, y: 140, rot: -25, c: 1 },
      { x: 50, y: 130, rot: 35, c: 2 },
      { x: 30, y: 105, rot: -10, c: 3 },
      { x: 25, y: 75, rot: 50, c: 4 },
      { x: 35, y: 50, rot: -20, c: 5 },
      { x: 60, y: 45, rot: 10, c: 2 },
      { x: 115, y: 70, rot: -35, c: 0 },
      { x: 100, y: 120, rot: 40, c: 4 },
      { x: 45, y: 115, rot: -15, c: 1 }
    ];
    toppingsSVG = sprinkleCoords.map(s => `
      <rect x="${s.x - 4}" y="${s.y - 1.5}" width="8" height="3.5" rx="1.75" fill="${sprinkleColors[s.c]}" transform="rotate(${s.rot} ${s.x} ${s.y})" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.15))" />
    `).join('');
  } else if (topping === 'nuts') {
    const nutCoords = [
      { x: 52, y: 32, s: 5 }, { x: 80, y: 26, s: 6 }, { x: 112, y: 36, s: 4.5 },
      { x: 132, y: 68, s: 5.5 }, { x: 134, y: 98, s: 6 }, { x: 116, y: 130, s: 5 },
      { x: 78, y: 138, s: 5.5 }, { x: 44, y: 126, s: 6 }, { x: 28, y: 92, s: 4.5 },
      { x: 32, y: 62, s: 5 }, { x: 65, y: 42, s: 4 }, { x: 120, y: 110, s: 5 }
    ];
    toppingsSVG = nutCoords.map(n => `
      <polygon points="${n.x},${n.y - n.s} ${n.x + n.s},${n.y - 1} ${n.x + n.s * 0.7},${n.y + n.s} ${n.x - n.s * 0.8},${n.y + n.s * 0.6} ${n.x - n.s},${n.y - 2}" fill="#F4E2BB" stroke="#B8860B" stroke-width="0.8" />
    `).join('');
  } else if (topping === 'chocolate-chips') {
    const chipCoords = [
      { x: 55, y: 35 }, { x: 90, y: 26 }, { x: 118, y: 48 }, { x: 134, y: 85 },
      { x: 122, y: 122 }, { x: 75, y: 138 }, { x: 42, y: 120 }, { x: 26, y: 78 }
    ];
    toppingsSVG = chipCoords.map(c => `
      <circle cx="${c.x}" cy="${c.y}" r="4" fill="#2A150D" stroke="#5C341F" stroke-width="1.2" filter="drop-shadow(0 1px 1.5px rgba(0,0,0,0.3))" />
    `).join('');
  } else if (topping === 'bacon') {
    const baconPieces = [
      { x: 50, y: 35, rot: 15 }, { x: 85, y: 25, rot: -20 }, { x: 120, y: 45, rot: 40 },
      { x: 135, y: 88, rot: -10 }, { x: 115, y: 125, rot: 25 }, { x: 70, y: 138, rot: -30 },
      { x: 38, y: 115, rot: 10 }, { x: 28, y: 72, rot: -45 }
    ];
    toppingsSVG = baconPieces.map(b => `
      <rect x="${b.x - 5}" y="${b.y - 3}" width="10" height="5" rx="1.5" fill="#8B261E" stroke="#5C140F" stroke-width="0.8" transform="rotate(${b.rot} ${b.x} ${b.y})" />
    `).join('');
  } else if (topping === 'gold') {
    const goldStars = [
      { x: 55, y: 35, r: 4 }, { x: 88, y: 25, r: 5 }, { x: 122, y: 46, r: 4.5 },
      { x: 135, y: 88, r: 5 }, { x: 118, y: 125, r: 4 }, { x: 72, y: 138, r: 5 },
      { x: 36, y: 115, r: 4.5 }, { x: 28, y: 70, r: 4 }
    ];
    toppingsSVG = goldStars.map(g => `
      <polygon points="${g.x},${g.y - g.r} ${g.x + g.r * 0.3},${g.y - g.r * 0.3} ${g.x + g.r},${g.y} ${g.x + g.r * 0.3},${g.y + g.r * 0.3} ${g.x},${g.y + g.r} ${g.x - g.r * 0.3},${g.y + g.r * 0.3} ${g.x - g.r},${g.y} ${g.x - g.r * 0.3},${g.y - g.r * 0.3}" fill="#FFE600" stroke="#FFB800" stroke-width="0.5" filter="drop-shadow(0 0 3px rgba(255,215,0,0.8))" />
    `).join('');
  } else if (topping === 'coconut') {
    const flakes = [
      { x: 50, y: 35, rot: 30 }, { x: 80, y: 25, rot: -40 }, { x: 115, y: 40, rot: 15 },
      { x: 130, y: 75, rot: 60 }, { x: 125, y: 110, rot: -20 }, { x: 85, y: 135, rot: 45 },
      { x: 45, y: 125, rot: -30 }, { x: 30, y: 85, rot: 10 }
    ];
    toppingsSVG = flakes.map(f => `
      <path d="M ${f.x - 4} ${f.y} Q ${f.x} ${f.y - 3} ${f.x + 4} ${f.y}" stroke="#FFF8F0" stroke-width="2.2" stroke-linecap="round" fill="none" transform="rotate(${f.rot} ${f.x} ${f.y})" />
    `).join('');
  }

  // Drizzle path
  let drizzleSVG = '';
  if (drizzle && drizzle !== 'none') {
    drizzleSVG = `
      <path d="M 32 40 Q 50 18 80 40 T 130 50 Q 145 80 125 110 T 75 130 Q 40 135 35 100 T 45 60" 
            fill="none" 
            stroke="${drizzle}" 
            stroke-width="3" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            opacity="0.85"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))" />
    `;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 160 160" class="donut-svg-wrapper block select-none mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dough Gradients -->
        <radialGradient id="doughGrad_${size}" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#FFE7C9"/>
          <stop offset="70%" stop-color="${dough}"/>
          <stop offset="100%" stop-color="#C97F37"/>
        </radialGradient>
        
        <!-- Glaze Highlights -->
        <linearGradient id="glazeHighlight_${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45"/>
          <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.15"/>
        </linearGradient>

        <!-- Drop Shadow Filter -->
        <filter id="shadow_${size}" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" flood-opacity="0.22" flood-color="#4A2508"/>
        </filter>
      </defs>

      <!-- Donut Base Outer Body -->
      <path d="M 80 12 
               C 122 12, 148 38, 148 80 
               C 148 122, 122 148, 80 148 
               C 38 148, 12 122, 12 80 
               C 12 38, 38 12, 80 12 Z 
               M 80 54 
               C 66 54, 54 66, 54 80 
               C 54 94, 66 106, 80 106 
               C 94 106, 106 94, 106 80 
               C 106 66, 94 54, 80 54 Z"
            fill="url(#doughGrad_${size})"
            filter="url(#shadow_${size})" />

      <!-- Inner Hole Shadow -->
      <circle cx="80" cy="80" r="26" fill="none" stroke="#A86221" stroke-width="4" opacity="0.35" />

      <!-- Delicious Dripping Glaze Layer -->
      <path d="M 80 18 
               C 98 17, 118 20, 132 36 
               C 144 49, 144 65, 142 78 
               C 140 86, 133 93, 137 104 
               C 141 114, 136 126, 123 134 
               C 112 142, 98 138, 88 143 
               C 78 148, 66 142, 54 139 
               C 42 136, 28 132, 21 120 
               C 14 108, 22 96, 20 86 
               C 18 74, 17 60, 26 46 
               C 36 30, 58 19, 80 18 Z
               M 80 57 
               C 68 57, 57 68, 57 80 
               C 57 88, 63 94, 69 98 
               C 74 101, 86 102, 92 98 
               C 99 94, 103 87, 103 80 
               C 103 68, 92 57, 80 57 Z"
            fill="${glaze}" 
            stroke="${glazeBorder}" 
            stroke-width="1.5" />

      <!-- Glaze Gloss / Specular Shine Overlay -->
      <path d="M 45 28 
               C 65 19, 95 19, 115 28 
               C 123 33, 118 41, 108 38 
               C 90 32, 70 32, 52 38 
               C 42 41, 37 33, 45 28 Z" 
            fill="#FFFFFF" 
            opacity="0.45" />

      <!-- Subtle secondary reflection -->
      <path d="M 125 55 
               C 133 70, 133 85, 128 100 
               C 125 106, 118 104, 120 96 
               C 124 84, 124 72, 117 60 
               C 113 53, 120 48, 125 55 Z" 
            fill="#FFFFFF" 
            opacity="0.25" />

      <!-- Drizzle -->
      ${drizzleSVG}

      <!-- Crunchy Toppings -->
      ${toppingsSVG}
    </svg>
  `;
}

// --- STATE MANAGEMENT ---
const state = {
  cart: [], // items in box: { donutId, customData, count }
  boxLimit: 6,
  activeFilter: 'all',
  customDonut: {
    dough: '#F6C186',
    glaze: '#FF5E8E',
    glazeBorder: '#E63973',
    topping: 'sprinkles',
    drizzle: '#FFFFFF',
    doughName: 'Golden Brioche',
    glazeName: 'Wild Strawberry',
    toppingName: 'Rainbow Sprinkles',
    drizzleName: 'Vanilla Glaze'
  },
  promoApplied: false,
  deliveryMethod: 'delivery', // 'delivery' or 'pickup'
  activeModal: null
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  renderHeroDonut();
  renderMenuGrid();
  updateBoxUI();
  setupQuiz();
  setupCustomizer();
  setupSprinkleClicks();
  setupHotBatchCountdown();
  setupSoundToggle();
  setupZipChecker();
});

// --- HERO SECTION INTERACTIVE DONUT ---
function renderHeroDonut() {
  const container = document.getElementById('heroDonutContainer');
  if (!container) return;

  const flavors = [
    { name: 'Strawberry Rose', glaze: '#FF5E8E', border: '#E63973', topping: 'sprinkles', drizzle: '#FFFFFF' },
    { name: 'Belgian Dark Ganache', glaze: '#3D1C12', border: '#230E08', topping: 'nuts', drizzle: '#C68B59' },
    { name: 'Kyoto Matcha Green', glaze: '#34D399', border: '#059669', topping: 'coconut', drizzle: '#FFFFFF' },
    { name: 'Salted Caramel Gold', glaze: '#D97706', border: '#92400E', topping: 'gold', drizzle: '#3D1C12' },
    { name: 'Midnight Ube Velvet', glaze: '#9333EA', border: '#6B21A8', topping: 'coconut', drizzle: '#FFFFFF' }
  ];

  let currentFlavorIdx = 0;

  function updateHero() {
    const f = flavors[currentFlavorIdx];
    container.innerHTML = `
      <div class="relative flex flex-col items-center">
        <div class="animate-float">
          ${renderDonutSVG({
            dough: '#F6C186',
            glaze: f.glaze,
            glazeBorder: f.border,
            topping: f.topping,
            drizzle: f.drizzle,
            size: 260
          })}
        </div>
        <!-- Flavor Pill -->
        <div class="mt-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-pink-100 text-sm font-semibold text-gray-800">
          <span class="w-3 h-3 rounded-full" style="background-color: ${f.glaze}"></span>
          <span>Featured: ${f.name}</span>
        </div>
      </div>
    `;
  }

  updateHero();

  // Color Swatch buttons in Hero
  const swatchContainer = document.getElementById('heroSwatches');
  if (swatchContainer) {
    swatchContainer.innerHTML = flavors.map((f, idx) => `
      <button 
        onclick="selectHeroFlavor(${idx})" 
        class="w-8 h-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-125 focus:scale-125 focus:outline-none"
        style="background-color: ${f.glaze}"
        title="${f.name}">
      </button>
    `).join('');
  }

  window.selectHeroFlavor = (idx) => {
    currentFlavorIdx = idx;
    sfx.playPop();
    updateHero();
  };
}

// --- MENU GALLERY RENDERING ---
function renderMenuGrid() {
  const container = document.getElementById('menuGrid');
  if (!container) return;

  const filtered = state.activeFilter === 'all' 
    ? DONUTS 
    : DONUTS.filter(d => d.category === state.activeFilter);

  container.innerHTML = filtered.map(donut => {
    return `
      <div class="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col justify-between group">
        <div>
          <!-- Card Header & Badge -->
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold px-3 py-1 rounded-full border ${donut.badgeColor}">
              ${donut.tag}
            </span>
            <span class="text-xs text-stone-600 font-medium">${donut.calories} kcal</span>
          </div>

          <!-- Donut SVG Illustration -->
          <div class="py-4 relative flex justify-center group-hover:scale-105 transition-transform duration-300 cursor-pointer" onclick="openQuickView('${donut.id}')">
            ${renderDonutSVG({
              dough: donut.colors.dough,
              glaze: donut.colors.glaze,
              glazeBorder: donut.colors.glazeBorder,
              topping: donut.colors.topping,
              drizzle: donut.colors.drizzle,
              size: 150
            })}
          </div>

          <!-- Title & Description -->
          <h3 class="text-xl font-bold text-stone-800 font-display mb-1.5 cursor-pointer hover:text-pink-600 transition-colors" onclick="openQuickView('${donut.id}')">
            ${donut.name}
          </h3>
          <p class="text-stone-700 text-xs line-clamp-2 mb-4 leading-relaxed">
            ${donut.description}
          </p>

          <!-- Tasting Notes Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${donut.tastingNotes.map(n => `<span class="bg-stone-100 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded-md">${n}</span>`).join('')}
          </div>
        </div>

        <!-- Footer: Price & Add Button -->
        <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] text-stone-600 uppercase tracking-wider font-semibold">Single</span>
            <span class="text-xl font-extrabold text-stone-900">$${donut.price.toFixed(2)}</span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              onclick="openQuickView('${donut.id}')" 
              class="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors" 
              title="Details & Allergens">
              <i data-lucide="info" class="w-4 h-4"></i>
            </button>
            <button 
              onclick="addToBox('${donut.id}')" 
              class="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs tracking-wide shadow-md shadow-pink-200 hover:shadow-pink-300 transition-all flex items-center gap-1.5 active:scale-95">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Add to Box</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Menu Category Filtering
window.filterCategory = (cat, btnEl) => {
  state.activeFilter = cat;
  sfx.playPop();

  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.remove('bg-pink-500', 'text-white', 'shadow-md');
    btn.classList.add('bg-stone-100', 'text-stone-600');
  });

  if (btnEl) {
    btnEl.classList.remove('bg-stone-100', 'text-stone-600');
    btnEl.classList.add('bg-pink-500', 'text-white', 'shadow-md');
  }

  renderMenuGrid();
};

// --- BOX & CART MANAGEMENT ---
window.addToBox = (donutId) => {
  const donut = DONUTS.find(d => d.id === donutId);
  if (!donut) return;

  const totalInBox = state.cart.reduce((sum, item) => sum + item.count, 0);

  if (totalInBox >= state.boxLimit) {
    showToast(`Your 6-pack box is full! You can proceed to checkout or remove items in the cart drawer.`, 'warning');
    openCartDrawer();
    return;
  }

  const existing = state.cart.find(item => item.donutId === donutId);
  if (existing) {
    existing.count += 1;
  } else {
    state.cart.push({
      donutId: donut.id,
      donutObj: donut,
      count: 1
    });
  }

  sfx.playPop();
  showToast(`Added 1x ${donut.name} to your box! 🍩`, 'success');
  updateBoxUI();
};

window.removeOneFromBox = (donutId) => {
  const existing = state.cart.find(item => item.donutId === donutId);
  if (!existing) return;

  sfx.playPop();
  if (existing.count > 1) {
    existing.count -= 1;
  } else {
    state.cart = state.cart.filter(item => item.donutId !== donutId);
  }
  updateBoxUI();
};

window.clearBox = () => {
  state.cart = [];
  sfx.playPop();
  updateBoxUI();
  showToast('Cleared your donut box.', 'info');
};

function updateBoxUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.count, 0);
  
  // Update header badges
  const badgeCounts = document.querySelectorAll('.cart-count-badge');
  badgeCounts.forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });

  // Update floating bar status if exists
  const barProgress = document.getElementById('boxProgressText');
  if (barProgress) {
    barProgress.textContent = `${totalCount} of ${state.boxLimit} Slots Filled`;
  }

  const barFill = document.getElementById('boxProgressBar');
  if (barFill) {
    const pct = Math.min((totalCount / state.boxLimit) * 100, 100);
    barFill.style.width = `${pct}%`;
  }

  // Update 6-pack visual tray in Builder section
  renderBoxSlots(totalCount);

  // Update Drawer view
  renderDrawerItems();
}

function renderBoxSlots(totalCount) {
  const tray = document.getElementById('boxTraySlots');
  if (!tray) return;

  // Flatten items list for slots
  const flatDonuts = [];
  state.cart.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      flatDonuts.push(item.donutObj || item.customData);
    }
  });

  let html = '';
  for (let slot = 0; slot < state.boxLimit; slot++) {
    const item = flatDonuts[slot];
    if (item) {
      const colors = item.colors || item;
      html += `
        <div class="donut-slot filled p-2 flex flex-col items-center justify-center relative group shadow-sm bg-pink-50/50">
          <div class="scale-90 transition-transform group-hover:scale-100">
            ${renderDonutSVG({
              dough: colors.dough,
              glaze: colors.glaze,
              glazeBorder: colors.glazeBorder || colors.glaze,
              topping: colors.topping,
              drizzle: colors.drizzle,
              size: 65
            })}
          </div>
          <span class="text-[10px] font-bold text-stone-800 text-center line-clamp-1 mt-1">${item.name}</span>
          <button 
            onclick="removeOneFromBox('${item.id || 'custom'}')" 
            class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
            title="Remove">
            ×
          </button>
        </div>
      `;
    } else {
      html += `
        <div class="donut-slot p-2 flex flex-col items-center justify-center text-stone-300">
          <i data-lucide="circle-dashed" class="w-8 h-8 stroke-1"></i>
          <span class="text-[10px] font-semibold text-stone-400 mt-1">Slot ${slot + 1}</span>
        </div>
      `;
    }
  }

  tray.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function renderDrawerItems() {
  const container = document.getElementById('drawerCartItems');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 px-4">
        <div class="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-400">
          <i data-lucide="shopping-bag" class="w-10 h-10"></i>
        </div>
        <p class="font-display font-semibold text-stone-700 text-lg">Your box is empty!</p>
        <p class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">Browse our artisanal flavors or build your custom donut to start filling your 6-pack.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    updateCheckoutPricing(0);
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.cart.map(item => {
    const donut = item.donutObj || item.customData;
    const itemTotal = donut.price * item.count;
    subtotal += itemTotal;
    const colors = donut.colors || donut;

    return `
      <div class="flex items-center gap-3 p-3 bg-white rounded-2xl border border-stone-100 shadow-sm">
        <div class="w-14 h-14 flex-shrink-0 flex items-center justify-center">
          ${renderDonutSVG({
            dough: colors.dough,
            glaze: colors.glaze,
            glazeBorder: colors.glazeBorder || colors.glaze,
            topping: colors.topping,
            drizzle: colors.drizzle,
            size: 55
          })}
        </div>
        <div class="flex-grow min-w-0">
          <h4 class="font-bold text-stone-800 text-sm truncate">${donut.name}</h4>
          <span class="text-xs text-stone-500">$${donut.price.toFixed(2)} each</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="removeOneFromBox('${donut.id || 'custom'}')" class="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs">-</button>
          <span class="text-xs font-bold text-stone-800 w-4 text-center">${item.count}</span>
          <button onclick="addToBox('${donut.id || 'custom'}')" class="w-7 h-7 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-xs">+</button>
        </div>
        <div class="text-right w-16">
          <span class="font-extrabold text-stone-800 text-sm">$${itemTotal.toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join('');

  updateCheckoutPricing(subtotal);
  if (window.lucide) window.lucide.createIcons();
}

function updateCheckoutPricing(subtotal) {
  const totalCount = state.cart.reduce((sum, item) => sum + item.count, 0);

  // 10% discount if full 6-pack box
  let discount = 0;
  const isBoxFull = totalCount >= state.boxLimit;
  if (isBoxFull) {
    discount += subtotal * 0.10;
  }

  // Promo code discount
  if (state.promoApplied) {
    discount += 3.50; // $3.50 off promo
  }

  const deliveryFee = state.deliveryMethod === 'delivery' ? (subtotal > 20 ? 0 : 3.99) : 0;
  const tax = (subtotal - discount) * 0.0825; // 8.25% sales tax
  const total = Math.max(0, subtotal - discount + tax + deliveryFee);

  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const deliveryEl = document.getElementById('cartDelivery');
  const taxEl = document.getElementById('cartTax');
  const totalEl = document.getElementById('cartTotal');
  const discountRow = document.getElementById('cartDiscountRow');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  if (discountRow) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      discountEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  const boxBonusBadge = document.getElementById('boxBonusAlert');
  if (boxBonusBadge) {
    if (isBoxFull) {
      boxBonusBadge.classList.remove('hidden');
    } else {
      boxBonusBadge.classList.add('hidden');
    }
  }
}

// Drawer Visibility
window.openCartDrawer = () => {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
};

window.closeCartDrawer = () => {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

window.setDeliveryMethod = (method) => {
  state.deliveryMethod = method;
  sfx.playPop();

  const delBtn = document.getElementById('btnDelivery');
  const pickBtn = document.getElementById('btnPickup');

  if (method === 'delivery') {
    delBtn.classList.add('bg-pink-500', 'text-white');
    delBtn.classList.remove('bg-stone-100', 'text-stone-600');
    pickBtn.classList.remove('bg-pink-500', 'text-white');
    pickBtn.classList.add('bg-stone-100', 'text-stone-600');
  } else {
    pickBtn.classList.add('bg-pink-500', 'text-white');
    pickBtn.classList.remove('bg-stone-100', 'text-stone-600');
    delBtn.classList.remove('bg-pink-500', 'text-white');
    delBtn.classList.add('bg-stone-100', 'text-stone-600');
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.donutObj || item.customData).price * item.count, 0);
  updateCheckoutPricing(subtotal);
};

window.applyPromoCode = () => {
  const input = document.getElementById('promoInput');
  const code = (input ? input.value : '').trim().toUpperCase();

  if (code === 'SWEET10' || code === 'FIRSTBITE' || code === 'DONUTLOVE') {
    state.promoApplied = true;
    sfx.playChime();
    showToast('Promo Code applied! $3.50 Sweet Discount added 🎉', 'success');
    const subtotal = state.cart.reduce((sum, item) => sum + (item.donutObj || item.customData).price * item.count, 0);
    updateCheckoutPricing(subtotal);
  } else {
    showToast('Invalid code. Try "SWEET10" or "FIRSTBITE"!', 'warning');
  }
};

// --- CUSTOM DONUT BUILDER ---
function setupCustomizer() {
  const previewContainer = document.getElementById('customDonutPreview');
  if (!previewContainer) return;

  function updateCustomDonutPreview() {
    previewContainer.innerHTML = `
      <div class="relative flex flex-col items-center">
        <div class="transition-transform duration-300 transform hover:scale-105">
          ${renderDonutSVG({
            dough: state.customDonut.dough,
            glaze: state.customDonut.glaze,
            glazeBorder: state.customDonut.glazeBorder,
            topping: state.customDonut.topping,
            drizzle: state.customDonut.drizzle,
            size: 220
          })}
        </div>
        <div class="mt-4 text-center">
          <p class="font-display font-bold text-stone-800 text-lg">${state.customDonut.glazeName} on ${state.customDonut.doughName}</p>
          <p class="text-xs text-stone-500">${state.customDonut.toppingName} • ${state.customDonut.drizzleName}</p>
        </div>
      </div>
    `;
  }

  window.setCustomDough = (doughColor, doughName) => {
    state.customDonut.dough = doughColor;
    state.customDonut.doughName = doughName;
    sfx.playPop();
    updateCustomDonutPreview();
  };

  window.setCustomGlaze = (glazeColor, borderColor, glazeName) => {
    state.customDonut.glaze = glazeColor;
    state.customDonut.glazeBorder = borderColor;
    state.customDonut.glazeName = glazeName;
    sfx.playPop();
    updateCustomDonutPreview();
  };

  window.setCustomTopping = (toppingType, toppingName) => {
    state.customDonut.topping = toppingType;
    state.customDonut.toppingName = toppingName;
    sfx.playCrunch();
    updateCustomDonutPreview();
  };

  window.setCustomDrizzle = (drizzleColor, drizzleName) => {
    state.customDonut.drizzle = drizzleColor;
    state.customDonut.drizzleName = drizzleName;
    sfx.playPop();
    updateCustomDonutPreview();
  };

  window.addCustomDonutToBox = () => {
    const totalInBox = state.cart.reduce((sum, item) => sum + item.count, 0);
    if (totalInBox >= state.boxLimit) {
      showToast('Your 6-pack box is already full! View box to checkout.', 'warning');
      openCartDrawer();
      return;
    }

    const customItem = {
      id: 'custom-' + Date.now(),
      name: `Custom: ${state.customDonut.glazeName}`,
      price: 4.85,
      colors: {
        dough: state.customDonut.dough,
        glaze: state.customDonut.glaze,
        glazeBorder: state.customDonut.glazeBorder,
        topping: state.customDonut.topping,
        drizzle: state.customDonut.drizzle
      }
    };

    state.cart.push({
      donutId: customItem.id,
      customData: customItem,
      count: 1
    });

    sfx.playChime();
    fireConfetti();
    showToast('Your custom masterpiece was added to the box! 🎨', 'success');
    updateBoxUI();
  };

  updateCustomDonutPreview();
}

// --- SOUL DONUT QUIZ ---
function setupQuiz() {
  const quizAnswers = {
    vibe: null,
    sweetness: null,
    crunch: null
  };

  window.selectQuizAnswer = (category, value, el) => {
    quizAnswers[category] = value;
    sfx.playPop();

    // Toggle button style within group
    const parent = el.closest('.quiz-group');
    if (parent) {
      parent.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('border-pink-500', 'bg-pink-50', 'text-pink-700');
        btn.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
      });
      el.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
      el.classList.add('border-pink-500', 'bg-pink-50', 'text-pink-700');
    }

    // Check if all answered
    if (quizAnswers.vibe && quizAnswers.sweetness && quizAnswers.crunch) {
      calculateQuizResult(quizAnswers);
    }
  };

  function calculateQuizResult(answers) {
    let bestMatch = DONUTS[0];

    if (answers.vibe === 'cozy') {
      bestMatch = DONUTS.find(d => d.id === 'cinnamon-churro') || DONUTS[0];
    } else if (answers.vibe === 'bold') {
      bestMatch = DONUTS.find(d => d.id === 'smoky-maple-bacon') || DONUTS[2];
    } else if (answers.vibe === 'fancy') {
      bestMatch = DONUTS.find(d => d.id === 'midnight-ganache') || DONUTS[4];
    } else if (answers.vibe === 'fruity') {
      bestMatch = DONUTS.find(d => d.id === 'ruby-strawberry') || DONUTS[1];
    }

    const resultBox = document.getElementById('quizResultContainer');
    if (!resultBox) return;

    sfx.playChime();
    resultBox.classList.remove('hidden');
    resultBox.innerHTML = `
      <div class="bg-gradient-to-r from-pink-50 to-amber-50 rounded-3xl p-6 border border-pink-200 flex flex-col md:flex-row items-center gap-6 shadow-md mt-6 animate-pulse-subtle">
        <div class="w-32 h-32 flex-shrink-0">
          ${renderDonutSVG({
            dough: bestMatch.colors.dough,
            glaze: bestMatch.colors.glaze,
            glazeBorder: bestMatch.colors.glazeBorder,
            topping: bestMatch.colors.topping,
            drizzle: bestMatch.colors.drizzle,
            size: 130
          })}
        </div>
        <div class="flex-grow text-center md:text-left">
          <span class="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">Your Soulmate Donut Match</span>
          <h4 class="text-2xl font-bold font-display text-stone-900 mt-2">${bestMatch.name}</h4>
          <p class="text-stone-600 text-xs mt-1 max-w-md">${bestMatch.description}</p>
          <div class="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span class="text-lg font-extrabold text-stone-900">$${bestMatch.price.toFixed(2)}</span>
            <button onclick="addToBox('${bestMatch.id}')" class="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i>
              Add My Match to Box
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// --- QUICK VIEW MODAL ---
window.openQuickView = (donutId) => {
  const donut = DONUTS.find(d => d.id === donutId);
  if (!donut) return;

  sfx.playPop();
  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6 items-center">
      <!-- Donut Visual -->
      <div class="w-48 h-48 flex-shrink-0 flex items-center justify-center">
        ${renderDonutSVG({
          dough: donut.colors.dough,
          glaze: donut.colors.glaze,
          glazeBorder: donut.colors.glazeBorder,
          topping: donut.colors.topping,
          drizzle: donut.colors.drizzle,
          size: 190
        })}
      </div>

      <!-- Info -->
      <div class="flex-grow">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-bold px-3 py-1 rounded-full border ${donut.badgeColor}">${donut.tag}</span>
          <span class="text-xs text-stone-500">${donut.category.toUpperCase()}</span>
        </div>
        <h3 class="text-2xl font-display font-bold text-stone-900 mb-2">${donut.name}</h3>
        <p class="text-stone-600 text-sm leading-relaxed mb-4">${donut.description}</p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl mb-4 border border-stone-100 text-center">
          <div>
            <span class="block text-[10px] text-stone-500 uppercase font-semibold">Calories</span>
            <span class="font-bold text-stone-800 text-sm">${donut.calories}</span>
          </div>
          <div>
            <span class="block text-[10px] text-stone-500 uppercase font-semibold">Sweetness</span>
            <span class="font-bold text-pink-500 text-sm">${'★'.repeat(donut.sweetness)}${'☆'.repeat(5 - donut.sweetness)}</span>
          </div>
          <div>
            <span class="block text-[10px] text-stone-500 uppercase font-semibold">Crunch</span>
            <span class="font-bold text-amber-500 text-sm">${'⚡'.repeat(donut.crunch)}</span>
          </div>
        </div>

        <!-- Allergens -->
        <div class="mb-4">
          <span class="text-xs font-bold text-stone-700 block mb-1">Contains Allergens:</span>
          <div class="flex flex-wrap gap-1.5">
            ${donut.allergens.map(a => `<span class="bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">${a}</span>`).join('')}
          </div>
        </div>

        <!-- Action -->
        <div class="flex items-center justify-between pt-3 border-t border-stone-100">
          <span class="text-2xl font-black text-stone-900">$${donut.price.toFixed(2)}</span>
          <button onclick="addToBox('${donut.id}'); closeQuickView();" class="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md transition-transform active:scale-95 flex items-center gap-2">
            <i data-lucide="plus" class="w-4 h-4"></i>
            Add to My Box
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  if (window.lucide) window.lucide.createIcons();
};

window.closeQuickView = () => {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
};

// --- CHECKOUT & CONFIRMATION ---
window.checkoutOrder = () => {
  const totalCount = state.cart.reduce((sum, item) => sum + item.count, 0);
  if (totalCount === 0) {
    showToast('Your box is empty! Add donuts before checking out.', 'warning');
    return;
  }

  sfx.playChime();
  fireConfetti();

  const receiptModal = document.getElementById('receiptModal');
  const receiptItems = document.getElementById('receiptItems');
  const receiptSubtotal = document.getElementById('receiptSubtotal');
  const receiptTotal = document.getElementById('receiptTotal');
  const orderIdEl = document.getElementById('receiptOrderId');

  if (orderIdEl) {
    orderIdEl.textContent = 'GC-' + Math.floor(100000 + Math.random() * 900000);
  }

  let subtotal = 0;
  if (receiptItems) {
    receiptItems.innerHTML = state.cart.map(item => {
      const d = item.donutObj || item.customData;
      const t = d.price * item.count;
      subtotal += t;
      return `
        <div class="flex justify-between py-1.5 text-xs text-stone-700">
          <span>${item.count}x ${d.name}</span>
          <span class="font-bold">$${t.toFixed(2)}</span>
        </div>
      `;
    }).join('');
  }

  const isBoxFull = totalCount >= state.boxLimit;
  let discount = isBoxFull ? subtotal * 0.1 : 0;
  if (state.promoApplied) discount += 3.50;
  const tax = (subtotal - discount) * 0.0825;
  const deliveryFee = state.deliveryMethod === 'delivery' ? (subtotal > 20 ? 0 : 3.99) : 0;
  const grandTotal = Math.max(0, subtotal - discount + tax + deliveryFee);

  if (receiptSubtotal) receiptSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (receiptTotal) receiptTotal.textContent = `$${grandTotal.toFixed(2)}`;

  closeCartDrawer();
  if (receiptModal) {
    receiptModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
};

window.closeReceiptModal = () => {
  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) {
    receiptModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
  // Clear cart on successful order
  state.cart = [];
  state.promoApplied = false;
  updateBoxUI();
};

// --- HOT BATCH COUNTDOWN TIMER ---
function setupHotBatchCountdown() {
  const timerEl = document.getElementById('hotBatchTimer');
  if (!timerEl) return;

  let secondsLeft = 14 * 60 + 28; // 14 mins 28 secs initial

  setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
    } else {
      secondsLeft = 15 * 60; // reset
      showToast('🔥 DING! A steaming hot batch just came out of the glaze bath!', 'success');
    }

    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

// --- ZIP CODE DELIVERY CHECKER ---
function setupZipChecker() {
  window.checkDeliveryZip = () => {
    const input = document.getElementById('zipInput');
    const result = document.getElementById('zipResult');
    if (!input || !result) return;

    const val = input.value.trim();
    if (!/^\d{5}$/.test(val)) {
      result.innerHTML = `<span class="text-xs font-semibold text-red-500">Please enter a valid 5-digit ZIP code (e.g. 90210, 10001).</span>`;
      return;
    }

    sfx.playPop();
    result.innerHTML = `
      <div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
          <i data-lucide="check" class="w-4 h-4"></i>
        </div>
        <div>
          <p class="text-xs font-bold text-emerald-900">Good news! You're in our Hot Donut Drop Zone 🚀</p>
          <p class="text-[11px] text-emerald-700">Estimated delivery: 25 - 35 mins from our artisan kitchen.</p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  };
}

// --- SPRINKLE CLICK BURST EFFECT ---
function setupSprinkleClicks() {
  const sprinkleColors = ['#FF5E8E', '#FDE047', '#38BDF8', '#4ADE80', '#A855F7', '#F97316'];

  document.addEventListener('click', (e) => {
    // Avoid triggering in inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    const count = 7;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'sprinkle-particle';

      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5);
      const distance = 40 + Math.random() * 55;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const rot = (Math.random() * 360) + 'deg';
      const color = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];

      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      particle.style.width = `${7 + Math.random() * 3}px`;
      particle.style.height = '3.5px';
      particle.style.backgroundColor = color;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--rot', rot);

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 900);
    }
  });
}

// --- SOUND TOGGLE ---
function setupSoundToggle() {
  window.toggleSound = () => {
    sfx.enabled = !sfx.enabled;
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      if (sfx.enabled) {
        btn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-pink-600"></i>`;
        sfx.playPop();
        showToast('Sound Effects: Enabled 🔊', 'info');
      } else {
        btn.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-stone-400"></i>`;
        showToast('Sound Effects: Muted 🔇', 'info');
      }
      if (window.lucide) window.lucide.createIcons();
    }
  };
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-stone-900 text-white'
  };

  toast.className = `flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold transform transition-all duration-300 translate-y-3 opacity-0 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  }, 10);

  // Animate out
  setTimeout(() => {
    toast.classList.add('translate-y-3', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- CONFETTI CANNON ---
function fireConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF5E8E', '#FDE047', '#38BDF8', '#4ADE80', '#A855F7']
    });
  }
}
