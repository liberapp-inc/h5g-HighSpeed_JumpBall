/*class Coin extends PhysicsObject{

    constructor(x:number, y:number,width:number,height:number) {
        super(x,y,width,height);
        CreateGameScene.coin.push(this);
        this.setBody(x, y, width/2);
        this.setShape(0,0,width,height,ColorPallet.RED);
    }

    private setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({
            mass : 1, 
            position:[x,y],
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Circle({
            radius : radius*2, 
            fixedRotation:false,
            sensor:true,
            collisionGroup: GraphicShape.COIN, 
            collisionMask:GraphicShape.CIECLE 
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }

    private setShape(x:number, y:number,width:number,height:number,color:number){
        const shape : egret.Shape = Util.setEllipse(x,y,width,height,color,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }


    fixedUpdate(){
        this.updateDrowShape();
        if(this.compornent.y > Player.I.compornent.y + Game.height*0.6){
            this.destroy();
        }

    }

}*/