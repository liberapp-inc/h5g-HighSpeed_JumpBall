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
    GraphicShape[GraphicShape["DEAD_LINE"] = Math.pow(2, 4)] = "DEAD_LINE";
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
        new Background();
        new CreateWorld();
        new Wall();
        new MyText(0, 0, "Score " + Math.floor(CreateGameScene.score).toString(), 100, 0.5, 0xFFFFFF, "Meiryo", 0x000000, 0);
        new Ball();
        new NormalBlock(CreateGameScene.width / 2, CreateGameScene.height - 10, 100, 30);
        var randomBlock;
        var initialArangeBox = this.height / this.boxInterval;
        console.log(Math.floor(initialArangeBox));
        for (var i = 1; i < initialArangeBox; i++) {
            randomBlock = Main.randomInt(0, 2);
            switch (randomBlock) {
                case Block.NORMAL:
                    new NormalBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
                case Block.HORIZONTAL_MOVE:
                    new HorizontalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
                case Block.VERTICAL_MOVE:
                    new VerticalMoveBlock(Main.random(0, CreateGameScene.width), -CreateGameScene.boxInterval * i + CreateGameScene.height, 100, 30);
                    break;
            }
        }
    };
    CreateGameScene.boxInterval = 80;
    CreateGameScene.score = 0;
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
        /*for(let i = 0; i < 3; i++){
            const planeBody: p2.Body[] = [];
            planeBody[i] = new p2.Body({fixedRotation:true ,type:p2.Body.STATIC});
            const planeShape: p2.Plane[] = [];
            planeShape[i] = new p2.Plane({collisionGroup: GraphicShape.CEILING, collisionMask:GraphicShape.CIECLE});
            
            switch(i){
                //地面
                case 0:
                    planeBody[i].position=  [CreateGameScene.width/2, CreateGameScene.height-100];
                    planeBody[i].angle = Math.PI;//rad表記
                    //new NormalBox(planeBody[i].position[0]+180, planeBody[i].position[1], 100, 30);

                break;

                //右の壁
                case 1:
                    planeBody[i].position=  [CreateGameScene.width, CreateGameScene.height];
                    planeBody[i].angle = Math.PI/2;//rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
                break;

                //左の壁
                case 2:
                    planeBody[i].position=  [0, CreateGameScene.height];
                    planeBody[i].angle = 3* Math.PI/2;//rad表記
                    //new NormalBox(planeBody[i].position[0], planeBody[i].position[1], 100, 30);
                break;

            }

            planeBody[i].addShape(planeShape[i]);
            CreateWorld.world.addBody(planeBody[i]);
        }*/
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
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super.call(this) || this;
        _this.ceilingHeight = 50;
        _this.createWall();
        return _this;
    }
    Wall.prototype.createWall = function () {
        this.body = new p2.Body({ mass: 1, position: [CreateGameScene.width / 2, 200], fixedRotation: true, type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            whidth: CreateGameScene.width, height: this.ceilingHeight, collisionGroup: GraphicShape.CEILING, collisionMask: GraphicShape.CIECLE, sensor: false
        });
        //ceilingBody.position=  [CreateGameScene.width/2, CreateGameScene.height-100];
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