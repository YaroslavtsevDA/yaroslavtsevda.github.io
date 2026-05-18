document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const devTitle = document.getElementById('dev-title');
    const devDescription = document.getElementById('dev-description');


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
        
            languageButtons.forEach(btn => btn.classList.remove('active'));
      
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

});
