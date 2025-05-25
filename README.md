# 2048 Game (Multilanguage) | २०४८-बहुभाषा

A classic 2048 game built with React Native, featuring a clean user interface, multiple language support, and persistent score tracking.

## Features

-   **Classic 2048 Gameplay**: Slide tiles to combine numbers and reach the 2048 tile.
-   **Multilanguage Support**: Play in English, Hindi (हिंदी), Marathi (मराठी), Punjabi (ਪੰਜਾਬੀ), and Sanskrit (संस्कृत).
-   **Score Tracking**: Keeps track of your current score and your best score.
-   **Responsive UI**: Adapts to different screen sizes for a consistent experience.
-   **Themed Interface**: Styled using `react-native-paper` for a modern look and feel.

## Tech Stack

-   **React Native**: For cross-platform mobile app development.
-   **Redux**: For managing application state (game board, score, etc.).
-   **React Native Paper**: For UI components and theming.
-   **i18next & i18n-js**: For internationalization and language translations.
-   **AsyncStorage**: For persisting the best score locally.

## How to Play

1.  Swipe Up, Down, Left, or Right to move all tiles on the board in that direction.
2.  When two tiles with the same number touch, they merge into one tile with the sum of their values (e.g., 2 + 2 = 4).
3.  A new tile (either 2 or 4) will appear in a random empty spot after each move.
4.  The game ends when the board is full and no more moves can be made.
5.  Try to reach the 2048 tile!

## Project Structure

The project is organized as follows:

```
.
├── src/
│   ├── MainApp.js                # Main application wrapper with theme provider
│   ├── commons/                  # Common types and enums (e.g., i18n locales)
│   ├── components/               # Reusable UI and game components
│   │   ├── game-components/      # Components specific to game logic (Board, Tile, ScoreBoard)
│   │   └── UI-components/        # General UI elements (Button, Header, Modal, Logo)
│   ├── constants/                # Global constants (e.g., colors)
│   ├── models/                   # Data models (e.g., tile model)
│   ├── redux/                    # Redux store, actions, reducers, and types
│   ├── screens/                  # Top-level screen components (e.g., GameScreen)
│   ├── services/                 # Services like internationalization
│   │   └── internationalization/ # i18n setup and translation files
│   ├── theme/                    # Application theme configuration
│   └── utils/                    # Utility functions (game logic, storage, UI helpers)
├── assets/                       # Static assets like icons and splash screens
├── App.js                        # Entry point of the application
├── package.json                  # Project dependencies and scripts
└── README.md                     # This file
```

## Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or Yarn
-   React Native development environment setup (see [React Native Environment Setup](https://reactnative.dev/docs/environment-setup))

### Installation & Running

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd 2048-multilanguage
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the application:**

    -   **For Android:**

        ```bash
        npm run android
        # or
        yarn android
        ```

    -   **For iOS:**
        ```bash
        npm run ios
        # or
        yarn ios
        ```
        (Ensure you have Cocoapods installed and run `cd ios && pod install && cd ..` before running on iOS for the first time or after adding new native modules).

## License

This project is licensed under the [MIT License](LICENSE).
