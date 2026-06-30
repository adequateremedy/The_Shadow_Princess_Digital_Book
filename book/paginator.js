console.log("PAGINATOR LOADED");

function paginateChapter(chapter) {

    const pageA = document.getElementById("pageA");
    const pageB = document.getElementById("pageB");

    const styles = window.getComputedStyle(pageA);

    const measure = document.createElement("div");

    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.style.pointerEvents = "none";
    measure.style.left = "-99999px";

    measure.style.fontFamily = styles.fontFamily;
    measure.style.fontSize = styles.fontSize;
    measure.style.fontWeight = styles.fontWeight;
    measure.style.lineHeight = styles.lineHeight;
    measure.style.whiteSpace = "pre-wrap";
    measure.style.wordWrap = "break-word";
    measure.style.boxSizing = "border-box";
    measure.style.padding = styles.padding;

    document.body.appendChild(measure);

    const words = chapter.text.split(/\s+/);

    let wordIndex = 0;

    const spreads = [];

    function fillContainer(container) {

        measure.style.width = container.clientWidth + "px";

        const maxHeight = container.clientHeight;

        let text = "";

        while (wordIndex < words.length) {

            const candidate = text.length === 0
                ? words[wordIndex]
                : text + " " + words[wordIndex];

            measure.innerText = candidate;

            if (measure.scrollHeight > maxHeight) {

                break;

            }

            text = candidate;

            wordIndex++;

        }

        return text.trim();

    }

    while (wordIndex < words.length) {

        const leftText = fillContainer(pageA);

        const rightText = fillContainer(pageB);

        spreads.push({

            chapterNumber: chapter.chapterNumber,

            chapterTitle: chapter.chapterTitle,

            chapterStart: spreads.length === 0,

            left: leftText,

            right: rightText

        });

    }

    document.body.removeChild(measure);

    return spreads;

}
