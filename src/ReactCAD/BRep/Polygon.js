import { Shape } from '../Internals/Shape';

export function Polygon(props) {
  const {
    points,
    wire,
    ...otherProps
  } = props;
  const gpPoints = [];
  for (let ind = 0; ind < points.length; ind++) {
    gpPoints.push(
      convertToPnt(points[ind])
    );
  }
  let polygonWire = new ocLib.BRepBuilderAPI_MakeWire();
  for (let ind = 0; ind < points.length - 1; ind++) {
    let seg = new ocLib.GC_MakeSegment(
      gpPoints[ind],
      gpPoints[ind + 1]
    ).Value();
    let edge = new ocLib.BRepBuilderAPI_MakeEdge(seg).Edge();
    let innerWire = new ocLib.BRepBuilderAPI_MakeWire(edge).Wire();
    polygonWire.Add(innerWire);
  }
  let seg2 = new ocLib.GC_MakeSegment(
    gpPoints[points.length - 1],
    gpPoints[0]
  ).Value();
  let edge2 = new ocLib.BRepBuilderAPI_MakeEdge(seg2).Edge();
  let innerWire2 = new ocLib.BRepBuilderAPI_MakeWire(edge2).Wire();
  polygonWire.Add(innerWire2);
  let finalWire = polygonWire.Wire();
  // debugger;
  return (
    <Shape
      // ocLib={ocLib}
      // addShape={addShape}
      // removeShape={removeShape}
      {...otherProps}
      ocRef={
        wire
          ? finalWire
          : new ocLib.BRepBuilderAPI_MakeFace(finalWire).Face()
      }
    />
  );
}
