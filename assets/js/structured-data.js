// Structured Data (JSON-LD) for SEO
(function () {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Varun Bhandari",
        "url": "https://cswithvarun.com",
        "image": "https://cswithvarun.com/assets/images/profile.jpg",
        "jobTitle": "Senior Security Engineer",
        "description": "Senior Security Engineer with 9+ years building resilient, secure cloud systems. Expert in DevSecOps, Kubernetes security, and CI/CD pipeline hardening.",
        "sameAs": [
            "https://linkedin.com/in/varunbhandari",
            "https://github.com/yourgithub",
            "https://twitter.com/yourtwitter"
        ],
        "knowsAbout": [
            "DevSecOps",
            "Cloud Security",
            "Kubernetes Security",
            "CI/CD Pipeline Security",
            "Infrastructure as Code"
        ]
    };

    // Insert structured data into page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
})();
