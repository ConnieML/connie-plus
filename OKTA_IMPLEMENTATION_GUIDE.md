# Okta SSO Implementation Guide for Flex CRMcontainer

## Overview
This guide provides step-by-step instructions for implementing Okta SSO authentication in your Next.js application that's embedded in Twilio Flex CRMcontainer.

## Prerequisites
- Existing Okta tenant (same as Flex)
- Access to Okta Admin console
- AWS hosting environment
- Twilio Flex setup

## 1. Install Dependencies

```bash
npm install @okta/okta-auth-js @okta/okta-react
# or
yarn add @okta/okta-auth-js @okta/okta-react
```

## 2. Okta Configuration

### Option A: Use Existing Flex Okta App (Recommended)
1. Add `https://v1.connie.plus/callback` to existing Flex app's redirect URIs
2. Add `https://v1.connie.plus` to trusted origins
3. Enable CORS for `https://v1.connie.plus`

### Option B: Create New Okta App (Same Tenant)
1. Create new SPA application in Okta
2. Configure redirect URIs: `https://v1.connie.plus/callback`
3. Configure logout redirect: `https://v1.connie.plus`
4. Enable CORS for your domain
5. Add to same groups as Flex users

## 3. Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_OKTA_ISSUER=https://your-okta-domain.okta.com/oauth2/default
NEXT_PUBLIC_OKTA_CLIENT_ID=your-client-id
NEXT_PUBLIC_OKTA_REDIRECT_URI=https://v1.connie.plus/callback
```

## 4. Security Headers & CORS

The implementation includes:
- Frame-ancestors for Flex embedding
- CORS headers for cross-origin requests
- Content Security Policy for iframe security

**Required Headers:**
```
X-Frame-Options: ALLOW-FROM https://flex.twilio.com
Content-Security-Policy: frame-ancestors 'self' https://flex.twilio.com https://*.flex.twilio.com
Access-Control-Allow-Origin: https://flex.twilio.com
Access-Control-Allow-Credentials: true
```

## 5. Iframe Authentication Flow

### Challenge: Traditional OAuth doesn't work in iframes
**Solution**: Multi-pronged approach:

1. **Silent Authentication**: Try to authenticate silently first
2. **Parent Window Communication**: Use postMessage for login requests
3. **Token Sharing**: Share tokens between Flex and your app

### Implementation Details:

#### In your app (iframe):
```javascript
// Check if in iframe
const isInIframe = window.self !== window.top;

// Request login from parent
if (isInIframe) {
  window.parent.postMessage({
    type: 'REQUEST_LOGIN',
    loginUrl: oktaLoginUrl
  }, '*');
}
```

#### In Flex (parent):
```javascript
// Listen for login requests
window.addEventListener('message', (event) => {
  if (event.data.type === 'REQUEST_LOGIN') {
    // Redirect to Okta or handle SSO
    window.location.href = event.data.loginUrl;
  }
});
```

## 6. Key Implementation Files

### `/lib/auth.ts`
- Okta configuration
- Authentication context
- Silent auth for iframes
- PostMessage communication

### `/components/AuthGuard.tsx`
- Route protection
- Loading states
- Error handling
- Fallback UI

### `/pages/callback.tsx`
- OAuth callback handling
- Iframe-aware redirects
- Error handling

### `/middleware.ts`
- CORS headers
- Security headers
- Preflight handling

## 7. Testing Strategy

### Development Testing:
1. Test standalone: `http://localhost:3000`
2. Test in iframe: Create test HTML with iframe
3. Test authentication flow
4. Test token refresh

### Production Testing:
1. Deploy to AWS
2. Configure Okta for production domain
3. Test in actual Flex environment
4. Monitor for CORS errors

## 8. Flex CRMcontainer Considerations

### Critical Requirements:
- **Same Okta Tenant**: Use same tenant as Flex for true SSO
- **Shared Session**: Implement token sharing between Flex and app
- **Frame-Ancestors**: Must allow Flex domains
- **CORS**: Properly configured for cross-origin requests

### Common Pitfalls:
1. **Third-party cookies**: Safari blocks by default
2. **CORS errors**: Missing or incorrect headers
3. **Frame blocking**: Incorrect frame-ancestors
4. **Token refresh**: Failing silently in iframe

### Best Practices:
1. Monitor authentication in DevTools
2. Test across browsers (especially Safari)
3. Use HTTPS in all environments
4. Implement proper error handling
5. Add logging for debugging

## 9. Session Management

### Token Storage:
- Use Okta's token manager
- Store in sessionStorage (safer for iframes)
- Implement token refresh logic

### Session Sharing:
```javascript
// In Flex (parent window)
window.addEventListener('message', (event) => {
  if (event.data.type === 'REQUEST_TOKEN') {
    // Share token with iframe
    iframe.contentWindow.postMessage({
      type: 'FLEX_AUTH_TOKEN',
      token: currentToken
    }, '*');
  }
});
```

## 10. Deployment Checklist

### Okta Configuration:
- [ ] Add production domain to redirect URIs
- [ ] Configure CORS for production domain
- [ ] Test SSO flow with Flex users

### AWS Configuration:
- [ ] Set environment variables
- [ ] Configure security headers
- [ ] Test HTTPS certificates

### Flex Configuration:
- [ ] Add your app to CRMcontainer
- [ ] Test iframe embedding
- [ ] Verify authentication flow

## 11. Troubleshooting

### Common Issues:

**"Invalid redirect URI"**
- Check Okta app configuration
- Verify exact URL match

**"Frame blocked by CSP"**
- Check Content-Security-Policy headers
- Verify frame-ancestors directive

**"CORS error"**
- Check Access-Control-Allow-Origin
- Verify credentials header

**"Silent auth fails"**
- Check third-party cookie settings
- Implement fallback to parent window

### Debug Tools:
- Browser DevTools Network tab
- Okta System Log
- Your app's error logging
- Flex developer tools

## 12. Security Considerations

### Production Security:
- Use HTTPS everywhere
- Implement proper CSP headers
- Regular security audits
- Monitor for suspicious activity

### Token Security:
- Short-lived access tokens
- Secure token storage
- Proper token refresh
- Logout cleanup

## 13. Future Enhancements

### Role-Based Access Control:
- Use Okta groups for permissions
- Implement route-level authorization
- Add admin vs user roles

### Enhanced Features:
- Token refresh automation
- Better error handling
- Improved loading states
- Offline support

This implementation provides a robust foundation for Okta SSO in your Flex CRMcontainer application while maintaining security and user experience.