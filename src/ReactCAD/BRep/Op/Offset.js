/*
function Offset(shape, offsetDistance, tolerance, keepShape) {
  if (!shape || shape.IsNull()) { console.error("Offset received Null Shape!"); }
  if (!tolerance) { tolerance = 0.1; }
  if (offsetDistance === 0.0) { return shape; }
  let curOffset = CacheOp(arguments, () => {
    let offset = null;
    if (shape.ShapeType() === 5) {
      offset = new oc.BRepOffsetAPI_MakeOffset();
      offset.AddWire(shape);
      offset.Perform(offsetDistance);
    } else {
      offset = new oc.BRepOffsetAPI_MakeOffsetShape();
      offset.PerformByJoin(shape, offsetDistance, tolerance);
    }
    return new oc.TopoDS_Shape(offset.Shape());
  });

  if (!keepShape) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(curOffset);
  return curOffset;
}
 */
