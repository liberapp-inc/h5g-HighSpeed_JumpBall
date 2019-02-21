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
    GraphicShape[GraphicShape["BOX"] = Math.pow(2, 2)] = "BOX";
    GraphicShape[GraphicShape["PLANE"] = Math.pow(2, 3)] = "PLANE";
})(GraphicShape || (GraphicShape = {}));
var StageLevel;
(function (StageLevel) {
    StageLevel[StageLevel["START"] = 0] = "START";
    StageLevel[StageLevel["LEVEL1"] = 1] = "LEVEL1";
    StageLevel[StageLevel["LEVEL2"] = 2] = "LEVEL2";
    StageLevel[StageLevel["GAMEOVER"] = 3] = "GAMEOVER";
})(StageLevel || (StageLevel = {}));
var Block;
(function (Block) {
    Block[Block["NORMAL"] = 0] = "NORMAL";
    Block[Block["HORIZONTAL_MOVE"] = 1] = "HORIZONTAL_MOVE";
    Block[Block["VERTICAL_MOVE"] = 2] = "VERTICAL_MOVE";
})(Block || (Block = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function () {
        GameObject.initial(this.stage);
        CreateGameScene.init();
        egret.startTick(this.tickLoop, this);
    };
    Main.prototype.tickLoop = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = Main.timeStamp; }
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        return false;
    };
    Main.random = function (min, max) {
        return min + Math.random() * (max - min);
    };
    Main.randomInt = function (min, max) {
        return Math.floor(min + Math.random() * (max + 0.999 - min));
    };
    Main.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var CreateGameScene = (function () {
    function CreateGameScene() {
    }
    CreateGameScene.init = function () {
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.width = egret.MainContext.instance.stage.stageWidth;
        /* new メソッドを記入*/
        new CreateWorld();
        new Ball();
        new NormalBlock(CreateGameScene.width / 2, CreateGameScene.height - 10, 100, 30);
        var randomBlock;
        for (var i = 1; i < 50; i++) {
            randomBlock = Main.randomInt(0, 2);
            switch (randomBlock) {
                case Block.NORMAL:
                    console.log("0");
                    new NormalBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
                case Block.HORIZONTAL_MOVE:
                    console.log("1");
                    new HorizontalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
                case Block.VERTICAL_MOVE:
                    console.log("2");
                    new VerticalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
            }
        }
    };
    CreateGameScene.boxInterval = 80;
    return CreateGameScene;
}());
__reflect(CreateGameScene.prototype, "CreateGameScene");
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
        return _this;
        //this.createWall();
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
                    planeBody[i].position = [CreateGameScene.width / 2, CreateGameScene.height - 100];
                    planeBody[i].angle = Math.PI; //rad表記
                    //new NormalBox(planeBody[i].position[0]+180, planeBody[i].position[1], 100, 30);
                    break;
                //右の壁
                case 1:
                    planeBody[i].position = [CreateGameScene.width, CreateGameScene.height];
                    planeBody[i].angle = Math.PI / 2; //rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
                    break;
                //左の壁
                case 2:
                    planeBody[i].position = [0, CreateGameScene.height];
                    planeBody[i].angle = 3 * Math.PI / 2; //rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
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
            radius: radius, collisionGroup: GraphicShape.CIECLE, collisionMask: GraphicShape.BOX | GraphicShape.PLANE, fixedRotation: true
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
    };
    Ball.prototype.touchMove = function (e) {
        if (e.stageX <= this.shape.x) {
            this.body.applyForce([-500, 0], [0, 0]);
        }
        else {
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
    Ball.I = null; // singleton instance
    Ball.checkRiseFlag = false;
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = boxPositionX;
        _this.boxPositionY = boxPositionY;
        _this.boxWidth = boxWidth;
        _this.boxHeight = boxHeight;
        _this.setBody(_this.boxPositionX, _this.boxPositionY, _this.boxWidth, _this.boxHeight);
        _this.setShape(_this.boxWidth, _this.boxHeight);
        CreateWorld.world.on("beginContact", _this.collision, _this);
        return _this;
    }
    Box.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.KINEMATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.BOX, collisionMask: GraphicShape.CIECLE | GraphicShape.PLANE, fixedRotation: true, sensor: true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    Box.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0x7fff7f);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () {
        this.moveBlock();
    };
    Box.prototype.moveBlock = function () {
        this.body.position[1] += Box.blockdownSpeed;
        this.shape.y += Box.blockdownSpeed;
    };
    Box.prototype.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        if (Ball.checkRiseFlag == false) {
            //足場よりもボールが上にあるとき
            if (Ball.ballPosY < bodyA.position[1]) {
                Ball.I.body.applyForce([0, -10000], [0, 0]);
            }
        }
    };
    //static boxMove : boolean = false;
    //static moveDistance : number = 0;
    Box.blockdownSpeed = 3;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var NormalBlock = (function (_super) {
    __extends(NormalBlock, _super);
    function NormalBlock(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        return _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight) || this;
    }
    return NormalBlock;
}(Box));
__reflect(NormalBlock.prototype, "NormalBlock");
var HorizontalMoveBlock = (function (_super) {
    __extends(HorizontalMoveBlock, _super);
    function HorizontalMoveBlock(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight) || this;
        var setRandamMove = Main.randomInt(0, 1);
        switch (setRandamMove) {
            case 0:
                _this.rightMove = false;
                break;
            case 1:
                _this.rightMove = true;
                break;
        }
        return _this;
    }
    HorizontalMoveBlock.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xffbf7f);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    HorizontalMoveBlock.prototype.updateContent = function () {
        this.moveBlock();
        switch (this.rightMove) {
            case false:
                if (this.body.position[0] <= 0) {
                    this.rightMove = true;
                }
                else {
                    this.body.position[0] -= HorizontalMoveBlock.horizontalMoveSpeed;
                    this.shape.x = this.body.position[0];
                }
                break;
            case true:
                if (this.body.position[0] > CreateGameScene.width) {
                    this.rightMove = false;
                }
                else {
                    this.body.position[0] += HorizontalMoveBlock.horizontalMoveSpeed;
                    this.shape.x = this.body.position[0];
                }
                break;
        }
    };
    HorizontalMoveBlock.horizontalMoveSpeed = 2;
    return HorizontalMoveBlock;
}(Box));
__reflect(HorizontalMoveBlock.prototype, "HorizontalMoveBlock");
var VerticalMoveBlock = (function (_super) {
    __extends(VerticalMoveBlock, _super);
    function VerticalMoveBlock(boxPositionX, boxPositionY, boxWidth, boxHeight) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight) || this;
        _this.moveLength = 0;
        var setRandamMove = Main.randomInt(0, 1);
        switch (setRandamMove) {
            case 0:
                _this.upMove = false;
                break;
            case 1:
                _this.upMove = true;
                break;
        }
        return _this;
    }
    VerticalMoveBlock.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(0xff7f7f);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    VerticalMoveBlock.prototype.updateContent = function () {
        this.moveBlock();
        switch (this.upMove) {
            case false:
                if (this.moveLength >= VerticalMoveBlock.clampVerticalMoveLength) {
                    this.upMove = true;
                    this.moveLength = 0;
                }
                else {
                    this.body.position[1] -= VerticalMoveBlock.verticalMoveSpeed;
                    this.shape.y = this.body.position[1];
                    this.moveLength += VerticalMoveBlock.verticalMoveSpeed;
                }
                break;
            case true:
                if (this.moveLength >= VerticalMoveBlock.clampVerticalMoveLength) {
                    this.upMove = false;
                    this.moveLength = 0;
                }
                else {
                    this.body.position[1] += VerticalMoveBlock.verticalMoveSpeed;
                    this.shape.y = this.body.position[1];
                    this.moveLength += VerticalMoveBlock.verticalMoveSpeed;
                }
                break;
        }
    };
    VerticalMoveBlock.verticalMoveSpeed = 2;
    VerticalMoveBlock.clampVerticalMoveLength = 200;
    return VerticalMoveBlock;
}(Box));
__reflect(VerticalMoveBlock.prototype, "VerticalMoveBlock");
//# sourceMappingURL=Main.js.map