/* ==================== 主页专用JavaScript ====================
 * 仅包含主页 (index.html) 特有的功能
 * 依赖: common.js（必须先加载）
 * ================================================= */

// ========== 豆包 AI API 配置 ==========
// 如果没有外部配置文件，使用这个默认配置
if (typeof AI_CONFIG === 'undefined') {
    var AI_CONFIG = {
        apiUrl: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        apiKey: 'c8737ecd-bd2c-40c9-a24e-1f5602a37aea',
        model: 'doubao-1-5-vision-pro-250328',
        systemPrompt: `你是一个专业的个人网站AI助手。你的任务是帮助访客了解网站主人 ZHY。

关于 ZHY 的信息：
- 职业：研究生，信息与通信工程专业，计算机视觉研究者
- 学校：华北电力大学 (GPA 90.264, 排名 5/39)
- 研究方向：视觉语言模型(VLM)、开放词汇目标检测(OVD)、多模态学习

核心技能：
  * 视觉语言模型: CLIP, YOLO-World, Vision Transformer，擅长多模态数据处理、模型微调和推理
  * 目标检测: YOLO系列(v5/v8/v11), Faster R-CNN, DETR，具备开放词汇检测(OVD)课题经验
  * 深度学习: 熟悉PyTorch生态 (torchvision, torchaudio)，了解TensorFlow, Mindspore
  * 开发环境: 熟练Linux/MacOS系统，使用Docker容器化，Conda/venv环境管理，Tmux终端复用
  * 版本控制: 精通Git，熟练使用GitHub/GitLab工作流，Lazygit，飞书团队协作
  * 开发工具: VS Code, PyCharm作为IDE，Jupyter Notebook进行实验验证
  * 数据处理: OpenCV/Pillow图像增强预处理，Labelme/CVAT数据标注
  * 可视化: Matplotlib, OpenCV(cv2)进行图像、数据和实验结果可视化
  * 编程语言: Python (主力开发语言), C (用于模型部署与性能优化)

证书与荣誉时间线（从新到旧）：
【2025年】
  • HCIP-AI-Ascend Developer 认证 - 华为认证ICT高级工程师，AI-Ascend开发方向
  • AscendC 算子开发能力认证（中级）- 华为昇腾微认证，证书编号 ADC1120250007342
  • 第八届全国大学生嵌入式芯片与系统设计竞赛 北部赛区三等奖 - 担任队长，负责代码设计、模型权重导出部署、小车调试
  • 全国计算机等级考试三级 - 网络技术方向，成绩优秀
【2024年】
  • 第十二届全国大学生新一代信息通信技术大赛 河北省二等奖 - 担任队员，负责撰写方案设计书
  • 优秀研究生 - 华北电力大学 2024-2025学年，表彰在思想品德、学业成绩、科研能力等方面表现突出
  • 研究生学业奖学金 - GPA 90.264，专业排名 5/39
【2023年】
  • 全国计算机等级考试二级 - MS Office 高级应用
【2021年】
  • 大学英语六级 (CET-6) - 成绩 445 分
【2020年】
  • 大学英语四级 (CET-4) - 成绩 532 分

统计：4项专业认证 + 2项竞赛获奖 + 2项学术荣誉 + 2项语言证书

联系方式: z13503876281@163.com
GitHub: https://github.com/ihaveaword
CSDN: https://blog.csdn.net/ZHY0091

当访客询问证书、荣誉、获奖等相关问题时，请按照时间线详细展示以上成就，并说明他可以点击导航栏的"./certificates"查看完整的可视化证书页面。

请用友好、专业的语气回答问题。如果问题与 ZHY 相关，提供准确详细的信息；如果是技术问题，可以展示专业知识。保持回答简洁但信息丰富。`,
        temperature: 0.7,
        maxTokens: 1000,
        maxHistory: 10
    };
}

// 对话历史记录
let conversationHistory = [];

// AI 回复数据库（备用/离线模式）
const aiResponses = {
    '介绍一下你自己': '你好！我是ZHY，华北电力大学信息与通信工程专业的研究生。我专注于计算机视觉和AI开发，特别是视觉语言模型(VLM)、开放词汇目标检测(OVD)等前沿领域。我是华为认证的HCIP-AI Ascend开发者，热爱将理论知识转化为实际应用。',
    '你的技能和专长是什么？': '我的核心技能包括：\n\n• **视觉语言模型**: CLIP, YOLO-World, Vision Transformer (ViT)等，擅长多模态数据处理、模型微调和推理\n• **目标检测**: 精通YOLO系列(v5/v8/v11)、Faster R-CNN、DETR，具备OVD课题经验\n• **深度学习框架**: 熟悉PyTorch生态，了解TensorFlow/Mindspore\n• **开发环境**: 熟练Linux/MacOS、Docker容器化、Conda/venv环境管理、Tmux\n• **版本控制**: 精通Git、GitHub/GitLab、飞书协作、Lazygit\n• **开发工具**: VS Code、PyCharm、Jupyter Notebook\n• **数据处理**: OpenCV、Pillow图像处理，Labelme、CVAT数据标注\n• **可视化**: Matplotlib、OpenCV (cv2)\n• **编程语言**: Python (主力)、C (模型部署优化)\n\nGPA 90.264，专业排名5/39。',
    '展示你的证书和荣誉': '我很高兴向你展示我的成就时间线！这些证书和荣誉记录了我的成长轨迹：\n\n📅 **2025年**\n• 🏆 HCIP-AI-Ascend Developer 认证 - 华为认证ICT高级工程师，专注于AI-Ascend开发方向\n• 🔧 AscendC 算子开发能力认证（中级）- 华为昇腾微认证，掌握自定义算子开发与优化\n• 🥉 第八届全国大学生嵌入式芯片与系统设计竞赛 北部赛区三等奖 - 担任队长，负责代码设计、模型权重导出部署、小车调试等\n• 📜 全国计算机等级考试三级 - 网络技术方向，成绩优秀\n\n📅 **2024年**\n• 🥈 第十二届全国大学生新一代信息通信技术大赛 河北省二等奖 - 担任队员，负责撰写方案设计书\n• ⭐ 优秀研究生 - 华北电力大学2024-2025学年，表彰在思想品德、学业成绩、科研能力等方面表现突出\n• 🎓 研究生学业奖学金 - GPA 90.264，专业排名 5/39，展现了扎实的学术功底\n\n📅 **2023年**\n• 📜 全国计算机等级考试二级 - MS Office 高级应用，为数据处理打下基础\n\n📅 **2021年**\n• 🌐 大学英语六级 (CET-6) - 成绩 445 分，具备良好的英语阅读能力\n\n📅 **2020年**\n• 🌐 大学英语四级 (CET-4) - 成绩 532 分，英语基础扎实\n\n💡 **总计**: 4项专业认证 + 2项竞赛获奖 + 2项学术荣誉 + 2项语言证书\n\n想了解更多详情？点击导航栏的 "ls ./certificates" 查看完整的证书展示页面，那里有更详细的介绍和可视化时间线！',
    '如何联系你？': '很高兴你想要联系我！你可以通过以下方式与我取得联系：\n\n📧 **邮箱**: z13503876281@163.com\n🎓 **学校**: 华北电力大学\n� **地点**: 北京, 中国\n🐙 **GitHub**: https://github.com/ihaveaword\n📝 **CSDN**: https://blog.csdn.net/ZHY0091\n\n我通常在24小时内回复邮件。期待与你交流！',
    'default': '这是一个很好的问题！作为ZHY的AI助手，我可以回答关于他的技能、项目、证书和联系方式的问题。\n\n你可以问我：\n• 关于他的专业背景和研究方向\n• 他的技能和专长\n• 他获得的证书和荣誉\n• 如何联系他\n\n或者你可以点击上面的快速问题按钮来开始对话！'
};

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM 内容已加载，开始初始化主页功能...');
    
    // 初始化Matrix代码雨
    setTimeout(() => {
        if (typeof initMatrixRain === 'function') {
            initMatrixRain();
            console.log('✅ Matrix 代码雨已初始化');
        }
    }, 3000);
    
    // 添加波纹效果
    setTimeout(() => {
        if (typeof addRippleEffect === 'function') {
            addRippleEffect();
            console.log('✅ 波纹效果已添加');
        }
    }, 3000);
    
    // Hero区域打字机效果
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 30);
        }, 3500);
    }
    
    // 初始化轮播图
    initCarousel();
    
    // 初始化AI对话
    initAIChat();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化订阅表单
    initSubscribeForm();
    
    console.log('✅ 主页模块初始化完成');
    
    // 检查 AI 配置状态
    if (AI_CONFIG.apiKey && AI_CONFIG.apiKey !== 'YOUR_ARK_API_KEY_HERE') {
        console.log('✅ 豆包 AI 已配置并启用');
        console.log(`📊 模型: ${AI_CONFIG.model}`);
        console.log(`🎯 对话历史: 保留最近 ${AI_CONFIG.maxHistory || 10} 轮`);
    } else {
        console.warn('⚠️  豆包 AI 未配置，使用备用回复模式');
    }
});

// ========== 轮播图功能 ==========
function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!slides.length) return;

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

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

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
}

// ========== AI 对话功能 ==========
function initAIChat() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChat');
    const saveChatBtn = document.getElementById('saveChat');
    const typingIndicator = document.getElementById('typingIndicator');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    if (!chatMessages || !chatInput) return;

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
            ...conversationHistory.slice(-(AI_CONFIG.maxHistory || 10))
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
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // 获取AI回复（备用方案）
    function getAIResponse(userMessage) {
        for (const [key, value] of Object.entries(aiResponses)) {
            if (key !== 'default' && userMessage.includes(key)) {
                return value;
            }
        }
        
        // 简单的关键词匹配
        if (userMessage.includes('你好') || userMessage.includes('嗨') || userMessage.includes('hi') || userMessage.includes('hello')) {
            return '你好！很高兴见到你！我可以帮你了解更多关于ZHY的信息。有什么我可以帮助你的吗？';
        }
        if (userMessage.includes('技能') || userMessage.includes('能力') || userMessage.includes('专长')) {
            return aiResponses['你的技能和专长是什么？'];
        }
        if (userMessage.includes('证书') || userMessage.includes('荣誉') || userMessage.includes('奖') || userMessage.includes('认证')) {
            return aiResponses['展示你的证书和荣誉'];
        }
        if (userMessage.includes('项目') || userMessage.includes('作品') || userMessage.includes('portfolio')) {
            return '你可以在页面的作品集区域查看详细的项目介绍，或者访问 GitHub 查看更多代码项目。如果你想了解证书和荣誉，可以点击导航栏的 "./certificates" 查看！';
        }
        if (userMessage.includes('联系') || userMessage.includes('邮箱') || userMessage.includes('电话') || userMessage.includes('contact')) {
            return aiResponses['如何联系你？'];
        }
        if (userMessage.includes('学校') || userMessage.includes('大学') || userMessage.includes('学历')) {
            return 'ZHY目前是华北电力大学信息与通信工程专业的研究生（2024-2027），本科也是在华北电力大学就读（2020-2024）。专业方向是计算机视觉和AI开发。';
        }
        if (userMessage.includes('研究') || userMessage.includes('方向') || userMessage.includes('专业')) {
            return 'ZHY的研究方向主要集中在：\n\n• 计算机视觉 (Computer Vision)\n• 视觉语言模型 (VLM)\n• 视觉语言预训练 (VLP)\n• 目标检测 (Object Detection)\n• 开放词汇检测 (OVD)\n\n这些都是当前AI领域非常前沿的研究方向！';
        }
        if (userMessage.includes('代码') || userMessage.includes('编程')) {
            return '我很喜欢编程！这是一个简单的Python示例：\n\n```python\ndef detect_object(image):\n    # 使用计算机视觉模型进行目标检测\n    model = load_model("yolo_v8")\n    results = model.predict(image)\n    return results\n```\n\nZHY主要使用Python进行AI开发，也熟悉Web开发技术。';
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
        if (typeof hljs !== 'undefined') {
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }

    // 格式化消息
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
    if (clearChatBtn) {
        clearChatBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有对话记录吗？')) {
                chatMessages.innerHTML = '';
                conversationHistory = [];
                addMessage('你好！我是AI助手。有什么我可以帮助你的吗？', 'ai');
            }
        });
    }

    // 保存对话
    if (saveChatBtn) {
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
    }
}

// ========== 滚动动画 ==========
function initScrollAnimations() {
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
}

// ========== 订阅表单 ==========
function initSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    if (!subscribeForm) return;
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        alert(`感谢订阅！我们会将更新发送到：${email}`);
        subscribeForm.reset();
    });
}

// ========== 复制到剪贴板功能 ==========
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        // 创建提示消息
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.innerHTML = `<i class="fas fa-check"></i> ${type === 'email' ? 'Email' : 'Text'} copied!`;
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // 3秒后移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Copy failed. Please try again.');
    });
}

// 将函数暴露到全局作用域，以便 HTML onclick 可以调用
window.copyToClipboard = copyToClipboard;
