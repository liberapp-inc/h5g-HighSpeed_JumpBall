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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = boxPositionX;
        _this.boxPositionY = boxPositionY;
        _this.boxWidth = boxWidth;
        _this.boxHeight = boxHeight;
        _this.boxColor = boxColor;
        _this.setBody(_this.boxPositionX, _this.boxPositionY, _this.boxWidth, _this.boxHeight);
        _this.setShape(_this.boxWidth, _this.boxHeight);
        return _this;
        //CreateWorld.world.on("beginContact",  this.collision, this);
    }
    Box.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.BOX, collisionMask: GraphicShape.CIECLE, fixedRotation: true, sensor: true
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
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () {
        this.moveBlock();
        //this.gameOver();
    };
    Box.prototype.moveBlock = function () {
        if (Box.boxMove == true) {
            this.body.position[1] += Box.blockdownSpeed;
            this.shape.y += Box.blockdownSpeed;
            if (this.shape.y > CreateGameScene.height) {
                this.shape.y = -CreateGameScene.boxInterval;
                this.body.position[1] = -CreateGameScene.boxInterval;
            }
        }
    };
    Box.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        if (Ball.checkRiseFlag == false) {
            if (Box.boxMove == false) {
                Box.boxMove = true;
            }
            //足場よりもボールが上にあるとき
            if (Ball.ballPosY < bodyA.position[1]) {
                Ball.I.body.applyForce([0, -10000], [0, 0]);
                Ball.collisionFlag = false;
            }
        }
    };
    Box.boxMove = false;
    //static moveDistance : number = 0;
    Box.blockdownSpeed = 3;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
var NormalBlock = (function (_super) {
    __extends(NormalBlock, _super);
    function NormalBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        return _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
    }
    return NormalBlock;
}(Box));
__reflect(NormalBlock.prototype, "NormalBlock");
var HorizontalMoveBlock = (function (_super) {
    __extends(HorizontalMoveBlock, _super);
    function HorizontalMoveBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
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
    function VerticalMoveBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
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
var CeilingBlock = (function (_super) {
    __extends(CeilingBlock, _super);
    function CeilingBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        return _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
    }
    CeilingBlock.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.CEILING, collisionMask: GraphicShape.CIECLE, fixedRotation: true, sensor: false
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    CeilingBlock.prototype.updateContent = function () {
    };
    return CeilingBlock;
}(Box));
__reflect(CeilingBlock.prototype, "CeilingBlock");
var DownCeilingBlock = (function (_super) {
    __extends(DownCeilingBlock, _super);
    function DownCeilingBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor, life) {
        var _this = _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
        _this.life = 1;
        _this.lifeText = null;
        DownCeilingBlock.downCeilingBlock = _this;
        _this.life = life || 1;
        _this.lifeText = new DownCeilingText(boxPositionX, boxPositionY, _this.life.toString(), 100, 0.5, 0xFFFFFF, true);
        return _this;
    }
    DownCeilingBlock.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.DOWN_CEILING, collisionMask: GraphicShape.CIECLE, fixedRotation: true, sensor: false
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    DownCeilingBlock.prototype.updateContent = function () {
        this.moveBlock();
        this.gameOver();
    };
    DownCeilingBlock.prototype.moveBlock = function () {
        if (Box.boxMove == true && this.lifeText.deleteFlag == false) {
            this.body.position[1] += DownCeilingBlock.blockdownSpeed;
            this.shape.y += DownCeilingBlock.blockdownSpeed;
            this.lifeText.y = this.shape.y;
            this.lifeText.myText = this.life.toString();
        }
    };
    DownCeilingBlock.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        var bodyB = evt.bodyB;
        var shapeB = evt.shapeB;
        if (shapeB.collisionGroup == GraphicShape.CIECLE && shapeA.collisionGroup == GraphicShape.DOWN_CEILING) {
            if (Ball.collisionFlag == false) {
                DownCeilingBlock.downCeilingBlock.life -= 1;
                console.log("a");
                if (DownCeilingBlock.downCeilingBlock.life <= 0) {
                    CreateWorld.world.removeBody(DownCeilingBlock.downCeilingBlock.body);
                    //GameObject.display.removeChild( DownCeilingBlock.downCeilingBlock.shape);
                    DownCeilingBlock.downCeilingBlock.destroy();
                    DownCeilingBlock.downCeilingBlock.lifeText.deleteFlag = true;
                    DownCeilingBlock.downCeilingBlock.lifeText.myText = null;
                    //DownCeilingBlock.downCeilingBlock = null;
                }
            }
            Ball.collisionFlag = true;
        }
    };
    DownCeilingBlock.prototype.gameOver = function () {
        if (CreateGameScene.gameOverFlag == true) {
            this.lifeText.deleteFlag = true;
            this.lifeText.myText = null;
        }
    };
    DownCeilingBlock.downCeilingBlock = null;
    DownCeilingBlock.blockdownSpeed = 0.5;
    return DownCeilingBlock;
}(CeilingBlock));
__reflect(DownCeilingBlock.prototype, "DownCeilingBlock");
var DeadBlock = (function (_super) {
    __extends(DeadBlock, _super);
    function DeadBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        return _super.call(this, boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) || this;
    }
    DeadBlock.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.DEAD_LINE, collisionMask: GraphicShape.CIECLE, fixedRotation: true, sensor: true
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    DeadBlock.prototype.updateContent = function () {
        //this.gameOver();
    };
    DeadBlock.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        var bodyB = evt.bodyB;
        var shapeB = evt.shapeB;
        if (shapeB.collisionGroup == GraphicShape.CIECLE && shapeA.collisionGroup == GraphicShape.DEAD_LINE) {
            CreateGameScene.gameOverFlag = true;
            //ゲームオーバーの表示
            if (CreateGameScene.gameOverText == null) {
                CreateGameScene.gameOverText = [];
                CreateGameScene.gameOverText[0] = new GameOverText(CreateGameScene.width / 2, CreateGameScene.height / 2 - 50, "GAME OVER", 180, 0.5, 0xFFFFFF, true);
                CreateGameScene.gameOverText[1] = new GameOverText(CreateGameScene.width / 2, CreateGameScene.height / 2 + 50, "Score " + Math.floor(CreateGameScene.score).toString(), 120, 0.5, 0xFFFFFF, true);
            }
            GameObject.display.stage.once(egret.TouchEvent.TOUCH_BEGIN, function (e) { return DeadBlock.retry(e); }, this);
        }
    };
    /*    gameOver(){
            if(CreateGameScene.gameOverFlag == true){
                CreateWorld.world.off("beginContact",  this.collision);
    
            }
        }*/
    DeadBlock.retry = function (e) {
        GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return Ball.touchMove(e); }, false);
        CreateWorld.world.clear();
        CreateWorld.world = null;
        GameObject.dispose();
        CreateGameScene.init();
        //GameObject.transit();
    };
    return DeadBlock;
}(Box));
__reflect(DeadBlock.prototype, "DeadBlock");
var WallBlock = (function (_super) {
    __extends(WallBlock, _super);
    function WallBlock(boxPositionX, boxPositionY, boxWidth, boxHeight, boxColor) {
        var _this = _super.call(this) || this;
        _this.boxPositionX = boxPositionX;
        _this.boxPositionY = boxPositionY;
        _this.boxWidth = boxWidth;
        _this.boxHeight = boxHeight;
        _this.boxColor = boxColor;
        _this.setBody(_this.boxPositionX, _this.boxPositionY, _this.boxWidth, _this.boxHeight);
        _this.setShape(_this.boxWidth, _this.boxHeight);
        return _this;
    }
    WallBlock.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Box({
            width: width, height: height, collisionGroup: GraphicShape.WALL, collisionMask: GraphicShape.CIECLE, fixedRotation: true, sensor: false
        });
        this.body.addShape(this.bodyShape);
        CreateWorld.world.addBody(this.body);
    };
    WallBlock.prototype.setShape = function (width, height) {
        if (this.shape) {
            GameObject.display.removeChild(this.shape);
        }
        this.shape = new egret.Shape();
        this.shape.anchorOffsetX += width / 2; //p2とEgretは座標軸とアンカー位置が違うので調整
        this.shape.anchorOffsetY += height / 2;
        this.shape.x = this.body.position[0] /*+ width*/;
        this.shape.y = this.body.position[1] /*- height/2*/;
        this.shape.graphics.beginFill(this.boxColor);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    WallBlock.prototype.updateContent = function () {
    };
    WallBlock.collision = function (evt) {
    };
    WallBlock.boxMove = false;
    //static moveDistance : number = 0;
    WallBlock.blockdownSpeed = 3;
    return WallBlock;
}(GameObject));
__reflect(WallBlock.prototype, "WallBlock");
//# sourceMappingURL=Box.js.map