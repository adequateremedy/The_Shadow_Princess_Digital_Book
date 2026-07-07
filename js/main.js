/* ==========================================
   THE SHADOW PRINCESS
   Main Book Engine

   Spine -> Front Cover
   Front Cover -> Open Book

========================================== */



const spine =
    document.getElementById("spine");


const frontCover =
    document.getElementById("front-cover");


const frontCoverContainer =
    document.getElementById("front-cover-container");


const backgroundVideo =
    document.getElementById("background-video");



let spineOpened = false;

let coverOpened = false;




// ==========================================
// INITIAL STATE
// ==========================================


backgroundVideo.style.opacity = "0";

backgroundVideo.volume = 0;



frontCoverContainer.style.display =
    "none";






// ==========================================
// CLICK SPINE
// ==========================================


spine.addEventListener("click", function () {


    if (spineOpened) {

        return;

    }


    spineOpened = true;


    startSpineTransition();


});







// ==========================================
// SPINE -> FRONT COVER
// 5 SECOND CROSSFADE
// ==========================================


function startSpineTransition() {


    const duration = 5000;



    frontCoverContainer.style.display =
        "block";


    frontCover.style.opacity = "0";



    backgroundVideo.play()

    .then(() => {



        const start =
            performance.now();





        function animate(time) {



            let progress =
                (time - start) / duration;



            if (progress > 1) {

                progress = 1;

            }





            // video fade

            backgroundVideo.style.opacity =
                progress;



            // audio fade

            backgroundVideo.volume =
                progress;




            // spine fades away

            spine.style.opacity =
                1 - progress;




            // cover fades in

            frontCover.style.opacity =
                progress;






            if (progress < 1) {



                requestAnimationFrame(
                    animate
                );


            }

            else {



                spine.style.display =
                    "none";


                backgroundVideo.volume =
                    1;



                enableCoverClick();


            }


        }




        requestAnimationFrame(
            animate
        );



    })

    .catch(error => {


        console.log(
            "Video playback blocked:",
            error
        );


    });



}







// ==========================================
// ENABLE FRONT COVER CLICK
// ==========================================


function enableCoverClick() {


    frontCover.addEventListener(
        "click",
        openCover
    );


}







// ==========================================
// FRONT COVER OPENS
// ==========================================


function openCover() {



    if (coverOpened) {

        return;

    }



    coverOpened = true;




    frontCoverContainer.style.transition =
        "transform 2.5s ease";





    frontCoverContainer.style.transform =
        "rotateY(-180deg)";



}
