//図形などのGameObjectを描画するレイヤー
class GameStage extends GameObject{

    static display : egret.DisplayObjectContainer = null;
    static index :number;

    constructor(){
        super();
        this.setContainer();
        GameStage.index = GameObject.display.getChildIndex(GameStage.display) ;
    }

    setContainer(){
        GameStage.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(GameStage.display);
    }

    addDestroyMethod(){
        if(GameStage.display){
            GameStage.display.removeChildren();
            GameObject.display.removeChild(GameStage.display);
            GameStage.display =null;
        }
    }

    updateContent(){}

}

