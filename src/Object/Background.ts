

class Background extends GameObject{

    static I : Background = null;
    color :number = ColorPallet.WHITE;

    static createPosY : number = 0;
    //static cloud : Cloud[]=[];
    


    constructor() {
        super();
        Background.I = this;
        Background.createPosY = 0;
        //Background.cloud = [];
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

/*    createCloud(){
        if(Background.createPosY - Player.I.compornent.y  > 500){
            const x :number = Util.randomInt(0, Game.width);
            const y :number = Player.I.compornent.y - Game.height * 1.5;
            Background.createPosY = Player.I.compornent.y;
            const c: Cloud = new Cloud(x,y,Game.width*0.2,Game.width*0.1);
            Background.cloud.push(c);
        }
        
    }*/

    updateContent() {}
}