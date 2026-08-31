# Pixelvault — Full-Stack 4K Wallpaper Marketplace & Community Platform

**Pixelvault** is a production-ready, full-stack wallpaper marketplace and digital asset platform built with React 19, TanStack Router, Vite SSR/CSR, Tailwind CSS v4, and Supabase.

---

## 🎨 Brand Identity & Design System

- **Primary Purple**: `#7C3AED` (Main accents, CTA buttons, active highlights)
- **Dark Purple**: `#5B21B6` (Hover states and active badges)
- **Light Purple**: `#EDE9FE` (Subtle badges and glow borders)
- **Main Background**: `#111111` (Dark-mode first architecture)
- **Card Background**: `#1A1A1A` (Rounded card components)
- **Secondary Text**: `#A1A1AA` (Subtle metadata and descriptors)

---

## 📁 Repository Structure

```
├── public/
│   ├── favicon.ico
│   ├── sitemap.xml          # Search engine sitemap
│   └── robots.txt           # Crawler index rules
├── src/
│   ├── assets/              # Core image assets
│   ├── components/
│   │   ├── site/            # Site components (Header, Footer, ImageCard, AuthModal, CollectionModal, ReportModal, ShareModal, BulkDownloadBar)
│   │   └── ui/              # Radix UI primitive UI components
│   ├── integrations/
│   │   └── supabase/        # Supabase SDK client & TypeScript database definitions
│   ├── lib/
│   │   ├── auth.tsx         # Global AuthProvider, session tracking & role hooks
│   │   ├── stripe.ts        # Server Stripe session helper
│   │   ├── stripe-webhook.ts# Server Stripe webhook event handler
│   │   ├── wallpapers.ts    # Wallpaper taxonomy, seed lists & resolution tools
│   │   └── supabase.ts      # Re-exported Supabase client
│   └── routes/              # TanStack Router page routes
│       ├── __root.tsx       # Root layout shell
│       ├── index.tsx        # Homepage
│       ├── browse.tsx       # Filterable Library
│       ├── search.tsx       # Dedicated Search page
│       ├── categories.tsx   # Categories Overview
│       ├── category.$slug.tsx# Category detail view
│       ├── wallpaper.$slug.tsx# Wallpaper details page
│       ├── collections.tsx  # Featured Public Collections
│       ├── collection.$slug.tsx# Collection detail & ZIP download
│       ├── creator.$username.tsx# Creator profile
│       ├── creator.dashboard.tsx# Creator studio
│       ├── dashboard.tsx    # User Dashboard
│       ├── upload.tsx       # Creator Upload Studio
│       ├── admin.tsx        # Admin Command Center
│       ├── pricing.tsx      # Membership Plans
│       ├── checkout.tsx     # Stripe Membership Checkout
│       ├── login.tsx        # Sign In
│       ├── register.tsx     # Account Creation
│       ├── forgot-password.tsx# Password Reset
│       ├── terms.tsx        # Terms of Service
│       ├── privacy.tsx      # Privacy Policy
│       ├── license.tsx      # Licensing Terms
│       └── copyright.tsx    # DMCA & Copyright Policy
└── supabase/
    └── migrations/          # Postgres SQL migrations & RLS policies
```

---

## 🔒 Security Architecture & RLS Policies

All database access is secured via Supabase Row-Level Security (RLS):

1. **`wallpapers`**:
   - `status = 'approved'` is required for public read access.
   - Creator submissions land as `status = 'pending'`.
   - RLS checks `author_id = auth.uid()` for pending status. Creators cannot set `status = 'approved'` directly.
   - Only staff (`is_staff(auth.uid())`) can update `status` to `'approved'` or `'rejected'`.
2. **`favorites` & `collections`**:
   - Users can only modify or view private collections where `user_id = auth.uid()`.
3. **`downloads` & `subscriptions`**:
   - Downloads and active subscriptions are private to `user_id = auth.uid()`.

---

## 💳 Stripe Integration Setup & Configuration

Pixelvault includes server-side Stripe integration code for processing paid memberships.

### How to Configure Stripe:
1. Create a [Stripe Account](https://stripe.com).
2. Go to **Developers → API Keys** and copy your **Secret Key** (`sk_test_...`).
3. Go to **Products** and create your membership plans:
   - **Premium Pro Monthly**: set price to `$12.00 / month` -> copy `Price ID` (`price_...`).
   - **Premium Pro Annual**: set price to `$108.00 / year` -> copy `Price ID` (`price_...`).
4. Go to **Developers → Webhooks** and add an endpoint URL (e.g. `https://your-domain.com/api/stripe-webhook`):
   - Listen for events:
     - `checkout.session.completed`
     - `invoice.paid`
     - `invoice.payment_failed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the **Signing Secret** (`whsec_...`).
5. Add keys to environment variables (or hosting platform secret settings):
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_ID_MONTHLY=price_...
   STRIPE_PRICE_ID_ANNUAL=price_...
   ```

---

## 📥 Bulk ZIP Download System

- **Client-Side Mode (`JSZip`)**: Bundles batches up to **25 images** or **150 MB** directly in browser memory.
- **Access Validation**: Validates user access for EVERY image in the selection before zipping.
- **Future Production Scaling**: For high-volume enterprise downloads (50+ 8K images), deploy a serverless edge function (`ReadableStream` ZIP server streaming directly from S3/R2 object storage).

---

## 🛠️ Development & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
