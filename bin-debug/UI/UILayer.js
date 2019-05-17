var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
var UILayer = (function () {
    function UILayer() {
        this.pushPos = 0;
        this.releasePos = 0;
        /*    private pushPos : number[] = [0,0];
            private releasePos : number[] = [0,0];
            private direction : number[] = [0,0];*/
        this.initialBallPos = 0;
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display);
        //UILayer.display.once( egret.TouchEvent.TOUCH_BEGIN, this.deleteDescription, this );
        UILayer.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.push, this);
        UILayer.display.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
        UILayer.display.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
    }
    UILayer.prototype.setContainer = function () {
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    };
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
    UILayer.prototype.push = function (e) {
        UILayer.onTouch = true;
        this.initialBallPos = Player.I.getPosX();
        this.pushPos = e.stageX;
        //Player.I.jump();
    };
    UILayer.prototype.move = function (e) {
        if (!Player.I.getStart()) {
            this.deleteDescription();
        }
        UILayer.onTouch = true;
        this.releasePos = e.stageX;
        var nowPlayerPos = (this.releasePos - this.pushPos) + this.initialBallPos;
        Player.I.setPosX(nowPlayerPos);
    };
    UILayer.prototype.end = function () {
        UILayer.onTouch = false;
        this.pushPos = 0;
        this.releasePos = 0;
        //this.initialBallPos = 0;
    };
    UILayer.prototype.deleteDescription = function () {
        //Player.I.setStart(true);
        Description.I.destroy();
        PhysicsObject.world.gravity = [0, 9.8];
        Player.I.setStart(true);
    };
    UILayer.prototype.remove = function () {
        if (UILayer.display) {
            UILayer.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.push, this);
            UILayer.display.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display = null;
        }
    };
    UILayer.I = null;
    UILayer.display = null;
    UILayer.onTouch = false;
    return UILayer;
}());
__reflect(UILayer.prototype, "UILayer");
//# sourceMappingURL=UILayer.js.map