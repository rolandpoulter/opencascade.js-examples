/*
function Transform(translation, rotation, scale, shapes) {
  let args = arguments;
  return CacheOp(arguments, () => {
    if (args.length == 4) {
      // Create the transform gizmo and add it to the scene
      postMessage({ "type": "createTransformHandle", payload: { translation: translation, rotation: rotation, scale: scale, lineAndColumn: getCallingLocation() } });
      // Transform the Object(s)
      return Translate(translation, Rotate(rotation[0], rotation[1], Scale(scale, shapes)));
    } else {
      // Create the transform gizmo and add it to the scene
      postMessage({ "type": "createTransformHandle", payload: { translation: [0, 0, 0], rotation: [[0, 1, 0], 1], scale: 1, lineAndColumn: getCallingLocation() } });
      return translation; // The first element will be the shapes
    }
  });
}
 */
