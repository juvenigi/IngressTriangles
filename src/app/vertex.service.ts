import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VertexService {

  constructor() {

  }

  public static genVertices(count: number, bounds: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> {
    if (bounds.length !== 2) throw Error("Only 2 points are supported.")

    const vertices = [];

    for (let i = 0; i < count; i++) {
      vertices.push({
        x: Math.random() * (bounds[1].x - bounds[0].x) + bounds[0].x,
        y: Math.random() * (bounds[1].y - bounds[0].y) + bounds[0].y
      });
    }

    return vertices;
  }

  public static triangulateVDistribution(
    vertices: Array<{x:number, y: number}>,
    bounds: Array<{ x: number, y: number }>,
    crease: {x?: never, y: number} | {x: number, y?: never}): Array<{x:number, y: number}> {

    return [];
}
}
