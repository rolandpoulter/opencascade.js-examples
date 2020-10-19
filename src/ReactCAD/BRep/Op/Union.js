/*
// TODO: These ops can be more cache optimized since they're multiple sequential ops
function Union(objectsToJoin, keepObjects, fuzzValue, keepEdges) {
  if (!fuzzValue) { fuzzValue = 0.1; }
  let curUnion = CacheOp(arguments, () => {
    let combined = new oc.TopoDS_Shape(objectsToJoin[0]);
    if (objectsToJoin.length > 1) {
      for (let i = 0; i < objectsToJoin.length; i++) {
        if (i > 0) {
          let combinedFuse = new oc.BRepAlgoAPI_Fuse(combined, objectsToJoin[i]);
          combinedFuse.SetFuzzyValue(fuzzValue);
          combinedFuse.Build();
          combined = combinedFuse.Shape();
        }
      }
    }

    if (!keepEdges) {
      let fusor = new oc.ShapeUpgrade_UnifySameDomain(combined); fusor.Build();
      combined = fusor.Shape();
    }

    return combined;
  });

  for (let i = 0; i < objectsToJoin.length; i++) {
    if (!keepObjects) { sceneShapes = Remove(sceneShapes, objectsToJoin[i]); }
  }
  sceneShapes.push(curUnion);
  return curUnion;
}
*/
