import { Node, applyRenderableNodeProps } from './Node';

export function applyShapeProps(instance, props, prevProps = {}) {
  applyRenderableNodeProps(instance, props, prevProps);

  /*
  const path = props.d || childrenAsString(props.children);

  const prevDelta = instance._prevDelta;
  const prevPath = instance._prevPath;

  if (
    path !== prevPath ||
    path.delta !== prevDelta ||
    prevProps.height !== props.height ||
    prevProps.width !== props.width
  ) {
    instance.draw(path, props.width, props.height);

    instance._prevDelta = path.delta;
    instance._prevPath = path;
  }
  */
}

export class ShapeNode extends Node {}

export function Shape(props) {
  const Component = 'Shape';
  const component = (<Component {...props} />);
  debugger;
  return component;
}
