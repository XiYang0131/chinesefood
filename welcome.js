document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是首次访问
    if (!localStorage.getItem('hasVisited')) {
        // 首次访问，显示欢迎页面
        localStorage.setItem('hasVisited', 'true');
    } else {
        // 非首次访问，可以选择直接跳转到主页
        // 取消下面的注释可启用自动跳转
        // window.location.href = 'index.html';
    }
    
    // 为语言选择添加事件
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            const lang = this.getAttribute('href').split('=')[1];
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // 为主按钮添加点击动画
    const enterButton = document.querySelector('.enter-button');
    enterButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 添加点击动画
        this.classList.add('clicked');
        
        // 页面淡出效果
        document.body.classList.add('fade-out');
        
        // 延迟后跳转
        setTimeout(() => {
            window.location.href = this.getAttribute('href');
        }, 800);
    });
    
    // 添加背景元素动画
    animateBackgroundElements();
});

function animateBackgroundElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        // 随机初始位置偏移
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomRotate = (Math.random() - 0.5) * 10;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });
} 