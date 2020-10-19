/*
function Cylinder(radius, height, centered) {
  let curCylinder = CacheOp(arguments, () => {
    let cylinderPlane = new oc.gp_Ax2(new oc.gp_Pnt(0, 0, centered ? -height / 2 : 0), new oc.gp_Dir(0, 0, 1));
    return new oc.BRepPrimAPI_MakeCylinder(cylinderPlane, radius, height).Shape();
  });
  sceneShapes.push(curCylinder);
  return curCylinder;
}
 */
