## Executive Summary

VibeComposer is a React 19 SPA (TypeScript, Tailwind CSS, Zustand, Radix UI) that composes audio/visual "vibes" via an Anthropic-backed API. Current app structure: app/root.tsx entry (layout, meta, Strudel), main page at app/routes/_index.tsx rendering AppHeader, DesktopLayout, MobileLayout, Footer, ApiKeyModal, and a Zustand store at app/store/useStore.ts. New scope: integrate Clerk authentication (latest Clerk React packages). When not signed in, show a sign-in modal. After sign-in, allow sign out and access to Clerk user dashboard from top-right header. Keep SPA behavior; no routing changes. Deliverables: updated architecture, user flows, stories (existing AS-IS and new inScope stories flagged true), and implementation epics with estimated hours. Assume minimal changes beyond Clerk integration; reuse existing components and state store where possible.

## Core Functionalities

- **Authentication & Access Control**: Integrate Clerk for SPA authentication with sign-in modal, sign-out, and user dashboard access while preserving single-page behavior. (Priority: **High**)
- **User Session State Management**: Manage authenticated and unauthenticated UI state via Zustand and ensure components render correctly based on auth status. (Priority: **High**)
- **Header & User Controls**: Enhance AppHeader to show sign-in modal trigger, user avatar/menu for sign-out and dashboard access, and handle auth actions. (Priority: **Medium**)
- **Seamless Integration & Security**: Load Clerk scripts and provider in app/root.tsx, securely handle publishable keys via environment variables, and maintain existing API flows. (Priority: **Medium**)
- **Minimal UX Flows for Auth**: Implement modal-based sign-in flow and in-app user dashboard access without adding routes, including handling loading and error states. (Priority: **Low**)



# API Documentation Reference

Make sure to leverage the following API documentation to understand how to use the respective APIs:

## https://clerk.com/docs

### Welcome to Clerk Docs

[Skip to main content](https://clerk.com/docs#main)

# Welcome to Clerk Docs

Find all the guides and resources you need to develop with Clerk.

## [Quickstarts&Tutorials](https://clerk.com/docs/getting-started/quickstart/overview)

Explore our end-to-end tutorials and getting started guides for different application stacks using Clerk.

## [UIComponents](https://clerk.com/docs/reference/components/overview)

Clerk's prebuilt UI components give you a beautiful, fully-functional user management experience in minutes.

## [APIReference](https://clerk.com/docs/reference/overview)

Dig into our API reference documentation and SDKs. We have everything you need to get started setting up authentication with Clerk.

## [Security](https://clerk.com/docs/guides/secure/restricting-access)

Account security is the top concern of every feature we build. This documentation lists some of the many protections included with Clerk.

## [Explore by frontend framework](https://clerk.com/docs\#explore-by-frontend-framework)

### [Next.js](https://clerk.com/docs/nextjs/getting-started/quickstart)

Easily add secure, beautiful, and fast authentication to Next.js with Clerk.

### [React](https://clerk.com/docs/react/getting-started/quickstart)

Get started installing and initializing Clerk in a new React + Vite app.

### [Astro](https://clerk.com/docs/astro/getting-started/quickstart)

Easily add secure and SSR-friendly authentication to your Astro application with Clerk.

### [ChromeExtension](https://clerk.com/docs/chrome-extension/getting-started/quickstart)

Use the Chrome Extension SDK to authenticate users in your Chrome extension.

### [Expo](https://clerk.com/docs/expo/getting-started/quickstart)

Use Clerk with Expo to authenticate users in your React Native application.

### [Android](https://clerk.com/docs/android/getting-started/quickstart)

Use the Clerk Android SDK to authenticate users in your native Android applications.

### [iOS](https://clerk.com/docs/ios/getting-started...

[Overview truncated for brevity]

### Available Documentation Pages (99 total)

- https://clerk.com/docs/reference/backend/types/auth-object
- https://clerk.com/docs/nextjs/reference/components/organization/organization-switcher
- https://clerk.com/docs/guides/development/integrations/platforms/vercel-marketplace
- https://clerk.com/docs/nextjs/reference/components/clerk-provider
- https://clerk.com/docs/reference/backend-api/tag/sign-in-tokens
- https://clerk.com/docs/nextjs/reference/components/organization/create-organization
- https://clerk.com/docs/guides/configure/auth-strategies/social-connections/custom-provider
- https://clerk.com/docs/guides/configure/session-tasks
- https://clerk.com/docs/reference/backend-api/tag/jwks
- https://clerk.com/docs/guides/development/testing/playwright/test-authenticated-flows
- https://clerk.com/docs/guides/development/custom-flows/authentication/email-password
- https://clerk.com/docs/nextjs/reference/components/authentication/task-choose-organization
- https://clerk.com/docs/expo/getting-started/quickstart
- https://clerk.com/docs
- https://clerk.com/docs/guides/development/integrations/databases/convex
- https://clerk.com/docs/guides/development/custom-flows/account-updates/manage-totp-based-mfa
- https://clerk.com/docs/guides/development/clerk-environment-variables
- https://clerk.com/docs/reference/nextjs/overview
- https://clerk.com/docs/guides/configure/auth-strategies/social-connections/google
- https://clerk.com/docs/nextjs/getting-started/quickstart
- https://clerk.com/docs/expo/guides/users/reading
- https://clerk.com/docs/guides/development/integrations/databases/supabase
- https://clerk.com/docs/reference/nextjs/app-router/current-user
- https://clerk.com/docs/tanstack-react-start/getting-started/quickstart
- https://clerk.com/docs/reference/tanstack-react-start/clerk-middleware
- https://clerk.com/docs/guides/development/testing/playwright/overview
- https://clerk.com/docs/guides/development/customize-redirect-urls
- https://clerk.com/docs/guides/customizing-clerk/email-sms-templates
- https://clerk.com/docs/guides/organizations/roles-and-permissions
- https://clerk.com/docs/reference/javascript/types/totp
- https://clerk.com/docs/guides/organizations/overview
- https://clerk.com/docs/guides/customizing-clerk/appearance-prop/layout
- https://clerk.com/docs/nextjs/guides/development/webhooks/billing
- https://clerk.com/docs/guides/development/troubleshooting/script-loading
- https://clerk.com/docs/guides/development/managing-environments
- https://clerk.com/docs/guides/development/webhooks/overview
- https://clerk.com/docs/nextjs/reference/components/authentication/sign-in
- https://clerk.com/docs/guides/development/deployment/vercel
- https://clerk.com/docs/guides/secure/basic-rbac
- https://clerk.com/docs/guides/development/deployment/production
- https://clerk.com/docs/reference/nextjs/app-router/auth
- https://clerk.com/docs/reference/nextjs/clerk-middleware
- https://clerk.com/docs/guides/development/integrations/platforms/shopify
- https://clerk.com/docs/pinning
- https://clerk.com/docs/maintenance-mode
- https://clerk.com/docs/js-backend/getting-started/quickstart
- https://clerk.com/docs/js-backend/guides/billing/for-b2b
- https://clerk.com/docs/js-backend/guides/billing/for-b2c
- https://clerk.com/docs/js-backend/guides/development/webhooks/billing
- https://clerk.com/docs/js-backend/reference/components/overview
- https://clerk.com/docs/ruby/reference/components/overview
- https://clerk.com/docs/ruby/getting-started/quickstart
- https://clerk.com/docs/vue/getting-started/quickstart
- https://clerk.com/docs/vue/guides/billing/for-b2b
- https://clerk.com/docs/vue/guides/billing/for-b2c
- https://clerk.com/docs/vue/guides/development/webhooks/billing
- https://clerk.com/docs/vue/reference/components/overview
- https://clerk.com/docs/vue/reference/components/authentication/sign-in
- https://clerk.com/docs/vue/reference/components/authentication/google-one-tap
- https://clerk.com/docs/vue/reference/components/authentication/sign-up
- https://clerk.com/docs/vue/reference/components/authentication/waitlist
- https://clerk.com/docs/vue/reference/components/billing/checkout-button
- https://clerk.com/docs/vue/reference/components/billing/plan-details-button
- https://clerk.com/docs/vue/reference/components/billing/pricing-table
- https://clerk.com/docs/vue/reference/components/billing/subscription-details-button
- https://clerk.com/docs/vue/reference/components/control/clerk-loaded
- https://clerk.com/docs/vue/reference/components/control/authenticate-with-redirect-callback
- https://clerk.com/docs/vue/reference/components/control/clerk-loading
- https://clerk.com/docs/vue/reference/components/control/protect
- https://clerk.com/docs/vue/reference/components/control/redirect-to-sign-in
- https://clerk.com/docs/vue/reference/components/control/redirect-to-organization-profile
- https://clerk.com/docs/vue/reference/components/control/redirect-to-create-organization
- https://clerk.com/docs/vue/reference/components/control/redirect-to-sign-up
- https://clerk.com/docs/vue/reference/components/control/signed-out
- https://clerk.com/docs/vue/reference/components/control/redirect-to-user-profile
- https://clerk.com/docs/vue/reference/components/control/signed-in
- https://clerk.com/docs/vue/reference/components/organization/create-organization
- https://clerk.com/docs/vue/reference/components/organization/organization-switcher
- https://clerk.com/docs/vue/reference/components/organization/organization-profile
- https://clerk.com/docs/vue/reference/components/organization/organization-list
- https://clerk.com/docs/vue/reference/components/unstyled/sign-in-button
- https://clerk.com/docs/vue/reference/components/unstyled/sign-in-with-metamask
- https://clerk.com/docs/vue/reference/components/unstyled/sign-up-button
- https://clerk.com/docs/vue/reference/components/unstyled/sign-out-button
- https://clerk.com/docs/vue/reference/components/user/user-profile
- https://clerk.com/docs/vue/reference/components/user/user-button
- https://clerk.com/docs/vue/reference/composables/use-session-list
- https://clerk.com/docs/vue/reference/composables/use-clerk
- https://clerk.com/docs/vue/reference/composables/use-sign-in
- https://clerk.com/docs/vue/reference/composables/use-auth
- https://clerk.com/docs/vue/reference/composables/use-session
- https://clerk.com/docs/vue/reference/composables/use-organization
- https://clerk.com/docs/vue/reference/composables/use-sign-up
- https://clerk.com/docs/vue/reference/composables/use-user
- https://clerk.com/docs/nuxt/getting-started/quickstart
- https://clerk.com/docs/nuxt/guides/users/reading
- https://clerk.com/docs/nuxt/guides/billing/for-b2c
- https://clerk.com/docs/nuxt/guides/billing/for-b2b
- https://clerk.com/docs/nuxt/guides/development/webhooks/billing

---

## https://clerk.com/docs/quickstarts/react

### React Quickstart

[Skip to main content](https://clerk.com/docs/react/getting-started/quickstart#main)

# React Quickstart

1. [Create a React app using Vite](https://clerk.com/docs/react/getting-started/quickstart#create-a-react-app-using-vite)
2. [Install `@clerk/clerk-react`](https://clerk.com/docs/react/getting-started/quickstart#install-clerk-clerk-react)
3. [Set your Clerk API keys](https://clerk.com/docs/react/getting-started/quickstart#set-your-clerk-api-keys)
4. [Import the Clerk Publishable Key](https://clerk.com/docs/react/getting-started/quickstart#import-the-clerk-publishable-key)
5. [Add `<ClerkProvider>` to your app](https://clerk.com/docs/react/getting-started/quickstart#add-clerk-provider-to-your-app)
6. [Create a header with Clerk components](https://clerk.com/docs/react/getting-started/quickstart#create-a-header-with-clerk-components)
7. [Create your first user](https://clerk.com/docs/react/getting-started/quickstart#create-your-first-user)
8. [Next step: Add routing with React Router](https://clerk.com/docs/react/getting-started/quickstart#next-step-add-routing-with-react-router)
9. [More resources](https://clerk.com/docs/react/getting-started/quickstart#more-resources)

- Copy as markdownMarkdownCopy as markdown
- [GitHubEdit on GitHub](https://github.com/clerk/clerk-docs/edit/main/docs/getting-started/quickstart.mdx)
- [OpenAIOpen in ChatGPT](https://chatgpt.com/?q=Read+https%3A%2F%2Fclerk.com%2Fdocs%2Fraw%2Freact%2Fgetting-started%2Fquickstart.mdx&hints=search)
- [AnthropicOpen in Claude](https://claude.ai/new?q=Read+https%3A%2F%2Fclerk.com%2Fdocs%2Fraw%2Freact%2Fgetting-started%2Fquickstart.mdx)
- [CursorOpen in Cursor](https://cursor.com/link/prompt?text=Read+https%3A%2F%2Fclerk.com%2Fdocs%2Fraw%2Freact%2Fgetting-started%2Fquickstart.mdx)

Available in other SDKs

[![](<Base64-Image-Removed>)](https://clerk.com/docs/tanstack-react-start/getting-started/quickstart)

Use this pre-built prompt to get started faster.

Open in CursorOpen in Cursor

Open in CursorO...

[Overview truncated for brevity]

### Available Documentation Pages (2 total)

- https://clerk.com/docs/quickstarts/react
- https://clerk.com/docs/quickstarts/react-router

---

## https://clerk.com/docs/components/authentication/sign-in-button

### Clerk | Authentication and User Management

[Skip to main content](https://clerk.com/docs/components/authentication/sign-in-button#main)

![](https://clerk.com/_next/static/media/glow-bento@tiny.1b8af9d0.png)

Sorry, we can't find the page you're looking for.

[Go to homepage](https://clerk.com/)

Support

### Available Documentation Pages (1 total)

- https://clerk.com/docs/components/authentication/sign-in-button

---

## Tech Stack

- **Frontend/Backend**: TypeScript
- **Frontend**: React 19, React Router, Tailwind CSS 4, Radix UI, @clerk/clerk-react, Clerk UI Components, Clerk Publishable Key, ClerkProvider, ClerkUserButton
- **State Management**: Zustand
- **Auth**: Clerk
- **Backend**: Anthropic SDK

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

### - [ ] **Milestone 1**: **Clerk authentication integration: add ClerkProvider, implement sign-in modal, protect UI for unauthenticated users, and header auth actions (sign-in, sign-out, dashboard access).**

- [ ] **Access Clerk Dashboard** - (S): As a: admin, I want to: access the Clerk Dashboard from the Profile Dashboard, So that: I can manage clerk-related tasks from a centralized profile view
  - **Acceptance Criteria:**
    - [ ] User can navigate to Clerk Dashboard from Profile Dashboard UI
Clerk Dashboard loads with correct user context and permissions
Dashboard displays key clerk metrics and actions (e.g., pending tasks, last activity)
System handles permission errors by showing a clear message and redirecting to Profile Dashboard
Data is fetched securely from backend with proper authorization tokens

### - [ ] **Milestone 2**: **Core application preservation: ensure existing landing/composer and workspace continue functioning with auth-aware UI; update AppHeader to show user state and actions.**

- [ ] **Sign In Modal** - (S): As a: registered user, I want to: sign in via modal window, So that: I can access my personalized features from the landing page without navigating away
  - **Acceptance Criteria:**
    - [ ] User can open sign-in modal from landing page
Modal accepts email and password with validation
Successful sign-in stores session token securely and redirects to dashboard view
Handles incorrect credentials with appropriate error message
Session persists for the duration of the browser session or user preference
- [ ] **User Dashboard Access** - (M): As a: registered user, I want to: access my user dashboard from landing, So that: I can view and manage my profile and preferences
  - **Acceptance Criteria:**
    - [ ] Dashboard loads with user data after login
Profile section editable with save/cancel
Preference settings stored and applied
Error states handled for unauthorized access
Loading indicators shown during data fetch
- [ ] **Header User Menu** - (S): As a: registered user, I want to: access a header user menu for quick actions, So that: I can navigate to settings, sign out, or profile quickly
  - **Acceptance Criteria:**
    - [ ] User menu accessible from header
Menu items navigate to settings, profile, sign out
Keyboard accessibility and focus management
Logout clears session and updates UI
Audit logs capture menu interactions
- [ ] **Show Sign-in Modal** - (S): As a: admin, I want to: show sign-in modal, So that: admins can authenticate to access settings and configure the application
  - **Acceptance Criteria:**
    - [ ] User can open the sign-in modal from the settings panel
Modal accepts valid credentials and authenticates successfully
Incorrect credentials show an error message without closing the modal
User data is securely handled and session established upon success
