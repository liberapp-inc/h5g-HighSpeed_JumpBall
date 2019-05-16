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
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height) || this;
        //this.setBody(x,y,width,height);
        _this.setShape(0, 0, width, height, ColorPallet.BLUE);
        return _this;
        /*        if(x < Game.width/2){
                    CreateGameScene.leftWall.push(this);
                }
                else{
                    CreateGameScene.rightWall.push(this);
        
                }*/
    }
    /*    private setBody(x : number, y : number, width : number, height : number){
    
            this.body = new p2.Body({mass : 1,
                position:[x,y],
                type:p2.Body.STATIC
            });
            this.bodyShape = new p2.Box({
                width : width, height: height,
                fixedRotation:true,
                collisionGroup: GraphicShape.WALL,
                collisionMask:GraphicShape.CIECLE
            });
            this.body.addShape(this.bodyShape);
            PhysicsObject.world.addBody(this.body);
            
        }*/
    Wall.prototype.setShape = function (x, y, width, height, color) {
        var shape = Util.setRect(x, y, width, height, color, 0, true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        //this.compornent.anchorOffsetX += width/2;
        //this.compornent.anchorOffsetY += height/2;
    };
    Wall.prototype.updateContent = function () {
        if (this.compornent.y > Player.I.compornent.y + Game.height * 1) {
            this.destroy();
        }
    };
    return Wall;
}(GameCompornent));
__reflect(Wall.prototype, "Wall");
//# sourceMappingURL=Wall.js.map