import React from 'react';

import { initOpenCascade } from 'opencascade.js';

// import { render } from 'react-dom';
import Reconciler from 'react-reconciler';

import * as HostConfig from './HostConfig';

export const ReactCAD = new Reconciler(HostConfig);

import {
  setupThreeJSViewport,
  // addShapeToScene
} from '../common/library';

import {
  // ShapeToMesh,
  combineAndRenderShapes,
  renderCombinedFacesAndEdged,
  removeShape,
} from './Helpers/SceneShapes';

export function loadOpenCascade(onReady) {
  return new Promise((resolve, reject) => {
    const onSuccess = (openCascadeLib) => {
      if (typeof onReady === 'function') {
        onReady(null, openCascadeLib);
      }
      return resolve(openCascadeLib);
    };
    const onError = (error) => {
      if (typeof onReady === 'function') {
        onReady(error);
      }
      return reject(error);
    };
    initOpenCascade()
      .then(oc => oc.ready, onError)//?
      .then(
        onSuccess,
        onError
      );
  });
}

export const openCascadePromise = loadOpenCascade(
  async function (error) {
    if (error) { console.error(error); }
  }
);

export function Scene(props) {
  const [sceneAPI, setSceneAPI] = React.useState(null);
  const [ocLib, setOCLib] = React.useState(null);
  if (!sceneAPI) {
    setSceneAPI(
      setupThreeJSViewport(true)
    );
  } else {
    sceneAPI.setCallback(
      // (scene, camera, renderer) => {}
    );
    openCascadePromise.then(
      (ocLib) => setOCLib(ocLib)
    );
  }
  if (sceneAPI && ocLib) {
    return props.children(
      sceneAPI,
      ocLib,
      // sceneAPI && ocLib && true || false
    );
  }
  return null;
}

export function SceneManager(props) {
  // const _addShapeToScene = props.addShapeToScene || addShapeToScene;
  // const result = _addShapeToScene(ocLib, ocObject, scene);
  const [sceneShapes, setSceneShapes] = React.useState(props.sceneShapes || []);
  const [mainObject, setMainObject] = React.useState(null);
  const { sceneAPI, ocLib } = props;
  const { scene } = sceneAPI;
  const add = (ocObject) => {
    if (sceneShapes.indexOf(ocObject) === -1) {
      sceneShapes.push(ocObject);
      setSceneShapes(sceneShapes.slice(0));
      return ocObject;
    }
    return null;
  };
  const remove = (ocObject) => {
    const removed = removeShape(sceneShapes, ocObject);
    if (removed) {
      setSceneShapes(sceneShapes.slice(0));
      return removed;
    }
    return null;
  };
  // debugger;
  const facesAndEdges = combineAndRenderShapes(
    ocLib,
    sceneShapes,
    0.25
  );
  setMainObject(
    renderCombinedFacesAndEdged(
      facesAndEdges,
      scene,
      mainObject,
      { backgroundColor: '#000' }
    )
  );
  const render = () => {
    sceneAPI.render();
  };
  const sceneShapeNodes = props.children({
    scene,
    addShape: add,
    removeShape: remove,
    render,
  });
  // debugger;
  return sceneShapeNodes;
}

export function render(element, container, callback) {
  if (!container._rootContainer) {
    container._rootContainer = ReactCAD.createContainer(container, false);
  }
  ReactCAD.updateContainer(
    element,
    container._rootContainer,
    null,
    callback
  );
}
