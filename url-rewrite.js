// Client-side URL rewriting for clean URLs
// Add this script to your HTML pages

(function() {
    // Function to handle clean URLs
    function handleCleanUrls() {
        const currentPath = window.location.pathname;
        
        // Map clean URLs to HTML files
        const urlMap = {
            '/terms-of-use': '/terms-of-use.html',
            '/user-agreement': '/user-agreement.html',
            '/': '/home.html'
        };
        
        // Check if current path needs rewriting
        if (urlMap[currentPath]) {
            // Redirect to the actual HTML file
            window.location.replace(urlMap[currentPath]);
            return;
        }
        
        // Update navigation links to use clean URLs
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'terms-of-use.html') {
                link.setAttribute('href', '/terms-of-use');
            } else if (href === 'user-agreement.html') {
                link.setAttribute('href', '/user-agreement');
            } else if (href === 'home.html') {
                link.setAttribute('href', '/');
            }
        });
    }
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleCleanUrls);
    } else {
        handleCleanUrls();
    }
})();
