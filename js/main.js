//////////////////////////////////////////////////////////
// THE SHADOW PRINCESS
// Main Book Engine
// Stage 1 - Background Video + Spine + Cover Transition
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
// INITIALIZE
// ------------------------------------------------------

function init() {


    scene = new THREE.Scene();



    // Flat camera so the background is not tilted
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -100,
        window.innerWidth / 100,
        window.innerHeight / 100,
        window.innerHeight / -100,
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



    loadBackgroundVideo();

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
// BACKGROUND WEBM VIDEO
// ------------------------------------------------------

function loadBackgroundVideo() {


    const video =
        document.createElement("video");


    video.src =
        "assets/background.webm";


    video.loop = true;

    video.muted = true;

    video.autoplay = true;

    video.playsInline = true;



    video.play();



    const videoTexture =
        new THREE.VideoTexture(
            video
        );


    videoTexture.minFilter =
        THREE.LinearFilter;


    videoTexture.magFilter =
        THREE.LinearFilter;



    const material =
        new THREE.MeshBasicMaterial({

            map: videoTexture

        });



    /*
        Large flat plane facing camera.
        No rotation.
        No perspective distortion.
    */


    const geometry =
        new THREE.PlaneGeometry(
            20,
            12
        );



    const background =
        new THREE.Mesh(
            geometry,
            material
        );



    background.position.z =
        -5;



    scene.add(
        background
    );


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

                    transparent: true,

                    opacity: 1

                });



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
                1.1
            );



            scene.add(
                coverMesh
            );


            coverReady = true;


        }

    );


}



// ------------------------------------------------------
// CLICK DETECTION
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



    const intersects =
        raycaster.intersectObject(
            spineMesh
        );



    if (intersects.length > 0) {

        openCover();

    }


}



// ------------------------------------------------------
// SPINE TO COVER CROSSFADE
// ------------------------------------------------------

function openCover() {


    const duration =
        1200;


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


            spineMesh.visible =
                false;


        }


    }



    requestAnimationFrame(
        fade
    );


}



// ------------------------------------------------------
// RESIZE
// ------------------------------------------------------

function resize() {


    camera.left =
        window.innerWidth / -100;


    camera.right =
        window.innerWidth / 100;


    camera.top =
        window.innerHeight / 100;


    camera.bottom =
        window.innerHeight / -100;



    camera.updateProjectionMatrix();



    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


}



// ------------------------------------------------------
// ANIMATION LOOP
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



// START

init();
