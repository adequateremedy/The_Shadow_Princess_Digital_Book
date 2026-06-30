/*
=========================================
 The Shadow Princess
 Animation Controller
-----------------------------------------

 PURPOSE:
 This module controls ALL MP4-based
 transitions in the book system.

 It does NOT render text.
 It does NOT load chapters.
 It does NOT paginate content.

 It ONLY handles visual state transitions.

 ----------------------------------------
 REQUIRED ANIMATION FILES:

 • Spine to Cover.mp4
 • Open Book.mp4
 • First Page.mp4
 • Page Forwards.mp4
 • Page Backwards.mp4

 ----------------------------------------
 STATE FLOW LOGIC:

 1. Spine (idle state)
    → click spine
    → play Spine to Cover.mp4
    → end on cover static frame

 2. Cover state
    → forward click
    → play Open Book.mp4
    → end on TOC static frame

 3. TOC state
    → forward click
    → play First Page.mp4
    → enter Chapter 1

 4. Chapter navigation
    → forward = Page Forwards.mp4
    → backward = Page Backwards.mp4

 5. Special rule:
    → TOC backward click
      = return to spine reset state

 ----------------------------------------
 NOTE:
 This file will later connect to:
 - renderer.js
 - paginator.js
 - engine.js
=========================================
*/

// Placeholder DOM references (hooked later)
const spineVideo = null;
const pageForwardVideo = null;
const pageBackwardVideo = null;

/**
 * Future controller state machine
 */
let bookState = "spine";

/**
 * Transition handler placeholder
 */
function playAnimation(name) {
    console.log("Playing animation:", name);
}

/**
 * State switcher (logic only for now)
 */
function setState(newState) {
    bookState = newState;
    console.log("Book state changed to:", newState);
}
