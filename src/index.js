import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  render,
  Scene,
  SceneManager,
} from './ReactCAD/Renderer';

import {
  ContainerDOM
} from './ReactCAD/Helpers/DOM'

import {
  Translate
} from './ReactCAD/BRep/Op/Translate';

import {
  Polygon
} from './ReactCAD/BRep/Polygon';

import App from './App';

const ExamplePolygon = (props) => {
  return (
    <Translate
      {...props}
      vector={props.position || [0, 0, 0]}
    >
      <Polygon
        {...props}
        points={props.points || [
          [-50, 0, 0],
          [50, 0, 0],
          [50, 100, 0],
        ]}
      />
    </Translate>
  );
};

export function drawAppAndScene() {
  const title = 'React CAD Example';

  ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app'),
  );

  const scene = (
    <Scene>
      {(sceneAPI, ocLib) => {
        // debugger;
        return (
          <SceneManager
            sceneAPI={sceneAPI}
            ocLib={ocLib}
          >
            {(ocPropsMixin) => {
              // debugger;
              return (
                <ExamplePolygon
                  {...ocPropsMixin}
                  position={[1, 2, 3]}
                />
              );
            }}
          </SceneManager>
        );
      }}
    </Scene>
  );

  const container = new ContainerDOM();

  // debugger;
  render(
    scene,
    container,
    () => {
      console.log('ReactCAD rendered.');
    }
  );
}

// debugger;

drawAppAndScene();

module.hot.accept();
