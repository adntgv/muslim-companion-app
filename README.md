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


## **High-Level Overview**

At a high level, the application consists of:

1. **Frontend**: A React.js web application that handles the user interface and client-side logic.

2. **Backend**: Firebase services, including Authentication, Firestore (NoSQL database), and Hosting.

3. **Data Flow**: Interaction between the frontend and backend through Firebase SDKs, managing user authentication, data storage, and retrieval.

4. **Third-Party Integrations**: Potential use of additional APIs or services for specific functionalities (e.g., sending emails, notifications).

---

## **Architectural Components**

### **1. Frontend Architecture**

#### **1.1. Technology Stack**

- **React.js**: For building the user interface with components.
- **React Router**: For client-side routing and navigation.
- **Context API or Redux**: For state management across the application.
- **Material-UI or Ant Design**: For UI components and styling.
- **TypeScript (Optional)**: For type safety and better code maintainability.

#### **1.2. Component Structure**

Organize components into logical groupings:

- **Pages**: High-level components representing different views or routes (e.g., HomePage, ProfilePage, LearningModulePage).
- **Components**: Reusable UI elements (e.g., Button, ProgressBar, Navbar).
- **Layouts**: Components that define the structure of pages (e.g., DashboardLayout).
- **Contexts**: For managing global state (e.g., UserContext, ProgressContext).
- **Services**: Functions that interact with Firebase (e.g., authService, dataService).

#### **1.3. Routing**

Use **React Router** to manage navigation:

- **Public Routes**: Accessible without authentication (e.g., Login, SignUp, Initial Assessment).
- **Private Routes**: Require authentication (e.g., Dashboard, Learning Modules).
- **Route Protection**: Implement a higher-order component (HOC) to protect private routes.

#### **1.4. State Management**

- **Context API**: Utilize React's Context API to manage global state, such as user authentication status, user data, and progress tracking.
- **Separate Contexts**: Create separate contexts for different concerns (e.g., AuthContext, ProgressContext).

#### **1.5. Styling and Theming**

- **Component Libraries**: Use Material-UI or Ant Design for consistent styling and responsive design.
- **Custom Themes**: Define custom themes to match the app's branding.
- **CSS-in-JS**: Leverage the styling solutions provided by the UI library for modular and maintainable styles.

#### **1.6. Error Handling**

- Implement global error boundaries to catch and display errors gracefully.
- Handle asynchronous errors from Firebase operations.

---

### **2. Backend Architecture**

#### **2.1. Firebase Services**

- **Authentication**: Manage user sign-up, login, and authentication state.
- **Firestore**: Store and retrieve user data, progress, learning content, and app configurations.
- **Hosting**: Deploy the web application.
- **Cloud Functions (Optional)**: For server-side logic if needed in the future.

#### **2.2. Data Modeling**

Design the data structure in Firestore to efficiently store and retrieve data.

##### **2.2.1. Collections and Documents**

- **Users Collection (`users`)**
  - **Document ID**: User UID from Firebase Authentication.
  - **Fields**:
    - `name`: String
    - `email`: String
    - `joinedDate`: Timestamp
    - `currentLevel`: Number
    - `xp`: Number (Experience Points)
    - `badges`: Array of badge IDs
    - `preferences`: Object (e.g., language, theme)

- **Progress Collection (`progress`)**
  - **Document ID**: User UID
  - **Fields**:
    - `levels`: Map of level IDs to status (e.g., completed, in-progress)
    - `modules`: Map of module IDs to completion status
    - `assessmentResults`: Object

- **Learning Content Collection (`learningContent`)**
  - **Documents**: Each document represents a module.
  - **Fields**:
    - `moduleId`: String
    - `level`: Number
    - `title`: String
    - `content`: String (could be Markdown or HTML)
    - `quiz`: Array of quiz questions
    - `resources`: Array of additional resource links

- **Badges Collection (`badges`)**
  - **Documents**: Each document represents a badge.
  - **Fields**:
    - `badgeId`: String
    - `name`: String
    - `description`: String
    - `icon`: URL or asset reference

#### **2.3. Security Rules**

Implement Firestore security rules to protect data:

- **Users can only read and write their own data**.
- **Learning content is read-only** to users.
- **Validate data before writing** (e.g., data types, required fields).

#### **2.4. Functions (Optional)**

- Use **Firebase Cloud Functions** for server-side logic if needed, such as:

  - Sending emails or notifications.
  - Complex data processing.
  - Scheduled tasks.

---

### **3. Data Flow and Interaction**

#### **3.1. Authentication Flow**

1. **Sign-Up/Login**:

   - User enters credentials.
   - Frontend calls Firebase Authentication SDK.
   - Upon success, user receives a UID.

2. **Authentication State**:

   - Use `onAuthStateChanged` listener to detect authentication status.
   - Store user data in Context for global access.

#### **3.2. Initial Assessment and Level Assignment**

1. **Assessment Completion**:

   - User completes the initial questionnaire.
   - Frontend calculates the result.

2. **Data Storage**:

   - Store assessment results and assigned level in Firestore under the user's document.

3. **Redirect to Dashboard**:

   - User is directed to the appropriate starting point based on their level.

#### **3.3. Learning Modules Interaction**

1. **Fetching Content**:

   - Frontend retrieves learning modules from the `learningContent` collection based on the user's current level.

2. **Module Completion**:

   - Upon completing a module, update the `progress` collection with the module's completion status.

3. **Quizzes and Assessments**:

   - Store quiz results locally or in Firestore to track understanding.

#### **3.4. Progress Tracking and Gamification**

1. **Updating Progress**:

   - As users complete modules or levels, update their `xp` and `currentLevel` in the `users` collection.

2. **Awarding Badges**:

   - When milestones are reached, add badge IDs to the user's `badges` array.

3. **Retrieving Progress Data**:

   - Fetch progress data to display on the dashboard and profile pages.

#### **3.5. Suggestions and Recommendations**

1. **Determining Next Steps**:

   - Based on the user's current level and completed modules, determine the next recommended module.

2. **Displaying Suggestions**:

   - Show recommendations on the dashboard or after module completion.

---

### **4. Security and Privacy**

#### **4.1. Authentication and Authorization**

- **Firebase Authentication** ensures that only authenticated users can access certain data.
- **Security Rules** enforce that users can only access their own data.

#### **4.2. Data Validation**

- Validate all data before writing to Firestore to prevent malformed or malicious data.

#### **4.3. Privacy Compliance**

- Comply with relevant data protection regulations (e.g., GDPR).
- Provide a privacy policy explaining data usage.

---

### **5. Scalability and Performance**

#### **5.1. Efficient Data Queries**

- Use indexes in Firestore for queries that are frequently used.
- Structure data to minimize read and write operations.

#### **5.2. Code Splitting**

- Implement code splitting in React to optimize load times.
- Lazy load components that are not immediately needed.

#### **5.3. Caching**

- Utilize browser caching strategies to improve performance.
- Use service workers (optional) for offline capabilities.

---

### **6. Deployment and Continuous Integration**

#### **6.1. Deployment**

- **Firebase Hosting**:

  - Deploy the frontend application using Firebase's CLI tools.
  - Set up automatic deployments from the main branch.

#### **6.2. Continuous Integration (CI)**

- Set up a CI pipeline (e.g., GitHub Actions) to:

  - Run tests on push.
  - Lint and format code.
  - Build the application to catch build-time errors.

---

### **7. Development Workflow**

#### **7.1. Version Control**

- Use Git for version control.
- Follow branching strategies (e.g., feature branches, main branch for production).

#### **7.2. Code Quality**

- Use ESLint and Prettier for code consistency.
- Write comments and documentation for complex logic.

#### **7.3. Testing**

- Implement unit tests for components and utility functions.
- Use testing libraries like Jest and React Testing Library.

---

### **8. Potential Challenges and Solutions**

#### **8.1. Content Management**

- **Challenge**: Managing and updating learning content.
- **Solution**: Consider using a CMS like Contentful or integrating a simple admin interface in the future.

#### **8.2. Scalability**

- **Challenge**: As the app grows, managing complex state and data.
- **Solution**: Start with Context API; consider Redux or other state management libraries if needed.

#### **8.3. Offline Access**

- **Challenge**: Users may want access without internet connectivity.
- **Solution**: Implement Progressive Web App (PWA) features and cache essential content.

---

## **Component Breakdown**

### **Frontend Components**

#### **Authentication Components**

- **Login**: Form for user login.
- **SignUp**: Form for new user registration.
- **PrivateRoute**: HOC to protect routes that require authentication.

#### **Onboarding Components**

- **InitialAssessment**: Questionnaire component to assess the user's level.
- **AssessmentResult**: Displays the user's starting level.

#### **Dashboard Components**

- **Dashboard**: Main page showing progress, next steps, and suggestions.
- **ProgressOverview**: Visual representation of overall progress.
- **NextModule**: Highlight the next recommended module.

#### **Learning Module Components**

- **ModuleList**: Lists available modules for the user's level.
- **ModuleDetail**: Displays the content of a specific module.
- **Quiz**: Interactive component for module quizzes.

#### **Profile Components**

- **Profile**: Displays user information and achievements.
- **EditProfile**: Allows users to update their information.

#### **Gamification Components**

- **BadgeList**: Shows badges earned by the user.
- **XPBar**: Visualizes the user's experience points.

#### **Navigation Components**

- **Navbar**: Top or side navigation menu.
- **Footer**: Contains links to terms, privacy policy, etc.

### **Services and Utilities**

- **authService.js**: Handles authentication logic.
- **dataService.js**: Manages data interactions with Firestore.
- **utils.js**: Utility functions (e.g., date formatting).

---

## **Sample Data Flow**

1. **User Registration and Onboarding**

   - User signs up via the SignUp component.
   - `authService` registers the user with Firebase Authentication.
   - A new user document is created in Firestore under `users`.
   - User completes the Initial Assessment.
   - Assessment results and assigned level are stored in Firestore.

2. **Accessing the Dashboard**

   - Upon login, the app fetches the user's data and progress from Firestore.
   - Context providers store user data for access across components.
   - Dashboard displays current level, progress, and next recommended actions.

3. **Completing a Learning Module**

   - User selects a module from the ModuleList.
   - ModuleDetail fetches content from `learningContent`.
   - After reading the content, user takes a Quiz.
   - Upon completion, progress is updated in Firestore.
   - XP and badges are awarded as applicable.

4. **Progress and Level Advancement**

   - When all modules in a level are completed, the user's `currentLevel` is incremented.
   - New modules for the next level become available.
   - Dashboard reflects updated level and progress.

---

## **Sequence Diagrams**

While visual diagrams cannot be displayed here, you can create sequence diagrams for:

- **User Login Flow**
- **Module Completion Flow**
- **Progress Update Flow**

Use tools like [draw.io](https://app.diagrams.net/) or [SequenceDiagram.org](https://sequencediagram.org/) to visualize these interactions.

---

## **Conclusion**

The architecture outlined above provides a scalable and maintainable foundation for the application. By leveraging Firebase services, you simplify backend development and focus on delivering a robust frontend experience.

**Key Architectural Decisions:**

- **React.js** for a dynamic and responsive frontend.
- **Firebase** for authentication, data storage, and hosting.
- **Modular Component Structure** to promote code reusability and clarity.
- **Context API** for efficient state management in a solo developer context.
- **Security Best Practices** to protect user data and ensure privacy.

**Next Steps:**

- **Set Up the Project Structure** according to the architecture.
- **Implement Authentication and Onboarding** to allow user registration and initial assessment.
- **Develop Core Components** for the dashboard, learning modules, and progress tracking.
- **Create Learning Content** for Levels 1-3, ensuring accuracy and engagement.
- **Test Each Component Thoroughly** before moving to the next.
- **Deploy the MVP** to Firebase Hosting and gather user feedback.
