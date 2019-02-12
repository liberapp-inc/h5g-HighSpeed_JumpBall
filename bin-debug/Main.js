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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        Game.init();
        egret.startTick(this.tickLoop, this);
    };
    Main.prototype.tickLoop = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = Main.timeStamp; }
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var Game = (function () {
    function Game() {
    }
    Game.init = function () {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
var GameObject = (function () {
    //public static transit:()=>void;
    function GameObject() {
        this.shape = null;
        this.body = null;
        this.bodyShape = null;
        this.world = null;
        GameObject.objects.push(this);
    }
    GameObject.initial = function (displayObjectContainer) {
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    };
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
    };
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var CreateWorld = (function (_super) {
    __extends(CreateWorld, _super);
    function CreateWorld() {
        var _this = _super.call(this) || this;
        _this.createWorld();
        _this.createWall();
        return _this;
        //egret.startTick(CreateWorld.worldBegin, this);
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.prototype.createWall = function () {
        //見えない壁や地面の生成
        for (var i = 0; i < 3; i++) {
            var planeBody = [];
            planeBody[i] = new p2.Body({ fixedRotation: true, type: p2.Body.STATIC });
            var planeShape = [];
            planeShape[i] = new p2.Plane();
            switch (i) {
                //地面
                case 0:
                    planeBody[i].position = [0, Game.height];
                    planeBody[i].angle = Math.PI; //rad表記
                    break;
                //右の壁
                case 1:
                    planeBody[i].position = [Game.width, Game.height];
                    planeBody[i].angle = Math.PI / 2; //rad表記
                    break;
                //左の壁
                case 2:
                    planeBody[i].position = [0, Game.height];
                    planeBody[i].angle = 3 * Math.PI / 2; //rad表記
                    break;
            }
            planeBody[i].addShape(planeShape[i]);
            CreateWorld.world.addBody(planeBody[i]);
        }
    };
    CreateWorld.prototype.updateContent = function () {
    };
    CreateWorld.worldBegin = function (dt) {
        CreateWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    CreateWorld.world = null;
    return CreateWorld;
}(GameObject));
__reflect(CreateWorld.prototype, "CreateWorld");
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.radius = 20;
        Ball.I = _this;
        _this.setBody(Game.width / 2 * 0.5, 0, _this.radius);
        _this.setShape(Game.width / 2 * 0.5, 0, _this.radius);
        return _this;
    }
    Ball.prototype.setBody = function (x, y, radius) {
        this.body = new p2.Body({ mass: 1, position: [x, y] });
        this.bodyShape = new p2.Circle({ radius: radius });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    Ball.prototype.setShape = function (x, y, radius) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000);
        this.shape.graphics.drawCircle(this.body.position[0], this.body.position[1], radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    };
    Ball.prototype.updateDrowShape = function () {
        this.shape.x = this.body.position[0];
        this.shape.y = this.body.position[1];
        GameObject.display.addChild(this.shape);
    };
    Ball.prototype.updateContent = function () {
        this.updateDrowShape();
    };
    Ball.I = null; // singleton instance
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Main.js.map