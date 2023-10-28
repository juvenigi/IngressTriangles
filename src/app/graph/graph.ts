import {skip} from "rxjs";

/**
 *  Idea: implements a db-like structure for storing graph data.
 */
export class Graph {

    /*  raw primitives. */
    private readonly digraph: boolean = false;
    private readonly adjacencyMatrix: Array<Array<boolean>> = []; // Note: efficient for dense graphs, but not sparse graphs.



    /* advanced structures, provide advanced entity-like functionality. */

    private vertices: Array<Vertex> = []; // its position in the array is its index / id.
    //private edges: Map<Vertex, Set<Edge>> = new Map(); // its position in the array is its index / id.

    /**
     * Constructs a graph from provided parameters.
     * @param file TODO not implemented.
     * @param vertexCount The number of vertices in the graph.
     * @param adjacencyList An 1D array of vertex indices. The index of the array is the vertex index, and the value is the index of the vertex's adjacent vertices.
     * @param digraph Whether the graph is a directed graph or not.
     */
    constructor(file?: File, vertexCount?: number, adjacencyList?: Array<{ vertex: number, outVertex: number }>,
                digraph: boolean = false) {
        this.digraph = digraph;
        if (file) {
            throw Error("not yet supported.");
        }
        if (vertexCount) {
            this.adjacencyMatrix = new Array(vertexCount).fill(true)
                .map(() => new Array(vertexCount).fill(true));
        }
        if (adjacencyList) {
            adjacencyList.forEach(({vertex, outVertex}) => {
                this.adjacencyMatrix[vertex][outVertex] = true;
                if (!digraph) this.adjacencyMatrix[outVertex][vertex] = true;
            });
        }
        if (!file && !adjacencyList) throw Error("Either file or vertexCount must be provided.");
    }

    public getVertices(): Array<Vertex> {
        if (this.vertices.length === 0) { // no vertices generated.
            // generate edges from adjacency matrix
            const inEdges: Array<Edge> = []; // temporary edge storage before assigning to vertices.
            const outEdges: Array<Edge> = []; // same but for setting outgoing edges for a vertex id.
            this.adjacencyMatrix.forEach((row, sourceVertex) => {
                row.forEach((isAdjacent, destinationVertex) => {
                    if (isAdjacent) {

                    }
                    if (this.digraph) {

                    }
                });
            });
        }
        return this.vertices;
    }

    // todo: implement
    public getEdges(): Array<Edge> {
        // return [...this.edges.values()].flatMap(e => [...e.values()]);
    return [];
    }


    // todo: implement
    public getVertex(index: number): Vertex {
        const result = this.vertices.at(index);
        if (!result) throw Error("Vertex does not exist.");
        return result;
    }

    public hasEdge(sourceIndex: number, destinationIndex: number): boolean {
        return this.adjacencyMatrix.at(sourceIndex)?.at(destinationIndex) ?? false;
    }

    // todo: consider overriding with this method.
    setVertex(vertex: Vertex): void {
        // skip if already exists.
        // if (this.vertices.find(v => v.id === vertex.id)) return;
        // this.vertices.push(vertex);
    }

}

/**
 *  A vertex entity.
 */
export class Vertex {
    public readonly id: number;
    private graph: Graph;
    private outgoingEdges: Array<Edge> = [];
    private incomingEdges: Array<Edge> = [];

    // todo: implement edges
    constructor(graph: Graph, id: number) {
        this.graph = graph;
        this.id = id;
    }

}

/**
 * An edge entity.
 */
export class Edge {
    private graph: Graph;
    private vertices: Array<Vertex> = []; // consists of two elements. First is the source, second is the target.

    constructor(graph: Graph) {
        this.graph = graph;
    }
}
