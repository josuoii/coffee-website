# 🚀 CARA PUSH KE GITHUB (3 OPTIONS)

## ⚡ OPTION 1: GitHub Desktop (PALING MUDAH!) ⭐

### Download & Install:
1. **Download**: https://desktop.github.com/
2. **Install** (2 minit)
3. **Login** dengan account GitHub
4. **Add repository**: `c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website`
5. **Click "Commit to main"**
6. **Click "Push origin"**
7. **SIAP!** ✅

**Masa: 5-10 minit total**

---

## 🔑 OPTION 2: Personal Access Token (Command Line)

### Step 1: Generate Token di GitHub

1. **Pergi ke**: https://github.com/settings/tokens
2. **Login** kalau diminta
3. Click **"Generate new token"** → **"Generate new token (classic)"**
4. Isi form:
   - **Note**: `Coffee Website Deploy`
   - **Expiration**: `30 days` (atau pilih lain)
   - **Scopes**: Tick ✅ **`repo`** (full control of private repositories)
5. Scroll bawah, click **"Generate token"**
6. **COPY TOKEN** yang keluar (macam: `ghp_xxxxxxxxxxxxxxxxxxxx`)
   - ⚠️ **PENTING**: Token ni keluar sekali je! Simpan dulu!
   - Paste dalam Notepad untuk simpan sementara

### Step 2: Push Guna Token

Lepas dapat token, beritahu saya. Saya akan bagi command untuk run.

**ATAU** run command ni sendiri:

```powershell
cd "c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website"

# Push dengan token (ganti [TOKEN] dengan token anda)
git push https://[TOKEN]@github.com/josuoii/coffee-website.git main
```

**Contoh** (ganti `ghp_xxxxx` dengan token sebenar):
```powershell
git push https://ghp_1234567890abcdefghijklmnopqrstuvwxyz@github.com/josuoii/coffee-website.git main
```

---

## 🔐 OPTION 3: GitHub CLI (gh)

### Step 1: Install GitHub CLI

```powershell
# Install via winget
winget install --id GitHub.cli
```

### Step 2: Login & Push

```powershell
# Login
gh auth login

# Push
cd "c:\Users\hazim\OneDrive\Desktop\Project Kacip\coffee-website"
git push origin main
```

---

## 📊 COMPARISON

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| **GitHub Desktop** | ⭐ Easy | 5-10 min | Beginners |
| **Token** | ⭐⭐ Medium | 3-5 min | One-time push |
| **GitHub CLI** | ⭐⭐⭐ Advanced | 5 min | Developers |

---

## 💡 RECOMMENDATION

**Saya strongly recommend OPTION 1 (GitHub Desktop)** sebab:
- ✅ Paling mudah
- ✅ Visual interface
- ✅ No need token/password
- ✅ Boleh guna untuk future updates
- ✅ Built-in conflict resolver

---

## 🆘 KALAU NAK SAYA TOLONG PUSH GUNA TOKEN

Beritahu saya bila anda dah:
1. ✅ Generate token di https://github.com/settings/tokens
2. ✅ Copy token
3. ✅ Ready untuk paste

Saya akan bagi exact command untuk run!

---

## 📞 NEXT STEPS

**Pilih satu option atas**, then:

### If Option 1 (GitHub Desktop):
- Download & install
- Follow guide dalam `CARA_GUNA_GITHUB_DESKTOP.md`
- Beritahu bila siap!

### If Option 2 (Token):
- Generate token
- Beritahu saya
- Saya bagi command
- Run command
- SIAP!

### If Option 3 (GitHub CLI):
- Install gh
- Run commands atas
- SIAP!

---

**Apa pilihan anda?** 😊

Atau kalau anda dah ada token, beritahu saya sekarang!
