
# FABU E-commerce Platform

<div align="center">
  <img src="https://raw.githubusercontent.com/username/repo/main/path/to/fabu-logo-for-readme.svg" alt="FABU Logo" width="150"/> 
  {/* Developer: Please replace the above src with an actual path to a FABU logo if available, or use the SVG inline. For now, it's a placeholder. */}
</div>

**Timeless Elegance. Modern Expression.**

FABU is a stylish and modern e-commerce web application for a fictional luxury fashion brand. It aims to provide a seamless and aesthetically pleasing shopping experience, showcasing unique clothing and accessories with a strong focus on design, quality, and user experience.

---

## Table of Contents

1.  [Design Philosophy & Aesthetics](#design-philosophy--aesthetics)
    *   [Target Audience](#target-audience)
    *   [Core Principles](#core-principles)
    *   [Visual Language](#visual-language)
2.  [Features](#features)
3.  [Tech Stack](#tech-stack)
4.  [Project Structure](#project-structure)
5.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [API Key Setup](#api-key-setup)
    *   [Installation & Running](#installation--running)
6.  [Development Guidelines](#development-guidelines)
    *   [Coding Conventions](#coding-conventions)
    *   [Component Design](#component-design)
    *   [State Management](#state-management)
    *   [API Integration (Gemini)](#api-integration-gemini)
7.  [Key Components Overview](#key-components-overview)
8.  [Future Enhancements](#future-enhancements)
9.  [Contributing](#contributing)
10. [License](#license)

---

## Design Philosophy & Aesthetics

FABU's design is crafted to evoke a sense of understated luxury, modernity, and sophistication. The UI/UX aims to be intuitive, engaging, and reflective of the brand's premium positioning.

### Target Audience
Discerning individuals who appreciate quality craftsmanship, timeless design with a modern twist, and a seamless digital experience. They value aesthetics, attention to detail, and a brand that aligns with their sophisticated lifestyle.

### Core Principles
*   **Elegance & Sophistication:** Clean lines, refined typography, and a harmonious color palette.
*   **Modern Minimalism:** Focus on essential elements, avoiding clutter to let products shine.
*   **Intuitive User Experience:** Easy navigation, clear calls-to-action, and a frictionless journey from browsing to checkout.
*   **Quality Presentation:** High-quality imagery and thoughtful content presentation.
*   **Responsive & Accessible:** Ensuring a consistent and usable experience across all devices and for users of varying abilities.

### Visual Language
*   **Color Palette:**
    *   `luxury-bg` (#FDFCFB): Very light, warm off-white for a clean and airy base.
    *   `luxury-text` (#333333): Deep, soft charcoal for primary text, ensuring readability.
    *   `luxury-accent` (#B08D57): Muted, elegant gold for calls-to-action, highlights, and branding elements.
    *   `luxury-subtle` (#EAEAEA): Light gray for borders, dividers, and subtle UI elements.
    *   `luxury-contrast` (#1A1A1A): Near black for strong visual accents where needed.
*   **Typography:**
    *   **Primary Font:** 'Poppins' (Sans-Serif) is used for its modern, clean, and versatile characteristics. It provides excellent readability across various weights and sizes.
    *   **Hierarchy:** Clear typographic hierarchy is established using font weights, sizes, and letter spacing to guide the user's attention.
*   **Imagery:** Emphasis on high-quality product photography and lifestyle images that align with the brand's sophisticated aesthetic.
*   **Iconography:** Custom, minimalist SVG icons are used for clarity and brand consistency.
*   **Animations & Transitions:** Subtle and purposeful animations (leveraging Framer Motion and Tailwind CSS custom animations) enhance user interaction without being distracting. Examples include `fadeInUp`, `slideInRight`, and `marqueeScrollLeft`.
*   **Layout:** Spacious layouts with ample white space to improve readability and create a sense of calm and focus. A responsive grid system ensures adaptability.

---

## Features

*   **Homepage:** Engaging hero section, curated product selections, brand marquee, and contact snippet.
*   **Shop Page:** Comprehensive product gallery with:
    *   Search functionality (by name, description).
    *   Category-based filtering.
*   **Product Card:** Displays product image, name, category, price, status badges (e.g., "Popular", "Low Stock"), and actions (Add to Cart, View Product). Includes "Out of Stock" and "Join Waitlist" functionality.
*   **Quick View/Receipt Modal:** Detailed single product view (acting as a "digital vintage receipt") with item specifics, price, and KSH currency with 16% VAT calculation.
*   **Shopping Cart Modal:**
    *   Lists added items with quantity, price, and subtotal.
    *   Allows updating item quantities and removing items.
    *   Calculates subtotal in KSH.
    *   Proceed to checkout functionality.
*   **Checkout Process:**
    *   Multi-step form for contact information, shipping, and billing addresses.
    *   Order summary with subtotal, shipping (mock), 16% VAT, and grand total in KSH.
    *   Mock payment section.
*   **Order Confirmation & Receipt Modal:**
    *   Displays after a successful mock order.
    *   Provides a detailed order summary including KSH breakdown with 16% VAT.
    *   Option to "download" a printable HTML/TXT receipt.
*   **Static Pages:**
    *   **Our Story Page:** Narrates the brand's philosophy and craftsmanship.
    *   **Contact Page:** Provides contact form and detailed contact information.
*   **Brand Marquee:** Continuously scrolling display of partner/featured brand logos.
*   **AI Chatbot ("FABU Concierge"):**
    *   Integrated widget using the Google Gemini API (`gemini-2.5-flash-preview-04-17` model).
    *   Provides assistance with product queries, styling advice, and general information.
    *   Context-aware based on FABU's product line.
*   **Currency & Tax:** All prices and transactions are in Kenyan Shillings (KSH) with a 16% VAT applied.
*   **Responsive Design:** Adapts to various screen sizes for a consistent experience on desktop, tablet, and mobile.
*   **Accessibility:** ARIA attributes and semantic HTML are used to improve accessibility. (Further auditing recommended).

---

## Tech Stack

*   **Core Framework:** React 19 (using `React.StrictMode`)
*   **Language:** TypeScript
*   **Build Tool & Dev Server:** Vite
*   **Styling:**
    *   Tailwind CSS (v3.x) - Configured via CDN in `index.html` for development.
    *   Custom theme extensions (colors, fonts, animations) within `tailwind.config`.
    *   Global styles and layer directives in `<style type="text/tailwindcss">`.
*   **State Management:**
    *   React Hooks (`useState`, `useEffect`, `useMemo`) for local and component-level state.
    *   Prop drilling for state sharing between parent/child components.
*   **Animations:**
    *   Framer Motion for complex and interactive animations (e.g., `CircularText`, modal transitions).
    *   Tailwind CSS `keyframes` and `animation` utilities for simpler CSS-based animations.
*   **API Integration:**
    *   `@google/genai` SDK for interacting with the Google Gemini API (Chatbot).
*   **Routing:** Hash-based client-side routing (`window.location.hash` and event listeners).
*   **Icons:** Custom SVG components (e.g., `FabuLogo.tsx`, `ShoppingCartIcon.tsx`).
*   **Module Loading (Browser):** `<script type="importmap">` in `index.html` to manage CDN dependencies (React, Framer Motion, Gemini API).
*   **Linting/Formatting:** (Assumed, typically Prettier/ESLint in Vite projects, though not explicitly configured in provided files).

---

## Project Structure

The project follows a standard React application structure, with components and type definitions organized for clarity.

```
/
├── public/                  # Static assets (if any, not explicitly shown but typical for Vite)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── icons/           # SVG icon components
│   │   ├── BrandMarquee.tsx
│   │   ├── Button.tsx
│   │   ├── CartModal.tsx
│   │   ├── ChatbotWidget.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── CheckoutReceiptModal.tsx
│   │   ├── CircularText.tsx
│   │   ├── ContactPage.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── OurStoryPage.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ReceiptModal.tsx
│   │   ├── SectionTitle.tsx
│   │   └── ShopPage.tsx
│   ├── App.tsx              # Main application component, routing logic
│   ├── constants.ts         # Global constants, sample data
│   ├── index.tsx            # Entry point, React DOM rendering
│   └── types.ts             # TypeScript type definitions
├── .gitignore               # Files to ignore in Git
├── index.html               # Main HTML file, Tailwind CDN, import maps
├── metadata.json            # Application metadata (name, description)
├── package.json             # Project dependencies and scripts
├── README.md                # This file
└── tsconfig.json            # TypeScript configuration (assumed, typical for Vite + TS)
```

---

## Getting Started

Follow these steps to set up and run the FABU e-commerce application locally.

### Prerequisites
*   Node.js (LTS version recommended, e.g., v18.x or v20.x)
*   npm (v8.x or later) or yarn (v1.22.x or later)

### API Key Setup
The application uses the Google Gemini API for its chatbot functionality. You need to obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

Once you have your API key, create a `.env` file in the root of the project (if it doesn't exist) and add your API key:

```env
# .env
API_KEY="YOUR_GEMINI_API_KEY"
```

**Important:** The application code (`ChatbotWidget.tsx`) directly uses `process.env.API_KEY`. Vite handles environment variables. Ensure this variable is accessible in your execution environment. **Do not commit your `.env` file to version control.**

### Installation & Running

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd fabu-ecommerce-app
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This will start the Vite development server, typically at `http://localhost:5173` (or another port if 5173 is busy). Open this URL in your browser.

    The application uses import maps and CDN links for some dependencies in `index.html`. Vite's development server will handle these correctly.

---

## Development Guidelines

### Coding Conventions
*   **TypeScript:** Adhere to strong typing and TypeScript best practices. Utilize interfaces and types defined in `types.ts`.
*   **React:**
    *   Use functional components with Hooks.
    *   Follow React best practices for component composition and state management.
    *   Ensure keys are used correctly for lists.
    *   Employ ARIA attributes for accessibility.
*   **Tailwind CSS:**
    *   Utilize utility-first classes.
    *   Leverage the custom theme defined in `tailwind.config` (via `index.html`).
    *   Keep custom CSS minimal; prefer composing utilities or creating custom components/utilities in Tailwind if necessary.
*   **Naming:** Use clear and consistent naming conventions for files, components, variables, and functions (e.g., PascalCase for components, camelCase for variables/functions).
*   **Readability:** Prioritize clean, readable, and well-commented code where necessary.

### Component Design
*   **Reusability:** Design components to be as reusable as possible.
*   **Single Responsibility:** Components should ideally have a single responsibility.
*   **Props:** Use clear and well-typed props for component communication.
*   **Styling:** Encapsulate component-specific styles using Tailwind CSS utilities directly in the JSX.

### State Management
*   **Local State:** For component-specific state, use `useState`.
*   **Derived State:** Use `useMemo` for memoizing expensive computations.
*   **Side Effects:** Manage side effects (e.g., API calls, event listeners) with `useEffect`, ensuring proper dependency arrays and cleanup functions.
*   **Global State (Current):** Primarily managed in `App.tsx` and passed down via props. For larger applications, consider React Context API or a dedicated state management library.

### API Integration (Gemini)
*   **Client Initialization:** The `@google/genai` client is initialized in `ChatbotWidget.tsx` using `new GoogleGenAI({ apiKey: process.env.API_KEY })`.
*   **Model:** The `gemini-2.5-flash-preview-04-17` model is used for text generation.
*   **Error Handling:** Implement basic error handling for API calls. Display user-friendly messages if the API call fails.
*   **Security:** The API key is sourced from an environment variable and should never be hardcoded or exposed client-side in a production build (Vite handles this by default for `process.env`).

---

## Key Components Overview

*   **`App.tsx`**: The root component orchestrating views, managing global state (cart, modals, current view), and handling hash-based routing.
*   **`Header.tsx` / `Footer.tsx`**: Define the main layout structure of the application.
*   **`ProductCard.tsx`**: Renders individual product information and provides interaction buttons.
*   **`CartModal.tsx`**: Manages the display and interactions within the shopping cart.
*   **`CheckoutPage.tsx`**: Handles the multi-step checkout form and order summary.
*   **`ChatbotWidget.tsx`**: Implements the AI-powered chat interface using the Gemini API.
*   **`Button.tsx`**: A versatile and themeable button component used throughout the application.
*   **`SectionTitle.tsx`**: Standardized component for rendering section titles with optional subtitles and decorative underlines.
*   **Modal Components (`ReceiptModal.tsx`, `CheckoutReceiptModal.tsx`)**: Provide detailed views and confirmations in a modal interface.

---

## Future Enhancements

While FABU provides a solid foundation, several areas could be enhanced:

*   **Backend Integration:** Implement a proper backend for managing products, inventory, user accounts, and orders.
*   **User Authentication:** Add user accounts, login/registration, and order history.
*   **State Management:** For a growing application, adopt React Context API or a library like Zustand or Redux for more robust global state management.
*   **Routing:** Transition from hash-based routing to a library like React Router for more advanced routing capabilities (e.g., nested routes, route protection).
*   **Testing:** Implement unit tests (e.g., with Vitest/React Testing Library) and end-to-end tests (e.g., with Playwright or Cypress).
*   **Performance Optimization:**
    *   Code splitting and lazy loading for components/routes.
    *   Image optimization.
*   **Build Process:** For production, ensure Tailwind CSS is purged and minified correctly through Vite's build process.
*   **Full PWA Features:** Add service workers for offline capabilities, manifest file, etc.
*   **Advanced Accessibility (A11y):** Conduct a thorough accessibility audit and implement further improvements based on WCAG guidelines.
*   **Internationalization (i18n):** Support for multiple languages and currencies.
*   **Search Engine Optimization (SEO):** Implement SSR/SSG or pre-rendering techniques.

---

## Contributing

Currently, this is a conceptual project. If it were open source, contribution guidelines would include:
*   Forking the repository.
*   Creating feature branches.
*   Following coding standards.
*   Writing tests for new features.
*   Submitting pull requests for review.

---

## License

(Placeholder) This project could be licensed under the MIT License. See the `LICENSE` file for more details if one were present.

---

This README provides a comprehensive overview for designers and developers working on or exploring the FABU e-commerce application. It emphasizes the blend of aesthetic considerations with solid frontend engineering practices.
      
