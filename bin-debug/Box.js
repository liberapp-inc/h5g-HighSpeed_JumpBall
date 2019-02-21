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
        this.shape.graphics.beginFill(0x7fff7f);
        this.shape.graphics.drawRect(0, 0, width, height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    };
    Box.prototype.updateContent = function () {
        this.moveBlock();
    };
    Box.prototype.moveBlock = function () {
        if (Box.boxMove == true) {
            this.body.position[1] += Box.blockdownSpeed;
            this.shape.y += Box.blockdownSpeed;
            if (this.shape.y > CreateGameScene.height) {
                this.body.position[1] = -CreateGameScene.boxInterval;
                this.shape.y = -CreateGameScene.boxInterval;
            }
        }
    };
    Box.prototype.collision = function (evt) {
        var bodyA = evt.bodyA;
        var shapeA = evt.shapeA;
        if (Ball.checkRiseFlag == false) {
            if (Box.boxMove == false) {
                Box.boxMove = true;
            }
            //足場よりもボールが上にあるとき
            if (Ball.ballPosY < bodyA.position[1]) {
                Ball.I.body.applyForce([0, -10000], [0, 0]);
            }
        }
        console.log(shapeA.collisionMask);
    };
    Box.boxMove = false;
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
//# sourceMappingURL=Box.js.map