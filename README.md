# Growth-Oriented Muslim Companion App

## Overview

This is a growth-oriented companion app designed to guide users on a structured journey to become better Muslims. The app provides a roadmap with progressive levels, starting from the basics like the Shahada, moving through essential knowledge and practices, and helping users strive toward excellence in emulating the Prophet Muhammad (peace be upon him).

## Vision and Objectives

### Vision

To create a unique, growth-focused companion app that assists Muslims in personal development by providing a structured roadmap of knowledge and practices, tracking progress, and suggesting personalized ways to improve.

### Objectives

- Provide a **structured roadmap** with levels of progression in knowledge and practices.
- **Track user progress** in various areas.
- Suggest **personalized ways to improve** and introduce more practices.
- Offer **resources and guidance** tailored to each level.
- Encourage continuous growth and development as a Muslim.

## Features

### MVP Features

1. **User Onboarding and Profile Setup**
   - Email and password authentication.
   - Basic profile information and preferences.

2. **Initial Assessment**
   - A questionnaire to determine the user's current knowledge and practice level.
   - Assigns the appropriate starting level based on assessment results.

3. **Level-Based Roadmap**
   - Levels 1-3:
     - **Level 1:** Understanding the Shahada.
     - **Level 2:** Learning about the Pillars of Islam and Iman.
     - **Level 3:** Introduction to Salah (Namaz).
   - Visual roadmap displaying levels and progress indicators.

4. **Learning Modules**
   - Text-based lessons with images and simple interactivity.
   - Modules for each level, covering essential knowledge.
   - Quizzes at the end of modules to reinforce learning.

5. **Progress Tracking**
   - Dashboard showing overall progress and progress within each level.
   - Visual indicators like progress bars and percentages.

6. **Basic Gamification**
   - Experience Points (XP) earned for completing modules.
   - Badges and achievements awarded for reaching milestones.

7. **Suggestions for Improvement**
   - Recommendations for next steps after completing modules.
   - Resources and links to additional content within the app.

## Technology Stack

- **Frontend**
  - React.js
  - UI Library: Material-UI or Ant Design

- **Backend**
  - Firebase Authentication (user authentication)
  - Firebase Firestore (data storage)
  - Firebase Hosting (app deployment)

- **Version Control**
  - Git (GitHub for code repository)

- **Development Tools**
  - Visual Studio Code (code editor)
  - Node.js and npm (package management)

## Project Structure

- **/src**
  - Contains all React components, pages, and styles.
- **/public**
  - Static assets and the main `index.html` file.
- **firebase.json**
  - Firebase configuration for hosting and functions.
- **README.md**
  - Project documentation (this file).

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- A **Firebase account** with a project set up.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   - Install Firebase CLI:

     ```bash
     npm install -g firebase-tools
     ```

   - Login to Firebase:

     ```bash
     firebase login
     ```

   - Initialize Firebase in your project directory:

     ```bash
     firebase init
     ```

     - Select the services you need (Hosting, Firestore, Authentication).
     - Use an existing project or create a new one.

4. **Configure Firebase**

   - Copy your Firebase configuration from the Firebase console.
   - Create a `.env` file in the root directory and add your Firebase config:

     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

5. **Run the App Locally**

   ```bash
   npm start
   ```

   - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

- **Deploy to Firebase Hosting**

  ```bash
  firebase deploy
  ```

- Ensure that you have built the app before deploying:

  ```bash
  npm run build
  ```

## Project Guidelines

### Coding Standards

- Use **ES6+** syntax.
- Follow React best practices.
- Use functional components and React Hooks.
- Keep components modular and reusable.

### Directory Structure

- Organize components into folders based on their functionality.
- Separate concerns by keeping styles, components, and assets in appropriate directories.

### Commit Messages

- Use clear and descriptive commit messages.
- Follow the format: `type(scope): subject`

  - **Type**: feat, fix, docs, style, refactor, test, chore
  - **Scope**: The component or file the changes affect.
  - **Subject**: Short description of the changes.

### Issues and Bugs

- Track issues and bugs using GitHub Issues.
- Include steps to reproduce, expected behavior, and screenshots if applicable.

## Roadmap

### Future Enhancements

- **Expand Content**
  - Add more levels covering topics like Zakat, Fasting, Hajj, etc.
  - Include modules on Arabic language and Quran recitation.

- **Enhanced Gamification**
  - Introduce daily challenges and streaks.
  - Implement a leaderboard system.

- **Social Features**
  - Enable users to share achievements and progress.
  - Implement community forums or discussion boards.

- **Mobile Application**
  - Develop native apps for iOS and Android using React Native.

- **Advanced Personalization**
  - Provide more personalized suggestions.
  - Adapt learning paths based on user interaction.

## Contributing

Since this is a solo project, external contributions are not expected at this time. However, feedback and suggestions are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Islamic Scholars and Educators**
  - For providing guidance on content accuracy and authenticity.

- **Open Source Libraries**
  - React.js, Firebase, Material-UI/Ant Design, and others used in this project.

- **Community Feedback**
  - Friends and family who provided valuable feedback during development.

---

**Note:** This README file provides context for developers and outlines the project's vision, features, technology stack, and development guidelines. It serves as a reference for understanding the app's purpose and how to set it up and contribute.