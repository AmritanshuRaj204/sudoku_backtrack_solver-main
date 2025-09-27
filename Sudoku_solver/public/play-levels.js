// Handles play button hover/expand and level selection before entering play page

document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-btn');
    if (!playBtn) return;
    // Create level menu
    const menu = document.createElement('div');
    menu.className = 'play-level-menu';
    menu.innerHTML = `
        <button class="level-btn" data-level="easy">Easy</button>
        <button class="level-btn" data-level="medium">Medium</button>
        <button class="level-btn" data-level="hard">Hard</button>
    `;
    menu.style.display = 'none';
    playBtn.appendChild(menu);

    playBtn.addEventListener('mouseenter', () => {
        menu.style.display = 'flex';
    });
    playBtn.addEventListener('mouseleave', () => {
        menu.style.display = 'none';
    });

    menu.querySelectorAll('.level-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.stopPropagation();
            const level = btn.getAttribute('data-level');
            window.location.href = `play.html?level=${level}`;
        };
    });
});
