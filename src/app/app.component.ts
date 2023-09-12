import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'IngressTriangles';
  trees: number[] = [];

  @ViewChild('triCanvas')
  triangleCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.drawOnCanvas();

  }

  private drawOnCanvas(): void {
    const ctx = this.triangleCanvas.nativeElement.getContext("2d");
    if (!ctx) throw Error('no canvas context found');
    ctx.canvas.width = 200;
    ctx.canvas.height = 200;
    const point = this.initPoint(10);

    ctx.translate(100, 100);
    ctx.stroke(point);
    ctx.resetTransform();
    ctx.translate(140, 140);
    ctx.stroke(point);

    ctx.resetTransform()
    ctx.translate(90, 90);
    const triParams = {
      origin: {x: 10, y: 10},
      points: [
        {x: 20, y: 20},
        {x: 20, y: 10},
        {x: 30, y: 30}
      ]
    }
    console.log(this.triArea(triParams.points));
    this.trees.push(this.triArea(triParams.points))
    const tri = this.initTri(triParams.origin, triParams.points);
    ctx.stroke(tri);

    ctx.resetTransform();
    ctx.translate(80, 80);
    ctx.fill(tri);

    ctx.resetTransform();
    ctx.translate(70, 70);
    ctx.fill(tri);

  }

  private initPoint(radius = 10): Path2D {
    const path = new Path2D();
    path.arc(0, 0, radius, 0, 2 * Math.PI);
    return path;
  }

  private initTri(origin: { x: number, y: number }, points: Array<{ x: number, y: number }>) {
    if (points.length !== 3) throw Error('Triangle must have 3 points.')
    const path = new Path2D();

    // offset based on origin
    points.forEach(point => {
      point.x -= origin.x;
      point.y -= origin.y;
    });
    const first = points.pop()!;
    path.moveTo(first.x, first.y);

    for (const p of points) {
      path.lineTo(p.x, p.y);
    }
    // make a closed shape so that Context::fill() can be called
    path.closePath();

    return path;
  }

  private triArea(points: Array<{ x: number, y: number }>) {
    if (points.length !== 3) throw Error("Must contain three vertices.")

    return Math.abs(
      (
        points.at(0)!.x * (points.at(1)!.y - points.at(2)!.y) +
        points.at(1)!.x * (points.at(2)!.y - points.at(0)!.y) +
        points.at(2)!.x * (points.at(0)!.y - points.at(1)!.y)
      ) / 2);
  }
}
