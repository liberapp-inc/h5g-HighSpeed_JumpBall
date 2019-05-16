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
var TimeLimit = (function (_super) {
    __extends(TimeLimit, _super);
    function TimeLimit(x, y, width, height, color) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.coinCount = 0;
        _this.time = 60;
        _this.timeText = null;
        _this.textColor = 0x000000;
        TimeLimit.limitTimer = new egret.Timer(TimeLimit.limitInterval, 0);
        TimeLimit.limitTimer.addEventListener(egret.TimerEvent.TIMER, _this.timePass, _this);
        TimeLimit.limitTimer.start();
        _this.textColor = color;
        _this.setText();
        return _this;
    }
    TimeLimit.prototype.setText = function () {
        this.timeText = Util.myText(0, 0, "TIME : " + this.time.toString(), 100, 0.5, this.textColor, true);
        this.compornent.addChild(this.timeText);
    };
    TimeLimit.prototype.resetTimer = function () {
        TimeLimit.limitTimer.stop();
        TimeLimit.limitTimer.removeEventListener(egret.TimerEvent.TIMER, this.timePass, this);
        TimeLimit.limitTimer = new egret.Timer(TimeLimit.limitInterval, 0);
        TimeLimit.limitTimer.addEventListener(egret.TimerEvent.TIMER, this.timePass, this);
        TimeLimit.limitTimer.start();
    };
    TimeLimit.prototype.timePass = function () {
        if (GameOver.gameOverFlag == false) {
            if (this.time > 0) {
                this.time -= 1;
            }
            if (this.time == 0) {
                this.time = 0;
                new GameOver(0, 0, 0, 0);
            }
        }
    };
    TimeLimit.prototype.addDestroyMethod = function () {
        GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.timePass, this);
        TimeLimit.limitTimer.stop();
        TimeLimit.limitTimer.removeEventListener(egret.TimerEvent.TIMER, this.timePass, this);
        if (this.compornent) {
            this.compornent.removeChildren();
            this.compornent = null;
        }
        this.timeText = null;
    };
    TimeLimit.prototype.updateContent = function () {
        this.timeText.text = "TIME : " + this.time.toString();
    };
    TimeLimit.limitTimer = null;
    TimeLimit.limitInterval = 1000;
    return TimeLimit;
}(UICompornent));
__reflect(TimeLimit.prototype, "TimeLimit");
//# sourceMappingURL=TimeLimit.js.map