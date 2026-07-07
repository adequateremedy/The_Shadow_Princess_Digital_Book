document.addEventListener('DOMContentLoaded', function() {
    const flipbookContainer = document.getElementById('flipbook');

    const chapterWords = [
        "One", "Two", "Three", "Four", "Five", "Six", "Seven", 
        "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen"
    ];

    // Helper function to build actual <img> tags for the pages
    function createPage(imagePath) {
        const page = document.createElement('div');
        page.className = 'page';
        const img = document.createElement('img');
        img.src = imagePath;
        page.appendChild(img);
        flipbookContainer.appendChild(page);
    }

    // 1. Page 0 (Right): Front Cover
    createPage('assets/front-cover.png');
    
    // 2. Page 1 (Left): Backside of Front Cover
    createPage('assets/Backside-of-front-cover.png');
    
    // 3. Page 2 (Right): Table of Contents
    createPage('assets/Table-of-Contents.png');
    
    // 4. Page 3 (Left): Blank Left Side (Back of TOC)
    createPage('assets/Blank-Left-Side.png');

    // Pages 4 through 263: Chapter Pages
    chapterWords.forEach(word => {
        const folderName = `Chapter_${word}`;
        for (let i = 1; i <= 20; i++) {
            createPage(`chapters/${folderName}/Chapter-${word}-Page-${i}.png`);
        }
    });

    // Page 264 (Right): Blank Right Side (Opposite Ch 13, Pg 20)
    createPage('assets/Blank-Right-Side.png');
    
    // Page 265 (Left): Backside of Back Cover
    createPage('assets/Backside-of-back-cover.png');
    
    // Page 266 (Right): Blank Right Side (Closes the book)
    createPage('assets/Blank-Right-Side.png');

    // Initialize PageFlip
    const pageFlip = new St.PageFlip(flipbookContainer, {
        width: 500, 
        height: 750, 
        size: "stretch", 
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 400,
        maxHeight: 1500,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false
    });

    // Load all generated pages into the flipbook
    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // Toggle the stationary leather background based on whether the book is open or closed
    const leatherBg = document.getElementById('leather-background');
    pageFlip.on('flip', (e) => {
        // e.data is the page index. 0 is the front cover, 266 is the back cover.
        if (e.data === 0 || e.data === 266) {
            leatherBg.style.opacity = '0'; // Hide the inside covers when the book is completely closed
        } else {
            leatherBg.style.opacity = '1'; // Show the inside covers when the book is open
        }
    });
});
