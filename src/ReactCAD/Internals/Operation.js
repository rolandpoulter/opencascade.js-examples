import { Node, applyNodeProps } from './Node';

export function applyOperationProps(instance, props, prevProps = {}) {
  applyNodeProps(instance, props, prevProps);
}

export class OperationNode extends Node {};

export function Operation(props) {
  const Component = 'Operation';
  const component = (<Component {...props} />);
  debugger;
  return component;
}
