# 🛍️ Sela — Connecting Local Markets

An Algerian local marketplace platform built with Next.js 14, MongoDB Atlas, Gemini AI, and Cloudinary.
Sellers list products and customers order directly via WhatsApp.

---

## 🚀 Full Setup Guide (Step by Step)

### Step 0 — Prerequisites (install these first)

1. **Node.js 20+** → https://nodejs.org (download LTS)
   - Verify: `node -v` (should print v20.x.x)
2. **Git** → https://git-scm.com/downloads
   - Verify: `git --version`
3. **VS Code** (recommended) → https://code.visualstudio.com

---

### Step 1 — Create Accounts (all free)

#### 1a. MongoDB Atlas
1. Go to https://cloud.mongodb.com → Sign Up (free)
2. Create a **Free Cluster** (M0 tier, choose Frankfurt or Paris)
3. Create a **Database User**: Database Access → Add User
   - Username: `sela_user`, Password: (save it!)
4. Allow connections: Network Access → Add IP Address → **Allow from anywhere** (`0.0.0.0/0`)
5. Get your URI: Connect → Drivers → copy the string
   - Looks like: `mongodb+srv://sela_user:<password>@cluster0.xxxxx.mongodb.net/`

#### 1b. Google Gemini API
1. Go to https://aistudio.google.com/app/apikey
2. Click **Create API Key** → copy it

#### 1c. Cloudinary
1. Go to https://cloudinary.com → Sign Up (free)
2. Dashboard → copy **Cloud Name**, **API Key**, **API Secret**

#### 1d. Vercel
1. Go to https://vercel.com → Sign Up with GitHub
2. We'll deploy in Step 5

---

### Step 2 — Clone & Install

```bash
# Clone your repo
git clone https://github.com/Nadjiba-Rahal/sela-marketplace.git
cd sela-marketplace

# Install all dependencies
npm install
```

---

### Step 3 — Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Open `.env.local` and fill in all values:

```env
MONGODB_URI=mongodb+srv://sela_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/sela?retryWrites=true&w=majority
NEXTAUTH_SECRET=run_this_command_to_generate_one
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Sela
```

To generate `NEXTAUTH_SECRET`, run in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### Step 4 — Add Logo

Copy your `sela_logo.png` into the `public/` folder:
```bash
# Make sure the file is named exactly logo.png
cp /path/to/sela_logo.png public/logo.png
```

---

### Step 5 — Run Locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see Sela running! 🎉

---

### Step 6 — Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "feat: initial Sela marketplace setup"

# Create repo on GitHub: https://github.com/new
# Name it: sela-marketplace

git remote add origin https://github.com/Nadjiba-Rahal/sela-marketplace.git
git branch -M main
git push -u origin main
```

---

### Step 7 — Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository** → select `sela-marketplace`
3. In **Environment Variables**, add ALL the same values from `.env.local`
   - For `NEXTAUTH_URL`: use your Vercel domain, e.g. `https://sela-marketplace.vercel.app`
4. Click **Deploy** → wait ~2 minutes

Your site is live at `https://sela-marketplace.vercel.app` 🚀

---

### Step 8 — GitHub Actions Secrets

For the CI to work, add these secrets to your repo:
- GitHub repo → Settings → Secrets → Actions → New secret

| Secret name              | Value                |
|--------------------------|----------------------|
| MONGODB_URI              | your Atlas URI       |
| NEXTAUTH_SECRET          | your generated secret|
| GEMINI_API_KEY           | your Gemini key      |
| CLOUDINARY_CLOUD_NAME    | your cloud name      |
| CLOUDINARY_API_KEY       | your Cloudinary key  |
| CLOUDINARY_API_SECRET    | your Cloudinary secret|

---

## 📁 Project Structure

```
sela-marketplace/
├── public/
│   └── logo.png                    # Your Sela logo
├── src/
│   ├── app/
│   │   ├── page.tsx                # Home page
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles + brand tokens
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx      # Login page
│   │   │   └── register/page.tsx   # Registration page
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Seller dashboard
│   │   │   └── products/new/       # Add product (with AI)
│   │   └── api/
│   │       ├── auth/               # NextAuth + register
│   │       ├── products/           # CRUD products
│   │       ├── shops/              # CRUD shops
│   │       └── ai/generate/        # Gemini AI endpoint
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx         # Card with WhatsApp button
│   │   └── AIDescriptionGenerator.tsx
│   ├── constants/
│   │   ├── wilayas.ts              # All 58 Algerian wilayas
│   │   └── categories.ts          # 12 product categories
│   ├── lib/
│   │   ├── mongodb.ts              # DB connection
│   │   ├── gemini.ts               # AI product generator
│   │   └── cloudinary.ts          # Image upload
│   └── models/
│       ├── User.ts                 # Seller accounts
│       ├── Shop.ts                 # Shop model
│       └── Product.ts              # Product model
├── .env.example                    # Copy to .env.local
├── .gitignore                      # Excludes .env files
├── vercel.json                     # Vercel config
└── .github/workflows/ci.yml        # GitHub Actions CI
```

---

## 🔮 Phase 2 — Multi-tenant (Future)

The codebase is structured for easy white-labeling:
- Swap `NEXT_PUBLIC_APP_NAME` to any brand name
- Add a `tenant` field to Shop/Product models
- Route by subdomain (e.g. `brandname.sela.dz`)

---

## 🧰 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | Next.js 14, Tailwind CSS      |
| Auth        | NextAuth.js (JWT)             |
| Database    | MongoDB Atlas + Mongoose      |
| AI          | Google Gemini 1.5 Flash       |
| Images      | Cloudinary                    |
| Deployment  | Vercel                        |
| CI/CD       | GitHub Actions                |

---

## 📞 WhatsApp Integration

Products automatically generate a WhatsApp link:
```
https://wa.me/213XXXXXXXXX?text=Hi, I'm interested in your product: [Name] — listed on Sela 🛍️
```
No payment gateway needed — deals close on WhatsApp! 🇩🇿
