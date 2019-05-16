var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyTween = (function () {
    function MyTween() {
    }
    MyTween.cameraScroll = function (display, toPos) {
        egret.Tween.get(display)
            .to({ y: toPos }, 500, egret.Ease.quadIn)
            .call(function () {
            Camera2D.y = toPos;
            egret.Tween.removeTweens(display);
        });
    };
    return MyTween;
}());
__reflect(MyTween.prototype, "MyTween");
//# sourceMappingURL=MyTween.js.map