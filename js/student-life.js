// ========== 学生时代页面交互脚本 ==========

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}

// 时间线筛选功能
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 移动端菜单 ==========
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击菜单项时关闭菜单
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ========== 时间线筛选 ==========
    const filterButtons = document.querySelectorAll('.timeline-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-period');
            
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选时间线项目
            timelineItems.forEach(item => {
                const period = item.getAttribute('data-period');
                
                if (filter === 'all' || period === filter) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeInTimeline 0.8s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ========== 统计数字动画 ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateNumbers() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')); // 改为 data-target
            let current = 0;
            const increment = target / 100; // 100步完成
            const duration = 2000; // 2秒完成
            const stepTime = duration / 100;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
        
        animated = true;
    }
    
    // 使用 Intersection Observer 监听统计区域
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(statsSection);
    }
    
    // ========== 记忆盒子点击效果 ==========
    const memoryBoxes = document.querySelectorAll('.memory-box');
    
    memoryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // 添加点击脉冲效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // 可以在这里添加弹窗显示详细信息的逻辑
            console.log('Memory clicked:', this.querySelector('h3').textContent);
        });
    });
    
    // ========== 平滑滚动 ==========
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
    
    // ========== 时间线标记脉冲效果 ==========
    const markerIcons = document.querySelectorAll('.marker-icon');
    
    markerIcons.forEach((icon, index) => {
        // 添加延迟效果
        icon.style.animationDelay = `${index * 0.2}s`;
    });
    
    // ========== 页面加载动画 ==========
    window.addEventListener('load', function() {
        // 页面淡入效果
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ========== 扫描线效果 ==========
    const scanline = document.createElement('div');
    scanline.className = 'scanline-effect';
    scanline.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
        );
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(scanline);
    
    // ========== 鼠标悬停记忆标签高亮 ==========
    const memoryTags = document.querySelectorAll('.memory-tags span');
    
    memoryTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            const tagName = this.textContent.replace('#', '');
            // 高亮所有相同标签
            memoryTags.forEach(t => {
                if (t.textContent.includes(tagName)) {
                    t.style.background = 'var(--terminal-green)';
                    t.style.color = 'var(--terminal-bg)';
                }
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            memoryTags.forEach(t => {
                t.style.background = '';
                t.style.color = '';
            });
        });
    });
    
    // ========== 终端光标效果 ==========
    const titles = document.querySelectorAll('.timeline-header h2');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        // 添加文本和光标
        const span = document.createElement('span');
        span.textContent = text;
        title.appendChild(span);
        
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.style.cssText = `
            display: inline-block;
            width: 10px;
            height: 1.2em;
            background: var(--terminal-green);
            margin-left: 5px;
            animation: blink 1s infinite;
        `;
        title.appendChild(cursor);
    });
    
    // ========== 控制台欢迎信息 ==========
    console.log('%c╔═══════════════════════════════════════╗', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   STUDENT LIFE TIMELINE SYSTEM       ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   Version: 1.0.0                      ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c║   Status: ONLINE                      ║', 'color: #00ff00; font-family: monospace;');
    console.log('%c╚═══════════════════════════════════════╝', 'color: #00ff00; font-family: monospace;');
    console.log('%c> Loading memories...', 'color: #00ff41; font-family: monospace;');
    console.log('%c> System ready.', 'color: #00ff41; font-family: monospace;');
});

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', function(e) {
    // ESC 键返回主页
    if (e.key === 'Escape') {
        goBack();
    }
    
    // 数字键 1-5 切换时间线
    if (e.key >= '1' && e.key <= '5') {
        const buttons = document.querySelectorAll('.timeline-btn');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
});

// ========== 交互优化功能 ==========

// 回到顶部按钮
const backToTopBtn = document.getElementById('backToTop');
const timelineProgress = document.getElementById('timelineProgress');

// 滚动事件处理
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // 更新进度条
    if (timelineProgress) {
        timelineProgress.style.width = scrolled + '%';
    }
    
    // 显示/隐藏回到顶部按钮
    if (backToTopBtn) {
        if (winScroll > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// 回到顶部按钮点击事件
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 为时间线项目添加交错动画
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// 增强的卡片交互
const memoryBoxes = document.querySelectorAll('.memory-box');
memoryBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        // 移除过度的震动效果，保持优雅
        this.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    box.addEventListener('mouseleave', function() {
        // 鼠标离开时保持平滑过渡
        this.style.transition = 'all 0.5s ease-out';
    });
    
    // 点击卡片时的轻微反馈
    box.addEventListener('click', function() {
        this.style.transform = 'translateY(-6px) scale(0.99)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// 移除过度震动的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes gentle-float {
        0%, 100% { transform: translateY(-8px) scale(1.02); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
    
    .memory-box:hover {
        animation: gentle-float 3s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// 统计数字动画增强
const statBoxes = document.querySelectorAll('.stat-box');
statBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', function() {
        const number = this.querySelector('.stat-number');
        if (number) {
            number.style.animation = 'number-pulse 0.6s ease-in-out';
        }
    });
    
    box.addEventListener('mouseleave', function() {
        const number = this.querySelector('.stat-number');
        if (number) {
            number.style.animation = '';
        }
    });
});

// 添加数字脉动动画
const numberPulseStyle = document.createElement('style');
numberPulseStyle.textContent = `
    @keyframes number-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(numberPulseStyle);

// ========== 照片画廊筛选功能 ==========
function initPhotoGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选照片
            photoItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.remove('hidden');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 添加照片项点击效果
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            // 为将来的照片查看功能预留
            const photoTitle = this.querySelector('h4')?.textContent || '照片';
            console.log(`点击了照片: ${photoTitle}`);
            
            // 简单的点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 初始化照片画廊
initPhotoGallery();
