# 🚀 Quick Start Guide

Get your portfolio website up and running in minutes!

## Table of Contents

1. [Local Development](#local-development)
2. [Customization](#customization)
3. [Deploy to Internet](#deploy-to-internet)
4. [Next Steps](#next-steps)

---

## Local Development

### Option 1: Open in Browser (Fastest)

1. Find `index.html` in the project folder
2. Double-click it
3. Your portfolio opens in your default browser
4. Done! ✅

### Option 2: Local Server (Recommended)

**Using Python:**
```bash
cd bass-mark01-Feb18
python -m http.server 8000
# Visit: http://localhost:8000
```

**Using Node.js:**
```bash
npx http-server
# Visit: http://localhost:8000
```

**Using Docker:**
```bash
docker-compose up -d
# Visit: http://localhost:8000
```

---

## Customization

### 1️⃣ Update Your Information

Edit `index.html` and find these sections:

**Hero Section:**
```html
<h1 class="hero-title">Hi, I'm <span class="highlight">Baskar</span></h1>
<p class="hero-subtitle">Laravel Web Developer | Aspiring Java Full Stack Developer</p>
```

**About Section:**
```html
<p class="lead">
    I'm a passionate Laravel web developer with <strong>4+ years of professional experience</strong>...
</p>
```

**Contact Information:**
```html
<p><a href="mailto:hello@baskar.dev">hello@baskar.dev</a></p>
<p><a href="tel:+919876543210">+91 98765 43210</a></p>
```

**Social Links:**
Replace URLs:
- `https://linkedin.com/in/baskar` → Your LinkedIn
- `https://github.com/baskar` → Your GitHub

### 2️⃣ Update Skills Section

Find skill progress bars and modify percentages:
```html
<div class="skill-progress" style="width: 95%"></div>
```

More skilled? Increase percentage. Learning? Decrease it.

### 3️⃣ Update Projects

Find the Projects section and update:

```html
<h3>Your Project Name</h3>
<p class="project-category">Category</p>
<p class="project-description">Description here...</p>

<div class="tech-stack">
    <span class="tech-badge">Technology1</span>
    <span class="tech-badge">Technology2</span>
</div>
```

### 4️⃣ Change Colors

Edit `css/styles.css` and modify CSS variables at the top:

```css
:root {
    --primary-color: #00d4ff;      /* Main accent color */
    --secondary-color: #ff006e;    /* Secondary color */
    --dark-bg: #0a0e27;            /* Background */
    --text-primary: #e8e8ff;       /* Main text */
}
```

Try these color combinations:
- **Blue Theme**: #0066ff, #00d4ff
- **Purple Theme**: #9c27b0, #e91e63
- **Green Theme**: #00a152, #26a69a

### 5️⃣ Add Contact Form

Currently, form shows a success message locally.

To actually receive emails, set up one of:
- **Formspree** (Easiest - 5 minutes)
- **EmailJS** (JavaScript-based)
- **Netlify Forms** (If using Netlify)

See `CONTACT_FORM_SETUP.html` for detailed instructions.

---

## Deploy to Internet

### Fastest Option: Netlify (Free)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "My portfolio"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository
   - Click "Deploy"

3. **Get Free Domain**
   - Your site is live at: `yourname.netlify.app`
   - (Optional) Add custom domain in settings

### Other Options:

| Service | Cost | Time | Link |
|---------|------|------|------|
| **Vercel** | Free | 5 min | [vercel.com](https://vercel.com) |
| **GitHub Pages** | Free | 5 min | [pages.github.com](https://pages.github.com) |
| **Docker** | $5-10/mo | 15 min | See DEPLOYMENT.md |
| **Web Hosting** | $5-30/mo | 30 min | See DEPLOYMENT.md |

**Best Choice:** Netlify or Vercel (completely free, automatic updates)

---

## Next Steps

### ✅ Before Going Live

- [ ] Update all your information
- [ ] Fix spelling and grammar
- [ ] Test on mobile phone
- [ ] Test all links work
- [ ] Set up contact form
- [ ] Add your profile photo (in assets folder)
- [ ] Update social media links

### 📈 After Deployment

- [ ] Test website on all browsers
- [ ] Add to Google Search Console
- [ ] Set up Google Analytics
- [ ] Share on LinkedIn and GitHub
- [ ] Update projects as you complete them
- [ ] Add new skills as you learn them

### 🎯 Additional Improvements

**Coming Soon:**
- Add a blog section
- Add testimonials section
- Add Google Analytics
- Add form backend
- Optimize for mobile (already done!)
- Add animations (already done!)
- Add dark mode toggle (can enhance)

---

## File Structure

```
Your Portfolio/
├── index.html              ← Main website
├── css/styles.css         ← Styling
├── js/script.js           ← Interactivity
├── assets/                ← Images & files
├── README.md              ← Documentation
├── DEPLOYMENT.md          ← Deploy instructions
├── QUICK_START.md         ← This file
├── Dockerfile             ← Docker config
├── docker-compose.yml     ← Docker setup
└── .htaccess              ← Apache config
```

---

## Troubleshooting

### Styles not loading?
- Clear browser cache: `Ctrl+Shift+Delete`
- Check file paths: `css/styles.css` and `js/script.js`
- Open DevTools: Press `F12` and check errors

### Not seeing changes?
- Hard refresh: `Ctrl+F5`
- Clear cache in DevTools
- Restart development server
- Check spelling of file names

### Mobile looks funny?
- The site is fully responsive!
- Resize browser window smaller
- Test on actual mobile phone
- Open DevTools and toggle "device toolbar"

### Form not working?
- Set up backend service (Formspree recommended)
- See `CONTACT_FORM_SETUP.html` for step-by-step
- Takes only 5 minutes!

---

## Common Customizations

### Change Email Address
Find in HTML:
```html
<a href="mailto:hello@baskar.dev">
```
Change to your email.

### Change Phone Number
Find in HTML:
```html
<a href="tel:+919876543210">
```
Change to your number.

### Change Section Names
Find in HTML:
```html
<li><a href="#about" class="nav-link">About</a></li>
```
Change "About" to whatever you want.

### Add New Social Link
Find social links section and copy:
```html
<a href="https://twitter.com/baskar" target="_blank">
    <i class="fab fa-twitter"></i>
</a>
```
Change URL and icon.

---

## Learning Resources

### Want to Customize More?

- **HTML Guide**: [MDN HTML Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS Guide**: [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **JavaScript Guide**: [MDN JS Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Want to Learn Web Development?

- **Free Courses**: [FreeCodeCamp](https://freecodecamp.org)
- **Interactive Learning**: [Codecademy](https://codecademy.com)
- **Documentation**: [MDN Web Docs](https://developer.mozilla.org)

---

## Need More Help?

### Check These Files

1. **README.md** - Complete documentation
2. **DEPLOYMENT.md** - Detailed deployment guide
3. **CONTACT_FORM_SETUP.html** - Form setup instructions
4. **index.html** - Website structure (HTML comments)
5. **css/styles.css** - Styling comments

### Common Issues

**Q: How do I add images?**  
A: Upload to `assets/` folder, then reference:
```html
<img src="assets/my-image.jpg" alt="Description">
```

**Q: How do I add a new section?**  
A: Copy an existing section in HTML, customize content.

**Q: How do I change fonts?**  
A: Edit CSS in `styles.css`:
```css
--font-family: 'Your Font', sans-serif;
```

**Q: Can I use this for a company?**  
A: Yes! It's free to use and modify.

---

## You're All Set! 🎉

Your portfolio is ready to showcase your skills to the world!

### Quick Checklist

- ✅ Project downloaded
- ✅ Opened in browser
- ✅ Updated information
- ✅ Customized colors
- ✅ Set up contact form
- ✅ Deploy to internet
- ✅ Share with world

---

**Happy coding!**

Last Updated: February 18, 2026
