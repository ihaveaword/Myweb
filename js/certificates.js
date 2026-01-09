/* ==================== 证书与荣誉页面交互脚本 ====================
 * 功能：
 * 1. 证书筛选功能
 * 2. 模态框展示证书详情
 * 3. 主题切换
 * 4. 移动端菜单
 * 5. 统计数据动画
 * 依赖: common.js (提供 initMatrixRain 等公共函数)
 * ================================================= */

// ========== 证书筛选功能 ==========
function initCertificateFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card:not(.add-new)');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有激活状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮激活状态
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 筛选证书卡片
            certCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });

            // 更新统计数据
            updateStats(filter);
        });
    });
}

// ========== 更新统计数据 ==========
function updateStats(filter) {
    const certCards = document.querySelectorAll('.cert-card:not(.add-new)');
    let visibleCount = 0;

    certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            visibleCount++;
        }
    });

    // 这里可以添加动画更新统计数字
    console.log(`当前筛选: ${filter}, 显示 ${visibleCount} 个证书`);
}

// ========== 统计数字动画 ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2秒
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ========== 模态框功能 ==========
function initModal() {
    const modal = document.getElementById('certModal');
    const modalClose = document.querySelector('.modal-close');
    const viewBtns = document.querySelectorAll('.view-btn');

    // 查看证书按钮点击事件
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.cert-card');
            const title = card.querySelector('.cert-title').textContent;
            const issuer = card.querySelector('.cert-issuer').textContent;
            const date = card.querySelector('.cert-date').textContent;

            // 设置模态框内容
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalInfo').innerHTML = `
                <p><strong>颁发机构：</strong>${issuer}</p>
                <p><strong>获得时间：</strong>${date}</p>
                <p style="margin-top: 20px; color: var(--terminal-green-dim);">
                    <i class="fas fa-info-circle"></i> 证书图片加载中...
                </p>
                <p style="margin-top: 15px; font-size: 0.9rem; opacity: 0.7;">
                    提示：您可以在这里上传证书扫描件或照片
                </p>
            `;

            // 显示模态框
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 验证按钮（可选功能）
    const verifyBtns = document.querySelectorAll('.verify-btn');
    verifyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('证书验证功能开发中...\n您可以链接到官方验证页面');
        });
    });

    // 关闭模态框
    modalClose.addEventListener('click', closeModal);

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 主题切换功能已移至 common.js，这里不再重复定义

// ========== 移动端菜单 ==========
function initMobileMenu() {
    // 使用 ID 选择器，与 common.js 保持一致
    const menuToggle = document.getElementById('mobileMenuToggle') || document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu');

    console.log('📱 Mobile menu init:', { menuToggle: !!menuToggle, navMenu: !!navMenu });

    if (!menuToggle || !navMenu) {
        console.warn('⚠️ Mobile menu elements not found');
        return;
    }

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('📱 Menu toggle clicked');

        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');

        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // 点击菜单项后关闭菜单
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// ========== 滚动动画 ==========
function initScrollAnimations() {
    // 移除动画，证书直接显示
    const cards = document.querySelectorAll('.cert-card');
    cards.forEach((card) => {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
}

// ========== 平滑滚动 ==========
function initSmoothScroll() {
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
}

// ========== 导航栏滚动效果 ==========
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // 向下滚动
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // 向上滚动
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
}

// ========== 添加新证书提示 ==========
function initAddNewCard() {
    const addNewCard = document.querySelector('.cert-card.add-new');

    if (addNewCard) {
        addNewCard.addEventListener('click', () => {
            alert(`📝 添加新证书提示：

1. 在 certificates.html 中复制现有的 cert-card 结构
2. 修改以下内容：
   - data-category: 证书类别 (professional/academic/competition/language)
   - data-year: 获得年份
   - 证书标题和详细信息
   - 图标类型（修改 cert-icon 的 class）
   
3. 更新页面顶部的统计数字
4. 在时间线部分添加对应条目

示例：将任何 cert-card 复制粘贴后修改内容即可！`);
        });
    }
}

// ========== 导出证书数据（可选功能） ==========
function exportCertificates() {
    const certificates = [];
    const certCards = document.querySelectorAll('.cert-card:not(.add-new)');

    certCards.forEach(card => {
        const cert = {
            title: card.querySelector('.cert-title')?.textContent || '',
            issuer: card.querySelector('.cert-issuer')?.textContent || '',
            date: card.querySelector('.cert-date')?.textContent || '',
            category: card.getAttribute('data-category'),
            year: card.getAttribute('data-year')
        };
        certificates.push(cert);
    });

    console.log('证书数据：', certificates);
    return certificates;
}

// ========== 初始化所有功能 ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 证书页面初始化中...');

    // 初始化各个功能模块
    // Matrix 代码雨使用 common.js 中的公共函数
    if (typeof initMatrixRain === 'function') {
        initMatrixRain();
    }
    initCertificateFilter();
    initModal();
    // 主题切换由 common.js 统一处理
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
    initAddNewCard();

    // 启动统计数字动画
    setTimeout(() => {
        animateCounters();
    }, 500);

    console.log('✅ 证书页面加载完成！');
});

// ========== 工具函数：生成证书模板 ==========
function generateCertTemplate(data) {
    return `
<!-- ${data.title} -->
<div class="cert-card" data-category="${data.category}" data-year="${data.year}">
    <div class="cert-header">
        <div class="cert-icon ${data.iconClass || ''}">
            <i class="${data.icon}"></i>
        </div>
        <div class="cert-badge ${data.badgeType}">
            <i class="${data.badgeIcon}"></i> ${data.badgeText}
        </div>
    </div>
    <div class="cert-body">
        <h3 class="cert-title">${data.title}</h3>
        <p class="cert-issuer">
            <i class="fas fa-building"></i> ${data.issuer}
        </p>
        <p class="cert-date">
            <i class="fas fa-calendar"></i> 获得时间: ${data.date}
        </p>
        ${data.certId ? `<p class="cert-id">
            <i class="fas fa-fingerprint"></i> 证书编号: ${data.certId}
        </p>` : ''}
        <div class="cert-description">
            <p>${data.description}</p>
            ${data.skills ? `<ul class="cert-skills">
                ${data.skills.map(skill => `<li>${skill}</li>`).join('\n')}
            </ul>` : ''}
        </div>
    </div>
    <div class="cert-footer">
        <button class="cert-btn view-btn">
            <i class="fas fa-eye"></i> 查看证书
        </button>
        ${data.verifiable ? `<button class="cert-btn verify-btn">
            <i class="fas fa-shield-alt"></i> 验证真伪
        </button>` : ''}
    </div>
</div>`;
}

// 示例：生成新证书
// const newCert = generateCertTemplate({
//     title: '新证书名称',
//     category: 'professional',
//     year: '2024',
//     icon: 'fas fa-certificate',
//     iconClass: 'tech',
//     badgeType: 'verified',
//     badgeIcon: 'fas fa-check-circle',
//     badgeText: '已认证',
//     issuer: '颁发机构',
//     date: '2024年10月',
//     certId: 'CERT-123456',
//     description: '证书描述',
//     skills: ['技能1', '技能2', '技能3'],
//     verifiable: true
// });
