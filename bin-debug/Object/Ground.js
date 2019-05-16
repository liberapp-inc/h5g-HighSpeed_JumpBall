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
var Ground = (function (_super) {
    __extends(Ground, _super);
    //static I : Ball = null;
    //private radius : number = null;
    function Ground(x, y, length, degree, lineWidth, lineColor) {
        var _this = _super.call(this, x, y, length, lineWidth) || this;
        _this.setBody(x, y, length, lineWidth);
        _this.setShape(0, 0, length, degree, lineWidth, lineColor);
        return _this;
    }
    Ground.prototype.setShape = function (x, y, length, degree, lineWidth, color) {
        var shape = Util.setLine(x, y, length, degree, lineWidth, color);
        this.compornent.addChild(shape);
        //GameStage.display.addChild(this.compornent);
        this.shapes.push(shape);
        /*        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
                this.compornent.addChild(shape);
                this.shapes.push(shape);
                
                this.compornent.anchorOffsetX += width/2;
                this.compornent.anchorOffsetY += height/2;*/
    };
    Ground.prototype.setBody = function (x, y, width, height) {
        this.body = new p2.Body({ mass: 1, position: [x, y], type: p2.Body.STATIC });
        this.bodyShape = new p2.Plane({
            collisionGroup: GraphicShape.WALL, collisionMask: GraphicShape.CIECLE
        });
        this.body.angle = Math.PI;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
    };
    Ground.prototype.fixedUpdate = function () {
    };
    return Ground;
}(PhysicsObject));
__reflect(Ground.prototype, "Ground");
//# sourceMappingURL=Ground.js.map