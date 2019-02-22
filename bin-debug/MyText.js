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
    };
    return MyText;
}(GameObject));
__reflect(MyText.prototype, "MyText");
var ScoreText = (function (_super) {
    __extends(ScoreText, _super);
    function ScoreText(x, y, text, size, ratio, color, font, stColor, stSize) {
        return _super.call(this, x, y, text, size, ratio, color, font, stColor, stSize) || this;
    }
    ScoreText.prototype.updateContent = function () {
        this.updateText("Score " + Math.floor(CreateGameScene.score).toString());
    };
    return ScoreText;
}(MyText));
__reflect(ScoreText.prototype, "ScoreText");
var GameOverText = (function (_super) {
    __extends(GameOverText, _super);
    function GameOverText(x, y, text, size, ratio, color, font, stColor, stSize) {
        var _this = _super.call(this, x, y, text, size, ratio, color, font, stColor, stSize) || this;
        _this.myTextField.anchorOffsetX = _this.myTextField.width / 2;
        _this.myTextField.anchorOffsetY = _this.myTextField.height / 2;
        return _this;
    }
    GameOverText.prototype.updateContent = function () {
    };
    return GameOverText;
}(MyText));
__reflect(GameOverText.prototype, "GameOverText");
var DownCeilingText = (function (_super) {
    __extends(DownCeilingText, _super);
    function DownCeilingText(x, y, text, size, ratio, color, font, stColor, stSize) {
        var _this = _super.call(this, x, y, text, size, ratio, color, font, stColor, stSize) || this;
        _this.deleteFlag = false;
        _this.myTextField.anchorOffsetX = _this.myTextField.width / 2;
        _this.myTextField.anchorOffsetY = _this.myTextField.height / 2;
        _this.text = text;
        return _this;
    }
    DownCeilingText.prototype.updateContent = function () {
        //this.myTextField.y += CreateGameScene.downCeilingLife;
        this.updateDownText(this.y, this.text, this.deleteFlag);
    };
    DownCeilingText.prototype.updateDownText = function (y, text, deleteflag) {
        if (this.deleteFlag == true) {
            this.myTextField.text = "";
        }
        else {
            this.myTextField.y = y;
            this.myTextField.textFlow = [
                { text: text,
                    style: {
                        "textColor": this.color || 0x000000, "size": this.size || 1, "fontFamily": this.font || "Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                    }
                }
            ];
        }
        //GameObject.display.addChild(this.myTextField);        
    };
    return DownCeilingText;
}(MyText));
__reflect(DownCeilingText.prototype, "DownCeilingText");
//# sourceMappingURL=MyText.js.map