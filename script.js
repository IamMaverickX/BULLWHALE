// Main script for Bullish Whale website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initSmokeAnimation();
    initParticles();
    initScrollAnimations();
    initTokenomicsCharts();
    initChatbot();
    initCopyButton();
    initJoinButton();
    initVideo();
    initStreamFlow(); // ADD THIS LINE
    initIframes();
    initSmoothScrolling();
    
    // Set current year in footer
    document.querySelector('.copyright').innerHTML = `© ${new Date().getFullYear()} Bullish Whale. All rights reserved.`;
});

// Enhanced Navbar with parallax effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSection = document.getElementById('hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Navbar background effect
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const opacity = 1 - Math.min(scrollPosition / heroHeight, 1);
            heroSection.style.opacity = opacity;
        }
        
        // Update active nav link
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    smoothScrollTo(targetElement.offsetTop - 80, 800);
                }
            }
        });
    });
    // Enhanced video functionality
function initVideo() {
    const video = document.querySelector('.project-video');
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    
    if (!video) return;
    
    // Set video attributes for better playback
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = "auto";
    
    // Try to autoplay with sound muted
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay succeeded, hide overlay
            setTimeout(() => {
                videoOverlay.classList.add('hidden');
            }, 500);
        }).catch(error => {
            // Autoplay prevented, show overlay
            console.log("Autoplay prevented, showing controls:", error);
            video.controls = true;
            video.muted = false; // Allow sound when user interacts
            
            // Make overlay clickable
            videoOverlay.style.cursor = 'pointer';
            videoOverlay.classList.remove('hidden');
        });
    }
    
    // Play button click handler
    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        playVideo();
    });
    
    // Overlay click handler
    videoOverlay.addEventListener('click', playVideo);
    
    // Video click handler (toggle play/pause)
    video.addEventListener('click', function(e) {
        e.stopPropagation();
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
    
    // Play video function
    function playVideo() {
        video.muted = false; // Unmute when user interacts
        video.play()
            .then(() => {
                videoOverlay.classList.add('hidden');
                video.controls = true;
            })
            .catch(error => {
                console.log("Play failed:", error);
                video.controls = true;
                videoOverlay.classList.remove('hidden');
            });
    }
    
    // Show overlay when video ends (for non-looping)
    video.addEventListener('ended', () => {
        if (!video.loop) {
            videoOverlay.classList.remove('hidden');
        }
    });
    
    // Show overlay when video is paused by user
    video.addEventListener('pause', () => {
        if (video.paused && !video.ended) {
            videoOverlay.classList.remove('hidden');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            videoOverlay.querySelector('p').textContent = 'Click to resume';
        }
    });
    
    // Hide overlay when video is playing
    video.addEventListener('play', () => {
        videoOverlay.classList.add('hidden');
    });
    
    // Handle video loading
    video.addEventListener('loadeddata', () => {
        console.log("Video loaded successfully");
        video.classList.add('loaded');
    });
    
    video.addEventListener('error', (e) => {
        console.error("Video error:", e);
        videoOverlay.innerHTML = `
            <div class="video-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Video failed to load</p>
                <p class="error-message">Please check the video file</p>
            </div>
        `;
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case ' ':
            case 'k':
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
            case 'm':
                e.preventDefault();
                video.muted = !video.muted;
                break;
            case 'f':
                e.preventDefault();
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                }
                break;
        }
    });
    
    // Add video error styling
    const style = document.createElement('style');
    style.textContent = `
        .video-error {
            text-align: center;
            color: #ff3232;
        }
        
        .video-error i {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        
        .video-error p {
            margin: 5px 0;
        }
        
        .error-message {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);
}
}

// Enhanced smoke animation with more particles
function initSmokeAnimation() {
    const canvas = document.getElementById('smokeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    const container = document.querySelector('.character-container');
    
    function setCanvasSize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    
    setCanvasSize();
    
    // Enhanced smoke particles array
    const particles = [];
    const particleCount = 40; // Increased particle count
    
    // Enhanced Particle class
    class Particle {
        constructor() {
            this.reset();
            this.x = canvas.width * 0.5 + (Math.random() - 0.5) * 30;
            this.y = canvas.height * 0.6;
        }
        
        reset() {
            this.x = canvas.width * 0.5 + (Math.random() - 0.5) * 30;
            this.y = canvas.height * 0.6;
            this.size = Math.random() * 15 + 8;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.005;
            this.wobble = Math.random() * 0.8;
            this.wobbleSpeed = Math.random() * 0.03 + 0.02;
            this.wobbleOffset = Math.random() * Math.PI * 2;
            this.colorVariation = Math.random() * 0.3;
        }
        
        update() {
            // Add some drift
            this.speedX += (Math.random() - 0.5) * 0.05;
            this.speedX = Math.max(Math.min(this.speedX, 1), -1);
            
            this.x += this.speedX + Math.sin(this.wobbleOffset + Date.now() * this.wobbleSpeed * 0.001) * this.wobble;
            this.y -= this.speedY;
            this.life -= this.decay;
            this.opacity = this.life * 0.8;
            this.size *= 0.995; // Slight shrink over time
            
            if (this.life <= 0 || this.y < -this.size || this.x < -this.size || this.x > canvas.width + this.size) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            
            // Create gradient for smoke
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size
            );
            
            const r = 0 + this.colorVariation * 255;
            const g = 255;
            const b = 157 - this.colorVariation * 100;
            
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(${r * 0.8}, ${g * 0.9}, ${b}, ${this.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(${r * 0.5}, ${g * 0.7}, ${b}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            // Add secondary glow
            ctx.globalAlpha = this.opacity * 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new Particle();
        particle.life = Math.random() * 0.5; // Stagger start times
        particles.push(particle);
    }
    
    // Enhanced animation loop with trail effect
    let lastTime = 0;
    function animateSmoke(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Clear with fade effect for smoke trails
        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateSmoke);
    }
    
    // Start animation
    animateSmoke();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        setCanvasSize();
    });
}

// Enhanced floating particles in background
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40; // Increased count
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 15 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 100; // Start below viewport
        const animationDelay = Math.random() * 20;
        const duration = Math.random() * 30 + 20; // Longer duration
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Random color variation
        const opacity = Math.random() * 0.1 + 0.02;
        const colorVariation = Math.random() * 0.3;
        const r = 0 + colorVariation * 255;
        const g = 255;
        const b = 157 - colorVariation * 100;
        particle.style.background = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        
        container.appendChild(particle);
    }
}

// Enhanced scroll animations with parallax
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .tokenomics-overview, .unlock-schedule, .chart-widget, .streamflow-widget, .buy-button, .join-community, .social-link, .video-container, .contract-address');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                if (entry.target.classList.contains('social-link')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-container');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
}

// Enhanced smooth scrolling function
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Initialize smooth scrolling for all anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    smoothScrollTo(targetElement.offsetTop - 80, 1000);
                }
            }
        });
    });
}

// Tokenomics charts animation with progress fill
function initTokenomicsCharts() {
    const charts = document.querySelectorAll('.circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                const value = parseFloat(chart.getAttribute('stroke-dasharray').split(',')[0]);
                
                // Animate from 0 to target value
                let startValue = 0;
                const duration = 2000;
                const startTime = Date.now();
                
                function animateChart() {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out function
                    const easedProgress = 1 - Math.pow(1 - progress, 3);
                    const currentValue = startValue + (value - startValue) * easedProgress;
                    
                    chart.setAttribute('stroke-dasharray', `${currentValue}, 100`);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateChart);
                    }
                }
                
                animateChart();
            }
        });
    }, {
        threshold: 0.5
    });
    
    charts.forEach(chart => {
        observer.observe(chart);
    });
}
// StreamFlow iframe handling
function initStreamFlow() {
    const streamflowContainer = document.getElementById('streamflowContainer');
    const iframe = streamflowContainer.querySelector('.streamflow-iframe');
    const fallback = streamflowContainer.querySelector('.widget-fallback');
    
    if (!iframe) return;
    
    // Create loading spinner
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'iframe-loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading StreamFlow dashboard...</p>
    `;
    
    // Hide fallback initially, show loading
    if (fallback) fallback.style.display = 'none';
    streamflowContainer.appendChild(loadingDiv);
    
    // Try to load iframe
    iframe.style.display = 'block';
    
    // Set timeout to show fallback if iframe doesn't load
    const loadTimeout = setTimeout(() => {
        handleStreamFlowError(iframe);
    }, 5000); // 5 second timeout
    
    // Clear timeout when iframe loads
    iframe.addEventListener('load', function() {
        clearTimeout(loadTimeout);
        handleStreamFlowLoad(this);
    });
    
    iframe.addEventListener('error', function() {
        clearTimeout(loadTimeout);
        handleStreamFlowError(this);
    });
}

// Handle iframe load success
function handleStreamFlowLoad(iframe) {
    const container = iframe.parentElement;
    const loading = container.querySelector('.iframe-loading');
    const fallback = container.querySelector('.widget-fallback');
    
    // Remove loading and hide fallback
    if (loading) loading.remove();
    if (fallback) fallback.style.display = 'none';
    
    // Show iframe
    iframe.style.display = 'block';
    iframe.classList.add('loaded');
    
    console.log('StreamFlow dashboard loaded successfully');
}

// Handle iframe load error
function handleStreamFlowError(iframe) {
    const container = iframe.parentElement;
    const loading = container.querySelector('.iframe-loading');
    const fallback = container.querySelector('.widget-fallback');
    
    // Remove loading and show fallback
    if (loading) loading.remove();
    if (fallback) fallback.style.display = 'flex';
    
    // Hide iframe
    iframe.style.display = 'none';
    
    console.log('StreamFlow dashboard failed to load, showing fallback');
    
    // Add retry button to fallback
    const retryBtn = document.createElement('button');
    retryBtn.className = 'retry-btn';
    retryBtn.innerHTML = '<i class="fas fa-redo"></i> Retry Loading Dashboard';
    retryBtn.onclick = function() {
        retryStreamFlow(iframe);
    };
    
    const fallbackContent = fallback.querySelector('.fallback-content');
    if (fallbackContent && !fallbackContent.querySelector('.retry-btn')) {
        fallbackContent.appendChild(retryBtn);
    }
}

// Retry loading StreamFlow
function retryStreamFlow(iframe) {
    const container = iframe.parentElement;
    const fallback = container.querySelector('.widget-fallback');
    
    // Show loading, hide fallback
    if (fallback) fallback.style.display = 'none';
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'iframe-loading';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Retrying to load StreamFlow dashboard...</p>
    `;
    container.appendChild(loadingDiv);
    
    // Reload iframe with cache busting
    const newSrc = iframe.src + (iframe.src.includes('?') ? '&' : '?') + 't=' + Date.now();
    iframe.src = newSrc;
    iframe.style.display = 'block';
    
    // Set timeout again
    const loadTimeout = setTimeout(() => {
        handleStreamFlowError(iframe);
    }, 5000);
    
    iframe.onload = function() {
        clearTimeout(loadTimeout);
        handleStreamFlowLoad(this);
    };
    
    iframe.onerror = function() {
        clearTimeout(loadTimeout);
        handleStreamFlowError(this);
    };
}

// Alternative: Use StreamFlow API if available
async function fetchStreamFlowData() {
    try {
        // Note: StreamFlow may not have a public API, but you could use a proxy
        const response = await fetch('https://api.streamflow.finance/public/token/locks?token=6gH5aqXWb3nmDvYvFRCQv9L3eBhr9jhVN911cCxCpump');
        
        if (!response.ok) {
            throw new Error('API not available');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('StreamFlow API not available:', error);
        return null;
    }
}
// Initialize video with autoplay
function initVideo() {
    const video = document.querySelector('.project-video');
    if (video) {
        // Try to autoplay with sound muted
        video.muted = true;
        video.playsInline = true;
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay prevented, show controls
                video.controls = true;
                console.log("Autoplay prevented:", error);
            });
        }
        
        // Add loading state
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
        
        // Add hover play/pause
        video.addEventListener('mouseenter', () => {
            if (!video.paused) return;
            video.play().catch(() => {
                // Play failed, ensure controls are visible
                video.controls = true;
            });
        });
        
        video.addEventListener('mouseleave', () => {
            if (video.paused) return;
            video.pause();
        });
    }
}

// Initialize iframes with loading states
function initIframes() {
    const iframes = document.querySelectorAll('.streamflow-iframe, .dexscreener-iframe');
    
    iframes.forEach(iframe => {
        // Add loading class
        iframe.classList.add('iframe-loading');
        
        // Remove loading class when loaded
        iframe.addEventListener('load', () => {
            iframe.classList.remove('iframe-loading');
            
            // Force resize after a delay to ensure proper rendering
            setTimeout(() => {
                iframe.style.height = iframe.offsetHeight + 'px';
            }, 1000);
        });
        
        // Handle iframe errors
        iframe.addEventListener('error', () => {
            iframe.classList.remove('iframe-loading');
            const container = iframe.closest('.widget-container, .chart-container-full');
            if (container) {
                container.innerHTML = `
                    <div class="iframe-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Failed to load content. Please try refreshing the page or check the URL directly.</p>
                        <a href="${iframe.src}" target="_blank" class="error-link">Open in new tab</a>
                    </div>
                `;
            }
        });
    });
}

// Enhanced AI Chatbot functionality
function initChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const toggleChatbot = document.getElementById('toggleChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot visibility with animation
    toggleChatbot.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
        toggleChatbot.classList.toggle('active');
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
        toggleChatbot.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response after a short delay
        setTimeout(() => {
            const response = getBotResponse(message);
            removeTypingIndicator();
            addMessage(response, 'bot');
            
            // Scroll to bottom of messages
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chatbot-message', 'bot-message', 'typing');
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat with animation
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', `${sender}-message`);
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = sender === 'user' ? 'translateX(20px)' : 'translateX(-20px)';
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        // Format links in response
        const formattedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        contentDiv.innerHTML = `<p>${formattedText}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Animate message appearance
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        }, 10);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Enhanced bot response logic
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Enhanced responses with more details
        const responses = {
            greeting: /hello|hi|hey|greetings/i,
            project: /what is bullwhale|tell me about|explain project/i,
            tokenomics: /tokenomics|supply|token|circulating|locked/i,
            roadmap: /roadmap|plan|future|what's next/i,
            buy: /buy|purchase|where to buy|how to buy/i,
            contract: /contract|address|where contract/i,
            community: /community|join|social|telegram|twitter|x/i,
            team: /team|who created|founder|creator/i,
            utility: /utility|use case|purpose|why|what for/i,
            lock: /lock|vesting|unlock|schedule/i,
            price: /price|value|worth|market cap/i
        };
        
        // Check for matches
        for (const [key, pattern] of Object.entries(responses)) {
            if (pattern.test(lowerMessage)) {
                return getResponseByType(key, userMessage);
            }
        }
        
        // Default response
        return "I'm the BullWhale AI assistant! I can help you with information about the project, tokenomics, roadmap, team, community, how to buy tokens, and more. What specific question do you have about BullWhale?";
    }
    
    // Detailed responses by type
    function getResponseByType(type, originalMessage) {
        const responses = {
            greeting: "Welcome to the BullWhale community! 🐋 I'm here to help you learn everything about our community-driven cryptocurrency project. What would you like to know?",
            
            project: "BullWhale is a revolutionary community-driven cryptocurrency on the Solana blockchain. It started as a vision to create a token that's truly owned and governed by its community rather than centralized developers. The project emphasizes transparency, community empowerment, and upcoming utility features that will benefit all holders.",
            
            tokenomics: `Total Supply: 1,000,000,000 tokens
Effective Supply: 996,000,000 (after burns)
Circulating Supply: ~535,000,000 tokens
Locked Tokens: ~461,000,000 (for team & development)
Creator Fee: 0.05% per transaction (25% burned, 75% to project)
Liquidity: Permanently locked (anti-rug)

The tokenomics are designed to ensure long-term sustainability while rewarding the community.`,
            
            roadmap: `🚀 CURRENT PHASE:
• Adding liquidity on Meteora
• Listing on CoinMarketCap & CoinGecko

📈 NEXT PHASE:
• CEX listings (when market cap is healthy)

🔮 FUTURE VISION:
• Launch Bull Whale Swap (Solana tokens only)
• Strategic partnerships with top Solana projects
• Community governance features`,
            
            buy: "You can buy BullWhale tokens on these platforms:\n\n🔹 Jupiter: https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=6gH5aqXWb3nmDvYvFRCQv9L3eBhr9jhVN911cCxCpump\n🔹 Pump.fun: https://join.pump.fun/HSag/8kjwcxb4\n\nAlways ensure you're using the correct contract address and do your own research before investing.",
            
            contract: "The official BullWhale contract address on Solana is:\n\n`6gH5aqXWb3nmDvYvFRCQv9L3eBhr9jhVN911cCxCpump`\n\nYou can copy it from the website or click the copy button in the Contract Address section. Always verify this address on our official channels.",
            
            community: "Join our growing community! 🌊\n\n🐦 X (Twitter): https://x.com/BullWhale_1\n👥 X Community: https://x.com/i/communities/2017689702510350746\n📱 Telegram: https://t.me/thebullish_whale\n📘 Facebook: https://www.facebook.com/share/1Bp3CSrV2c\n\nJoin the pod and help shape the future of BullWhale!",
            
            team: "BullWhale was created by an inspired individual who believed in community power over centralized control. Starting with just $25,000, the project has grown into a community-driven movement. The team remains transparent and works closely with the community on all decisions and developments.",
            
            utility: "Current and upcoming utilities:\n\n• Community governance and voting rights\n• Bull Whale Swap (in development) for Solana tokens\n• Strategic partnerships within Solana ecosystem\n• Revenue sharing mechanisms for holders\n• NFT integrations and ecosystem expansions\n\nThe focus is on building real utility that benefits the entire community.",
            
            lock: "Locked Token Schedule:\n\n✅ ALREADY UNLOCKED: 336.59M tokens\n\n🔜 UPCOMING UNLOCKS (~461M total):\n• Feb 8, 2026: 180M tokens\n• Feb 28, 2026: 30M tokens\n• Dec 31, 2026: 20M tokens\n• Jan 1, 2027: 231M tokens\n\nLocked tokens support team payments and future development. View real-time data in the StreamFlow widget on our website.",
            
            price: "For real-time price information, please check:\n\n• Live chart on our website (DexScreener integration)\n• DexScreener directly: https://dexscreener.com/solana/FsVzXAcXF6fU8xA9PEorLq3XCFzovDaSvrFhcRCNbbpi\n• Jupiter for current swap rates\n\nRemember: Crypto prices are volatile. Always do your own research."
        };
        
        return responses[type] || "I'm not sure how to answer that. Could you rephrase your question? I can help with information about the project, tokenomics, roadmap, buying instructions, or community links.";
    }
}

// Enhanced copy button functionality
function initCopyButton() {
    const copyButton = document.getElementById('copyButton');
    const contractAddress = document.getElementById('contractAddress');
    
    copyButton.addEventListener('click', function() {
        const textToCopy = contractAddress.textContent;
        
        // Use the Clipboard API
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Enhanced success feedback
            const originalHTML = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.style.background = 'rgba(0, 255, 157, 0.3)';
            copyButton.style.borderColor = 'var(--primary-accent)';
            
            // Add success animation
            copyButton.classList.add('success');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyButton.innerHTML = originalHTML;
                copyButton.style.background = '';
                copyButton.style.borderColor = '';
                copyButton.classList.remove('success');
            }, 2000);
            
            // Visual feedback on the address field
            contractAddress.style.color = 'var(--primary-accent)';
            contractAddress.style.textShadow = '0 0 10px rgba(0, 255, 157, 0.5)';
            
            setTimeout(() => {
                contractAddress.style.color = '';
                contractAddress.style.textShadow = '';
            }, 1000);
            
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyButton.innerHTML = '<i class="fas fa-times"></i>';
            copyButton.style.background = 'rgba(255, 50, 50, 0.2)';
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
                copyButton.style.background = '';
            }, 2000);
        });
    });
}

// Enhanced join button functionality
function initJoinButton() {
    const joinButton = document.getElementById('joinButton');
    
    joinButton.addEventListener('click', function() {
        // Enhanced animation
        this.classList.add('clicked');
        
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
        `;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Scroll to community section
        const communitySection = document.getElementById('community');
        if (communitySection) {
            smoothScrollTo(communitySection.offsetTop - 80, 1000);
        }
        
        // Reset button state
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
                                }
