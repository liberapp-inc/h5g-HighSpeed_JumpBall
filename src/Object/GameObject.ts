// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
//  compornentはshapeをひとまとめにする用の親コンテナ。継承先でsetCompornentすること

abstract class GameObject {
    
    static objects: GameObject[] = [];
    static display: egret.DisplayObjectContainer;
    static transit:()=>void;

    compornent: egret.DisplayObjectContainer = null;
    shapes :egret.Shape[] = [];
    destroyFlag : boolean = false;

    abstract updateContent() : void;

    constructor() {
        GameObject.objects.push(this);
    }


    static init(mainStage: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = mainStage;
    }


    //オブジェクトを削除
    destroy() { this.destroyFlag = true; }
    
    //shapeの削除など、destroy後に追加処理が必要なら記述
    addDestroyMethod(){}


    protected delete(){

        this.addDestroyMethod();

        if( this.shapes && this.compornent){
            this.shapes.forEach(s => {
                this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        Util.remove(GameObject.display, this.compornent);
        const newArray : GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
        GameObject.objects = newArray;
    }

    static allDestroy(){
        GameObject.objects = GameObject.objects.filter( obj => {
            obj.destroy();
            obj.delete();
            return false; 
        });
    }

    //繰り返しメソッド
    static update(){
        GameObject.objects.forEach(obj => obj.updateContent());

        //destroyFlagがtrueならshapeを削除
        GameObject.objects = GameObject.objects.filter( obj =>{
            if( obj.destroyFlag ) obj.delete();
            return ( !obj.destroyFlag );
        } );

        if( GameObject.transit ) {
            GameObject.allDestroy();
            GameObject.transit();
            GameObject.transit = null;
        }

    }
}


//GameStageに描画する用のコンポーネント
abstract class GameCompornent extends GameObject{

    constructor(x : number, y : number, width : number, height : number){
        super();
        this.setCompornent(x,y,width,height);
    }

    setCompornent(x : number, y : number, width : number, height : number){

        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChild(this.compornent);
    }

    //オーバーライド
    protected delete(){

        this.addDestroyMethod();
        
        if( this.shapes && this.compornent){
            this.shapes.forEach(s => {
                this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if(this.compornent){
            Util.remove(GameStage.display, this.compornent);
        }
        const newArray : GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
        GameObject.objects = newArray;
    }

}

//UILayerに描画する用のコンポーネント
abstract class UICompornent extends GameObject{

    static compornents: UICompornent[] = [];

    constructor(x : number, y : number, width : number, height : number){
        super();
        this.setCompornent(x,y,width,height);
    }

    setCompornent(x : number, y : number, width : number, height : number){

        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        UILayer.display.addChild(this.compornent);
    }

    //オーバーライド
    protected delete(){

        this.addDestroyMethod();

        if( this.shapes && this.compornent){
            this.shapes.forEach(s => {
                this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if(this.compornent){
            Util.remove(UILayer.display, this.compornent);
        }
        const newArray : GameObject[] = GameObject.objects.filter(obj => obj.destroyFlag !== true);
        GameObject.objects = newArray;
    }

}