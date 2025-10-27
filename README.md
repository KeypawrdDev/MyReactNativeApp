# React Native Interview Prep - 4 Day Plan

## Overview

Intensive 4-day study plan with practical implementations for each major concept. Each day focuses on a core topic area with hands-on demos built into the MyReactNativeApp project.

## Day 1: React & JavaScript Core (6-8 hours)

### Morning: Component Patterns & Hooks

**Study Topics:**

- JSX and rendering logic
- Function components with hooks (useEffect, useMemo, useCallback)
- Component lifecycle patterns
- Props vs state

**Hands-on Implementation:**
Create `src/demos/Day1/` folder with:

- `HooksDemo.tsx` - Demonstrate useEffect, useMemo, useCallback with real examples
- `LifecycleDemo.tsx` - Show component mounting/unmounting, cleanup
- `PropsVsStateDemo.tsx` - Interactive comparison

**Resources:**

- React.dev - Hooks documentation
- Review React lifecycle diagrams

### Afternoon: State Management & Async

**Study Topics:**

- useState patterns and best practices
- Context API implementation
- Redux/Zustand basics
- Async/await, Promises
- ES6+ syntax (spread/rest, destructuring, arrow functions)

**Hands-on Implementation:**

- `StateManagementDemo.tsx` - Context API with complex state
- `AsyncDemo.tsx` - Fetch data, loading states, error handling
- `ES6SyntaxDemo.tsx` - Practical examples of modern JS

**Resources:**

- JavaScript.info - Promises/Async section
- FrontendMasters React interview questions

---

## Day 2: React Native Specifics (6-8 hours)

### Morning: Core Architecture & Navigation

**Study Topics:**

- React Native bridge and rendering
- React Navigation (Stack, Tab, Drawer)
- Platform-specific code (Platform.OS)
- Styling with StyleSheet and Flexbox

**Hands-on Implementation:**
Create navigation structure:

- Install React Navigation packages
- `src/navigation/` - Setup Stack, Tab, Drawer navigators
- `src/demos/Day2/PlatformDemo.tsx` - Platform.OS conditionals
- `src/demos/Day2/StyleDemo.tsx` - Flexbox layouts, responsive design

**Resources:**

- React Native Docs - Core Components
- React Navigation documentation

### Afternoon: Performance & Optimization

**Study Topics:**

- FlatList vs ScrollView
- Memoization (React.memo, useMemo, useCallback)
- Re-render optimization
- Native modules overview

**Hands-on Implementation:**

- `PerformanceDemo.tsx` - FlatList with optimizations (keyExtractor, getItemLayout)
- `MemoizationDemo.tsx` - Before/after performance comparison
- Add React DevTools profiler usage

**Resources:**

- Callstack: "Performance Optimization in React Native"
- React Native Performance docs

---

## Day 3: Mobile Development Concepts (6-8 hours)

### Morning: Storage, Security & Deep Linking

**Study Topics:**

- AsyncStorage vs SecureStore
- Deep linking configuration
- Navigation with params
- App architecture patterns

**Hands-on Implementation:**

- Install `@react-native-async-storage/async-storage`
- `src/demos/Day3/StorageDemo.tsx` - CRUD operations with AsyncStorage
- `src/demos/Day3/DeepLinkingDemo.tsx` - Handle deep links
- Configure deep linking in `android/app/src/main/AndroidManifest.xml` and `ios/` info.plist

**Resources:**

- React Navigation - Deep Linking guide
- AsyncStorage documentation

### Afternoon: Push Notifications & Updates

**Study Topics:**

- Push notifications (Firebase Cloud Messaging basics)
- OTA updates (CodePush/Expo Updates concepts)
- Versioning strategies
- App store deployment overview

**Hands-on Implementation:**

- `src/demos/Day3/NotificationsDemo.tsx` - Local notifications setup
- Document deployment checklist in `DEPLOYMENT.md`
- Review app.json and build configurations

**Resources:**

- Firebase Cloud Messaging docs
- "The React Native Lifecycle of an App" (Medium)
- Expo Updates or CodePush guides

---

## Day 4: Testing & CI/CD (6-8 hours)

### Morning: Unit & Snapshot Testing

**Study Topics:**

- Jest configuration
- Component testing best practices
- Snapshot testing
- Mocking patterns

**Hands-on Implementation:**

- Update `jest.config.js` if needed
- `__tests__/demos/HooksDemo.test.tsx` - Test hooks behavior
- `__tests__/demos/AsyncDemo.test.tsx` - Test async operations with mocks
- Create snapshot tests for key components

**Resources:**

- Jest documentation
- React Native Testing Library

### Afternoon: E2E Testing & CI/CD

**Study Topics:**

- Detox setup and configuration
- E2E test patterns
- CI/CD pipelines (GitHub Actions, Fastlane overview)
- QA tools (TestFlight, Firebase App Distribution)

**Hands-on Implementation:**

- Create basic Detox configuration file
- Write 1-2 simple E2E tests
- `docs/CI_CD_NOTES.md` - Document CI/CD pipeline concepts
- Create `.github/workflows/react-native-ci.yml` template

**Resources:**

- Detox documentation
- "End-to-End App Store Deployment with React Native" YouTube
- GitHub Actions for React Native

---

## Interview Prep Checklist

Create `INTERVIEW_PREP.md` with:

- Common React Native interview questions & answers
- Code snippets for quick reference
- Performance optimization checklist
- Debugging strategies
- Architecture decision explanations

## Studies Section

### JavaScript Event Loop & Async Programming

This section covers the fundamental concepts of JavaScript's event loop, async programming, and how they work in React Native.

#### Thread Architecture in React Native

React Native uses a multi-threaded architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   JavaScript    │    │   Native UI     │    │   Background    │
│     Thread      │    │     Thread      │    │    Threads      │
│                 │    │                 │    │                 │
│ • Event Loop    │    │ • UI Rendering  │    │ • Network       │
│ • Call Stack    │    │ • Touch Events  │    │ • File I/O     │
│ • Your Code     │    │ • Animations    │    │ • Timers       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### The Event Loop

The JavaScript Event Loop runs on the JavaScript Thread and manages asynchronous operations:

```
┌─────────────────────────────────────────────────────────────┐
│                    JavaScript Thread                        │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Call      │    │   Micro     │    │   Macro     │     │
│  │   Stack     │    │   Tasks     │    │   Tasks     │     │
│  │             │    │   Queue     │    │   Queue     │     │
│  │ • Functions │    │ • Promises  │    │ • setTimeout│     │
│  │ • await     │    │ • await     │    │ • setInterval│     │
│  │ • React     │    │ • .then()   │    │ • fetch()   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Event Loop                              │ │
│  │  1. Execute Call Stack                                 │ │
│  │  2. Check Micro Tasks                                  │ │
│  │  3. Check Macro Tasks                                  │ │
│  │  4. Repeat                                             │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Blocking vs Non-Blocking Code

**Blocking Code (Bad):**
```typescript
const blockingFunction = () => {
  // This blocks the JavaScript Thread
  for (let i = 0; i < 1000000000; i++) {
    // JavaScript Thread is busy here
    // Call Stack: [blockingFunction frame] ← STUCK
    // Event Loop: CAN'T process anything
  }
};
```

**Non-Blocking Code with `await` (Good):**
```typescript
const fetchUsers = async () => {
  const response = await fetch('https://api.example.com/users');
  // JavaScript Thread PAUSES here
  // Call Stack: [fetchUsers frame] ← PAUSED (not stuck)
  // Event Loop: CAN process other events
};
```

#### How `await` Works

When you use `await`, here's what happens:

1. **JavaScript Thread**: Initiates the request
2. **JavaScript Thread**: Pauses function execution
3. **IO Thread**: Handles the actual network work
4. **Event Loop**: Manages communication and processes other events
5. **IO Thread**: Notifies when complete
6. **Event Loop**: Notifies JavaScript Thread
7. **JavaScript Thread**: Resumes function execution

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   JavaScript    │    │   Event Loop    │    │   IO Thread     │
│     Thread      │    │                 │    │                 │
│                 │    │                 │    │                 │
│ await fetch()   │───→│ Schedule IO     │───→│ Network Request │
│ Function pauses │    │                 │    │                 │
│                 │    │                 │    │                 │
│ Function resumes│←───│ Notify JS       │←───│ Response ready  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Function Frames and Call Stack

When a function is called, JavaScript creates a **function frame** and places it on the **Call Stack**:

```typescript
const blockingFunction = () => {
  for (let i = 0; i < 1000000000; i++) {
    // Function frame stays on Call Stack
    // Event Loop waits for Call Stack to be empty
  }
};
```

**Call Stack Timeline:**
```
Before function call:
Call Stack: [] (empty)

Function called:
Call Stack: [blockingFunction frame] ← Frame added

During loop:
Call Stack: [blockingFunction frame] ← Frame STAYS on stack

After completion:
Call Stack: [] (frame removed)
```

#### Non-Blocking Pattern

To keep the UI responsive during heavy operations:

```typescript
const nonBlockingFunction = async () => {
  for (let i = 0; i < 1000000; i++) {
    // Do some work
    
    if (i % 10000 === 0) {
      // Yield control back to event loop
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
};
```

**What `await new Promise(resolve => setTimeout(resolve, 0))` does:**
- Pauses the function
- Yields control to the Event Loop
- Allows other events to be processed
- Resumes after the next tick

#### Key Concepts Summary

- **JavaScript Thread**: Single-threaded, can only do one thing at a time
- **Event Loop**: Manages async operations and event processing
- **Call Stack**: Stores function frames during execution
- **`await`**: Pauses function but doesn't block Event Loop
- **IO Threads**: Handle network requests and file operations
- **Bridge**: Communicates between JavaScript and Native threads

#### Why This Matters for React Native

Understanding these concepts helps you:
- Write responsive apps that don't freeze
- Handle async operations properly
- Debug performance issues
- Implement proper loading states
- Avoid blocking the main thread

## Final Review

- Review all demo components
- Practice explaining each concept
- Test the app end-to-end
- Prepare to discuss trade-offs and decisions