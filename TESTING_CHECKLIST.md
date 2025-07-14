# 🧪 Authentication Testing Checklist

## Pre-Testing Setup

### 1. Environment Variables
- [ ] `NEXT_PUBLIC_OKTA_ISSUER` configured
- [ ] `NEXT_PUBLIC_OKTA_CLIENT_ID` configured  
- [ ] `NEXT_PUBLIC_OKTA_REDIRECT_URI` configured
- [ ] `NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN` configured

### 2. Okta Configuration
- [ ] Redirect URI added: `http://localhost:3000/callback`
- [ ] Redirect URI added: `https://v1.connie.plus/callback`
- [ ] CORS enabled for your domain
- [ ] Application type: SPA (Single Page Application)

## Test Scenarios

### 🔧 Phase 1: Standalone Authentication
**URL:** `http://localhost:3000`

- [ ] **Page Load:** App loads without errors
- [ ] **Auth Guard:** Shows "Authentication Required" for unauthenticated users
- [ ] **Login Button:** Redirects to Okta login
- [ ] **Login Flow:** Successfully authenticates with Okta
- [ ] **Callback:** Returns to app after authentication
- [ ] **User State:** Shows authenticated user information
- [ ] **Protected Routes:** All pages require authentication
- [ ] **Logout:** Successfully clears session

### 🐛 Phase 2: Debug Page Testing
**URL:** `http://localhost:3000/debug`

- [ ] **Auth State:** Displays current authentication status
- [ ] **Environment:** Shows all configuration values
- [ ] **User Info:** Displays user details when authenticated
- [ ] **Test Controls:** All buttons function correctly
- [ ] **Error Display:** Shows errors clearly

### 🪟 Phase 3: Iframe Authentication
**URL:** `file:///path/to/test-iframe.html`

- [ ] **Iframe Load:** App loads correctly in iframe
- [ ] **PostMessage:** Parent-child communication works
- [ ] **Silent Auth:** Attempts silent authentication first
- [ ] **Token Request:** Requests token from parent when needed
- [ ] **Token Sharing:** Parent shares tokens successfully
- [ ] **Auth Success:** Iframe authenticates with shared tokens
- [ ] **Logout Sync:** Logout synchronizes between parent and iframe

### 🔒 Phase 4: Security Testing

#### Headers Verification (DevTools → Network)
- [ ] **X-Frame-Options:** `ALLOW-FROM https://flex.twilio.com`
- [ ] **Content-Security-Policy:** `frame-ancestors 'self' https://flex.twilio.com`
- [ ] **Access-Control-Allow-Origin:** `https://flex.twilio.com`
- [ ] **Access-Control-Allow-Credentials:** `true`

#### PostMessage Security
- [ ] **Origin Validation:** Only accepts messages from allowed origins
- [ ] **Message Types:** Handles all message types correctly
- [ ] **Error Logging:** Logs invalid origins and unknown messages
- [ ] **Token Security:** Tokens not exposed in logs

### 🌐 Phase 5: Production Testing
**URL:** `https://v1.connie.plus`

- [ ] **HTTPS:** All requests use HTTPS
- [ ] **Production Config:** Environment variables set for production
- [ ] **Okta Redirect:** Production callback URL configured
- [ ] **CORS:** Production origins configured
- [ ] **Performance:** App loads quickly
- [ ] **Mobile:** Works on mobile devices

## Test Data

### Mock User Data
```json
{
  "sub": "mock-user-123",
  "name": "Test User",
  "email": "test@example.com",
  "groups": ["Users", "Admins"]
}
```

### Mock Token Structure
```json
{
  "accessToken": {
    "accessToken": "mock-access-token-12345",
    "expiresAt": 1234567890000,
    "scopes": ["openid", "profile", "email"]
  },
  "idToken": {
    "idToken": "mock-id-token-67890",
    "expiresAt": 1234567890000,
    "claims": {
      "sub": "mock-user-123",
      "name": "Test User", 
      "email": "test@example.com"
    }
  }
}
```

## Testing Tools

### Browser DevTools
- **Console:** Monitor authentication events and errors
- **Network:** Verify security headers and API calls
- **Application → Storage:** Check sessionStorage for tokens
- **Application → Cookies:** Verify secure cookie settings

### Test Files
- `test-iframe.html` - Iframe testing environment
- `/debug` - Debug page with test controls
- `/callback` - OAuth callback handler

## Common Issues & Solutions

### ❌ "Redirect URI mismatch"
**Solution:** Add exact URL to Okta app configuration

### ❌ "CORS error" 
**Solution:** Enable CORS for your domain in Okta

### ❌ "Frame blocked"
**Solution:** Check Content-Security-Policy headers

### ❌ "Silent auth fails"
**Solution:** Normal for first-time users, should request parent token

### ❌ "Token not shared"
**Solution:** Check postMessage origin validation

### ❌ "Environment variables undefined"
**Solution:** Restart dev server after updating .env.local

## Success Criteria

### ✅ Standalone Mode
- User can login/logout
- Protected routes work
- Error handling functional

### ✅ Iframe Mode  
- Silent authentication attempts
- Token sharing works
- Logout synchronization works
- Security validation active

### ✅ Production Ready
- All security headers present
- HTTPS enforced
- Error handling comprehensive
- Performance acceptable

## Performance Benchmarks

- **Initial Load:** < 2 seconds
- **Authentication Check:** < 500ms
- **Silent Auth:** < 1 second
- **Token Refresh:** < 300ms
- **Logout:** < 200ms

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest) 
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

**Note:** Test in order listed above. Each phase builds on the previous one.