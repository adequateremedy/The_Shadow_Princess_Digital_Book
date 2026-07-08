document.addEventListener('DOMContentLoaded', function() {
    const flipbookContainer = document.getElementById('flipbook');
    const leatherBase = document.getElementById('leather-base');
    const chapterWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen"];

    function createPage(imagePath, isHard = false) {
        const page = document.createElement('div');
        page.className = 'page';
        page.dataset.density = isHard ? 'hard' : 'soft';
        const img = document.createElement('img');
        img.src = imagePath;
        page.appendChild(img);
        flipbookContainer.appendChild(page);
    }

    // Only pages that turn go here
    createPage('assets/front-cover.png', true);
    createPage('assets/Table-of-Contents.png', false);
    createPage('assets/Blank-Left-Side.png', false);
    
    chapterWords.forEach(word => {
        for (let i = 1; i <= 20; i++) {
            createPage(`chapters/Chapter_${word}/Chapter-${word}-Page-${i}.png`, false);
        }
    });

    const pageFlip = new St.PageFlip(flipbookContainer, {
        width: 450, height: 675, size: "fixed", showCover: true, autoSize: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    pageFlip.on('flip', (e) => {
        // Toggle leather base visibility
        leatherBase.style.opacity = (e.data === 0) ? '0' : '1';
    });
});
