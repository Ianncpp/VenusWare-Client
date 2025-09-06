#!/bin/bash

# VenusWare Website Deployment Script for Lighttpd
# Run this script on your server

echo "🚀 Deploying VenusWare website to Lighttpd server..."

# Create website directory
sudo mkdir -p /var/www/venusware
sudo chown -R www-data:www-data /var/www/venusware

# Copy website files (adjust path as needed)
echo "📁 Copying website files..."
sudo cp -r . /var/www/venusware/
sudo chown -R www-data:www-data /var/www/venusware

# Set proper permissions
sudo chmod -R 755 /var/www/venusware
sudo chmod 644 /var/www/venusware/*.html
sudo chmod 644 /var/www/venusware/*.css
sudo chmod 644 /var/www/venusware/*.js

# Create cache directory for compression
sudo mkdir -p /var/cache/lighttpd/compress
sudo chown -R www-data:www-data /var/cache/lighttpd/compress

# Backup original lighttpd config
if [ -f /etc/lighttpd/lighttpd.conf ]; then
    sudo cp /etc/lighttpd/lighttpd.conf /etc/lighttpd/lighttpd.conf.backup.$(date +%Y%m%d)
fi

# Copy new configuration
echo "⚙️ Configuring Lighttpd..."
sudo cp lighttpd.conf /etc/lighttpd/lighttpd.conf

# Copy virtual host configuration
sudo cp venusware-vhost.conf /etc/lighttpd/conf-available/venusware-vhost.conf

# Enable the virtual host
sudo lighttpd-enable-mod venusware-vhost

# Test configuration
echo "🧪 Testing Lighttpd configuration..."
sudo lighttpd -t -f /etc/lighttpd/lighttpd.conf

if [ $? -eq 0 ]; then
    echo "✅ Configuration test passed!"
    
    # Restart Lighttpd
    echo "🔄 Restarting Lighttpd service..."
    sudo systemctl restart lighttpd
    
    if [ $? -eq 0 ]; then
        echo "🎉 VenusWare website deployed successfully!"
        echo "🌐 Your website should now be accessible at: http://pedophilia.today"
        echo ""
        echo "📋 Next steps:"
        echo "1. Update your domain's DNS to point to this server's IP"
        echo "2. Set up SSL certificate for HTTPS"
        echo "3. Test your website"
    else
        echo "❌ Failed to restart Lighttpd service"
        exit 1
    fi
else
    echo "❌ Configuration test failed! Please check the configuration files."
    exit 1
fi
