/*
function FilletEdges(shape, radius, edgeList, keepOriginal) {
  let curFillet = CacheOp(arguments, () => {
    let mkFillet = new oc.BRepFilletAPI_MakeFillet(shape);
    let foundEdges = 0;
    ForEachEdge(shape, (index, edge) => {
      if (edgeList.includes(index)) { mkFillet.Add(radius, edge); foundEdges++; }
    });
    if (foundEdges == 0) {
      console.error("Fillet Edges Not Found!  Make sure you are looking at the object _before_ the Fillet is applied!");
      return new oc.TopoDS_Solid(shape);
    }
    return new oc.TopoDS_Solid(mkFillet.Shape());
  });
  sceneShapes.push(curFillet);
  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shape); }
  return curFillet;
}
 */
