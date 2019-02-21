//衝突判定用の列挙
enum GraphicShape{
    NONE = Math.pow(2,0),
    CIECLE = Math.pow(2,1),
    BOX = Math.pow(2,2),
    PLANE = Math.pow(2,3),
}

enum StageLevel{
    START,
    LEVEL1,
    LEVEL2,
    GAMEOVER
}

enum Block{
    NORMAL,
    HORIZONTAL_MOVE,
    VERTICAL_MOVE

}

class Main extends eui.UILayer {

    static timeStamp : number;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial( this.stage );
        CreateGameScene.init();
        egret.startTick(this.tickLoop, this);
       
    }

    tickLoop(timeStamp:number = Main.timeStamp):boolean{
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    }

    static random(min:number, max:number):number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min:number, max:number):number {
        return Math.floor( min + Math.random() * (max+0.999 - min) );
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }
    
}

class CreateGameScene{

    static height: number;
    static width: number;
    static boxInterval :number = 80;

    
    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
        new NormalBlock(CreateGameScene.width/2, CreateGameScene.height-10, 100, 30);
        
        let randomBlock : number;


            for(let i = 1; i < 50; i++){
            
                randomBlock = Main.randomInt(0,2);

                switch(randomBlock){

                    case Block.NORMAL:
                    console.log("0");
                    new NormalBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    

                    break;

                    case Block.HORIZONTAL_MOVE:
                    console.log("1");
                    new HorizontalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;

                    case Block.VERTICAL_MOVE:
                    console.log("2");
                    new VerticalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;

                }

            }
        }


}

abstract class GameObject {
    
    protected shape:egret.Shape = null;
    public body : p2.Body = null;
    protected bodyShape : p2.Circle | p2.Box = null;
    protected world : p2.World = null;
    
    public static objects: GameObject[];
    public static display: egret.DisplayObjectContainer;
    //public static transit:()=>void;

    constructor() {
        GameObject.objects.push(this);
    }


    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    }

    abstract updateContent() : void;

    static update(){
        GameObject.objects.forEach(obj => obj.updateContent());


    }

}


class CreateWorld extends GameObject{
    static world : p2.World = null;
    constructor(){
        super();
        this.createWorld();
        //this.createWall();
        //egret.startTick(CreateWorld.worldBegin, this);
    }

    createWorld(){
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];

    }
    createWall(){
        //見えない壁や地面の生成
        for(let i = 0; i < 3; i++){
            const planeBody: p2.Body[] = [];
            planeBody[i] = new p2.Body({fixedRotation:true ,type:p2.Body.STATIC});
            const planeShape: p2.Plane[] = [];
            planeShape[i] = new p2.Plane();
            
            switch(i){
                //地面
                case 0:
                    planeBody[i].position=  [CreateGameScene.width/2, CreateGameScene.height-100];
                    planeBody[i].angle = Math.PI;//rad表記
                    //new NormalBox(planeBody[i].position[0]+180, planeBody[i].position[1], 100, 30);

                break;

                //右の壁
                case 1:
                    planeBody[i].position=  [CreateGameScene.width, CreateGameScene.height];
                    planeBody[i].angle = Math.PI/2;//rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
                break;

                //左の壁
                case 2:
                    planeBody[i].position=  [0, CreateGameScene.height];
                    planeBody[i].angle = 3* Math.PI/2;//rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
                break;

            }

            planeBody[i].addShape(planeShape[i]);
            CreateWorld.world.addBody(planeBody[i]);
        }





    }
    
    updateContent(){


    }


    static worldBegin(dt : number) :boolean{
       
        CreateWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

    

}



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
            radius : radius, collisionGroup: GraphicShape.CIECLE, collisionMask:GraphicShape.BOX | GraphicShape.PLANE, fixedRotation:true
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
    }

    touchMove(e:egret.TouchEvent){
        
        if(e.stageX <= this.shape.x){
            
            this.body.applyForce([-500,0],[0,0]);
        }
        else{
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





}

class Box extends GameObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    //static boxMove : boolean = false;
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

        this.body = new p2.Body({mass : 1, position:[x,y], type:p2.Body.KINEMATIC});
        this.bodyShape = new p2.Box({
            width : width, height : height,collisionGroup: GraphicShape.BOX, collisionMask:GraphicShape.CIECLE | GraphicShape.PLANE, fixedRotation:true, sensor : true
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
        this.body.position[1] +=   Box.blockdownSpeed;
        this.shape.y +=            Box.blockdownSpeed;
    }


    collision(evt) : void {
        
       
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;

        if(Ball.checkRiseFlag == false){

            //足場よりもボールが上にあるとき
            if(Ball.ballPosY < bodyA.position[1]){
                Ball.I.body.applyForce([0,-10000],[0,0]);

            }
        }

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