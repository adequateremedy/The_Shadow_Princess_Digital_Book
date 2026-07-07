document.addEventListener('DOMContentLoaded', function() {
    const flipbookContainer = document.getElementById('flipbook');

    function createPage(imagePath, isHard = false) {
        const page = document.createElement('div');
        page.className = 'page';
        if (isHard) page.dataset.density = 'hard';
        const img = document.createElement('img');
        img.src = imagePath;
        page.appendChild(img);
        flipbookContainer.appendChild(page);
    }

    // 1. Front Cover (Hard)
    createPage('assets/front-cover.png', true);
    
    // 2. Backside of Front Cover (Hard - Hinged to spine)
    createPage('assets/Backside-of-front-cover.png', true);
    
    // 3. TOC Page
    createPage('assets/Table-of-Contents.png');
    
    // 4. Backside of Back Cover (Hard - To close the loop)
    createPage('assets/Backside-of-back-cover.png', true);

    const pageFlip = new St.PageFlip(flipbookContainer, {
        width: 500, 
        height: 750, 
        size: "stretch", 
        showCover: true,
        autoSize: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});
