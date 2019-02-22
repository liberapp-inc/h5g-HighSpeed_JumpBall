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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.radius = 20;
        Ball.I = _this;
        _this.setBody(CreateGameScene.width / 2, CreateGameScene.height - 100, _this.radius);
        _this.setShape(_this.radius);
        Ball.ballPosY = _this.body.position[1];
        Ball.finalBallPosY = CreateGameScene.height - 100;
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchMove(e); }, _this);
        return _this;
    }
    Ball.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({
            radius: radius, collisionGroup: GraphicShape.CIECLE, collisionMask: GraphicShape.BOX | GraphicShape.CEILING | GraphicShape.DEAD_LINE | GraphicShape.DOWN_CEILING | GraphicShape.WALL, fixedRotation: true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    Ball.prototype.setShape = function (radius) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateDrowShape = function () {
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateContent = function () {
        this.updateDrowShape();
        this.checkRise();
        if (CreateGameScene.gameOverFlag == false) {
            CreateGameScene.score += Box.blockdownSpeed;
        }
        this.gameOver();
    };
    Ball.prototype.touchMove = function (e) {
        if (e.stageX <= this.shape.x && this.shape.x > 80) {
            this.body.applyForce([-500, 0], [0, 0]);
        }
        else if (e.stageX > this.shape.x && this.shape.x < CreateGameScene.width - 80) {
            this.body.applyForce([500, 0], [0, 0]);
        }
    };
    Ball.prototype.checkRise = function () {
        Ball.ballPosY = this.body.position[1];
        //取得したボールの高さよりも現在の方が上　→　上昇
        if (Ball.ballPosY < this.body.position[1]) {
            Ball.checkRiseFlag = true;
        }
        else {
            Ball.checkRiseFlag = false;
        }
    };
    Ball.prototype.gameOver = function () {
        if (CreateGameScene.gameOverFlag == true) {
            Ball.I = null;
        }
    };
    Ball.I = null; // singleton instance
    Ball.checkRiseFlag = false;
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map