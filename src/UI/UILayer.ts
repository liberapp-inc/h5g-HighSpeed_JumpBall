//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
class UILayer{

    static I :UILayer = null;
    static display: eui.UILayer = null;
    static index :number;
    static onTouch :boolean = false;

    private pushPos : number = 0;
    private releasePos : number = 0;

    private initialBallPos : number = 0;

    constructor(){
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display) ;
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.move, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
    }

    setContainer(){
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    }

    push(e : egret.TouchEvent){
        UILayer.onTouch = true;
        this.initialBallPos = Player.I.getPosX();
        this.pushPos = e.stageX;
    }
    move(e : egret.TouchEvent){
        if(!Player.I.getStart()){
            this.deleteDescription();
        }
        UILayer.onTouch = true;
        this.releasePos = e.stageX;
        const nowPlayerPos :number = (this.releasePos - this.pushPos) + this.initialBallPos;
        Player.I.setPosX(nowPlayerPos);
    }

    end(){
        UILayer.onTouch = false;
        this.pushPos = 0;
        this.releasePos = 0;
    }

    deleteDescription(){
        Description.I.destroy();
        PhysicsObject.world.gravity = [0, 9.8];
        Player.I.setStart(true);
    }

    remove(){
        if(UILayer.display){
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display =null;
        }
    }



}

