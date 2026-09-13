# Spendy — Your Expenditure Partner

A lightweight, offline-first personal finance tracker built to help students and young adults track expenditures, visualize spending trends, and maintain financial discipline with zero friction.

Developed during the **National Agentic AI Hackathon 2025** (Track 2) by **Team A²** under the leadership of **Ahmad Ali**.

---

### Project Links
- **Live Demo**: [Deploying to Vercel — Coming Soon](#) <!-- Replace with https://spendy.vercel.app -->
- **Pitch Deck / Presentation**: [docs/Spendy-Hackathon-Presentation.pdf](docs/Spendy-Hackathon-Presentation.pdf)
- **GitHub Repository**: [https://github.com/your-username/spendy](https://github.com/your-username/spendy)

---

## Overview

Managing day-to-day finances shouldn't require complex accounting software or mandatory account creation. **Spendy** is designed as a streamlined, responsive personal finance assistant that operates fully in the browser out of the box. Users can immediately track expenses and income, view categorized statistics, and switch seamlessly to cloud synchronization via Google Authentication whenever they choose.

---

## The Problem

Financial literacy and personal budgeting remain significant challenges across Pakistan, particularly among university students and young professionals. Key challenges include:

- **Lack of Early Financial Habits**: Personal money management is rarely part of standard academic curricula, leaving students to navigate budgeting through trial and error.
- **High Barrier to Entry**: Many existing finance apps demand extensive onboarding, mandatory phone numbers, or recurring subscription fees before offering basic functionality.
- **Privacy & Connectivity Concerns**: Users often hesitate to share sensitive financial records with cloud-first apps or need an expense tracker that works reliably in low-connectivity environments.

Spendy was conceived through direct observations of student life in Pakistan, aiming to deliver a no-friction, privacy-respecting tool that makes spending tracking accessible to anyone with a browser.

---

## Our Approach

Spendy balances instantaneous offline utility with modern cloud capabilities:
1. **Zero-Friction Onboarding**: Users can begin recording income and expenses immediately using local browser storage—no sign-up required.
2. **On-Demand Cloud Sync**: Users who want cross-device access can authenticate with Google at any time; their existing offline transactions are automatically migrated into the cloud in an atomic batch.
3. **Actionable Visuals**: Spending data is transformed into intuitive charts (pie breakdown, monthly cash flow, and category overviews) so users quickly understand where their money goes.
4. **Localization-Ready**: Out of the box support for 166 world currencies, prominently including Pakistani Rupee (PKR - ₨), with localized formatting.

---

## Key Features

The following features are **fully implemented and operational** in the codebase:

### 1. Dual-Mode Data Architecture
- **Offline-First Storage**: Operates entirely within `localStorage` for complete offline privacy and speed.
- **One-Click Cloud Sync**: Authenticate with Google to automatically batch-migrate local transactions to Firebase Firestore (`users/{uid}/transactions`) and activate real-time synchronization.

### 2. Transaction Management (CRUD)
- **Add Transactions**: Record income or expense with category selection, date picker, amount validation, and optional notes.
- **Edit Transactions**: Update amount, category, date, or description via a pre-filled modal dialog.
- **Delete Transactions**: Remove individual entries with immediate state and database/storage updates.
- **Categorization**: Group transactions into 6 standard categories: *Food, Travel, Bills, Shopping, Salary, Other*.

### 3. Interactive Financial Dashboard
- **Metric Cards**: Real-time calculation of **Total Balance**, **Total Income**, and **Total Expenses**.
- **Recent Transactions Feed**: Visual activity feed with category-specific Lucide icons and color-coded transaction amounts.
- **Expense Overview Chart**: Horizontal bar chart summarizing spending by category for fast visual comparison.

### 4. Advanced Statistics & Visualizations
- **Income vs. Expense Chart**: Monthly comparative bar chart tracking cash flow trends over time.
- **Category Spend Breakdown**: Donut chart with interactive hover tooltips and dynamic center label displaying total spend per category.

### 5. Multi-Currency Support
- Searchable currency selector supporting **166 world currencies**, including:
  - **PKR** (`₨` - Pakistani Rupee)
  - **USD** (`$` - US Dollar)
  - **EUR** (`€` - Euro)
  - **GBP** (`£` - British Pound)
  - **SAR** (`ر.س` - Saudi Riyal), **AED** (`د.إ` - UAE Dirham), and more.
- Persistent currency preference stored across sessions and reflected across all summary cards, charts, and transaction rows.

### 6. Modern User Experience & Accessibility
- **Light & Dark Themes**: System-aware theme toggling with smooth transitions via `next-themes`.
- **Responsive Layout**: Collapsible sidebar navigation for desktops and sliding mobile drawer with touch support.
- **Optimized Bundle Delivery**: Code-split dialogs and charts using `next/dynamic` to minimize initial bundle size.

---

## Hackathon Context

| Field | Details |
|---|---|
| **Event** | National Agentic AI Hackathon 2025 |
| **Track** | Track 2 |
| **Team** | Team A² |
| **Team Leader** | Ahmad Ali |
| **Role** | Concept design, UI engineering, state architecture, and Firebase integration |

---

## What Makes Spendy Different

- **No Lock-In, No Friction**: Unlike typical finance platforms that block usage behind sign-up forms, Spendy gives users immediate access to all core features.
- **Smooth Upgrade Path**: Going from local storage to cloud sync does not wipe local data. The application executes a transactional migration batch upon first Google sign-in.
- **Clean, Purposeful Aesthetics**: Built with high-contrast typography (Poppins for headlines, PT Sans for data tables) and refined shadcn/ui components for a premium feel.

---

## Screenshots

<!-- Place screenshots in docs/screenshots/ and link them here -->

| Landing & Onboarding | Main Dashboard |
| :---: | :---: |
| ![Landing Page Placeholder](docs/screenshots/landing-page.png) | ![Dashboard Placeholder](docs/screenshots/dashboard.png) |

| Transactions Management | Financial Statistics |
| :---: | :---: |
| ![Transactions Table Placeholder](docs/screenshots/transactions.png) | ![Statistics Charts Placeholder](docs/screenshots/statistics.png) |

> *Screenshots will be populated following presentation asset export.*

---

## Technology Stack

### Frontend & Framework
- **Framework**: [Next.js 15.3.8](https://nextjs.org/) (App Router, Turbopack)
- **Core Library**: [React 18.3.1](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)

### Styling & UI
- **CSS Framework**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI Primitives](https://www.radix-ui.com/)
- **Icons**: [Lucide React 0.475.0](https://lucide.dev/)
- **Theming**: [next-themes 0.3.0](https://github.com/pacocoursey/next-themes)

### Visualization & Utilities
- **Charts**: [Recharts 2.15.1](https://recharts.org/)
- **Date Handling**: [date-fns 3.6.0](https://date-fns.org/) & [react-day-picker 8.10.1](https://daypicker.dev/)
- **Form Management**: [React Hook Form 7.54.2](https://react-hook-form.com/)
- **Schema Validation**: [Zod 3.24.2](https://zod.dev/)

### Backend & Cloud
- **SDK**: [Firebase Modular SDK 11.9.1](https://firebase.google.com/)
- **Authentication**: Firebase Auth (Google Sign-In popup)
- **Database**: Cloud Firestore (real-time collections, batch writes)

### AI & Extensibility (Prototyped / Scaffolded)
- **AI Tooling**: [Genkit 1.20.0](https://firebase.google.com/docs/genkit) (`@genkit-ai/google-genai` with Gemini 2.5 Flash configuration)

---

## Architecture / Project Structure

```text
Spendy/
├── src/
│   ├── ai/                      # Genkit AI configuration (Gemini 2.5 Flash)
│   │   ├── dev.ts
│   │   └── genkit.ts
│   ├── app/                     # Next.js 15 App Router
│   │   ├── (app)/               # Authenticated / Application shell route group
│   │   │   ├── dashboard/       # Dashboard view (overview metrics & charts)
│   │   │   ├── statistics/      # Deep-dive analytics (monthly & category charts)
│   │   │   ├── transactions/    # Full transactions table & filtering
│   │   │   ├── settings/        # Currency selector, theme & cloud sync controls
│   │   │   ├── layout.tsx       # Sidebar, Header, Settings & Transaction providers
│   │   │   └── loading.tsx      # Route-level loading skeleton
│   │   ├── globals.css          # Tailwind CSS variables & design tokens
│   │   ├── layout.tsx           # Root HTML layout, font preloads, theme & auth providers
│   │   └── page.tsx             # Landing page (choice between Local Mode and Google Sync)
│   ├── components/              # Modular UI components
│   │   ├── dashboard/           # Dashboard-specific widgets (add dialog, charts, feeds)
│   │   ├── statistics/          # Recharts visualizations (income/expense & donut charts)
│   │   ├── transactions/        # Data table, filters, and edit dialogs
│   │   ├── ui/                  # shadcn/ui primitive components (Radix UI wrappers)
│   │   ├── sidebar-layout.tsx   # Responsive application shell and header
│   │   └── theme-toggle.tsx     # Light/Dark mode switcher
│   ├── context/                 # Application State Management
│   │   ├── data-sync.ts         # Atomic batch migration from localStorage to Firestore
│   │   ├── settings-context.tsx # Currency preference state and persistence
│   │   └── transaction-context.tsx # Central store handling local vs. Firestore CRUD
│   ├── firebase/                # Firebase Client SDK integration
│   │   ├── auth.ts              # Google authentication helpers
│   │   ├── config.ts            # Client SDK connection options
│   │   ├── index.ts             # App initialization and SDK getters
│   │   ├── provider.tsx         # React Context providing Auth and Firestore instances
│   │   └── user-service.ts      # User profile persistence in Firestore
│   ├── hooks/                   # Custom React hooks (useMobile, useToast)
│   └── lib/                     # Utilities, static definitions, and data types
│       ├── currencies.ts        # 166 ISO currency definitions
│       ├── data.ts              # Category definitions and mock templates
│       ├── types.ts             # Core Transaction interface
│       └── utils.ts             # Tailwind class merge & currency formatting helpers
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Next.js build & remote image configuration
├── package.json                 # Project dependencies and npm scripts
├── package-lock.json            # Deterministic lockfile
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind typography, colors, and keyframe animations
└── tsconfig.json                # TypeScript compiler settings
```

---

## Data & Persistence

Spendy handles data through a dual-strategy architecture managed by `TransactionProvider`:

```mermaid
graph TD
    A[User Opens Spendy] --> B{Storage Choice}
    B -->|Local Storage| C[Browser localStorage]
    C --> D[CRUD operations in memory + localStorage]
    B -->|Google Cloud Sync| E[Firebase Auth Popup]
    E --> F[Check local transactions]
    F -->|Exists| G[Batch Write to Firestore: users/{uid}/transactions]
    F -->|Empty| H[Attach Firestore onSnapshot Listener]
    G --> H
    H --> I[Real-time bidirectional sync across devices]
```

1. **Local Mode**:
   - Stored in `window.localStorage` under the key `'transactions'`.
   - Dates are stored in ISO format and hydrated into JavaScript `Date` objects on load.
   - IDs are generated client-side using `crypto.randomUUID()`.
2. **Cloud Mode**:
   - Transactions are stored under the Firestore path: `/users/{userId}/transactions/{transactionId}`.
   - Real-time updates are listened to via Firestore `onSnapshot`.
   - Creation, update, and deletion are handled asynchronously through modular Firestore methods (`addDoc`, `updateDoc`, `deleteDoc`).

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) version **20.x** or higher
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/spendy.git
   cd spendy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:9010](http://localhost:9010) (or the port indicated in your console).

### Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack on port 9010.
- `npm run build`: Compiles the production build.
- `npm run start`: Runs the built production application on port 9010.
- `npm run typecheck`: Validates TypeScript types across the codebase without emitting files.
- `npm run lint`: Runs ESLint checks.

---

## Environment Variables

For local development and testing, Spendy functions immediately with local storage without any environment variables.

When deploying to production with custom Firebase projects or enabling Genkit AI features, provide the following variables in a `.env.local` file:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id

# Optional: Google Gemini API Key (for Genkit Flows)
GEMINI_API_KEY=your-gemini-api-key
```

> *Note: Never commit `.env` or `.env.local` files containing real production credentials to public repositories.*

---

## Hackathon Materials

Presentations, pitch documents, and competition submissions are located in the `docs/` folder:

- **Presentation Slide Deck (PDF)**: `docs/Spendy-Hackathon-Presentation.pdf`
- **Presentation Slide Deck (PPTX)**: `docs/Spendy-Hackathon-Presentation.pptx`
- **Screenshots & Media**: `docs/screenshots/`
- **Competition Submission Form**: `docs/submission/`

---

## Roadmap

The features below represent the **future vision** conceived during the National Agentic AI Hackathon 2025:

- [ ] **SMS & Banking Notification Parser**: Automatically extract transaction amounts, merchants, and dates from incoming bank and mobile wallet notifications (e.g. Easypaisa, JazzCash, local banks) with user consent.
- [ ] **Mobile Distribution**: Package the application for Android and release on the Google Play Store using Capacitor or React Native.
- [ ] **AI-Powered Financial Insights**: Connect the scaffolded Genkit / Gemini 2.5 Flash integration to generate proactive monthly budgeting advice, detect recurring unnecessary subscriptions, and provide personalized savings tips.
- [ ] **Custom Categories & Budgets**: Allow users to define custom expenditure categories and set monthly spending caps with alert indicators.
- [ ] **Export & Reporting**: Support exporting financial data to CSV and generating downloadable PDF spending reports.

---

## Firebase Studio & Development Process

During the hackathon, **Firebase Studio** was utilized to accelerate initial prototyping and component scaffolding. 

This experience offered valuable takeaways regarding modern AI-assisted software engineering:
- **Accelerated Velocity**: AI scaffolding rapidly generated UI component templates and initial wireframe layouts, drastically reducing time-to-first-prototype.
- **Critical Role of Developer Oversight**: While AI accelerated boilerplate generation, manual architectural decisions were critical for:
  - Resolving routing conflicts in Next.js App Router (e.g. separating the landing page from the nested `(app)` group).
  - Designing a robust dual-storage pattern (localStorage with atomic Firestore batch migration).
  - Correcting hydration and client-side rendering boundaries for dynamic charting libraries.
  - Ensuring strong TypeScript types across data context boundaries.

---

## Limitations

As a hackathon prototype, Spendy has several documented limitations:
- **Fixed Category Set**: Categories are currently restricted to the 6 predefined types (`Food`, `Travel`, `Bills`, `Shopping`, `Salary`, `Other`).
- **Single-Wallet Model**: Multi-account / multi-wallet tracking (e.g., separating Bank Account vs. Cash in Hand) is not yet implemented.
- **Client-Side Firebase Keys**: Firebase client configuration is embedded in source code rather than driven by environment variables.
- **Static Comparison Metric**: The "+0% from last month" label on the dashboard balance card is currently a static placeholder.
- **Genkit AI Integration Inactive**: Genkit and Gemini packages are configured in `src/ai/genkit.ts` but are not yet wired into the user interface.

---

## Deployment

Spendy is optimized for zero-configuration deployment to [Vercel](https://vercel.com):

1. Import the GitHub repository into Vercel.
2. Ensure Framework Preset is set to **Next.js**.
3. Build command: `npm run build`.
4. Output directory: `.next`.
5. **Firebase Domain Configuration**: If using Firebase Authentication, add your Vercel deployment domain (e.g., `spendy.vercel.app`) to:
   - **Firebase Console** &rarr; **Authentication** &rarr; **Settings** &rarr; **Authorized Domains**.

---

## Author / Team

- **Team**: Team A²
- **Team Leader**: **Ahmad Ali**
- **Event**: National Agentic AI Hackathon 2025 (Track 2)

---

## License

This project currently has no explicit open-source license. All rights are reserved by the original authors. A standard open-source license (such as MIT) may be added in a future release.
