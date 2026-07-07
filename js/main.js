//////////////////////////////////////////////////////////
// THE SHADOW PRINCESS
// Main Book Engine
// Stage 1 - Background + Spine + Cover Transition
//////////////////////////////////////////////////////////


const container = document.getElementById("book-container");

let scene;
let camera;
let renderer;

let spineMesh;
let coverMesh;

let raycaster;
let mouse;

let spineReady = false;
let coverReady = false;



// ------------------------------------------------------
// START ENGINE
// ------------------------------------------------------

function init() {


    scene = new THREE.Scene();



    camera = new THREE.OrthographicCamera(
        window.innerWidth / -200,
        window.innerWidth / 200,
        window.innerHeight / 200,
        window.innerHeight / -200,
        0.1,
        1000
    );


    camera.position.z = 10;



    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        window.devicePixelRatio
    );


    renderer.setClearColor(
        0x000000,
        0
    );


    container.appendChild(
        renderer.domElement
    );



    raycaster = new THREE.Raycaster();

    mouse = new THREE.Vector2();



    createBackgroundVideo();

    loadSpine();

    loadFrontCover();



    window.addEventListener(
        "resize",
        resize
    );


    window.addEventListener(
        "click",
        handleClick
    );



    animate();

}



// ------------------------------------------------------
// BACKGROUND VIDEO
// ------------------------------------------------------

function createBackgroundVideo() {


    const video =
        document.createElement("video");


    video.id =
        "background-video";


    video.src =
        "assets/background.webm";


    video.loop = true;

    video.muted = true;

    video.autoplay = true;

    video.playsInline = true;



    video.setAttribute(
        "playsinline",
        ""
    );



    document.body.insertBefore(
        video,
        document.body.firstChild
    );



    video.play()
        .catch(() => {

            console.log(
                "Background video waiting for browser permission."
            );

        });


}



// ------------------------------------------------------
// LOAD SPINE
// ------------------------------------------------------

function loadSpine() {


    const loader =
        new THREE.TextureLoader();



    loader.load(

        "assets/spine.png",

        function(texture) {



            const material =
                new THREE.MeshBasicMaterial({

                    map: texture,

                    transparent: true

                });



            /*
                Original image ratio:
                132 x 446

                Scale preserved.
            */

            const geometry =
                new THREE.PlaneGeometry(
                    1.32,
                    4.46
                );



            spineMesh =
                new THREE.Mesh(
                    geometry,
                    material
                );



            spineMesh.position.set(
                0,
                0,
                1
            );



            scene.add(
                spineMesh
            );


            spineReady = true;


        }

    );


}



// ------------------------------------------------------
// LOAD FRONT COVER
// ------------------------------------------------------

function loadFrontCover() {


    const loader =
        new THREE.TextureLoader();



    loader.load(

        "assets/front-cover.png",

        function(texture) {



            const material =
                new THREE.MeshBasicMaterial({

                    map: texture,

                    transparent: true,

                    opacity: 0

                });



            const geometry =
                new THREE.PlaneGeometry(
                    3.03,
                    4.50
                );



            coverMesh =
                new THREE.Mesh(
                    geometry,
                    material
                );



            coverMesh.position.set(
                0,
                0,
                0.9
            );



            scene.add(
                coverMesh
            );


            coverReady = true;


        }

    );


}



// ------------------------------------------------------
// CLICK SPINE
// ------------------------------------------------------

function handleClick(event) {


    if (
        !spineReady ||
        !coverReady
    ) {

        return;

    }



    mouse.x =
        (event.clientX /
        window.innerWidth) * 2 - 1;



    mouse.y =
        -(event.clientY /
        window.innerHeight) * 2 + 1;



    raycaster.setFromCamera(
        mouse,
        camera
    );



    const hit =
        raycaster.intersectObject(
            spineMesh
        );



    if (hit.length > 0) {

        openCover();

    }


}



// ------------------------------------------------------
// SPINE TO COVER FADE
// ------------------------------------------------------

function openCover() {


    const duration = 1200;

    const start =
        performance.now();



    function fade(time) {


        const progress =
            Math.min(
                (time - start) / duration,
                1
            );



        spineMesh.material.opacity =
            1 - progress;



        coverMesh.material.opacity =
            progress;



        if (progress < 1) {

            requestAnimationFrame(
                fade
            );

        }
        else {

            spineMesh.visible = false;

        }


    }



    requestAnimationFrame(
        fade
    );


}



// ------------------------------------------------------
// WINDOW RESIZE
// ------------------------------------------------------

function resize() {


    camera.left =
        window.innerWidth / -200;


    camera.right =
        window.innerWidth / 200;


    camera.top =
        window.innerHeight / 200;


    camera.bottom =
        window.innerHeight / -200;



    camera.updateProjectionMatrix();



    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


}



// ------------------------------------------------------
// RENDER LOOP
// ------------------------------------------------------

function animate() {


    requestAnimationFrame(
        animate
    );


    renderer.render(
        scene,
        camera
    );


}



// RUN

init();
