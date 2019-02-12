class Main extends eui.UILayer {

    static timeStamp : number;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        GameObject.initial( this.stage );
        Game.init();
        egret.startTick(this.tickLoop, this);
       
    }

    tickLoop(timeStamp:number = Main.timeStamp):boolean{
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    }
    
}

class Game{

    public static height: number;
    public static width: number;

    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
    }


}

abstract class GameObject {
    
    protected shape:egret.Shape = null;
    protected body : p2.Body = null;
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
        this.createWall();
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
                    planeBody[i].position=  [0, Game.height];
                    planeBody[i].angle = Math.PI;//rad表記
                break;

                //右の壁
                case 1:
                    planeBody[i].position=  [Game.width, Game.height];
                    planeBody[i].angle = Math.PI/2;//rad表記
                break;

                //左の壁
                case 2:
                    planeBody[i].position=  [0, Game.height];
                    planeBody[i].angle = 3* Math.PI/2;//rad表記
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


    radius:number = 20;


    constructor() {
        super();

        Ball.I = this;
        this.setBody(Game.width/2 *0.5, 0, this.radius);
        this.setShape(Game.width/2 *0.5,0, this.radius);

    }

    setBody(x: number, y:number, radius: number){

        this.body = new p2.Body({mass : 1, position:[x,y]});
        this.bodyShape = new p2.Circle({radius : radius});
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        
    }

    setShape(x: number, y:number, radius: number){
        if( this.shape ){
            GameObject.display.removeChild(this.shape);        
        }

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(this.body.position[0], this.body.position[1], radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
        
    }

    updateDrowShape(){
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    }


    updateContent(){
        this.updateDrowShape();
        
    }



}

