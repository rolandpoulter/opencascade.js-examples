/*
function Loft(wires, keepWires) {
  let curLoft = CacheOp(arguments, () => {
    let pipe = new oc.BRepOffsetAPI_ThruSections(true);

    // Construct a Loft that passes through the wires
    wires.forEach((wire) => { pipe.AddWire(wire); });

    pipe.Build();
    return new oc.TopoDS_Shape(pipe.Shape());
  });

  wires.forEach((wire) => {
    if (!keepWires) { sceneShapes = Remove(sceneShapes, wire); }
  });
  sceneShapes.push(curLoft);
  return curLoft;
}
*/
