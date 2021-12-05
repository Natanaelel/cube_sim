// @es-nocheck
function stateFromPerm(perm){

}

function getState(){
    let cube = theCube
    let state = Array(9).fill().map(_=>Array(12).fill(" "))
    let set = (side, x, y, color) => {

        let [xoff, yoff] = [[3, 0], [3, 3], [6, 3], [9, 3], [0, 3], [3, 6]][side]
        state[yoff + y][xoff + x] = color
    }


    
    let colors = "W G R B O Y".split(" ")
    
    let edges = cube.edges
    let corners = cube.corners
    
    let edgeColors = "WB WR WG WO GR GO BR BO YG YR YB YO".split(" ")
    let cornerColors = "WOB WBR WRG WGO YOG YGR YRB YBO".split(" ")    

    let getEdgeColor = (ind, rot) => edgeColors[edges[ind][0]][(edges[ind][1] + rot) % 2]

    let getCornerColor = (ind, rot) => cornerColors[corners[ind][0]][(3 + rot - corners[ind][1]) % 3]


    set(0, 1, 1, "W")
    set(1, 1, 1, "G")
    set(2, 1, 1, "R")
    set(3, 1, 1, "B")
    set(4, 1, 1, "O")
    set(5, 1, 1, "Y")


    set(0, 1, 0, getEdgeColor(0, 0))
    set(0, 2, 1, getEdgeColor(1, 0))
    set(0, 1, 2, getEdgeColor(2, 0))
    set(0, 0, 1, getEdgeColor(3, 0))

    set(1, 2, 1, getEdgeColor(4, 0))
    set(1, 0, 1, getEdgeColor(5, 0))
    set(3, 0, 1, getEdgeColor(6, 0))
    set(3, 2, 1, getEdgeColor(7, 0))

    set(5, 1, 0, getEdgeColor(8, 0))
    set(5, 2, 1, getEdgeColor(9, 0))
    set(5, 1, 2, getEdgeColor(10, 0))
    set(5, 0, 1, getEdgeColor(11, 0))


    set(3, 1, 0, getEdgeColor(0, 1))
    set(2, 1, 0, getEdgeColor(1, 1))
    set(1, 1, 0, getEdgeColor(2, 1))
    set(4, 1, 0, getEdgeColor(3, 1))

    set(2, 0, 1, getEdgeColor(4, 1))
    set(4, 2, 1, getEdgeColor(5, 1))
    set(2, 2, 1, getEdgeColor(6, 1))
    set(4, 0, 1, getEdgeColor(7, 1))

    set(1, 1, 2, getEdgeColor(8, 1))
    set(2, 1, 2, getEdgeColor(9, 1))
    set(3, 1, 2, getEdgeColor(10, 1))
    set(4, 1, 2, getEdgeColor(11, 1))


    set(0, 0, 0, getCornerColor(0, 0))
    set(0, 2, 0, getCornerColor(1, 0))
    set(0, 2, 2, getCornerColor(2, 0))
    set(0, 0, 2, getCornerColor(3, 0))
    
    set(5, 0, 0, getCornerColor(4, 0))
    set(5, 2, 0, getCornerColor(5, 0))
    set(5, 2, 2, getCornerColor(6, 0))
    set(5, 0, 2, getCornerColor(7, 0))

    set(1, 0, 0, getCornerColor(3, 1))
    set(1, 2, 0, getCornerColor(2, 2))
    set(1, 2, 2, getCornerColor(5, 1))
    set(1, 0, 2, getCornerColor(4, 2))

    set(3, 0, 0, getCornerColor(1, 1))
    set(3, 2, 0, getCornerColor(0, 2))
    set(3, 2, 2, getCornerColor(7, 1))
    set(3, 0, 2, getCornerColor(6, 2))

    set(2, 0, 0, getCornerColor(2, 1))
    set(2, 2, 0, getCornerColor(1, 2))
    set(2, 2, 2, getCornerColor(6, 1))
    set(2, 0, 2, getCornerColor(5, 2))

    set(4, 0, 0, getCornerColor(0, 1))
    set(4, 2, 0, getCornerColor(3, 2))
    set(4, 2, 2, getCornerColor(4, 1))
    set(4, 0, 2, getCornerColor(7, 2))

    console.log(state.map(x=>x.join("")).join("\n"))
}



getState(theCube)


function setState(state){

    state = Array.isArray(state) ? state : state.split("\n")
    let get = (side, x, y) => {
        let [xoff, yoff] = [[3, 0], [3, 3], [6, 3], [9, 3], [0, 3], [3, 6]][side]
        return state[yoff + y][xoff + x]
    }


    
    let colors = "W G R B O Y".split(" ")

    
    let edgeColors = "WB WR WG WO GR GO BR BO YG YR YB YO".split(" ")
    let cornerColors = "WOB WBR WRG WGO YOG YGR YRB YBO".split(" ")    

    let getEdgeColor = (ind, rot) => edgeColors[edges[ind][0]][(edges[ind][1] + rot) % 2]

    let getCornerColor = (ind, rot) => cornerColors[corners[ind][0]][(3 + rot - corners[ind][1]) % 3]

    let edges = [
        get(0, 1, 0) + get(3, 1, 0),
        get(0, 2, 1) + get(2, 1, 0),
        get(0, 1, 2) + get(1, 1, 0),
        get(0, 0, 1) + get(4, 1, 0),

        get(1, 2, 1) + get(2, 0, 1),
        get(1, 2, 1) + get(4, 2, 1),
        get(3, 0, 1) + get(2, 2, 1),
        get(3, 2, 1) + get(4, 0, 1),

        get(5, 1, 0) + get(1, 1, 2),
        get(5, 2, 1) + get(2, 1, 2),
        get(5, 1, 2) + get(3, 1, 2),
        get(5, 0, 1) + get(4, 1, 2),
    ]
    "WOB WBR WRG WGO YOG YGR YRB YBO"
    let corners = [
        get(0, 0, 0) + get(4, 0, 0) + get(3, 2, 0),
        get(0, 2, 0) + get(3, 0, 0) + get(2, 2, 0),
        get(0, 2, 2) + get(2, 0, 0) + get(1, 2, 0),
        get(0, 0, 2) + get(1, 0, 0) + get(4, 2, 0),

        get(5, 2, 1) + get(4, 2, 2) + get(1, 1, 0),
        get(5, 2, 1) + get(1, 2, 2) + get(2, 1, 0),
        get(5, 0, 1) + get(2, 2, 2) + get(3, 1, 0),
        get(5, 2, 1) + get(3, 2, 2) + get(4, 1, 0),
    ]
    edges.forEach((edge, i) => {
        let index = edgeColors.indexOf(edge)
        if(index != -1){
            theCube.edges[i] = [index, 0]
        }else{
            index = edgeColors.indexOf(edge[1] + edge[0])
            if(index != -1){
                theCube.edges[i] = [index, 1]
            }
        }
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
            console.error("invalid state but anyways")
            return
        }
        theCube.corners[i] = [index, rotation]
    })
    console.log(edges)
    console.log(get(0, 0, 0))

    resetScene()
}

function getScramble(){
    let moves = []
    for(let i = 0; i < 100; i++){
        let side = "UFRBLD"[Math.floor((Math.random() * 6))]
        let times = ["'", "2", ""][Math.floor(Math.random() * 3)]
        moves.push(side + times)
    }
    return moves.join(" ")
}
function invertMoves(moves){
    return moves.split(" ").map(move=>{
        return move[0] + (move[1] == "2" ? "2" : move[1] == "'" ? "" : "'") 
    }).reverse().join(" ")
}