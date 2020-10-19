import {
  // AmbientLight,
  // DirectionalLight,
  // PerspectiveCamera,
  // Scene,
  // WebGLRenderer,
  Color,
  Geometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  // EdgesGeometry,
  LineBasicMaterial,
  LineSegments,

  Box3,
  BufferGeometry,
  Face3,
  Float32BufferAttribute,
  Fox,
  Vector3,

  // MeshMatcapMaterial,
} from 'three';

import { ForEachFace, ForEachEdge } from './Traversal';

export function _shapeToMesh(
  ocLib,
  shape,
  maxDeviation,
  fullShapeEdgeHashes
) {
  // debugger;

  let faceList = [];
  let edgeList = [];

  // debugger;
  shape = shape || new ocLib.TopoDS_Shape();

  // Set up the Incremental Mesh builder, with a precision
  new ocLib.BRepMesh_IncrementalMesh_2(
    shape,
    maxDeviation,
    false,
    maxDeviation * 5,
    false
  );

  // debugger;

  // Construct the edge hashes to assign proper indices to the edges
  let fullShapeEdgeHashes2 = {};

  // Iterate through the faces and triangulate each one
  let triangulations = [];

  ForEachFace(shape, (faceIndex, myFace) => {
    let aLocation = new ocLib.TopLoc_Location();
    let myT = ocLib.BRep_Tool.prototype.Triangulation(myFace, aLocation);

    if (myT.IsNull()) { console.error('Encountered Null Face!'); return; }

    let this_face = {
      vertex_coord: [],
      normal_coord: [],
      tri_indexes: [],
      number_of_triangles: 0,
      face_index: fullShapeFaceHashes[
        myFace.HashCode(100000000)
      ]
    };

    let pc = new ocLib.Poly_Connect(myT);
    let Nodes = myT.get().Nodes();

    // write vertex buffer
    this_face.vertex_coord = [];
    this_face.vertex_coord.length = Nodes.Length() * 3;
    for(let i = 0; i < Nodes.Length(); i++) {
      let p = Nodes.Value(i + 1).Transformed(aLocation.Transformation());
      this_face.vertex_coord[(i * 3) + 0] = p.X();
      this_face.vertex_coord[(i * 3) + 1] = p.Y();
      this_face.vertex_coord[(i * 3) + 2] = p.Z();
    }

    // write normal buffer
    let myNormal = new ocLib.TColgp_Array1OfDir(Nodes.Lower(), Nodes.Upper());
    let SST = new ocLib.StdPrs_ToolTriangulatedShape();
    SST.Normal(myFace, pc, myNormal);
    this_face.normal_coord = [];
    this_face.normal_coord.length = myNormal.Length() * 3;
    for (let i = 0; i < myNormal.Length(); i++) {
      let d = myNormal.Value(i + 1).Transformed(aLocation.Transformation());
      this_face.normal_coord[(i * 3)+ 0] = d.X();
      this_face.normal_coord[(i * 3)+ 1] = d.Y();
      this_face.normal_coord[(i * 3)+ 2] = d.Z();
    }

    // write triangle buffer
    let orient = myFace.Orientation();
    let triangles = myT.get().Triangles();
    this_face.tri_indexes = [];
    this_face.tri_indexes.length = triangles.Length() * 3;
    let validFaceTriCount = 0;
    for (let nt = 1; nt <= myT.get().NbTriangles(); nt++) {
      let t = triangles.Value(nt);
      let n1 = t.Value(1);
      let n2 = t.Value(2);
      let n3 = t.Value(3);
      if(orient !== ocLib.TopAbs_FORWARD) {
        let tmp = n1;
        n1 = n2;
        n2 = tmp;
      }
      // if(TriangleIsValid(Nodes.Value(1), Nodes.Value(n2), Nodes.Value(n3))) {
        this_face.tri_indexes[(validFaceTriCount * 3) + 0] = n1 - 1;
        this_face.tri_indexes[(validFaceTriCount * 3) + 1] = n2 - 1;
        this_face.tri_indexes[(validFaceTriCount * 3) + 2] = n3 - 1;
        validFaceTriCount++;
      // }
    }
    this_face.number_of_triangles = validFaceTriCount;
    faceList.push(this_face);

    ForEachEdge(myFace, (index, myEdge) => {
      let edgeHash = myEdge.HashCode(100000000);

      if (fullShapeEdgeHashes2.hasOwnProperty(edgeHash)) {
        let this_edge = {
          vertex_coord: [],
          edge_index: -1
        };

        let myP = ocLib.BRep_Tool.prototype.PolygonOnTriangulation(myEdge, myT, aLocation);
        let edgeNodes = myP.get().Nodes();

        // write vertex buffer
        this_edge.vertex_coord = [];
        this_edge.vertex_coord = edgeNodes.Length() * 3;
        for(let j = 0; j < edgeNodes.Length(); j++) {
          let vertexIndex = edgeNodes.Value(j+1);
          this_edge.vertex_coord[(j * 3) + 0] = this_face.vertex_coord[((vertexIndex-1) * 3) + 0];
          this_edge.vertex_coord[(j * 3) + 1] = this_face.vertex_coord[((vertexIndex-1) * 3) + 1];
          this_edge.vertex_coord[(j * 3) + 2] = this_face.vertex_coord[((vertexIndex-1) * 3) + 2];
        }

        this_edge.edge_index = fullShapeEdgeHashes[edgeHash];

        edgeList.push(this_edge);
      } else {
        fullShapeEdgeHashes2[edgeHash] = edgeHash;
      }
    });
    triangulations.push(myT);
  });
  // Nullify Triangulations between runs so they're not stored in the cache
  for (let i = 0; i < triangulations.length; i++) { triangulations[i].Nullify(); }

  // Get the free edges that aren't on any triangulated face/surface
  ForEachEdge(shape, (index, myEdge) => {
    let edgeHash = myEdge.HashCode(100000000);
    if (!fullShapeEdgeHashes2.hasOwnProperty(edgeHash)) {
      let this_edge = {
        vertex_coord: [],
        edge_index: -1
      };

      let aLocation = new ocLib.TopLoc_Location();
      let adaptorCurve = new ocLib.BRepAdaptor_Curve(myEdge);
      let tangDef = new ocLib.GCPnts_TangentialDeflection(adaptorCurve, maxDeviation, 0.1);

      // write vertex buffer
      this_edge.vertex_coord = [];
      this_edge.vertex_coord.length = tangDef.NbPoints() * 3;
      for(let j = 0; j < tangDef.NbPoints(); j++) {
        let vertex = tangDef.Value(j+1).Transformed(aLocation.Transformation());
        this_edge.vertex_coord[(j * 3) + 0] = vertex.X();
        this_edge.vertex_coord[(j * 3) + 1] = vertex.Y();
        this_edge.vertex_coord[(j * 3) + 2] = vertex.Z();
      }

      this_edge.edge_index = fullShapeEdgeHashes[edgeHash];
      fullShapeEdgeHashes2[edgeHash] = edgeHash;

      edgeList.push(this_edge);
    }
  });

  return {
    shape,
    faces: faceList,
    edges: edgeList,
  };
}

export function removeShape(sceneShapes, shape) {
  const index = sceneShapes.indexOf(shape);
  if (index !== -1) {
    sceneShapes.splice(index, 1);
    return shape;
  }
  return null;
};

/**This function accumulates all the shapes in `sceneShapes` into the `TopoDS_Compound` `currentShape`
 * and converts it to a mesh (and a set of edges) with `ShapeToMesh()`, and sends it off to be rendered. */
export function combineAndRenderShapes(
  ocLib,
  sceneShapes,
  maxDeviation,
  shapeToMesh,
) {
  // Initialize currentShape as an empty Compound Solid
  let currentShape = new ocLib.TopoDS_Compound();
  let sceneBuilder = new ocLib.BRep_Builder();

  sceneBuilder.MakeCompound(currentShape);

  let fullShapeEdgeHashes = {};
  let fullShapeFaceHashes = {};

  // If there are sceneShapes, iterate through them and add them to currentShape
  for (let shapeInd = 0; shapeInd < sceneShapes.length; shapeInd++) {
    if (!sceneShapes[shapeInd] || !sceneShapes[shapeInd].IsNull || sceneShapes[shapeInd].IsNull()) {
      console.error('Null Shape detected in sceneShapes; skipping: ' + JSON.stringify(sceneShapes[shapeInd]));
      continue;
    }

    if (!sceneShapes[shapeInd].ShapeType) {
      console.error('Non-Shape detected in sceneShapes; ' +
        'are you sure it is a TopoDS_Shape and not something else that needs to be converted to one?');
      console.error(JSON.stringify(sceneShapes[shapeInd]));
      continue;
    }

    // Scan the edges and faces and add to the edge list
    Object.assign(
      fullShapeEdgeHashes,
      ForEachEdge(
        sceneShapes[shapeInd],
        (index, edge) => { }
      )
    );

    ForEachFace(sceneShapes[shapeInd], (index, face) => {
      fullShapeFaceHashes[face.HashCode(100000000)] = index;
    });

    sceneBuilder.Add(currentShape, sceneShapes[shapeInd]);
  }

  debugger;
  let facesAndEdges = (shapeToMesh || _shapeToMesh)(
    ocLib,
    currentShape,
    maxDeviation || 0.1,
    fullShapeEdgeHashes,
    fullShapeFaceHashes
  );

  return facesAndEdges;
}

export function renderCombinedFacesAndEdged(
  {
    faces,
    edges
  },
  scene,
  previousMainObject,
  {
    material,
    backgroundColor
  }
) {
  if (previousMainObject) {
    scene.remove(previousMainObject);
  }

  const mainObject = new Group();

  try {
    mainObject.name = 'shape';
    mainObject.rotation.x = -Math.PI / 2;

    // Add Triangulated Faces to Object
    let vertices = [];
    let triangles = [];
    let vInd = 0;
    let globalFaceIndex = 0;

    faces.forEach((face) => {
      // Sort Vertices into three.js Vector3 List
      for (let i = 0; i < face.vertex_coord.length; i += 3) {
        vertices.push(
          new Vector3(
            face.vertex_coord[i    ],
            face.vertex_coord[i + 1],
            face.vertex_coord[i + 2]
          )
        );
      }
      // Sort Triangles into a three.js Face List
      for (let i = 0; i < face.tri_indexes.length; i += 3) {
        triangles.push(
          new Face3(
            face.tri_indexes[i    ] + vInd,
            face.tri_indexes[i + 1] + vInd,
            face.tri_indexes[i + 2] + vInd,
            [
              new Vector3(
                face.normal_coord[(face.tri_indexes[i     ] * 3)    ],
                face.normal_coord[(face.tri_indexes[i     ] * 3) + 1],
                face.normal_coord[(face.tri_indexes[i     ] * 3) + 2]
              ),
              new Vector3(
                face.normal_coord[(face.tri_indexes[i + 1 ] * 3)    ],
                face.normal_coord[(face.tri_indexes[i + 1 ] * 3) + 1],
                face.normal_coord[(face.tri_indexes[i + 1 ] * 3) + 2]
              ),
              new Vector3(
                face.normal_coord[(face.tri_indexes[i + 2 ] * 3)    ],
                face.normal_coord[(face.tri_indexes[i + 2 ] * 3) + 1],
                face.normal_coord[(face.tri_indexes[i + 2 ] * 3) + 2]
              )
            ],
            new Color(face.face_index, globalFaceIndex, 0)
          )
        );
      }
      globalFaceIndex++;
      vInd += face.vertex_coord.length / 3;
    });

    // Compile the connected vertices and faces into a model
    // And add to the scene
    let geometry = new Geometry();
    geometry.vertices = vertices;
    geometry.faces = triangles;

    // const metcapMaterial = new MeshMatcapMaterial({
    //   color: new Color(0xf5f5f5),
    //   matcap: this.matcap,
    //   polygonOffset: true, // Push the mesh back for line drawing
    //   polygonOffsetFactor: 2.0,
    //   polygonOffsetUnits: 1.0
    // });
    material = material || new MeshStandardMaterial({
      color: new Color(0xf5f5f5), // new Color(0.9, 0.9, 0.9),
    });

    let model = new Mesh(
      geometry,
      material,
      // matcapMaterial
    );
    // model.castShadow = true;
    model.name = 'ModelFaces';

    mainObject.add(model);
    // End Adding Triangulated Faces

    // Add Highlightable Edges to Object
    // This wild complexity is what allows all of the lines to be drawn in a single draw call
    // AND highlighted on a per-edge basis by the mouse hover.  On the docket for refactoring.
    let lineVertices = [];
    let globalEdgeIndices = [];
    let curGlobalEdgeIndex = 0;
    let edgeVertices = 0;
    let globalEdgeMetadata = {};

    globalEdgeMetadata[-1] = {
      start: -1,
      end: -1
    };

    edges.forEach((edge) => {
      let edgeMetadata = {};
      edgeMetadata.localEdgeIndex = edge.edge_index;
      edgeMetadata.start = globalEdgeIndices.length;
      for (let i = 0; i < edge.vertex_coord.length-3; i += 3) {
        lineVertices.push(
          new Vector3(
            edge.vertex_coord[i    ],
            edge.vertex_coord[i + 1],
            edge.vertex_coord[i + 2]
          )
        );

        lineVertices.push(
          new Vector3(
            edge.vertex_coord[i     + 3],
            edge.vertex_coord[i + 1 + 3],
            edge.vertex_coord[i + 2 + 3]
          )
        );

        globalEdgeIndices.push(curGlobalEdgeIndex);
        globalEdgeIndices.push(curGlobalEdgeIndex);//?
        edgeVertices++;
      }
      edgeMetadata.end = globalEdgeIndices.length - 1;
      globalEdgeMetadata[curGlobalEdgeIndex] = edgeMetadata;
      curGlobalEdgeIndex++;
    });

    let lineGeometry = new BufferGeometry().setFromPoints(lineVertices);
    let lineColors = [];

    for ( let i = 0; i < lineVertices.length; i++ ) {
      lineColors.push( 0, 0, 0 );
    }

    lineGeometry.setAttribute('color', new Float32BufferAttribute(lineColors, 3));

    let lineMaterial = new LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1.5,
      vertexColors: true
    });

    let line = new LineSegments(lineGeometry, lineMaterial);
    line.name = 'ModelEdges';

    // line.lineColors = lineColors;
    // line.globalEdgeMetadata = globalEdgeMetadata;
    // line.globalEdgeIndices = globalEdgeIndices;

    const highlightEdgeAtLineIndex = function (lineIndex) {
      let edgeIndex = lineIndex >= 0 ? globalEdgeIndices[lineIndex] : lineIndex;
      let startIndex = globalEdgeMetadata[edgeIndex].start;
      let endIndex = globalEdgeMetadata[edgeIndex].end;

      for (let i = 0, colIndex; i < lineColors.length; i++) {
        colIndex = Math.floor(i / 3);
        lineColors[i] = (colIndex >= startIndex && colIndex <= endIndex) ? 1 : 0;
      }
      geometry.setAttribute('color', new Float32BufferAttribute(lineColors, 3));
      geometry.colorsNeedUpdate = true;
    }
    line.highlightEdgeAtLineIndex = highlightEdgeAtLineIndex;

    line.getEdgeMetadataAtLineIndex = function (lineIndex) {
      return globalEdgeMetadata[globalEdgeIndices[lineIndex]];
    }.bind(line);

    line.clearHighlights = function () {
      return highlightEdgeAtLineIndex(-1);
    };

    mainObject.add(line);
    // End Adding Highlightable Edges

    // Expand fog distance to enclose the current object; always expand
    //  otherwise you can lose the object if it gets smaller again)
    const boundingBox = new Box3().setFromObject(mainObject);

    const fogDist = Math.max(200, boundingBox.min.distanceTo(boundingBox.max)*1.5);

    scene.fog = new Fog(
      backgroundColor || '#fff',
      fogDist,
      fogDist + 400
    );
    scene.add(mainObject);

    console.log('Generation Complete!');
  } catch (err) {
    console.error('Error', err);
  }

  return mainObject;
}
