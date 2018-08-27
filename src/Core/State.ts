import { ScoreLine } from "./ScoreLine";
import { Drop } from "./Drop";
import { Paddle } from "../Bricks/Paddle";
import { Circle } from "../Core/Circle";
import { Stage } from "./Stage";
import { level0 } from "../levels/levels";

class State {

    private static _instance:State;
        
    readonly WIDTH: number;
    PADDING: number;

    app: PIXI.Application;

    stage: Stage;
    scoreLines: ScoreLine[];
    drops: Drop[];
    balls: Circle[];
    bricks: any[];
    paddle: Paddle;

    mousePos: number;

    private constructor()
    {
        this.WIDTH = 1280;
        this.scoreLines = [];
        this.drops = [];
        this.balls = [];
        this.bricks = [];
    }

    init( app ){
        this.app = app;
        this.PADDING = ( app.renderer.width - this.WIDTH ) / 2;
        app.stage.x = this.PADDING;
        app.stage.width = this.WIDTH;

        Stage.load( this.bricks,level0,this.WIDTH,app.renderer.height );

        this.initPaddle();
    }

    initPaddle(){
        this.paddle = new Paddle( this.app.renderer.width / 2, this.app.renderer.height - 32);
        this.bricks.push( this.paddle );
    }

    addDrop( drop )
    {
        this.drops.push(drop);
        this.app.stage.addChild(drop);
    }

    addBall( ball )
    {
        this.balls.push(ball);
        this.app.stage.addChild(ball);
    }

    addScoreLine( line )
    {
        this.scoreLines.push(line);
        this.app.stage.addChild(line);
    }

    public static getInstance():State
    {
        return this._instance||(this._instance = new State());
    };
}


export { State };