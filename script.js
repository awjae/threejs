var WIDTH, HEIGHT;
var scene, camera, renderer;

var mesh;

init();
animate();

function init() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;

	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 1;
	var FAR = 1000;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);

	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR  );
	camera.position.z = 700;

	scene = new THREE.Scene();

	var geometry = new THREE.CubeGeometry( 200, 200, 200 );
	var material = new THREE.MeshBasicMaterial({color: 0xaa33ee});

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	render();
}