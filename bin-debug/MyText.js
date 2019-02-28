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
var ScoreText = (function (_super) {
    __extends(ScoreText, _super);
    function ScoreText(x, y, text, size, ratio, color, bold) {
        var _this = _super.call(this) || this;
        _this.myTextField = null;
        _this.myText = null;
        ScoreText.I = _this;
        _this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild(_this.myTextField);
        return _this;
    }
    ScoreText.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.myTextField);
        this.myTextField = null;
    };
    ScoreText.prototype.updateContent = function () {
        this.myTextField.text = "SCORE : " + Math.floor(CreateGameScene.score).toString();
    };
    ScoreText.I = null;
    return ScoreText;
}(GameObject));
__reflect(ScoreText.prototype, "ScoreText");
var GameOverText = (function (_super) {
    __extends(GameOverText, _super);
    function GameOverText(x, y, text, size, ratio, color, bold) {
        var _this = _super.call(this) || this;
        //static I : ScoreText = null;
        _this.myTextField = null;
        _this.myText = null;
        _this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild(_this.myTextField);
        _this.myTextField.anchorOffsetX = _this.myTextField.width / 2;
        _this.myTextField.anchorOffsetY = _this.myTextField.height / 2;
        return _this;
    }
    GameOverText.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.myTextField);
        this.myTextField = null;
    };
    GameOverText.prototype.updateContent = function () {
        //this.myTextField.text = "SCORE : " + Math.floor(CreateGameScene.score).toString();
    };
    return GameOverText;
}(GameObject));
__reflect(GameOverText.prototype, "GameOverText");
var DownCeilingText = (function (_super) {
    __extends(DownCeilingText, _super);
    function DownCeilingText(x, y, text, size, ratio, color, bold) {
        var _this = _super.call(this) || this;
        _this.myTextField = null;
        _this.myText = null;
        _this.deleteFlag = false;
        _this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild(_this.myTextField);
        _this.myTextField.anchorOffsetX = _this.myTextField.width / 2;
        _this.myTextField.anchorOffsetY = _this.myTextField.height / 2;
        _this.myText = text;
        _this.y = y;
        return _this;
    }
    DownCeilingText.prototype.updateContent = function () {
        //this.myTextField.y += CreateGameScene.downCeilingLife;
        this.updateDownText(this.y, this.myText, this.deleteFlag);
    };
    DownCeilingText.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.myTextField);
        this.myTextField = null;
    };
    DownCeilingText.prototype.updateDownText = function (y, text, deleteflag) {
        if (this.deleteFlag == true) {
            this.myTextField.text = "";
        }
        else {
            this.myTextField.y = y;
            this.myTextField.text = text;
        }
    };
    return DownCeilingText;
}(GameObject));
__reflect(DownCeilingText.prototype, "DownCeilingText");
//# sourceMappingURL=MyText.js.map