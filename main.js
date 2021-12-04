let scene
let camera
let renderer
let mouse = {x: 0, y: 0}
let controls
let material
let ambientLight
let directionalLight


var doAnimate = true


let clock = new THREE.Clock();


let theCube
let animationTime = 20

let rotateDict = {
  "right": {
    "edges": [[1, 0], [6, 0], [9, 0], [4, 0]],
    "corners": [[1, 1], [6, 2], [5 ,1], [2, 2]]
  },
  "left": {
    "edges": [[3, 0], [5, 0], [11, 0], [7, 0]],
    "corners": [[0, 2], [3, 1], [4 ,2], [7, 1]]
  },
  "up": {
    "edges": [[0, 0], [1, 0], [2, 0], [3, 0]],
    "corners": [[0, 0], [1, 0], [2 ,0], [3, 0]]
  },
  "down": {
    "edges": [[8, 0], [9, 0], [10, 0], [11, 0]],
    "corners": [[4, 0], [5, 0], [6 ,0], [7, 0]]
  },
  "front": {
    "edges": [[2, 1], [4, 1], [8, 1], [5, 1]],
    "corners": [[3, 2], [2, 1], [5 ,2], [4, 1]]
  },
  "back": {
    "edges": [[0, 1], [7, 1], [10, 1], [6, 1]],
    "corners": [[1, 2], [0, 1], [7 ,2], [6, 1]]
  }
}
edgeRotationOffsets = [
  ["up", "back"],
  ["up", "right"],
  ["up", "front"],
  ["up", "left"],
  ["front", "right"],
  ["front", "left"],
  ["back", "right"],
  ["back", "left"],
  ["down", "front"],
  ["down", "right"],
  ["down", "back"],
  ["down", "left"]
]
cornerRotationOffsets = [
  ["up", "left", "back"],
  ["up", "back", "right"],
  ["up", "right", "front"],
  ["up", "front", "left"],
  ["down", "left", "front"],
  ["down", "front", "right"],
  ["down", "right", "back"],
  ["down", "back", "left"]
]
centerRotationOffsets = [
  "up",
  "front",
  "right",
  "back",
  "left",
  "down"
]
let rotation = {
  "right": {
    angle: 0,
    dir: new THREE.Vector3(1, 0, 0)
  },
  "left": {
    angle: 0,
    dir: new THREE.Vector3(-1, 0, 0)
  },
  "up": {
    angle: 0,
    dir: new THREE.Vector3(0, 1, 0)
  },
  "down": {
    angle: 0,
    dir: new THREE.Vector3(0, -1, 0)
  },
  "front": {
    angle: 0,
    dir: new THREE.Vector3(0, 0, 1)
  },
  "back": {
    angle: 0,
    dir: new THREE.Vector3(0, 0, -1)
  }
}

class Cube{
  constructor(){
    this.edges
    this.corners
    this.resetCube()
  }
  resetCube(){
    let edges = []
    let corners = []
    for(let i=0;i<12;i++){
      edges.push([i,0])
    }
    for(let i=0;i<8;i++){
      corners.push([i,0])
    }
    this.edges = edges
    this.corners = corners
    resetScene()
    return({edges: edges, corners: corners})
  }
  rotate(side = "right", turn = 1){
    if(rotateDict[side]){
      
      if(doAnimate) animateRotation(side, turn * Math.PI * 0.5 - Math.PI, animationTime)
      
      let matrix = rotateDict[side]
      let newEdges = matrix.edges.map(index=>this.edges[index[0]])

      let newCorners = matrix.corners.map(index=>this.corners[index[0]])

      for(let i = 0; i < turn; i++){
        newEdges = [newEdges[newEdges.length - 1], ...newEdges.slice(0, newEdges.length - 1)].map((p,i)=>[p[0], (p[1]+matrix.edges[i][1])%2]) // edges

        newCorners = [newCorners[newCorners.length - 1], ...newCorners.slice(0, newCorners.length - 1)].map((p,i)=>[p[0], (p[1]+matrix.corners[i][1])%3]) // corners
      }

      matrix.edges.map((x,i)=>this.edges[x[0]] = newEdges[i])
      matrix.corners.map((x,i)=>this.corners[x[0]] = newCorners[i])

    }
    resetScene()
  }
  applyMoves(algoritm){
    for(let move of algoritm.split(" ")){
      let side = {
        "U": "up",
        "D": "down",
        "R": "right",
        "L": "left",
        "F": "front",
        "B": "back"
      }[move[0]]

      let times = {
        undefined: 1,
        "2": 2,
        "'": 3,
        "3": 3
      }[move[1]]

      this.rotate(side, times)

    }
  }


  get perm(){
    return(this.edges.map(x=>x[0].toString(16)).join("")+this.corners.map(x=>x[0]).join("")+this.edgeor()+this.corneror())
  }
  edgeor(){
    return(parseInt(this.edges.map(x=>x[1]).join(""),2).toString(20).padStart(3,"0"))
  }
  corneror(){
    return(parseInt(this.corners.map(x=>x[1]).join(""),3).toString(20).padStart(3,"0"))
  }
  resetFrom(str){
    let edgep = str.slice(0,12).split("").map(x=>parseInt(x,20))
    let cornerp = str.slice(12,8).split("").map(x=>parseInt(x,20))
    console.log(edgep)
    console.log(cornerp)
  }
}

init()
animate()
function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, window.innerWidth / (window.innerHeight), 0.1, 1000);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, (window.innerHeight));
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.getElementById("webgl").appendChild(renderer.domElement);

	material = new THREE.MeshBasicMaterial({color:0xffff00});
	material = new THREE.MeshLambertMaterial({color:0xffff00});

	camera.position.z = 5;
	
	ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
	directionalLight.position.set(1,2,0.5)
	
	pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 1, 100);
	
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(pointLight);
	
	controls = new THREE.OrbitControls(camera, renderer.domElement)
	controls.rotateSpeed = 0.5

  theCube = new Cube()

  resetScene()

}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}
function keyUp(event){
	let key = event.which || event.keyCode
	keys[key] = false
}
plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

function animate(){
  let delta = clock.getDelta()
  requestAnimationFrame(animate); 

  controls.update()
  renderer.render(scene, camera);
}
function resetScene(){
  //scene = new THREE.Scene();
  scene.remove.apply(scene, scene.children);
  scene.add(ambientLight);
  scene.add(directionalLight);
  scene.add(pointLight);
  renderCube(theCube)
}

function animateRotation(side = "right", target = 0, time = 10){
  tempfunc = (times) => {
    if(times > 0){
      rotation[side].angle += target / time
      resetScene()
      setTimeout(tempfunc, clock.getDelta(), times-1)
    }else{
      rotation[side].angle = 0
      resetScene()
    }
  }
  resetAngles()
  rotation[side].angle = -target
  tempfunc(time)
}
function resetAngles(){
  for(let side in rotation){
    rotation[side].angle = 0
  }
  resetScene()
}

function keyDown(event){
  const key = event.key
  switch(key){
    case "e":
      theCube.rotate("left", 3)
      break
    case "d":
      theCube.rotate("left", 1)
      break
    case "i":
      theCube.rotate("right", 1)
      break
    case "k":
      theCube.rotate("right", 3)
      break
    case "f":
      theCube.rotate("up", 3)
      break
    case "j":
      theCube.rotate("up", 1)
      break
    case "g":
      theCube.rotate("front", 3)
      break
    case "h":
      theCube.rotate("front", 1)
      break
    case "s":
      theCube.rotate("down", 1)
      break
    case "l":
      theCube.rotate("down", 3)
      break
    case "w":
      theCube.rotate("back", 1)
      break
    case "o":
      theCube.rotate("back", 3)
      break
  }
}

window.addEventListener("resize", onWindowResize, false)
//document.addEventListener('mousemove', mouseMoved, false);
//document.addEventListener("keydown", keyDown, false);
document.onkeydown = keyDown;
//document.onkeyup = keyUp;