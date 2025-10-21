// ========== 学生时代页面交互脚本 ==========

// 返回主页
function goBack() {
    window.location.href = 'index.html';
}

// 时间线筛选功能
document.addEventListener('DOMContentLoaded', function() {
    
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
            const target = parseInt(stat.getAttribute('data-count'));
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

// ========== 页面滚动进度指示器 ==========
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // 可以在这里添加进度条显示
    console.log('Scroll progress:', Math.round(scrolled) + '%');
});
