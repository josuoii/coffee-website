# 🔐 GitHub Authentication Required

## ⚠️ Status: Authentication Needed

Untuk push code ke GitHub, anda perlu authenticate terlebih dahulu.

---

## 🎯 PILIHAN AUTHENTICATION (Pilih Salah Satu)

### **Option 1: GitHub Desktop (PALING MUDAH)** ⭐ Recommended

1. **Download GitHub Desktop**:
   - Pergi ke: https://desktop.github.com/
   - Download dan install

2. **Login**:
   - Buka GitHub Desktop
   - File → Options → Accounts
   - Sign in dengan GitHub account

3. **Add Repository**:
   - File → Add Local Repository
   - Pilih folder: `c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website`
   - Click "Add Repository"

4. **Push**:
   - Click "Publish repository" atau "Push origin"
   - SIAP! ✅

---

### **Option 2: Personal Access Token (PAT)**

#### Step 1: Generate Token di GitHub

1. Pergi ke: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Isi maklumat:
   - **Note**: "Coffee Website Deployment"
   - **Expiration**: 90 days (atau No expiration)
   - **Scopes**: Tick ✅ `repo` (full control)
4. Click **"Generate token"**
5. **COPY TOKEN** (simpan dulu, nanti tak boleh tengok lagi!)

#### Step 2: Configure Git Credential

Jalankan command ni:

```bash
git config --global credential.helper manager-core
```

#### Step 3: Push dengan Token

Bila run `git push`, Git akan minta username & password:
- **Username**: `josuoii` (GitHub username anda)
- **Password**: `[PASTE TOKEN YANG ANDA COPY]` (bukan password GitHub!)

```bash
cd "c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website"
git push -u origin main
```

---

### **Option 3: SSH Key (Advanced)**

#### Step 1: Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Press Enter 3 kali (default location, no passphrase)

#### Step 2: Copy Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy output yang keluar

#### Step 3: Add ke GitHub

1. Pergi ke: https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: "Coffee Website PC"
4. Paste public key
5. Click **"Add SSH key"**

#### Step 4: Change Remote URL

```bash
cd "c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website"
git remote set-url origin git@github.com:josuoii/coffee-website.git
git push -u origin main
```

---

## 🚀 AFTER AUTHENTICATION

Lepas setup authentication (pilih mana-mana option atas), run:

```bash
cd "c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website"
git push -u origin main
```

Anda akan nampak output macam ni:

```
Enumerating objects: 120, done.
Counting objects: 100% (120/120), done.
Delta compression using up to 8 threads
Compressing objects: 100% (95/95), done.
Writing objects: 100% (120/120), 1.23 MiB | 2.45 MiB/s, done.
Total 120 (delta 15), reused 0 (delta 0)
To https://github.com/josuoii/coffee-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **SIAP!** Code dah ada di GitHub!

---

## 📊 Current Status

| Item | Status |
|------|--------|
| **Local Git Repo** | ✅ Ready |
| **Files Committed** | ✅ 116 files |
| **Remote Added** | ✅ https://github.com/josuoii/coffee-website.git |
| **Authentication** | ⏳ Pending |
| **Pushed to GitHub** | ⏳ Waiting |

---

## 🆘 Troubleshooting

### "Permission denied"
→ Authentication belum setup. Guna Option 1 (GitHub Desktop) paling mudah!

### "Repository not found"
→ Make sure repository https://github.com/josuoii/coffee-website exists

### "Failed to push"
→ Check internet connection
→ Make sure GitHub repository accessible

---

## 💡 RECOMMENDATION

**Saya recommend guna GitHub Desktop** (Option 1) sebab:
- ✅ Paling mudah, GUI-based
- ✅ Auto-handle authentication
- ✅ Visual interface untuk Git operations
- ✅ Built-in merge conflict resolver
- ✅ Free!

---

## 📞 Next Steps

1. **Setup authentication** (pilih option atas)
2. **Push ke GitHub**
3. **Verify** di https://github.com/josuoii/coffee-website
4. **Deploy ke Vercel** (automatic!)

Beritahu saya bila dah setup authentication, atau kalau ada masalah! 😊
