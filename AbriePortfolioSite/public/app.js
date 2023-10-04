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
