# VenusWare Website Deployment Guide

This guide will help you deploy your VenusWare website to your Lighttpd server.

## 🚀 Quick Deployment

### Step 1: Upload Files to Server

Upload all your website files to your server. You can use:
- **SCP**: `scp -r . user@your-server:/path/to/venusware-site/`
- **SFTP**: Use FileZilla or similar
- **Git**: Clone your repository on the server

### Step 2: Run Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
sudo ./deploy.sh
```

### Step 3: Configure DNS

Update your domain's DNS settings to point to your server:
- **A Record**: `pedophilia.today` → `YOUR_SERVER_IP`
- **CNAME**: `www.pedophilia.today` → `pedophilia.today`

### Step 4: Set Up SSL (Optional but Recommended)

```bash
# Make the SSL script executable
chmod +x setup-ssl.sh

# Run SSL setup
sudo ./setup-ssl.sh
```

## 📁 File Structure

After deployment, your server will have:
```
/var/www/venusware/
├── home.html              # Main page
├── terms-of-use.html      # Terms of use
├── user-agreement.html    # User agreement
├── scripts.js            # JavaScript functionality
├── styles/               # CSS files
├── assets/               # Images and icons
└── img-vids/            # Videos and backgrounds
```

## ⚙️ Configuration Files

- `lighttpd.conf` - Main Lighttpd configuration
- `venusware-vhost.conf` - Virtual host for your domain
- `deploy.sh` - Automated deployment script
- `setup-ssl.sh` - SSL certificate setup script

## 🔧 Manual Configuration

If you prefer to configure manually:

1. **Copy website files**:
   ```bash
   sudo cp -r . /var/www/venusware/
   sudo chown -R www-data:www-data /var/www/venusware
   ```

2. **Configure Lighttpd**:
   ```bash
   sudo cp lighttpd.conf /etc/lighttpd/lighttpd.conf
   sudo cp venusware-vhost.conf /etc/lighttpd/conf-available/
   sudo lighttpd-enable-mod venusware-vhost
   ```

3. **Test and restart**:
   ```bash
   sudo lighttpd -t -f /etc/lighttpd/lighttpd.conf
   sudo systemctl restart lighttpd
   ```

## 🌐 Features Included

- ✅ Clean URL rewriting (`/terms-of-use` → `/terms-of-use.html`)
- ✅ Compression for faster loading
- ✅ Security headers
- ✅ Cache control for static assets
- ✅ SSL/HTTPS support
- ✅ Professional error handling
- ✅ Logging and monitoring

## 🔍 Troubleshooting

### Check Lighttpd Status
```bash
sudo systemctl status lighttpd
```

### View Error Logs
```bash
sudo tail -f /var/log/lighttpd/error.log
```

### Test Configuration
```bash
sudo lighttpd -t -f /etc/lighttpd/lighttpd.conf
```

### Check Website Files
```bash
ls -la /var/www/venusware/
```

## 📞 Support

If you encounter any issues:
1. Check the error logs
2. Verify file permissions
3. Test the configuration
4. Ensure DNS is pointing correctly

Your VenusWare website should now be live and professional! 🎉
