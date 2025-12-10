---
description: Deploy ke Vercel (Free)
---

# Deploy Coffee Website ke Vercel

## Prerequisites
1. Akaun GitHub (untuk push code)
2. Akaun Vercel (sign up free di vercel.com)

## Langkah-langkah Deployment

### 1. Prepare Project untuk Production

Pastikan project boleh build dengan jayanya:

```bash
cd c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website\frontend
npm run build
```

### 2. Setup Git Repository (jika belum)

```bash
cd c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website
git init
git add .
git commit -m "Initial commit - Coffee website ready for deployment"
```

### 3. Push ke GitHub

Buat repository baru di GitHub, kemudian:

```bash
git remote add origin https://github.com/[your-username]/[your-repo-name].git
git branch -M main
git push -u origin main
```

### 4. Deploy ke Vercel

**Pilihan A: Guna Vercel Dashboard (Paling Mudah)**
1. Pergi ke https://vercel.com
2. Sign in dengan GitHub
3. Click "Add New Project"
4. Import repository GitHub anda
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

**Pilihan B: Guna Vercel CLI**

Install Vercel CLI:
```bash
npm install -g vercel
```

Login ke Vercel:
```bash
vercel login
```

Deploy:
```bash
cd c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website\frontend
vercel
```

Ikut prompts:
- Set up and deploy? **Y**
- Which scope? (pilih account anda)
- Link to existing project? **N**
- What's your project's name? **coffee-website**
- In which directory is your code located? **.**
- Want to override settings? **Y**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Development Command: `npm run dev`

### 5. Deploy Production

Untuk production deployment:
```bash
vercel --prod
```

## Environment Variables (Jika Ada)

Jika ada API keys atau environment variables:
1. Pergi ke Vercel Dashboard
2. Pilih project anda
3. Settings → Environment Variables
4. Tambah variables yang diperlukan

## Custom Domain (Optional)

1. Pergi ke Vercel Dashboard
2. Pilih project anda
3. Settings → Domains
4. Tambah domain custom anda

## Auto-Deploy

Setiap kali anda push ke GitHub branch `main`, Vercel akan auto-deploy:
```bash
git add .
git commit -m "Update website"
git push
```

## Troubleshooting

### Build Error
- Check build logs di Vercel Dashboard
- Pastikan `npm run build` berjaya locally
- Check Node version compatibility

### 404 Errors on Refresh
Tambah `vercel.json` di root frontend folder:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables Not Working
- Pastikan prefix dengan `VITE_` untuk Vite projects
- Example: `VITE_API_URL` instead of `API_URL`
