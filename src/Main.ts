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
    static boxInterval :number = 100;
    
    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
        new NormalBox(CreateGameScene.width/2, CreateGameScene.height-10, 100, 30);
        




        for(let i = 1; i < 50; i++)
            new NormalBox(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval*i+CreateGameScene.height, 100, 30);
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
        Ball.ballPosY = this.body.position[1];
        
    }

    touchMove(e:egret.TouchEvent){
        
        if(e.stageX <= this.shape.x){
            
            this.body.applyForce([-500,0],[0,0]);
        }
        else{
            this.body.applyForce([500, 0],[0,0]);

        }
        
    }





}

class Box extends GameObject{

    protected boxWidth :number;
    protected boxHeight :number;
    protected boxPositionX : number;
    protected boxPositionY : number;
    static boxMove : boolean = false;
    static moveDistance : number = 0;
    
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

        //y -= height/2;
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
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawRect(0, 0, width , height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        
    }

/*    updateDrowShape(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    }*/

private a : number = 0;
static s : number = 0;
static v : number = 0;
    updateContent(){
        //console.log( Box.boxMove);
/*        this.s = Box.moveDistance;
        this.v = Box.moveDistance/50;
        console.log(this.a);
        console.log(this.s);*/

        if(this.a >= Box.moveDistance){
        Box.s=0;
        Box.v = 0;
        this.a = 0;

        //console.log(Box.boxMove);
        Box.boxMove = false


        }else{

            this.body.position[1] +=   Box.v;
            this.shape.y +=            Box.v;
            this.a +=                  Box.v;
            
        }

        if(Box.boxMove == true){
            
        }
    }

    collision(evt) : void {
        
       
        const bodyA: p2.Body = evt.bodyA;
/*        const bodyB: p2.Body = evt.bodyB;*/
        const shapeA  = evt.shapeA;
/*        const shapeB = evt.shapeB;*/
/*        if((shapeA.collisionGroup  == GraphicShape.BOX && shapeB.collisionGroup == GraphicShape.CIECLE) 
        || (shapeB.collisionGroup  == GraphicShape.BOX && shapeA.collisionGroup == GraphicShape.CIECLE) ){


            console.log(Ball.ballPosY);
            console.log(bodyA.position[1]);
            console.log(bodyB.position[1]);
            
            //Ball.I.body.applyForce([0,-10000],[0,0]);



        }*/
        //足場よりもボールが上にあるとき

        if(Box.boxMove == false){

            if(Ball.ballPosY < bodyA.position[1]){
                
                Box.moveDistance = Ball.finalBallPosY -bodyA.position[1] ;
                Ball.finalBallPosY = bodyA.position[1];
                Ball.I.body.applyForce([0,-10000],[0,0]);


                this.a = 0;
                Box.s = 0;
                Box.v = 0;
                Box.s = Box.moveDistance + this.boxHeight/2;
                Box.v = Box.moveDistance/20;
                Ball.finalBallPosY += Box.s;
                Box.boxMove = true;

            }
        }



    }


}


class NormalBox extends Box{
    constructor(boxPositionX : number, boxPositionY : number, boxWidth : number, boxHeight : number){
        super(boxPositionX, boxPositionY , boxWidth, boxHeight);
        
    }
}

