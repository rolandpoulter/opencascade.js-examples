export function elementFrom(node) {
  if (node.toElement) return node.toElement();
  if (node.getDOMNode) return node.getDOMNode();
  if (node.getNode) return node.getNode();
  return node;
}

class NativeDOM {

  // conventions

  toElement() {
    return this.element;
  }

  getDOMNode() {
    return this.toElement();
  }

  getNode() {
  return this.toElement();
  }

  // placement

  inject(container) {
    (
      container.containerElement
      || elementFrom(container)
    ).appendChild(this.element);
    return this;
  }

  injectBefore(sibling) {
    var element = elementFrom(sibling);
    element.parentNode.insertBefore(this.element, element);
    return this;
  }

  eject() {
    var element = this.element, parent = element.parentNode;
    if (parent) parent.removeChild(element); // TODO: VML Nodes are dead after being ejected
    return this;
  }

  // events

  subscribe(type, fn, bind) {
    if (typeof type != 'string'){ // listen type / fn with object
      var subscriptions = [];
      for (var t in type) subscriptions.push(this.subscribe(t, type[t]));
      return () => { // unsubscribe
        for (var i = 0, l = subscriptions.length; i < l; i++)
        subscriptions[i]();
        return this;
      };
    } else { // listen to one
      if (!bind) bind = this;
      var bound;
      if (typeof fn === 'function'){
        bound = fn.bind ? fn.bind(bind)
        : () => { return fn.apply(bind, arguments); };
      } else {
        bound = fn;
      }
      var element = this.element;
      if (element.addEventListener){
        element.addEventListener(type, bound, false);
        return () => { // unsubscribe
          element.removeEventListener(type, bound, false);
          return this;
        };
      } else {
        element.attachEvent('on' + type, bound);
        return () => { // unsubscribe
          element.detachEvent('on' + type, bound);
          return this;
        };
      }
    }
  }
}

export class DummyDOM extends NativeDOM {

  // placement

  _resetPlacement() {
    var container = this.parentNode;
    if (container){
      var previous = this.previousSibling, next = this.nextSibling;
      if (previous){
        previous.nextSibling = next;
      } else {
        container.firstChild = next;
      }
      if (next){
        next.previousSibling = previous;
      } else {
        container.lastChild = this.previousSibling;
      }
    }
    this.previousSibling = null;
    this.nextSibling = null;
    this.parentNode = null;
    return this;
  }

  inject(container) {
    this._resetPlacement();
    var last = container.lastChild;
    if (last){
      last.nextSibling = this;
      this.previousSibling = last;
    } else {
      container.firstChild = this;
    }
    container.lastChild = this;
    this.parentNode = container;
    this._place();
    return this;
  }

  injectBefore(sibling) {
    this._resetPlacement();
    var container = sibling.parentNode;
    if (!container) return this;
    var previous = sibling.previousSibling;
    if (previous){
      previous.nextSibling = this;
      this.previousSibling = previous;
    } else {
      container.firstChild = this;
    }
    sibling.previousSibling = this;
    this.nextSibling = sibling;
    this.parentNode = container;
    this._place();
    return this;
  }

  eject() {
    this._resetPlacement();
    this._place();
    return this;
  }

  _place() {}

  // events

  dispatch(event) {
    var events = this._events,
      listeners = events && events[event.type];
    if (listeners){
      listeners = listeners.slice(0);
      for (var i = 0, l = listeners.length; i < l; i++){
        var fn = listeners[i], result;
        if (typeof fn == 'function')
          result = fn.call(this, event);
        else
          result = fn.handleEvent(event);
        if (result === false) event.preventDefault();
      }
    }
    if (this.parentNode && this.parentNode.dispatch){
      this.parentNode.dispatch(event);
    }
  }

  subscribe(type, fn, bind) {
    if (typeof type != 'string'){ // listen type / fn with object
      var subscriptions = [];
      for (var t in type) subscriptions.push(this.subscribe(t, type[t]));
      return () => { // unsubscribe
        for (var i = 0, l = subscriptions.length; i < l; i++)
          subscriptions[i]();
        return this;
      };
    } else { // listen to one
      var bound = typeof fn === 'function' ? fn.bind(bind || this) : fn,
        events = this._events || (this._events = {}),
        listeners = events[type] || (events[type] = []);
      listeners.push(bound);
      return () => {
        // unsubscribe
        for (var i = 0, l = listeners.length; i < l; i++){
          if (listeners[i] === bound){
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }
  }
}

export class ContainerDOM extends DummyDOM {
  grab() {
    for (var i = 0; i < arguments.length; i++) arguments[i].inject(this);
    return this;
  }

  empty() {
    var node;
    while (node = this.firstChild) node.eject();
    return this;
  }
}

/*
class ShadowDOM extends DummyDOM {

  inject(container) {
    this.dummy_inject(container);
    this.native_inject(container);
    return this;
  }

  injectBefore(sibling) {
    this.dummy_injectBefore(sibling);
    this.native_injectBefore(sibling);
    return this;
  }

  eject() {
    this.dummy_eject();
    this.native_eject();
    return this;
  }

});

ShadowDOM.prototype.dummy_injectBefore = Dummy.prototype.injectBefore;
ShadowDOM.prototype.native_injectBefore = Native.prototype.injectBefore;

ShadowDOM.prototype.dummy_eject = Dummy.prototype.eject;
ShadowDOM.prototype.native_eject = Native.prototype.eject;

ShadowDOM.prototype.dummy_inject = Dummy.prototype.inject;
ShadowDOM.prototype.native_inject = Native.prototype.inject;
*/

// export default ShadowDOM;
