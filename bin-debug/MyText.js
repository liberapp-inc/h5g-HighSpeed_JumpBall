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
var MyText = (function (_super) {
    __extends(MyText, _super);
    function MyText(x, y, text, size, ratio, color, font, stColor, stSize) {
        var _this = _super.call(this) || this;
        _this.myTextField = null;
        _this.myText = null;
        _this.x = 0;
        _this.y = 0;
        _this.size = 1;
        _this.ratio = 1;
        _this.color = 0x000000;
        _this.stColor = 0x0000000;
        _this.stSize = 0;
        _this.font = "Meiryo";
        _this.text = "";
        _this.newText(x, y, text, size, ratio, color, font, stColor, stSize);
        _this.x = x;
        _this.y = y;
        _this.text = text;
        _this.size = size;
        _this.ratio = ratio;
        _this.color = color;
        _this.font = font;
        _this.stColor = stColor;
        _this.stSize = stSize;
        return _this;
    }
    MyText.prototype.newText = function (x, y, text, size, ratio, color, font, stColor, stSize) {
        this.myTextField = new egret.TextField();
        this.myTextField.x = x || 0;
        this.myTextField.y = y || 0;
        this.myTextField.scaleX = ratio || 1;
        this.myTextField.scaleY = ratio || 1;
        this.myTextField.textFlow = [
            { text: text,
                style: {
                    "textColor": color || 0x000000, "size": size || 1, "fontFamily": font || "Meiryo", "strokeColor": stColor || 0x000000, "stroke": stSize || 0,
                }
            }
        ];
        GameObject.display.addChild(this.myTextField);
    };
    MyText.prototype.updateText = function (text) {
        this.myTextField.textFlow = [
            { text: text,
                style: {
                    "textColor": this.color || 0x000000, "size": this.size || 1, "fontFamily": this.font || "Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                }
            }
        ];
        GameObject.display.addChild(this.myTextField);
    };
    MyText.prototype.updateContent = function () {
        this.updateText("Score " + Math.floor(CreateGameScene.score).toString());
    };
    return MyText;
}(GameObject));
__reflect(MyText.prototype, "MyText");
//# sourceMappingURL=MyText.js.map