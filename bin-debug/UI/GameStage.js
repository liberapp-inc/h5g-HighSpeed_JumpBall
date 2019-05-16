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
//図形などのGameObjectを描画するレイヤー
var GameStage = (function (_super) {
    __extends(GameStage, _super);
    function GameStage() {
        var _this = _super.call(this) || this;
        _this.setContainer();
        GameStage.index = GameObject.display.getChildIndex(GameStage.display);
        return _this;
    }
    GameStage.prototype.setContainer = function () {
        GameStage.display = new egret.DisplayObjectContainer();
        GameObject.display.addChild(GameStage.display);
    };
    GameStage.prototype.addDestroyMethod = function () {
        if (GameStage.display) {
            GameStage.display.removeChildren();
            GameObject.display.removeChild(GameStage.display);
            GameStage.display = null;
        }
    };
    GameStage.prototype.updateContent = function () { };
    GameStage.display = null;
    return GameStage;
}(GameObject));
__reflect(GameStage.prototype, "GameStage");
//# sourceMappingURL=GameStage.js.map