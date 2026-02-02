# LeetCode Public Badge Generator

🏆 **Generate and verify your LeetCode achievement badges!**

An independent tool for creating beautiful, shareable badges from your LeetCode profile. Prove ownership through our secure verification system.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-FF0055?logo=framer)

## ⚠️ Disclaimer

**This service is NOT affiliated with, endorsed by, or sponsored by LeetCode Inc.**

This project uses the original LeetCode badge GIFs solely for the purpose of enabling users to showcase their achievements. All other badge designs and site features are original creations. No official LeetCode logos or trademarks are used beyond the publicly available badge images.

---

## 🚀 Features

- **Ownership Verification** - Prove you own your LeetCode profile via bio challenge
- **Beautiful Animated Badges** - Stunning designs with Framer Motion animations
- **Easy Sharing** - Share on LinkedIn, GitHub, or embed anywhere
- **Trust Levels** - Self-declared vs Ownership Verified badges
- **Responsive Design** - Works on all devices
---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/leetcode-badge-generator.git
cd leetcode-badge-generator

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── BadgeRenderer.js
│   ├── TokenDisplay.js
│   └── VerificationStatus.js
├── pages/               # Page components
│   ├── HomePage.js
│   ├── VerifyPage.js
│   ├── BadgePage.js
│   ├── ProfilePage.js
│   └── AllBadgesPage.js
├── context/             # React Context
│   └── VerificationContext.js
├── data/                # Static data
│   └── badges.js
├── services/            # API services
│   └── api.js
├── App.js
└── index.js
```

## 🔐 Verification Flow

1. **Enter Username** - Provide your LeetCode username
2. **Get Token** - System generates unique token (e.g., `LCBADGE-A1B2C3D4`)
3. **Add to Bio** - Temporarily add token to your LeetCode profile bio
4. **Click Verify** - Click verify on our website & the system checks your profile for the token
5. **Get Verified!** - Remove token and enjoy verified badges

## 🔌 API Endpoints (Backend Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/verify/request` | Generate verification token |
| POST | `/verify/check` | Check token on LeetCode profile |
| GET | `/badge/:username/:badgeId` | Public badge page |
| GET | `/profile/:username` | User public info |

## 🛡️ Security Features

- Rate limiting (IP + username based)
- Token expiry (48 hours)
- One active token per user
- No password required
- Public data only

## 🎨 Tech Stack

- **Frontend**: React 18 + React Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context + LocalStorage

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ for the coding community
