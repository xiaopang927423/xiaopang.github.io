// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为技术项目添加点击效果
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            // 添加点击动画效果
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // 在控制台输出被点击的技术名称
            const techName = this.querySelector('h3').textContent;
            console.log(`您点击了: ${techName}`);
        });
    });
    
    // 添加页面滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
    
    // 添加淡入动画效果
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为技术项目添加动画
    techItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});

// 添加一些额外的样式到CSS中（通过JavaScript）
const style = document.createElement('style');
style.textContent = `
    .tech-item.clicked {
        transform: scale(0.95);
        background-color: #f0f8ff;
    }
    
    .tech-grid {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);