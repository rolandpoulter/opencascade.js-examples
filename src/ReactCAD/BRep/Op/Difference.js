/*
function Difference(mainBody, objectsToSubtract, keepObjects, fuzzValue, keepEdges) {
  if (!fuzzValue) { fuzzValue = 0.1; }
  let curDifference = CacheOp(arguments, () => {
    if (!mainBody || mainBody.IsNull()) { console.error("Main Shape in Difference is null!"); }

    let difference = new oc.TopoDS_Shape(mainBody);
    if (objectsToSubtract.length >= 1) {
      for (let i = 0; i < objectsToSubtract.length; i++) {
        if (!objectsToSubtract[i] || objectsToSubtract[i].IsNull()) { console.error("Tool in Difference is null!"); }
        let differenceCut = new oc.BRepAlgoAPI_Cut(difference, objectsToSubtract[i]);
        differenceCut.SetFuzzyValue(fuzzValue);
        differenceCut.Build();
        difference = differenceCut.Shape();
      }
    }

    if (!keepEdges) {
      let fusor = new oc.ShapeUpgrade_UnifySameDomain(difference); fusor.Build();
      difference = fusor.Shape();
    }

    difference.hash = ComputeHash(arguments);
    if (GetNumSolidsInCompound(difference) === 1) {
      difference = GetSolidFromCompound(difference, 0);
    }

    return difference;
  });

  if (!keepObjects) { sceneShapes = Remove(sceneShapes, mainBody); }
  for (let i = 0; i < objectsToSubtract.length; i++) {
    if (!keepObjects) { sceneShapes = Remove(sceneShapes, objectsToSubtract[i]); }
  }
  sceneShapes.push(curDifference);
  return curDifference;
}
*/
