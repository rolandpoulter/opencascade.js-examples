/*
function Sphere(radius) {
  let curSphere = CacheOp(arguments, () => {
    // Construct a Sphere Primitive
    let spherePlane = new oc.gp_Ax2(new oc.gp_Pnt(0, 0, 0), oc.gp.prototype.DZ());
    return new oc.BRepPrimAPI_MakeSphere(spherePlane, radius).Shape();
  });

  sceneShapes.push(curSphere);
  return curSphere;
}
 */
