/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const TYPES = {
  OPERATION: 'Operation',
  GROUP: 'Group',
  SHAPE: 'Shape',
  // TEXT: 'Text',
  // NODE: 'Node',
};

export * from './Node';

export * from './Group';

export * from './Operation';
export * from './Shape';

// export * from './Text';

// TODO: use three.js to enable events on shape elements
// export const EVENT_TYPES = {
//   onClick: 'click',
//   onMouseMove: 'mousemove',
//   onMouseOver: 'mouseover',
//   onMouseOut: 'mouseout',
//   onMouseUp: 'mouseup',
//   onMouseDown: 'mousedown',
// };
