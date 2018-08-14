import * as PIXI from "pixi.js";
import { Vector2,MathHelper } from "./Vector";


function collisionRectangleCircle( r: Rect, c:Circle )
{  
    let dx = new Vector2(c.new.x - r.center.x,c.new.y - r.center.y);
    let ax = Math.abs(dx.x);
    let ay = Math.abs(dx.y);
    let nx = ax - r.hw;
    let ny = ay - r.hh;
 
    if (nx > c.radius || ny > c.radius || (nx > 0.0 && ny > 0.0 && (nx * nx + ny * ny - c.radius * c.radius) > 0.0))
        return { isCollided: false };
    
    let closest = new Vector2(MathHelper.clamp( dx.x, -r.hw, r.hw  ),MathHelper.clamp( dx.y, -r.hh, r.hh  ));
     
    let inside = false;
   
    if(dx.equally(closest))
    {
      inside = true;
      if( ax > ay )
      {
        closest.x = closest.x > 0 ? r.hw : -r.hw;
      }
      else
      {
        closest.y = closest.y > 0 ? r.hh : -r.hh;
      }
    }
    
    let norm = Vector2.sub(dx,closest);
    let d = norm.len();
    if( inside ) norm = Vector2.negative(norm);    

    let penetration = inside ? c.radius + d : c.radius - d;

    return { isCollided: true,normal:Vector2.norm(norm),penetration:penetration };
} 

class Edge
{
    center: Vector2;
    hw: number;
    hh: number;
    visible: boolean;
    bounce: number;

    constructor( x,y,w,h)
    {
        this.hw = w/2;
        this.hh = h/2;
        this.center = new Vector2( x,y );
        this.visible = true;
        this.bounce = 0.97;
    }
    
    onHit()
    {

    }

    onDestroy(ball:any)
    {
        //console.log( this.center.toString() + " " + this.hw + " " + this.hh);
    }
}

class Rect extends PIXI.Graphics
{
    game: any;
    center: Vector2;
    hw: number;
    hh: number;
    angle: number;
    bounce: number;


    constructor( game,x,y,w,h,borderColor,fillColor)
    {
        super();
        this.game = game;
        this.center = new Vector2( x,y );
        this.hw = w/2;
        this.hh = h/2;
        this.angle = 0;
        this.bounce = 0.98;

        this.beginFill(fillColor);
        this.lineStyle(2, borderColor);
        this.drawRoundedRect (x-this.hw, y-this.hh, w, h, 8 );
        //this.drawRoundedRect (x,y, w, h, 8 );
        this.endFill();

        this.game.game.stage.addChild( this );
    }

    update()
    {

    }

    onHit()
    {

    }

    onDestroy( ball: any )
    {
        this.visible = false;
    }
}

class Circle extends PIXI.Graphics
{
    game : any;
    velocity : Vector2;
    direction: Vector2;
    gravity: Vector2;
    pos : Vector2;
    new : Vector2;
    newVelocity : Vector2;
    radius: any;
    bounce: number;

    constructor( game,x,y,r,velocity )
    {
        super();
        this.game = game;
        this.gravity = new Vector2( 0 , 0.2 );
        this.pos = new Vector2( x , y );
        this.new = new Vector2( x , y );
        this.velocity = velocity;
        this.radius = r;
        this.beginFill(0x9966FF);
        this.drawCircle(0,0,r);
        this.endFill();
        this.game.game.stage.addChild( this );
    } 

    update()
    {   
        this.velocity = this.newVelocity;
        this.pos = this.new;
        this.x = this.pos.x;
        this.y = this.pos.y;
    }
}

class Brick extends Rect
{
    constructor( game,x,y )
    {
        super( game,x,y,64,64,0x9966FF,0xFFFFFFFF );
    }

    onHit()
    {

    }

    onDestroy(ball: any)
    {
        //super.onDestroy(ball);
    }
}

class BallSpawner extends Rect
{
    constructor( game,x,y )
    {
        super( game,x,y,64,64,0x9966FF,0xFF3064 );
    }

    onHit()
    {

    }

    onDestroy(ball: any)
    {
        super.onDestroy(ball);
        this.game.balls.push( new Circle( this.game,this.center.x,this.center.y,8,new Vector2(3,5) ));
    }
}


class PortSrc extends Rect
{
    destination: any;
    constructor( game,x,y,dest )
    {
        super( game,x,y,64,64,0x9966FF,0x3236FF );
        this.destination = dest;
    }

    onHit()
    {
        this.destination.onDestroy();
        this.game.balls.push( new Circle( this.game,this.destination.center.x,this.destination.center.y,8,new Vector2(3,5) ));
    }

    onDestroy(ball: any)
    {
        super.onDestroy(ball);
        ball.visible = false;
    }
}

class PortDst extends Rect
{
    constructor( game,x,y )
    {
        super( game,x,y,64,64,0x9966FF,0x3236FF );
    }

    onHit()
    {

    }

    onDestroy(ball:any)
    {
        super.onDestroy(ball);
    }
}


class Paddle extends Rect
{
    constructor( game,x,y )
    {
        super( game,0,y,256,32,0x9966FF,0xFFFFFFFF );
        this.bounce = 1.1;
    }
    update()
    {        
        this.x = this.center.x = this.game.mousePos;
        //this.game.speed = 0;
    }

    onHit()
    {

    }

    onDestroy(ball: any)
    {
        //super.onBrickDestroy();
    }
}


export { PortSrc,PortDst,BallSpawner,Brick,Circle,collisionRectangleCircle,Edge,Rect,Paddle };