/*
function Rotate(axis, degrees, shapes, keepOriginal) {
  let rotated = null;
  if (degrees === 0) {
    rotated = new oc.TopoDS_Shape(shapes);
  } else {
    rotated = CacheOp(arguments, () => {
      let newRot;
      let transformation = new oc.gp_Trsf();
      transformation.SetRotation(
        new oc.gp_Ax1(new oc.gp_Pnt(0, 0, 0), new oc.gp_Dir(
          new oc.gp_Vec(axis[0], axis[1], axis[2]))), degrees * 0.0174533);
      let rotation = new oc.TopLoc_Location(transformation);
      if (!isArrayLike(shapes)) {
        newRot = new oc.TopoDS_Shape(shapes.Moved(rotation));
      } else if (shapes.length >= 1) {      // Do the normal rotation
        for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
          shapes[shapeIndex].Move(rotation);
        }
      }
      return newRot;
    });
  }
  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shapes); }
  sceneShapes.push(rotated);
  return rotated;
}
 */
