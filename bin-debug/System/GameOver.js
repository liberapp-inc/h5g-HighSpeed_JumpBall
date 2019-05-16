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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.textGameOver = null;
        _this.textScore = null;
        _this.textColor = ColorPallet.RED;
        GameOver.gameOverFlag = true;
        _this.textGameOver = Util.myText(Game.width / 2, Game.height / 2 - 50, "GAME OVER", 80, 1, _this.textColor, true);
        _this.textGameOver.anchorOffsetX = _this.textGameOver.width / 2;
        _this.textGameOver.anchorOffsetY = _this.textGameOver.height / 2;
        _this.compornent.addChild(_this.textGameOver);
        _this.textScore = Util.myText(Game.width / 2, Game.height / 2 + 50, "SCORE : " + Score.score, 80, 1, _this.textColor, true);
        _this.textScore.anchorOffsetX = _this.textScore.width / 2;
        _this.textScore.anchorOffsetY = _this.textScore.height / 2;
        _this.compornent.addChild(_this.textScore);
        UILayer.display.once(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.tap(e); }, _this);
        Score.I.saveBestScore();
        return _this;
    }
    GameOver.prototype.addDestroyMethod = function () {
        if (this.compornent) {
            this.compornent.removeChildren();
        }
        this.textGameOver = null;
        this.textScore = null;
    };
    GameOver.prototype.updateContent = function () {
    };
    GameOver.prototype.tap = function (e) {
        UILayer.I.remove();
        GameObject.transit = Game.init;
    };
    GameOver.gameOverFlag = false;
    return GameOver;
}(UICompornent));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map