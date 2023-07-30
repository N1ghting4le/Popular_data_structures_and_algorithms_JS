class Graph {
    constructor() {
        this.vertices = {};
    }
    
    addVertex(value) {
        if (!this.vertices[value]) {
            this.vertices[value] = [];
        }
    }
    
    addEdge(vertex1, vertex2) {
        if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
            throw new Error('В графе нет таких вершин');
        }
  
        if (!this.vertices[vertex1].includes(vertex2)) {
            this.vertices[vertex1].push(vertex2);
        }

        if (!this.vertices[vertex2].includes(vertex1)) {
            this.vertices[vertex2].push(vertex1);
        }
    }

    dfs(startVertex, callback) {
        let list = this.vertices;
        let stack = [startVertex];
        let visited = { [startVertex]: 1 };
        
        function handleVertex(vertex) {
            callback(vertex);
            
            let reversedNeighboursList = [...list[vertex]].reverse();
            
            reversedNeighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    stack.push(neighbour);
                }
            });
        }
        
        while (stack.length) {
            let activeVertex = stack.pop();
            handleVertex(activeVertex);
        }
        
        stack = Object.keys(this.vertices);
    
        while (stack.length) {
            let activeVertex = stack.pop();

            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }

    bfs(startVertex, callback) {
        let list = this.vertices;
        let queue = [startVertex];
        let visited = { [startVertex]: 1 };
        
        function handleVertex(vertex) {
            callback(vertex);
            
            let neighboursList = list[vertex];
            
            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                }
            });
        }
            
        while (queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }
        
        queue = Object.keys(this.vertices);
    
        while (queue.length) {
            let activeVertex = queue.shift();

            if (!visited[activeVertex]) {
                visited[activeVertex] = 1;
                handleVertex(activeVertex);
            }
        }
    }

    bfs2(startVertex) {
        let list = this.vertices; 
        let queue = [startVertex];
        let visited = { [startVertex]: 1 }; 
        let distance = { [startVertex]: 0 }; 
        let previous = { [startVertex]: null };
    
        function handleVertex(vertex) {
            let neighboursList = list[vertex];
        
            neighboursList.forEach(neighbour => {
                if (!visited[neighbour]) {
                    visited[neighbour] = 1;
                    queue.push(neighbour);
                    previous[neighbour] = vertex;
                    distance[neighbour] = distance[vertex] + 1;
                }
            });
        }
    
        while (queue.length) {
            let activeVertex = queue.shift();
            handleVertex(activeVertex);
        }
        
        return { distance, previous }
    }

    findShortestPath(startVertex, finishVertex) {
        let result = this.bfs2(startVertex);
    
        if (!(finishVertex in result.previous)) {
            throw new Error(`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);
        }
            
        let path = [];
        
        let currentVertex = finishVertex;
        
        while (currentVertex !== startVertex) {
            path.unshift(currentVertex);
            currentVertex = result.previous[currentVertex];
        }
        
        path.unshift(startVertex);
        
        return path;
    }
}

function findNearestVertex(distances, visited) {
    let minDistance = Infinity;
    let nearestVertex = null;
  
    Object.keys(distances).forEach(vertex => {
        if (!visited[vertex] && distances[vertex] < minDistance) {
            minDistance = distances[vertex];
            nearestVertex = vertex;
        }
    });
  
    return nearestVertex;
}

function dijkstra(graph, startVertex) {
    let visited = {};
    let distances = {};
    let previous = {};
    let vertices = Object.keys(graph);
    
    vertices.forEach(vertex => {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    });
  
    distances[startVertex] = 0;
  
    function handleVertex(vertex) {
        let activeVertexDistance = distances[vertex]; 
        let neighbours = graph[vertex];
        
        Object.keys(neighbours).forEach(neighbourVertex => {
            let currentNeighbourDistance = distances[neighbourVertex];
            let newNeighbourDistance = activeVertexDistance + neighbours[neighbourVertex];
            
            if (newNeighbourDistance < currentNeighbourDistance) {
                distances[neighbourVertex] = newNeighbourDistance;
                previous[neighbourVertex] = vertex;
            }
        });
        
        visited[vertex] = 1;
    }
    
    let activeVertex = findNearestVertex(distances, visited);
  
    while (activeVertex) {
        handleVertex(activeVertex);
        activeVertex = findNearestVertex(distances, visited);
    }
    
    return { distances, previous };
}