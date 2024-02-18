const arr = [];
let num = 0;
for (let i = 0; i <= 7; i++) {
  const arr1 = [];
  for (let j = 0; j <= 7; j++) {
    arr1.push([i, j]);
  }
  arr.push(arr1);
}

function getNextMoves(move) {
  const move1 = [move[0] + 1, move[1] + 2];
  const move2 = [move[0] + 2, move[1] + 1];
  const move3 = [move[0] - 1, move[1] - 2];
  const move4 = [move[0] - 2, move[1] - 1];
  const move5 = [move[0] - 1, move[1] + 2];
  const move6 = [move[0] + 1, move[1] - 2];
  const move7 = [move[0] + 2, move[1] - 1];
  const move8 = [move[0] - 2, move[1] + 1];

  const movesArr = [move1, move2, move3, move4, move5, move6, move7, move8];

  const filtered = movesArr.filter((element, index, movesArr) => {
    if (
      element[0] >= 8 ||
      element[0] < 0 ||
      element[1] >= 8 ||
      element[1] < 0
    ) {
      return false;
    }

    return true;
  });

  return filtered;
}

function getNextMovesIn1D(position) {
  const moves = getNextMoves(position);
  const newMoves = [];
  moves.forEach((element) => {
    let newMove = element[0] * 8 + element[1];
    newMoves.push(newMove);
  });

  return newMoves;
}

function converTo2d(moveIn1D) {
  let newMove = [Math.round((moveIn1D - (moveIn1D % 8)) / 8), moveIn1D % 8];
  return newMove;
}

function buildGraph() {
  const graph = [];
  for (let i = 0; i <= 63; i++) {
    const arr1 = [];
    for (let j = 0; j <= 63; j++) {
      arr1[j] = 0;
    }

    graph[i] = arr1;
  }

  for (let i = 0; i <= 63; i++) {
    for (let j = 0; j <= 63; j++) {
      const nextMoves = getNextMovesIn1D(converTo2d(i));
      if (nextMoves.includes(j)) {
        graph[i][j] = 1;
      } else {
        graph[i][j] = 0;
      }
    }
  }

  return graph;
}

const graph = buildGraph();

function findPathUtil(vertex, end, visited, path = []) {
  const queue = [];
  queue.push(vertex);
  visited[vertex] = true;
  path.push([vertex, vertex]);

  main: while (queue.length >= 1) {
    for (let i = 0; i <= 63; i++) {
      if (graph[queue[0]][i] && !visited[i]) {
        queue.push(i);
        path.push([i, queue[0]]);
        if (end === i) break main;
      }
    }
    visited[queue[0]] = true;

    queue.shift();
  }
  return path;
}

function findPath(start, end, path) {
  const visited = [];
  for (let i = 0; i <= 63; i++) {
    visited[i] = false;
  }

  const pathWays = findPathUtil(start, end, visited, path);
  return pathWays;
}

function convertArrTo2d(pathsArr) {
  const arr = [];
  pathsArr.forEach((element) => {
    arr.push(converTo2d(element));
  });
  return arr;
}

function moveTo1D(element) {
  const newMove = element[0] * 8 + element[1];
  return newMove;
}

function knightMoves(start, end) {
  const shortest = findPath(moveTo1D(start), moveTo1D(end));
  const shortPath = shortestPath(shortest);
  const shortPath2d = reduceTo2d(shortPath);
  return shortPath2d;
}

console.log(knightMoves([0, 0], [7, 7]));

function shortestPath(path) {
  const shortPath = [];
  let start = 0;
  let end = path.length - 1;
  while (end !== start) {
    shortPath.push(path[end]);
    const index = findIndexOf(path[end][1], path);
    end = index;
  }
  shortPath.push(path[start]);
  shortPath.reverse();
  return shortPath;
}

function reduceTo2d(path) {
  const arr = [];
  path.forEach((element) => {
    arr.push(converTo2d(element[0]));
  });
  return arr;
}
function findIndexOf(parent, path) {
  for (const element of path) {
    if (element[0] === parent) return path.indexOf(element);
  }
}
