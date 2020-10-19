/*
function Extrude(face, direction, keepFace) {
  let curExtrusion = CacheOp(arguments, () => {
    return new oc.BRepPrimAPI_MakePrism(face,
      new oc.gp_Vec(direction[0], direction[1], direction[2])).Shape();
  });

  if (!keepFace) { sceneShapes = Remove(sceneShapes, face); }
  sceneShapes.push(curExtrusion);
  return curExtrusion;
}
 */
