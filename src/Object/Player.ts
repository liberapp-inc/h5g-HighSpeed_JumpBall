class Player extends PhysicsObject{

    static I : Player = null;
    private maxBallPosY : number = 0;
    private ballPosY : number;
    private start : boolean = false;
    private clockwise : boolean = false;

    private nowJump : boolean = false;
    private touchLeftWall : boolean = true;


    constructor(x:number, y:number,diameter:number) {
        super(x,y,diameter,diameter);
        Player.I = this;
        this.ballPosY = y;//オススメ0.6くらい
        this.maxBallPosY = this.ballPosY;
        this.setBody(x, y, diameter/2);
        this.setShape(0,0,diameter/2,ColorPallet.RED);
        PhysicsObject.world.on("beginContact", this.collision, this);

    }

    private setShape(x:number, y:number,radius:number,color:number){
        const shape : egret.Shape = Util.setCircle(x,y,radius,color,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    private setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({
            mass : 1, 
            position:[x,y],
            fixedX:true,
        });
        this.bodyShape = new p2.Circle({
            radius : radius, 
            fixedRotation:true,
            sensor:true,
            collisionGroup: GraphicShape.CIECLE, 
            collisionMask: GraphicShape.BLOCK,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    }
    

    private setLine(x : number, y : number, length : number, degree : number, lineWidth:number, color:number ){
        const shape : egret.Shape = Util.setLine(x,y,length,degree,lineWidth,color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }


    private checkJump(){
        
        if(this.body.velocity[1] < 0){//上昇中の場合
            this.nowJump = true;
            this.bodyShape.sensor = true;
            return;
        }
        else{
            this.nowJump = false;
            return;
        }
    }


    collision(evt){
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB  = evt.shapeB;
        if(!this.nowJump){
            if(shapeA.collisionGroup == GraphicShape.BLOCK || shapeB.collisionGroup == GraphicShape.BLOCK){
                CreateGameScene.block.forEach(b =>{
                    
                    if(b.body == bodyA || b.body == bodyB){
                        this.jump();
                        Score.addScore();
                        CreateGameScene.I.changeBlockWidth();
                        CreateGameScene.I.changeMaxSubStep();
                        CreateGameScene.freshArray();
                        return;
                    }
                });
            }

        }
        
        
 
    }

     fixedUpdate(){        
        this.updateDrowShape();
        this.checkJump();
        if(this.maxBallPosY > this.compornent.y){
            this.maxBallPosY = this.compornent.y;
            Camera2D.y = this.ballPosY - this.compornent.y;
            Camera2D.transform( GameStage.display );
        }
        this.checkGameOver();
        
    }

    checkGameOver(){
        if(this.maxBallPosY - this.compornent.y < -Game.height*0.54 && GameOver.gameOverFlag == false){
            new GameOver(0,0,0,0);
        }
    }

    jump(){
            this.nowJump = true;
            const power : number = 12000;
            this.body.applyForce([0, -power],[0,0]);
        if(!this.nowJump){

        }

    }

    addDestroyPhysicsMethod(){
        PhysicsObject.world.off("beginContact", this.collision);
    }

    getStart():boolean{
        return this.start;
    }
    setStart(value : boolean){
        this.start = value;
    }

    getPosX():number{
        return this.body.position[0];
    }
    setPosX(x:number){
        this.body.position[0] = x;
    }

    getMaxBallPosY():number{
        return this.maxBallPosY;
    }

}


