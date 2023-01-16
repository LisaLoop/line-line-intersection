import {
  has_potential_intersection,
  get_line_intersection_scales,
  is_valid_range
} from "./line-intersection.js"

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const makeLine = (p1, p2) => {
    const line = new Path2D();
    line.moveTo(p1.x, p1.y);
    line.lineTo(p2.x, p2.y);
    return line;
};

const renderLine = (context, line) => {
  const l = makeLine(line.p1, line.p2);
  const dot1 = makeDot(line.p1, 5);
  const dot2 = makeDot(line.p2, 5);

  context.save();
  context.strokeStyle = line.color;
  context.stroke(l);

  context.fillStyle = line.color;
  context.fill(dot1);
  context.fill(dot2);
  context.restore();
}

const makeDot = (point, radius) => {
    const circle = new Path2D();
    circle.arc(point.x, point.y, radius, 0, Math.PI*2);
    return circle;
}

const lineData = {
    line1: {p1: {x: 100, y: 100}, p2: {x: 200, y: 200}, color: "yellowgreen"},
    line2: {p1: {x: 400, y: 200}, p2: {x: 400, y: 600}, color: "deeppink"}
}


const render_point_along_line = (context, line, t) => {
  const start = line.p1;
  const end = line.p2;

  const v = { x: end.x - start.x, y: end.y - start.y };
  const point_along_vector = { x: t * v.x, y: t * v.y };
  const point_along_line = { x: start.x + point_along_vector.x, y: start.y + point_along_vector.y };

  const dot = makeDot(point_along_line, 3);
  context.save();
  context.strokeStyle = "lightblue";
  context.stroke(dot);
  context.restore();
};

const render = (context) => {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  renderLine(context, lineData.line1);
  renderLine(context, lineData.line2);

  if (!has_potential_intersection(lineData.line1, lineData.line2)) {
    console.log("NO INTERSECTION POSSIBLE");
    return;
  }

  const distances = get_line_intersection_scales(lineData.line1, lineData.line2);
  if (!is_valid_range(distances)) {
    return;
  }
  render_point_along_line(context, lineData.line1, distances.t);
  render_point_along_line(context, lineData.line2, distances.u);
}

window.addEventListener("mousemove", (e) => {
    const mouseCoords = {x: e.clientX, y: e.clientY};
    lineData.line1.p2 = mouseCoords;
    render(context);
});

render(context);
