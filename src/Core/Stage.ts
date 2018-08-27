import { Brick } from "../Bricks/Brick";
import { Edge } from "../Bricks/Edge";
import { UnbreakableBrick } from "../Bricks/UnbreakableBrick";
import { level0 } from "../Levels/Levels";

class Stage {
    static load(arr, data, width, height) {
        let p = 0;
        let w = 128;
        let h = 49;
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[p] == 7) {
                    arr.push(new UnbreakableBrick(w * x, 100 + h * y, PIXI.loader.resources["brick" + level0.data[p].toString()].texture));
                }
                else if (data.data[p] > 0) {
                    arr.push(new Brick(w * x, 100 + h * y, PIXI.loader.resources["brick" + level0.data[p].toString()].texture));
                }
                p++;
            }
        }

        arr.push(new Edge(-250, height / 2, 500, height)); //edge left
        arr.push(new Edge(width + 250, height / 2, 500, height)); //edge right
        arr.push(new Edge(width / 2, -100, width, 200)); //edge top
        //game.stage.bricks.push( new Edge( app.renderer.width/2,app.renderer.height+250,app.renderer.width,500 ) ); //edge bottom
    }
}

export { Stage };
