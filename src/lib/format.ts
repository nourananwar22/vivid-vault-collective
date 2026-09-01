export const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;

export const formatPrice = (cents: number | null) =>
  cents == null ? "Free" : `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

export const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export const resolutionsFor = (w: number, h: number) =>
  [
    { label: "Small", factor: 0.25 },
    { label: "Medium", factor: 0.5 },
    { label: "Large", factor: 0.75 },
    { label: "Original", factor: 1 },
  ].map((s) => ({
    label: s.label,
    width: Math.round(w * s.factor),
    height: Math.round(h * s.factor),
  }));
