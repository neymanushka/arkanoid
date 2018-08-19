import { Vector2 } from "./Vector";
import { MathHelper } from "./MathHelper";
import { Circle } from "./Circle"
import { Rect } from "./Rect"

function collisionRectRect(r1: Rect, r2: Rect) {
  return !(r1.center.x - r1.hw > r2.center.x + r2.hw || r1.center.x + r1.hw < r2.center.x - r2.hw || r1.center.y - r1.hh > r2.center.y + r2.hh || r1.center.y + r1.hh < r2.center.y - r2.hh);
  //return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
  //return !( r1.x > r2.x + r2.width || r1.x + r1.width < r2.x || r1.y > r2.y + r2.height || r1.y + r1.height + r2.h < r2.x )
  //return !(x_1 > x_2+width_2 || x_1+width_1 < x_2 || y_1 > y_2+height_2 || y_1+height_1 < y_2);
}

function collisionRectangleCircle(r: Rect, c: Circle) {
  let dx = new Vector2(c.new.x - r.center.x, c.new.y - r.center.y);
  let ax = Math.abs(dx.x);
  let ay = Math.abs(dx.y);
  let nx = ax - r.hw;
  let ny = ay - r.hh;

  if (nx > c.radius || ny > c.radius || (nx > 0.0 && ny > 0.0 && (nx * nx + ny * ny - c.radius * c.radius) > 0.0))
    return { isCollided: false };

  let closest = new Vector2(MathHelper.clamp(dx.x, -r.hw, r.hw), MathHelper.clamp(dx.y, -r.hh, r.hh));

  let inside = false;

  if (dx.equally(closest)) {
    inside = true;
    if (ax > ay) {
      closest.x = closest.x > 0 ? r.hw : -r.hw;
    }
    else {
      closest.y = closest.y > 0 ? r.hh : -r.hh;
    }
  }

  let norm = Vector2.sub(dx, closest);
  let d = norm.len();
  if (inside) norm = Vector2.negative(norm);

  let penetration = inside ? c.radius + d : c.radius - d;

  return { isCollided: true, normal: Vector2.norm(norm), penetration: penetration };
}

export { collisionRectangleCircle, collisionRectRect };