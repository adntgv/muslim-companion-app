Let me analyze the project and help you prioritize the implementation tasks.

**Project Overview:**
Falah is a Muslim-focused personal growth application that helps users:
1. Configure and track daily Islamic practices/rituals
2. Build habits through consistent daily actions
3. View basic progress like daily streaks

Based on the current codebase, I see:
- Next.js frontend with TypeScript
- Firebase for backend services (migrated from Appwrite)
- PWA configuration
- Basic dashboard structure with daily tasks

**Recommended Initial Tasks (2-Week Sprint):**

### 1. Core Authentication & User Setup (3-4 days)
- [X] Implement Appwrite authentication flow
- [X] Migrate to Firebase authentication
- [X] Create user profile structure in database
- [X] Build signup/login screens
- [X] Set up protected routes

### 2. Daily Rituals Configuration & Tracking System (4-5 days)
- [X] Migrate from tasks localStorage to Appwrite database
- [X] Migrate from Appwrite to Firebase Firestore
- [ ] Users can define their daily actions/checklist
    - **User Flow:**
        - User navigates to a "Manage Actions" or "Configure Rituals" section.
        - User sees a list of their currently defined actions.
        - User clicks an "Add New Action" button.
        - A form/modal appears allowing the user to input:
            - Title (e.g., "Fajr Prayer", "Read Quran")
            - Description (optional)
            - Type (`daily_ritual` or `habit_building`)
        - User saves the new action.
        - The new action appears in their list.
    - **Data Flow:**
        - Frontend sends a request to create a new `UserDailyActionConfig` object.
        - Backend service validates the input.
        - Service creates a new document in the `UserDailyActionsConfig` Firestore collection.
    - **DTOs:**
        - `CreateUserDailyActionConfigDto`: { title: string; description?: string; type: 'daily_ritual' | 'habit_building'; }
        - `UserDailyActionConfigDto`: (as defined in schema)
    - **Repositories:**
        - `UserDailyActionConfigRepository`:
            - `add(userId: string, data: CreateUserDailyActionConfigDto): Promise<UserDailyActionConfig>`
            - `getAllByUserId(userId: string): Promise<UserDailyActionConfig[]>`
    - **Services:**
        - `UserDailyActionConfigService`:
            - `createAction(userId: string, data: CreateUserDailyActionConfigDto): Promise<UserDailyActionConfig>`
            - `getActions(userId: string): Promise<UserDailyActionConfig[]>`
    - **Views (Frontend Components):**
        - `ActionsListPage.tsx`: Displays the list of actions, "Add New" button.
        - `ActionCard.tsx`: Displays a single action item in the list.
        - `AddEditActionModal.tsx` or `AddEditActionForm.tsx`: Form for creating/editing an action.
- [ ] Add CRUD operations for these configured actions
    - **C (Create):** Covered above.
    - **R (Read):**
        - **User Flow:** User views their list of configured actions on the "Manage Actions" page or on a daily tracking view.
        - **Data Flow:** Frontend requests actions for the logged-in user. Backend service retrieves from `UserDailyActionsConfig` collection.
        - **Repositories:** `UserDailyActionConfigRepository.getAllByUserId(userId: string)` (already listed)
        - **Services:** `UserDailyActionConfigService.getActions(userId: string)` (already listed)
    - **U (Update):**
        - **User Flow:**
            - User clicks an "Edit" button on an existing action.
            - The `AddEditActionModal.tsx` or `AddEditActionForm.tsx` appears, pre-filled with action data.
            - User modifies the details and saves.
            - The action list updates.
        - **Data Flow:** Frontend sends an update request with `actionConfigId` and new data. Backend service validates and updates the corresponding document in `UserDailyActionsConfig`.
        - **DTOs:**
            - `UpdateUserDailyActionConfigDto`: { title?: string; description?: string; type?: 'daily_ritual' | 'habit_building'; isActive?: boolean; }
        - **Repositories:**
            - `UserDailyActionConfigRepository.update(actionConfigId: string, data: Partial<UpdateUserDailyActionConfigDto>): Promise<UserDailyActionConfig>`
        - **Services:**
            - `UserDailyActionConfigService.updateAction(actionConfigId: string, data: UpdateUserDailyActionConfigDto): Promise<UserDailyActionConfig>`
    - **D (Delete/Deactivate):** We'll focus on deactivation (`isActive: false`) to preserve history. True deletion can be a future consideration.
        - **User Flow:**
            - User clicks a "Deactivate" (or "Archive") button on an existing action.
            - A confirmation prompt appears.
            - Upon confirmation, the action is marked as inactive (e.g., visually greyed out or moved to an "Archived" section). It should not appear in the primary list for daily tracking.
        - **Data Flow:** Frontend sends a request to mark action as inactive. Backend service updates `isActive` field to `false` for the specified `actionConfigId`.
        - **Repositories:** `UserDailyActionConfigRepository.update` (can be used by setting `isActive: false`).
        - **Services:** `UserDailyActionConfigService.deactivateAction(actionConfigId: string): Promise<UserDailyActionConfig>` (effectively calls update service).
    - **Views (Frontend Components):**
        - (Components from "Create" are reused, e.g., `AddEditActionModal.tsx`)
        - Confirmation dialog component.
- [ ] Implement daily tracking of completed/missed actions
    - **User Flow:**
        - User navigates to the main dashboard or a "Today's Actions" view.
        - User sees a list of their *active* `UserDailyActionConfig` items for the current day.
        - For each action, user can mark it as "Completed" or "Missed".
        - The UI updates to reflect the status.
        - If an action is already logged for the day, its status is displayed and can be changed.
    - **Data Flow:**
        - Frontend fetches active `UserDailyActionConfig` for the user.
        - Frontend also fetches `DailyLog` entries for the current user and current date.
        - When user marks an action:
            - If a `DailyLog` entry for that `actionConfigId` and `date` exists, update its `status`.
            - If not, create a new `DailyLog` entry with the `status`.
        - Backend service handles creation/update of `DailyLog` documents in Firestore.
    - **DTOs:**
        - `DailyLogDto`: (as defined in schema)
        - `UpdateDailyLogDto`: { status: 'completed' | 'missed' | 'pending'; notes?: string; }
        - `CreateDailyLogDto`: { actionConfigId: string; date: Date; status: 'completed' | 'missed' | 'pending'; notes?: string; }
    - **Repositories:**
        - `DailyLogRepository`:
            - `getByUserIdAndDate(userId: string, date: Date): Promise<DailyLog[]>`
            - `getByUserIdAndActionConfigIdAndDate(userId: string, actionConfigId: string, date: Date): Promise<DailyLog | null>`
            - `add(userId: string, data: CreateDailyLogDto): Promise<DailyLog>`
            - `update(dailyLogId: string, data: UpdateDailyLogDto): Promise<DailyLog>`
    - **Services:**
        - `DailyLogService`:
            - `getLogsForDate(userId: string, date: Date): Promise<DailyLog[]>`
            - `logActionStatus(userId: string, actionConfigId: string, date: Date, status: 'completed' | 'missed', notes?: string): Promise<DailyLog>`
    - **Views (Frontend Components):**
        - `DailyActionsDashboardPage.tsx` or `TodayView.tsx`: Displays the list of actions for the day.
        - `DailyActionItem.tsx`: Represents a single action with buttons/checkboxes to mark status.
- [ ] Ensure configuration changes don't alter past tracking data
    - **Consideration:** This is a critical design principle.
    - The `DailyLog` stores `actionConfigId`. If `UserDailyActionConfig`'s `title` or `description` changes, old `DailyLog` entries still point to the same `actionConfigId`.
    - When displaying historical data (e.g., "What did I complete last Tuesday for 'Fajr Prayer'?"), if "Fajr Prayer" (actionConfigId: 'xyz123') was renamed to "Morning Prayer", the historical log should ideally still be easily understandable.
    - **Strategy 1 (Simple):** When displaying past logs, fetch the `UserDailyActionConfig` *as it was at that time* is complex. Instead, `DailyLog` might need to store a snapshot of essential details like `title` if they are expected to change and historical accuracy of the title itself is paramount. *For now, the current schema assumes `DailyLog` refers to `actionConfigId` and if the config changes, past logs point to the *current* version of that config title/description. This is simpler to implement initially.*
    - **Strategy 2 (Snapshotting - for future consideration):** Add `actionTitleSnapshot: string` to `DailyLog`.
    - **Current Plan:** Proceed with the simpler model. If `UserDailyActionConfig.title` changes, past logs will effectively show the new title when a join/lookup is performed. Deactivating an action (`isActive: false`) ensures it doesn't appear for *new* daily tracking, but its historical logs remain.
    - **Task:** Verify during implementation that `DailyLog` entries are immutable regarding their core data once logged, and that `UserDailyActionConfig` changes (especially deactivation or title/description edits) do not corrupt or incorrectly represent past logged data.
        - Test case: Log action A. Edit action A's title. View past log for action A; it should reflect the new title but correctly associate with the original action's completion.
        - Test case: Log action B. Deactivate action B. Ensure action B does not show up for today's tracking. View past log for action B; it should still be there.

### 3. Basic Habit Progress (1-2 days)
- [ ] Create user progress schema for daily streaks
    - **Schema Reference:** The `UserProgress` schema is already defined in the "Database Schema to Implement First" section:
      ```typescript
      // UserProgress Collection (Simplified)
      interface UserProgress {
        userId: string;
        // Stores streaks for each active UserDailyActionConfig. Key is actionConfigId.
        streaks: Record<string, { current: number; longest: number }>;
        lastUpdated: Date;
      }
      ```
    - **Task:** Confirm this schema is sufficient for initial streak tracking. For each `actionConfigId`, we store its current and longest streak.
- [ ] Implement logic to calculate daily streaks for configured actions
    - **User Flow (System Initiated/Background):**
        - When a user marks an action as 'completed' in `DailyLog` for a given day.
        - When a user marks an action as 'missed' or a day passes without a 'completed' log for an action that was previously part of a streak.
    - **Data Flow & Logic:**
        - This logic will likely reside in a service layer, triggered after a `DailyLog` is created or updated.
        - **On `DailyLog` update (action marked 'completed'):**
            - For the given `userId` and `actionConfigId`:
            - Retrieve the `UserProgress` document.
            - Retrieve relevant `DailyLog` entries for that action, ordered by date (e.g., last N days to check continuity).
            - Calculate the new `current` streak: Check if yesterday's log for this action was 'completed'. If yes, increment. If no (or no log), current streak becomes 1.
            - Update `longest` streak if `current` streak surpasses it.
            - Update `UserProgress.streaks[actionConfigId]` and `UserProgress.lastUpdated`.
        - **On `DailyLog` update (action marked 'missed' or day passes):**
            - For the given `userId` and `actionConfigId`:
            - Retrieve `UserProgress`.
            - If the action was part of an active streak that is now broken (e.g., marked 'missed' or current date > last logged date + 1 day and status wasn't 'completed'):
                - Set `current` streak for that `actionConfigId` to 0.
            - Update `UserProgress.streaks[actionConfigId]` and `UserProgress.lastUpdated`.
        - **Triggering Streak Calculation:**
            - Option A (Immediate): After every relevant `DailyLog` update via `DailyLogService`.
            - Option B (Batch/Scheduled): A daily or periodic function that scans recent `DailyLog` entries and updates `UserProgress`. (More complex, perhaps for later optimization).
            - **Recommendation:** Start with Option A for simplicity. The `DailyLogService.logActionStatus` could trigger a `UserProgressService.updateStreaks` method.
    - **DTOs:**
        - `UserProgressDto`: (as defined in schema)
    - **Repositories:**
        - `UserProgressRepository`:
            - `getByUserId(userId: string): Promise<UserProgress | null>`
            - `upsert(userId: string, data: Partial<UserProgress>): Promise<UserProgress>` (to create if not exists, or update)
        - `DailyLogRepository` (methods already defined, e.g., `getByUserIdAndActionConfigIdAndDateRange(userId: string, actionConfigId: string, startDate: Date, endDate: Date): Promise<DailyLog[]>`) - *New method needed for streak calculation*
    - **Services:**
        - `UserProgressService`:
            - `calculateAndUpdateStreaks(userId: string, actionConfigId: string, relevantDate: Date, newStatus: 'completed' | 'missed'): Promise<UserProgress>`
            - `getUserProgress(userId: string): Promise<UserProgress | null>`
        - `DailyLogService` should call `UserProgressService.calculateAndUpdateStreaks` after successfully logging an action.
    - **Edge Cases to Consider:**
        - What if a user retroactively logs actions for past dates? Streaks should recalculate correctly.
        - Timezone considerations: Ensure "yesterday" and "today" are based on the user's timezone if specified, or a consistent timezone (e.g., UTC for log dates, with user's preference for display).
- [ ] Display streaks to the user
    - **User Flow:**
        - User views their dashboard or a dedicated "Progress" or "Stats" page.
        - User sees their current and longest streaks displayed for each of their active configured actions.
    - **Data Flow:**
        - Frontend requests `UserProgress` data for the logged-in user.
        - Frontend also needs the list of `UserDailyActionConfig` to display action titles alongside streaks.
        - Service layer provides this data.
    - **Repositories:**
        - `UserProgressRepository.getByUserId(userId: string)` (already listed)
        - `UserDailyActionConfigRepository.getAllByUserId(userId: string)` (already listed)
    - **Services:**
        - `UserProgressService.getUserProgress(userId: string)` (already listed)
        - `UserDailyActionConfigService.getActions(userId: string)` (already listed)
    - **Views (Frontend Components):**
        - `DashboardPage.tsx` (enhancement): Potentially display key streaks here.
        - `ProgressOverviewPage.tsx`: A dedicated page for all streaks and other stats.
        - `StreakDisplayCard.tsx` or `ActionProgressItem.tsx`: Component to show title, current streak, longest streak for one action.

**Database Schema to Implement First:**

```typescript
// Users Collection
interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: Date;
  lastActive: Date;
  preferences: {
    language: string;
    // prayerTimesMethod: number; // Removed as per simplification focus
    timezone: string;
  }
}

// UserDailyActionsConfig Collection (New or renamed from DailyTask)
// Represents the actions a user wants to track daily
interface UserDailyActionConfig {
  id: string; // Unique ID for this configured action
  userId: string;
  title: string; // e.g., "Fajr Prayer", "Read 1 page of Quran", "Morning Dhikr"
  description?: string; // Optional details
  type: 'daily_ritual' | 'habit_building'; // Helps categorize
  createdAt: Date;
  isActive: boolean; // User can deactivate without deleting, preserving history
}

// DailyLog Collection (New or significantly modified from DailyTask/Progress)
// Tracks the status of each configured action for a specific day
interface DailyLog {
  id: string; // Unique ID for this log entry
  userId: string;
  actionConfigId: string; // Foreign key to UserDailyActionConfig
  date: Date; // The specific day this log is for
  status: 'completed' | 'missed' | 'pending'; // Pending could be for future/current day before user input
  notes?: string; // Optional user notes for the day
}

// UserProgress Collection (Simplified)
interface UserProgress {
  userId: string;
  // Stores streaks for each active UserDailyActionConfig. Key is actionConfigId.
  streaks: Record<string, { current: number; longest: number }>;
  lastUpdated: Date;
}
```

**Technical Setup Tasks:**

### 1. Environment & Configuration
- [X] Set up environment variables
- [X] Configure Firebase collections and indexes
- [ ] Set up error tracking (e.g., Sentry) - To be implemented later

### 2. Authentication Flow
- [X] Implement auth context
- [X] Add session management
- [X] Create protected route wrapper

### 3. State Management
- [X] Set up global state structure
- [ ] Implement data caching strategy (basic)
- [ ] Consider offline support for daily check-ins (basic)

## Comprehensive Development Roadmap (Simplified)

### Phase 1: Core Functionality
- [X] **Project Setup**
  - [X] Initialize Git repository
  - [X] Set up project structure with Next.js
  - [X] Install dependencies (React, Firebase, UI library)
  - [X] Configure ESLint and Prettier
- [X] **Firebase Configuration**
  - [X] Create Firebase project
  - [X] Set up Authentication and Firestore
  - [X] Configure environment variables
- [X] **User Authentication**
  - [X] Implement sign-up and login forms
  - [X] Set up authentication context
  - [X] Protect private routes
- [ ] **Profile Setup**
  - [ ] Develop basic profile page (e.g., manage account, preferences)
      - **User Flow:**
          - User navigates to a "Profile" or "Account Settings" page.
          - User sees their current profile information (e.g., name, email).
          - User can update their name.
          - User can manage preferences (e.g., language - initially fixed, timezone - for future prayer times).
          - User saves changes.
      - **Data Flow:**
          - Frontend fetches the current user's data (from auth context and/or `Users` Firestore collection).
          - On update, frontend sends changed data to a backend service.
          - Backend service validates and updates the `Users` document in Firestore.
      - **DTOs:**
          - `UserDto`: (as defined in schema: `id`, `name`, `email`, `joinedDate`, `lastActive`, `preferences`)
          - `UpdateUserProfileDto`: { `name?`: string; `preferences?`: { `language?`: string; `timezone?`: string; } }
      - **Repositories:**
          - `UserRepository`:
              - `getById(userId: string): Promise<User | null>` (May already exist or be part of auth user object retrieval)
              - `update(userId: string, data: UpdateUserProfileDto): Promise<User>`
      - **Services:**
          - `UserService` or `UserProfileService`:
              - `getUserProfile(userId: string): Promise<User | null>`
              - `updateUserProfile(userId: string, data: UpdateUserProfileDto): Promise<User>`
      - **Views (Frontend Components):**
          - `ProfilePage.tsx`: Main page for displaying and editing profile information.
          - `ProfileForm.tsx`: Form for editing user details and preferences.
  - [ ] Implement profile data storage in Firestore (using simplified User schema)
      - **Schema Reference:** `User` schema is already defined.
      - **Task:** Ensure that on user signup, a corresponding document is created in the `Users` collection in Firestore if not automatically handled by Firebase Auth triggers (e.g., a Firebase Function on user create).
          - If a new user signs up via Firebase Auth, their basic info (UID, email) is available. We might need a function or client-side logic to create the `User` document in Firestore with default values (name from email if possible, default preferences, `joinedDate`).
      - **Consideration:** `lastActive` field should be updated periodically when the user interacts with the app. This could be a backend middleware or a client-side call on significant actions.
- [ ] **Daily Rituals Configuration**
  - [ ] Design UI for users to define their daily actions (CRUD for `UserDailyActionConfig`)
      - **Note:** Detailed breakdown of UI components (`ActionsListPage.tsx`, `ActionCard.tsx`, `AddEditActionModal.tsx`), user flows, and CRUD operations are covered in section "Recommended Initial Tasks > 2. Daily Rituals Configuration & Tracking System". This task focuses on the visual design and frontend implementation of those components.
  - [ ] Implement logic to store these configurations in Firestore
      - **Note:** Detailed breakdown of DTOs (`CreateUserDailyActionConfigDto`, `UpdateUserDailyActionConfigDto`), Repositories (`UserDailyActionConfigRepository`), and Services (`UserDailyActionConfigService`) for Firestore interaction are covered in section "Recommended Initial Tasks > 2. Daily Rituals Configuration & Tracking System". This task focuses on the backend and frontend logic to connect the UI to these services.
- [ ] **Daily Tracking Interface**
  - [ ] Design UI for users to mark their daily configured actions as complete/missed
      - **Note:** Detailed breakdown of UI components (`DailyActionsDashboardPage.tsx`, `DailyActionItem.tsx`), user flows for marking actions are covered in section "Recommended Initial Tasks > 2. Daily Rituals Configuration & Tracking System". This task focuses on the visual design and frontend implementation.
  - [ ] Implement logic to create/update `DailyLog` entries in Firestore
      - **Note:** Detailed breakdown of DTOs (`CreateDailyLogDto`, `UpdateDailyLogDto`), Repositories (`DailyLogRepository`), and Services (`DailyLogService`) for Firestore interaction are covered in section "Recommended Initial Tasks > 2. Daily Rituals Configuration & Tracking System". This task focuses on the backend and frontend logic for logging daily actions.

### Phase 2: Basic Progress & Refinements
- [ ] **Streak Display**
  - [ ] Design UI to show current and longest streaks for each active ritual/habit
      - **Note:** Detailed breakdown of UI components (`DashboardPage.tsx` enhancement, `ProgressOverviewPage.tsx`, `StreakDisplayCard.tsx`), user flows, and data requirements are covered in section "Recommended Initial Tasks > 3. Basic Habit Progress" under "Display streaks to the user". This task focuses on visual design and frontend implementation.
  - [ ] Implement logic to calculate and update streaks in `UserProgress`
      - **Note:** Detailed breakdown of logic, DTOs, Repositories (`UserProgressRepository`, `DailyLogRepository`), and Services (`UserProgressService`) for streak calculation is covered in section "Recommended Initial Tasks > 3. Basic Habit Progress" under "Implement logic to calculate daily streaks for configured actions". This task focuses on the backend and frontend logic implementation.
- [ ] **Basic Notifications (Optional - evaluate need)**
  - [ ] Implement simple reminders for daily check-ins if deemed essential.
      - **Product Consideration:** Evaluate if users need/want this. Could be a simple, non-intrusive browser notification if the PWA is active, or a push notification if full PWA capabilities are leveraged later.
      - **User Flow (if implemented):**
          - User (optionally) enables notifications in settings.
          - At a configurable time (or a default time, e.g., evening), if the user hasn't completed all/key actions, a reminder is triggered.
      - **Technical Considerations (Initial Thoughts - requires deeper dive if pursued):**
          - Frontend: Requesting notification permission. Displaying notification.
          - Backend: Logic to determine when to send a notification (e.g., check `DailyLog` status for the day). A scheduled function (e.g., Firebase Scheduled Function) might be needed.
          - Service: `NotificationService` (potentially).
      - **Decision:** Defer implementation until core features are solid and user feedback suggests this is valuable. Mark as low priority for now.
- [ ] **Data Integrity & Past Records**
  - [ ] Ensure that if a user modifies their `UserDailyActionConfig` (e.g., deactivates an action or changes its title), past `DailyLog` entries and streak calculations remain unaffected and historically accurate.
      - **Note:** This is a critical principle. Strategies and test cases are discussed in section "Recommended Initial Tasks > 2. Daily Rituals Configuration & Tracking System" under the point "Ensure configuration changes don't alter past tracking data".
      - **Task:** Rigorous testing during and after implementation of `UserDailyActionConfig` CRUD and `DailyLog` creation is key. This includes verifying that streak calculations also respect historical accuracy after config changes.

### Phase 3: Testing and Deployment
- [ ] **Functional Testing**
  - [ ] Test all core features: auth, ritual configuration, daily tracking, streak calculation.
      - **Scope:** End-to-end testing of user flows defined in earlier sections. Cover success paths and common error cases.
      - **Examples:**
          - Signup -> Create Action -> Log Action daily for 3 days -> Verify streak = 3.
          - Edit Action Title -> Verify past logs still associated, streak continues.
          - Deactivate Action -> Verify it doesn't show for today, but past logs & streaks remain.
  - [ ] Verify data security and integrity, especially regarding historical data.
      - **Focus:** Firestore security rules (ensure users can only access/modify their own data). Test scenarios involving data modification (e.g., editing profile, changing action config) to ensure no unintended side-effects on other data or historical records.
  - [ ] Ensure usability on main target devices.
      - **Target Devices:** Define primary targets (e.g., modern desktop browsers - Chrome, Firefox, Safari; mobile browsers - iOS Safari, Android Chrome). Test responsive design and PWA behavior if applicable.
- [ ] **User Feedback (Small Scale)**
  - [ ] Gather feedback from a few test users.
      - **Methodology:** Identify 3-5 friendly users. Provide them with access to a staging/test version. Ask them to perform common tasks. Collect feedback via informal interviews, surveys, or a shared document.
      - **Focus Areas:** Ease of use, clarity of features, bugs encountered, desired improvements.
- [ ] **Refinements**
  - [ ] Address critical bugs and usability issues.
      - **Prioritization:** Based on functional testing and user feedback, prioritize and fix showstopper bugs and major usability hurdles before a wider release.
  - [ ] Optimize app performance for core flows.
      - **Focus:** Identify any slow-loading pages or interactions, particularly in daily tracking and dashboard views. Check Firestore query efficiency. Optimize client-side rendering if needed.
      - **Tools:** Browser developer tools (Lighthouse, Performance tab), Firebase Performance Monitoring (if integrated).

Would you like me to elaborate on any of these areas or provide more specific technical details for implementation?
