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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(x, y, width, height, index) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.indexText = null;
        _this.indexTextColor = Util.color(230, 230, 230);
        _this.shapeColor = Util.color(230, 0, 0);
        _this.mask = null;
        _this.maskColor = Util.color(0, 0, 0);
        _this.onMask = false;
        _this.setCompornentStatus(x, y, width, height);
        return _this;
    }
    Button.prototype.setCompornentStatus = function (x, y, width, height) {
        this.compornent.anchorOffsetX += width / 2;
        this.compornent.anchorOffsetY += height / 2;
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.touchEnabled = true;
        this.compornent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tap, this);
    };
    Button.prototype.setShape = function (x, y, width, height, color) {
        if (this.shapes[0]) {
            GameObject.display.removeChild(this.shapes[0]);
        }
        if (color) {
            this.shapeColor = color;
        }
        this.shapes[0] = new egret.Shape();
        this.shapes[0].x = 0;
        this.shapes[0].y = 0;
        this.shapes[0].graphics.beginFill(this.shapeColor);
        this.shapes[0].graphics.drawRoundRect(0, 0, width, height, 30);
        this.shapes[0].graphics.endFill();
        this.compornent.addChild(this.shapes[0]);
    };
    Button.prototype.setMask = function (x, y, width, height, color) {
        if (color) {
            this.maskColor = color;
        }
        this.mask = new egret.Shape();
        this.mask.x = 0;
        this.mask.y = 0;
        this.mask.alpha = 0;
        this.mask.graphics.beginFill(this.maskColor);
        this.mask.graphics.drawRoundRect(0, 0, width, height, 30);
        this.mask.graphics.endFill();
        this.shapes.push(this.mask);
        this.compornent.addChild(this.mask);
    };
    Button.prototype.setIndexText = function (x, y, width, height, index, size, ratio, color) {
        size = size | 80;
        ratio = ratio | 0.5;
        this.indexTextColor = color | this.indexTextColor;
        this.indexText = Util.myText(x, y, index, size, ratio, this.indexTextColor, true);
        this.indexText.width = this.compornent.width / ratio;
        this.indexText.height = this.compornent.height / ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        //this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.compornent.addChild(this.indexText);
    };
    Button.prototype.addDestroyMethod = function () {
        if (this.compornent.hasEventListener) {
            this.compornent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tap, this);
        }
        if (this.indexText) {
            this.compornent.removeChild(this.indexText);
            this.indexText = null;
        }
    };
    return Button;
}(UICompornent));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map