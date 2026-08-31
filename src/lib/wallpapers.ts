import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";
import w5 from "@/assets/w5.jpg";
import w6 from "@/assets/w6.jpg";

export type Wallpaper = {
  id?: string;
  slug: string;
  title: string;
  src: string;
  image_url?: string;
  storage_path?: string;
  width: number;
  height: number;
  category: string;
  categorySlug: string;
  tags: string[];
  premium: boolean;
  is_premium?: boolean;
  price: number | null;
  downloads: number;
  download_count?: number;
  views: number;
  view_count?: number;
  likes: number;
  like_count?: number;
  fileType: "JPG" | "PNG" | "WEBP";
  sizeMb: number;
  size_bytes?: number;
  license: string;
  author: { name: string; handle: string; role: string };
  addedAt: string;
  created_at?: string;
  status?: string;
};

export const wallpapers: Wallpaper[] = [
  {
    slug: "dawn-ridge-mist",
    title: "Dawn Ridge Mist",
    src: w1,
    width: 3840,
    height: 2160,
    category: "Nature",
    categorySlug: "nature",
    tags: ["mountains", "fog", "sunrise", "minimal", "landscape", "4k"],
    premium: false,
    price: null,
    downloads: 18420,
    views: 96210,
    likes: 3120,
    fileType: "JPG",
    sizeMb: 4.2,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Lina Farouk", handle: "linaf", role: "Landscape Photographer" },
    addedAt: "2026-08-21",
  },
  {
    slug: "neon-rain-district",
    title: "Neon Rain District",
    src: w2,
    width: 3840,
    height: 2160,
    category: "Urban",
    categorySlug: "urban",
    tags: ["cyberpunk", "neon", "city", "night", "rain", "4k"],
    premium: true,
    price: 12,
    downloads: 9210,
    views: 51890,
    likes: 4410,
    fileType: "JPG",
    sizeMb: 9.8,
    license: "Pixelvault Premium License — extended commercial rights",
    author: { name: "Kaito Mori", handle: "kaitom", role: "Digital Concept Artist" },
    addedAt: "2026-08-27",
  },
  {
    slug: "iridescent-film",
    title: "Iridescent Film",
    src: w3,
    width: 2560,
    height: 1440,
    category: "Abstract",
    categorySlug: "abstract",
    tags: ["macro", "bubble", "texture", "colorful", "dark", "3d"],
    premium: false,
    price: null,
    downloads: 12760,
    views: 44120,
    likes: 1980,
    fileType: "PNG",
    sizeMb: 6.1,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Ana Petrova", handle: "anap", role: "Macro Photographer" },
    addedAt: "2026-08-18",
  },
  {
    slug: "concrete-curve",
    title: "Concrete Curve",
    src: w4,
    width: 3840,
    height: 2160,
    category: "Architecture",
    categorySlug: "architecture",
    tags: ["brutalist", "minimal", "dusk", "concrete", "geometry", "architecture"],
    premium: true,
    price: 9,
    downloads: 5410,
    views: 28800,
    likes: 1450,
    fileType: "JPG",
    sizeMb: 7.4,
    license: "Pixelvault Premium License — extended commercial rights",
    author: { name: "Marco Silva", handle: "marcos", role: "Architectural Photographer" },
    addedAt: "2026-08-29",
  },
  {
    slug: "violet-nebula",
    title: "Violet Nebula",
    src: w5,
    width: 3840,
    height: 2160,
    category: "Space",
    categorySlug: "space",
    tags: ["nebula", "stars", "cosmos", "purple", "astro", "galaxy"],
    premium: false,
    price: null,
    downloads: 24310,
    views: 133400,
    likes: 6820,
    fileType: "JPG",
    sizeMb: 8.3,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Noor Hassan", handle: "noorh", role: "Astro Imager" },
    addedAt: "2026-08-24",
  },
  {
    slug: "midnight-monstera",
    title: "Midnight Monstera",
    src: w6,
    width: 2560,
    height: 1440,
    category: "Nature",
    categorySlug: "nature",
    tags: ["botanical", "leaves", "moody", "green", "dark", "plants"],
    premium: true,
    price: 7,
    downloads: 7820,
    views: 33920,
    likes: 2410,
    fileType: "JPG",
    sizeMb: 5.6,
    license: "Pixelvault Premium License — extended commercial rights",
    author: { name: "Elif Demir", handle: "elifd", role: "Still-life Artist" },
    addedAt: "2026-08-30",
  },
  {
    slug: "cyber-horizon-setup",
    title: "Cyber Horizon Setup",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Gaming",
    categorySlug: "gaming",
    tags: ["gaming", "setup", "rgb", "neon", "desk", "ultrawide"],
    premium: false,
    price: null,
    downloads: 15400,
    views: 84300,
    likes: 4120,
    fileType: "JPG",
    sizeMb: 6.8,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Alex Mercer", handle: "alexm", role: "Setup Designer" },
    addedAt: "2026-08-25",
  },
  {
    slug: "quantum-code-array",
    title: "Quantum Code Array",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Technology",
    categorySlug: "technology",
    tags: ["code", "matrix", "hacker", "cyber", "technology", "dark"],
    premium: true,
    price: 10,
    downloads: 11200,
    views: 67100,
    likes: 3890,
    fileType: "JPG",
    sizeMb: 7.1,
    license: "Pixelvault Premium License — extended commercial rights",
    author: { name: "Devin Vance", handle: "devinv", role: "Tech Artist" },
    addedAt: "2026-08-28",
  },
  {
    slug: "speed-noir-hypercar",
    title: "Speed Noir Hypercar",
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Cars & Automotive",
    categorySlug: "cars",
    tags: ["car", "hypercar", "speed", "porsche", "dark", "automotive"],
    premium: true,
    price: 15,
    downloads: 19800,
    views: 104500,
    likes: 7450,
    fileType: "JPG",
    sizeMb: 11.2,
    license: "Pixelvault Premium License — extended commercial rights",
    author: { name: "Lucas Rossi", handle: "lucasr", role: "Automotive Photographer" },
    addedAt: "2026-08-22",
  },
  {
    slug: "cherry-blossom-dream",
    title: "Cherry Blossom Dream",
    src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    width: 2560,
    height: 1440,
    category: "Anime & Digital Art",
    categorySlug: "anime",
    tags: ["anime", "japan", "blossom", "pink", "fantasy", "art"],
    premium: false,
    price: null,
    downloads: 21900,
    views: 112000,
    likes: 8300,
    fileType: "PNG",
    sizeMb: 8.9,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Yuki Tanaka", handle: "yukit", role: "Anime Illustrator" },
    addedAt: "2026-08-26",
  },
  {
    slug: "silent-apex-panther",
    title: "Silent Apex Panther",
    src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Wildlife & Animals",
    categorySlug: "animals",
    tags: ["panther", "black", "wildlife", "animal", "moody", "portrait"],
    premium: false,
    price: null,
    downloads: 14300,
    views: 79200,
    likes: 5210,
    fileType: "JPG",
    sizeMb: 6.4,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "David Atten", handle: "davida", role: "Wildlife Explorer" },
    addedAt: "2026-08-20",
  },
  {
    slug: "minimal-shadow-lines",
    title: "Minimal Shadow Lines",
    src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Minimal",
    categorySlug: "minimal",
    tags: ["minimal", "dark", "shadow", "line", "clean", "simple"],
    premium: false,
    price: null,
    downloads: 31200,
    views: 154000,
    likes: 9810,
    fileType: "JPG",
    sizeMb: 3.9,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Soren Kierk", handle: "sorenk", role: "Minimalist Artist" },
    addedAt: "2026-08-15",
  },
  {
    slug: "street-lights-bokeh",
    title: "Street Lights Bokeh",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
    width: 3840,
    height: 2160,
    category: "Photography",
    categorySlug: "photography",
    tags: ["photography", "bokeh", "lights", "night", "city", "35mm"],
    premium: false,
    price: null,
    downloads: 16800,
    views: 89400,
    likes: 4920,
    fileType: "JPG",
    sizeMb: 5.8,
    license: "Pixelvault Free License — commercial use allowed",
    author: { name: "Clara Vance", handle: "clarav", role: "Street Photographer" },
    addedAt: "2026-08-19",
  },
];


export const categories = [
  { slug: "nature", name: "Nature", count: 8420, cover: w1, description: "Breathtaking landscapes, mountains, and seascapes." },
  { slug: "urban", name: "Urban", count: 5130, cover: w2, description: "Cyberpunk streets, city skylines, and neon nights." },
  { slug: "abstract", name: "Abstract", count: 6940, cover: w3, description: "Fluid motions, geometric renders, and dynamic textures." },
  { slug: "architecture", name: "Architecture", count: 3110, cover: w4, description: "Brutalist geometry and iconic structural facades." },
  { slug: "space", name: "Space", count: 2270, cover: w5, description: "Cosmic nebulae, deep galaxy vistas, and starfields." },
  { slug: "minimal", name: "Minimal", count: 4890, cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80", description: "Clean dark tones, subtle lines, and focused aesthetics." },
  { slug: "technology", name: "Technology", count: 3450, cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", description: "Circuits, code matrices, and hardware concept art." },
  { slug: "cars", name: "Cars & Automotive", count: 2980, cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", description: "Hypercars, classic rides, and automotive design." },
  { slug: "anime", name: "Anime & Digital Art", count: 7120, cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80", description: "Anime vistas, digital illustrations, and character concepts." },
  { slug: "gaming", name: "Gaming & Setup", count: 5640, cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80", description: "RGB neon setups, game worlds, and ultra-wide renders." },
  { slug: "animals", name: "Wildlife & Animals", count: 3810, cover: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=1200&q=80", description: "Moody wildlife portraits and natural fauna closeups." },
  { slug: "photography", name: "Photography", count: 4290, cover: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", description: "Cinematic 35mm film photography and street shots." },
];

export const resolutionsFor = (w: number, h: number) => {
  const baseW = w || 3840;
  const baseH = h || 2160;
  return [
    { label: "Small (HD)", width: Math.round(baseW * 0.35), height: Math.round(baseH * 0.35) },
    { label: "Medium (FHD)", width: Math.round(baseW * 0.5), height: Math.round(baseH * 0.5) },
    { label: "Large (QHD)", width: Math.round(baseW * 0.75), height: Math.round(baseH * 0.75) },
    { label: "4K Original", width: baseW, height: baseH },
  ];
};

export const getWallpaper = (slug: string) => wallpapers.find((w) => w.slug === slug);

export const relatedTo = (item: Wallpaper) => {
  const sameCat = wallpapers.filter((w) => w.slug !== item.slug && (w.categorySlug === item.categorySlug || w.category === item.category));
  if (sameCat.length >= 3) return sameCat.slice(0, 3);
  return wallpapers.filter((w) => w.slug !== item.slug).slice(0, 3);
};

export const formatCount = (n: number | undefined) => {
  if (!n) return "0";
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
};
