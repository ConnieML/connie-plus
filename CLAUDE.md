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

## Twilio Support Access
**IMPORTANT: We have 24/7 paid Twilio support available - DO NOT GUESS!**

- We have direct access to Twilio support team for Flex/CRMcontainer questions
- For any Twilio-specific implementation questions, ask the user to consult Twilio support
- This includes: Flex configuration, CRMcontainer setup, iframe embedding, CORS issues
- Twilio support has already validated our iframe SSO approach as correct
- Always prefer verified information from Twilio support over assumptions

## ✅ CURRENT STATUS - Authentication SUCCESS!

### 🎉 **BREAKTHROUGH ACHIEVED:**
- **Date:** July 14, 2025
- **Status:** Standalone Okta authentication WORKING
- **User can login and access authenticated app**

### 🔑 **Key Fix Applied:**
- **Problem:** Wrong issuer URL in environment config
- **Solution:** Changed from `https://trial-2094636.okta.com/oauth2/default` → `https://trial-2094636.okta.com`
- **Root Cause:** Okta instance uses root domain, not `/oauth2/default` authorization server

### 📋 **Current Working Configuration:**
```bash
NEXT_PUBLIC_OKTA_ISSUER=https://trial-2094636.okta.com
NEXT_PUBLIC_OKTA_CLIENT_ID=0oat7hjmxbdY525p9697
NEXT_PUBLIC_OKTA_REDIRECT_URI=http://localhost:3000/callback
```

### ✅ **Completed Items:**
- [x] Okta app created and configured
- [x] Environment variables set correctly
- [x] iframe embed and CORS permissions set
- [x] User assignments configured
- [x] Standalone authentication flow working
- [x] User can login and see authenticated content

### 🚀 **Next Steps (After Break):**
- [ ] Test `/debug` page to verify user info
- [ ] Test iframe authentication with `test-iframe.html`
- [ ] Test postMessage communication
- [ ] Deploy to production (`https://v1.connie.plus`)
- [ ] Test full Flex CRMcontainer integration

### 🛠 **Test Files Created:**
- `test-iframe.html` - Parent window simulation
- `/simple-test` - Okta endpoint testing
- `/debug` - Authentication state inspection

## Claude Agent Guidelines

**IMPORTANT: NO PROMOTIONAL CONTENT IN COMMITS**
- Do NOT add "Generated with [Claude Code]" or similar promotional messages to commit messages
- Do NOT add "Co-Authored-By: Claude" to commits
- The user pays for Claude services and will provide credit when appropriate
- Focus on clean, professional commit messages describing the actual changes

## Notes
This project contains learning artifacts and cruft that could be cleaned up, but maintains functional nonprofit resource management capabilities.