// Handles new game button expand for level selection on play page

document.addEventListener('DOMContentLoaded', function() {
    const newGameBtn = document.getElementById('new-game');
    if (!newGameBtn) return;
    // Create level menu
    const menu = document.createElement('div');
    menu.className = 'newgame-level-menu';
    menu.innerHTML = `
        <button class="level-btn" data-level="easy">Easy</button>
        <button class="level-btn" data-level="medium">Medium</button>
        <button class="level-btn" data-level="hard">Hard</button>
    `;
    menu.style.display = 'none';
    // Place menu just right to the button
    menu.style.position = 'absolute';
    menu.style.left = 'calc(100% + 12px)';
    menu.style.top = '0';
    newGameBtn.parentNode.style.position = 'relative';
    newGameBtn.parentNode.appendChild(menu);

    let menuOpen = false;
    newGameBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = menuOpen ? 'none' : 'flex';
        menuOpen = !menuOpen;
    });
    document.addEventListener('click', (e) => {
        if (menuOpen && !menu.contains(e.target) && e.target !== newGameBtn) {
            menu.style.display = 'none';
            menuOpen = false;
        }
    });
    menu.querySelectorAll('.level-btn').forEach(btn => {
        btn.onclick = function(e) {
            e.stopPropagation();
            const level = btn.getAttribute('data-level');
            window.location.href = `play.html?level=${level}`;
        };
    });
});
