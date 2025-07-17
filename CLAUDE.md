# Claude Code Documentation for V1.connie.plus

## Project Overview
V1.connie.plus is a Next.js application serving as a resource hub for nonprofit Community Based Organizations (CBOs) using the Connie platform. It provides centralized access to tools, data, and resources for staff agents and administrators.

## Tech Stack
- **Framework**: Next.js 15.2 with TypeScript
- **UI Library**: Twilio Paste design system
- **React**: 19.1.0 with React Hook Form
- **Styling**: Tailwind CSS

## Development Commands
- `npm run dev` / `yarn dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production build
- `npm run lint` - Run linting
- `npm run tsc` - TypeScript type checking

## Dependencies & Installation
**IMPORTANT: Use legacy peer deps for installation**
```bash
npm install --legacy-peer-deps
```

**Reason**: React 19 compatibility issues with Twilio Paste components
- Project uses React 19.1.0 for modern features
- Twilio Paste expects React 18.x (peer dependency conflict)
- `--legacy-peer-deps` bypasses strict peer dependency checking
- Functionality works correctly despite version mismatch
- **Future Action Required**: Monitor Twilio Paste updates for React 19 support

## Key Features
- **Agent Tools & Data**: Staff resources including client directories, CRM/EMR access, fax templates
- **Admin Tools & Data**: Network management, reports, dashboards
- **Demo System**: Interactive feature demonstrations
- **Template System**: Reusable components for forms, alerts, iframes

## File Structure
- `pages/` - Next.js pages and routing
- `pages/templates/` - Reusable template components
- `pages/demos/` - Feature demonstration pages
- `pages/agent-tools/` - Staff-specific tools
- `pages/components/` - Shared UI components
- `public/` - Static assets

## External Integrations
- Airtable (client/partner directories)
- My Adult Daycare EMR system
- Fax services and templates
- Various CBO management tools

## Twilio Paste Design System - REQUIRED READING
**MANDATORY: All Claude agents MUST review Twilio Paste documentation before starting any UI work**

### Required Documentation Review:
1. **Introduction**: https://paste.twilio.design/introduction/about-paste
2. **Components**: https://paste.twilio.design/components
3. **Patterns**: https://paste.twilio.design/patterns

### Key Twilio Paste Principles:
- **Accessible by default**: All components meet WCAG 2.1 AA compliance
- **Composable by design**: Components are presentational, not concerned with application logic
- **Design tokens**: Use Paste's design tokens for consistent styling
- **No custom className**: Paste components don't support custom className properties
- **Testing approach**: Use data attributes for test identifiers, not CSS classes

### Component Categories Available:
- **Layout**: Grid, Flex, Stack, Box
- **Form Components**: Input, Checkbox, Radio Group, Select
- **Interactive**: Button, Modal, Popover, Tooltip
- **Navigation**: Sidebar, Breadcrumb, In Page Navigation
- **Data Display**: Table, List, Card
- **Typography**: Heading, Text, Paragraph
- **Feedback**: Alert, Toast, Badge (see known issues)

### Production Patterns to Follow:
- Button vs Anchor usage
- Form patterns and validation
- Empty state handling
- Error state management
- Confirmation dialogs
- Data export workflows

### Implementation Guidelines:
- Always use Paste components over custom HTML elements
- Follow established patterns for common interactions
- Leverage primitives for custom component development
- Use theme customization options appropriately
- Maintain consistency across all pages and components

## Twilio Support Access
**IMPORTANT: We have 24/7 paid Twilio support available - DO NOT GUESS!**

- We have direct access to Twilio support team for Flex/CRMcontainer questions
- For any Twilio-specific implementation questions, ask the user to consult Twilio support
- This includes: Flex configuration, CRMcontainer setup, iframe embedding, CORS issues
- Twilio support has already validated our iframe SSO approach as correct
- Always prefer verified information from Twilio support over assumptions

**Known Issues to Monitor with Twilio Support:**
- Badge component TypeScript errors due to React 19 + Twilio Paste compatibility
- Current workaround: Use Text components with color variants instead of Badge
- Future: Check with Twilio support for React 19 compatibility timeline

## ✅ CURRENT STATUS - CHANNEL MANAGER COMPLETE!

### 🎉 **MAJOR MILESTONE ACHIEVED:**
- **Date:** July 15, 2025
- **Status:** Channel Manager with real Twilio API integration COMPLETE
- **Authentication:** Okta SSO with role-based access control WORKING
- **API Integration:** Real Twilio phone numbers and messaging services displayed

### 🔑 **Key Implementations:**
- **Okta Authentication:** Full SSO with groups-based access control
- **Channel Manager:** Role-based access for Admin/Supervisor users
- **Twilio API:** Real-time data from actual Twilio account
- **Production Ready:** Deployed and functional

### 📋 **Current Working Configuration:**
```bash
# Okta Configuration
NEXT_PUBLIC_OKTA_ISSUER=https://trial-2094636.okta.com
NEXT_PUBLIC_OKTA_CLIENT_ID=0oat7hjmxbdY525p9697
NEXT_PUBLIC_OKTA_REDIRECT_URI=http://localhost:3000/callback (dev)
NEXT_PUBLIC_OKTA_REDIRECT_URI=https://v1.connie.plus/callback (prod)

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
```

### ✅ **Completed Items:**
- [x] Okta app created and configured with groups claim
- [x] Environment variables set correctly for all environments
- [x] iframe embed and CORS permissions set
- [x] User assignments configured with ConnieOne-Admins group
- [x] Standalone authentication flow working
- [x] Channel Manager page with role-based access control
- [x] Real Twilio API integration for phone numbers and messaging services
- [x] Production deployment successful
- [x] Local development environment functional

### 🚀 **Production Deployment:**
- **URL:** https://v1.connie.plus/channels
- **Access:** Admin/Supervisor users with ConnieOne-Admins group
- **Data:** Real Twilio phone numbers and messaging services
- **Status:** Fully functional and ready for Flex CRMcontainer integration

### 🛠 **Test Files Created:**
- `test-iframe.html` - Parent window simulation
- `/simple-test` - Okta endpoint testing
- `/debug` - Authentication state inspection

## 🚀 **Channel Manager Deployment Guide**

### **Prerequisites:**
1. **Okta Application configured** with groups claim
2. **Twilio account** with phone numbers and messaging services
3. **Production environment** with nginx and PM2

### **Environment Setup:**
```bash
# Create ecosystem.config.js for PM2
module.exports = {
  apps: [{
    name: 'v1.connie.plus',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_OKTA_ISSUER: 'https://trial-2094636.okta.com',
      NEXT_PUBLIC_OKTA_CLIENT_ID: '0oat7hjmxbdY525p9697',
      NEXT_PUBLIC_OKTA_REDIRECT_URI: 'https://v1.connie.plus/callback',
      NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN: 'https://flex.twilio.com',
      NEXT_PUBLIC_FLEX_DOMAIN: 'https://nss.connie.team',
      TWILIO_ACCOUNT_SID: 'your_account_sid_here',
      TWILIO_AUTH_TOKEN: 'your_auth_token_here'
    }
  }]
};
```

### **Deployment Steps:**
1. **Install dependencies:** `npm install --legacy-peer-deps`
2. **Build application:** `npm run build`
3. **Start with PM2:** `pm2 start ecosystem.config.js`
4. **Verify status:** `pm2 list`

### **Okta Configuration Requirements:**
- **Groups claim:** Filter with "ConnieOne-Admins"
- **Scopes:** `['openid', 'profile', 'email', 'groups']`
- **Redirect URIs:** Both localhost and production URLs
- **User group membership:** ConnieOne-Admins group

### **Twilio API Integration:**
- **Phone numbers:** `client.incomingPhoneNumbers.list()`
- **Messaging services:** `client.messaging.v1.services.list()`
- **Fallback:** Mock data if API calls fail
- **Real-time data:** Updates when Twilio resources change

## Claude Agent Guidelines

**IMPORTANT: NO PROMOTIONAL CONTENT IN COMMITS**
- Do NOT add "Generated with [Claude Code]" or similar promotional messages to commit messages
- Do NOT add "Co-Authored-By: Claude" to commits
- The user pays for Claude services and will provide credit when appropriate
- Focus on clean, professional commit messages describing the actual changes

## Notes
This project contains learning artifacts and cruft that could be cleaned up, but maintains functional nonprofit resource management capabilities.