/*
function Revolve(shape, degrees, direction, keepShape, copy) {
  if (!degrees  ) { degrees   = 360.0; }
  if (!direction) { direction = [0, 0, 1]; }
  let curRevolution = CacheOp(arguments, () => {
    if (degrees >= 360.0) {
      return new oc.BRepPrimAPI_MakeRevol(shape,
        new oc.gp_Ax1(new oc.gp_Pnt(0, 0, 0),
          new oc.gp_Dir(direction[0], direction[1], direction[2])),
        copy).Shape();
    } else {
      return new oc.BRepPrimAPI_MakeRevol(shape,
        new oc.gp_Ax1(new oc.gp_Pnt(0, 0, 0),
          new oc.gp_Dir(direction[0], direction[1], direction[2])),
        degrees * 0.0174533, copy).Shape();
    }
  });

  if (!keepShape) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(curRevolution);
  return curRevolution;
}
 */
