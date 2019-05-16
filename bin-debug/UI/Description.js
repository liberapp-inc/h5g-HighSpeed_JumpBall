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
var Description = (function (_super) {
    __extends(Description, _super);
    function Description(x, y, width, height, color) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.text = null;
        _this.textBest = null;
        _this.textColor = 0x000000;
        Description.I = _this;
        _this.textColor = color;
        Score.bestScore = SaveData.object.bestScore;
        _this.setText();
        return _this;
    }
    Description.prototype.setText = function () {
        this.text = Util.myText(Game.width / 2, Game.height / 2.22, "ドラッグでスタート\n\n\n← ← ←         　  → → →", 80, 0.5, this.textColor, true);
        this.text.anchorOffsetX = this.text.width / 2;
        this.text.anchorOffsetY = this.text.height / 2;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.compornent.addChild(this.text);
    };
    Description.prototype.addDestroyMethod = function () {
        if (this.compornent) {
            this.compornent.removeChildren();
        }
        this.text = null;
    };
    Description.prototype.updateContent = function () { };
    Description.I = null;
    return Description;
}(UICompornent));
__reflect(Description.prototype, "Description");
//# sourceMappingURL=Description.js.map