// three.js
import {
  Scene,
  OrthographicCamera,
  AmbientLight,
  // SpotLight,
  // SpotLightHelper,
  DirectionalLight,
  PlaneBufferGeometry,
  Mesh,
  MeshPhongMaterial,
  AxesHelper
  // WebGLRenderer
} from './build/three.module.js'
import {Box} from './Box.js'
import {SVGRenderer} from './lib/renderers/SVGRenderer.js'
import Stats from './lib/libs/stats.module.js'
import {OrbitControls} from './lib/controls/OrbitControls.js'
function main()
{
  
  //GLOBALS
  let scene,camera,renderer,stats,controls,axesHelper;
  const WIDTH = window.innerWidth
  const HEIGHT = window.innerHeight
  const D=100
  setup()

  // LIGHTiNG
  scene.add(new AmbientLight(0x4000ff));
  const spot = new DirectionalLight(0xFFFFFF,1)
  spot.position.set(10,20,15)
  scene.add(spot)

  
  // create the world
  let box = new Box(4,4,4,0xFFFFFF)
  scene.add(box.mesh)

  let plane = new Mesh( 
    new PlaneBufferGeometry(10,10,30,30),
    new MeshPhongMaterial({color:0xFF00FF})
  )
  plane.rotation.x=-0.5*Math.PI
  scene.add(plane)

  
  animate()
  function setup(){
    // SCENE
    scene = new Scene()

    // CAMERA
    camera = new OrthographicCamera(WIDTH / - D, WIDTH / D, HEIGHT / D, HEIGHT / - D, 1, 1000 )
    camera.position.set(10,10,10)
    // position and point the camera to the center of the scene
    camera.lookAt(scene.position);

    // RENDERER
    renderer = new SVGRenderer()
    // set background transparent
    // renderer.setClearColor(0xFFFFFF,0.3)
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    console.log(renderer.domElement);

    // CONTROLS
    controls = new OrbitControls( camera, renderer.domElement )

    // HELPERS
    axesHelper = new AxesHelper(10)
    scene.add(axesHelper)

    // STATS
    stats = new Stats();
    console.log(stats);
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
  }
  function animate()
  {
    stats.begin()
    //---
    // box.update()
    // plane.rotation.x+=0.01
    renderer.render(scene,camera)
    //---
    stats.end()
    requestAnimationFrame(animate)
  }
}

window.onload = main;

// Box.js
import {
  BoxGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
} from './build/three.module.js'
import {SceneUtils} from './lib/utils/SceneUtils.js'

class Box{
  constructor(width,height,depth,color)
  {
    this.height=height;
    this.width=width;
    this.depth=depth;
    this.color=color;
    // this.mesh=new Mesh(new BoxGeometry(width,height,depth),)
    this.mesh = new SceneUtils.createMultiMaterialObject(new BoxGeometry(width,height,depth),[
      new MeshPhongMaterial({
        color:color,
        specular:0xFFFFFF,
        shininess:50,
        flatShading:false
      }),
      new MeshBasicMaterial({color:0x000000,wireframe:true})
    ])
    this.mesh.position.y+=height/2
  }
  update(){
    this.mesh.rotation.y+=.01
  }
}
export {Box}