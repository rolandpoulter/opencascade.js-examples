/*
function BSpline(inPoints, closed) {
  let curSpline = CacheOp(arguments, () => {
    let ptList = new oc.TColgp_Array1OfPnt(1, inPoints.length + (closed ? 1 : 0));
    for (let pIndex = 1; pIndex <= inPoints.length; pIndex++) {
      ptList.SetValue(pIndex, convertToPnt(inPoints[pIndex - 1]));
    }
    if (closed) { ptList.SetValue(inPoints.length + 1, ptList.Value(1)); }

    let geomCurveHandle = new oc.GeomAPI_PointsToBSpline(ptList).Curve();
    let edge = new oc.BRepBuilderAPI_MakeEdge(geomCurveHandle).Edge();
    return     new oc.BRepBuilderAPI_MakeWire(edge).Wire();
  });
  sceneShapes.push(curSpline);
  return curSpline;
}
 */
