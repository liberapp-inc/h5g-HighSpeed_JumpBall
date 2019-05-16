//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
class UILayer{

    static I :UILayer = null;
    static display: eui.UILayer = null;
    static index :number;
    static onTouch :boolean = false;

    private pushPos : number = 0;
    private releasePos : number = 0;
/*    private pushPos : number[] = [0,0];
    private releasePos : number[] = [0,0];
    private direction : number[] = [0,0];*/

    private initialBallPos : number = 0;

    constructor(){
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display) ;
        UILayer.display.once( egret.TouchEvent.TOUCH_BEGIN, this.deleteDescription, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.move, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
    }

    setContainer(){
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    }

/*    push(e : egret.TouchEvent){
        UILayer.onTouch = true;
        this.pushPos = [e.stageX,e.stageY];
        
        //Player.I.jump();
    }
    move(e : egret.TouchEvent){
        UILayer.onTouch = true;
        //Player.I.setPosX(e.stageX);
    }

    end(e : egret.TouchEvent){
        UILayer.onTouch = false;
        this.releasePos = [e.stageX,e.stageY];
        this.setDirection(this.releasePos, this.pushPos);        
        Player.I.shot();
    }

    private setDirection(init : number[], end : number[]){
        this.direction = [];
        this.direction[0] = end[0]- init [0];
        this.direction[1] = end[1]- init [1];
    }

    getDirection():number[]{
        return this.direction;
    }*/

    push(e : egret.TouchEvent){
        UILayer.onTouch = true;
        this.initialBallPos = Player.I.getPosX();
        this.pushPos = e.stageX;
        //Player.I.jump();
    }
    move(e : egret.TouchEvent){
        UILayer.onTouch = true;
        this.releasePos = e.stageX;
        const nowPlayerPos :number = (this.releasePos - this.pushPos) + this.initialBallPos;
        Player.I.setPosX(nowPlayerPos);
    }

    end(){
        UILayer.onTouch = false;
/*        this.pushPos = 0;
        this.releasePos = 0;
        this.initialBallPos = 0;*/

    }

    deleteDescription(){
        //Player.I.setStart(true);
        if(!Player.I.getStart()){Player.I.setStart(true);}
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

