/*
function Intersection(objectsToIntersect, keepObjects, fuzzValue, keepEdges) {
  if (!fuzzValue) { fuzzValue = 0.1; }
  let curIntersection = CacheOp(arguments, () => {
    let intersected = new oc.TopoDS_Shape(objectsToIntersect[0]);
    if (objectsToIntersect.length > 1) {
      for (let i = 0; i < objectsToIntersect.length; i++) {
        if (i > 0) {
          let intersectedCommon = new oc.BRepAlgoAPI_Common(intersected, objectsToIntersect[i]);
          intersectedCommon.SetFuzzyValue(fuzzValue);
          intersectedCommon.Build();
          intersected = intersectedCommon.Shape();
        }
      }
    }

    if (!keepEdges) {
      let fusor = new oc.ShapeUpgrade_UnifySameDomain(intersected); fusor.Build();
      intersected = fusor.Shape();
    }

    return intersected;
  });

  for (let i = 0; i < objectsToIntersect.length; i++) {
    if (!keepObjects) { sceneShapes = Remove(sceneShapes, objectsToIntersect[i]); }
  }
  sceneShapes.push(curIntersection);
  return curIntersection;
}
 */
