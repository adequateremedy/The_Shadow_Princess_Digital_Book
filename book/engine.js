console.log("ENGINE FILE LOADED");

window.addEventListener("load", () => {
    console.log("ENGINE START TRIGGERED");

    const pageA = document.getElementById("pageA");
    const pageB = document.getElementById("pageB");

    if (!pageA || !pageB) {
        console.log("PAGE ELEMENTS NOT FOUND");
        return;
    }

    // =========================
    // BOOK RENDER STRUCTURE
    // =========================

    pageA.innerHTML = `
        <div class="chapter-number">Chapter 1</div>
        <div class="chapter-title">The Shadows</div>
        <div class="chapter-text" id="chapterTextA">
            Chapter content will begin here on the left page.
        </div>
    `;

    pageB.innerHTML = `
        <div class="chapter-text" id="chapterTextB">
            Continuation text will flow onto the right page.
        </div>
    `;
});
