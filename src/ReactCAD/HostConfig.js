export default function invariant(condition, format, a, b, c, d, e, f) {
  throw new Error(
    'Internal React error: invariant() is meant to be replaced at compile ' +
      'time. There is no runtime version.',
  );
}

import {
  TYPES,
  // EVENT_TYPES,
} from './Internals';

const NO_CONTEXT = {};
const UPDATE_SIGNAL = {};

// if (__DEV__) {
//   Object.freeze(NO_CONTEXT);
//   Object.freeze(UPDATE_SIGNAL);
// }

/** Render Methods */

// import { applyNodeProps, applyRenderableNodeProps } from './Internals/Node';
import { GroupNode, applyGroupProps } from './Internals/Group';
import { OperationNode, applyOperationProps } from './Internals/Operation';
import { ShapeNode, applyShapeProps } from './Internals/Shape';

import { Node, applyNodeProps } from './Internals/Node';

// export * from 'react-reconciler/src/ReactFiberHostConfigWithNoPersistence';
// export * from 'react-reconciler/src/ReactFiberHostConfigWithNoHydration';
// export * from 'react-reconciler/src/ReactFiberHostConfigWithNoScopes';
// export * from 'react-reconciler/src/ReactFiberHostConfigWithNoTestSelectors';

export function appendInitialChild(parentInstance, child) {
  if (typeof child === 'string') {
    // Noop for string children of Text (eg <Text>{'foo'}{'bar'}</Text>)
    invariant(false, 'Text children should already be flattened.');
    return;
  }

  child.inject(parentInstance);
}

export function createInstance(type, props, internalInstanceHandle) {
  let instance;

  switch (type) {
    case TYPES.OPERATION:
      instance = new OperationNode(applyOperationProps);
      break;
    case TYPES.GROUP:
      instance = new GroupNode(applyGroupProps);
      break;
    case TYPES.SHAPE:
      instance = new ShapeNode(applyShapeProps);
      break;
    // case TYPES.NODE:
    //   instance = new Node(applyNodeProps)
    //   break;
  }

  invariant(instance, 'ReactCAD does not support the type "%s"', type);

  debugger;
  instance._applyProps(instance, props, null);

  return instance;
}

export function createTextInstance(
  text,
  rootContainerInstance,
  internalInstanceHandle,
) {
  return text;
}

export function finalizeInitialChildren(domElement, type, props) {
  return false;
}

export function getPublicInstance(instance) {
  return instance;
}

export function prepareForCommit() {
  // Noop
  return null;
}

export function prepareUpdate(domElement, type, oldProps, newProps) {
  return UPDATE_SIGNAL;
}

export function resetAfterCommit() {
  // Noop
}

export function resetTextContent(domElement) {
  // Noop
}

export function getRootHostContext() {
  return NO_CONTEXT;
}

export function getChildHostContext() {
  return NO_CONTEXT;
}

export const scheduleTimeout = setTimeout;
export const cancelTimeout = clearTimeout;
export const noTimeout = -1;

export function shouldSetTextContent(type, props) {
  return (
    false
    // || typeof props.children === 'string'
    // || typeof props.children === 'number'
  );
}

// The CAD renderer is secondary to the React DOM renderer.
export const isPrimaryRenderer = true;

// The CAD renderer shouldn't trigger missing act() warnings
export const warnsIfNotActing = !false;

export const supportsMutation = true;

export function appendChild(parentInstance, child) {
  if (child.parentNode === parentInstance) {
    child.eject();
  }
  child.inject(parentInstance);
}

export function appendChildToContainer(parentInstance, child) {
  if (child.parentNode === parentInstance) {
    child.eject();
  }
  child.inject(parentInstance);
}

export function insertBefore(parentInstance, child, beforeChild) {
  invariant(
    child !== beforeChild,
    'ReactCAD: Can not insert node before itself',
  );
  child.injectBefore(beforeChild);
}

export function insertInContainerBefore(parentInstance, child, beforeChild) {
  invariant(
    child !== beforeChild,
    'ReactCAD: Can not insert node before itself',
  );
  child.injectBefore(beforeChild);
}

export function removeChild(parentInstance, child) {
  // destroyEventListeners(child);
  child.eject();
}

export function removeChildFromContainer(parentInstance, child) {
  // destroyEventListeners(child);
  child.eject();
}

export function commitTextUpdate(textInstance, oldText, newText) {
  // Noop
}

export function commitMount(instance, type, newProps) {
  // Noop
}

export function commitUpdate(
  instance,
  updatePayload,
  type,
  oldProps,
  newProps,
) {
  instance._applyProps(instance, newProps, oldProps);
}

export function hideInstance(instance) {
  instance.hide();
}

export function hideTextInstance(textInstance) {
  // Noop
}

export function unhideInstance(instance, props) {
  if (props.visible == null || props.visible) {
    instance.show();
  }
}

export function unhideTextInstance(textInstance, text) {
  // Noop
}

export function clearContainer(container) {
  // TODO Implement this
}

export function getFundamentalComponentInstance(fundamentalInstance) {
  throw new Error('Not yet implemented.');
}

export function mountFundamentalComponent(fundamentalInstance) {
  throw new Error('Not yet implemented.');
}

export function shouldUpdateFundamentalComponent(fundamentalInstance) {
  throw new Error('Not yet implemented.');
}

export function updateFundamentalComponent(fundamentalInstance) {
  throw new Error('Not yet implemented.');
}

export function unmountFundamentalComponent(fundamentalInstance) {
  throw new Error('Not yet implemented.');
}

export function getInstanceFromNode(node) {
  throw new Error('Not yet implemented.');
}

export function isOpaqueHydratingObject(value) {
  throw new Error('Not yet implemented');
}

export function makeOpaqueHydratingObject(
  attemptToReadValue,
) {
  throw new Error('Not yet implemented.');
}

export function makeClientId() {
  throw new Error('Not yet implemented');
}

export function makeClientIdInDEV(warnOnAccessInDEV) {
  throw new Error('Not yet implemented');
}

export function beforeActiveInstanceBlur(internalInstanceHandle) {
  // noop
}

export function afterActiveInstanceBlur() {
  // noop
}

export function preparePortalMount(portalInstance) {
  // noop
}


/** Helper Methods */

// TODO: enable events when three.js picking is working
/*
function addEventListeners(instance, type, listener) {
  // We need to explicitly unregister before unmount.
  // For this reason we need to track subscriptions.
  if (!instance._listeners) {
    instance._listeners = {};
    instance._subscriptions = {};
  }

  instance._listeners[type] = listener;

  if (listener) {
    if (!instance._subscriptions[type]) {
      instance._subscriptions[type] = instance.subscribe(
        type,
        createEventHandler(instance),
        instance,
      );
    }
  } else {
    if (instance._subscriptions[type]) {
      instance._subscriptions[type]();
      delete instance._subscriptions[type];
    }
  }
}

function createEventHandler(instance) {
  return function handleEvent(event) {
    const listener = instance._listeners[event.type];

    if (!listener) {
      // Noop
    } else if (typeof listener === 'function') {
      listener.call(instance, event);
    } else if (listener.handleEvent) {
      listener.handleEvent(event);
    }
  };
}

function destroyEventListeners(instance) {
  if (instance._subscriptions) {
    for (const type in instance._subscriptions) {
      instance._subscriptions[type]();
    }
  }

  instance._subscriptions = null;
  instance._listeners = null;
}
*/

/*
function getScaleX(props) {
  if (props.scaleX != null) {
    return props.scaleX;
  } else if (props.scale != null) {
    return props.scale;
  } else {
    return 1;
  }
}

function getScaleY(props) {
  if (props.scaleY != null) {
    return props.scaleY;
  } else if (props.scale != null) {
    return props.scale;
  } else {
    return 1;
  }
}
*/

/*
function isSameFont(oldFont, newFont) {
  if (oldFont === newFont) {
    return true;
  } else if (typeof newFont === 'string' || typeof oldFont === 'string') {
    return false;
  } else {
    return (
      newFont.fontSize === oldFont.fontSize &&
      newFont.fontStyle === oldFont.fontStyle &&
      newFont.fontVariant === oldFont.fontVariant &&
      newFont.fontWeight === oldFont.fontWeight &&
      newFont.fontFamily === oldFont.fontFamily
    );
  }
}
*/
