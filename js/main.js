/* ==========================================
   THE SHADOW PRINCESS
   SIMPLE FLIP BOOK ENGINE

   Stage 1:
   Front Cover Opens

========================================== */



const cover =
    document.getElementById("cover");


const flipbook =
    document.getElementById("flipbook");



let bookOpened = false;





// ==========================================
// INITIAL STATE
// ==========================================


flipbook.style.display = "flex";







// ==========================================
// OPEN FRONT COVER
// ==========================================


cover.addEventListener("click", function () {



    if (bookOpened) {

        return;

    }



    bookOpened = true;





    cover.style.transform =
        "rotateY(-180deg)";





});
