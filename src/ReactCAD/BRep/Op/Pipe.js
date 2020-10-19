/*
function Pipe(shape, wirePath, keepInputs) {
  let curPipe = CacheOp(arguments, () => {
    let pipe = new oc.BRepOffsetAPI_MakePipe(wirePath, shape);
    pipe.Build();
    return new oc.TopoDS_Shape(pipe.Shape());
  });

  if (!keepInputs) {
    sceneShapes = Remove(sceneShapes, shape);
    sceneShapes = Remove(sceneShapes, wirePath);
  }
  sceneShapes.push(curPipe);
  return curPipe;
}
 */
