class Ground extends PhysicsObject{

    //static I : Ball = null;
    //private radius : number = null;

    constructor(x : number, y : number, length:number, degree : number, lineWidth:number, lineColor :number) {
        super(x,y,length,lineWidth);
        this.setBody(x, y,length,lineWidth);
        this.setShape(0,0,length,degree,lineWidth,lineColor);
        
    }

    setShape(x: number, y:number, length:number, degree : number, lineWidth:number,color:number){

        const shape:egret.Shape = Util.setLine(x,y,length,degree,lineWidth,color);
        this.compornent.addChild(shape);
        //GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);

/*        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        
        this.compornent.anchorOffsetX += width/2;
        this.compornent.anchorOffsetY += height/2;*/

    }

    setBody(x: number, y:number, width:number, height:number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Plane({
            collisionGroup: GraphicShape.WALL,collisionMask:GraphicShape.CIECLE
        });
        this.body.angle =  Math.PI;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }


    fixedUpdate(){
    }

}