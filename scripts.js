// 图片延迟加载示例
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM加载完成，开始处理延迟加载图片");
    
    const lazyImages = document.querySelectorAll("img.lazy");
    console.log("找到延迟加载图片数量:", lazyImages.length);
    
    if ("IntersectionObserver" in window) {
        console.log("浏览器支持IntersectionObserver");
        
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    console.log("加载图片:", lazyImage.dataset.src);
                    
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        console.log("浏览器不支持IntersectionObserver，使用备用方案");
        
        // 备用方案
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
        });
    }
    
    // 菜系侧边栏导航激活状态
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const cuisineDetails = document.querySelectorAll('.cuisine-detail');
    
    // 检查URL哈希并滚动到相应部分
    function checkHash() {
        const hash = window.location.hash;
        if (hash) {
            // 移除所有active类
            sidebarLinks.forEach(link => link.classList.remove('active'));
            
            // 为当前哈希对应的链接添加active类
            const activeLink = document.querySelector(`.sidebar-nav a[href="${hash}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                
                // 滚动到对应部分
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    // 页面加载时检查哈希
    checkHash();
    
    // 监听哈希变化
    window.addEventListener('hashchange', checkHash);
    
    // 为侧边栏链接添加点击事件
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有active类
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // 为当前点击的链接添加active类
            this.classList.add('active');
        });
    });
    
    // 滚动监听，更新侧边栏激活状态
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        cuisineDetails.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 150 && 
                window.pageYOffset < sectionTop + sectionHeight - 150) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // 移除可能导致导航栏透明度变化的滚动事件监听器
    // 或者修改为您想要的行为
    window.removeEventListener('scroll', anyScrollHandler);
    
    // 如果您想保持导航栏在滚动时的样式变化，可以使用以下代码
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// 菜系卡片轮播
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.cuisine-carousel');
    const cardsContainer = document.querySelector('.cuisine-cards');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevBtn = document.getElementById('prev-cuisine-card');
    const nextBtn = document.getElementById('next-cuisine-card');
    
    let currentIndex = 0;
    const totalGroups = 2; // 两组卡片
    
    // 更新轮播状态
    function updateCarousel() {
        // 滚动到当前组
        cardsContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新指示器
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 上一组
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
        updateCarousel();
    });
    
    // 下一组
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalGroups;
        updateCarousel();
    });
    
    // 点击指示器
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // 初始化
    updateCarousel();
});

// 在translations对象中添加新的菜系描述翻译
const translations = {
    'en': {
        // 现有翻译...
        'sichuan_desc': 'Bold flavors with the famous málà (numbing spiciness)',
        'cantonese_desc': 'Fresh ingredients with delicate cooking techniques',
        'shandong_desc': 'Hearty flavors with emphasis on seafood and stews',
        'jiangsu_desc': 'Refined techniques with emphasis on seasonal ingredients',
        'zhejiang_desc': 'Fresh, tender and soft with mellow fragrance',
        'fujian_desc': 'Light but flavorful, with expertise in soup making',
        'hunan_desc': 'Spicy, aromatic dishes with rich colors',
        'anhui_desc': 'Wild herbs and simple cooking methods preserving original flavors',
    },
    'zh': {
        // 现有翻译...
        'sichuan_desc': '大胆的风味，以著名的麻辣著称',
        'cantonese_desc': '新鲜食材与精致烹饪技巧',
        'shandong_desc': '浓郁的风味，注重海鲜和炖菜',
        'jiangsu_desc': '精细的技巧，注重时令食材',
        'zhejiang_desc': '鲜嫩柔软，带有醇厚的香气',
        'fujian_desc': '清淡而有风味，擅长制作汤品',
        'hunan_desc': '辛辣芳香的菜肴，色彩丰富',
        'anhui_desc': '野生草药和简单的烹饪方法，保留原始风味',
    },
    // 其他语言...
};

// 在initializeI18n函数中添加
function initializeI18n() {
    // 现有代码...
    
    // 为菜系描述添加data-i18n属性
    document.querySelectorAll('.cuisine-card p')[0].setAttribute('data-i18n', 'sichuan_desc');
    document.querySelectorAll('.cuisine-card p')[1].setAttribute('data-i18n', 'cantonese_desc');
    document.querySelectorAll('.cuisine-card p')[2].setAttribute('data-i18n', 'shandong_desc');
    document.querySelectorAll('.cuisine-card p')[3].setAttribute('data-i18n', 'jiangsu_desc');
    document.querySelectorAll('.cuisine-card p')[4].setAttribute('data-i18n', 'zhejiang_desc');
    document.querySelectorAll('.cuisine-card p')[5].setAttribute('data-i18n', 'fujian_desc');
    document.querySelectorAll('.cuisine-card p')[6].setAttribute('data-i18n', 'hunan_desc');
    document.querySelectorAll('.cuisine-card p')[7].setAttribute('data-i18n', 'anhui_desc');
} 