import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[#0D0D0D]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
                P
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">Pixelvault</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Free and premium high-resolution wallpapers in every display ratio. Download single images or bulk export full collections.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-white">Explore</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li><Link to="/browse" className="hover:text-white transition-colors">Browse Library</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">Featured Collections</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-white">Creators</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li><Link to="/upload" className="hover:text-white transition-colors">Submit Wallpapers</Link></li>
              <li><Link to="/creator/dashboard" className="hover:text-white transition-colors">Creator Studio</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Creator Monetization</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-white">Legal & Support</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li><Link to="/license" className="hover:text-white transition-colors">Licensing Terms</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/copyright" className="hover:text-white transition-colors">DMCA & Copyright</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Pixelvault Inc. All rights reserved.</p>
          <p className="text-[11px]">Dark Mode First · 4K & 8K Ultra High Resolution</p>
        </div>
      </div>
    </footer>
  );
}
