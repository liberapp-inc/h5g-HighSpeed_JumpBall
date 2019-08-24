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
//衝突判定用の列挙
var GraphicShape;
(function (GraphicShape) {
    GraphicShape[GraphicShape["NONE"] = Math.pow(2, 0)] = "NONE";
    GraphicShape[GraphicShape["CIECLE"] = Math.pow(2, 1)] = "CIECLE";
    GraphicShape[GraphicShape["BLOCK"] = Math.pow(2, 2)] = "BLOCK";
})(GraphicShape || (GraphicShape = {}));
//連続実行したいメソッドはfixedUpdateへ記入
//destroy時に実行したいメソッドはaddDestroyPhysicsMethodへ記入
//maxSubStepはGameクラスで初期化している
var PhysicsObject = (function (_super) {
    __extends(PhysicsObject, _super);
    function PhysicsObject(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.body = null;
        _this.bodyShape = null;
        _this.setCompornent(x, y, width, height);
        return _this;
    }
    PhysicsObject.prepare = function (pixelPerMeter) {
        PhysicsObject.pixelPerMeter = pixelPerMeter;
        PhysicsObject.meterPerPixel = 1 / pixelPerMeter;
        PhysicsObject.width = PhysicsObject.pixelToMeter(Util.width);
        PhysicsObject.height = PhysicsObject.pixelToMeter(Util.height);
        PhysicsObject.world = new p2.World();
        PhysicsObject.world.gravity = [0, 9.8];
    };
    //オーバーライド禁止
    PhysicsObject.prototype.updateContent = function () {
        if (this.compornent) {
            if (this.compornent.y > Util.height) {
                this.destroy();
                return;
            }
        }
        this.fixedUpdate();
    };
    ;
    PhysicsObject.prototype.updateDrowShape = function () {
        this.compornent.x = this.body.position[0];
        this.compornent.y = this.body.position[1];
    };
    PhysicsObject.prototype.addDestroyMethod = function () {
        if (this.body) {
            PhysicsObject.world.removeBody(this.body);
            this.body = null;
        }
        this.addDestroyPhysicsMethod();
    };
    PhysicsObject.prototype.addDestroyPhysicsMethod = function () { };
    PhysicsObject.step = function (dt) {
        if (GameOver.gameOverFlag) {
            return true;
        }
        PhysicsObject.world.step(1 / 60, dt / 1000, PhysicsObject.maxSubStep);
        return false;
    };
    PhysicsObject.pixelToMeter = function (pixel) { return pixel * PhysicsObject.meterPerPixel; };
    PhysicsObject.meterToPixel = function (meter) { return meter * PhysicsObject.pixelPerMeter; };
    PhysicsObject.prototype.m2p = function (meter) { return PhysicsObject.meterToPixel(meter); };
    PhysicsObject.prototype.p2m = function (pixel) { return PhysicsObject.pixelToMeter(pixel); };
    Object.defineProperty(PhysicsObject.prototype, "px", {
        get: function () { return PhysicsObject.meterToPixel(this.mx); },
        set: function (px) { this.mx = PhysicsObject.pixelToMeter(px); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "py", {
        get: function () { return PhysicsObject.meterToPixel(this.my); },
        set: function (py) { this.my = PhysicsObject.pixelToMeter(py); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "mx", {
        get: function () { return this.body.position[0]; },
        set: function (mx) { this.body.position[0] = mx; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PhysicsObject.prototype, "my", {
        get: function () { return this.body.position[1]; },
        set: function (my) { this.body.position[1] = my; },
        enumerable: true,
        configurable: true
    });
    PhysicsObject.world = null;
    PhysicsObject.deltaScale = 1;
    PhysicsObject.maxSubStep = 35;
    return PhysicsObject;
}(GameCompornent));
__reflect(PhysicsObject.prototype, "PhysicsObject");
//# sourceMappingURL=PhysicsObject.js.map