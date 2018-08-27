import { State } from "./State"

class ScoreLine extends PIXI.Container {

    numbers = [];

    constructor(x, y, score, fontName) {
        super();

        let pos = 0;
        for (let i = 0; i < score.length; i++) {
            this.numbers.push(new PIXI.Sprite(PIXI.loader.resources[fontName + score[i].toString()].texture));
            this.numbers[i].x = pos + x;
            this.numbers[i].y = y;
            this.addChild(this.numbers[i]);
            pos += this.numbers[i].width;
        }
        State.getInstance().addScoreLine(this);
    }
    update() {
        this.y-=2;
        this.numbers.forEach(e => {
            e.alpha -= 0.02;
        });
        if( this.numbers[0].alpha < 0 )
        {
            this.parent.removeChild(this);
            return false;
        }
        return true;
    }
}

export { ScoreLine };