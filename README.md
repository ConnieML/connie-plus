<a  href="https://www.connieconnect.com">
<img  src="https://i.postimg.cc/7LrnJm19/connie-plus-ascii-888x220-blue.png"  alt="Connie SaaS For Nonprofits"  width="250"  />
</a>

# ➕ Connie Plus

This is a Next.JS webapp that uses [Paste](https://paste.twilio.design) as the component library with typescript. Next.js and Paste have built-in TypeScript declarations, so we'll get autocompletion for their modules straight away.

We are connecting the Next.js `_app.tsx` with `Paste`'s Theme Provider so the pages can have app-wide styles.

## How to use ...
Note: Ensure node version compatibility. (node v20)
1. Install dependencies with: "npm install" or "yarn"
2. Run a local dev version: "npm run dev" or "yarn dev"

3. Create a production build: "npm build"
4. Run a local production version: "npm run start"



### Start From Scratch Using `create-next-app`

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/twilio-labs/paste/tree/main/templates/paste-nextjs-template my-paste-app
# or
yarn create next-app --example https://github.com/twilio-labs/paste/tree/main/templates/paste-nextjs-template my-paste-app
```

## 🚀 Production Deployment Guide

### Prerequisites
- Access to production server: `ubuntu@ec2-100-28-144-153.compute-1.amazonaws.com`
- SSH key: `/Users/cjberno/projects/connie/v1.connie.plus/connieone.pem`
- Familiarity with PM2 process management

### 🔒 **CRITICAL: Pre-Deployment Safety Check**
**Always verify production state before deploying:**

```bash
# 1. Connect to production server
ssh -i /Users/cjberno/projects/connie/v1.connie.plus/connieone.pem ubuntu@ec2-100-28-144-153.compute-1.amazonaws.com

# 2. Check current PM2 processes 
pm2 list

# 3. Verify ONLY 'connie.plus' process exists
# If you see v1.connie.plus, v2.connie.plus, or similar - STOP and consult team
```

### 📦 Step-by-Step Deployment Process

#### Step 1: Local Testing (MANDATORY)
```bash
# 1. In your local connie.plus directory
cd /Users/cjberno/projects/connie/connie.plus

# 2. Install dependencies (use legacy flag for React 19 compatibility)
npm install --legacy-peer-deps

# 3. Test build locally 
npm run build

# 4. Test production build
npm run start

# 5. Verify functionality at http://localhost:3000
# Test key features: /data-center, /channels, authentication
```

#### Step 2: Deploy to Production
```bash
# 1. Upload files to server (exclude node_modules and build artifacts)
rsync -avz --exclude node_modules --exclude .next --exclude .git . ubuntu@ec2-100-28-144-153.compute-1.amazonaws.com:/var/www/connie.plus/

# 2. SSH to production server
ssh -i /Users/cjberno/projects/connie/v1.connie.plus/connieone.pem ubuntu@ec2-100-28-144-153.compute-1.amazonaws.com

# 3. Navigate to project directory
cd /var/www/connie.plus

# 4. Install production dependencies
npm install --legacy-peer-deps

# 5. Build application
npm run build

# 6. Restart PM2 process
pm2 restart connie.plus

# 7. Verify deployment
pm2 list
pm2 logs connie.plus --lines 10
```

#### Step 3: Verification & Testing
```bash
# 1. Check HTTP response
curl -I https://connie.plus

# 2. Test key endpoints
curl -I https://connie.plus/data-center
curl -I https://connie.plus/channels

# 3. Browser testing
# - Visit https://connie.plus
# - Test authentication flow
# - Verify data-center functionality
# - Check voicemail and fax features
```

### 🚨 Emergency Rollback Procedure
If deployment fails or causes issues:

```bash
# 1. SSH to production server
ssh -i /Users/cjberno/projects/connie/v1.connie.plus/connieone.pem ubuntu@ec2-100-28-144-153.compute-1.amazonaws.com

# 2. Check for recent backups
ls -la /var/www/ | grep connie.plus.backup

# 3. If backup exists, rollback
pm2 stop connie.plus
sudo mv /var/www/connie.plus /var/www/connie.plus.failed
sudo mv /var/www/connie.plus.backup.YYYYMMDD_HHMMSS /var/www/connie.plus
pm2 start connie.plus

# 4. Verify rollback successful
curl -I https://connie.plus
```

### 🛡️ Security & Safety Guidelines

#### Forbidden Actions:
- ❌ **Never create processes named `v1.connie.plus` or `v2.connie.plus`**
- ❌ **Never deploy without local testing first**
- ❌ **Never skip the PM2 process verification**
- ❌ **Never deploy directly to production without backup**

#### Required Actions:
- ✅ **Always create backup before major deployments**
- ✅ **Always verify PM2 process state before changes**
- ✅ **Always test key functionality after deployment**
- ✅ **Always monitor logs for the first few minutes post-deployment**

### 📊 Current Production Configuration

- **Production URL**: https://connie.plus
- **Server**: EC2 Ubuntu 22.04
- **Process Manager**: PM2 
- **Process Name**: `connie.plus` (ONLY)
- **Directory**: `/var/www/connie.plus`
- **Node Version**: 18.19.1
- **Key Features**: 
  - Okta SSO Authentication
  - Data Center (voicemails, faxes, analytics)
  - Channel Manager
  - Admin Tools

### 📞 Support & Troubleshooting

#### Common Issues:
1. **Build failures**: Check Node version compatibility and dependency conflicts
2. **PM2 process not starting**: Verify environment variables and file permissions
3. **Authentication issues**: Confirm Okta configuration and SSL certificates
4. **Data center API failures**: Check Twilio serverless function connectivity

#### Log Locations:
- **PM2 Logs**: `~/.pm2/logs/connie.plus-*.log`
- **Application Logs**: Available via `pm2 logs connie.plus`
- **System Logs**: `/var/log/nginx/` for web server issues

#### Getting Help:
- Deployment issues: Contact CTO (Claude AI) or CEO
- Okta/authentication: Consult Okta admin console
- Twilio integrations: Leverage paid Twilio support
- Infrastructure: AWS console and EC2 monitoring

Deploy with confidence! 🚀
