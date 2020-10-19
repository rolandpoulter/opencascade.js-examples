import { Operation } from '../../Internals/Operation';

export function Translate(props) {
  const {
    // ocLib,
    // addShape,
    // removeShape,
    offset,
    shapes,
    keepOriginal,
    ...otherProps
  } = props;
  let transformation = new ocLib.gp_Trsf();
  transformation.SetTranslation(
    new ocLib.gp_Vec(offset[0], offset[1], offset[2])
  );
  let translation = new ocLib.TopLoc_Location(transformation);
  if (!isArrayLike(shapes)) {
    shapes = new ocLib.TopoDS_Shape(
      shapes.Moved(translation)
    );
  } else if (shapes.length >= 1) {
    // Do the normal translation
    let newTrans = [];
    for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
      newTrans.push(new ocLib.TopoDS_Shape(
        shapes[shapeIndex].Moved(translation)
      ));
    }
    shapes = newTrans;
  }
  // if (!keepOriginal) {
  //   sceneShapes = removeShape(shapes);
  // }
  // debugger;
  // if (props.addShape) {
  //   props.addShape(shapes);
  // }
  debugger
  return (
    <Operation
      // ocLib={ocLib}
      // addShape={addShape}
      // removeShape={removeShape}
      {...otherProps}
      keepOriginal={keepOriginal}
      ocRef={shapes}
    />
  );
}
