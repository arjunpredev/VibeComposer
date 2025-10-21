## Executive Summary

VibeComposer (Strudel) migration and scope: Migrate the existing Vite-based React 19 TypeScript SPA to Remix using the latest packages while preserving UI/UX, dark theme, responsive split-screen (Strudel REPL left, AI chat right), client-side Anthropic API usage, localStorage persistence for API keys and chat history, Zustand state, Tailwind v4 styling, Radix UI components, and Render deployment. Enable server-side capability for future backend integration without altering current user experience. Deliverables: project plan, mapped AS-IS user flows and architecture, new TO-BE user flows and architecture for Remix migration, epics, user stories (tagging new scoped work with inScope: true), estimated hours, stakeholders, personas, goals, KPIs, competitive analysis, and complexity assessment. Expected outcome: a migration strategy that maintains parity with existing features, adds Remix routing and SSR readiness, and sets up a clear path for backend enablement.

## Core Functionalities

- **Split-screen REPL & Chat Interface**: Maintain and migrate the split UI with Strudel REPL on the left and AI chat on the right, preserving responsive layouts and mobile tab navigation. (Priority: **High**)
- **Anthropic API Integration (Client-side)**: Keep Anthropic client-side integration for real-time AI code generation and chat functionality, including secure localStorage handling of API keys. (Priority: **High**)
- **State Persistence & Migration**: Preserve Zustand state logic and localStorage persistence for chat history, settings, and API keys during migration to Remix, ensuring no UX changes. (Priority: **High**)
- **Remix Migration & SSR Enablement**: Migrate project from Vite to Remix using latest packages, add server-ready architecture while preserving UI/UX and deployment targets for future backend integration. (Priority: **High**)
- **UI/Styling & Component Porting**: Port Tailwind v4, Radix UI components, and existing React components to Remix with TypeScript, ensuring dark theme and responsive behavior remain intact. (Priority: **Medium**)

## Tech Stack

- **Frontend**: Remix, React 19.1.1, TypeScript 5.9.3, Tailwind CSS, Zustand, Radix UI, Vite
- **API**: @anthropic-ai/sdk
- **Styling**: PostCSS
- **Deployment**: Render

## Development Guidelines & Best Practices

Follow these guidelines while implementing the project:

- **Placeholder Images**: Use [Unsplash](https://unsplash.com) or [Picsum Photos](https://picsum.photos) for placeholder images
  - Example: `https://source.unsplash.com/random/800x600?nature`
  - Example: `https://picsum.photos/800/600`
- **Code Quality**: Write clean, maintainable code with proper comments and documentation
- **Testing**: Test each feature thoroughly before marking it as complete
- **Commit Messages**: Use clear, descriptive commit messages that reference the task/story ID
- **Error Handling**: Implement proper error handling and user-friendly error messages
- **Responsive Design**: Ensure all UI components work across mobile, tablet, and desktop devices
- **Accessibility**: Follow WCAG guidelines for accessible UI components
- **Performance**: Optimize images, minimize bundle sizes, and implement lazy loading where appropriate
- **Security**: Never commit API keys or sensitive credentials; use environment variables
- **API & Model Versions**: Always use the latest available APIs and models unless the user explicitly specifies a different version
- **Progress Updates**: Update task checkboxes in real-time as you work through the plan

## Project Timeline

This plan lays out your roadmap in **Milestones**, **Stories** with acceptance criteria, and **Subtasks**. Follow the plan task by task and update progress on milestones, stories, and subtasks immediately as you work on them based on the legend below.

**Progress Legend:**
- `- [ ]` = To-do (not started)
- `- [~]` = In progress (currently working on)
- `- [x]` = Completed (finished)
- `- [/]` = Skipped (not needed)

Tasks are categorized by complexity to guide time estimations: XS, S, M, L, XL, XXL.

### - [ ] **Milestone 1**: **Migrate and preserve existing UI/UX: Desktop and Mobile layouts, split-screen Composer (Strudel REPL left, AI Chat right), responsive tab navigation, theming and localStorage persistence.**

- [ ] **Real-time code gen** - (M): As a: developer, I want to: enable real-time code generation in the Strudel REPL, So that: users can see immediate code outputs as they type, enhancing productivity
  - **Acceptance Criteria:**
    - [ ] User can trigger code generation as input changes
Generated code updates in real-time without full reload
Code generation respects current language preferences and prompts
System handles transient errors gracefully and displays meaningful messages
Generated code is syntax-highlighted and copyable
  - [ ] Frontend: Implement input change detection with debounce in REPL input component, enabling real-time typing without excessive requests. Integrate with REPL to emit debounced input changes to the streaming API layer. - (XS)
  - [ ] API: Integrate real-time code generation client using @anthropic-ai/sdk with streaming support, wired to REPL input stream. Include token streaming, partial results handling, and error propagation to UI. - (M)
  - [ ] Frontend: Add Zustand store for code generation state, language prefs, and transient error state, exposing actions and selectors for components to use. Persist non-sensitive prefs in memory/local storage as needed. - (S)
  - [ ] Frontend: Render streaming/generated code with incremental updates and optimistic placeholders, updating DOM progressively as tokens arrive while maintaining a smooth UX. - (L)
  - [ ] Frontend: Implement syntax highlighting and copy-to-clipboard for generated code, integrating with code renderer and clipboard API. - (S)
  - [ ] Frontend: Display transient error UI with retry and graceful fallback messages, integrated with store error state and streaming lifecycle. - (M)
  - [ ] Infrastructure: Add rate-limiting and retry logic for Anthropic API client with exponential backoff, configurable via settings, including handling for throttling responses. - (XL)
  - [ ] Quality: Create unit and integration tests for input handling, store, and streaming render, using mocks for API streaming and UI components. - (XL)
  - [ ] Documentation: Update REPL docs for real-time code gen usage and config options, including examples and troubleshooting. - (XS)
- [ ] **Client-side Anthropic** - (M): As a: developer, I want to: keep Anthropic API integration client-side in Strudel REPL, So that: users can interact with AI models without server round-trips
  - **Acceptance Criteria:**
    - [ ] Anthropic client API is invoked from browser
Responses are received and displayed in chat
Error handling for API request failures
No secret keys exposed in client bundle
Performance remains acceptable under typical usage
  - [ ] Design: Determine client-safe integration approach (ephemeral tokens vs user-provided keys) - (M)
  - [ ] API: Implement client Anthropic call wrapper (generic, no file paths) - (M)
  - [ ] Frontend: Build chat UI to send prompts and display responses - (M)
  - [ ] ErrorHandling: Add retry, user-facing errors, and logging for API failures - (M)
  - [ ] Security: Ensure no secret keys in bundle; add UX for user-provided API key or ephemeral token flow - (M)
  - [ ] Performance: Add client-side throttling and response streaming support - (M)
  - [ ] Testing: Add end-to-end and unit tests for API calls and UI - (M)
  - [ ] Docs: Write usage and security docs for client Anthropic integration - (M)
- [ ] **Remix routing enabled** - (L): As a: developer, I want to: enable Remix-style routing in Strudel REPL, So that: navigation within the app supports deep-linking and better state management
  - **Acceptance Criteria:**
    - [ ] Routing supports deep linking to key views
URL reflects current view without full reload
State preserved on navigation
Fallbacks for non-existent routes
No breaking changes to existing layout
  - [ ] Implement Remix-style routing: add Remix route configuration with nested routes in the Strudel REPL, preserving existing layout and integrating with Zustand for state awareness where needed. - (M)
  - [ ] Frontend: Create route components for key views (e.g., home, dashboard, editor) wired to Remix-style routes in Strudel REPL, with minimal state hooks and navigation hooks. - (S)
  - [ ] State: Sync Zustand store with URL params and implement deep-link parsing to reflect navigation state in URL and restore state from URL on load. - (M)
  - [ ] Navigation: Update internal links/navigation to use Remix navigation APIs (navigate, useParams, useLocation) rather than manual history manipulation. - (S)
  - [ ] Fallback: Implement 404 route and route fallbacks with graceful UI (loading states, helpful messages) for unknown paths. - (S)
  - [ ] Compatibility: Ensure no breaking changes to existing layout and styles while introducing Remix routing; maintain CSS classes and responsive behavior. - (S)
  - [ ] Tests: Add e2e and integration tests for deep-linking and state preservation across routes. - (M)
  - [ ] Docs: Document routing patterns and developer migration notes for Remix routing in Strudel REPL. - (XS)
- [ ] **Landing: Enter API Key** - (M): As a: user, I want to: securely enter and store API key for Anthropic integration, So that: I can access AI features without re-entering key
  - **Acceptance Criteria:**
    - [ ] API key stored securely in memory with optional persistence
Input field validates key pattern
Key is masked in UI
API key is not logged
Key used to initialize client SDK on demand
  - [ ] Frontend: Build APIKeyInput component with masked input and validation logic - (S)
  - [ ] State: Implement secure in-memory store for API key with optional persistence toggle - (M)
  - [ ] Integration: Prevent API key from being logged anywhere in app - (S)
  - [ ] SDK: Initialize @anthropic-ai/sdk client on demand using stored key - (M)
  - [ ] Validation: Add client-side pattern validation and user feedback for API key - (XS)
  - [ ] UX: Add toggle to persist key (secure persistence) and masked display in settings - (S)
  - [ ] Testing: Add unit/integration tests for validation, masking, storage, and SDK init - (M)
  - [ ] Docs: Document API key handling, security considerations, and dev notes - (XS)
- [ ] **Landing: Access Split REPL** - (M): As a: user, I want to: access split REPL environment from landing, So that: I can experiment with prompts and code snippets
  - **Acceptance Criteria:**
    - [ ] REPL loads without blocking UI
Split environment respects existing UI theme
Promises execution isolated
Clipboard and formatting utilities work
No data transfer to server unless user opts in
  - [ ] Frontend: Add REPL route and landing split toggle with React Router route integration and a toggle in landing UI to enable/disable split REPL view, wiring to global REPL state store. - (S)
  - [ ] Frontend: Create REPL container component with split layout and Radix UI controls, integrating code editor/panel regions and split bar, reflecting theme from Zustand store. - (M)
  - [ ] Frontend: Implement isolated execution using Web Worker or iframe sandbox to run prompts/code securely, with message passing contrato between main thread and sandbox. - (L)
  - [ ] Frontend: Integrate Zustand store for REPL state and theme sync, including actions to run code, update prompts, and propagate theme changes across components. - (M)
  - [ ] Frontend: Add clipboard copy/paste and formatting utilities for code snippets, including tab/indent handling and code formatting trigger. - (S)
  - [ ] Frontend: Implement promise isolation and timeout/safety controls to cap execution time and isolate async tasks from UI thread. - (M)
  - [ ] Privacy: Ensure client-only execution and opt-in data export flow, avoiding server-side code execution and providing UI for data export options. - (S)
  - [ ] Performance: Load REPL lazily to avoid blocking UI, using dynamic import or React.lazy with suspense, ensuring initial render is fast. - (S)
  - [ ] QA: Add unit and e2e tests for REPL behavior and theme compliance, covering isolation, run/stop, and theme syncing. - (M)
  - [ ] Docs: Document REPL usage, privacy, and developer integration notes, including architecture overview and environment setup. - (XS)
- [ ] **Landing: Open Chat** - (S): As a: user, I want to: open chat from landing, So that: I can start a conversation instantly
  - **Acceptance Criteria:**
    - [ ] Chat panel opens from landing
Message input accepts text and sends
Chat messages render in chat pane
Persisted chat state respects localStorage
UI remains responsive during chat operations
  - [ ] Frontend: Implement ChatToggle in landing route to open chat pane using React components and Zustand/UX state to toggle visibility and focus. - (M)
  - [ ] Frontend: Implement ChatPane component to render chat messages and input area within landing context using React and CSS-in-JS; supports initial empty state and rendering of existing messages. - (M)
  - [ ] Frontend: Integrate message input send handler with optimistic UI update in ChatPane; on send, append message to list instantly, then confirm/send to backend or mock API, handle failures rollback. - (M)
  - [ ] Frontend: Add Zustand store for chat state (open flag, messages, loading) and wire to ChatToggle and ChatPane; provide selectors and actions for open/close, addMessage, setLoading. - (S)
  - [ ] Frontend: Persist chat state to localStorage and restore on load; serialize messages/open/loading; handle storage write/read errors gracefully. - (M)
  - [ ] Testing: Add unit and integration tests for chat open, send, render, and persistence across components using testing library; cover happy paths and failure scenarios. - (M)
  - [ ] Quality: Add responsiveness and performance tweaks (virtualize list, loading indicators) for chat pane; ensure smooth rendering for larger message sets and responsive layout. - (L)
- [ ] **Landing: Load LocalState** - (S): As a: user, I want to: load persisted state from localStorage on app start, So that: user preferences and session data are preserved
  - **Acceptance Criteria:**
    - [ ] LocalStorage state is loaded on startup
State rehydration does not error
UI reflects persisted theme and settings
Fallback to defaults if data missing
No data leakage between sessions
  - [ ] Setup: Define LocalState schema and defaults (state types, defaults) - (M)
  - [ ] Implement: Initialize persistence adapter for localStorage and safe read/write - (M)
  - [ ] Implement: Rehydrate app state on startup and merge with defaults - (M)
  - [ ] Implement: Bind rehydrated theme and settings to UI components - (M)
  - [ ] Implement: Error handling and validation for persisted payloads (schema checks, recovery) - (M)
  - [ ] Implement: Session isolation and clear-on-logout behavior - (M)
  - [ ] Testing: Add unit and integration tests for rehydration, fallbacks, and UI reflection - (M)
  - [ ] Docs: Document LocalState shape, rehydration flow, and recovery steps - (M)
- [ ] **Landing: Mobile Tab Switch** - (M): As a: user, I want to: switch between desktop and mobile tabs smoothly, So that: UX remains consistent across devices
  - **Acceptance Criteria:**
    - [ ] Tab switch updates layout without visual glitches
State persists across tab switches
No layout thrashing
Animations are smooth and non-blocking
Tests cover both breakpoints
  - [ ] Frontend: Implement responsive tab switch UI that toggles mobile/desktop views - (M)
  - [ ] Frontend: Persist tab state across switches and sessions - (S)
  - [ ] Frontend: Implement non-blocking smooth animations for tab transitions - (M)
  - [ ] Quality: Add unit/integration tests covering both breakpoints - (S)
  - [ ] Infrastructure: Add monitoring metrics for layout thrashing and animation jank - (S)
- [ ] **Landing: Persist Settings** - (S): As a: user, I want to: persist user settings across sessions, So that: preferences are retained
  - **Acceptance Criteria:**
    - [ ] Settings saved to localStorage
On startup, settings are restored
Sensitive settings are masked
Error handling for storage write failures
Performance impact minimal
  - [ ] Frontend: Add settings state management and persistence integration - (M)
  - [ ] Frontend: Load and restore settings on app startup - (M)
  - [ ] Frontend: Implement masking for sensitive settings in UI - (M)
  - [ ] Frontend: Save settings to localStorage with error handling and retries - (M)
  - [ ] Quality: Add unit tests for save/restore and masking behavior - (M)
  - [ ] Quality: Add integration tests for startup restore and storage failure scenarios - (M)
  - [ ] Documentation: Document settings persistence behavior and failure modes - (M)
  - [ ] Frontend: Performance audit and debounce/throttle persistence to minimize impact - (M)
- [ ] **Landing: Open App** - (XS): As a: new visitor, I want to: open the app and land on the home screen, So that: I can access core features without friction
  - **Acceptance Criteria:**
    - [ ] The app renders the landing screen on initial load
UI matches existing dark/light theme
LocalStorage does not fail on first load
No routing present
Chat and main actions are accessible from landing
  - [ ] Frontend: Implement Landing route and Shell component for landing flow (React/React Native) with named route 'landing' and a lightweight container that hosts LandingScreen. Ensure it exposes a stable mount point for subsequent wiring and does not trigger navigation prematurely. - (XS)
  - [ ] Frontend: Implement LandingScreen component that matches dark/light theme using project theming (Context/ThemeProvider), renders core actions (Chat, OpenMain) as disabled/enabled placeholders until wiring, and preserves accessibility attributes. - (S)
  - [ ] State: Add appState store entries for landing visibility and chat access (e.g., showLanding, canAccessChat) using project state management (Redux/Context). Initialize defaults to true/false with initializers to avoid undefined references. - (S)
  - [ ] Storage: Implement resilient LocalStorage wrapper with try/catch and defaults; expose get/set for landing-related flags (showLanding, canAccessChat) and gracefully degrade if storage is unavailable. - (S)
  - [ ] Integration: Wire LandingScreen to state and storage; ensure no routing on initial load until state indicates readiness; when ready, render LandingScreen with props from appState and LocalStorage wrapper. - (M)
  - [ ] Features: Ensure chat and main actions accessible from Landing (UI triggers) and wire up action handlers to update appState and storage; handle disabled/enabled states based on canAccessChat and showLanding. - (M)
  - [ ] Testing: Add unit/integration tests for render, theme, storage fallback, and action availability across LandingScreen and shell wiring; cover initial render, theming correctness, storage errors, and action enablement. - (S)

### - [ ] **Milestone 2**: **Implement Remix routing, SSR readiness, route-based code splitting, loaders/actions for future server features while keeping Anthropic calls client-side initially.**

- [ ] **Save API Key** - (S): As a: user, I want to: save my API key in Settings, So that: I can reuse it without re-entering each session and ensure secure storage in local state.
  - **Acceptance Criteria:**
    - [ ] User can securely save API key in local storage with encryption flag
System validates API key format for provider
Persistent storage across reloads within same session
Duplicate key handled gracefully with overwrite option
API key is not sent to server without explicit action
  - [ ] API state layer: Introduce a new slice in local state (e.g., API key state) with an encryptionFlag to track whether the key is encrypted in api_development; includes reducer/actions to setKey, setEncryptFlag, and a selector for key retrieval. scope includes initialization on app load, and persistence hooks later; no server calls yet. - (XS)
  - [ ] Validation: Implement a provider-specific API key format validator in api_development layer, to validate keys like [provider]-specific pattern (e.g., alphanumeric with dashes) and length constraints; hook into UI form to provide immediate feedback. - (S)
  - [ ] Persistence: Add save/load to Browser localStorage for api_key and encryptionFlag, scoped to api_development; ensure session-like persistence while allowing explicit clear; include migration path for initial defaults. - (S)
  - [ ] UI: Build Settings form (frontend_component) to input, save, overwrite API key; binds to state slice and persistence layer; includes form-level validation and UX copy. - (M)
  - [ ] Security: Integrate client-side encryption flag handling and optional encrypt/decrypt flow (api_development); if enabled, keys are encrypted before storage and decrypted on load; uses lightweight crypto API with per-app key or passphrase. - (M)
  - [ ] UX: Implement duplicate detection and overwrite confirmation modal (frontend_component); when a user saves an existing key, show modal to confirm overwrite; modal action updates storage/state accordingly. - (S)
  - [ ] Safety: Ensure API key is never sent to server unless explicit action taken (documentation); enforce controls at code level and document behavior in developer docs. - (XS)
  - [ ] Tests: Add unit tests for validation, persistence, and overwrite behavior (testing); cover edge cases for all previous subtasks. - (S)
- [ ] **Manage Deployment** - (L): As a: admin, I want to: manage deployment settings, So that: I can control where and how the app is deployed
  - **Acceptance Criteria:**
    - [ ] Deployment configs stored securely
Ability to switch deployment target without breaking UI
Preview environment support
Rollback capability tested
No disruption to active users during changes
  - [ ] DB: Create deployment_configs table migration with schema and index optimizations for fast lookup of deployment targets across environments (staging, prod, canary). Ensure migrations are idempotent and reversible. - (S)
  - [ ] API: Implement CRUD for deployment_configs and an endpoint to switch deployment target, wiring to internal config store and validation against allowed environments; ensure proper authentication/authorization middleware. - (M)
  - [ ] Infra: Integrate secret storage for deployment configs using existing secret manager (e.g., Vault/AWS Secrets Manager), ensuring configs are encrypted at rest and fetched securely with rotation support. - (L)
  - [ ] Frontend: Build DeploymentSettings component with target toggle (switch between environments) and preview modal showing current target and impact preview using live API data. - (M)
  - [ ] Infra: Add zero-downtime deployment scripts and rollback playbook to support seamless target switches with health checks and automatic rollback if metrics cross thresholds. - (L)
  - [ ] Testing: Add e2e tests for switch, preview, and rollback flows using end-to-end test framework to simulate real deployment scenarios across environments. - (L)
  - [ ] Quality: Add monitoring and alerting for deployment changes to notify on target switches, failures, or rollbacks. - (M)
  - [ ] Docs: Write admin guide for managing deployment and rollback covering configuration, security, and rollback procedures. - (XS)
- [ ] **Export Chats** - (M): As a: user, I want to: export chat history, So that: I can back up conversations or share with others.
  - **Acceptance Criteria:**
    - [ ] Export file contains full chat history in correct order
Export supports multiple formats (JSON, TXT)
Export triggers without data loss on large histories
User can choose destination path or download action
Sensitive data redaction option available for exports
  - [ ] Dev: Implement export orchestration (serialize, chunking, redaction) - (M)
  - [ ] Dev: Add JSON and TXT serializers for chat history - (M)
  - [ ] Frontend: Build Export Settings UI with format/destination/redaction options - (M)
  - [ ] Frontend: Implement export trigger and progress indicator - (M)
  - [ ] Dev: Implement large-history streaming/download handler - (M)
  - [ ] Quality: Create tests for export correctness and order (JSON, TXT) - (M)
  - [ ] Quality: Add stress tests for large-history exports and data-loss checks - (M)
  - [ ] Infra: Handle destination selection and browser download integration (localStorage/Download API) - (M)
  - [ ] Docs: Document export feature and redaction caveats - (M)
- [ ] **Clear Local Data** - (S): As a: user, I want to: clear local data in the app, So that: I can reset the app to a clean state without affecting server data.
  - **Acceptance Criteria:**
    - [ ] All localStorage keys related to app reset to default
In-memory state reset to initial
No API calls triggered during local data clear
User confirmation prompt before clearing
Post-clear verification that app behaves as fresh install
  - [ ] Frontend: Implement a confirmation dialog component for 'Clear Local Data' with user prompt and explicit confirm/cancel actions, wired into settings UI to trigger the clear flow. - (S)
  - [ ] API Guard: Introduce a guard to prevent any network/API activity when the user confirms the clear local data action, ensuring no unintended calls during the reset flow. - (M)
  - [ ] State: Implement an in-memory reset action that reinitializes Zustand stores to their initial state, ensuring all runtime state is cleared without persisting to storage. - (M)
  - [ ] Storage: Clear relevant localStorage keys tied to app data and reset defaults post-clear, ensuring a clean local state without server impact. - (S)
  - [ ] UX: Connect the settings screen button to open the confirmation dialog and trigger the clear flow upon user confirmation, ensuring seamless UX. - (S)
  - [ ] Testing: Add unit tests for state reset and storage clearing ensuring no API calls occur during the reset flow. - (S)
  - [ ] E2E: Add integration test simulating user confirmation and post-clear verification of fresh-app behavior. - (L)
  - [ ] Docs: Document 'Clear Local Data' behavior and a verification checklist for QA and developers. - (XS)
