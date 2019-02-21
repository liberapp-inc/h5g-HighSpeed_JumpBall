class Box extends GameObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    static boxMove : boolean = false;
    //static moveDistance : number = 0;
    static blockdownSpeed : number = 3;
    
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number) {
        super();
        this.boxPositionX = boxPositionX;
        this.boxPositionY = boxPositionY;
        this.boxWidth = boxWidth ;
        this.boxHeight =boxHeight;
        this.setBody(this.boxPositionX, this.boxPositionY, this.boxWidth, this.boxHeight);
        this.setShape(this.boxWidth, this.boxHeight);
        CreateWorld.world.on("beginContact",  this.collision, this);


    }


    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height,collisionGroup: GraphicShape.BOX, collisionMask:GraphicShape.CIECLE, fixedRotation:true, sensor : true
        });

        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;//p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0x7fff7f);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }


    updateContent(){
        this.moveBlock();
    }

    moveBlock(){
        if(Box.boxMove == true){
            this.body.position[1] +=   Box.blockdownSpeed;
            this.shape.y +=            Box.blockdownSpeed;
            if(this.shape.y > CreateGameScene.height){
                this.body.position[1] =   -CreateGameScene.boxInterval;
                this.shape.y =            -CreateGameScene.boxInterval;
            }

        }
        
    }


    collision(evt) : void {

        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;

        if(Ball.checkRiseFlag == false){

            if(Box.boxMove == false){
                Box.boxMove = true;
            }

            //足場よりもボールが上にあるとき
            if(Ball.ballPosY < bodyA.position[1]){
                Ball.I.body.applyForce([0,-10000],[0,0]);

            }
        }

        console.log(shapeA.collisionMask);
        

    }


}


class NormalBlock extends Box{

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight);
    }

}

class HorizontalMoveBlock extends Box{

    private rightMove : boolean;
    static horizontalMoveSpeed : number = 2;

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight);
        let setRandamMove = Main.randomInt(0,1);
        switch(setRandamMove){
            case 0:
            this.rightMove = false;
            break;

            case  1:
            this.rightMove = true;
            break;
        }

    }

    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;//p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xffbf7f);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){

        this.moveBlock();

        switch(this.rightMove){//左へ移動
            
            case false:
                if(this.body.position[0] <= 0){
                    this.rightMove = true;
                }else{
                    this.body.position[0] -= HorizontalMoveBlock.horizontalMoveSpeed;
                    this.shape.x = this.body.position[0];
                }
            break;

            case true:
                if(this.body.position[0] > CreateGameScene.width){
                    this.rightMove = false;
                }else{
                    this.body.position[0] += HorizontalMoveBlock.horizontalMoveSpeed;
                    this.shape.x = this.body.position[0];
                }
            break;
        }

    }

}

class VerticalMoveBlock extends Box{

    private upMove : boolean;
    private moveLength : number = 0;
    static verticalMoveSpeed : number = 2;
    static clampVerticalMoveLength : number = 200;

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight);
        let setRandamMove = Main.randomInt(0,1);
        switch(setRandamMove){
            case 0:
            this.upMove = false;
            break;

            case  1:
            this.upMove = true;
            break;
        }

    }

    setShape(width: number, height : number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width/2;//p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height/2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xff7f7f);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateContent(){

        this.moveBlock();
        
        switch(this.upMove){//下へ移動
            
            case false:
                if(this.moveLength >= VerticalMoveBlock.clampVerticalMoveLength){
                    this.upMove = true;
                    this.moveLength = 0;
                }else{
                    this.body.position[1] -= VerticalMoveBlock.verticalMoveSpeed;
                    this.shape.y = this.body.position[1];
                    this.moveLength += VerticalMoveBlock.verticalMoveSpeed;
                }
            break;

            case true:
                if(this.moveLength >= VerticalMoveBlock.clampVerticalMoveLength){
                    this.upMove = false;
                    this.moveLength = 0;

                }else{
                    this.body.position[1] += VerticalMoveBlock.verticalMoveSpeed;
                    this.shape.y = this.body.position[1];
                    this.moveLength += VerticalMoveBlock.verticalMoveSpeed;

                }
            break;
        }


    }

}