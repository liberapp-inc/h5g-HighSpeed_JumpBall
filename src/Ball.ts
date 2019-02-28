class Ball extends GameObject{

    static I:Ball = null;   // singleton instance
    static ballPosY : number;
    static finalBallPosY : number ;
    static checkRiseFlag : boolean = false;
    static collisionFlag : boolean = false;

    radius:number = 20;


    constructor() {
        super();

        Ball.I = this;
        this.setBody(CreateGameScene.width/2, CreateGameScene.height-100, this.radius);
        this.setShape(this.radius);
        Ball.ballPosY = this.body.position[1];
        Ball.finalBallPosY =  CreateGameScene.height-100;
        if(GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN) == false){
            
            GameObject.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => Ball.touchMove(e), false);
        }

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

    static touchMove(e:egret.TouchEvent){
        
        if(e.stageX <= Ball.I.shape.x && Ball.I.shape.x > 80){
            
            Ball.I.body.applyForce([-2000,0],[0,0]);
        }
        else if(e.stageX > Ball.I.shape.x && Ball.I.shape.x < CreateGameScene.width - 80)
        {
           Ball.I.body.applyForce([2000, 0],[0,0]);

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
/*        console.log(GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN));
            GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => Ball.touchMove(e), false);
        console.log(GameObject.display.hasEventListener(egret.TouchEvent.TOUCH_BEGIN));*/

            Ball.I =null;
            //this.destroy();
        }
    }

}