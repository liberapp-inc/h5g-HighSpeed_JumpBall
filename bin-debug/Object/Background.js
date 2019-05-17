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
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.color = ColorPallet.WHITE;
        Background.I = _this;
        Background.createPosY = 0;
        _this.setCompornent(0, 0, Game.width, Game.height);
        _this.setShape(0, 0, Game.width, Game.height, _this.color);
        return _this;
    }
    Background.prototype.setCompornent = function (x, y, width, height) {
        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameObject.display.addChild(this.compornent);
    };
    Background.prototype.setShape = function (x, y, width, height, color) {
        var shape = Util.setRect(x, y, width, height, color, 0, true);
        this.compornent.addChild(shape);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    };
    Background.prototype.updateContent = function () { };
    Background.I = null;
    Background.createPosY = 0;
    return Background;
}(GameObject));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Background.js.map