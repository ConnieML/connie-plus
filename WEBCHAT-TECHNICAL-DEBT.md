# 🚨 WebChat Technical Debt Documentation

## **CRITICAL CONTEXT: Why Separate WebChat Pages Exist**

### **The Problem We Solved (August 30, 2025)**
- **Conversation Contamination**: Using single WebChat deployment key caused NSS and HHOVV customers to see each other's messages in same conversation
- **Security Risk**: Customer privacy violation - messages from different organizations were mixed
- **Root Cause**: Twilio WebChat conversation persistence across same deployment key + same domain

### **Current Architecture (Technical Debt)**
```
NSS Users → /nss-webchat.html → CV8c8c75ecb84c0208b1166dbe53bdb81a
HHOVV Users → /hhovv-webchat.html → CV0d858ad49e486f7e52415c67d4eb4eb6
DevSandbox Users → /test-webchat.html → CV98ac935efbf6a1ac3bd09de09126b5de
```

### **Why This Is Technical Debt**
1. **Not Scalable**: Adding 100 organizations = 100 separate WebChat pages
2. **Maintenance Overhead**: Each page needs individual updates
3. **Code Duplication**: Same WebChat logic replicated across files
4. **Domain Management**: Each page needs trusted origin configuration
5. **Routing Complexity**: get-help.tsx has organization detection logic

## **How Current Implementation Works**

### **1. Organization Detection in get-help.tsx**
```javascript
// Dynamic routing based on referrer
if (referrer.includes('nss.connie.team')) {
  webChatPage = '/nss-webchat.html';
} else if (referrer.includes('hhovv.connie.team')) {
  webChatPage = '/hhovv-webchat.html';
}
```

### **2. Organization-Specific Pages**
- **nss-webchat.html**: NSS deployment key + NSS context
- **hhovv-webchat.html**: HHOVV deployment key + HHOVV context
- **Security checks**: Validates referrer matches expected domain

### **3. Studio Flow Integration**
- All pages use same Studio flow: `FW1d690b0af8be5b6e4fe67bcf776049fc`
- Dynamic attributes from context: `{{trigger.conversation.ChannelAttributes.context.organization}}`
- Task queue shows proper organization attribution

## **Deployment Requirements**

### **Trusted Origins (Must Update in Twilio Console)**
```
https://connie.plus/nss-webchat.html
https://connie.plus/hhovv-webchat.html  
https://connie.plus/test-webchat.html
```

### **File Dependencies**
- `/public/nss-webchat.html` - NSS WebChat page
- `/public/hhovv-webchat.html` - HHOVV WebChat page  
- `/pages/support/get-help.tsx` - Dynamic routing logic
- Studio Flow: `FW1d690b0af8be5b6e4fe67bcf776049fc` - Attribute mapping

## **Future Solutions (When We Have Time)**

### **Option 1: Twilio Identity-Based Routing**
- Use Twilio Identity API to scope conversations by organization
- Single deployment key with identity-based session isolation
- Requires research into Twilio Conversations Identity architecture

### **Option 2: Subdomain Architecture**  
```
nss.connie.plus/webchat
hhovv.connie.plus/webchat
```
- Domain-level isolation
- Requires DNS + SSL certificate management
- Single codebase, multiple deployments

### **Option 3: Session Token Approach**
- Generate organization-specific session tokens
- Pass tokens to WebChat for conversation scoping
- Requires custom serverless functions

## **Scaling Considerations**

### **Current Limits**
- **4 organizations**: Manageable technical debt
- **10+ organizations**: Becomes unwieldy
- **100+ organizations**: Architecture redesign required

### **Breaking Point Indicators**
- More than 10 WebChat pages to maintain
- Frequent updates needed across all pages
- Trusted origins list becomes unwieldy
- Routing logic becomes complex

## **Rollback Plan**
If this approach fails:

1. **Revert get-help.tsx**:
   ```javascript
   const webChatWindow = window.open('/test-webchat.html', 'ConnieWebChat', 'width=400,height=600');
   ```

2. **Remove new pages**:
   - Delete `/public/nss-webchat.html`
   - Delete `/public/hhovv-webchat.html`

3. **Studio Flow**: No changes needed (still works with test-webchat.html)

## **Testing Checklist**
- [ ] NSS: Click chat from nss.connie.team → opens /nss-webchat.html
- [ ] HHOVV: Click chat from hhovv.connie.team → opens /hhovv-webchat.html  
- [ ] Task queue shows correct organization in "Origin" field
- [ ] No conversation contamination between organizations
- [ ] Security blocks work (pages only accessible from correct domains)

## **Maintenance Notes**
- **When updating WebChat**: Update all 3 pages (nss, hhovv, test)
- **Adding new org**: Create new page + update get-help.tsx routing + add trusted origin
- **Studio Flow changes**: Automatically affect all pages (shared flow)

---

**📝 Created**: August 30, 2025  
**👤 CTO**: Claude Code Agent  
**🚨 Priority**: Architectural refactor needed before scaling beyond 10 organizations  
**💡 Context**: Customer privacy > clean architecture (for now)