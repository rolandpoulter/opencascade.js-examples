/*
function Circle(radius, wire) {
  let curCircle = CacheOp(arguments, () => {
    let circle = new oc.GC_MakeCircle(new oc.gp_Ax2(new oc.gp_Pnt(0, 0, 0),
      new oc.gp_Dir(0, 0, 1)), radius).Value();
    let edge = new oc.BRepBuilderAPI_MakeEdge(circle).Edge();
    let circleWire = new oc.BRepBuilderAPI_MakeWire(edge).Wire();
    if (wire) { return circleWire; }
    return new oc.BRepBuilderAPI_MakeFace(circleWire).Face();
  });
  sceneShapes.push(curCircle);
  return curCircle;
}
 */
