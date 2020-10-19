import FontLoader from '../Helpers/FontLoader';

/*
function Text3D(text, size, height, fontName) {
  if (!size   ) { size    = 36; }
  if (!height && height !== 0.0) { height  = 0.15; }
  if (!fontName) { fontName = "Consolas"; }

  let textArgs = JSON.stringify(arguments);
  let curText = CacheOp(arguments, () => {
    if (fonts[fontName] === undefined) { argCache = {}; console.log("Font not loaded or found yet!  Try again..."); return; }
    let textFaces = [];
    let commands = fonts[fontName].getPath(text, 0, 0, size).commands;
    for (let idx = 0; idx < commands.length; idx++) {
      if (commands[idx].type === "M") {
        // Start a new Glyph
        var firstPoint = new oc.gp_Pnt(commands[idx].x, commands[idx].y, 0);
        var lastPoint = firstPoint;
        var currentWire = new oc.BRepBuilderAPI_MakeWire();
      } else if (commands[idx].type === "Z") {
        // End the current Glyph and Finish the Path

        let faceBuilder = null;
        if (textFaces.length > 0) {
          faceBuilder = new oc.BRepBuilderAPI_MakeFace(
            textFaces[textFaces.length - 1], currentWire.Wire());
        } else {
          faceBuilder = new oc.BRepBuilderAPI_MakeFace(currentWire.Wire());
        }

        textFaces.push(faceBuilder.Face());
      } else if (commands[idx].type === "L") {
        let nextPoint = new oc.gp_Pnt(commands[idx].x, commands[idx].y, 0);
        if (lastPoint.X() === nextPoint.X() && lastPoint.Y() === nextPoint.Y()) { continue; }
        let lineSegment = new oc.GC_MakeSegment(lastPoint, nextPoint).Value();
        let lineEdge = new oc.BRepBuilderAPI_MakeEdge(lineSegment).Edge();
        currentWire.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge).Wire());
        lastPoint = nextPoint;
      } else if (commands[idx].type === "Q") {
        let controlPoint = new oc.gp_Pnt(commands[idx].x1, commands[idx].y1, 0);
        let nextPoint = new oc.gp_Pnt(commands[idx].x, commands[idx].y, 0);

        let ptList = new oc.TColgp_Array1OfPnt(1, 3);
        ptList.SetValue(1, lastPoint);
        ptList.SetValue(2, controlPoint);
        ptList.SetValue(3, nextPoint);
        let quadraticCurve = new oc.Geom_BezierCurve(ptList);
        let lineEdge = new oc.BRepBuilderAPI_MakeEdge(new oc.Handle_Geom_BezierCurve(quadraticCurve)).Edge();
        currentWire.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge).Wire());

        lastPoint = nextPoint;
      } else if (commands[idx].type === "C") {
        let controlPoint1 = new oc.gp_Pnt(commands[idx].x1, commands[idx].y1, 0);
        let controlPoint2 = new oc.gp_Pnt(commands[idx].x2, commands[idx].y2, 0);
        let nextPoint = new oc.gp_Pnt(commands[idx].x, commands[idx].y, 0);

        let ptList = new oc.TColgp_Array1OfPnt(1, 4);
        ptList.SetValue(1, lastPoint);
        ptList.SetValue(2, controlPoint1);
        ptList.SetValue(3, controlPoint2);
        ptList.SetValue(4, nextPoint);
        let cubicCurve = new oc.Geom_BezierCurve(ptList);
        let lineEdge = new oc.BRepBuilderAPI_MakeEdge(new oc.Handle_Geom_BezierCurve(cubicCurve)).Edge();
        currentWire.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge).Wire());

        lastPoint = nextPoint;
      }
    }

    if (height === 0) {
      return textFaces[textFaces.length - 1];
    } else {
      textFaces[textFaces.length - 1].hash = stringToHash(textArgs);
      let textSolid = Rotate([1, 0, 0], -90, Extrude(textFaces[textFaces.length - 1], [0, 0, height * size]));
      sceneShapes = Remove(sceneShapes, textSolid);
      return textSolid;
    }
  });

  sceneShapes.push(curText);
  return curText;
}
 */
