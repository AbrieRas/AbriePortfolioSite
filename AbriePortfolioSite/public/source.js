// Helper functions
const hrefTo = (src) => {
    const targetSection = document.getElementById(src);

    // Scroll to the target section
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
};

const switchDisplay = () => {
    const emailForm = document.getElementById('email-form');
  
    if (emailForm.style.display === 'none') {
        emailForm.style.display = 'block';
    } else {
        emailForm.style.display = 'none';
    }
};

const appendImageToGetInTouch = (message) => {
    const getInTouchElement = document.getElementById('get-in-touch-body');

    // Div element with the class 'column-right'
    const tempDiv = document.createElement('div');
    tempDiv.className = 'column-right';

    // Thanks text
    const thanksText = document.createElement('h2');
    thanksText.textContent = message;

    // Thanks image
    const thanksImage = document.createElement('img');
    thanksImage.src = 'https://cdn.glitch.global/499fb8d5-afc7-4414-a2d2-c90b9cb101fe/Self-Thanking.png?v=1697039376324'; // Set the path to your image
    thanksImage.alt = 'Thank you image';

    // Append the thanks text and image elements to the tempDiv
    tempDiv.appendChild(thanksText);
    tempDiv.appendChild(thanksImage);

    // Append the tempDiv element to the getInTouchElement
    getInTouchElement.appendChild(tempDiv);
  
    // Remove new elements and switch form display setting
    setTimeout(() => {
        getInTouchElement.removeChild(tempDiv);
        switchDisplay();
    }, 10000);
};

const handleSubmitSuccess = (message) => {
    // Hide form content
    switchDisplay();

    // Display thanks content
    appendImageToGetInTouch(message);
};

const formIsValid = () => {
    const submitButton = document.getElementById('submit');

    if (submitButton.hasAttribute('disabled')) {
        return false;
    } else {
        return true;
    }
};

const addSubmitButtonFunctionality = () => {
    document.getElementById('submit').addEventListener('click', () => {
        if (formIsValid()) {
            const mailData = {
                fullName: `${document.getElementById('name').value} ${document.getElementById('surname').value}`,
                from: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            fetch('/email-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Request-Origin-Header': 'Same-Origin',
                },
                body: JSON.stringify(mailData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Bad request.`);
                }
                return response.text();
            })
            .then(data => {
                handleSubmitSuccess(data);
            })
            .catch(error => {
                console.log('An error occurred:', error);
            });
        } else {
           console.log('Form is not valid. Submission aborted. Please fill in Name, Surname and Email.');
        }
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
