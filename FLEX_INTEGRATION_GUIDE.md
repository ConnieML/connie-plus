# Flex Parent Window Integration Guide

## Overview
This guide explains how to integrate the parent Flex window with your authenticated CRMcontainer iframe to enable seamless SSO and session management.

## Required Parent Window (Flex) Code

### 1. Message Handler Setup

Add this code to your Flex plugin or main application:

```javascript
// In your Flex plugin or main app
class FlexSSO {
  constructor() {
    this.iframeOrigin = 'https://v1.connie.plus';
    this.setupMessageHandler();
  }

  setupMessageHandler() {
    window.addEventListener('message', (event) => {
      // Security: Validate origin
      if (event.origin !== this.iframeOrigin) {
        return;
      }

      switch (event.data.type) {
        case 'REQUEST_LOGIN':
          this.handleLoginRequest(event.data.loginUrl);
          break;
          
        case 'REQUEST_TOKEN':
          this.shareTokenWithIframe();
          break;
          
        case 'REQUEST_LOGOUT':
          this.handleLogoutRequest();
          break;
          
        case 'OKTA_AUTH_SUCCESS':
          this.handleAuthSuccess(event.data.redirectUri);
          break;
      }
    });
  }

  // Handle login request from iframe
  handleLoginRequest(loginUrl) {
    // Option 1: Redirect entire parent window
    window.location.href = loginUrl;
    
    // Option 2: Or handle with existing Flex auth
    // this.flexAuth.signIn();
  }

  // Share current token with iframe
  shareTokenWithIframe() {
    const iframe = document.getElementById('crm-container-iframe');
    if (iframe && this.getCurrentTokens()) {
      iframe.contentWindow.postMessage({
        type: 'FLEX_AUTH_TOKEN',
        tokens: this.getCurrentTokens()
      }, this.iframeOrigin);
    }
  }

  // Handle logout request from iframe
  handleLogoutRequest() {
    // Logout from Flex as well
    this.flexAuth.signOut();
  }

  // Handle successful auth callback
  handleAuthSuccess(redirectUri) {
    console.log('Iframe auth successful, redirecting to:', redirectUri);
    // Optionally navigate or update Flex state
  }

  // Get current Okta tokens (implement based on your Flex setup)
  getCurrentTokens() {
    // Return current Okta tokens from your Flex authentication
    // This depends on how Flex handles Okta auth
    return {
      accessToken: this.flexAuth.getAccessToken(),
      idToken: this.flexAuth.getIdToken(),
      refreshToken: this.flexAuth.getRefreshToken()
    };
  }
}

// Initialize
const flexSSO = new FlexSSO();
```

### 2. Token Refresh Handler

```javascript
// Handle token refresh and share with iframe
class TokenRefreshHandler {
  constructor(flexSSO) {
    this.flexSSO = flexSSO;
    this.setupTokenRefresh();
  }

  setupTokenRefresh() {
    // Listen for token refresh events from your Flex auth
    this.flexAuth.on('tokenRefresh', (newTokens) => {
      this.shareRefreshedTokens(newTokens);
    });
  }

  shareRefreshedTokens(tokens) {
    const iframe = document.getElementById('crm-container-iframe');
    if (iframe) {
      iframe.contentWindow.postMessage({
        type: 'FLEX_TOKEN_REFRESH',
        tokens: tokens
      }, this.flexSSO.iframeOrigin);
    }
  }
}
```

### 3. Logout Synchronization

```javascript
// Handle logout from either parent or iframe
class LogoutSynchronizer {
  constructor(flexSSO) {
    this.flexSSO = flexSSO;
    this.setupLogoutSync();
  }

  setupLogoutSync() {
    // When parent logs out, notify iframe
    this.flexAuth.on('logout', () => {
      this.notifyIframeLogout();
    });
  }

  notifyIframeLogout() {
    const iframe = document.getElementById('crm-container-iframe');
    if (iframe) {
      iframe.contentWindow.postMessage({
        type: 'FLEX_LOGOUT'
      }, this.flexSSO.iframeOrigin);
    }
  }
}
```

## Message Types Reference

### From Iframe to Parent:
- `REQUEST_LOGIN` - iframe needs user to login
- `REQUEST_TOKEN` - iframe needs current auth tokens
- `REQUEST_LOGOUT` - iframe is logging out
- `OKTA_AUTH_SUCCESS` - iframe auth completed successfully

### From Parent to Iframe:
- `FLEX_AUTH_TOKEN` - sharing current tokens
- `FLEX_TOKEN_REFRESH` - providing refreshed tokens
- `FLEX_LOGOUT` - parent is logging out

## Security Considerations

### 1. Origin Validation
Always validate message origins:
```javascript
if (event.origin !== 'https://v1.connie.plus') {
  return; // Reject untrusted origins
}
```

### 2. Token Security
- Never log tokens
- Use secure transport (HTTPS)
- Implement token expiry handling
- Clear tokens on logout

### 3. Error Handling
```javascript
try {
  iframe.contentWindow.postMessage(message, origin);
} catch (error) {
  console.error('Failed to send message to iframe:', error);
}
```

## Testing Checklist

### Parent Window Setup:
- [ ] Message handler installed
- [ ] Origin validation working
- [ ] Token sharing functional
- [ ] Logout synchronization working

### Integration Testing:
- [ ] Iframe loads and requests token
- [ ] Parent shares valid tokens
- [ ] Silent auth works in iframe
- [ ] Logout syncs both ways
- [ ] Token refresh propagates

### Security Testing:
- [ ] Invalid origins rejected
- [ ] Tokens not exposed in logs
- [ ] HTTPS enforced
- [ ] CSP headers correct

## Troubleshooting

### Common Issues:

**"No response from parent"**
- Check if message handler is installed
- Verify iframe origin in parent code
- Check browser console for errors

**"Token sharing not working"**
- Ensure getCurrentTokens() returns valid tokens
- Check token format matches Okta expectations
- Verify token expiry dates

**"Authentication loops"**
- Check for circular login requests
- Verify token validation logic
- Ensure proper error handling

### Debug Tools:

```javascript
// Add debug logging to parent
window.addEventListener('message', (event) => {
  console.log('Parent received:', event.data);
  // ... handle message
});

// Monitor token state
setInterval(() => {
  console.log('Current tokens:', this.getCurrentTokens());
}, 30000);
```

This integration ensures seamless SSO between Flex and your CRMcontainer application while maintaining security best practices.