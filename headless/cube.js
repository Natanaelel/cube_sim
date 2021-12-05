/*
  example program:

  cube = new Cube()
  cube.scramble()

  args = cube.getState()

  output = runCode(args)

  return cube.applyMoves(output).isSolved()

*/


class Cube{
  constructor(){
    this.rotateDict = {
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
    this.reset()
  }
  reset(){
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

    return this
  }
  rotate(side, turn){
    
    if(!this.rotateDict[side]) return "invalid side"
    if(!turn) return                  "invalid turn"

    let matrix = this.rotateDict[side]
    let newEdges = matrix.edges.map(index=>this.edges[index[0]])

    let newCorners = matrix.corners.map(index=>this.corners[index[0]])

    for(let i = 0; i < turn; i++){
      newEdges = [newEdges[newEdges.length - 1], ...newEdges.slice(0, newEdges.length - 1)].map((p,i)=>[p[0], (p[1]+matrix.edges[i][1])%2]) // edges

      newCorners = [newCorners[newCorners.length - 1], ...newCorners.slice(0, newCorners.length - 1)].map((p,i)=>[p[0], (p[1]+matrix.corners[i][1])%3]) // corners
    }

    matrix  .edges.map((x,i)=>this  .edges[x[0]] =   newEdges[i])
    matrix.corners.map((x,i)=>this.corners[x[0]] = newCorners[i])
    return this
  }

  applyMoves(moves){ // "R U' F2"...
    for(let move of moves.split(" ")){
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
        "'": 3
      }[move[1]]

      this.rotate(side, times)
    }
    return this
  }

  scramble(){
    let moves = []
    for(let i = 0; i < 100; i++){
        let side = "UFRBLD"[Math.floor((Math.random() * 6))]
        let times = ["'", "2", ""][Math.floor(Math.random() * 3)]
        moves.push(side + times)
    }
    this.applyMoves(moves.join(" "))
    return this
  }

  isSolved(){
    return getState().join("").replace(/[^WGRBOY]/g,"") == "WWWWWWWWWOOOGGGRRRBBBOOOGGGRRRBBBOOOGGGRRRBBBYYYYYYYYY"
  }

  getState(){

    let state = Array(9).fill().map(_=>Array(12).fill(" "))
    
    let set = (side, x, y, color) => {

        let [xoff, yoff] = [[3, 0], [3, 3], [6, 3], [9, 3], [0, 3], [3, 6]][side]
        state[yoff + y][xoff + x] = color
    }


    let edgeColors = "WB WR WG WO GR GO BR BO YG YR YB YO".split(" ")
    let cornerColors = "WOB WBR WRG WGO YOG YGR YRB YBO".split(" ")    

    let getEdgeColor = (ind, rot) => edgeColors[this.edges[ind][0]][(this.edges[ind][1] + rot) % 2]

    let getCornerColor = (ind, rot) => cornerColors[this.corners[ind][0]][(3 + rot - this.corners[ind][1]) % 3]

    // color the centers
    for(let i = 0; i < 6; i++) set(i, 1, 1, "WGRBOY"[i])

    // color the edges
    ;[
      [0, 1, 0, 0, 0], [0, 2, 1, 1, 0], [0, 1, 2, 2, 0], [0, 0, 1, 3, 0],
      [1, 2, 1, 4, 0], [1, 0, 1, 5, 0], [3, 0, 1, 6, 0], [3, 2, 1, 7, 0],
      [5, 1, 0, 8, 0], [5, 2, 1, 9, 0], [5, 1, 2,10, 0], [5, 0, 1,11, 0],
      [3, 1, 0, 0, 1], [2, 1, 0, 1, 1], [1, 1, 0, 2, 1], [4, 1, 0, 3, 1], 
      [2, 0, 1, 4, 1], [4, 2, 1, 5, 1], [2, 2, 1, 6, 1], [4, 0, 1, 7, 1], 
      [1, 1, 2, 8, 1], [2, 1, 2, 9, 1], [3, 1, 2,10, 1], [4, 1, 2,11, 1],
    ].map(([a, b, c, d, e]) => set(a, b, c, getEdgeColor(d, e)))

    // color the corners
    ;[
      [0, 0, 0, 0, 0], [0, 2, 0, 1, 0], [0, 2, 2, 2, 0], [0, 0, 2, 3, 0], 
      [5, 0, 0, 4, 0], [5, 2, 0, 5, 0], [5, 2, 2, 6, 0], [5, 0, 2, 7, 0], 
      [1, 0, 0, 3, 1], [1, 2, 0, 2, 2], [1, 2, 2, 5, 1], [1, 0, 2, 4, 2], 
      [3, 0, 0, 1, 1], [3, 2, 0, 0, 2], [3, 2, 2, 7, 1], [3, 0, 2, 6, 2], 
      [2, 0, 0, 2, 1], [2, 2, 0, 1, 2], [2, 2, 2, 6, 1], [2, 0, 2, 5, 2], 
      [4, 0, 0, 0, 1], [4, 2, 0, 3, 2], [4, 2, 2, 4, 1], [4, 0, 2, 7, 2]
    ].map(([a, b, c, d, e]) => set(a, b, c, getCornerColor(d, e)))

    return state.map(x=>x.join(""))
  }

  setState(state){

    state = Array.isArray(state) ? state : state.split("\n")
    let get = (side, x, y) => {
        let [xoff, yoff] = [[3, 0], [3, 3], [6, 3], [9, 3], [0, 3], [3, 6]][side]
        return state[yoff + y][xoff + x]
    }
    
    let edgeColors = "WB WR WG WO GR GO BR BO YG YR YB YO".split(" ")
    let cornerColors = "WOB WBR WRG WGO YOG YGR YRB YBO".split(" ")    

    let edges = [
      [[0, 1, 0], [3, 1, 0]], [[0, 2, 1], [2, 1, 0]], [[0, 1, 2], [1, 1, 0]], [[0, 0, 1], [4, 1, 0]],
      [[1, 2, 1], [2, 0, 1]], [[1, 2, 1], [4, 2, 1]], [[3, 0, 1], [2, 2, 1]], [[3, 2, 1], [4, 0, 1]],
      [[5, 1, 0], [1, 1, 2]], [[5, 2, 1], [2, 1, 2]], [[5, 1, 2], [3, 1, 2]], [[5, 0, 1], [4, 1, 2]]
    ].map(([a, b]) => get(...a) + get(...b))

    let corners = [
      [[0, 0, 0], [4, 0, 0], [3, 2, 0]], [[0, 2, 0], [3, 0, 0], [2, 2, 0]], [[0, 2, 2], [2, 0, 0], [1, 2, 0]], [[0, 0, 2], [1, 0, 0], [4, 2, 0]],
      [[5, 2, 1], [4, 2, 2], [1, 1, 0]], [[5, 2, 1], [1, 2, 2], [2, 1, 0]], [[5, 0, 1], [2, 2, 2], [3, 1, 0]], [[5, 2, 1], [3, 2, 2], [4, 1, 0]]
    ].map(([a, b, c]) => get(...a) + get(...b) + get(...c))

    edges.forEach((edge, i) => {
      let index = edgeColors.indexOf(edge)
      let rotation = 0
      if(index == -1){
          index = edgeColors.indexOf(edge[1] + edge[0])
          rotation = 1
      }
      if(index == -1){
        console.error("invalid state")
        return
      }
        this.edges[i] = [index, rotation]
    })

    corners.forEach((corner, i) => {
        let rotation = 0
        let index = cornerColors.indexOf(corner)
        if(index == -1){
            index = cornerColors.indexOf(corner[1] + corners[2] + corners[0])
            rotation = 1
        }
        if(index == -1){
            index = cornerColors.indexOf(corner[2] + corners[0] + corners[1])
            rotation = 2
        }
        if(index == -1){
            console.error("invalid state")
            return
        }
        this.corners[i] = [index, rotation]
    })
    return this
  }
}