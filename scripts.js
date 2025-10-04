document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Function to set active link
    function setActiveLink(clickedLink) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Store active link in sessionStorage
        sessionStorage.setItem('activeNavLink', clickedLink.getAttribute('href'));
    }
    
    // Set active link based on current page or stored value
    function initializeActiveLink() {
        const currentPage = window.location.pathname;
        const currentHash = window.location.hash;
        const storedActiveLink = sessionStorage.getItem('activeNavLink');
        
        let activeLink = null;
        
        // Priority: Current hash > Stored link > Current page
        if (currentHash) {
            activeLink = document.querySelector(`.nav-links a[href="${currentHash}"]`);
        }
        
        if (!activeLink && storedActiveLink) {
            activeLink = document.querySelector(`.nav-links a[href="${storedActiveLink}"]`);
        }
        
        if (!activeLink) {
            // Set based on current page
            if (currentPage.includes('contact.html')) {
                activeLink = document.querySelector('.nav-links a[href="contact.html"]');
            } else {
                // Default to home link
                activeLink = document.querySelector('.nav-links a[href="#"]') || 
                            document.querySelector('.nav-links a[href="/"]') ||
                            document.querySelector('.nav-links a[href="index.html"]');
            }
        }
        
        if (activeLink) {
            setActiveLink(activeLink);
        }
    }
    
    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For anchor links, don't prevent default behavior
            if (this.getAttribute('href').startsWith('#')) {
                setActiveLink(this);
            } else {
                // For page links (like contact.html), set active immediately
                setActiveLink(this);
            }
        });
    });
    
    // Initialize active link on page load
    initializeActiveLink();
});