console.log("ENGINE FILE LOADED");

const chapters = {
    1: {
        number: "Chapter 1",
        title: "The Shadows",
        text: ""
    }
};

window.addEventListener("load", () => {
    console.log("ENGINE START TRIGGERED");

    const pageA = document.getElementById("pageA");
    const pageB = document.getElementById("pageB");

    const chapter = chapters[1];

    pageA.innerHTML = `
        <div class="chapter-number">${chapter.number}</div>
        <div class="chapter-title">${chapter.title}</div>
        <div class="chapter-text" id="chapterTextA"></div>
    `;

    pageB.innerHTML = `
        <div class="chapter-text" id="chapterTextB">
            Waiting for real chapter loader connection...
        </div>
    `;
});
