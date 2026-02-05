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
    
    // Set current year in footer (optional)
    document.querySelector('.copyright').innerHTML = `© ${new Date().getFullYear()} Bullish Whale. All rights reserved.`;
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Smoke animation from character's mouth
function initSmokeAnimation() {
    const canvas = document.getElementById('smokeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    const container = document.querySelector('.character-container');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Smoke particles array
    const particles = [];
    const particleCount = 30;
    const smokeColor = 'rgba(0, 255, 157, 0.6)';
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.x = canvas.width * 0.5; // Start from mouth area
            this.y = canvas.height * 0.6;
        }
        
        reset() {
            this.x = canvas.width * 0.5;
            this.y = canvas.height * 0.6;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.005;
            this.wobble = Math.random() * 0.5;
            this.wobbleSpeed = Math.random() * 0.05 + 0.02;
            this.wobbleOffset = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX + Math.sin(this.wobbleOffset + Date.now() * this.wobbleSpeed) * this.wobble;
            this.y -= this.speedY;
            this.life -= this.decay;
            this.opacity = this.life * 0.6;
            
            if (this.life <= 0 || this.y < -this.size) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = smokeColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            
            // Add glow effect
            ctx.globalAlpha = this.opacity * 0.3;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
        // Stagger particle start times
        particles[i].life = Math.random();
    }
    
    // Animation loop
    function animateSmoke() {
        // Clear canvas with a slight fade effect for trailing smoke
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
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
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// Floating particles in background
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size and position
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDelay = Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        container.appendChild(particle);
    }
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item, .tokenomics-overview, .unlock-schedule, .chart-widget, .streamflow-widget, .buy-button, .join-community, .social-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Tokenomics charts animation
function initTokenomicsCharts() {
    const charts = document.querySelectorAll('.circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the charts when they come into view
                const chart = entry.target;
                const value = chart.getAttribute('stroke-dasharray').split(',')[0];
                
                // Reset animation
                chart.style.animation = 'none';
                setTimeout(() => {
                    chart.style.animation = 'progress 2s ease-out forwards';
                }, 10);
            }
        });
    }, {
        threshold: 0.5
    });
    
    charts.forEach(chart => {
        observer.observe(chart);
    });
}

// AI Chatbot functionality
function initChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const toggleChatbot = document.getElementById('toggleChatbot');
    const closeChatbot = document.getElementById('closeChatbot');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot visibility
    toggleChatbot.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    // Close chatbot
    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Generate bot response after a short delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
            
            // Scroll to bottom of messages
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 500);
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', `${sender}-message`);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Bot response logic
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Predefined responses based on keywords
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to the BullWhale community. How can I assist you today?";
        }
        
        if (lowerMessage.includes('what is bullwhale') || lowerMessage.includes('what is this project')) {
            return "BullWhale is a community-driven cryptocurrency project on the Solana blockchain. It's a memecoin with a focus on community empowerment and upcoming utility features.";
        }
        
        if (lowerMessage.includes('tokenomics') || lowerMessage.includes('supply') || lowerMessage.includes('token')) {
            return "BullWhale has a total supply of 1,000,000,000 tokens, with an effective supply of 996,000,000 after burns. Approximately 535,000,000 are currently circulating, and about 461,000,000 are locked for team compensation and future development. There's a 0.05% creator fee per transaction.";
        }
        
        if (lowerMessage.includes('roadmap') || lowerMessage.includes('plan') || lowerMessage.includes('future')) {
            return "The roadmap includes: 1) Adding liquidity on Meteora and listing on CoinMarketCap & CoinGecko (Current), 2) CEX listing after healthy market cap growth (Next), 3) Launching Bull Whale Swap for Solana tokens and strategic partnerships (Future).";
        }
        
        if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('where to buy')) {
            return "You can buy BullWhale tokens on Jupiter (https://jup.ag) or Pump.fun (https://pump.fun). Both links are available in the 'Buy BullWhale Tokens' section of the website.";
        }
        
        if (lowerMessage.includes('contract') || lowerMessage.includes('address')) {
            return "The contract address for BullWhale on Solana is: 6gH5aqXWb3nmDvYvFRCQv9L3eBhr9jhVN911cCxCpump. You can copy it from the 'Contract Address' section on the website.";
        }
        
        if (lowerMessage.includes('community') || lowerMessage.includes('join') || lowerMessage.includes('social')) {
            return "You can join the BullWhale community on X (Twitter), X Community, Telegram, and Facebook. Links to all social platforms are in the 'Join Our Community' section.";
        }
        
        if (lowerMessage.includes('team') || lowerMessage.includes('who created') || lowerMessage.includes('founder')) {
            return "BullWhale was created by an inspired individual who wanted to build a cryptocurrency that empowers the community rather than just focusing on profits. The project started with a $25,000 investment and has grown into a community-driven movement.";
        }
        
        if (lowerMessage.includes('utility') || lowerMessage.includes('use case') || lowerMessage.includes('purpose')) {
            return "BullWhale is developing upcoming utility features including a swap platform for Solana tokens and strategic partnerships within the Solana ecosystem. The primary focus is on community governance and empowerment.";
        }
        
        if (lowerMessage.includes('lock') || lowerMessage.includes('vesting') || lowerMessage.includes('unlock')) {
            return "Approximately 461M tokens are locked and will be unlocked according to the schedule: Feb 8, 2026 (180M), Feb 28, 2026 (30M), Dec 31, 2026 (20M), Jan 1, 2027 (231M). You can view the live lock details via the StreamFlow widget on the website.";
        }
        
        // Default response
        return "I'm the BullWhale AI assistant. I can answer questions about the project, tokenomics, roadmap, team, community, and how to buy tokens. Feel free to ask me anything specific about BullWhale!";
    }
}

// Copy contract address functionality
function initCopyButton() {
    const copyButton = document.getElementById('copyButton');
    const contractAddress = document.getElementById('contractAddress');
    const copyTooltip = document.getElementById('copyTooltip');
    
    copyButton.addEventListener('click', function() {
        const textToCopy = contractAddress.textContent;
        
        // Use the Clipboard API
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show success feedback
            copyTooltip.textContent = 'Copied!';
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyTooltip.textContent = 'Copy';
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyTooltip.textContent = 'Failed!';
            
            setTimeout(() => {
                copyTooltip.textContent = 'Copy';
            }, 2000);
        });
    });
}

// Join button functionality
function initJoinButton() {
    const joinButton = document.getElementById('joinButton');
    
    joinButton.addEventListener('click', function() {
        // Scroll to community section
        const communitySection = document.getElementById('community');
        if (communitySection) {
            window.scrollTo({
                top: communitySection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Add a little animation to the button
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
}
