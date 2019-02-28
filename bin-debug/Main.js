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
    GraphicShape[GraphicShape["CEILING"] = Math.pow(2, 3)] = "CEILING";
    GraphicShape[GraphicShape["DOWN_CEILING"] = Math.pow(2, 4)] = "DOWN_CEILING";
    GraphicShape[GraphicShape["WALL"] = Math.pow(2, 5)] = "WALL";
    GraphicShape[GraphicShape["DEAD_LINE"] = Math.pow(2, 6)] = "DEAD_LINE";
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
    Main.newTextField = function (x, y, text, size, ratio, color, bold) {
        var tf = new egret.TextField();
        tf.text = text;
        tf.bold = bold;
        tf.scaleX = ratio;
        tf.scaleY = ratio;
        tf.size = size;
        tf.textColor = color;
        tf.x = x;
        tf.y = y;
        return tf;
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
        this.score = 0;
        this.boxInterval = 80;
        this.gameOverFlag = false;
        Box.boxMove = false;
        this.gameOverText = null;
        CreateGameScene.downCeilingLife = 1;
        egret.startTick(this.tickLoop, this);
        /* new メソッドを記入*/
        new Background();
        if (CreateWorld.world == null) {
            new CreateWorld();
        }
        new CeilingBlock(CreateGameScene.width / 2, 80, CreateGameScene.width, 50, 0x7f7fff); //天井
        var wall = new WallBlock(0, CreateGameScene.height / 2, 50, CreateGameScene.height, 0x7f7fff); //左の壁
        var wall2 = new WallBlock(CreateGameScene.width, CreateGameScene.height / 2, 50, CreateGameScene.height, 0x7f7fff); //右の壁
        wall2.body.angle = Math.PI;
        new CreateDownCeilingBlock();
        new DeadBlock(CreateGameScene.width / 2, CreateGameScene.height, CreateGameScene.width, 20, 0xff0000);
        this.scoreText = new ScoreText(0, 0, "Score " + Math.floor(CreateGameScene.score).toString(), 100, 0.5, 0xFFFFFF, true);
        new Ball();
        new NormalBlock(CreateGameScene.width / 2, CreateGameScene.height - 10, 100, 30, 0x7fff7f);
        var randomBlock;
        var initialArangeBox = this.height / this.boxInterval;
        for (var i = 1; i < initialArangeBox; i++) {
            randomBlock = Main.randomInt(0, 2);
            switch (randomBlock) {
                case Block.NORMAL:
                    new NormalBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30, 0x7fff7f);
                    break;
                case Block.HORIZONTAL_MOVE:
                    new HorizontalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30, 0xffbf7f);
                    break;
                case Block.VERTICAL_MOVE:
                    new VerticalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30, 0xff7f7f);
                    break;
            }
        }
    };
    CreateGameScene.tickLoop = function (timeStamp) {
        if (timeStamp === void 0) { timeStamp = Main.timeStamp; }
        GameObject.update();
        CreateWorld.worldBegin(timeStamp);
        if (CreateGameScene.gameOverFlag == true) {
            egret.stopTick(this.tickLoop, this);
        }
        return false;
    };
    CreateGameScene.boxInterval = 80;
    CreateGameScene.score = 0;
    CreateGameScene.scoreText = null;
    CreateGameScene.gameOverFlag = false;
    CreateGameScene.gameOverText = null;
    CreateGameScene.downCeilingLife = 1;
    return CreateGameScene;
}());
__reflect(CreateGameScene.prototype, "CreateGameScene");
var GameObject = (function () {
    function GameObject() {
        this.shape = null;
        this.body = null;
        this.bodyShape = null;
        this.world = null;
        this.deleteFlag = false;
        GameObject.objects.push(this);
    }
    GameObject.initial = function (displayObjectContainer) {
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    };
    GameObject.update = function () {
        GameObject.objects.forEach(function (obj) { return obj.updateContent(); });
        GameObject.objects = GameObject.objects.filter(function (obj) {
            if (obj.deleteFlag)
                obj.delete();
            return (!obj.deleteFlag);
        });
        if (GameObject.transit) {
            GameObject.dispose();
            //GameObject.transit();
            GameObject.transit = null;
        }
    };
    GameObject.dispose = function () {
        GameObject.objects = GameObject.objects.filter(function (obj) {
            obj.destroy();
            obj.delete();
            return false;
        });
    };
    GameObject.prototype.destroy = function () { this.deleteFlag = true; };
    GameObject.prototype.onDestroy = function () { };
    GameObject.prototype.delete = function () {
        this.onDestroy();
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
            this.shape = null;
        }
    };
    return GameObject;
}());
__reflect(GameObject.prototype, "GameObject");
var CreateDownCeilingBlock = (function (_super) {
    __extends(CreateDownCeilingBlock, _super);
    function CreateDownCeilingBlock() {
        var _this = _super.call(this) || this;
        _this.life = 1;
        _this.score = 0;
        _this.block = new DownCeilingBlock(CreateGameScene.width / 2, 80, CreateGameScene.width, 50, 0x7f7fff, CreateGameScene.downCeilingLife);
        _this.createBlock();
        return _this;
    }
    CreateDownCeilingBlock.prototype.createBlock = function () {
        this.score += Box.blockdownSpeed;
        if (this.block.life <= 0) {
            //let b = new DownCeilingBlock(CreateGameScene.width/2, 80, CreateGameScene.width, 50, 0x7f7fff, CreateGameScene.downCeilingLife);
            this.block = new DownCeilingBlock(CreateGameScene.width / 2, 80, CreateGameScene.width, 50, 0x7f7fff, CreateGameScene.downCeilingLife);
            ;
            //this.block.push(b);
            //this.score = 0;
            CreateGameScene.downCeilingLife += 1;
        }
    };
    CreateDownCeilingBlock.prototype.updateContent = function () {
        this.createBlock();
    };
    return CreateDownCeilingBlock;
}(GameObject));
__reflect(CreateDownCeilingBlock.prototype, "CreateDownCeilingBlock");
var CreateWorld = (function (_super) {
    __extends(CreateWorld, _super);
    function CreateWorld() {
        var _this = _super.call(this) || this;
        _this.createWorld();
        //this.createWall();
        //egret.startTick(CreateWorld.worldBegin, this);
        CreateWorld.world.on("beginContact", CreateWorld.collision, _this);
        return _this;
        //CreateWorld.world.on("beginContact",  DeadBlock.collision, this);
        //GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => Ball.touchMove(e), this);
    }
    CreateWorld.prototype.createWorld = function () {
        CreateWorld.world = new p2.World();
        CreateWorld.world.sleepMode = p2.World.BODY_SLEEPING;
        CreateWorld.world.gravity = [0, 9.8];
    };
    CreateWorld.prototype.updateContent = function () {
        this.gameOver();
    };
    CreateWorld.worldBegin = function (dt) {
        CreateWorld.world.step(1 / 60, dt / 1000, 10);
        return false;
    };
    CreateWorld.prototype.gameOver = function () {
        if (CreateGameScene.gameOverFlag == true) {
            CreateWorld.world.off("beginContact", CreateWorld.collision);
            //CreateWorld.world.off("beginContact",  DeadBlock.collision, this);
            //GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => Ball.touchMove(e), this);
        }
    };
    CreateWorld.collision = function (evt) {
        Box.collision(evt);
        DeadBlock.collision(evt);
        DownCeilingBlock.collision(evt);
    };
    CreateWorld.world = null;
    return CreateWorld;
}(GameObject));
__reflect(CreateWorld.prototype, "CreateWorld");
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super.call(this) || this;
        _this.ceilingHeight = 50;
        _this.createWall();
        return _this;
    }
    Wall.prototype.createWall = function () {
        this.body = new p2.Body({ mass: 1, position: [CreateGameScene.width, 300], fixedRotation: true, type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            whidth: CreateGameScene.width, height: this.ceilingHeight, collisionGroup: GraphicShape.CEILING, collisionMask: GraphicShape.CIECLE,
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
        this.setShape(CreateGameScene.width, this.ceilingHeight);
    };
    Wall.prototype.setShape = function (width, height) {
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
    Wall.prototype.updateContent = function () {
    };
    return Wall;
}(GameObject));
__reflect(Wall.prototype, "Wall");
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.obj = new egret.Shape();
        _this.obj.graphics.beginFill(0x000080);
        _this.obj.graphics.drawRect(0, 0, CreateGameScene.width, CreateGameScene.height);
        _this.obj.graphics.endFill();
        GameObject.display.addChild(_this.obj);
        return _this;
    }
    Background.prototype.updateContent = function () { };
    return Background;
}(GameObject));
__reflect(Background.prototype, "Background");
//# sourceMappingURL=Main.js.map