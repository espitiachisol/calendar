# Calendar Project

This is a calendar application built with React, TypeScript, and Vite, allowing users to easily pick start and end dates across months.

## Table of Contents

- [Requirements](#requirements)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Key Dependencies](#key-dependencies)


## Requirements

Before you begin, ensure you have met the following requirements:
- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)


## Running the Application

1. Install dependencies:
    ```sh
    npm install
    ```
2. To start the development server
    ```sh
    npm run dev
    ```

## Usage
Here's an example of basic usage:
```tsx
type DateRange = [Date | null, Date | null];

function App() {
    const [dateRange, setDateRange] = useState<DateRange>([null, null]);
    const [startDate, endDate] = dateRange;

    function handleSelectRange(dates: DateRange) {
        setDateRange(dates);
    }

    return (
        <Calendar
        onSelectRange={handleSelectRange}
        startDate={startDate}
        endDate={endDate}
        />
    );
}
```

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `lint`: Runs ESLint to check for linting errors.
- `preview`: Previews the production build locally.
- `lint:fix`: Runs ESLint and automatically fixes problems.


## Project Structure

    ├── src
    │   ├── calendar
    │   │   ├── calendar_utils.ts
    │   │   ├── Calendar.tsx
    │   │   ├── Calendar.module.css
    │   │   ├── Header.tsx
    │   │   ├── Month.tsx
    │   │   ├── Day.tsx
    │   │   └── MonthDates.tsx
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── normalize.css
    │   └── index.tsx
    ├── public
    ├── .eslintrc.js
    ├── .prettierrc.cjs
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── tsconfig.app.json
    ├── package.json
    └── README.md

## Key Dependencies

- [React](https://reactjs.org/)
- [React-DOM](https://www.npmjs.com/package/react-dom)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [date-fns](https://date-fns.org/)
