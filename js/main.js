document.addEventListener('DOMContentLoaded', function() {
    const flipbookContainer = document.getElementById('flipbook');

    function createPage(imagePath) {
        const page = document.createElement('div');
        page.className = 'page';
        const img = document.createElement('img');
        img.src = imagePath;
        page.appendChild(img);
        flipbookContainer.appendChild(page);
    }

    // Page 1 (Right Side Only): Front Cover
    createPage('assets/front-cover.png');
    
    // Page 2 (Left Side): Backside of Front Cover
    createPage('assets/Backside-of-front-cover.png');
    
    // Page 3 (Right Side): Backside of Back Cover
    createPage('assets/Backside-of-back-cover.png'); 
    
    // Page 4 (Left Side): Blank Left Side (Crash prevention)
    createPage('assets/Blank-Left-Side.png');

    const pageFlip = new St.PageFlip(flipbookContainer, {
        width: 500, 
        height: 750, 
        size: "stretch", 
        minWidth: 300,
        maxWidth: 1000,
        minHeight: 400,
        maxHeight: 1500,
        showCover: true,
        mobileScrollSupport: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));
});
