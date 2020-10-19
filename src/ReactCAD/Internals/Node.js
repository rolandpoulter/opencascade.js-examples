import { ShadowDOM, DummyDOM } from '../Helpers/DOM';

export function applyNodeProps(instance, props, prevProps = {}) {
  instance.setOCLib(props.ocLib);

  instance.setOCRef(props.ocRef);

  instance.defAddShape(props.addShape);

  instance.defRemoveShape(props.removeShape);

  /*
  const scaleX = getScaleX(props);
  const scaleY = getScaleY(props);

  pooledTransform
    .transformTo(1, 0, 0, 1, 0, 0)
    .move(props.x || 0, props.y || 0)
    .rotate(props.rotation || 0, props.originX, props.originY)
    .scale(scaleX, scaleY, props.originX, props.originY);

  if (props.transform != null) {
    pooledTransform.transform(props.transform);
  }

  if (
    instance.xx !== pooledTransform.xx ||
    instance.yx !== pooledTransform.yx ||
    instance.xy !== pooledTransform.xy ||
    instance.yy !== pooledTransform.yy ||
    instance.x !== pooledTransform.x ||
    instance.y !== pooledTransform.y
  ) {
    instance.transformTo(pooledTransform);
  }

  if (props.cursor !== prevProps.cursor || props.title !== prevProps.title) {
    instance.indicate(props.cursor, props.title);
  }

  if (instance.blend && props.opacity !== prevProps.opacity) {
    instance.blend(props.opacity == null ? 1 : props.opacity);
  }

  if (props.visible !== prevProps.visible) {
    if (props.visible == null || props.visible) {
      instance.show();
    } else {
      instance.hide();
    }
  }
  */

  // TODO: use three.js to enable events on shape elements
  // for (const type in EVENT_TYPES) {
  //   addEventListeners(instance, EVENT_TYPES[type], props[type]);
  // }
}

export function applyRenderableNodeProps(instance, props, prevProps = {}) {
  applyNodeProps(instance, props, prevProps);
}

export class Node extends DummyDOM {
  constructor(applyNodePropsMethod) {
    this.defApplyPropsMethod(applyNodePropsMethod);
  }

  defApplyPropsMethod(applyNodePropsMethod) {
    this._applyProps = applyPropsMethod;
  }

  defAddShape(addShape) {
    this._addShape = addShape;
  }

  defRemoveShape(removeShape) {
    this._removeShape = removeShape;
  }

  getOCLib() { return this._ocLib; }

  getOCRef() { return this._ocRef; }

  setOCLib(lib) { this._ocLib = lib; }

  setOCRef(ref) { this._ocRef = ref; }

  setHidden(hidden) { this._hidden = hidden; }

  isHidden() { return !!this._hidden; }

  hide() { this.setHidden(true); }

  show() { this.setHidden(false); }
}
