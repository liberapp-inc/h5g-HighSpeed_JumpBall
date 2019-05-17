

class Background extends GameObject{

    static I : Background = null;
    color :number = ColorPallet.WHITE;

    static createPosY : number = 0;   

    constructor() {
        super();
        Background.I = this;
        Background.createPosY = 0;
        this.setCompornent(0,0,Game.width,Game.height);
        this.setShape(0,0,Game.width, Game.height,this.color);

    }

    setCompornent(x : number, y : number, width : number, height : number){
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameObject.display.addChild(this.compornent);
    }

    private setShape(x:number, y:number,width:number,height:number,color:number){
        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }


    updateContent() {}
}