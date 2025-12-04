# Deployment Guide for External Ticket Management System

## Prerequisites

1. ServiceNow instance access
2. Node.js and npm installed
3. ServiceNow SDK configured
4. Proper credentials for your ServiceNow instance

## Step-by-Step Deployment

### 1. Install Dependencies

```powershell
npm install
```

### 2. Configure ServiceNow Connection

Ensure your `now.config.json` is properly configured:

```json
{
    "scope": "x_1860385_ticketda",
    "scopeId": "fd3b7f6a83a532100b23f6b6feaad3b1",
    "name": "TicketDashboard"
}
```

### 3. Build the Application

```powershell
npm run build
```

This command will:
- Compile React components
- Bundle JavaScript files
- Process CSS files
- Generate ServiceNow-compatible artifacts

### 4. Deploy to ServiceNow

```powershell
npm run deploy
```

This will:
- Upload all compiled files to ServiceNow
- Create/update the UI page
- Install the application in your instance

### 5. Verify Deployment

1. Log into your ServiceNow instance
2. Navigate to: `x_1860385_ticketda_incident_manager.do`
3. The External Ticket Management application should load

## Troubleshooting

### Build Errors

If you encounter build errors:

```powershell
# Clean and rebuild
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

### Deployment Errors

1. **Authentication Issues**
   - Verify your ServiceNow credentials
   - Check network connectivity
   - Ensure you have proper permissions

2. **Scope Issues**
   - Verify the scope ID in `now.config.json`
   - Ensure you have access to the scoped application

3. **UI Page Not Loading**
   - Clear browser cache
   - Check ServiceNow instance logs
   - Verify the endpoint URL

### Common Issues

**Issue:** External API not accessible
- **Solution:** Verify the API URL is accessible from your network
- Check CORS configuration on the external API

**Issue:** ServiceNow table not found
- **Solution:** Ensure the `x_1860385_ticketda_incident` table exists
- Run the fluent table creation if needed

**Issue:** Components not rendering
- **Solution:** Check browser console for errors
- Verify all CSS files are loaded
- Check for JavaScript errors

## Testing

### Local Testing (if applicable)

```powershell
# Start local development server (if configured)
npm start
```

### Production Testing

1. Test Dashboard view
2. Create a new ticket
3. Edit an existing ticket
4. Test filters and sorting
5. Test ServiceNow sync
6. Verify responsive design on mobile

## Post-Deployment Checklist

- [ ] Dashboard loads correctly
- [ ] Statistics display properly
- [ ] Tickets list shows data
- [ ] Filters work as expected
- [ ] Create ticket form opens
- [ ] Edit ticket works
- [ ] Delete ticket works
- [ ] ServiceNow sync functional
- [ ] Comments can be added
- [ ] Responsive on mobile devices
- [ ] No console errors
- [ ] API calls succeed

## Rollback Procedure

If you need to rollback:

1. In ServiceNow, navigate to **System Applications** > **My Company Applications**
2. Find "TicketDashboard" application
3. Select **Rollback to Previous Version**

## Additional Configuration

### Custom Domain/API URL

If you need to change the API URL, update:

`src/client/services/ExternalTicketService.js`:

```javascript
constructor() {
    this.baseUrl = 'YOUR_NEW_API_URL'
}
```

Then rebuild and redeploy.

### Styling Customization

All styles are in component-specific CSS files. Modify and rebuild:

- `app.css` - Global styles
- `Sidebar.css` - Navigation
- `Dashboard.css` - Dashboard
- `TicketCard.css` - Ticket cards
- etc.

## Support

For technical support:
1. Check ServiceNow documentation
2. Review application logs
3. Contact your ServiceNow administrator

## Security Notes

- Ensure API endpoints use HTTPS
- Configure proper authentication
- Set up CORS policies correctly
- Implement proper access controls in ServiceNow
- Review and limit API permissions

## Performance Optimization

- Enable caching where appropriate
- Optimize API calls (batch requests if possible)
- Use pagination for large datasets
- Monitor ServiceNow instance performance
- Consider CDN for static assets

## Maintenance

### Regular Updates

```powershell
# Update dependencies
npm update

# Rebuild
npm run build

# Deploy
npm run deploy
```

### Monitoring

- Monitor API response times
- Check error logs regularly
- Review user feedback
- Track usage metrics

---

**Last Updated:** December 2025  
**Version:** 1.0.0
