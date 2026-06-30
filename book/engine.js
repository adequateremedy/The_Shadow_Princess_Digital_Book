console.log("ENGINE LOADED");

let currentPages = [];
let currentIndex = 0;
let currentChapter = 1;

window.addEventListener("load", () => {

    console.log("ENGINE STARTED");

    document.getElementById("btnNext")?.addEventListener("click", nextPage);
    document.getElementById("btnPrev")?.addEventListener("click", prevPage);

    loadChapter(currentChapter);

});

/**
 * LOAD CHAPTER TEXT FILE
 */
async function loadChapter(chapterNumber) {

    currentChapter = chapterNumber;

    try {

        const res = await fetch(`chapters/chapter-${chapterNumber}.txt`);

        if (!res.ok) {
            throw new Error("Chapter not found");
        }

        const text = await res.text();

        const chapter = {
            chapterNumber: chapterNumber,
            chapterTitle: getChapterTitle(chapterNumber),
            text: text
        };

        currentPages = paginateChapter(chapter);

        currentIndex = 0;

        renderCurrentPage();

    } catch (err) {
        console.error(err);
    }

}

/**
 * RENDER CURRENT SPREAD
 */
function renderCurrentPage() {

    if (!currentPages.length) return;

    renderPage(currentPages[currentIndex]);

}

/**
 * NEXT PAGE
 */
function nextPage() {

    if (currentIndex < currentPages.length - 1) {

        currentIndex++;

        renderCurrentPage();

    }

}

/**
 * PREVIOUS PAGE
 */
function prevPage() {

    if (currentIndex > 0) {

        currentIndex--;

        renderCurrentPage();

    }

}

/**
 * CHAPTER TITLES
 */
function getChapterTitle(num) {

    const titles = {
        1: "The Shadows",
        2: "Chapter Two",
        3: "Chapter Three",
        4: "Chapter Four",
        5: "Chapter Five",
        6: "Chapter Six",
        7: "Chapter Seven",
        8: "Chapter Eight",
        9: "Chapter Nine",
        10: "Chapter Ten",
        11: "Chapter Eleven",
        12: "Chapter Twelve",
        13: "The Bridge"
    };

    return titles[num] || `Chapter ${num}`;
}
