//衝突判定用の列挙
enum GraphicShape{
    NONE = Math.pow(2,0),
    CIECLE = Math.pow(2,1),
    BOX = Math.pow(2,2),
    CEILING = Math.pow(2,3),
    DEAD_LINE = Math.pow(2,4),
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
    static score :number = 0;

    
    static init() {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;
        
        /* new メソッドを記入*/
        new Background();
        new CreateWorld();
        new Wall();
        new MyText(0,0,"Score " + Math.floor(CreateGameScene.score).toString(),100, 0.5,0xFFFFFF,"Meiryo",0x000000, 0);
        new Ball();
        new NormalBlock(CreateGameScene.width/2, CreateGameScene.height-10, 100, 30);
        
        let randomBlock : number;

        let initialArangeBox :number = this.height/this.boxInterval;
        console.log(Math.floor(initialArangeBox));
        


            for(let i = 1; i < initialArangeBox; i++){
            
                randomBlock = Main.randomInt(0,2);

                switch(randomBlock){

                    case Block.NORMAL:
                    new NormalBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    

                    break;

                    case Block.HORIZONTAL_MOVE:
                    new HorizontalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;

                    case Block.VERTICAL_MOVE:
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
        /*for(let i = 0; i < 3; i++){
            const planeBody: p2.Body[] = [];
            planeBody[i] = new p2.Body({fixedRotation:true ,type:p2.Body.STATIC});
            const planeShape: p2.Plane[] = [];
            planeShape[i] = new p2.Plane({collisionGroup: GraphicShape.CEILING, collisionMask:GraphicShape.CIECLE});
            
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
        }*/






    }
    
    updateContent(){


    }


    static worldBegin(dt : number) :boolean{
       
        CreateWorld.world.step(1/60, dt/1000, 10);
        return false;
    }

    

}

class Wall extends GameObject{

    private ceilingHeight : number = 50;

        constructor() {
        super();
        this.createWall();
    }

    createWall(){
        this.body =  new p2.Body({mass : 1, position:[CreateGameScene.width/2,200], fixedRotation:true ,type:p2.Body.STATIC});
        this.bodyShape = new p2.Box({
            whidth:CreateGameScene.width, height : this.ceilingHeight, collisionGroup: GraphicShape.CEILING, collisionMask:GraphicShape.CIECLE,
        });
        //ceilingBody.position=  [CreateGameScene.width/2, CreateGameScene.height-100];
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);

        this.setShape(CreateGameScene.width, this.ceilingHeight);
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

        
    }

}



class Background extends GameObject{

    private obj : egret.Shape;
    
    constructor() {
        super();

        this.obj = new egret.Shape();
        this.obj.graphics.beginFill(0x000080);
        this.obj.graphics.drawRect(0, 0, CreateGameScene.width, CreateGameScene.height);
        this.obj.graphics.endFill();
        GameObject.display.addChild(this.obj);
    }
    
    updateContent() {}
}

