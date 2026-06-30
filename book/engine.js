console.log("ENGINE FILE LOADED");

window.addEventListener("load", () => {
    console.log("ENGINE START TRIGGERED");
    loadChapter(1);
});

function loadChapter(chapterNumber) {
    fetch(`chapters/chapter-${chapterNumber}.txt`)
        .then(res => {
            if (!res.ok) throw new Error("Chapter not found");
            return res.text();
        })
        .then(text => {

            const chapter = {
                chapterNumber,
                chapterTitle: "The Shadows",
                text
            };

            const pages = paginateChapter(chapter);

            const left = pages.find(p => p.side === "A");
            const right = pages.find(p => p.side === "B");

            renderPage(left, right);
        })
        .catch(err => console.error(err));
}
