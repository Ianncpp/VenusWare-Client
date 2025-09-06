#!/bin/bash

# SSL Setup Script for pedophilia.today
# This script helps you set up SSL certificate using Let's Encrypt

echo "🔒 Setting up SSL certificate for pedophilia.today..."

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot..."
    
    # Detect OS and install certbot
    if [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        sudo apt update
        sudo apt install -y certbot python3-certbot-apache
    elif [ -f /etc/redhat-release ]; then
        # CentOS/RHEL
        sudo yum install -y certbot python3-certbot-apache
    else
        echo "❌ Unsupported OS. Please install certbot manually."
        exit 1
    fi
fi

# Stop lighttpd temporarily
echo "⏸️ Stopping Lighttpd temporarily..."
sudo systemctl stop lighttpd

# Get SSL certificate
echo "🔐 Obtaining SSL certificate..."
sudo certbot certonly --standalone -d pedophilia.today -d www.pedophilia.today

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate obtained successfully!"
    
    # Create combined certificate file for Lighttpd
    echo "📝 Creating combined certificate file..."
    sudo cat /etc/letsencrypt/live/pedophilia.today/fullchain.pem /etc/letsencrypt/live/pedophilia.today/privkey.pem > /etc/ssl/certs/pedophilia.today.pem
    sudo chown root:root /etc/ssl/certs/pedophilia.today.pem
    sudo chmod 600 /etc/ssl/certs/pedophilia.today.pem
    
    # Update virtual host configuration to enable SSL
    echo "⚙️ Updating virtual host configuration..."
    sudo sed -i 's/# $SERVER\["socket"\] == ":443" {/# $SERVER["socket"] == ":443" {/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/#     ssl.engine = "enable"/    ssl.engine = "enable"/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/#     ssl.pemfile = "\/etc\/ssl\/certs\/pedophilia.today.pem"/    ssl.pemfile = "\/etc\/ssl\/certs\/pedophilia.today.pem"/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/#     ssl.ca-file = "\/etc\/ssl\/certs\/ca-bundle.crt"/    ssl.ca-file = "\/etc\/ssl\/certs\/ca-bundle.crt"/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/# }/}/' /etc/lighttpd/conf-available/venusware-vhost.conf
    
    # Enable HTTP to HTTPS redirect
    sudo sed -i 's/# $HTTP\["scheme"\] == "http" {/$HTTP["scheme"] == "http" {/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/#     url.redirect = ( "\^\/\(\.\*\)" => "https:\/\/pedophilia.today\/$1" )/    url.redirect = ( "^\/\(\.\*\)" => "https:\/\/pedophilia.today\/$1" )/' /etc/lighttpd/conf-available/venusware-vhost.conf
    sudo sed -i 's/# }/}/' /etc/lighttpd/conf-available/venusware-vhost.conf
    
    # Test configuration
    echo "🧪 Testing configuration..."
    sudo lighttpd -t -f /etc/lighttpd/lighttpd.conf
    
    if [ $? -eq 0 ]; then
        # Restart Lighttpd
        echo "🔄 Restarting Lighttpd..."
        sudo systemctl start lighttpd
        
        echo "🎉 SSL setup completed successfully!"
        echo "🌐 Your website is now available at: https://pedophilia.today"
        echo ""
        echo "📋 Certificate will auto-renew. You can test renewal with:"
        echo "sudo certbot renew --dry-run"
    else
        echo "❌ Configuration test failed!"
        sudo systemctl start lighttpd
        exit 1
    fi
else
    echo "❌ Failed to obtain SSL certificate"
    sudo systemctl start lighttpd
    exit 1
fi
