let edgeColorDict = [
  ["white", "blue"],
  ["white", "red"],
  ["white", "green"],
  ["white", "orange"],
  ["green", "red"],
  ["green", "orange"],
  ["blue", "red"],
  ["blue", "orange"],
  ["yellow", "green"],
  ["yellow", "red"],
  ["yellow", "blue"],
  ["yellow", "orange"]
]
let edgePositionDict = [
  [[0, 1.5, -1], [0, 1, -1.5]],
  [[1, 1.5, 0], [1.5, 1, 0]],
  [[0, 1.5, 1], [0, 1, 1.5]],
  [[-1, 1.5, 0], [-1.5, 1, 0]],

  [[1, 0, 1.5], [1.5, 0, 1]],
  [[-1, 0, 1.5], [-1.5, 0, 1]],
  [[1, 0, -1.5], [1.5, 0, -1]],
  [[-1, 0, -1.5], [-1.5, 0, -1]],

  [[0, -1.5, 1], [0, -1, 1.5]],
  [[1, -1.5, 0], [1.5, -1, 0]],
  [[0, -1.5, -1], [0, -1, -1.5]],
  [[-1, -1.5, 0], [-1.5, -1, 0]]
]
let edgeRotationDict = [
  [[Math.PI * 1.5, 0, 0], [0, Math.PI, 0]],
  [[Math.PI * 1.5, 0, 0], [0, Math.PI * 0.5, 0]],
  [[Math.PI * 1.5, 0, 0], [0, 0, 0]],
  [[Math.PI * 1.5, 0, 0], [0, Math.PI * 1.5, 0]],

  [[0, 0, 0], [0, Math.PI * 0.5, 0]],
  [[0, 0, 0], [0, Math.PI * 1.5, 0]],
  [[Math.PI, 0, 0], [0, Math.PI * 0.5, 0]],
  [[Math.PI, 0, 0], [0, Math.PI * 1.5, 0]],
  
  [[Math.PI * 0.5, 0, 0], [0, 0, 0]],
  [[Math.PI * 0.5, 0, 0], [0, Math.PI * 0.5, 0]],
  [[Math.PI * 0.5, 0, 0], [0, Math.PI, 0]],
  [[Math.PI * 0.5, 0, 0], [0, Math.PI * 1.5, 0]]
]
let cornerColorDict = [
  ["white", "orange", "blue"],
  ["white", "blue", "red"],
  ["white", "red", "green"],
  ["white", "green", "orange"],
  ["yellow", "orange", "green"],
  ["yellow", "green", "red"],
  ["yellow", "red", "blue"],
  ["yellow", "blue", "orange"]
]
let cornerRotationDict = [
  [[Math.PI * 1.5, 0, 0], [0, Math.PI * 1.5, 0], [0, Math.PI, 0]],
  [[Math.PI * 1.5, 0, 0], [0, Math.PI, 0], [0, Math.PI * 0.5, 0]],
  [[Math.PI * 1.5, 0, 0], [0, Math.PI * 0.5, 0], [0, 0, 0]],
  [[Math.PI * 1.5, 0, 0], [0, 0, 0], [0, Math.PI * 1.5, 0]],

  [[Math.PI * 0.5, 0, 0], [0, Math.PI * 1.5, 0], [0, 0, 0]],
  [[Math.PI * 0.5, 0, 0], [0, 0, 0], [0, Math.PI * 0.5, 0]],
  [[Math.PI * 0.5, 0, 0], [0, Math.PI * 0.5, 0], [0, Math.PI, 0]],
  [[Math.PI * 0.5, 0, 0], [0, Math.PI, 0], [0, Math.PI * 1.5, 0]]
]
let cornerPositionDict = [
  [[-1, 1.5, -1], [-1.5, 1, -1], [-1, 1, -1.5]],
  [[1, 1.5, -1], [1, 1, -1.5], [1.5, 1, -1]],
  [[1, 1.5, 1], [1.5, 1, 1], [1, 1, 1.5]],
  [[-1, 1.5, 1], [-1, 1, 1.5], [-1.5, 1, 1]],

  [[-1, -1.5, 1], [-1.5, -1, 1], [-1, -1, 1.5]],
  [[1, -1.5, 1], [1, -1, 1.5], [1.5, -1, 1]],
  [[1, -1.5, -1], [1.5, -1, -1], [1, -1, -1.5]],
  [[-1, -1.5, -1], [-1, -1, -1.5], [-1.5, -1, -1]]
]
let centerPositionDict = [
  [0, 1.5, 0],
  [0, 0, 1.5],
  [1.5, 0, 0],
  [0, 0, -1.5],
  [-1.5, 0, 0],
  [0, -1.5, 0]
]
let centerRotationDict = [
  [Math.PI * 1.5, 0, 0],
  [0, 0, 0],
  [0, Math.PI * 0.5, 0],
  [0, Math.PI, 0],
  [0, Math.PI * 1.5, 0],
  [Math.PI * 0.5, 0, Math.PI],
]
let centerColorDict = [
  "white",
  "green",
  "red",
  "blue",
  "orange",
  "yellow"
]


let stickerScale = 0.85

function renderCube(cube){
  if(!cube){return(console.log("which cube?"))}
  let geometry = new THREE.PlaneGeometry(1 * stickerScale, 1 * stickerScale)
  let material = new THREE.MeshStandardMaterial({color: 0x00aaff})
    
  let plane = new THREE.Mesh(geometry, material);

  let colors = {
    white:  0xffffff,
    yellow: 0xffee00,
    red:    0xff0000,
    orange: 0xff5500,
    green:  0x00ff00,
    blue:   0x0000ff
  }


  for(let i in cube.edges){
    let edge = cube.edges[i]
    let planes = new Array(2).fill().map(()=>plane.clone())

    let edgeColors = edgeColorDict[edge[0]]
    let edgePositions = edgePositionDict[i]
    let edgeRotations = edgeRotationDict[i]
    if(edge[1]==1){
      edgeColors = [...edgeColors].reverse()
    }

    planes.map((x,i)=>x.material = new THREE.MeshStandardMaterial({color: colors[edgeColors[i]], side: THREE.DoubleSide}))

    // planes.map((x,i)=>x.material.side = THREE.DoubleSide)

    planes.map((x,i)=>x.position.set(...edgePositions[i]))
    planes.map((x,i)=>x.rotation.set(...edgeRotations[i]))


    let offsets = edgeRotationOffsets[i]
    for(let offset of offsets){
      offset = rotation[offset]

      planes.map(x=>{
        x.rotateOnWorldAxis(offset.dir, offset.angle)
        x.position.applyAxisAngle(offset.dir, offset.angle)
      })
    }

    planes.map(x=>scene.add(x))

  }
  for(let i in cube.corners){
    let corner = cube.corners[i]
    let planes = new Array(3).fill().map(()=>plane.clone())
    let cornerColors = cornerColorDict[corner[0]]

    if(corner[1]==1){
      cornerColors = [cornerColors[2], cornerColors[0], cornerColors[1]]
    }else if(corner[1]==2){
      cornerColors = [cornerColors[1], cornerColors[2], cornerColors[0]]
    }

    planes.map((x,j)=>x.material = new THREE.MeshStandardMaterial({color: colors[cornerColors[j]], side: THREE.DoubleSide}))
  
    // planes.map((x,i)=>x.material.side = THREE.DoubleSide)

    planes.map((x,j)=>x.position.set(...cornerPositionDict[i][j]))
    planes.map((x,j)=>x.rotation.set(...cornerRotationDict[i][j]))


    let offsets = cornerRotationOffsets[i]
    for(let offset of offsets){
      offset = rotation[offset]

      planes.map(x=>{
        x.rotateOnWorldAxis(offset.dir, offset.angle)
        x.position.applyAxisAngle(offset.dir, offset.angle)
      })
    }

    planes.map(x=>scene.add(x))

  }
  for(let i = 0; i < 6; i++){
    let plane1 = plane.clone()
    plane1.material = new THREE.MeshStandardMaterial({color: colors[centerColorDict[i]], side: THREE.DoubleSide})

    plane1.position.set(...centerPositionDict[i])
    plane1.rotation.set(...centerRotationDict[i])

    let offset = rotation[centerRotationOffsets[i]]
    plane1.rotateOnWorldAxis(offset.dir, offset.angle)
    plane1.position.applyAxisAngle(offset.dir, offset.angle)
    
    scene.add(plane1)
  }


}