// 全局变量
let currentUser = null;
let questionBank = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// DOM元素引用
const screens = {
    login: document.getElementById('loginScreen'),
    register: document.getElementById('registerScreen'),
    review: document.getElementById('reviewScreen'),
    quiz: document.getElementById('quizScreen'),
    result: document.getElementById('resultScreen')
};

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    loadQuestionBank();  // 先加载题库
    initializeApp();     // 再初始化应用（包括升级数据格式）
    setupEventListeners();
});

// 初始化应用
function initializeApp() {
    // 初始化本地存储
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                username: 'admin',
                password: '123456',
                history: []
            },
            {
                username: 'test',
                password: '123',
                history: [
                    {
                        date: '2024-01-15',
                        score: 80,
                        wrongQuestions: [
                            {
                                description: 'CAR-T细胞的全称是什么？',
                                correctAnswer: 2,
                                options: ['自然杀伤T细胞', '嵌合抗原受体T细胞', '辅助T细胞'],
                                correctAnswerText: '嵌合抗原受体T细胞'
                            },
                            {
                                description: '截至2024年，中国的CAR-T细胞疗法在全球市场的占比排名为？',
                                correctAnswer: 1,
                                options: ['1', '2', '3'],
                                correctAnswerText: '1'
                            }
                        ]
                    }
                ]
            },
            {
                username: 'doctor',
                password: 'password',
                history: [
                    {
                        date: '2024-01-20',
                        score: 90,
                        wrongQuestions: [
                            {
                                description: 'CAR-T细胞治疗相比化学治疗的优势不包括？',
                                correctAnswer: 2,
                                options: ['靶向性高', '价格便宜', '微小残留病灶清除彻底'],
                                correctAnswerText: '价格便宜'
                            }
                        ]
                    }
                ]
            },
            {
                username: 'student',
                password: 'study123',
                history: []
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    
    // 升级历史记录数据格式
    upgradeUserDataFormat();
    
    showScreen('login');
}

// 升级用户历史记录数据格式
function upgradeUserDataFormat() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let needsUpdate = false;
    
    users.forEach(user => {
        if (user.history) {
            user.history.forEach(historyItem => {
                if (historyItem.wrongQuestions) {
                    historyItem.wrongQuestions.forEach((question, index) => {
                        // 如果是旧格式（字符串），尝试转换为新格式
                        if (typeof question === 'string') {
                            needsUpdate = true;
                            const matchingQuestion = findQuestionInBank(question);
                            if (matchingQuestion) {
                                historyItem.wrongQuestions[index] = {
                                    description: matchingQuestion.description,
                                    correctAnswer: matchingQuestion.correctAnswer,
                                    options: matchingQuestion.options,
                                    correctAnswerText: matchingQuestion.options[matchingQuestion.correctAnswer - 1]
                                };
                            } else {
                                // 如果找不到匹配的题目，保持原样但标记为字符串格式
                                historyItem.wrongQuestions[index] = {
                                    description: question,
                                    correctAnswer: null,
                                    options: null,
                                    correctAnswerText: '暂无答案信息'
                                };
                            }
                        }
                    });
                }
            });
        }
    });
    
    if (needsUpdate) {
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ 用户历史记录数据格式已升级');
    }
}

// 在题库中查找问题
function findQuestionInBank(questionText) {
    if (!questionBank || questionBank.length === 0) {
        return null;
    }
    
    return questionBank.find(q => 
        q.description === questionText || 
        q.title === questionText ||
        q.description.includes(questionText) ||
        questionText.includes(q.description)
    );
}

// 设置事件监听器
function setupEventListeners() {
    // 登录表单
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // 注册表单
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // 界面切换
    document.getElementById('showRegister').addEventListener('click', () => showScreen('register'));
    document.getElementById('showLogin').addEventListener('click', () => showScreen('login'));
    
    // 答题相关
    document.getElementById('startQuiz').addEventListener('click', startQuiz);
    document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
    
    // 结果页面
    document.getElementById('retakeQuiz').addEventListener('click', startQuiz);
    document.getElementById('backToLogin').addEventListener('click', () => showScreen('login'));
    document.getElementById('logout').addEventListener('click', () => showScreen('login'));
}

// 加载题库数据
function loadQuestionBank() {
    // 使用完整的题库数据（来自questions-data.js）
    if (typeof COMPLETE_QUESTION_BANK !== 'undefined' && COMPLETE_QUESTION_BANK.length > 0) {
        questionBank = COMPLETE_QUESTION_BANK;
        console.log(`✅ 成功加载题库：${questionBank.length} 道题目`);
        
        // 统计题目类型
        const judgeCount = questionBank.filter(q => q.type === '判断题').length;
        const choiceCount = questionBank.filter(q => q.type === '选择题').length;
        console.log(`📊 题目统计：判断题 ${judgeCount} 道，选择题 ${choiceCount} 道`);
        
        // 统计知识分类
        const categories = [...new Set(questionBank.map(q => q.category))];
        console.log(`📚 知识分类：${categories.length} 个类别`);
        categories.forEach(cat => {
            const count = questionBank.filter(q => q.category === cat).length;
            console.log(`  - ${cat}: ${count} 道题`);
        });
    } else {
        console.error('❌ 题库数据加载失败，请检查questions-data.js文件');
        // 使用备用的基础题库（防止完全加载失败）
        questionBank = [
            {
                category: "CAR-T细胞是什么",
                type: "判断题",
                title: "什么是CAR-T细胞",
                description: "CAR-T细胞是经过基因工程改造以表达靶向特定抗原的嵌合受体T细胞。",
                options: ["是", "否"],
                correctAnswer: 1
            },
            {
                category: "CAR-T细胞是什么",
                type: "选择题",
                title: "CAR-T细胞的全称",
                description: "CAR-T细胞的全称是什么？",
                options: ["自然杀伤T细胞", "嵌合抗原受体T细胞", "辅助T细胞"],
                correctAnswer: 2
            }
        ];
    }
}

// 显示指定屏幕
function showScreen(screenName) {
    // 隐藏所有屏幕
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 显示目标屏幕
    screens[screenName].classList.add('active');
    
    // 如果是回顾屏幕，显示用户历史
    if (screenName === 'review' && currentUser) {
        showUserHistory();
    }
}

// 处理登录
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        document.getElementById('welcomeUser').textContent = username;
        showMessage('登录成功！', 'success');
        showScreen('review');
    } else {
        showMessage('用户名或密码错误！', 'error');
    }
}

// 处理注册
function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('密码确认不匹配！', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
        showMessage('用户名已存在！', 'error');
        return;
    }
    
    const newUser = {
        username: username,
        password: password,
        history: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage('注册成功！请登录', 'success');
    showScreen('login');
    
    // 清空注册表单
    document.getElementById('registerForm').reset();
}

// 显示用户历史记录
function showUserHistory() {
    const container = document.getElementById('historyContainer');
    
    if (currentUser.history.length === 0) {
        container.innerHTML = `
            <div class="history-item">
                <p style="text-align: center; color: var(--text-secondary);">
                    欢迎首次使用！点击下方按钮开始答题
                </p>
            </div>
        `;
    } else {
        const latestHistory = currentUser.history[currentUser.history.length - 1];
        
        // 处理错题显示
        let wrongQuestionsHtml = '';
        if (latestHistory.wrongQuestions.length > 0) {
            wrongQuestionsHtml = `
                <div class="history-errors">
                    <div class="history-errors-title">
                        <span class="error-icon">❌</span>
                        <span>错题回顾 (${latestHistory.wrongQuestions.length}题)</span>
                    </div>
                    <div class="history-errors-list">
                        ${latestHistory.wrongQuestions.map((question, index) => {
                            // 处理新旧数据格式兼容
                            const questionText = typeof question === 'string' ? question : question.description;
                            
                            // 优先使用correctAnswerText，如果没有则从options中获取，最后尝试从题库中查找
                            let correctAnswer = '暂无答案信息';
                            if (typeof question === 'object') {
                                if (question.correctAnswerText) {
                                    correctAnswer = question.correctAnswerText;
                                } else if (question.options && question.correctAnswer) {
                                    correctAnswer = question.options[question.correctAnswer - 1];
                                }
                            }
                            
                            // 如果还是没有答案，尝试从题库中查找
                            if (correctAnswer === '暂无答案信息' && questionBank.length > 0) {
                                const matchingQuestion = questionBank.find(q => 
                                    q.description === questionText || 
                                    q.title === questionText
                                );
                                if (matchingQuestion && matchingQuestion.options && matchingQuestion.correctAnswer) {
                                    correctAnswer = matchingQuestion.options[matchingQuestion.correctAnswer - 1];
                                }
                            }
                            
                            return `
                            <div class="history-error-item">
                                <div class="error-content">
                                    <div class="error-header">
                                        <div class="error-number">${index + 1}</div>
                                        <div class="error-question">${questionText.length > 60 ? questionText.substring(0, 60) + '...' : questionText}</div>
                                        <div class="error-toggle" onclick="toggleErrorAnswer(this)">
                                            <span class="toggle-arrow">▶</span>
                                        </div>
                                    </div>
                                    <div class="error-answer" style="display: none;">
                                        <div class="answer-label">正确答案:</div>
                                        <div class="answer-text">${correctAnswer}</div>
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            wrongQuestionsHtml = `
                <div class="history-success">
                    <span class="success-icon">🎉</span>
                    <span>上次全部答对！</span>
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="history-item">
                <div class="history-score">${latestHistory.score}分</div>
                <div class="history-date">上次答题时间：${latestHistory.date}</div>
                ${wrongQuestionsHtml}
            </div>
        `;
    }
}

// 开始答题
function startQuiz() {
    // 使用真正的随机选择算法
    currentQuestions = selectRandomQuestions(questionBank, 10);
    
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    showScreen('quiz');
    displayQuestion();
}

// 真正的随机选择算法（Fisher-Yates洗牌算法）
function selectRandomQuestions(questions, count) {
    const result = [];
    const available = [...questions];
    
    // 如果题库数量不够，全部使用
    if (available.length <= count) {
        return shuffleArray([...available]);
    }
    
    // 随机选择指定数量的题目
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        result.push(available.splice(randomIndex, 1)[0]);
    }
    
    return result;
}

// Fisher-Yates洗牌算法
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 显示当前题目
function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // 更新进度
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
    
    // 更新题目内容
    document.getElementById('quizCategory').textContent = question.category;
    document.getElementById('questionTitle').textContent = question.description; // 直接显示完整问题
    document.getElementById('questionDescription').textContent = ''; // 清空描述区域
    
    // 生成选项
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.setAttribute('data-index', index + 1);
        
        const letter = question.type === '判断题' ? 
            (index === 0 ? '✓' : '✗') : 
            String.fromCharCode(65 + index); // A, B, C...
        
        optionElement.innerHTML = `
            <div class="option-letter">${letter}</div>
            <span>${option}</span>
        `;
        
        optionElement.addEventListener('click', () => selectOption(optionElement, index + 1));
        optionsContainer.appendChild(optionElement);
    });
    
    // 重置下一题按钮
    document.getElementById('nextQuestion').disabled = true;
    document.getElementById('nextQuestion').textContent = 
        currentQuestionIndex === currentQuestions.length - 1 ? '查看结果' : '下一题';
}

// 选择答案
function selectOption(element, answerIndex) {
    // 移除其他选项的选中状态
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    
    // 选中当前选项
    element.classList.add('selected');
    
    // 记录答案
    userAnswers[currentQuestionIndex] = answerIndex;
    
    // 启用下一题按钮
    document.getElementById('nextQuestion').disabled = false;
}

// 下一题
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // 答题结束，显示结果
        calculateResults();
        showScreen('result');
    }
}

// 计算结果
function calculateResults() {
    let correctCount = 0;
    let wrongQuestions = [];
    
    currentQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.correctAnswer;
        
        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            wrongQuestions.push({
                title: question.title,
                description: question.description,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer,
                options: question.options,
                correctAnswerText: question.options[correctAnswer - 1]  // 直接保存正确答案文本
            });
        }
    });
    
    score = Math.round((correctCount / currentQuestions.length) * 100);
    
    // 显示结果
    displayResults(score, wrongQuestions);
    
    // 保存到历史记录
    saveToHistory(score, wrongQuestions);
}

// 显示结果
function displayResults(score, wrongQuestions) {
    // 更新分数圆环
    const scorePercentage = document.getElementById('scorePercentage');
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreDescription = document.getElementById('scoreDescription');
    
    scorePercentage.textContent = `${score}%`;
    
    // 动画显示分数圆环
    const circumference = 314; // 2 * π * 50
    const offset = circumference - (score / 100) * circumference;
    
    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 500);
    
    // 根据分数设置颜色和描述
    if (score >= 90) {
        scoreCircle.style.stroke = '#34C759';
        scorePercentage.style.color = '#34C759';
        scoreDescription.textContent = '优秀！您对CAR-T治疗知识掌握得很好！';
    } else if (score >= 70) {
        scoreCircle.style.stroke = '#FF9500';
        scorePercentage.style.color = '#FF9500';
        scoreDescription.textContent = '良好！继续学习可以取得更好成绩！';
    } else {
        scoreCircle.style.stroke = '#FF3B30';
        scorePercentage.style.color = '#FF3B30';
        scoreDescription.textContent = '需要加强学习，建议复习相关知识点。';
    }
    
    // 显示错题汇总
    const wrongAnswersContainer = document.getElementById('wrongAnswersContainer');
    
    if (wrongQuestions.length === 0) {
        wrongAnswersContainer.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-lg); color: var(--success-color);">
                <h3>🎉 全部答对！</h3>
                <p>恭喜您完美掌握了这些知识点！</p>
            </div>
        `;
    } else {
        wrongAnswersContainer.innerHTML = `
            <h3>错题回顾 (${wrongQuestions.length}题)</h3>
            ${wrongQuestions.map((q, index) => `
                <div class="wrong-answer-item">
                    <div class="wrong-question">${q.description}</div>
                    <div class="correct-answer">
                        正确答案：${q.correctAnswerText || q.options[q.correctAnswer - 1]}
                    </div>
                </div>
            `).join('')}
        `;
    }
}

// 保存到历史记录
function saveToHistory(score, wrongQuestions) {
    const today = new Date().toISOString().split('T')[0];
    
    const historyEntry = {
        date: today,
        score: score,
        wrongQuestions: wrongQuestions.map(q => ({
            description: q.description,
            correctAnswer: q.correctAnswer,
            options: q.options,
            correctAnswerText: q.correctAnswerText  // 保存正确答案文本
        }))
    };
    
    currentUser.history.push(historyEntry);
    
    // 更新localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// 显示消息提示
function showMessage(text, type = 'success') {
    // 移除现有消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 3000);
}

// 工具函数：获取当前日期
function getCurrentDate() {
    const now = new Date();
    return now.toISOString().split('T')[0];
}

// 开发者工具：清除用户数据（在浏览器控制台中使用）
function clearUserData() {
    localStorage.removeItem('users');
    console.log('✅ 用户数据已清除，页面将重新加载');
    location.reload();
}

// 开发者工具：查看当前用户数据
function viewUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('当前用户数据：', users);
    return users;
}

// 切换错题答案显示
function toggleErrorAnswer(toggleElement) {
    const errorItem = toggleElement.closest('.history-error-item');
    const errorAnswer = errorItem.querySelector('.error-answer');
    const arrow = toggleElement.querySelector('.toggle-arrow');
    
    if (errorAnswer.style.display === 'none' || errorAnswer.style.display === '') {
        errorAnswer.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';  // 展开时箭头向下
        toggleElement.classList.add('expanded');
        
        // 添加展开动画
        errorAnswer.style.animation = 'slideDown 0.3s ease-out';
    } else {
        errorAnswer.style.display = 'none';
        arrow.style.transform = 'rotate(180deg)';  // 收起时箭头向左
        toggleElement.classList.remove('expanded');
    }
} 