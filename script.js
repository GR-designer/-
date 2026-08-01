document.addEventListener('DOMContentLoaded', function() {

    // ---- 滚动触发动画 ----
    const animatedElements = document.querySelectorAll('.scroll-animate');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });
    animatedElements.forEach(el => observer.observe(el));

    // ---- 导航滚动效果 ----
    const navCenter = document.getElementById('navCenter');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY > 30) {
            navCenter.classList.add('scrolled');
        } else {
            navCenter.classList.remove('scrolled');
        }
    });

    // ---- 联系方式下拉切换 ----
    const contactToggle = document.getElementById('contactToggle');
    const contactDropdown = document.getElementById('contactDropdown');

    contactToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        contactDropdown.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!contactToggle.contains(e.target)) {
            contactDropdown.classList.remove('open');
        }
    });

    // ---- 复制功能 ----
    const toast = document.getElementById('toastCopy');
    let toastTimer = null;

    function showToast() {
        if (toastTimer) {
            clearTimeout(toastTimer);
            toastTimer = null;
        }
        toast.classList.add('show');
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            toastTimer = null;
        }, 2000);
    }

    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const textToCopy = this.getAttribute('data-copy');
            if (!textToCopy) return;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast();
                }).catch(() => {
                    fallbackCopy(textToCopy);
                });
            } else {
                fallbackCopy(textToCopy);
            }
        });
    });

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const success = document.execCommand('copy');
            if (success) {
                showToast();
            }
        } catch (e) {}
        document.body.removeChild(textarea);
    }

    // ---- 移动端汉堡菜单 ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    document.addEventListener('click', function(e) {
        const navCenterEl = document.getElementById('navCenter');
        if (!navCenterEl.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });

    // ---- 平滑锚点跳转 + 高亮 ----
    const sections = document.querySelectorAll('.page');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('href') === '#' + current) {
                anchor.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const topBar = document.getElementById('topBar');
                const navHeight = topBar.offsetHeight + 16;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- 背景图片 ----
    const bgUrl = 'https://p26-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/54f2677299e9415594cb0f45a87f3176~tplv-tb4s082cfz-aigc_resize:1080:1080.webp?lk3s=7c3bb0db&x-expires=1787184000&x-signature=mqW%2FeW5p9n1Yd2A2tRIfUGu%2F4XI%3D&format=.webp';
    if (bgUrl) {
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        document.body.classList.add('has-bg');
    }

});