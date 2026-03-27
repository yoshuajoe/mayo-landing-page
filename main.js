/* ===================================================
   Mayo CLI — Website JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // Mobile Navigation
    // ============================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ============================
    // Install Command Dropdown
    // ============================
    const dropdownBtn = document.getElementById('installDropdownBtn');
    const dropdownMenu = document.getElementById('installDropdownMenu');
    const installCommand = document.getElementById('installCommand');
    const installLabel = document.getElementById('installLabel');

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('open');
        });

        dropdownMenu.querySelectorAll('.install-option').forEach(option => {
            option.addEventListener('click', () => {
                // Update active state
                dropdownMenu.querySelectorAll('.install-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');

                // Update command & label
                const cmd = option.getAttribute('data-cmd');
                const label = option.getAttribute('data-label');
                installCommand.textContent = cmd;
                installLabel.textContent = label;

                dropdownMenu.classList.remove('open');
            });
        });
    }

    // ============================
    // Copy to Clipboard
    // ============================
    function setupCopyButton(btnId) {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            // Find the closest install-command
            const commandEl = btn.closest('.install-box, .cta-install-box')?.querySelector('.install-command');
            if (!commandEl) return;

            const text = commandEl.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const copyIcon = btn.querySelector('.copy-icon');
                const checkIcon = btn.querySelector('.check-icon');

                copyIcon.classList.add('hidden');
                checkIcon.classList.remove('hidden');

                setTimeout(() => {
                    copyIcon.classList.remove('hidden');
                    checkIcon.classList.add('hidden');
                }, 2000);
            });
        });
    }

    setupCopyButton('installCopyBtn');
    setupCopyButton('ctaCopyBtn');

    // ============================
    // FAQ Accordion
    // ============================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ============================
    // Workflow Slider
    // ============================
    const stepsGrid = document.getElementById('stepsGrid');
    const stepsPrev = document.getElementById('stepsPrev');
    const stepsNext = document.getElementById('stepsNext');

    if (stepsGrid && stepsPrev && stepsNext) {
        stepsNext.addEventListener('click', () => {
            const firstCard = stepsGrid.querySelector('.step-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth + 24; // approximate width + gap
                stepsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        });

        stepsPrev.addEventListener('click', () => {
            const firstCard = stepsGrid.querySelector('.step-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth + 24; // approximate width + gap
                stepsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }
        });

        // Toggle buttons visibility based on scroll position
        stepsGrid.addEventListener('scroll', () => {
            const scrollLeft = stepsGrid.scrollLeft;
            const maxScroll = stepsGrid.scrollWidth - stepsGrid.clientWidth;

            stepsPrev.style.opacity = scrollLeft <= 0 ? '0.3' : '1';
            stepsPrev.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';

            stepsNext.style.opacity = scrollLeft >= maxScroll - 5 ? '0.3' : '1';
            stepsNext.style.pointerEvents = scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
        });

        // Initial state
        stepsPrev.style.opacity = '0.3';
        stepsPrev.style.pointerEvents = 'none';
    }

    // ============================
    // Terminal Animation
    // ============================
    const termOutput = document.getElementById('termOutput');
    const termCmd = document.getElementById('termCmd');
    const termCursor = document.getElementById('termCursor');
    const termQuery = document.getElementById('termQuery');
    const termCursor2 = document.getElementById('termCursor2');
    const termResponse = document.getElementById('termResponse');

    if (termOutput && termCmd) {
        runTerminalAnimation();
    }

    function runTerminalAnimation() {
        const commandText = 'mayo';
        const queryText = 'Show me employees by department with average salary';

        // Phase 1: Type the command
        termCmd.textContent = '';
        typeText(termCmd, commandText, 80, () => {
            // Phase 2: Show output
            setTimeout(() => {
                termCursor.classList.add('hidden');
                termOutput.classList.remove('hidden');

                // Animate output lines
                const lines = termOutput.querySelectorAll(':scope > .term-line, :scope > pre, :scope > div:not(.term-response)');
                lines.forEach((line, i) => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateY(5px)';
                    setTimeout(() => {
                        line.style.transition = 'all 0.3s ease';
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, i * 100);
                });

                // Phase 3: Type user query
                setTimeout(() => {
                    typeText(termQuery, queryText, 40, () => {
                        // Phase 4: Show response
                        setTimeout(() => {
                            termCursor2.classList.add('hidden');
                            termResponse.classList.remove('hidden');

                            const responseLines = termResponse.querySelectorAll(':scope > .term-line, :scope > table');
                            responseLines.forEach((line, i) => {
                                line.style.opacity = '0';
                                line.style.transform = 'translateY(5px)';
                                setTimeout(() => {
                                    line.style.transition = 'all 0.3s ease';
                                    line.style.opacity = '1';
                                    line.style.transform = 'translateY(0)';
                                }, i * 150);
                            });
                        }, 800);
                    });
                }, lines.length * 100 + 600);
            }, 500);
        });
    }

    function typeText(el, text, speed, callback) {
        let i = 0;
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // ============================
    // Scroll Animations (Intersection Observer)
    // ============================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animatable elements
    document.querySelectorAll(
        '.feature-card, .step-card, .trust-card, .integration-item, .faq-item'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });

    // Style for animation-in
    const style = document.createElement('style');
    style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
    document.head.appendChild(style);

    // ============================
    // Navbar Scroll Effect
    // ============================
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }

        lastScroll = currentScroll;
    });

    // ============================
    // Docs Sidebar Mobile Toggle
    // ============================
    const docsMobileToggle = document.getElementById('docsMobileToggle');
    const docsSidebar = document.getElementById('docsSidebar');

    if (docsMobileToggle && docsSidebar) {
        docsMobileToggle.addEventListener('click', () => {
            docsSidebar.classList.toggle('open');
        });
    }

    // ============================
    // Docs Sidebar Active State
    // ============================
    if (docsSidebar) {
        const sections = document.querySelectorAll('.docs-main h2[id], .docs-main h3[id]');
        const sidebarLinks = docsSidebar.querySelectorAll('a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================
    // Smooth scroll for anchor links
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
