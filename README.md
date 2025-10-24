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

## Final Review

- Review all demo components
- Practice explaining each concept
- Test the app end-to-end
- Prepare to discuss trade-offs and decisions