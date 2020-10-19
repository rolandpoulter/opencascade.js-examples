import { ShadowDOM, ContainerDOM } from '../Helpers/DOM';

import { applyNodeProps } from './Node';

export function applyGroupProps(instance, props, prevProps = {}) {
  applyNodeProps(instance, props, prevProps);
}

export class GroupNode extends ContainerDOM {}

export function Group(props) {
  const Component = 'Group';
  return (<Component {...props} />);
}
