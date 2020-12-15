import {
  Scene,
  AmbientLight,
  AxesHelper,
  WebGLRenderer,
  PerspectiveCamera,
  MeshPhongMaterial,
  PlaneGeometry,
  Mesh,
  SpotLight
} from './build/three.module.js'
import Stats from './lib/libs/stats.module.js'
import {OrbitControls} from './lib/controls/OrbitControls.js'
import {DRACOLoader} from './lib/loaders/DRACOLoader.js'
import {GLTFLoader} from './lib/loaders/GLTFLoader.js'
function main()
{
  
  //GLOBALS
  let scene,camera,renderer,stats,controls,axesHelper;
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight
  setup()

  // LIGHTiNG
  scene.add(new AmbientLight(0xffffff,1));
  let spot = new SpotLight(0xffffff,1)
  spot.lookAt(scene.position)
  spot.position.set(0,10,0)
  // scene.add(spot)
  
  // materials
  let matA = new MeshPhongMaterial({color:0xFF0000,shininess:50})

  let plane = new  Mesh(new PlaneGeometry(10,10),matA)
  plane.rotation.x=-.5*Math.PI
  // scene.add(plane)

  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath( './lib/draco/gltf/' );
  loader.setDRACOLoader( dracoLoader );
  
  // Load a glTF resource
  loader.load(
    // resource URL
    'spiderman_notebook.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      // append the first object in gltf scene 
      scene.add( gltf.scene.children[0] );
      console.log(scene);
  
    },
    // called while loading is progressing
    function ( xhr ) {
  
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  
    },
    // called when loading has errors
    function ( error ) {
  
      console.log( 'An error happened' );
  
    }
  );

  
  animate()
  function setup(){
    // SCENE
    scene = new Scene()

    // CAMERA
    camera = new PerspectiveCamera(45,WIDTH/HEIGHT,1,1000)
    camera.position.set(4,4,4)
    // position and point the camera to the center of the scene
    camera.lookAt(scene.position);

    // RENDERER
    renderer = new WebGLRenderer()
    renderer.clearColor(0xFFFFFF)
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // CONTROLS
    controls = new OrbitControls( camera, renderer.domElement )

    // HELPERS
    axesHelper = new AxesHelper(10)
    scene.add(axesHelper)

    // STATS
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

  }
  function animate()
  {
    stats.begin()
    //---
    renderer.render(scene,camera)
    //---
    stats.end()
    requestAnimationFrame(animate)
  }
}

window.onload = main;