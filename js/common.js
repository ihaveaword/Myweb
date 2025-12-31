/* ==================== 公共JavaScript文件 ====================
 * 包含所有页面共享的功能：
 * - Matrix 代码雨动画
 * - 导航栏交互
 * - 终端效果工具函数
 * - 页面跳转函数
 * ================================================= */

// ========== Matrix 代码雨效果 ==========
// ========== Matrix 代码雨效果 ==========
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let intervalId = null;

    // 设置canvas尺寸
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 字符集
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const charArray = chars.split('');
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    const drops = [];

    function initDrops() {
        columns = canvas.width / fontSize;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }
    initDrops();

    function draw() {
        // 半透明黑色背景，产生拖尾效果
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function startAnimation() {
        if (!intervalId) {
            initDrops();
            intervalId = setInterval(draw, 33);
        }
    }

    function stopAnimation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 检查当前主题并决定是否启动
    function checkTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            stopAnimation();
        } else {
            startAnimation();
        }
    }

    // 初始化检查
    checkTheme();

    // 监听主题变化
    document.addEventListener('themeChanged', checkTheme);
}

// ========== 导航链接波纹效果 ==========
function addRippleEffect() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'nav-link-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 255, 0, 0.5);
                width: 0;
                height: 0;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            `;

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ========== 终端打字机效果 ==========
function typeWriter(element, text, speed = 50) {
    if (!element) return;

    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========== 主题切换功能 ==========
// ========== 主题切换功能 ==========
function initThemeToggle() {
    // 尝试通过ID或Class获取按钮
    const themeToggle = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // 初始化：应用保存的主题和图标
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        console.log(`> Theme toggling: ${theme} -> ${newTheme}`);

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // 更新按钮图标
        updateThemeIcon(icon, newTheme);

        // 触发自定义事件，通知其他组件（如侧边栏）
        const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
        document.dispatchEvent(event);

        // 可选：同时切换CRT扫描线效果（保留原功能）
        // document.body.classList.toggle('no-scanlines', newTheme === 'light');
    });

    // 监听来自其他组件的主题变更（例如侧边栏）
    document.addEventListener('themeChanged', (e) => {
        if (e.detail && e.detail.theme) {
            updateThemeIcon(icon, e.detail.theme);
        }
    });

    function updateThemeIcon(icon, theme) {
        if (!icon) return;
        // Dark Mode 显示太阳（提示切到亮色），Light Mode 显示月亮（提示切到暗色）
        // 或者跟随 certificates.html 的逻辑：Dark -> Moon, Light -> Sun?
        // 检查 certificates.js 逻辑：
        // if (theme === 'dark') icon.className = 'fas fa-moon'; else icon.className = 'fas fa-sun';
        // 遵循 certificates.js 的现有逻辑以保持一致：
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

// ========== 导航栏滚动效果 ==========
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== 移动端菜单 ==========
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!mobileMenuToggle || !navMenu) return;

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ========== 平滑滚动 ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== 学生时代页面跳转 ==========
function openStudentPage() {
    // 添加淡出效果
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';

    setTimeout(() => {
        window.location.href = 'student-life.html';
    }, 300);
}

// ========== 控制台欢迎信息 ==========
function showConsoleWelcome() {
    console.log('%c' + `
╔═══════════════════════════════════════╗
║  Welcome to ZHY's Terminal Website   ║
║  Type: help for available commands   ║
║  Status: ONLINE | Version: 1.0.0     ║
╚═══════════════════════════════════════╝
    `, 'color: #00ff00; font-family: monospace;');
}

// ========== 侧边栏及悬浮控制台 ==========
function initSidebarControl() {
    const menuTrigger = document.getElementById('menuTrigger');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const backToTop = document.getElementById('backToTop');
    const sidebarThemeToggle = document.getElementById('sidebarThemeToggle');
    const navLinks = document.querySelectorAll('.sidebar-link');

    // 打开侧边栏
    if (menuTrigger && sidebar) {
        menuTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止立即触发document点击关闭
            sidebar.classList.add('sidebar-visible');
        });
    }

    // 关闭侧边栏
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-visible');
        });
    }

    // 点击外部关闭
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('sidebar-visible') &&
            !sidebar.contains(e.target) &&
            !menuTrigger.contains(e.target)) {
            sidebar.classList.remove('sidebar-visible');
        }
    });

    // 点击链接关闭
    if (sidebar) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('sidebar-visible');
            });
        });
    }

    // 回到顶部按钮逻辑
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 侧边栏主题切换
    if (sidebarThemeToggle) {
        sidebarThemeToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // 如果存在旧的主题切换按钮，也可以同步点击效果（可选）
            console.log(`> Theme switched to ${newTheme}`);

            // 触发自定义事件，以便其他组件响应
            const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
            document.dispatchEvent(event);
        });
    }
}

// ========== 通用初始化 ==========
function initCommon() {
    // 显示控制台欢迎信息
    showConsoleWelcome();

    // 初始化主题切换
    initThemeToggle();

    // 初始化导航栏
    initNavbarScroll();

    // 初始化移动端菜单
    initMobileMenu();

    // 初始化新的侧边栏控制
    initSidebarControl();

    // 初始化平滑滚动
    initSmoothScroll();

    console.log('✅ 公共模块初始化完成');
}

// ========== 页面加载时自动初始化 ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
