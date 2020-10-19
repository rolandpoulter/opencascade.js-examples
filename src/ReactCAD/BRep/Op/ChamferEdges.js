/*
function ChamferEdges(shape, distance, edgeList, keepOriginal) {
  let curChamfer = CacheOp(arguments, () => {
    let mkChamfer = new oc.BRepFilletAPI_MakeChamfer(shape);
    let foundEdges = 0;
    ForEachEdge(shape, (index, edge) => {
      if (edgeList.includes(index)) { mkChamfer.Add(distance, edge); foundEdges++; }
    });
    if (foundEdges == 0) {
      console.error("Chamfer Edges Not Found!  Make sure you are looking at the object _before_ the Chamfer is applied!");
      return new oc.TopoDS_Solid(shape);
    }
    return new oc.TopoDS_Solid(mkChamfer.Shape());
  });
  sceneShapes.push(curChamfer);
  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shape); }
  return curChamfer;
}
 */
