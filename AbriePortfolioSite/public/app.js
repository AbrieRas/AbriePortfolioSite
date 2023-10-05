// Helper functions
const hrefTo = (src) => {
    const targetSection = document.getElementById(src);

    // Scroll to the target section
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const addSubmitButtonFunctionality = () => {
    document.getElementById('submit').addEventListener('click', () => {
        document.getElementById('email-form').submit();
    });
};

const addBackToTopButtonFunctionality = () => {
    var backToTopButton = document.getElementById('back-to-top');
    var triggerPoint = document.getElementById('career'); // Career id

    // Show/hide the floating circle based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY >= triggerPoint.offsetTop) {
            // Make the circle visible and restore its original size
            backToTopButton.style.opacity = '1';
            backToTopButton.style.width = '50px';
            backToTopButton.style.height = '50px';
            backToTopButton.style.fontSize = '30px';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.width = '0px';
            backToTopButton.style.height = '0px';
            backToTopButton.style.fontSize = '0px';
        }
    });

    // Scroll to the top when the floating circle is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Add event listeners
(()=>{
    const careerClasses = document.querySelectorAll('.career');
    const achievementsClasses = document.querySelectorAll('.achievements');
    const repositoriesClasses = document.querySelectorAll('.repositories');
    const getInTouchClasses = document.querySelectorAll('.get-in-touch');
    
    for(let i = 0; i < careerClasses.length; i++) {
        careerClasses[i].addEventListener('click', () => { hrefTo('career'); });
        achievementsClasses[i].addEventListener('click', () => { hrefTo('achievements'); });
        repositoriesClasses[i].addEventListener('click', () => { hrefTo('repositories'); });
        getInTouchClasses[i].addEventListener('click', () => { hrefTo('get-in-touch'); });
    }
    
    addSubmitButtonFunctionality();
    addBackToTopButtonFunctionality();
})();

// Vue
const app = new Vue({
    el: '#app',
    data: {
        careers: [
            {
                dates: 'May 2021 - Current',
                company: 'iVvy',
                role: 'Cloud-based Software Support Consultant',
                description: 'Assisting clients with business’ software via emails, calls, and meetings. This also includes template work (coding), project work, API support, and ADOK tasks.',
            },
        ],
        achievements: [
            {
                date: '12 Sept 2021',
                type: 'Learn Node-SQLite Course - CodeCademy Certificate',
            },
        ],
        repositories: [
            {
                name: `Abrie's Porfolio Site`,
                languages: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
                description: 'Of on affixed civilly moments promise explain fertile in. Assurance advantage belonging happiness departure so of. Now improving and one sincerity intention allowance commanded not. Oh an am frankness be necessary earnestly advantage estimable extensive. Five he wife gone ye. Mrs suffering sportsmen earnestly any. In am do giving to afford parish settle easily garret.',
            },
        ],
    },
});
