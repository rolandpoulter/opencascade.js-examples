import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Geometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import openCascadeHelper from './openCascadeHelper';

const loadFileAsync = async (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  })
}

const loadSTEPorIGES = async (ocLib, inputFile, addFunction, scene) => {
  await loadFileAsync(inputFile).then(async (fileText) => {
    const fileName = inputFile.name;
    // Writes the uploaded file to Emscripten's Virtual Filesystem
    ocLib.FS.createDataFile('/', fileName, fileText, true, true);

    // Choose the correct ocLib file parsers to read the CAD file
    var reader = null;
    if (fileName.toLowerCase().endsWith('.step') || fileName.toLowerCase().endsWith('.stp')) {
      reader = new ocLib.STEPControl_Reader_1();
    } else if (fileName.toLowerCase().endsWith('.iges') || fileName.toLowerCase().endsWith('.igs')) {
      reader = new ocLib.IGESControl_Reader_1();
    } else { console.error('ocLib.js can\'t parse this extension! (yet)'); }
    const readResult = reader.ReadFile(fileName);            // Read the file
    if (readResult === ocLib.IFSelect_ReturnStatus.IFSelect_RetDone) {
      console.log(fileName + ' loaded successfully!     Converting to OCC now...');
      const numRootsTransferred = reader.TransferRoots();    // Translate all transferable roots to ocLib
      const stepShape           = reader.OneShape();         // Obtain the results of translation in one OCCT shape
      console.log(fileName + ' converted successfully!  Triangulating now...');

      // Out with the old, in with the new!
      scene.remove(scene.getObjectByName('shape'));
      await addFunction(ocLib, stepShape, scene);
      console.log(fileName + ' triangulated and added to the scene!');

      // Remove the file when we're done (otherwise we run into errors on reupload)
      ocLib.FS.unlink('/' + fileName);
    } else {
      console.error('Something in OCCT went wrong trying to read ' + fileName);
    }
  });
};
export { loadSTEPorIGES };


const setupThreeJSViewport = (betterAPI) => {
  var scene = new Scene();
  var camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new WebGLRenderer({antialias: true});
  const viewport = document.getElementById('viewport');
  const viewportRect = viewport.getBoundingClientRect();
  renderer.setSize(viewportRect.width, viewportRect.height);
  viewport.appendChild(renderer.domElement);

  const light = new AmbientLight(0x404040);
  scene.add(light);
  const directionalLight = new DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0.5, 0.5, 0.5);
  scene.add(directionalLight);

  camera.position.set(0, 50, 100);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.target.set(0, 50, 0);
  controls.update();

  let _play = true;
  let _cb = null;

  function render() {
    if (_cb) { _cb(scene, camera, renderer); }
    renderer.render(scene, camera);
  }

  function play() {
    _play = true;
    animate();
  }

  function animate() {
    if (_play) {
      requestAnimationFrame(animate);
      render();
    }
  }

  function pause() {
    _play = false;
  }

  if (betterAPI) {
    render();
    return {
      setCallback(cb) { _cb = cb; },
      animate,
      camera,
      controls,
      directionalLight,
      light,
      pause,
      play,
      render,
      renderer,
      scene,
      viewport,
      viewportRect,
    };
  } else {
    play();
    return scene;
  }
}
export { setupThreeJSViewport };

const addShapeToScene = async (ocLib, shape, scene) => {
  openCascadeHelper.setOpenCascade(ocLib);
  const facelist = await openCascadeHelper.tessellate(shape);
  const [locVertexcoord, locNormalcoord, locTriIndices] = await openCascadeHelper.joinPrimitives(facelist);
  const tot_triangle_count = facelist.reduce((a,b) => a + b.number_of_triangles, 0);
  const [vertices, faces] = await openCascadeHelper.generateGeometry(tot_triangle_count, locVertexcoord, locNormalcoord, locTriIndices);
  const objectMaterial = new MeshStandardMaterial({
    color: new Color(0.9, 0.9, 0.9)
  });
  const objectGeometry = new Geometry();
  objectGeometry.vertices = vertices;
  objectGeometry.faces = faces;
  const object = new Mesh(objectGeometry, objectMaterial);
  const edgesGeometry = new EdgesGeometry(objectGeometry); // or WireframeGeometry
  const edgesMaterial = new LineBasicMaterial({color: 0xffffff, linewidth: 2});
  const wireframe = new LineSegments(edgesGeometry, edgesMaterial);
  const group = new Group();
  object.name = 'shape';
  wireframe.name = 'wireframe';
  group.add(object);
  group.add(wireframe);
  group.rotation.x = -Math.PI / 2;
  scene.add(group);
  // console.log('add to scene');
}

export { addShapeToScene };
