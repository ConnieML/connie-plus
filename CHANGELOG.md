# Changelog

All notable changes to V1.Connie.Plus will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### To Do
- Re-enable Content Security Policy with proper configuration
- UI/UX improvements for playback interfaces
- SMS and Call Recording playback features

## [2.1.0] - 2025-08-08

### Added
- **Fax Playback Machine Integration**
  - New API endpoint `/api/faxes` for Sinch fax data proxy
  - FaxPlayer React component in data-center page
  - Support for 18 real NSS production faxes
  - PDF viewing capabilities with secure proxy URLs
  - Table view with comprehensive fax metadata
  - Production deployment successful and verified by NSS client

### Changed
- Updated data-center page to include both voicemail and fax playback
- Modified Next.js configuration to temporarily disable CSP for debugging
- Improved error handling with TypeScript-compliant catch blocks

### Fixed
- Resolved double JSON encoding issue in API responses
- Fixed Twilio Paste Button/Anchor component usage for PDF links
- Corrected TypeScript error handling in async functions

## [2.0.0] - 2025-08-07

### Added
- **Voicemail Playback Machine Integration**
  - New API endpoint `/api/voicemails` for proxying Twilio function calls
  - VoicemailPlayer React component with HTML5 audio controls
  - Integration with Twilio serverless functions
  - Support for 50 most recent NSS voicemails
  - Inline audio playback without authentication prompts

### Changed
- Major architecture shift to Level 2 Integration Pattern
- Moved authentication from EC2 to Twilio serverless environment
- Updated ecosystem.config.js to remove Twilio credentials

### Security
- Implemented secure proxy pattern for API calls
- Removed all Twilio credentials from EC2 environment
- CORS headers configured for multiple Connie domains

### Fixed
- Resolved CORS issues with direct Twilio API calls
- Fixed authentication prompt issues for media playback
- Corrected PM2 process management configuration

## [1.5.0] - 2025-07-15

### Added
- **Channel Manager with Okta SSO**
  - Full Okta authentication integration
  - Role-based access control for Admin/Supervisor users
  - Real-time Twilio phone numbers and messaging services display
  - Groups-based authorization (ConnieOne-Admins)

### Changed
- Updated environment configuration for Okta integration
- Modified middleware for authentication flow
- Enhanced API routes for channel management

### Infrastructure
- Configured PM2 ecosystem for production deployment
- Set up nginx proxy configuration
- Established environment variable management

## [1.0.0] - 2025-06-01

### Added
- Initial V1.Connie.Plus platform launch
- Integration with Twilio Flex CRM Container
- Basic authentication framework
- Core page structure and routing
- Twilio Paste design system implementation

### Features
- Agent Tools & Data section
- Admin Tools & Data section
- Demo system for feature testing
- Template system for reusable components
- iframe embedding support

### Security
- Basic CORS configuration
- X-Frame-Options for Flex embedding
- Initial CSP implementation

## Development Standards

### Version Scheme
- **Major (X.0.0)**: Breaking changes, major architectural shifts
- **Minor (0.X.0)**: New features, significant enhancements
- **Patch (0.0.X)**: Bug fixes, minor improvements

### Deployment Process
1. Test locally at http://localhost:3000
2. Run `npm run build` to verify TypeScript compilation
3. Deploy files to `/var/www/connie.plus/`
4. Run `pm2 restart connie.plus`
5. Verify at https://v1.connie.plus
6. Confirm with client stakeholders

### Git Commit Format
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` UI/UX improvements
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

---

*Maintained by Connie Development Team*
*Production URL: https://v1.connie.plus*
*Support: admin@connie.direct*