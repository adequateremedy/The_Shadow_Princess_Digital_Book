console.log("PAGINATOR LOADED");

function paginateChapter(chapter) {

    const pageA = document.getElementById("pageA");
    const pageB = document.getElementById("pageB");

    const styles = window.getComputedStyle(pageA);

    const measureBox = document.createElement("div");

    measureBox.style.position = "absolute";
    measureBox.style.visibility = "hidden";
    measureBox.style.left = "-99999px";
    measureBox.style.top = "0";

    measureBox.style.width = pageA.clientWidth + "px";

    measureBox.style.fontFamily = styles.fontFamily;
    measureBox.style.fontSize = styles.fontSize;
    measureBox.style.fontWeight = styles.fontWeight;
    measureBox.style.lineHeight = styles.lineHeight;

    measureBox.style.whiteSpace = "pre-wrap";
    measureBox.style.wordBreak = "break-word";
    measureBox.style.boxSizing = "border-box";

    document.body.appendChild(measureBox);

    const words = chapter.text.split(/\s+/);

    let index = 0;
    const spreads = [];

    /**
     * Fill a page until it overflows
     */
    function fillPage(container) {

        const maxHeight = container.clientHeight;

        let text = "";

        while (index < words.length) {

            const next = text ? text + " " + words[index] : words[index];

            measureBox.textContent = next;

            if (measureBox.scrollHeight > maxHeight) {
                break;
            }

            text = next;
            index++;
        }

        return text.trim();
    }

    /**
     * BUILD SPREADS (LEFT + RIGHT)
     */
    while (index < words.length) {

        const leftText = fillPage(pageA);
        const rightText = fillPage(pageB);

        spreads.push({
            chapterNumber: chapter.chapterNumber,
            chapterTitle: chapter.chapterTitle,

            chapterStart: spreads.length === 0,

            left: leftText,
            right: rightText
        });

    }

    document.body.removeChild(measureBox);

    return spreads;
}
