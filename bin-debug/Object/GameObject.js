// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  オブジェクトを破棄するときはdestroy()を呼ぶ
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）
//  シーンを切り替えたい場合は transitにシーンロード関数を設定（全オブジェクトを破棄してからtransitを実行）
//  compornentはshapeをひとまとめにする用の親コンテナ。継承先でsetCompornentすること
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameObject = (function () {
    function GameObject() {
        this.compornent = null;
        this.shapes = [];
        this.destroyFlag = false;
        GameObject.objects.push(this);
    }
    GameObject.init = function (mainStage) {
        GameObject.objects = [];
        GameObject.display = mainStage;
    };
    //オブジェクトを削除
    GameObject.prototype.destroy = function () { this.destroyFlag = true; };
    //shapeの削除など、destroy後に追加処理が必要なら記述
    GameObject.prototype.addDestroyMethod = function () { };
    GameObject.prototype.delete = function () {
        var _this = this;
        this.addDestroyMethod();
        if (this.shapes && this.compornent) {
            this.shapes.forEach(function (s) {
                _this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        Util.remove(GameObject.display, this.compornent);
        var newArray = GameObject.objects.filter(function (obj) { return obj.destroyFlag !== true; });
        GameObject.objects = newArray;
    };
    GameObject.allDestroy = function () {
        GameObject.objects = GameObject.objects.filter(function (obj) {
            obj.destroy();
            obj.delete();
            return false;
        });
    };
    //繰り返しメソッド
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
        //destroyFlagがtrueならshapeを削除
        GameObject.objects = GameObject.objects.filter(function (obj) {
            if (obj.destroyFlag)
                obj.delete();
            return (!obj.destroyFlag);
        });
        if (GameObject.transit) {
            GameObject.allDestroy();
            GameObject.transit();
            GameObject.transit = null;
        }
    };
    GameObject.objects = [];
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
//GameStageに描画する用のコンポーネント
var GameCompornent = (function (_super) {
    __extends(GameCompornent, _super);
    function GameCompornent(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.setCompornent(x, y, width, height);
        return _this;
    }
    GameCompornent.prototype.setCompornent = function (x, y, width, height) {
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChild(this.compornent);
    };
    //オーバーライド
    GameCompornent.prototype.delete = function () {
        var _this = this;
        this.addDestroyMethod();
        if (this.shapes && this.compornent) {
            this.shapes.forEach(function (s) {
                _this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if (this.compornent) {
            Util.remove(GameStage.display, this.compornent);
        }
        var newArray = GameObject.objects.filter(function (obj) { return obj.destroyFlag !== true; });
        GameObject.objects = newArray;
    };
    return GameCompornent;
}(GameObject));
__reflect(GameCompornent.prototype, "GameCompornent");
//UILayerに描画する用のコンポーネント
var UICompornent = (function (_super) {
    __extends(UICompornent, _super);
    function UICompornent(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.setCompornent(x, y, width, height);
        return _this;
    }
    UICompornent.prototype.setCompornent = function (x, y, width, height) {
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        UILayer.display.addChild(this.compornent);
    };
    //オーバーライド
    UICompornent.prototype.delete = function () {
        var _this = this;
        this.addDestroyMethod();
        if (this.shapes && this.compornent) {
            this.shapes.forEach(function (s) {
                _this.compornent.removeChild(s);
                s = null;
            });
            this.shapes = [];
        }
        if (this.compornent) {
            Util.remove(UILayer.display, this.compornent);
        }
        var newArray = GameObject.objects.filter(function (obj) { return obj.destroyFlag !== true; });
        GameObject.objects = newArray;
    };
    UICompornent.compornents = [];
    return UICompornent;
}(GameObject));
__reflect(UICompornent.prototype, "UICompornent");
//# sourceMappingURL=GameObject.js.map