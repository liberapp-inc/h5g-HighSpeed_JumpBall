/*class Cloud extends GameCompornent{

    constructor(x:number, y:number,width:number,height:number) {
        super(x,y,width,height);
        this.setShape(0,0,width,height,ColorPallet.BLACK);
    }

    private setShape(x:number, y:number,width:number,height:number,color:number){
        const shape : egret.Shape = Util.setEllipse(x,y,width,height,color,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    updateContent(){
        if(this.compornent.y > Player.I.compornent.y + Game.height*1.5){
            this.destroy();
        }
    }

}*/