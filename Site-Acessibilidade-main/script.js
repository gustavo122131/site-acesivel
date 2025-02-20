function toggleLanguage() {
    const contentElements = document.querySelectorAll('[data-lang-pt], [data-lang-en]');
    const textareas = document.querySelectorAll('textarea');
    const currentLang = document.documentElement.lang;

    if (currentLang === 'pt') {
        document.documentElement.lang = 'en';
        localStorage.setItem('language', 'en');

        contentElements.forEach((element) => {
            const englishText = element.getAttribute('data-lang-en');
            if (englishText) {
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = englishText;
                } else {
                    element.textContent = englishText;
                }
            }
        });

        textareas.forEach((textarea) => {
            textarea.placeholder = "Write here";
        });
    } else {
        document.documentElement.lang = 'pt';
        localStorage.setItem('language', 'pt');

        contentElements.forEach((element) => {
            const portugueseText = element.getAttribute('data-lang-pt');
            if (portugueseText) {
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = portugueseText;
                } else {
                    element.textContent = portugueseText;
                }
            }
        });

        textareas.forEach((textarea) => {
            textarea.placeholder = "Escreva aqui";
        });
    }
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');

    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('high-contrast', isHighContrast ? 'true' : 'false');

    const sections = ['.introducao', '.depoimentos', '.info', '.container', '.box', '.inputBox', '.textBox'];

    sections.forEach(selector => {
        const section = document.querySelector(selector);
        const texts = section.querySelectorAll('p, h1, h2, h3, h4, a, ul, label');
        const inputs = section.querySelectorAll('.inputUser, textarea, input[type="date"]');

        if (document.body.classList.contains('high-contrast')) {
            texts.forEach(text => {
                text.style.color = 'white';
            });
            inputs.forEach(input => {
                input.style.color = 'white';
                input.style.borderBottomColor = 'white';
                input.style.backgroundColor = 'rgb(59, 59, 59)';
            });
        } else {
            texts.forEach(text => {
                text.style.color = '';
            });
            inputs.forEach(input => {
                input.style.color = '';
                input.style.borderBottomColor = '';
                input.style.backgroundColor = '';
            });
        }
    });
}

function changeFontSize(action) {
    const body = document.body;
    const currentSize = window.getComputedStyle(body).fontSize;

    let newSize;
    if (action === 'increase') {
        newSize = parseFloat(currentSize) * 1.2;
    } else if (action === 'decrease') {
        newSize = parseFloat(currentSize) * 0.8;
    }

    body.style.fontSize = `${newSize}px`;

    localStorage.setItem('font-size', newSize);
}

window.onload = function() {
    let storedLanguage = localStorage.getItem('language');
    if (!storedLanguage) {
        storedLanguage = 'pt';
        localStorage.setItem('language', 'pt');
    }

    document.documentElement.lang = storedLanguage;

    const contentElements = document.querySelectorAll('[data-lang-pt], [data-lang-en]');
    contentElements.forEach((element) => {
        if (storedLanguage === 'en') {
            const englishText = element.getAttribute('data-lang-en');
            if (englishText) {
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = englishText;
                } else {
                    element.textContent = englishText;
                }
            }
        } else {
            const portugueseText = element.getAttribute('data-lang-pt');
            if (portugueseText) {
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = portugueseText;
                } else {
                    element.textContent = portugueseText;
                }
            }
        }
    });

    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
        document.body.style.fontSize = savedFontSize + 'px';
    } else {
        document.body.style.fontSize = '18px';
    }

    const isHighContrast = localStorage.getItem('high-contrast') === 'true';
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
        const sections = ['.introducao', '.depoimentos', '.info', '.container', '.box', '.inputBox', '.textBox'];

        sections.forEach(selector => {
            const section = document.querySelector(selector);
            const texts = section.querySelectorAll('p, h1, h2, h3, h4, a, ul, label');
            const inputs = section.querySelectorAll('.inputUser, textarea, input[type="date"]');

            texts.forEach(text => {
                text.style.color = 'white';
            });
            inputs.forEach(input => {
                input.style.color = 'white';
                input.style.borderBottomColor = 'white';
                input.style.backgroundColor = 'rgb(59, 59, 59)';
            });
        });
    }
};