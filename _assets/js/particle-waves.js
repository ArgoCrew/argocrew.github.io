var SEPARATION = 50, AMOUNT_X = 90, AMOUNT_Y = 25;
let CAMERA_X = 0, CAMERA_Y = -180, CAMERA_Z = 250, CAMERA_PESPECTIVE = 90;


var container, stats;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(CAMERA_PESPECTIVE, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = CAMERA_Z;

  scene = new THREE.Scene();

  particles = new Array();

  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial({
    color: 0xffffff,
    program: function ( context ) {
      context.beginPath();
      context.arc(0, 0, 0.5, 0, PI2, true);
      context.fill();
    }
  });

  var i = 0;

  for (var ix = -10; ix < AMOUNTX; ix ++) {
    for (var iy = 0; iy < AMOUNTY; iy ++) {
      particle = particles[ i ++ ] = new THREE.Sprite( material );
      particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
      particle.position.y = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
      scene.add(particle);
    }
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);
}


function animate() {
  requestAnimationFrame( animate );

  render();
}


function render() {
  camera.position.x = CAMERA_X;
  camera.position.y = CAMERA_Y;
  camera.lookAt(scene.position);

  var i = 0;

  for ( var ix = 0; ix < AMOUNT_X; ix ++ ) {
    for ( var iy = 0; iy < AMOUNT_Y; iy ++ ) {
      particle = particles[ i++ ];
      particle.position.z = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
        ( Math.sin( ( iy + count ) * 0.5 ) * 20 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
        ( Math.sin( ( iy + count ) * 0.5 ) + 0 ) * 4;
    }
  }

  renderer.render(scene, camera);

  count += 0.08;
}


function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}