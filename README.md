# External Ticket Management System

A modern ServiceNow Workspace application for managing external tickets with bi-directional ServiceNow integration.

## 🚀 Features

### Dashboard View
- **Real-time Statistics Cards**
  - Total Tickets
  - Open Tickets
  - High Priority Tickets
  - Resolved Tickets
- **Visual Charts**
  - Tickets by Status (horizontal bar chart)
  - Tickets by Priority (bar chart)

### Ticket Management
- **View Modes**
  - All Tickets
  - My Tickets (filtered by assignee)
  - High Priority Tickets (Critical & High only)
  
- **Advanced Filtering**
  - Status (New, In Progress, Assigned, On Hold, Resolved, Closed)
  - Priority (Critical, High, Medium, Low)
  - Category (Software, Hardware, Network, Database, Security, Email, Other)
  - Assignee (search)
  
- **Sorting Options**
  - Created Date (Newest/Oldest first)
  - Priority (High to Low / Low to High)
  - Title (A-Z / Z-A)

### Ticket Features
- **Card View** - Modern card-based grid layout
- **Detailed View** - Comprehensive modal with:
  - Full ticket information
  - Comments section with add comment functionality
  - ServiceNow sync status
  - Refresh from ServiceNow button
  
- **Create/Edit Tickets**
  - Rich form with validation
  - Support for all ticket fields
  - Tags support (comma-separated)
  - Option to create and sync to ServiceNow immediately

### ServiceNow Integration
- Create incidents in ServiceNow
- Sync tickets to ServiceNow
- Refresh ticket data from ServiceNow
- View sync status and timestamps
- ServiceNow incident number tracking

## 📋 API Integration

**Base URL:** `https://ticketsys-byeygrdfaxa2afdc.canadacentral-01.azurewebsites.net`

### Tickets API
- `GET /api/tickets` - List all tickets with optional filtering
- `GET /api/tickets/{id}` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/{id}` - Update ticket
- `DELETE /api/tickets/{id}` - Delete ticket
- `GET /api/tickets/stats` - Get ticket statistics
- `POST /api/tickets/{id}/comments` - Add comment to ticket

### ServiceNow Integration API
- `POST /api/servicenow/incidents` - Create incident in ServiceNow
- `GET /api/servicenow/incidents` - List ServiceNow incidents
- `GET /api/servicenow/incidents/{sysId}` - Get incident by sys_id
- `GET /api/servicenow/incidents/number/{number}` - Get incident by number
- `GET /api/servicenow/incidents/{sysId}/refresh` - Refresh from ServiceNow
- `PUT /api/servicenow/incidents/{sysId}` - Update ServiceNow incident
- `GET /api/servicenow/mappings` - Get ticket-to-incident mappings
- `GET /api/servicenow/reference/fields` - Get field reference

## 🏗️ Project Structure

```
src/
├── client/
│   ├── app.jsx                          # Main application component
│   ├── app.css                          # Global styles
│   ├── components/
│   │   ├── Sidebar.jsx                  # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Dashboard.jsx                # Dashboard with stats/charts
│   │   ├── Dashboard.css
│   │   ├── TicketCard.jsx              # Individual ticket card
│   │   ├── TicketCard.css
│   │   ├── TicketListView.jsx          # Ticket list with filters
│   │   ├── TicketListView.css
│   │   ├── TicketDetail.jsx            # Detailed ticket modal
│   │   ├── TicketDetail.css
│   │   ├── ExternalTicketForm.jsx      # Create/Edit ticket form
│   │   ├── ExternalTicketForm.css
│   │   ├── IncidentForm.jsx            # Legacy form (ServiceNow)
│   │   ├── IncidentForm.css
│   │   ├── IncidentList.jsx            # Legacy list (ServiceNow)
│   │   └── IncidentList.css
│   └── services/
│       ├── ExternalTicketService.js    # External API service
│       └── IncidentService.js          # ServiceNow table service
├── fluent/
│   ├── index.now.ts
│   ├── tables/
│   │   └── incident.now.ts             # ServiceNow incident table
│   └── ui-pages/
│       └── incident-manager.now.ts     # UI page configuration
```

## 🎨 UI Components

### Sidebar Navigation
- Collapsible sidebar (260px → 60px)
- Menu items with icons:
  - 🏠 Dashboard
  - 📋 All Tickets
  - 👤 My Tickets
  - ⚠️ High Priority
  - ➕ Create Ticket
  - 🔄 Sync Status
  - ⚙️ Settings

### Color Coding

**Priority Badges:**
- Critical: `#dc3545` (Red)
- High: `#fd7e14` (Orange)
- Medium: `#ffc107` (Yellow)
- Low: `#28a745` (Green)

**Status Badges:**
- New: `#6c757d` (Gray)
- In Progress: `#007bff` (Blue)
- Assigned: `#17a2b8` (Cyan)
- On Hold: `#ffc107` (Yellow)
- Resolved: `#28a745` (Green)
- Closed: `#343a40` (Dark)

## 🛠️ Development

### Build and Deploy

```powershell
# Build the application
npm run build

# Deploy to ServiceNow
npm run deploy

# Transform TypeScript
npm run transform
```

### ServiceNow Configuration

**Scope:** `x_1860385_ticketda`  
**Scope ID:** `fd3b7f6a83a532100b23f6b6feaad3b1`  
**App Name:** `TicketDashboard`

## 📦 Dependencies

- React 19.x
- @servicenow/sdk 4.1.0
- @servicenow/glide 26.0.1
- @servicenow/isomorphic-rollup ^1.2.1

## 🔧 Configuration

The application automatically connects to:
- **External API:** https://ticketsys-byeygrdfaxa2afdc.canadacentral-01.azurewebsites.net
- **ServiceNow Table:** `x_1860385_ticketda_incident`

## 📱 Responsive Design

The application is fully responsive:
- Desktop: Full sidebar + multi-column grid
- Tablet: Collapsed sidebar + 2-column grid
- Mobile: Hidden sidebar + single column

## 🚦 Getting Started

1. **Build the application:**
   ```powershell
   npm run build
   ```

2. **Deploy to ServiceNow:**
   ```powershell
   npm run deploy
   ```

3. **Access the application:**
   - Navigate to the UI page endpoint in ServiceNow
   - URL pattern: `x_1860385_ticketda_incident_manager.do`

## 🎯 Key Features Summary

✅ Modern card-based ticket display  
✅ Real-time statistics dashboard  
✅ Advanced filtering and sorting  
✅ ServiceNow bi-directional sync  
✅ Comment management  
✅ Responsive design  
✅ Dark/Light theme compatible  
✅ Accessibility features  
✅ Form validation  
✅ Error handling  

## 📄 License

UNLICENSED

## 👥 Support

For issues or questions, please refer to the ServiceNow documentation or contact your administrator.
