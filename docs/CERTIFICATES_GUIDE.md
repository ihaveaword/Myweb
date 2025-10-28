# 证书页面使用指南

## 📋 如何添加新证书

### 方法一：复制现有证书卡片

1. 打开 `certificates.html`
2. 找到任意一个 `cert-card` 结构
3. 复制整个 `<div class="cert-card">...</div>` 块
4. 粘贴到 `certificates-grid` 内的合适位置（在"添加更多"卡片之前）
5. 修改以下内容：

```html
<div class="cert-card" data-category="证书类别" data-year="年份">
    <!-- 修改图标和徽章 -->
    <div class="cert-header">
        <div class="cert-icon">
            <i class="fas fa-图标名称"></i>
        </div>
        <div class="cert-badge verified">
            <i class="fas fa-check-circle"></i> 状态文字
        </div>
    </div>
    
    <!-- 修改证书信息 -->
    <div class="cert-body">
        <h3 class="cert-title">证书名称</h3>
        <p class="cert-issuer">
            <i class="fas fa-building"></i> 颁发机构
        </p>
        <p class="cert-date">
            <i class="fas fa-calendar"></i> 获得时间: 2024年XX月
        </p>
        <div class="cert-description">
            <p>证书描述信息</p>
        </div>
    </div>
</div>
```

### 方法二：使用JavaScript生成（高级）

在浏览器控制台使用内置的 `generateCertTemplate` 函数：

```javascript
const newCert = generateCertTemplate({
    title: 'Python数据分析师认证',
    category: 'professional',  // professional/academic/competition/language
    year: '2024',
    icon: 'fas fa-python',
    iconClass: 'tech',
    badgeType: 'verified',
    badgeIcon: 'fas fa-check-circle',
    badgeText: '已认证',
    issuer: 'Python Software Foundation',
    date: '2024年10月',
    certId: 'PSF-123456',
    description: 'Python数据分析专业认证',
    skills: ['NumPy', 'Pandas', 'Matplotlib'],
    verifiable: true
});

console.log(newCert); // 复制输出的HTML代码
```

## 🎨 证书类别说明

### data-category 属性值：
- `professional` - 专业认证（蓝绿色）
- `academic` - 学术荣誉（蓝色系）
- `competition` - 竞赛获奖（金色系）
- `language` - 语言证书（橙色系）

### 图标样式类（cert-icon）：
- 默认：绿色边框
- `academic` - 蓝色边框
- `language` - 橙色边框
- `tech` - 粉色边框

### 徽章类型（cert-badge）：
- `verified` - 已认证（绿色）
- `gold` - 金奖（金色）
- `passed` - 通过（蓝色）

## 📊 更新统计数据

添加新证书后，记得更新页面顶部的统计数字：

```html
<div class="stat-item">
    <i class="fas fa-certificate"></i>
    <span class="stat-label">专业认证</span>
    <span class="stat-value" id="cert-count">5</span> <!-- 更新数字 -->
</div>
```

## ⏱️ 添加时间线条目

在 `timeline-section` 中添加新条目：

```html
<div class="timeline-item" data-year="2024">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <span class="timeline-year">2024</span>
        <h4>证书名称</h4>
        <p>简短描述</p>
    </div>
</div>
```

## 🎯 常用图标参考

### Font Awesome 图标：
- 🤖 AI/机器人: `fas fa-robot`
- 🎓 学术: `fas fa-graduation-cap`
- 🏆 奖杯: `fas fa-trophy`
- 🌐 语言: `fas fa-language`
- 💻 编程: `fas fa-laptop-code`
- 🐍 Python: `fab fa-python`
- ⚛️ React: `fab fa-react`
- 🔧 工具: `fas fa-tools`
- 📊 数据: `fas fa-chart-bar`
- 🔒 安全: `fas fa-shield-alt`
- ☁️ 云计算: `fas fa-cloud`
- 📱 移动开发: `fas fa-mobile-alt`

## 🎨 自定义样式

如果需要添加特殊样式的证书卡片，可以在 `certificates.css` 中添加：

```css
/* 自定义证书样式 */
.cert-icon.custom {
    background: rgba(255, 0, 200, 0.1);
    border-color: #ff00c8;
    color: #ff00c8;
}

.cert-badge.custom {
    background: rgba(255, 0, 200, 0.2);
    color: #ff00c8;
    border: 1px solid #ff00c8;
}
```

## 📸 添加证书图片

在模态框中显示证书图片，修改 `js/certificates.js` 中的模态框内容：

```javascript
// 在 initModal 函数中修改
document.getElementById('modalInfo').innerHTML = `
    <img src="images/证书图片.jpg" alt="${title}" style="max-width: 100%;">
    <p><strong>颁发机构：</strong>${issuer}</p>
    <p><strong>获得时间：</strong>${date}</p>
`;
```

## 🔍 筛选功能

证书会根据 `data-category` 属性自动筛选，无需额外配置。

## 💡 提示

1. **保持一致性**：使用相同格式添加证书，便于维护
2. **图片优化**：证书图片建议压缩后使用，提升加载速度
3. **备份数据**：定期备份 certificates.html 文件
4. **测试筛选**：添加新证书后测试筛选功能是否正常

## 📝 完整示例

```html
<!-- 新证书示例 -->
<div class="cert-card" data-category="professional" data-year="2024">
    <div class="cert-header">
        <div class="cert-icon tech">
            <i class="fab fa-python"></i>
        </div>
        <div class="cert-badge verified">
            <i class="fas fa-check-circle"></i> 已认证
        </div>
    </div>
    <div class="cert-body">
        <h3 class="cert-title">Python高级开发工程师</h3>
        <p class="cert-issuer">
            <i class="fas fa-building"></i> Python Software Foundation
        </p>
        <p class="cert-date">
            <i class="fas fa-calendar"></i> 获得时间: 2024年10月
        </p>
        <p class="cert-id">
            <i class="fas fa-fingerprint"></i> 证书编号: PSF-2024-12345
        </p>
        <div class="cert-description">
            <p>Python高级开发工程师认证，掌握Python高级特性和最佳实践</p>
            <ul class="cert-skills">
                <li>Python核心编程</li>
                <li>Web开发框架</li>
                <li>数据科学工具</li>
                <li>异步编程</li>
            </ul>
        </div>
    </div>
    <div class="cert-footer">
        <button class="cert-btn view-btn">
            <i class="fas fa-eye"></i> 查看证书
        </button>
        <button class="cert-btn verify-btn">
            <i class="fas fa-shield-alt"></i> 验证真伪
        </button>
    </div>
</div>
```

---

## 🚀 快速开始

1. 打开 `certificates.html`
2. 复制上面的完整示例
3. 修改内容为你的证书信息
4. 粘贴到合适位置
5. 保存并刷新页面查看效果

就是这么简单！🎉
