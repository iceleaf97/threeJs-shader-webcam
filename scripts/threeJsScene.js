import * as THREE from './three.module.js';

let scene, camera, width, height, fov, aspect, near, far, renderer, container;
let webcamMesh, boxMesh;
let webcamElement;

window.addEventListener('load', init, false);

function init(){
    createScene();
    createLight();
    createModel();
    render();
    loop();
}

function createScene(){
    container = document.getElementById('scene');
    scene = new THREE.Scene();
    // width = window.innerWidth;
    // height = window.innerHeight;
    width = container.clientWidth;    
    height = container.clientHeight;
    fov = 50;
    aspect = width/height;
    near = 0.1;
    far = 10000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 20);
    
    scene.add(camera);

}

function createLight(){
    let d_light = new THREE.DirectionalLight(0xffffff, 1);
    d_light.position.set(10, 10, 20);
    scene.add(d_light);
}

function createModel(){
    let videoPlane = new THREE.PlaneBufferGeometry(10, 10);
    videoPlane.scale(1, 1.4, 1);
    webcamElement = document.getElementById('webcam');
    let webcamTexture =  new THREE.VideoTexture(webcamElement);
    /////////// Material type 1 ///////////////
    /*
    let webcamMaterial = new THREE.MeshBasicMaterial({
        map: webcamTexture, 
        transparent: true,
        side: THREE.DoubleSide
    });
    webcamMaterial.alphaMap = webcamTexture;
    */
    ///////////////////////////////////////////

    //////////// Material type 2: ShaderMaterial ///////////////
    var vertShader = document.getElementById('vertexShader').innerHTML;
    var fragShader = document.getElementById('fragmentShader').innerHTML;
    var uniforms = {
        videoTexture: {type: 't', value: webcamTexture}
    }
    var shaderMtl = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertShader,
        fragmentShader: fragShader, 
        transparent: true
    })
    webcamMesh = new THREE.Mesh(videoPlane, shaderMtl);
    /////////////////////////////////////////////////////////////
  
    scene.add(webcamMesh); 
    camera.add(webcamMesh);  
    webcamMesh.position.set(0, 0, -15);        
    

    let BoxGeom = new THREE.BoxGeometry(2, 2, 2);
    let lamBMtl = new THREE.MeshLambertMaterial({color: 0xffffff});
    boxMesh = new THREE.Mesh(BoxGeom, lamBMtl);
    scene.add(boxMesh);
}

function render(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
    container.appendChild(renderer.domElement);
}

function loop(){
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
    boxMesh.position.set(1, Math.sin(Date.now()*0.001)*16, 0);
    camera.lookAt(boxMesh.position);
    
}
