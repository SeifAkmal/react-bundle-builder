# Security Bundle Builder

## About the Project
This project is an intelligent, multi-step bundle builder for a home security e-commerce store. It allows users to build and customize their security system across sequential steps (Cameras, Plans, Sensors, Accessories) using an accordion-style layout. It also features a highly responsive, sticky Review Panel that displays added products, variants, total costs, and live savings.

## Technologies Used
- **React (v19)** - For building the user interface.
- **TypeScript** - For type safety and a better developer experience.
- **Tailwind CSS** - For fast, utility-first styling and robust responsive design.
- **Vite** - For a fast frontend build tool and development server.
- **Context API & useReducer** - For global state management.

## Getting Started
To run the project locally, follow these simple steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the link provided in your terminal (usually `http://localhost:5173`) in your browser.

## Brief Structure
The project is organized cleanly to ensure easy maintenance and scalability:

```text
src/
├── components/
│   ├── builder/        # Main builder components (Builder, ReviewPanel, ProductCard, Accordion)
│   └── ui/             # Reusable UI elements (Button, Stepper, Badge, VariantSelector)
├── context/            # Context API setup for global state management
├── hooks/              # Custom hooks (e.g., useBundle for easy data access)
├── types/              # TypeScript interfaces and type definitions
├── data/               # Mock JSON data for products
├── App.tsx             # Main layout and application entry point
└── index.css           # Global styles and CSS variables
```

## Key Decisions
- **State Management:** Instead of using heavy external libraries like Redux, the app uses React's native `Context API` combined with `useReducer`. This provides a lightweight, scalable, and easy-to-follow way to manage cart items, selected variants, and the active builder step.
- **Responsive Design:** The layout is highly optimized for all screen sizes. On desktop screens, the builder and review panel sit side-by-side or stacked cleanly.
- **Global Font Scaling:** The base `html` font size was increased to `17px`. Since Tailwind heavily uses `rem` units, this seamlessly scales up the entire UI (fonts, margins, paddings) proportionately without having to adjust individual component classes.
