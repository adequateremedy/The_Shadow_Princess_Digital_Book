/*
=========================================
 The Shadow Princess
 ENGINE CORE
-----------------------------------------

 This is the central coordinator.

 It connects:
 - loader.js
 - paginator.js
 - renderer.js
 - animations.js

 Nothing in this file draws UI directly.
 It only decides WHAT happens and WHEN.

 =========================================
*/

let currentChapterIndex = 0;
let currentPageIndex = 0;

let chapters = [];

/**
 * INIT
 * Called when book system starts
 */
async function initBookEngine() {
    console.log("Initializing Book Engine...");

    chapters = await loadChapters();

    console.log("Chapters loaded:", chapters.length);

    const firstChapter = chapters[0];

    const paginated = paginateChapter(firstChapter);

    renderPage(
        paginated[0], // left page
        paginated[1]  // right page
    );
}

/**
 * GO TO NEXT PAGE
 */
function nextPage() {
    currentPageIndex++;

    console.log("Next page:", currentPageIndex);

    // Placeholder until paginator is fully wired
}

/**
 * GO TO PREVIOUS PAGE
 */
function prevPage() {
    currentPageIndex--;

    console.log("Previous page:", currentPageIndex);
}

/**
 * CONNECTED PLACEHOLDERS
 * These will later bind to real modules
 */

// from loader.js
async function loadChapters() {
    console.log("Loading chapters...");
    return [];
}

// from paginator.js
function paginateChapter(chapter) {
    console.log("Paginating chapter...");
    return [
        { chapterStart: true, chapterNumber: "Chapter 1", chapterTitle: "The Shadows", text: "..." },
        { chapterStart: false, text: "..." }
    ];
}
