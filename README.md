# 💰 Spendy — Your Expenditure Partner

> A modern personal finance tracker built during the **National Agentic AI Hackathon 2025 — Track 2**, focused on simple money management, transaction tracking, financial visualization, and flexible browser-local to cloud data synchronization.

**Team:** Team A²  
**Team Leader & Developer:** Ahmad Ali  
**Event:** National Agentic AI Hackathon 2025 — Track 2

[🌐 Live Demo](https://spendy-expense-tracker.netlify.app) •
[📊 Pitch Deck](docs/Spendy_Pitch_Deck_Innovista.pptx) •
[📄 Project Document](docs/Spendy_Your_Expenditure_Partner_Document.pdf)

---

## 🎬 Preview

<p align="center">
  <img src="assets/spendy-preview.gif" alt="Spendy app preview" width="100%">
</p>

> The preview highlights Spendy's primary screens, including the dashboard, transaction management, statistics, and settings experience.

---

## 📌 Overview

**Spendy** is a responsive personal finance tracker designed to help users record income and expenses, categorize transactions, understand spending patterns, and monitor their overall financial activity through a clean and accessible interface.

The project was originally created during the **National Agentic AI Hackathon 2025** and was later refined into a working web application.

Spendy provides two approaches for storing financial information:

- **Browser-Local Mode** — start tracking immediately without creating an account.
- **Google Cloud Sync** — sign in with Google and synchronize financial records through Firebase Firestore.

The current version is deployed as a **web application**, so an internet connection is required to initially access the hosted website.

Although Browser-Local Mode stores transaction data inside the user's browser using `localStorage`, the current web version should **not be considered a fully offline application**.

A future native/mobile version could provide true offline availability by storing the application itself on the device and synchronizing with Firebase only when internet access is available.

---

## 🎯 The Problem

Managing money is a common challenge, particularly for students and young adults.

Personal finance habits are often not formally taught, and many people struggle to consistently answer simple questions such as:

- Where did my money go this month?
- How much did I spend on food, travel, or bills?
- How much income did I receive?
- What is my current balance?
- Which category consumes most of my spending?

As a university student, I observed this problem around me and wanted to create a simple solution that helps users better understand their financial activity without introducing unnecessary complexity.

---

## 💡 Our Approach

Spendy focuses on three main principles:

### 1. Simple Entry

Users can begin recording transactions without mandatory registration or complicated onboarding.

### 2. Useful Financial Visibility

Dashboard cards, statistics, charts, and transaction history help users understand where their money is going.

### 3. Optional Cloud Synchronization

Users who want cloud synchronization can authenticate using Google and store their financial records in Firebase Firestore.

This creates a natural progression:

```text
Start Locally
     ↓
Track Transactions
     ↓
Understand Spending
     ↓
Optionally Sign In
     ↓
Synchronize with Firebase
```

---

## ✨ Key Features

### 💳 Transaction Management

Spendy supports complete transaction management:

- Add income transactions
- Add expense transactions
- Edit existing transactions
- Delete transactions
- Select transaction dates
- Add optional notes
- Categorize transactions
- View transactions grouped chronologically
- Filter transactions by type
- Filter transactions by category

### Current Categories

- Food
- Travel
- Bills
- Shopping
- Salary
- Other

---

## 📊 Financial Dashboard

The dashboard dynamically calculates and displays:

- **Total Balance**
- **Total Income**
- **Total Expenses**
- **Recent Transactions**
- **Expense Overview**

This provides users with an immediate summary of their current financial position.

---

## 📈 Statistics & Financial Visualization

Spendy includes interactive financial visualizations such as:

- Income vs. Expense comparison
- Monthly financial trends
- Category spending breakdown
- Expense overview charts
- Donut / pie visualizations
- Category-based spending summaries

Charts are powered by **Recharts**.

---

## 💱 Multi-Currency Support

Spendy supports **166 world currencies**.

Examples include:

- **PKR** — Pakistani Rupee
- **USD** — US Dollar
- **EUR** — Euro
- **GBP** — British Pound
- **SAR** — Saudi Riyal
- **AED** — UAE Dirham
- and many more

Users can search for and select a preferred currency from the Settings screen.

The selected currency is persisted in browser storage and applied throughout financial values displayed by the application.

---

## 🔄 Browser-Local & Cloud Data Modes

### 🖥 Browser-Local Mode

Users can begin using Spendy without creating an account.

Transactions are stored inside:

```
window.localStorage
```

This provides:

- immediate access
- no mandatory registration
- browser-local transaction persistence
- fast transaction retrieval
- local control over records

### Important Note About Offline Usage

Browser-local storage does **not** mean the currently deployed web application is fully offline.

The hosted Spendy application still requires internet access to initially load through the browser.

Once the application is loaded, transaction information in Browser-Local Mode is managed locally inside that browser profile.

A future Android, iOS, desktop, or properly packaged offline application could provide complete offline availability.

---

### ☁️ Google Cloud Sync

Users can optionally choose **Sync with Google**.

Spendy then uses:

- Firebase Authentication
- Google Sign-In
- Cloud Firestore
- Firestore real-time listeners
- User-specific Firebase records

Existing browser-local transactions can be migrated into the authenticated user's Firestore account.

Cloud transactions are stored under a user-specific structure such as:

```
users/{uid}/transactions
```

Authentication and Firestore use the same Firebase application instance.

---

## 🔁 Data Flow

```
User Opens Spendy
        │
        ├── Browser-Local Mode
        │       │
        │       ├── No account required
        │       │
        │       └── Transactions stored in localStorage
        │
        └── Google Cloud Sync
                │
                ├── Google Authentication
                │
                ├── Existing local transactions checked
                │
                ├── Local records migrated when required
                │
                └── Real-time Firestore synchronization
```

---

## 🏆 Hackathon Context

| Field | Details |
| ---------------- | --------------------------------------------------- |
| **Event**        | National Agentic AI Hackathon 2025                  |
| **Track**        | Track 2                                             |
| **Project**      | Spendy — Your Expenditure Partner                   |
| **Team**         | Team A²                                             |
| **Team Leader**  | Ahmad Ali                                           |
| **Project Type** | Personal Finance / Expense Tracking Web Application |

Spendy began as a hackathon prototype focused on making personal financial tracking simpler and more accessible.

---

## 🚀 What Makes Spendy Different

### Zero-Friction Entry

Users can begin using the core financial tracking experience without first creating an account.

### Local-to-Cloud Upgrade Path

Users can start with browser-local storage and later choose Google authentication and Firebase synchronization.

### Financial Visualization

Instead of displaying only a transaction list, Spendy transforms financial information into charts, statistics, and dashboard summaries.

### Multi-Currency Support

The application supports users across a wide range of currencies while providing full support for **PKR** and many other major currencies.

### Clean Responsive Interface

Spendy includes:

- responsive navigation
- desktop sidebar
- mobile-friendly layout
- reusable interface components
- light and dark themes
- accessible dialogs and controls
- responsive statistics screens

---

## 🛠 Technology Stack

### Frontend & Framework

- **Next.js 15.3.8**
- **React 18.3.1**
- **TypeScript**
- **Next.js App Router**

### Styling & UI

- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Lucide React**
- **next-themes**

### Data Visualization

- **Recharts**

### Forms & Validation

- **React Hook Form**
- **Zod**

### Dates & Utilities

- **date-fns**
- **react-day-picker**

### Backend & Cloud

- **Firebase**
- **Firebase Authentication**
- **Google Sign-In**
- **Cloud Firestore**

### Data Persistence

- Browser `localStorage`
- Cloud Firestore
- Real-time Firestore synchronization

### AI / Experimental Foundation

- **Genkit**
- **Google GenAI / Gemini configuration**

> The Genkit/Gemini setup currently exists as an experimental/scaffolded foundation and is **not yet connected to the primary user-facing financial workflow**.

### Deployment & Version Control

- **Git**
- **GitHub**
- **Netlify**

---

## 🏗 Project Structure

```
Spendy/
│
├── assets/
│   └── spendy-preview.gif
│
├── docs/
│   ├── Spendy_Pitch_Deck_Innovista.pptx
│   └── Spendy_Your_Expenditure_Partner_Document.pdf
│
├── src/
│   │
│   ├── ai/
│   │   ├── dev.ts
│   │   └── genkit.ts
│   │
│   ├── app/
│   │   │
│   │   ├── (app)/
│   │   │   ├── dashboard/
│   │   │   ├── icon-options/
│   │   │   ├── settings/
│   │   │   ├── statistics/
│   │   │   ├── transactions/
│   │   │   ├── layout.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── logo.svg
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── statistics/
│   │   ├── transactions/
│   │   └── ui/
│   │
│   ├── context/
│   │   ├── data-sync.ts
│   │   ├── settings-context.tsx
│   │   └── transaction-context.tsx
│   │
│   ├── firebase/
│   │   ├── firestore/
│   │   ├── auth.ts
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── provider.tsx
│   │   └── user-service.ts
│   │
│   ├── hooks/
│   │
│   └── lib/
│       ├── currencies.ts
│       ├── data.ts
│       ├── types.ts
│       └── utils.ts
│
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 20.x or newer
- npm
- Git

---

### 1. Clone the Repository

```
git clone https://github.com/Ahmadali-dev375/Spendy-Expense-Tracker-Hackathon.git
```

---

### 2. Enter the Project Directory

```
cd Spendy-Expense-Tracker-Hackathon
```

---

### 3. Install Dependencies

```
npm install
```

---

### 4. Start the Development Server

```
npm run dev
```

Then open the local development URL displayed in your terminal.

The current development configuration uses port `9010` where specified by the project scripts.

---

## 📜 Available Scripts

### Development

```
npm run dev
```

Starts the Next.js development server.

### Production Build

```
npm run build
```

Creates the production application build.

### Production Server

```
npm run start
```

Runs the built application locally.

### Type Checking

```
npm run typecheck
```

Validates TypeScript types without emitting build files.

### Linting

```
npm run lint
```

Runs the configured lint checks.

---

## 📚 Hackathon Materials

The original project material is included directly inside this repository.

### 📊 Spendy Pitch Deck

[**Open / Download Spendy Pitch Deck**](docs/Spendy_Pitch_Deck_Innovista.pptx)

> GitHub may download the PowerPoint file instead of rendering it directly in the browser.

### 📄 Spendy Project Document

[**Open Spendy — Your Expenditure Partner Project Document**](docs/Spendy_Your_Expenditure_Partner_Document.pdf)

The PDF contains additional documentation related to the original hackathon project, concept, and presentation.

---

## 🔥 Firebase Studio & Development Process

During the hackathon, **Firebase Studio** was used to accelerate early prototyping, interface scaffolding, and initial application development.

This experience demonstrated both the potential and limitations of AI-assisted software engineering.

### Accelerated Development

Firebase Studio helped accelerate:

- early UI creation
- component scaffolding
- application structure
- initial Firebase integration
- prototype generation
- rapid experimentation

This reduced the time required to move from an initial concept to a functional prototype.

---

### Developer Oversight

AI-assisted scaffolding still required manual development, debugging, architecture decisions, and technical understanding.

Important work included:

- resolving Next.js App Router conflicts
- separating the landing page from the nested `(app)` application routes
- designing browser-local and Firestore data handling
- implementing local-to-cloud transaction migration
- correcting hydration and client-rendering issues
- managing dynamic chart components
- refining Firebase Authentication
- reviewing Firestore integration
- debugging synchronization behavior
- refining application state management
- reviewing TypeScript boundaries

---

### Moving Beyond Firebase Studio

After the Firebase Studio phase of the hackathon, the project was **moved onto my local development environment**.

I then continued working directly on the project from my own machine to:

- resolve remaining implementation issues
- debug Firebase conflicts
- verify the correct Firebase project configuration
- review authentication behavior
- improve local-to-cloud synchronization
- refine the user interface
- audit the project before public release
- prepare Git and GitHub version control
- review public-repository security
- configure Firebase security
- deploy the application through Netlify
- bring the hackathon prototype to a publicly accessible live version

This transition was important because it changed Spendy from an AI-assisted hackathon prototype into a project that could be independently maintained, reviewed, version-controlled, deployed, and showcased from my local development environment.

---

## ⚠️ Limitations

Spendy remains a hackathon-originated project and has several areas that can be expanded.

### Fixed Category Set

The current implementation contains six predefined categories:

```
Food
Travel
Bills
Shopping
Salary
Other
```

Future versions can support:

- more predefined categories
- custom user-created categories
- customizable category icons
- category colors
- category-specific budgets

---

### Single-Wallet Model

Spendy currently treats financial activity as one combined financial balance.

Future versions could support multiple wallets such as:

- Cash
- Bank accounts
- Easypaisa
- JazzCash
- Credit cards
- Savings accounts
- Multiple personal wallets

---

### Web-Based Availability

The currently deployed Spendy version is a web application.

An internet connection is therefore required to initially access:

```
https://spendy-expense-tracker.netlify.app
```

Browser-Local Mode stores transaction data locally once the application is being used, but this should not be confused with a fully offline-installed application.

A future native Android, iOS, desktop, or suitable PWA implementation could provide true offline availability.

---

### Static Comparison Metric

Some month-over-month comparison indicators currently use placeholder values rather than fully calculated historical comparisons.

This can be expanded into real financial trend analysis.

---

### AI Integration

Genkit and Gemini infrastructure exists as an experimental foundation, but AI-driven financial recommendations are not currently exposed as a production user feature.

---

### No Custom Budgets Yet

Users cannot currently define:

- monthly category budgets
- spending caps
- financial goals
- savings targets
- budget alerts

These are potential future improvements.

---

## 🗺 Roadmap

Potential future improvements include:

- Custom transaction categories
- Additional built-in categories
- Monthly budgets
- Category spending limits
- Multiple wallets
- Multiple bank accounts
- Easypaisa / JazzCash tracking
- CSV transaction export
- PDF financial reports
- Advanced historical analytics
- Real month-over-month comparisons
- AI-assisted spending insights
- Personalized financial recommendations
- Recurring transaction detection
- Expense reminders
- Mobile application version
- Full offline native operation
- Notification-based transaction detection
- Improved financial automation
- Enhanced Firebase synchronization controls

---

## 🌐 Deployment

Spendy is deployed publicly using **Netlify**.

### Live Application

👉 [**Open Spendy Live**](https://spendy-expense-tracker.netlify.app)

The production deployment is connected directly to the GitHub repository.

```
Local Development
        ↓
Git
        ↓
GitHub
        ↓
Netlify
        ↓
npm install
        ↓
npm run build
        ↓
Next.js Runtime
        ↓
Production Website
```

Future pushes to the configured production branch can automatically trigger new Netlify deployments.

---

## 🔐 Security & Privacy

Spendy supports two storage approaches.

### Browser-Local Mode

Financial records remain inside the user's browser storage unless the user explicitly chooses cloud synchronization.

### Firebase Cloud Mode

Authenticated cloud records are stored under user-specific Firestore paths.

The Firebase implementation uses:

- Firebase Authentication
- Google Sign-In
- Firestore Security Rules
- user-specific Firebase UIDs
- API-restricted Firebase browser configuration

No service-account private key files are included in this repository.

---

## 👨‍💻 Author & Credits

### Ahmad Ali

**Team Leader — Team A²**

**Developer — Spendy**

My work on Spendy included:

- project concept development
- hackathon implementation
- UI refinement
- financial workflow design
- Next.js application architecture
- transaction-management implementation
- local browser storage workflow
- Firebase integration
- Google Authentication integration
- local-to-cloud synchronization
- Firebase configuration review
- debugging and technical refinement
- post-Firebase-Studio development
- Git repository preparation
- GitHub publication
- security review
- Netlify deployment
- project documentation and portfolio preparation

Built for:

**National Agentic AI Hackathon 2025 — Track 2**

### Team

**Team A²**

> Spendy began as an AI-assisted hackathon prototype using Firebase Studio. After the Firebase Studio phase, the project was transferred to my local development environment, where I continued debugging, refining, reviewing, version-controlling, securing, and deploying the application.

---

## 📄 License

This project currently has **no explicit open-source license**.

All rights are reserved by the project authors unless a license is added in a future release.
