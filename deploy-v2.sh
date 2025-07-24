#!/bin/bash

# Deployment script for v2.connie.plus
# Multi-tenant production deployment

echo "🚀 Starting v2.connie.plus deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="/home/ubuntu/v2.connie.plus"
REPO_URL="https://github.com/ConnieML/v1.connie.plus.git"
BRANCH="feature/multi-tenant-aware"
PM2_NAME="v2.connie.plus"

echo -e "${YELLOW}📁 Setting up deployment directory...${NC}"

# Create deployment directory if it doesn't exist
if [ ! -d "$DEPLOY_DIR" ]; then
    sudo mkdir -p "$DEPLOY_DIR"
    sudo chown ubuntu:ubuntu "$DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

# Clone or update repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone -b "$BRANCH" "$REPO_URL" .
else
    echo -e "${YELLOW}🔄 Updating repository...${NC}"
    git fetch origin
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
fi

echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --legacy-peer-deps

echo -e "${YELLOW}🔧 Setting up environment...${NC}"
# Copy production environment file
if [ -f ".env.production" ]; then
    echo -e "${GREEN}✅ Production environment file found${NC}"
else
    echo -e "${RED}❌ Error: .env.production not found!${NC}"
    echo "Please create .env.production with your AWS and Twilio credentials"
    exit 1
fi

echo -e "${YELLOW}🏗️  Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${YELLOW}🔄 Managing PM2 process...${NC}"
# Check if PM2 process exists
if pm2 list | grep -q "$PM2_NAME"; then
    echo "Restarting existing PM2 process..."
    pm2 restart "$PM2_NAME"
else
    echo "Starting new PM2 process..."
    pm2 start ecosystem.config.v2.js
fi

# Save PM2 configuration
pm2 save

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${YELLOW}📊 Status:${NC}"
pm2 status "$PM2_NAME"
echo ""
echo -e "${YELLOW}📝 View logs:${NC}"
echo "  pm2 logs $PM2_NAME"
echo ""
echo -e "${GREEN}🎉 v2.connie.plus is now running on port 3001${NC}"
echo "Make sure nginx is configured to proxy v2.connie.plus to localhost:3001"