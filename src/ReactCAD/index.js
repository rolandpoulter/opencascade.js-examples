// import * as React from 'react';

// import ReactVersion from 'shared/ReactVersion';

// import {
//   LegacyRoot
// } from 'react-reconciler/src/ReactRootTags';

// import {
//   createContainer,
//   updateContainer,
//   injectIntoDevTools,
// } from 'react-reconciler/src/ReactFiberReconciler';

// import {
//   TYPES,
// } from './Internals/index';

/*
injectIntoDevTools({
  findFiberByHostInstance: () => null,
  bundleType: __DEV__ ? 1 : 0,
  version: ReactVersion,
  rendererPackageName: 'react-art',
});
*/

/** API */

// export const Operation = TYPES.OPERATION;
// export const Group = TYPES.GROUP;
// export const Shape = TYPES.SHAPE;
// export const Text = TYPES.TEXT;

export * from './Renderer';

export * from './Internals';
// export * from './Helpers';
export * from './BRep';
export * from './BRep/Op';
