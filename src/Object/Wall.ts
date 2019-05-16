class Wall extends GameCompornent{


    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height);
        this.setShape(0, 0, width,height,ColorPallet.BLUE);
/*        if(x < Game.width/2){
            CreateGameScene.leftWall.push(this);
        }
        else{
            CreateGameScene.rightWall.push(this);

        }*/
        
    }


/*    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width : width, height: height, 
            fixedRotation:true, 
            collisionGroup: GraphicShape.WALL, 
            collisionMask:GraphicShape.CIECLE
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }*/

    setShape(x: number, y:number, width:number, height:number,color:number){

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        //this.compornent.anchorOffsetX += width/2;
        //this.compornent.anchorOffsetY += height/2;
        

    }

    updateContent(){
        if(this.compornent.y > Player.I.compornent.y + Game.height*1){
            this.destroy();
        }
    }

}
