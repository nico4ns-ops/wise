# Wise App

A pixel-perfect, fully editable banking interface simulator designed for content creation and mockups. Built with React and TypeScript.

## Features

- **Realistic Banking UI** - Pixel-perfect recreation of a modern fintech banking interface
- **Director Mode** - Toggle editable UI to modify balances, transactions, and user details
- **Multi-Currency Support** - EUR, USD, GBP, THB accounts with realistic formatting
- **Transaction Management** - View, edit, and add custom transactions
- **Profile Management** - Editable user profile with settings
- **Screenshot Ready** - Clean UI designed for creating realistic banking screenshots

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nico4ns-ops/wise.git
   cd wise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Director Mode

Click the gear icon in the bottom-right corner to open Director Mode controls:

- **Editable UI Toggle** - Enable/disable inline editing of all values
- **Add Transaction** - Create custom transactions with:
  - Recipient name
  - Amount and currency
  - Direction (incoming/outgoing)
  - Custom date

### Editing Values

When Editable UI is enabled:
- Click on any balance to edit it directly
- Click on transaction details to modify them
- Changes are reflected immediately in the UI

## Project Structure

```
├── App.tsx              # Main application component
├── types.ts             # TypeScript interfaces
├── constants.tsx        # Initial mock data
├── index.tsx            # React entry point
├── index.html           # HTML template
├── index.css            # Custom styles
└── components/
    ├── Sidebar.tsx      # Navigation sidebar
    ├── TransactionItem.tsx   # Transaction list item
    ├── AccountDetail.tsx     # Account detail view
    ├── ProfilePage.tsx       # User profile page
    ├── EditControl.tsx       # Director mode controls
    └── ErrorBoundary.tsx     # Error boundary component
```

## License

This project is for educational and content creation purposes only. Not affiliated with any real banking institution.
