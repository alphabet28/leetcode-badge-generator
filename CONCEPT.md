# LeetCode Public Badge Generator - Concept Document

## 🎯 Purpose
An **independent** badge verification and sharing platform for LeetCode users. This tool allows users to verify ownership of their LeetCode profile and generate shareable, animated badges showcasing their achievements.

---

## 🔐 Verification Method: Ownership Challenge via Profile Bio

### How It Works:
1. **User enters LeetCode username**
2. **System generates a unique verification token** (e.g., `LCBADGE-a1b2c3d4`)
3. **User adds token to their LeetCode profile bio**
4. **System fetches profile and validates token presence**
5. **Upon success, user is marked as "Ownership Verified"**

---

## 🏅 Trust Levels

| Level | Name | Description | Badge Display |
|-------|------|-------------|---------------|
| 0 | **Self-Declared** | User claims badges without verification | Gray border, "Unverified" label |
| 1 | **Ownership Verified** | User proved profile ownership via bio challenge | Gold border, "✓ Verified" label |

---

## ⚠️ Disclaimer (Non-Affiliation)

> **IMPORTANT DISCLAIMER**
> 
> This service is **NOT affiliated with, endorsed by, or sponsored by LeetCode Inc.**
> 
> All badge designs are original creations inspired by LeetCode achievements.
> We do not use official LeetCode logos or trademarks.
> 
> Badge data is based on publicly available profile information.
> Verification confirms profile ownership only, not achievement authenticity.
> 
> LeetCode® is a registered trademark of LeetCode Inc.

---

## 📊 Supported Badge Categories

### 1. Annual Medals (Yearly Achievements)
- 50 Days Badge (2023-2025)
- 100 Days Badge (2023-2025)
- 200 Days Badge (2024)
- Annual Badge / 300 Days (2021-2024)

### 2. Competition Medals
- Guardian (Top 5%, rating ≥ 1600)
- Knight (Top 25%, rating ≥ 1600)

### 3. Daily Medals (Monthly Streaks)
- Monthly badges for completing daily challenges (Jan-Dec, 2021-2025)

### 4. Submission Days (Lifetime)
- 365 Days Badge
- 500 Days Badge
- 1000 Days Badge
- 2000 Days Badge

### 5. Study Plan Medals
- Introduction to Pandas, 30 Days of Pandas
- 30 Days of JavaScript
- Top Interview 150, LeetCode 75
- SQL 50, Advanced SQL 50
- Dynamic Programming, Graph Theory, Binary Search
- And many more...

---

## 🎨 Badge Design Principles

1. **Original Designs** - No LeetCode official assets
2. **Clear Attribution** - Always show username
3. **Verification Status** - Prominently displayed
4. **Year/Date Context** - When badge was earned
5. **Animated** - Subtle animations for engagement

---

## 🔒 Security & Integrity

- **Rate Limiting**: Prevent abuse (10 requests/minute per IP)
- **Token Expiry**: 48-hour validity
- **One Token Per User**: Single active verification at a time
- **No Data Storage**: Minimal personal data retention
- **Public Profiles Only**: Only access publicly visible data

---

## 📱 User Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Home      │────▶│  Verify      │────▶│  Copy Token     │
│   Page      │     │  Page        │     │  to Bio         │
└─────────────┘     └──────────────┘     └─────────────────┘
                                                  │
                                                  ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Share     │◀────│  Badge       │◀────│  Click Verify   │
│   Badge     │     │  Page        │     │  Button         │
└─────────────┘     └──────────────┘     └─────────────────┘
```

---

## 🛠️ Tech Stack (Simple)

- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **State**: React Context (no Redux needed)
- **Storage**: LocalStorage + JSON files (initially)
- **Deployment**: Vercel (free tier)

---

## 📅 Development Priority

1. ✅ Concept Document (this file)
2. 🔄 API Design & Mock Data
3. 🔄 Badge Renderer Component
4. 🔄 Verification Flow UI
5. 🔄 Public Badge Pages
6. 🔄 Backend Integration (later)

---

*Document Version: 1.0*
*Created: December 25, 2025*
