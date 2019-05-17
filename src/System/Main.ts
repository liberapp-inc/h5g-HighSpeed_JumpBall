enum ColorPallet{

    //自然
    WHITE = 0xffffff,
    BLUE = 0x80bd9e,
    RED = 0xf16b6f,

}
//const BALL_SIZE_METER = 0.6;
const PIXEL_PER_METER = 1;

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        Util.init( this );
        CheckDate.init();
        SaveData.init();
        GameObject.init( this.stage );
        PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        PhysicsObject.step(timeStamp);
        GameObject.update();
        return false;
    }

}

class Game{

    static height: number;
    static width: number;

    static init() {
        
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width  = egret.MainContext.instance.stage.stageWidth;

        GameOver.gameOverFlag = false;
        PhysicsObject.world.gravity = [0, 0];
        PhysicsObject.maxSubStep = 30;

        /* new メソッドを記入*/
        new Background();
        new GameStage();
        new UILayer();
        //new Ground(0,Game.height-200,Game.width,0,4,ColorPallet.RED);
        new Player(Game.width/2,Game.height* 0.5,Game.width*0.1);
        //new Player(Game.width/2,Game.height-250,Game.width*0.1);
        new Score(0,0,0,0, ColorPallet.RED);
        new Description(0,0,0,0, ColorPallet.RED);
        //new TimeLimit(Game.width/2,0,0,0, ColorPallet.RED);
        new CreateGameScene();
        
    }


}



