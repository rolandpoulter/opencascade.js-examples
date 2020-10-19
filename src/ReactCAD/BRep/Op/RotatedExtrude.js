/*
function RotatedExtrude(wire, height, rotation, keepWire) {
  if (!wire || wire.IsNull()) { console.error("RotatedExtrude received Null Wire!"); }
  let curExtrusion = CacheOp(arguments, () => {
    let upperPolygon = Rotate([0, 0, 1], rotation, Translate([0, 0, height], wire, true));
    sceneShapes = Remove(sceneShapes, upperPolygon);

    // Define the straight spine going up the middle of the sweep
    let spineWire = BSpline([
      [0, 0, 0],
      [0, 0, height]], false);
    sceneShapes = Remove(sceneShapes, spineWire); // Don't render these

    // Define the guiding helical auxiliary spine (which controls the rotation)
    let steps = 30;
    let aspinePoints = [];
    for (let i = 0; i <= steps; i++) {
      let alpha = i / steps;
      aspinePoints.push([
        20 * Math.sin(alpha * rotation * 0.0174533),
        20 * Math.cos(alpha * rotation * 0.0174533),
        height * alpha]);
    }

    let aspineWire = BSpline(aspinePoints, false);
    sceneShapes = Remove(sceneShapes, aspineWire); // Don't render these

    // Sweep the face wires along the spine to create the extrusion
    let pipe = new oc.BRepOffsetAPI_MakePipeShell(spineWire);
    pipe.SetMode(aspineWire, true);
    pipe.Add(wire);
    pipe.Add(upperPolygon);
    pipe.Build();
    pipe.MakeSolid();
    return new oc.TopoDS_Shape(pipe.Shape());
  });
  if (!keepWire) { sceneShapes = Remove(sceneShapes, wire); }
  sceneShapes.push(curExtrusion);
  return curExtrusion;
}
 */
