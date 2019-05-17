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
var CreateGameScene = (function (_super) {
    __extends(CreateGameScene, _super);
    function CreateGameScene() {
        var _this = _super.call(this) || this;
        _this.setInitialBlock = false;
        _this.limitMaxSubStep = 40;
        CreateGameScene.I = _this;
        CreateGameScene.createBlockPosY = Game.height * 0.7;
        _this.blockWidth = Game.width * 0.4;
        _this.blockHeight = Game.width * 0.04;
        _this.blockInterval = Game.height * 0.4;
        CreateGameScene.block = [];
        _this.initialBlock();
        return _this;
    }
    CreateGameScene.prototype.initialBlock = function () {
        new Block(Game.width / 2, CreateGameScene.createBlockPosY, Game.width, this.blockHeight);
        for (var i = 0; i < 5; i++) {
            if (Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height * 1.5) {
                var x = Util.randomInt(Game.width * 0.1, Game.width * 0.9);
                var y = CreateGameScene.createBlockPosY - this.blockInterval;
                CreateGameScene.createBlockPosY -= this.blockInterval;
                new Block(x, y, this.blockWidth, this.blockHeight);
            }
        }
        this.setInitialBlock = true;
    };
    CreateGameScene.prototype.createBlock = function () {
        if (!this.setInitialBlock) {
            return;
        }
        if (Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height * 1.5) {
            var interval = this.blockInterval;
            var x = Util.randomInt(Game.width * 0.12, Game.width * 0.86);
            var y = CreateGameScene.createBlockPosY - interval;
            CreateGameScene.createBlockPosY -= interval;
            new Block(x, y, this.blockWidth, this.blockHeight);
        }
    };
    CreateGameScene.prototype.changeBlockWidth = function () {
        if (this.blockWidth == Player.I.compornent.width) {
            return;
        }
        if ((Score.score % 10) == 0) {
            if (this.blockWidth < Player.I.compornent.width) {
                this.blockWidth = Player.I.compornent.width;
            }
            else {
                this.blockWidth -= 20;
            }
        }
    };
    CreateGameScene.prototype.changeMaxSubStep = function () {
        if (PhysicsObject.maxSubStep == this.limitMaxSubStep) {
            return;
        }
        if ((Score.score % 10) == 0) {
            if (PhysicsObject.maxSubStep >= this.limitMaxSubStep) {
                PhysicsObject.maxSubStep = this.limitMaxSubStep;
            }
            else {
                PhysicsObject.maxSubStep += 1;
            }
        }
    };
    CreateGameScene.freshArray = function () {
        var newArray3 = CreateGameScene.block.filter(function (obj) { return obj.destroyFlag !== true; });
        CreateGameScene.block = newArray3;
    };
    CreateGameScene.prototype.updateContent = function () {
        this.createBlock();
    };
    CreateGameScene.prototype.getBlockInterval = function () { return this.blockInterval; };
    CreateGameScene.I = null;
    CreateGameScene.block = [];
    CreateGameScene.createBlockPosY = 0;
    return CreateGameScene;
}(GameObject));
__reflect(CreateGameScene.prototype, "CreateGameScene");
//# sourceMappingURL=CreateGameScene.js.map