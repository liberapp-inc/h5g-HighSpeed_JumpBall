class Ball extends GameObject{

    static I:Ball = null;   // singleton instance
    static ballPosY : number;
    static finalBallPosY : number ;
    static checkRiseFlag : boolean = false;

    radius:number = 20;


    constructor() {
        super();

        Ball.I = this;
        this.setBody(CreateGameScene.width/2, CreateGameScene.height-100, this.radius);
        this.setShape(this.radius);
        Ball.ballPosY = this.body.position[1];
        Ball.finalBallPosY =  CreateGameScene.height-100;
        
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchMove(e), this);

    }

    setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({mass : 1, position:[x,y]});
        this.bodyShape = new p2.Circle({
            radius : radius, collisionGroup: GraphicShape.CIECLE, collisionMask:GraphicShape.BOX | GraphicShape.CEILING | GraphicShape.DEAD_LINE | GraphicShape.DOWN_CEILING | GraphicShape.WALL, fixedRotation:true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    setShape(radius: number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

    updateDrowShape(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    }


    updateContent(){
        this.updateDrowShape();
        this.checkRise();
        if(CreateGameScene.gameOverFlag == false){
            CreateGameScene.score += Box.blockdownSpeed;

        }
        this.gameOver();

        
    }

    touchMove(e:egret.TouchEvent){
        
        if(e.stageX <= this.shape.x && this.shape.x > 80){
            
            this.body.applyForce([-500,0],[0,0]);
        }
        else if(e.stageX > this.shape.x && this.shape.x < CreateGameScene.width - 80)
        {
            this.body.applyForce([500, 0],[0,0]);

        }
        
    }

    checkRise(){
        Ball.ballPosY = this.body.position[1];

        //取得したボールの高さよりも現在の方が上　→　上昇
        if(Ball.ballPosY < this.body.position[1]){
            Ball.checkRiseFlag = true;
        }else{
            Ball.checkRiseFlag = false;

        }

    }
    gameOver(){
        if(CreateGameScene.gameOverFlag == true){
            Ball.I =null;

        }
    }

}