document.addEventListener('DOMContentLoaded', function() {
    const flipbookContainer = document.getElementById('flipbook');
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

    // --- SPINE-HINGED SEQUENCE ---
    createPage('assets/front-cover.png', true); // Front Cover
    createPage('assets/Backside-of-front-cover.png', true); // Base Layer Left
    createPage('assets/Table-of-Contents.png', false); // TOC (Smaller Parchment)
    createPage('assets/Blank-Left-Side.png', false); // Blank Back of TOC

    // Chapter pages
    chapterWords.forEach((word) => {
        for (let i = 1; i <= 20; i++) {
            createPage(`chapters/Chapter_${word}/Chapter-${word}-Page-${i}.png`, false);
        }
    });

    createPage('assets/Backside-of-back-cover.png', true); // Base Layer Right

    const pageFlip = new St.PageFlip(flipbookContainer, {
        width: 450, height: 675, size: "fixed", showCover: true, autoSize: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});
