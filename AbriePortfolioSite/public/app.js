// Helper functions
const hrefTo = (src) => {
    const targetSection = document.getElementById(src);

    // Scroll to the target section
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// Add event listeners
(()=>{
    const careerClasses = document.querySelectorAll('.career');
    const repositoriesClasses = document.querySelectorAll('.repositories');
    const getInTouchClasses = document.querySelectorAll('.get-in-touch');
    
    for(let i = 0; i < careerClasses.length; i++) {
        careerClasses[i].addEventListener('click', () => { hrefTo('career'); });
        repositoriesClasses[i].addEventListener('click', () => { hrefTo('repositories'); });
        getInTouchClasses[i].addEventListener('click', () => { hrefTo('get-in-touch'); });
    }
})();
