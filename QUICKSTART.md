# Quick Start Guide

## External Ticket Management System

### 🚀 Build and Deploy in 3 Steps

#### Step 1: Build the Application
```powershell
npm run build
```

This compiles all React components, CSS, and ServiceNow configuration files.

#### Step 2: Deploy to ServiceNow
```powershell
npm run deploy
```

This uploads your application to your ServiceNow instance.

#### Step 3: Access the Application
Navigate to: `https://YOUR-INSTANCE.service-now.com/x_1860385_ticketda_incident_manager.do`

---

## 📋 What You Get

### Main Views
1. **Dashboard** - Real-time statistics and charts
2. **All Tickets** - Complete ticket list with filters
3. **My Tickets** - Your assigned tickets
4. **High Priority** - Critical and High priority tickets only
5. **Create Ticket** - New ticket creation form

### Key Features
✅ Create, edit, and delete tickets  
✅ Filter by status, priority, category, assignee  
✅ Sort by date, priority, title  
✅ View detailed ticket information  
✅ Add comments to tickets  
✅ Sync tickets to ServiceNow  
✅ Refresh data from ServiceNow  
✅ Responsive design (Desktop, Tablet, Mobile)  

---

## 🎯 Common Tasks

### Creating a New Ticket
1. Click **"Create Ticket"** in sidebar
2. Fill in required fields (marked with *)
3. Optionally check "Create & sync to ServiceNow"
4. Click **"Create Ticket"**

### Filtering Tickets
1. Go to **"All Tickets"** view
2. Use dropdown filters for Status, Priority, Category
3. Type in Assignee search box
4. Select sorting option
5. Click **"Clear Filters"** to reset

### Viewing Ticket Details
1. Click **"View"** button on any ticket card
2. View full information, comments, and sync status
3. Add comments using the form at the bottom
4. Click **"Refresh from ServiceNow"** to get latest data

### Syncing to ServiceNow
1. Find a ticket that's not synced (no ServiceNow number)
2. Click **"Sync"** button on the ticket card
3. Confirm the action
4. Ticket will be created in ServiceNow

---

## 🛠️ Development Commands

```powershell
# Build the application
npm run build

# Deploy to ServiceNow
npm run deploy

# Transform TypeScript files
npm run transform

# Install/update dependencies
npm install
```

---

## 🎨 UI Overview

### Sidebar (Collapsible)
- Click the toggle button (☰/✕) to collapse/expand
- Icons help identify each section
- Active view is highlighted

### Dashboard
- Statistics cards at the top
- Charts below showing distribution
- Refresh button to reload data

### Ticket Cards
- Color-coded priority and status badges
- Key information at a glance
- Action buttons: View, Edit, Sync, Delete

### Filters
- Dropdown filters for quick filtering
- Text search for assignee
- Sort options for ordering
- Clear button to reset

---

## 📱 Responsive Behavior

### Desktop
- Full sidebar visible (260px)
- Multi-column ticket grid
- All features accessible

### Tablet
- Sidebar auto-collapses to 60px
- 2-column ticket grid
- Filters in rows

### Mobile
- Minimal sidebar (icons only)
- Single column tickets
- Stacked filters
- Touch-friendly buttons

---

## 🔧 Troubleshooting

### Application doesn't load
1. Clear browser cache
2. Check ServiceNow instance URL
3. Verify deployment was successful
4. Check browser console for errors

### No tickets showing
1. Click **Refresh** button
2. Check external API is accessible
3. Verify API URL in ExternalTicketService.js
4. Check network tab for failed requests

### Can't create tickets
1. Fill all required fields (marked with *)
2. Check form validation messages
3. Verify API endpoint is accessible
4. Check browser console for errors

### ServiceNow sync not working
1. Verify ServiceNow credentials
2. Check incident table exists
3. Review API mappings
4. Check ServiceNow instance logs

---

## 📞 Support

### Resources
- **README.md** - Full documentation
- **FEATURES.md** - Complete feature list
- **DEPLOYMENT.md** - Detailed deployment guide

### Getting Help
1. Check documentation files
2. Review browser console errors
3. Check ServiceNow application logs
4. Contact your ServiceNow administrator

---

## ✅ Quick Checklist

Before using the application:
- [ ] Application built successfully
- [ ] Deployed to ServiceNow
- [ ] Can access the UI page
- [ ] Dashboard loads
- [ ] Can see tickets list
- [ ] Filters work
- [ ] Can create a ticket
- [ ] Can edit a ticket
- [ ] Can delete a ticket

---

## 🎉 You're Ready!

The External Ticket Management System is now ready to use. Start by:
1. Viewing the Dashboard
2. Exploring existing tickets
3. Creating your first ticket
4. Testing filters and sorting

Enjoy managing your tickets! 🎫

---

**Version:** 1.0.0  
**Last Updated:** December 4, 2025
