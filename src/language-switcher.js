document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const devTitle = document.getElementById('dev-title');
    const devDescription = document.getElementById('dev-description');

    // Проверка, найдены ли элементы
    if (!devTitle || !devDescription) {
        console.error("Элементы для перевода не найдены в DOM!");
        return;
    }

    // Тексты для разных языков
    const translations = {
        ru: {
            title: 'Сайт в разработке',
            description: 'Мы работаем над созданием этого сайта.'
        },
        en: {
            title: 'Website under development',
            description: 'We are working on creating this website.'
        }
    };

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            languageButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс к нажатой кнопке
            this.classList.add('active');

            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });

    function switchLanguage(lang) {
        if (translations[lang]) {
            devTitle.textContent = translations[lang].title;
            devDescription.textContent = translations[lang].description;
        }
    }

    console.log("Скрипт смены языка загружен и готов к работе");
});
