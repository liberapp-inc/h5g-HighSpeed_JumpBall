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
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.setBody(x, y, width, height);
        _this.setShape(0, 0, width, height, ColorPallet.BLUE);
        CreateGameScene.block.push(_this);
        return _this;
    }
    Block.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1,
            position: [x, y],
            type: p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width: width, height: height,
            fixedRotation: true,
            collisionGroup: GraphicShape.BLOCK,
            collisionMask: GraphicShape.CIECLE
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    };
    Block.prototype.setShape = function (x, y, width, height, color) {
        var shape = Util.setRect(x, y, width, height, color, 0, true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        this.compornent.anchorOffsetX += width / 2;
        this.compornent.anchorOffsetY += height / 2;
    };
    Block.prototype.fixedUpdate = function () {
        if (this.compornent.y > Player.I.compornent.y + Game.height * 0.44) {
            this.destroy();
        }
    };
    return Block;
}(PhysicsObject));
__reflect(Block.prototype, "Block");
//# sourceMappingURL=Block.js.map