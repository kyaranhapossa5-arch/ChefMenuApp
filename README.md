# Christoffel's Kitchen - Mobile Menu Manager (Part 2)

**Student Name:** Kyara de Fátima Nhapossa  
**Student Number:** ST10538970  
**Module:** Mobile App Scripting (MAST5112)

## Project Overview

Christoffel's Kitchen is an enterprise-grade mobile application designed for chefs and kitchen staff to seamlessly manage, curate, search, and analyze restaurant menu offerings in South African Rand (R).

## Changelog & Enhancements (Part 2 vs. Part 1)

- **Full CRUD Functionality:** Upgraded from static views to fully interactive creation, editing, updating, and deletion of menu items with instant state reflection.
- **Modular Architecture Refactoring:** Split the monolithic code into dedicated architectural layers:
  - `src/types/menu.ts`: Centralized TypeScript data contracts and interfaces.
  - `src/utils/storage.ts`: Asynchronous disk persistence engine using `AsyncStorage` with initial data seeding.
  - `src/screens/HomeScreen.tsx`: Interactive dashboard featuring search, course filters, live statistics, and card actions.
  - `src/screens/AddEditScreen.tsx`: Validated form view for adding and editing dish payloads.
  - `App.tsx`: Root coordinator managing state switching and async startup loaders (`ActivityIndicator`).
- **Advanced Search & Filtering:** Added real-time text search by dish name combined with horizontal course filter tabs (Starters, Mains, Desserts).
- **Live Statistics:** Automatically computes and displays total menu item counts, category breakdowns, and the overall average menu price.
- **Input Validation & UX:** Added rigorous validation rules (checking for empty fields and positive numeric prices) backed by native alert feedback.

## Installation & Running

1. Clone the repository: `git clone https://github.com/kyaranhapossa5-arch/ChefMenuApp.git`
2. Install dependencies: `npm install`
3. Install AsyncStorage: `npx expo install @react-native-async-storage/async-storage`
4. Start the app: `npx expo start`
