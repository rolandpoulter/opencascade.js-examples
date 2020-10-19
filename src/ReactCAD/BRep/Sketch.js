// // This is a utility class for drawing wires/shapes with lines, arcs, and splines
// // This is unique, it needs to be called with the "new" keyword prepended
// function Sketch(startingPoint) {
//   this.currentIndex = 0;
//   this.faces        = [];
//   this.wires        = [];
//   this.firstPoint   = new oc.gp_Pnt(startingPoint[0], startingPoint[1], 0);
//   this.lastPoint    = this.firstPoint;
//   this.wireBuilder  = new oc.BRepBuilderAPI_MakeWire();
//   this.fillets      = [];
//   this.argsString   = ComputeHash(arguments, true);
//
//   // Functions are: BSplineTo, Fillet, Wire, and Face
//   this.Start = function (startingPoint) {
//     this.firstPoint  = new oc.gp_Pnt(startingPoint[0], startingPoint[1], 0);
//     this.lastPoint   = this.firstPoint;
//     this.wireBuilder = new oc.BRepBuilderAPI_MakeWire();
//     this.argsString += ComputeHash(arguments, true);
//     return this;
//   }
//
//   this.End = function (closed, reversed) {
//     this.argsString += ComputeHash(arguments, true);
//
//     if (closed &&
//        (this.firstPoint.X() !== this.lastPoint.X() ||
//         this.firstPoint.Y() !== this.lastPoint.Y())) {
//       this.LineTo(this.firstPoint);
//     }
//
//     let wire = this.wireBuilder.Wire();
//     if (reversed) { wire = wire.Reversed(); }
//     wire.hash = stringToHash(this.argsString);
//     this.wires.push(wire);
//
//     let faceBuilder = null;
//     if (this.faces.length > 0) {
//       faceBuilder = new oc.BRepBuilderAPI_MakeFace(this.wires[0]);
//       for (let w = 1; w < this.wires.length; w++){
//         faceBuilder.Add(this.wires[w]);
//       }
//     } else {
//       faceBuilder = new oc.BRepBuilderAPI_MakeFace(wire);
//     }
//
//     let face = faceBuilder.Face();
//     face.hash = stringToHash(this.argsString);
//     this.faces.push(face);
//     return this;
//   }
//
//   this.Wire = function (reversed) {
//     this.argsString += ComputeHash(arguments, true);
//     //let wire = this.wires[this.wires.length - 1];
//     this.applyFillets();
//     this.faces[this.faces.length - 1].hash = stringToHash(this.argsString);
//     let wire = GetWire(this.faces[this.faces.length - 1]);
//     if (reversed) { wire = wire.Reversed(); }
//     sceneShapes.push(wire);
//     return wire;
//   }
//   this.Face = function (reversed) {
//     this.argsString += ComputeHash(arguments, true);
//     this.applyFillets();
//     let face = this.faces[this.faces.length - 1];
//     if (reversed) { face = face.Reversed(); }
//     face.hash = stringToHash(this.argsString);
//     sceneShapes.push(face);
//     return face;
//   }
//
//   this.applyFillets = function () {
//     // Add Fillets if Necessary
//     if (this.fillets.length > 0) {
//       let successes = 0; let swapFillets = [];
//       for (let f = 0; f < this.fillets.length; f++) { this.fillets[f].disabled = false; }
//
//       // Create Fillet Maker 2D
//       let makeFillet = new oc.BRepFilletAPI_MakeFillet2d(this.faces[this.faces.length - 1]);
//       // TopExp over the vertices
//       ForEachVertex(this.faces[this.faces.length - 1], (vertex) => {
//         // Check if the X and Y coords of any vertices match our chosen fillet vertex
//         let pnt = oc.BRep_Tool.prototype.Pnt(vertex);
//         for (let f = 0; f < this.fillets.length; f++) {
//           if (!this.fillets[f].disabled &&
//               pnt.X() === this.fillets[f].x &&
//               pnt.Y() === this.fillets[f].y ) {
//             // If so: Add a Radius there!
//             makeFillet.AddFillet(vertex, this.fillets[f].radius);
//             this.fillets[f].disabled = true; successes++;
//             break;
//           }
//         }
//       });
//       if (successes > 0) { this.faces[this.faces.length - 1] = makeFillet.Shape(); }
//         else { console.log("Couldn't find any of the vertices to fillet!!"); }
//       this.fillets.concat(swapFillets);
//     }
//   }
//
//   this.AddWire = function (wire) {
//     this.argsString += ComputeHash(arguments, true);
//     // This adds another wire (or edge??) to the currently constructing shape...
//     this.wireBuilder.Add(wire);
//     if (endPoint) { this.lastPoint = endPoint; } // Yike what to do here...?
//     return this;
//   }
//
//   this.LineTo = function (nextPoint) {
//     this.argsString += ComputeHash(arguments, true);
//     let endPoint = null;
//     if (nextPoint.X) {
//       if (this.lastPoint.X() === nextPoint.X() &&
//           this.lastPoint.Y() === nextPoint.Y()) { return this; }
//       endPoint = nextPoint;
//     } else {
//       if (this.lastPoint.X() === nextPoint[0] &&
//           this.lastPoint.Y() === nextPoint[1]) { return this; }
//       endPoint = new oc.gp_Pnt(nextPoint[0], nextPoint[1], 0);
//     }
//     let lineSegment    = new oc.GC_MakeSegment(this.lastPoint, endPoint).Value();
//     let lineEdge       = new oc.BRepBuilderAPI_MakeEdge(lineSegment    ).Edge ();
//     this.wireBuilder.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge       ).Wire ());
//     this.lastPoint     = endPoint;
//     this.currentIndex++;
//     return this;
//   }
//
//   this.ArcTo = function (pointOnArc, arcEnd) {
//     this.argsString += ComputeHash(arguments, true);
//     let onArc          = new oc.gp_Pnt(pointOnArc[0], pointOnArc[1], 0);
//     let nextPoint      = new oc.gp_Pnt(    arcEnd[0],     arcEnd[1], 0);
//     let arcCurve       = new oc.GC_MakeArcOfCircle(this.lastPoint, onArc, nextPoint).Value();
//     let arcEdge        = new oc.BRepBuilderAPI_MakeEdge(arcCurve    ).Edge() ;
//     this.wireBuilder.Add(new oc.BRepBuilderAPI_MakeWire(arcEdge).Wire());
//     this.lastPoint     = nextPoint;
//     this.currentIndex++;
//     return this;
//   }
//
//   // Constructs an order-N Bezier Curve where the first N-1 points are control points
//   // and the last point is the endpoint of the curve
//   this.BezierTo = function (bezierControlPoints) {
//     this.argsString += ComputeHash(arguments, true);
//     let ptList = new oc.TColgp_Array1OfPnt(1, bezierControlPoints.length+1);
//     ptList.SetValue(1, this.lastPoint);
//     for (let bInd = 0; bInd < bezierControlPoints.length; bInd++){
//       let ctrlPoint = convertToPnt(bezierControlPoints[bInd]);
//       ptList.SetValue(bInd + 2, ctrlPoint);
//       this.lastPoint = ctrlPoint;
//     }
//     let cubicCurve     = new oc.Geom_BezierCurve(ptList);
//     let handle         = new oc.Handle_Geom_BezierCurve(cubicCurve);
//     let lineEdge       = new oc.BRepBuilderAPI_MakeEdge(handle    ).Edge() ;
//     this.wireBuilder.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge  ).Wire());
//     this.currentIndex++;
//     return this;
//   }
//
//   /* Constructs a BSpline from the previous point through this set of points */
//   this.BSplineTo = function (bsplinePoints) {
//     this.argsString += ComputeHash(arguments, true);
//     let ptList = new oc.TColgp_Array1OfPnt(1, bsplinePoints.length+1);
//     ptList.SetValue(1, this.lastPoint);
//     for (let bInd = 0; bInd < bsplinePoints.length; bInd++){
//       let ctrlPoint = convertToPnt(bsplinePoints[bInd]);
//       ptList.SetValue(bInd + 2, ctrlPoint);
//       this.lastPoint = ctrlPoint;
//     }
//     let handle         = new oc.GeomAPI_PointsToBSpline(ptList  ).Curve();
//     let lineEdge       = new oc.BRepBuilderAPI_MakeEdge(handle  ).Edge() ;
//     this.wireBuilder.Add(new oc.BRepBuilderAPI_MakeWire(lineEdge).Wire());
//     this.currentIndex++;
//     return this;
//   }
//
//   this.Fillet = function (radius) {
//     this.argsString += ComputeHash(arguments, true);
//     this.fillets.push({ x: this.lastPoint.X(), y: this.lastPoint.Y(), radius: radius });
//     return this;
//   }
//
//   this.Circle = function (center, radius, reversed) {
//     this.argsString += ComputeHash(arguments, true);
//     let circle = new oc.GC_MakeCircle(new oc.gp_Ax2(convertToPnt(center),
//     new oc.gp_Dir(0, 0, 1)), radius).Value();
//     let edge = new oc.BRepBuilderAPI_MakeEdge(circle).Edge();
//     let wire = new oc.BRepBuilderAPI_MakeWire(edge).Wire();
//     if (reversed) { wire = wire.Reversed(); }
//     wire.hash = stringToHash(this.argsString);
//     this.wires.push(wire);
//
//     let faceBuilder = null;
//     if (this.faces.length > 0) {
//       faceBuilder = new oc.BRepBuilderAPI_MakeFace(this.wires[0]);
//       for (let w = 1; w < this.wires.length; w++){
//         faceBuilder.Add(this.wires[w]);
//       }
//     } else {
//       faceBuilder = new oc.BRepBuilderAPI_MakeFace(wire);
//     }
//     let face = faceBuilder.Face();
//     face.hash = stringToHash(this.argsString);
//     this.faces.push(face);
//     return this;
//   }
// }
