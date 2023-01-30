
import { OrbitControls } from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

const loader = new THREE.GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
renderer.render(scene, camera)


window.createImageBitmap = undefined

loader.load( 'assets/sparrow.glb', function ( ship ) {
					ship.scene.position.set(0,2,1);
					scene.add( ship.scene );
}, undefined, function ( error ) {

	console.error( error );

} );
const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('assets/space.webp');
scene.background = spaceTexture

const textureLoader = new THREE.TextureLoader();
const sunTexture = new THREE.TextureLoader().load('assets/2k_sun.jpg');
const earthTexture = new THREE.TextureLoader().load('assets/2k_earth_clouds.jpg');
const normalMapTexture = textureLoader.load("assets/normalMap.jpg");


const geometryTorus = new THREE.TorusKnotGeometry(12, 3, 100, 200)
const materialTorus = new THREE.MeshPhysicalMaterial({
  color: ('rgb(255,255,255)'),
  roughness: .9,
  metalness: 1,
  clearcoat: 1,
  map: sunTexture
});
const torusKnot = new THREE.Mesh(geometryTorus, materialTorus)
scene.add(torusKnot)
torusKnot.position.set(150, 1, 35);


const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(-10, 10, 4);

const spotLight = new THREE.SpotLight(0xffffff, 3);
spotLight.position.set(15, 1, 35);
spotLight.distance = 50;

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);

scene.add(spotLight, directionalLight, pointLight)

let addingBall = true
const ball = null

function addBall() {
  if (addingBall) {
    const geometryBall = new THREE.SphereGeometry(1, 24, 24);
    const materialBall = new
      THREE.MeshPhysicalMaterial(
        {
        
          roughness: Math.random(),
          transmission: Math.random(),
          thickness: .5,
          metalness: Math.random(),
          clearcoat: Math.random(),
          normalMap: normalMapTexture,
          color: (
            `rgb(${randomNum(0, 255)},${randomNum(0, 255)} , ${randomNum(0, 255)})`)
        })
  
    const ball = new THREE.Mesh(geometryBall, materialBall)
    let x = randomNum(-50, 50)
    let y = randomNum(-50, 50)
    let z = randomNum(-50, 50)
    ball.position.set(x, y, z)
    scene.add(ball)
  } else {
    scene.remove(scene.children[scene.children.length - 1])
  }
}

let ballCount = 0
function ballFill() {

  if (ballCount == numBalls.value) {
    return
  } else if (ballCount > numBalls.value) {
    for (ballCount; ballCount > numBalls.value; ballCount--) {
      addingBall = false
      directionalLight.color.setHex( 0x0000ff );
      spotLight.color.setHex( 0x0000ff );
      addBall()
    }
  } else {
       for (ballCount; ballCount < numBalls.value; ballCount++) {
        addingBall = true
        addBall()    

    }
  }
}

function animate() {
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  torusKnot.rotation.z += 0.01;
  scene.rotation.z += 0.001;
  scene.rotation.y += 0.001;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  pointLight.color.setHex( slidertoHexcode ());
  directionalLight.color.setHex( slidertoHexcode ());
  spotLight.color.setHex( slidertoHexcode ()); 
  
  ballFill()
}
animate()



