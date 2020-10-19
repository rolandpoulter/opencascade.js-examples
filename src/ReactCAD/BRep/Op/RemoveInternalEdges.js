/*
function RemoveInternalEdges(shape, keepShape) {
  let cleanShape = CacheOp(arguments, () => {
    let fusor = new oc.ShapeUpgrade_UnifySameDomain(shape);
    fusor.Build();
    return fusor.Shape();
  });

  if (!keepShape) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(cleanShape);
  return cleanShape;
}
*/
