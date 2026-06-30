console.log("ENGINE FILE LOADED");

window.addEventListener("load", () => {
    console.log("ENGINE START TRIGGERED");
    loadChapter(1);
});

function loadChapter(chapterNumber) {
    const path = `chapters/chapter-${chapterNumber}.txt`;

    fetch(path)
        .then(res => {
            if (!res.ok) throw new Error("Chapter not found");
            return res.text();
        })
        .then(text => {
            renderChapter(chapterNumber, text);
        })
        .catch(err => {
            console.error(err);
        });
}

function renderChapter(chapterNumber, text) {
    const pageA = document.getElementById("pageA");
    const pageB = document.getElementById("pageB");

    pageA.innerHTML = `
        <div class="chapter-number">Chapter ${chapterNumber}</div>
        <div class="chapter-title">The Shadows</div>
        <div id="pageAtext" class="chapter-text"></div>
    `;

    pageB.innerHTML = `
        <div id="pageBtext" class="chapter-text"></div>
    `;

    paginateAndRender(text);
}

function paginateAndRender(text) {
    const maxChars = 900;

    const first = text.slice(0, maxChars);
    const second = text.slice(maxChars);

    document.getElementById("pageAtext").innerText = first;
    document.getElementById("pageBtext").innerText = second;
}
