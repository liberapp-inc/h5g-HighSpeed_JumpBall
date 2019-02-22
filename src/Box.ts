class Box extends GameObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    protected boxColor : number;
    static boxMove : boolean = false;
    //static moveDistance : number = 0;
    static blockdownSpeed : number = 3;
    
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number) {
        super();
        this.boxPositionX = boxPositionX;
        this.boxPositionY = boxPositionY;
        this.boxWidth = boxWidth ;
        this.boxHeight =boxHeight;
        this.boxColor = boxColor;
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
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }


    updateContent(){
        this.moveBlock();
        this.gameOver();
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

    }

    gameOver(){
        if(CreateGameScene.gameOverFlag == true){
            CreateWorld.world.off("beginContact",  this.collision);

        }
    }


}


class NormalBlock extends Box{

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
    }

}

class HorizontalMoveBlock extends Box{

    private rightMove : boolean;
    static horizontalMoveSpeed : number = 2;

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
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

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
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

class CeilingBlock extends Box{

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
    }

    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height, collisionGroup: GraphicShape.CEILING, collisionMask:GraphicShape.CIECLE, fixedRotation:true, sensor : false
        });

        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    updateContent(){

    }

}

class DownCeilingBlock extends CeilingBlock{

    static blockdownSpeed : number = 0.5;
    public life : number = 1;
    private lifeText : DownCeilingText | null = null;


    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number, life:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
        this.life = life || 1;
        this.lifeText = new DownCeilingText(boxPositionX,boxPositionY,this.life.toString(),100, 0.5,0xFFFFFF,"Meiryo",0x000000, 0);

    }

    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height, collisionGroup: GraphicShape.DOWN_CEILING, collisionMask:GraphicShape.CIECLE, fixedRotation:true, sensor : false
        });

        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }    

    updateContent(){
        this.moveBlock();
        this.gameOver();
    }

    moveBlock(){
        if(Box.boxMove == true && this.lifeText.deleteFlag == false){
            this.body.position[1] +=   DownCeilingBlock.blockdownSpeed;
            this.shape.y +=            DownCeilingBlock.blockdownSpeed;

            this.lifeText.y = this.shape.y;
            this.lifeText.text = this.life.toString();

        }
        
    }

    collision(evt) : void {

        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB  = evt.shapeB;
       

        if(shapeB.collisionGroup  == GraphicShape.CIECLE && shapeA.collisionGroup  == GraphicShape.DOWN_CEILING){
            this.life -= 1;
            if(this.life <= 0){
                CreateWorld.world.removeBody(this.body);
                GameObject.display.removeChild(this.shape);

                this.lifeText.deleteFlag = true;
                this.lifeText.text = null;
                
            }
        }

    }

    gameOver(){
        if(CreateGameScene.gameOverFlag == true){
            this.lifeText.deleteFlag = true;
            this.lifeText.text = null;

        }
    }





}

class DeadBlock extends Box{

    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight, boxColor);
    }

    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height, collisionGroup: GraphicShape.DEAD_LINE, collisionMask:GraphicShape.CIECLE, fixedRotation:true, sensor : true
        });

        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    updateContent(){
        //this.gameOver();
    }

    collision(evt) : void {

        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB  = evt.shapeB;

        if(shapeB.collisionGroup  == GraphicShape.CIECLE && shapeA.collisionGroup  == GraphicShape.DEAD_LINE){
            CreateGameScene.gameOverFlag = true;
            //ゲームオーバーの表示
            if(CreateGameScene.gameOverText == null){
                CreateGameScene.gameOverText = [];
                CreateGameScene.gameOverText[0] = new GameOverText(CreateGameScene.width/2 ,CreateGameScene.height /2 -50,"GAME OVER",180, 0.5,0xFFFFFF,"Meiryo",0x000000, 2);
                CreateGameScene.gameOverText[1] = new GameOverText(CreateGameScene.width/2 ,CreateGameScene.height /2 +50,"Score " + Math.floor(CreateGameScene.score).toString(),120, 0.5,0xFFFFFF,"Meiryo",0x000000, 2);

            }

            GameObject.display.stage.once(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.retry(e), this);
    
        }

    }

/*    gameOver(){
        if(CreateGameScene.gameOverFlag == true){
            CreateWorld.world.off("beginContact",  this.collision);

        }
    }*/

    retry(e: egret.TouchEvent){
        CreateGameScene.init();

    }


}




class WallBlock extends GameObject{
    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    protected boxColor : number;
    static boxMove : boolean = false;
    //static moveDistance : number = 0;
    static blockdownSpeed : number = 3;
    
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number, boxColor:number) {
        super();
        this.boxPositionX = boxPositionX;
        this.boxPositionY = boxPositionY;
        this.boxWidth = boxWidth ;
        this.boxHeight =boxHeight;
        this.boxColor = boxColor;
        this.setBody(this.boxPositionX, this.boxPositionY, this.boxWidth, this.boxHeight);
        this.setShape(this.boxWidth, this.boxHeight);


    }


    setBody(x: number, y:number, width: number, height : number){

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height,collisionGroup: GraphicShape.WALL, collisionMask:GraphicShape.CIECLE, fixedRotation:true, sensor : false
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
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }


    updateContent(){

    }







}