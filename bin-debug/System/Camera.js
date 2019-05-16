var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Camera2D = (function () {
    function Camera2D() {
    }
    Camera2D.initial = function () {
        Camera2D.x = 0;
        Camera2D.y = 0;
        Camera2D.scale = 1;
    };
    Camera2D.transform = function (display, objScale) {
        if (objScale === void 0) { objScale = 1; }
        display.x = Camera2D.transX(display.x);
        display.y = Camera2D.transY(display.y);
        display.scaleX = display.scaleY = Camera2D.scale * objScale;
    };
    Camera2D.transX = function (px) {
        return (Camera2D.x) * Camera2D.scale;
    };
    Camera2D.transY = function (py) {
        return (Camera2D.y) * Camera2D.scale;
    };
    Camera2D.x = 0;
    Camera2D.y = 0;
    Camera2D.scale = 1;
    return Camera2D;
}());
__reflect(Camera2D.prototype, "Camera2D");
//# sourceMappingURL=Camera.js.map