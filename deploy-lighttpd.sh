#!/bin/bash

# Lighttpd deployment script for VenusWare website

echo "🚀 Deploying VenusWare website to Lighttpd..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Create website directory
echo "📁 Creating website directory..."
mkdir -p /var/www/venusware
chown -R www-data:www-data /var/www/venusware

# Copy website files
echo "📄 Copying website files..."
cp -r . /var/www/venusware/
chown -R www-data:www-data /var/www/venusware

# Set proper permissions
chmod -R 755 /var/www/venusware
chmod 644 /var/www/venusware/*.html
chmod 644 /var/www/venusware/*.css
chmod 644 /var/www/venusware/*.js

# Create cache directory
mkdir -p /var/cache/lighttpd/compress
chown -R www-data:www-data /var/cache/lighttpd/compress

# Backup original config
if [ -f /etc/lighttpd/lighttpd.conf ]; then
    cp /etc/lighttpd/lighttpd.conf /etc/lighttpd/lighttpd.conf.backup.$(date +%Y%m%d)
    echo "✅ Backed up original configuration"
fi

# Copy new configuration
echo "⚙️ Installing Lighttpd configuration..."
cp lighttpd-full.conf /etc/lighttpd/lighttpd.conf

# Test configuration
echo "🧪 Testing Lighttpd configuration..."
lighttpd -t -f /etc/lighttpd/lighttpd.conf

if [ $? -eq 0 ]; then
    echo "✅ Configuration test passed!"
    
    # Restart Lighttpd
    echo "🔄 Restarting Lighttpd service..."
    systemctl restart lighttpd
    
    if [ $? -eq 0 ]; then
        echo "🎉 VenusWare website deployed successfully!"
        echo "🌐 Your website should now be accessible at: http://pedophilia.today"
        echo ""
        echo "📋 Clean URLs available:"
        echo "  - http://pedophilia.today/terms-of-use"
        echo "  - http://pedophilia.today/user-agreement"
    else
        echo "❌ Failed to restart Lighttpd service"
        exit 1
    fi
else
    echo "❌ Configuration test failed!"
    exit 1
fi
