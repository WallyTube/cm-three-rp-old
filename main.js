import { OrbitControls } from './modified/OrbitControls.js';
import { GLTFLoader } from './modified/GLTFLoader.js';
import { RoomEnvironment } from './modified/RoomEnvironments.js';

const gui = new dat.GUI();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const camera = new THREE.PerspectiveCamera(4, innerWidth / innerHeight, 1, 1000);
const controls = new OrbitControls( camera, renderer.domElement );
const cameraOrthoHelper = new THREE.CameraHelper( camera );

scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;
scene.add( cameraOrthoHelper );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.x = -40;
camera.position.y = 27;
camera.position.z = 235;

var block = [];
const loader = new GLTFLoader();
loader.load('./resources/models/R-computer-two.gltf', function (gltf) {
		scene.add( gltf.scene );
		block.push( gltf.scene );
	},
	function ( xhr ) {}, // loading
	function ( error ) { console.log( 'An error happened' ); } // error loading
);
loader.load('./resources/models/R-computer-two-glow.gltf', function (gltf) {
	scene.add( gltf.scene );
	block.push( gltf.scene );
},
function ( xhr ) {}, // loading
function ( error ) { console.log( 'An error happened' ); } // error loading
);

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})

renderer.setAnimationLoop(() => {
	//block.forEach(b => b.rotation.y += 0.02);

	console.log(camera.position);
	controls.update();
	renderer.render(scene, camera);
})