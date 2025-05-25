document.addEventListener('DOMContentLoaded', () => {
    // Функция для переключения видимости списка источников и вращения иконки
    function toggleReferences() {
        const referencesList = document.getElementById('referencesList');
        const referencesButton = document.querySelector('.references-button');

        if (referencesList) {
            referencesList.classList.toggle('visible'); // Показать/скрыть список
            referencesButton.classList.toggle('active'); // Добавить/удалить класс active для кнопки
        }
    }
    

    // Видео
    const video = document.getElementById('myVideo');
    if (video) {
        video.play().catch(error => {
            console.log('Автопроигрывание заблокировано:', error);
        });

        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    }

    // Обработчик события клика для кнопки "Источники"
    const referencesButton = document.querySelector('.references-button');
    if (referencesButton) {
        referencesButton.addEventListener('click', toggleReferences);
    }

    // Функция для проверки видимости элемента
    function isScrolledIntoView(el, percentVisible = 0) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const totalHeight = rect.height;
        return (visibleHeight / totalHeight) * 100 >= percentVisible;
    }

    // Функция для анимации баров
    function animateBars(section, barClass, valueClass) {
        const bars = section.querySelectorAll(barClass);
        bars.forEach((bar) => {
          const valueElement = bar.querySelector(valueClass);
          // 1) Считаем из data-height
          let targetHeight = parseInt(bar.getAttribute('data-height'), 10);
      
          // 2) Если экран уже узкий, уменьшаем высоту на 30%
          if (window.innerWidth < 650) {
            targetHeight = Math.round(targetHeight * 0.7);
          }
      
          // 3) Дальше всё по-старому
          let targetValue = parseFloat(valueElement.textContent.replace(',', '.'));
          let currentHeight = 0;
          let currentValue = 0;
      
          const duration = 2000;
          const stepHeight = targetHeight / (duration / 16);
          const stepValue = targetValue / (duration / 16);
      
          // ... остальной код без изменений ...
      

            if (parseFloat(valueElement.id) < 0) {
                targetValue = parseFloat(valueElement.id);
                currentValue = 0;
            }

            if (isNaN(targetValue)) {
                console.error('Invalid target value:', valueElement.textContent);
                targetValue = 0;
            }

            function formatNumber(value) {
                let formatted = value.toFixed(2).replace('.', ',');
                if (formatted.endsWith(',00')) {
                    formatted = formatted.slice(0, -3);
                } else if (formatted.endsWith('0')) {
                    formatted = formatted.slice(0, -1);
                }
                return formatted;
            }

            function updateBarHeight() {
                if (currentHeight < targetHeight) {
                    currentHeight = Math.min(currentHeight + stepHeight, targetHeight);
                    bar.style.height = `${currentHeight}px`;
                    requestAnimationFrame(updateBarHeight);
                } else {
                    bar.style.height = `${targetHeight}px`;
                }
            }

            function updateValue() {
                if (currentValue < targetValue) {
                    currentValue = Math.min(currentValue + stepValue, targetValue);
                    valueElement.textContent = formatNumber(currentValue);
                    valueElement.classList.add('visible');
                    requestAnimationFrame(updateValue);
                } else {
                    valueElement.textContent = formatNumber(targetValue);
                    valueElement.classList.add('visible');
                }
            }

            updateBarHeight();
            updateValue();
        });

        setTimeout(() => {
            section.querySelectorAll('.p-value-container, .to, .legend3, .legend, .arrow-container, .arrow-container1, .table-button, .table-button1, .p-value1-container1, .p-value4-container1')
                .forEach(el => el.classList.add('visible'));
        }, 100);
    }

    function handleScrollCharts() {
        const sections = document.querySelectorAll('.chart-section, .chart-section1, .chart-section3, .chart-section4, .chart-section5');
        sections.forEach((section) => {
            const chartContainer = section.querySelector('.chart-container, .chart-container1, .chart-container3, .chart-container4');
            if (chartContainer && isScrolledIntoView(chartContainer, 50) && !section.classList.contains('visible')) {
                section.classList.add('visible');
    
                let barClasses, valueClasses;
                if (section.classList.contains('chart-section5')) {
                    // Устанавливаем bar5 для секции 5
                    barClasses = ['.bar5'];
                    valueClasses = ['.bar-value5'];
                } else if (section.classList.contains('chart-section4')) {
                    // Устанавливаем bar1 и bar3 для секции 4
                    barClasses = ['.bar1', '.bar3'];
                    valueClasses = ['.bar-value1', '.bar-value3'];
                } else if (section.classList.contains('chart-section1') || section.classList.contains('chart-section3')) {
                    barClasses = ['.bar1'];
                    valueClasses = ['.bar-value1'];
                } else {
                    barClasses = ['.bar'];
                    valueClasses = ['.bar-value'];
                }
                
    
                // Запускаем анимацию для каждого бара в секции
                barClasses.forEach((barClass, index) => {
                    const valueClass = valueClasses[index];
                    animateBars(section, barClass, valueClass);
                });
            }
        });
    }
    

    function handleScrollMechanisms() {
        const sections = document.querySelectorAll('.mechanisms-section, .mechanisms-section1');
        sections.forEach((section) => {
            if (isScrolledIntoView(section)) {
                section.classList.add('visible');
            }
        });
    }

    function handleScrollTreatmentScheme() {
        const sections = document.querySelectorAll('.treatment-scheme');
        sections.forEach((section) => {
            if (isScrolledIntoView(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }

    function handleScrollAnniversarySection() {
        const section = document.querySelector('.anniversary-section');
        if (section && isScrolledIntoView(section) && !section.classList.contains('visible')) {
            section.classList.add('visible');
        }
    }

    function handleScrollAnimations() {
        const sections = [
            '.intro',
            '.section-with-media',
            '.consequences',
            '.centered-section',
            '.image-text-section',
            '.influence-section',
            '.improvement',
            '.anniversary-section',
            '.frame',
            '.frame3',
            '.improvement3',
            '.consequences',
            '.image_container'
        ];

        const observerOptions = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    if (entry.target.classList.contains('anniversary-section')) {
                        const referencesButton = document.querySelector('.references-button');
                        if (referencesButton) {
                            referencesButton.classList.add('animate');
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) observer.observe(section);
        });
    }

    function handleScrollImprovementSections() {
        const sections2 = document.querySelectorAll('.improvement2');
        const sections3 = document.querySelectorAll('.improvement3');
        const images = document.querySelectorAll('.table_page2');
    
        // Обработать секции improvement2
        sections2.forEach((section) => {
            if (isScrolledIntoView(section, 20) && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });
    
        // Обработать секции improvement3
        sections3.forEach((section) => {
            if (isScrolledIntoView(section, 20) && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });
    
        // Обработать изображения
        images.forEach((image) => {
            if (isScrolledIntoView(image, 20) && !image.classList.contains('animate')) {
                image.classList.add('animate');
            }
        });
    }
    
    document.body.style.overflowY = 'hidden'; 
    

    function init() {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
        handleScrollAnimations();
        handleScrollImprovementSections();
    }

    window.addEventListener('scroll', () => {
        handleScrollCharts();
        handleScrollMechanisms();
        handleScrollTreatmentScheme();
        handleScrollAnniversarySection();
        handleScrollImprovementSections();
    });

    init();
});

const navigateButton = document.getElementById('navigateButton');
if (navigateButton) {
    navigateButton.addEventListener('click', function() {
        window.location.href = 'index2.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer');

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.2 
    });

    if (footer) {
        observer.observe(footer);
    }
});



document.querySelectorAll('.js-ga4-link').forEach(function(element) {
    element.addEventListener('click', function() {
        var eventText = element.getAttribute('data-gatitle');
        document.body.dispatchEvent(new CustomEvent('interactive-event', { detail: eventText }));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
});
