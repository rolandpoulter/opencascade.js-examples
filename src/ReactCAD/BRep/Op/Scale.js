/*
function Scale(scale, shapes, keepOriginal) {
  let scaled = CacheOp(arguments, () => {
    let transformation = new oc.gp_Trsf();
    transformation.SetScaleFactor(scale);
    let scaling = new oc.TopLoc_Location(transformation);
    if (!isArrayLike(shapes)) {
      return new oc.TopoDS_Shape(shapes.Moved(scaling));
    } else if (shapes.length >= 1) {      // Do the normal rotation
      let newScale = [];
      for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
        newScale.push(new oc.TopoDS_Shape(shapes[shapeIndex].Moved(scaling)));
      }
      return newScale;
    }
  });

  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shapes); }
  sceneShapes.push(scaled);

  return scaled;
}
 */
