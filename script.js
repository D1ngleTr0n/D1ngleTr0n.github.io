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
            if (progressBars.length > 0) {
                progressBars[0].style.width = '90%';
                progressBars[1].style.width = '80%';
                progressBars[2].style.width = '70%';
                observer.unobserve(entry.target);
            }
        }
    });
}, options);

if (skillsSection) {
    observer.observe(skillsSection);
}

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });

const hackerModeBtn = document.getElementById('hacker-mode-btn');
hackerModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('hacker-mode');
    playBeep();
});

function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 100);
}

const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()*&^%+-/~{[|`]}';
const matrixCharsArr = matrixChars.split('');
const fontSize = 10;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    matrixCtx.fillStyle = '#0f0';
    matrixCtx.font = `${fontSize}px arial`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixCharsArr[Math.floor(Math.random() * matrixCharsArr.length)];
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 33);
});

const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createNoteElement(note);
    });
}

function createNoteElement(note) {
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.innerText = note;
    notesContainer.appendChild(noteEl);
}

addNoteBtn.addEventListener('click', () => {
    const noteText = noteInput.value;
    if (noteText) {
        createNoteElement(noteText);
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
    }
});

loadNotes();

const githubUsername = 'D1ngleTr0n';
const projectsSection = document.querySelector('.projects-section');

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
        projectsSection.innerHTML = '';
        repos.forEach(repo => {
            const projectEl = document.createElement('div');
            projectEl.classList.add('project');
            projectEl.innerHTML = `
                <img src="https://picsum.photos/400/300?random=${repo.id}" alt="${repo.name}">
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            `;
            projectsSection.appendChild(projectEl);
        });
    });
