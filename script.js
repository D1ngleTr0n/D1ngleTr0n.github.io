window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500);
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);
});

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

particlesJS.load('particles-js', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});

const h1 = document.querySelector('header h1');
const h1Text = h1.innerText;
h1.innerText = '';

const textSpan = document.createElement('span');
const cursorSpan = document.createElement('span');
cursorSpan.classList.add('blinking-cursor');
cursorSpan.innerText = '|';
h1.appendChild(textSpan);
h1.appendChild(cursorSpan);

let i = 0;
function typeWriter() {
    if (i < h1Text.length) {
        textSpan.textContent += h1Text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1000);

const skillsSection = document.querySelector('.skills-section');
const progressBars = document.querySelectorAll('.progress');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars[0].style.width = '90%';
            progressBars[1].style.width = '80%';
            progressBars[2].style.width = '70%';
            observer.unobserve(entry.target);
        }
    });
}, options);

if (skillsSection) {
    observer.observe(skillsSection);
}
