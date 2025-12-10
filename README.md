# MedChain Claims Processing Prototype

This is a React Native prototype for the MedChain Claims Processing System. It demonstrates the frontend user interface and simulates blockchain interactions for claim submission and processing.

## Features

- **Splash Screen**: Branding and introduction.
- **Onboarding Flow**: Explains the value proposition.
- **Authentication**: Login and Register screens (UI only).
- **Dashboard**:
  - **Home**: Overview of stats and quick actions.
  - **Claims**: List of claims with simulated blockchain transaction hashes.
  - **Alerts**: Real-time notifications from the blockchain simulation.
  - **Profile**: User profile view.
- **Simulation**: Simulates the process of encrypting data, submitting to blockchain, and automated smart contract validation.

## Prerequisites

To run this project, you need:

1.  **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2.  **Expo Go App**: Install on your mobile device:
    - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [iOS App Store](https://apps.apple.com/us/app/expo-go/id982107779)

## Installation

1.  **Clone the repository**:

    ```bash
    git clone <your-repo-url>
    cd claim-processing-system
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the App

1.  **Start the development server**:

    ```bash
    npm start
    ```

2.  **Open on your device**:
    - You will see a QR code in the terminal.
    - **Android**: Open Expo Go and scan the QR code.
    - **iOS**: Open the Camera app and scan the QR code.

## Troubleshooting

- If you see an error about missing modules, try deleting `node_modules` and running `npm install` again.
- Ensure your phone and computer are on the same Wi-Fi network.
