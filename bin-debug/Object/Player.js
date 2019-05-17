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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, diameter) {
        var _this = _super.call(this, x, y, diameter, diameter) || this;
        _this.maxBallPosY = 0;
        _this.start = false;
        _this.clockwise = false;
        _this.nowJump = false;
        _this.touchLeftWall = true;
        Player.I = _this;
        _this.ballPosY = y; //オススメ0.6くらい
        _this.maxBallPosY = _this.ballPosY;
        _this.setBody(x, y, diameter / 2);
        _this.setShape(0, 0, diameter / 2, ColorPallet.RED);
        PhysicsObject.world.on("beginContact", _this.collision, _this);
        return _this;
    }
    Player.prototype.setShape = function (x, y, radius, color) {
        var shape = Util.setCircle(x, y, radius, color, true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    };
    Player.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({
            mass: 1,
            position: [x, y],
            fixedX: true,
        });
        this.bodyShape = new p2.Circle({
            radius: radius,
            fixedRotation: true,
            sensor: true,
            collisionGroup: GraphicShape.CIECLE,
            collisionMask: GraphicShape.BLOCK,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    };
    Player.prototype.setLine = function (x, y, length, degree, lineWidth, color) {
        var shape = Util.setLine(x, y, length, degree, lineWidth, color);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    };
    Player.prototype.checkJump = function () {
        if (this.body.velocity[1] < 0) {
            this.nowJump = true;
            this.bodyShape.sensor = true;
            return;
        }
        else {
            this.nowJump = false;
            return;
        }
    };
    Player.prototype.collision = function (evt) {
        var _this = this;
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        var bodyB = evt.bodyB;
        var shapeB = evt.shapeB;
        if (!this.nowJump) {
            if (shapeA.collisionGroup == GraphicShape.BLOCK || shapeB.collisionGroup == GraphicShape.BLOCK) {
                CreateGameScene.block.forEach(function (b) {
                    if (b.body == bodyA || b.body == bodyB) {
                        _this.jump();
                        Score.addScore();
                        CreateGameScene.I.changeBlockWidth();
                        CreateGameScene.I.changeMaxSubStep();
                        CreateGameScene.freshArray();
                        return;
                    }
                });
            }
        }
    };
    Player.prototype.fixedUpdate = function () {
        this.updateDrowShape();
        this.checkJump();
        if (this.maxBallPosY > this.compornent.y) {
            this.maxBallPosY = this.compornent.y;
            Camera2D.y = this.ballPosY - this.compornent.y;
            Camera2D.transform(GameStage.display);
        }
        this.checkGameOver();
    };
    Player.prototype.checkGameOver = function () {
        if (this.maxBallPosY - this.compornent.y < -Game.height * 0.54 && GameOver.gameOverFlag == false) {
            new GameOver(0, 0, 0, 0);
        }
    };
    Player.prototype.jump = function () {
        this.nowJump = true;
        var power = 12000;
        this.body.applyForce([0, -power], [0, 0]);
        if (!this.nowJump) {
        }
    };
    Player.prototype.addDestroyPhysicsMethod = function () {
        PhysicsObject.world.off("beginContact", this.collision);
    };
    Player.prototype.getStart = function () {
        return this.start;
    };
    Player.prototype.setStart = function (value) {
        this.start = value;
    };
    Player.prototype.getPosX = function () {
        return this.body.position[0];
    };
    Player.prototype.setPosX = function (x) {
        this.body.position[0] = x;
    };
    Player.prototype.getMaxBallPosY = function () {
        return this.maxBallPosY;
    };
    Player.I = null;
    return Player;
}(PhysicsObject));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map