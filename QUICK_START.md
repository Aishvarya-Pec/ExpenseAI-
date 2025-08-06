# ⚡ ExpenseAI - Quick Start Guide

## 🚀 Deploy in 3 Steps (Under 10 Minutes)

### Step 1: Extract & Setup
```bash
# Extract the zip file
unzip expenseai-deploy-ready.zip
cd project

# Install dependencies
npm install
```

### Step 2: Configure Environment
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your details:
# VITE_SUPABASE_URL=your-supabase-url
# VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 3: Deploy
```bash
# Option A: Run locally
npm run dev

# Option B: Build for production
npm run build
# Then upload 'dist' folder to any hosting service
```

## 🌐 Instant Deployment Options

### 1. Netlify (Drag & Drop)
1. Build: `npm run build`
2. Drag `dist` folder to [netlify.com](https://netlify.com)
3. Add environment variables in Netlify dashboard
4. Done! ✅

### 2. Vercel
1. Upload project folder to [vercel.com](https://vercel.com)
2. Framework: Vite
3. Build: `npm run build`
4. Output: `dist`

### 3. GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Source: GitHub Actions
3. Use Vite deployment action

## 🎯 What You Get

- ✅ **Professional ExpenseAI Application**
- ✅ **Beautiful Landing Page**
- ✅ **Complete Authentication System**
- ✅ **Modern Dashboard**
- ✅ **Responsive Design**
- ✅ **Interview-Ready Code**

## 📞 Need Help?

Check `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**Your professional expense tracking app is ready to impress! 🚀**