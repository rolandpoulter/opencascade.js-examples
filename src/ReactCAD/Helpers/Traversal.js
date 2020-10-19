// These foreach functions are not cache friendly right now!
export function ForEachSolid(shape, callback) {
  let solid_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_SOLID);
  for (anExplorer.Init(shape, oc.TopAbs_SOLID); anExplorer.More(); anExplorer.Next()) {
    callback(solid_index++, oc.TopoDS.prototype.Solid(anExplorer.Current()));
  }
}

export function GetNumSolidsInCompound(shape) {
  if (!shape || shape.ShapeType() > 1 || shape.IsNull()) { console.error('Not a compound shape!'); return shape; }
  let solidsFound = 0;
  ForEachSolid(shape, (i, s) => { solidsFound++; });
  return solidsFound;
}

export function GetSolidFromCompound(shape, index, keepOriginal) {
  if (!shape || shape.ShapeType() > 1 || shape.IsNull()) { console.error('Not a compound shape!'); return shape; }
  if (!index) { index = 0;}

  let sol = CacheOp(arguments, () => {
    let innerSolid = {}; let solidsFound = 0;
    ForEachSolid(shape, (i, s) => {
      if (i === index) { innerSolid = new oc.TopoDS_Solid(s); } solidsFound++;
    });
    if (solidsFound === 0) { console.error('NO SOLIDS FOUND IN SHAPE!'); innerSolid = shape; }
    innerSolid.hash = shape.hash + 1;
    return innerSolid;
  });

  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(sol);

  return sol;
}

export function ForEachShell(shape, callback) {
  let shell_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_SHELL);
  for (anExplorer.Init(shape, oc.TopAbs_SHELL); anExplorer.More(); anExplorer.Next()) {
    callback(shell_index++, oc.TopoDS.prototype.Shell(anExplorer.Current()));
  }
}

export function ForEachFace(shape, callback) {
  let face_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_FACE);
  for (anExplorer.Init(shape, oc.TopAbs_FACE); anExplorer.More(); anExplorer.Next()) {
    callback(face_index++, oc.TopoDS.prototype.Face(anExplorer.Current()));
  }
}

export function ForEachWire(shape, callback) {
  let wire_index = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_WIRE);
  for (anExplorer.Init(shape, oc.TopAbs_WIRE); anExplorer.More(); anExplorer.Next()) {
    callback(wire_index++, oc.TopoDS.prototype.Wire(anExplorer.Current()));
  }
}

export function GetWire(shape, index, keepOriginal) {
  if (!shape || shape.ShapeType() > 4 || shape.IsNull()) { console.error('Not a wire shape!'); return shape; }
  if (!index) { index = 0;}

  let wire = CacheOp(arguments, () => {
    let innerWire = {}; let wiresFound = 0;
    ForEachWire(shape, (i, s) => {
      if (i === index) { innerWire = new oc.TopoDS_Wire(s); } wiresFound++;
    });
    if (wiresFound === 0) { console.error('NO WIRES FOUND IN SHAPE!'); innerWire = shape; }
    innerWire.hash = shape.hash + 1;
    return innerWire;
  });

  if (!keepOriginal) { sceneShapes = Remove(sceneShapes, shape); }
  sceneShapes.push(wire);

  return wire;
}

export function ForEachEdge(shape, callback) {
  let edgeHashes = {};
  let edgeIndex = 0;
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_EDGE);
  for (anExplorer.Init(shape, oc.TopAbs_EDGE); anExplorer.More(); anExplorer.Next()) {
    let edge = oc.TopoDS.prototype.Edge(anExplorer.Current());
    let edgeHash = edge.HashCode(100000000);
    if(!edgeHashes.hasOwnProperty(edgeHash)){
      edgeHashes[edgeHash] = edgeIndex;
      callback(edgeIndex++, edge);
    }
  }
  return edgeHashes;
}

export function ForEachVertex(shape, callback) {
  let anExplorer = new oc.TopExp_Explorer(shape, oc.TopAbs_VERTEX);
  for (anExplorer.Init(shape, oc.TopAbs_VERTEX); anExplorer.More(); anExplorer.Next()) {
    callback(oc.TopoDS.prototype.Vertex(anExplorer.Current()));
  }
}
