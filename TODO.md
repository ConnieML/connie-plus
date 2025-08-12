# V1.Connie.Plus TODO List

## High Priority

### UI/UX Improvements
- [ ] Fix Content Security Policy (CSP) configuration
  - [ ] Currently disabled for debugging
  - [ ] Need proper script-src and style-src directives
  - [ ] Test with all embedded iframes

- [ ] Improve Playback Machine UI in data-center page
  - [ ] Better visual separation between voicemail and fax sections
  - [ ] Add collapsible panels for each playback type
  - [ ] Implement loading states and error boundaries
  - [ ] Mobile-responsive table design

### Integration & Deployment
- [ ] Complete Okta SSO integration testing
  - [ ] Verify role-based access for playback features
  - [ ] Test with multiple user groups
  - [ ] Document authentication flow

- [ ] Production environment optimization
  - [ ] Review PM2 configuration for optimal performance
  - [ ] Set up proper logging rotation
  - [ ] Configure environment variables properly

## Medium Priority

### API Enhancements
- [ ] Add pagination to `/api/voicemails` endpoint
- [ ] Add pagination to `/api/faxes` endpoint
- [ ] Implement caching layer for API responses
- [ ] Add request validation and sanitization

### Feature Additions
- [ ] Add SMS API proxy endpoint (`/api/sms`)
- [ ] Add call recordings API proxy (`/api/recordings`)
- [ ] Implement batch download functionality
- [ ] Add export to CSV for all playback data

### Testing & Quality
- [ ] Add error handling for failed API requests
- [ ] Implement retry logic for Twilio function calls
- [ ] Add health check endpoint
- [ ] Create API response type definitions

## Low Priority

### Documentation
- [ ] Update CLAUDE.md with new playback features
- [ ] Document API endpoints in README
- [ ] Create deployment guide for new developers
- [ ] Add architecture diagrams to repository

### Performance
- [ ] Optimize Next.js build configuration
- [ ] Implement static generation where possible
- [ ] Review and optimize bundle size
- [ ] Add performance monitoring

### Security
- [ ] Implement API rate limiting
- [ ] Add request authentication middleware
- [ ] Review and update CORS configuration
- [ ] Security audit for production deployment

## Technical Debt
- [ ] Fix ESLint configuration issues
  - "Failed to load config" warnings
- [ ] Remove unused pages and components
- [ ] Standardize component naming conventions
- [ ] Clean up test files and demo pages
- [ ] Update to latest Twilio Paste versions (when React 19 compatible)

## Future Enhancements
- [ ] Unified playback dashboard
- [ ] Real-time notifications for new faxes/voicemails
- [ ] Advanced search and filtering
- [ ] Analytics and reporting features
- [ ] Multi-tenant support for different CRM containers

## Notes
- Maintain compatibility with Twilio Flex CRM Container
- Ensure all features work within iframe context
- Keep NSS client requirements as top priority
- Follow established Level 2 Integration Pattern for new features