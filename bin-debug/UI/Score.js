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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score(x, y, width, height, color) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.text = null;
        _this.textBest = null;
        _this.textColor = 0x000000;
        Score.I = _this;
        Score.score = 0;
        Score.bestScore = 0;
        _this.textColor = color;
        Score.bestScore = SaveData.object.bestScore;
        _this.setText();
        return _this;
    }
    Score.prototype.setText = function () {
        this.text = Util.myText(0, 0, "SCORE : 0", 100, 0.5, this.textColor, true);
        this.compornent.addChild(this.text);
        this.textBest = Util.myText(0, 50, "BEST : " + Score.bestScore.toString(), 100, 0.5, this.textColor, true);
        Score.bestScore = SaveData.object.bestScore;
        this.textBest.text = "BEST : " + Score.bestScore.toString();
        this.compornent.addChild(this.textBest);
    };
    Score.prototype.saveBestScore = function () {
        if (Score.bestScore > SaveData.object.bestScore) {
            SaveData.object.bestScore = Score.bestScore;
            SaveData.save();
        }
    };
    Score.prototype.addDestroyMethod = function () {
        if (this.compornent) {
            this.compornent.removeChildren();
            this.compornent = null;
        }
        this.text = null;
        this.textBest = null;
        Score.score = 0;
    };
    Score.prototype.updateContent = function () {
        this.text.text = "SCORE : " + Score.score.toFixed();
        if (Score.bestScore < Score.score) {
            Score.bestScore = Score.score;
            this.textBest.text = "BEST : " + Score.bestScore.toFixed();
        }
    };
    Score.addScore = function () {
        Score.score += 1;
    };
    Score.I = null; // singleton instance
    Score.score = 0;
    Score.bestScore = 0;
    return Score;
}(UICompornent));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map