# Clean URLs Setup Guide

This guide shows you how to set up clean URLs (without .html extension) for your VenusWare website.

## 🎯 What You'll Get

Instead of:
- `pedophilia.today/terms-of-use.html`
- `pedophilia.today/user-agreement.html`

You'll have:
- `pedophilia.today/terms-of-use`
- `pedophilia.today/user-agreement`

## 🚀 Setup Methods

### Method 1: Apache (.htaccess) - Most Common

1. **Upload the `.htaccess` file** to your website's root directory
2. **That's it!** Clean URLs will work automatically

**How it works:**
- When someone visits `/terms-of-use`, Apache serves `/terms-of-use.html`
- The `.html` extension is hidden from the URL

### Method 2: Nginx

1. **Add the nginx configuration** to your server block
2. **Reload nginx**: `sudo nginx -s reload`

### Method 3: Lighttpd

1. **Add the lighttpd configuration** to your server config
2. **Restart lighttpd**: `sudo systemctl restart lighttpd`

### Method 4: JavaScript Fallback

If you can't modify server configuration:
1. **Add `url-rewrite.js`** to your HTML pages
2. **Include it in your HTML**:
   ```html
   <script src="url-rewrite.js"></script>
   ```

## 📁 Files You Need

- **`.htaccess`** - For Apache servers (most common)
- **`nginx.conf`** - For Nginx servers
- **`lighttpd-urls.conf`** - For Lighttpd servers
- **`url-rewrite.js`** - JavaScript fallback solution

## ✅ What's Already Updated

- ✅ Footer links now use clean URLs (`/terms-of-use` instead of `terms-of-use.html`)
- ✅ Navigation links updated to point to home page (`/`)
- ✅ All internal links use clean URL format

## 🧪 Testing

After setup, test these URLs:
- `pedophilia.today/` → Should show home page
- `pedophilia.today/terms-of-use` → Should show terms page
- `pedophilia.today/user-agreement` → Should show agreement page

## 🔧 Troubleshooting

**If clean URLs don't work:**

1. **Check your server type** (Apache, Nginx, or Lighttpd)
2. **Use the correct configuration file**
3. **Make sure the file is in the right location**
4. **Restart your web server**

**For Apache:**
- Make sure `.htaccess` is in your website's root directory
- Check if your hosting allows `.htaccess` files

**For Nginx:**
- Add configuration to your server block
- Test with `nginx -t` before reloading

**For Lighttpd:**
- Add to main config or virtual host
- Test with `lighttpd -t` before restarting

## 🎉 Result

Your website will have professional, clean URLs just like major websites!

- Clean, SEO-friendly URLs
- Better user experience
- Professional appearance
- Easy to remember links
