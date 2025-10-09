// ========== 主题切换功能 ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// 检查本地存储的主题设置
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========== 导航栏滚动效果 ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== 移动端菜单 ==========
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

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

// ========== 平滑滚动 ==========
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

// ========== 轮播图功能 ==========
const carouselTrack = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');

let currentSlide = 0;
const totalSlides = slides.length;

// 创建指示器
for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll('.carousel-indicator');

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// 自动轮播
let autoPlayInterval = setInterval(nextSlide, 5000);

// 鼠标悬停时暂停自动轮播
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// ========== AI 对话功能 ==========
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChat');
const saveChatBtn = document.getElementById('saveChat');
const typingIndicator = document.getElementById('typingIndicator');
const quickQuestions = document.querySelectorAll('.quick-question');

// ========== 豆包 AI API 配置 ==========
// 如果没有外部配置文件，使用这个默认配置
if (typeof AI_CONFIG === 'undefined') {
    var AI_CONFIG = {
        apiUrl: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        apiKey: 'c8737ecd-bd2c-40c9-a24e-1f5602a37aea',
        model: 'doubao-1-5-vision-pro-250328',
        systemPrompt: `你是一个专业的个人网站AI助手。你的任务是帮助访客了解网站主人 ZHY。

关于 ZHY 的信息：
- 职业：前端开发者、网络工程师、创意工作者
- 技能：JavaScript, React, Vue.js, HTML/CSS, UI/UX设计, Node.js, 网络工程, AI应用开发
- 项目经验：数据可视化平台、电商平台设计、移动应用开发
- 联系方式：example@email.com, +86 138 0000 0000

请用友好、专业的语气回答问题。如果问题与 ZHY 相关，提供准确的信息；如果是技术问题，可以展示你的专业知识。保持回答简洁明了。`,
        temperature: 0.7,
        maxTokens: 1000,
        maxHistory: 10
    };
}

// 对话历史记录
let conversationHistory = [];

// AI 回复数据库（备用/离线模式）
const aiResponses = {
    '介绍一下你自己': '你好！我是一名充满热情的创作者和开发者。我专注于前端开发和UI/UX设计，拥有多年的项目经验。我热爱将创意想法转化为实际的数字产品，并不断学习新技术来提升自己的能力。',
    '你的技能和专长是什么？': '我的核心技能包括：\n\n• **前端开发**: JavaScript, React, Vue.js, HTML/CSS\n• **UI/UX设计**: Figma, Adobe XD, 用户体验研究\n• **后端技术**: Node.js, Express, 数据库设计\n• **其他**: Git, API集成, 响应式设计, AI应用开发\n\n我特别擅长创建用户友好且视觉吸引力强的界面。',
    '展示一些你的项目': '我很高兴展示我的一些项目：\n\n1. **数据可视化平台** - 使用React和D3.js构建的交互式数据分析工具\n2. **电商平台设计** - 完整的UI/UX设计，注重用户体验和转化率\n3. **移动应用开发** - React Native跨平台应用，集成了多个第三方服务\n\n每个项目都体现了我对细节的关注和对用户体验的重视。',
    '如何联系你？': '很高兴你想要联系我！你可以通过以下方式与我取得联系：\n\n📧 **邮箱**: example@email.com\n📱 **电话**: +86 138 0000 0000\n💼 **LinkedIn**: [我的LinkedIn主页]\n🐙 **GitHub**: [我的GitHub]\n\n我通常在24小时内回复邮件。期待与你交流！',
    'default': '这是一个很好的问题！作为一个演示AI助手，我可以回答关于个人技能、项目经验和联系方式的问题。\n\n你可以问我：\n• 关于我的技能和专长\n• 我完成的项目\n• 如何联系我\n• 我的工作经验\n\n或者你可以点击上面的快速问题按钮来开始对话！'
};

// 发送消息
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // 禁用发送按钮
    sendBtn.disabled = true;

    // 添加用户消息
    addMessage(message, 'user');
    chatInput.value = '';
    adjustTextareaHeight();

    // 添加到对话历史
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // 显示正在输入指示器
    typingIndicator.style.display = 'flex';
    scrollToBottom();

    try {
        // 调用豆包 AI API
        const aiReply = await callDoubaoAPI(message);
        typingIndicator.style.display = 'none';
        addMessage(aiReply, 'ai');
        
        // 添加到对话历史
        conversationHistory.push({
            role: 'assistant',
            content: aiReply
        });
        
        scrollToBottom();
    } catch (error) {
        console.error('AI API 调用失败:', error);
        typingIndicator.style.display = 'none';
        
        // 使用备用回复
        const fallbackReply = getAIResponse(message);
        addMessage(fallbackReply, 'ai');
        scrollToBottom();
    } finally {
        // 重新启用发送按钮
        sendBtn.disabled = false;
    }
}

// 调用豆包 AI API
async function callDoubaoAPI(userMessage) {
    // 检查 API Key 是否配置
    if (!AI_CONFIG.apiKey || AI_CONFIG.apiKey === 'YOUR_ARK_API_KEY_HERE') {
        console.warn('⚠️ API Key 未配置，使用备用回复模式');
        throw new Error('请先配置 API Key');
    }

    // 构建消息数组
    const messages = [
        {
            role: 'system',
            content: AI_CONFIG.systemPrompt
        },
        ...conversationHistory.slice(-(AI_CONFIG.maxHistory || 10)) // 保留最近N轮对话
    ];

    const response = await fetch(AI_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: messages,
            temperature: AI_CONFIG.temperature || 0.7,
            max_tokens: AI_CONFIG.maxTokens || 1000
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('API 响应错误:', response.status, errorData);
        throw new Error(`API 请求失败: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// 获取AI回复（备用方案）
function getAIResponse(userMessage) {
    // 检查是否有匹配的预设回复
    for (const [key, value] of Object.entries(aiResponses)) {
        if (key !== 'default' && userMessage.includes(key)) {
            return value;
        }
    }
    
    // 简单的关键词匹配
    if (userMessage.includes('你好') || userMessage.includes('嗨')) {
        return '你好！很高兴见到你！我可以帮你了解更多关于我的信息。有什么我可以帮助你的吗？';
    }
    if (userMessage.includes('技能') || userMessage.includes('能力')) {
        return aiResponses['你的技能和专长是什么？'];
    }
    if (userMessage.includes('项目') || userMessage.includes('作品')) {
        return aiResponses['展示一些你的项目'];
    }
    if (userMessage.includes('联系') || userMessage.includes('邮箱') || userMessage.includes('电话')) {
        return aiResponses['如何联系你？'];
    }
    if (userMessage.includes('代码') || userMessage.includes('编程')) {
        return '我很喜欢编程！这是一个简单的JavaScript示例：\n\n```javascript\nfunction greet(name) {\n    return `你好，${name}！欢迎访问我的网站。`;\n}\n\nconsole.log(greet("访客"));\n```\n\n我经常使用各种编程语言和框架来构建项目。';
    }
    
    return aiResponses['default'];
}

// 添加消息到聊天窗口
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    const textDiv = document.createElement('div');
    textDiv.classList.add('message-text');
    
    // 处理Markdown格式和代码块
    const formattedText = formatMessage(text);
    textDiv.innerHTML = formattedText;
    
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = getCurrentTime();
    
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timeDiv);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    
    // 高亮代码块
    messageDiv.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}

// 格式化消息（支持基本Markdown和代码块）
function formatMessage(text) {
    // 代码块
    text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        lang = lang || 'javascript';
        return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // 行内代码
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 粗体
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // 列表
    text = text.replace(/^• (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // 换行
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 滚动到底部
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 自动调整文本框高度
function adjustTextareaHeight() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}

// 事件监听
sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

chatInput.addEventListener('input', adjustTextareaHeight);

// 快速问题
quickQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        chatInput.value = question;
        sendMessage();
    });
});

// 清空对话
clearChatBtn.addEventListener('click', () => {
    if (confirm('确定要清空所有对话记录吗？')) {
        chatMessages.innerHTML = '';
        conversationHistory = []; // 清空对话历史
        // 添加欢迎消息
        addMessage('你好！我是AI助手。有什么我可以帮助你的吗？你可以问我关于技能、项目或任何其他问题。', 'ai');
    }
});

// 保存对话
saveChatBtn.addEventListener('click', () => {
    const messages = [];
    document.querySelectorAll('.message').forEach(msg => {
        const sender = msg.classList.contains('user-message') ? '用户' : 'AI';
        const text = msg.querySelector('.message-text').textContent;
        const time = msg.querySelector('.message-time').textContent;
        messages.push(`[${time}] ${sender}: ${text}`);
    });
    
    const content = messages.join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
});

// ========== 订阅表单 ==========
const subscribeForm = document.querySelector('.subscribe-form');
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    alert(`感谢订阅！我们会将更新发送到：${email}`);
    subscribeForm.reset();
});

// ========== 滚动动画 ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.portfolio-item, .about-content, .quick-question').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== 初始化 ==========
console.log('🎉 欢迎访问我的个人网站！');
console.log('💡 这个网站使用纯HTML、CSS和JavaScript构建');
console.log('🤖 试试AI对话功能吧！');

// 检查 AI 配置状态
if (AI_CONFIG.apiKey && AI_CONFIG.apiKey !== 'YOUR_ARK_API_KEY_HERE') {
    console.log('✅ 豆包 AI 已配置并启用');
    console.log(`📊 模型: ${AI_CONFIG.model}`);
    console.log(`🎯 对话历史: 保留最近 ${AI_CONFIG.maxHistory || 10} 轮`);
} else {
    console.warn('⚠️  豆包 AI 未配置，使用备用回复模式');
    console.warn('💡 配置方法：');
    console.warn('   1. 打开 script.js 文件');
    console.warn('   2. 找到 AI_CONFIG.apiKey');
    console.warn('   3. 替换为你的豆包 API 密钥');
    console.warn('   详细说明请查看：快速配置.md');
}
