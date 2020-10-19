import { Translate } from './Op/Translate';

export function Box(props) {
  const {
    x,
    y,
    z,
    centered,
    ocLib,
  } = props;

  if (!centered) { centered = false;}

  let curBox = CacheOp(arguments, () => {
    // Construct a Box Primitive
    let box = new ocLib.BRepPrimAPI_MakeBox(x, y, z).Shape();
    if (centered) {
      return Translate([-x / 2, -y / 2, -z / 2], box);
    } else {
      return box;
    }
  });

  sceneShapes.push(curBox);
  return curBox;
}
