var __reflect=this&&this.__reflect||function(e,t,o){e.__class__=t,o?o.push(t):o=[t],e.__types__=e.__types__?o.concat(e.__types__):o},__extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);o.prototype=t.prototype,e.prototype=new o},__awaiter=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))(function(n,a){function r(e){try{h(i.next(e))}catch(t){a(t)}}function s(e){try{h(i["throw"](e))}catch(t){a(t)}}function h(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,s)}h((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function o(e){return function(t){return i([e,t])}}function i(o){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,a&&(r=a[2&o[0]?"return":o[0]?"throw":"next"])&&!(r=r.call(a,o[1])).done)return r;switch(a=0,r&&(o=[0,r.value]),o[0]){case 0:case 1:r=o;break;case 4:return h.label++,{value:o[1],done:!1};case 5:h.label++,a=o[1],o=[0];continue;case 7:o=h.ops.pop(),h.trys.pop();continue;default:if(r=h.trys,!(r=r.length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){h=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){h.label=o[1];break}if(6===o[0]&&h.label<r[1]){h.label=r[1],r=o;break}if(r&&h.label<r[2]){h.label=r[2],h.ops.push(o);break}r[2]&&h.ops.pop(),h.trys.pop();continue}o=t.call(e,h)}catch(i){o=[6,i],a=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}var n,a,r,s,h={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:o(0),"throw":o(1),"return":o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},GraphicShape;!function(e){e[e.NONE=Math.pow(2,0)]="NONE",e[e.CIECLE=Math.pow(2,1)]="CIECLE",e[e.BOX=Math.pow(2,2)]="BOX",e[e.CEILING=Math.pow(2,3)]="CEILING",e[e.DOWN_CEILING=Math.pow(2,4)]="DOWN_CEILING",e[e.WALL=Math.pow(2,5)]="WALL",e[e.DEAD_LINE=Math.pow(2,6)]="DEAD_LINE"}(GraphicShape||(GraphicShape={}));var StageLevel;!function(e){e[e.START=0]="START",e[e.LEVEL1=1]="LEVEL1",e[e.LEVEL2=2]="LEVEL2",e[e.GAMEOVER=3]="GAMEOVER"}(StageLevel||(StageLevel={}));var Block;!function(e){e[e.NORMAL=0]="NORMAL",e[e.HORIZONTAL_MOVE=1]="HORIZONTAL_MOVE",e[e.VERTICAL_MOVE=2]="VERTICAL_MOVE"}(Block||(Block={}));var Main=function(e){function t(){var t=e.call(this)||this;return t.once(egret.Event.ADDED_TO_STAGE,t.addToStage,t),t}return __extends(t,e),t.prototype.addToStage=function(){GameObject.initial(this.stage),CreateGameScene.init()},t.random=function(e,t){return e+Math.random()*(t-e)},t.randomInt=function(e,t){return Math.floor(e+Math.random()*(t+.999-e))},t.clamp=function(e,t,o){return t>e&&(e=t),e>o&&(e=o),e},t}(eui.UILayer);__reflect(Main.prototype,"Main");var CreateGameScene=function(){function e(){}return e.init=function(){this.height=egret.MainContext.instance.stage.stageHeight,this.width=egret.MainContext.instance.stage.stageWidth,this.score=0,this.boxInterval=80,this.gameOverFlag=!1,Box.boxMove=!1,this.gameOverText=null,e.downCeilingLife=1,egret.startTick(this.tickLoop,this),new Background,new CreateWorld,new CeilingBlock(e.width/2,80,e.width,50,8355839);var t=(new WallBlock(0,e.height/2,50,e.height,8355839),new WallBlock(e.width,e.height/2,50,e.height,8355839));t.body.angle=Math.PI,new CreateDownCeilingBlock,new DeadBlock(e.width/2,e.height,e.width,20,16711680),null==this.scoreText&&(this.scoreText=new ScoreText(0,0,"Score "+Math.floor(e.score).toString(),100,.5,16777215,"Meiryo",0,0)),new Ball,new NormalBlock(e.width/2,e.height-10,100,30,8388479);for(var o,i=this.height/this.boxInterval,n=1;i>n;n++)switch(o=Main.randomInt(0,2)){case Block.NORMAL:new NormalBlock(Main.random(0,e.width),-e.boxInterval*n+e.height,100,30,8388479);break;case Block.HORIZONTAL_MOVE:new HorizontalMoveBlock(Main.random(0,e.width),-e.boxInterval*n+e.height,100,30,16760703);break;case Block.VERTICAL_MOVE:new VerticalMoveBlock(Main.random(0,e.width),-e.boxInterval*n+e.height,100,30,16744319)}},e.tickLoop=function(t){return void 0===t&&(t=Main.timeStamp),GameObject.update(),CreateWorld.worldBegin(t),1==e.gameOverFlag&&egret.stopTick(this.tickLoop,this),!1},e.boxInterval=80,e.score=0,e.scoreText=null,e.gameOverFlag=!1,e.gameOverText=null,e.downCeilingLife=1,e}();__reflect(CreateGameScene.prototype,"CreateGameScene");var GameObject=function(){function e(){this.shape=null,this.body=null,this.bodyShape=null,this.world=null,e.objects.push(this)}return e.initial=function(t){e.objects=[],e.display=t},e.update=function(){e.objects.forEach(function(e){return e.updateContent()})},e}();__reflect(GameObject.prototype,"GameObject");var CreateDownCeilingBlock=function(e){function t(){var t=e.call(this)||this;return t.life=1,t.score=0,t.block=new DownCeilingBlock(CreateGameScene.width/2,80,CreateGameScene.width,50,8355839,CreateGameScene.downCeilingLife),t.createBlock(),t}return __extends(t,e),t.prototype.createBlock=function(){if(this.score+=Box.blockdownSpeed,this.block.life<=0){var e=new DownCeilingBlock(CreateGameScene.width/2,80,CreateGameScene.width,50,8355839,CreateGameScene.downCeilingLife);this.block=e,CreateGameScene.downCeilingLife+=1}},t.prototype.updateContent=function(){this.createBlock()},t}(GameObject);__reflect(CreateDownCeilingBlock.prototype,"CreateDownCeilingBlock");var CreateWorld=function(e){function t(){var t=e.call(this)||this;return t.createWorld(),t}return __extends(t,e),t.prototype.createWorld=function(){t.world=new p2.World,t.world.sleepMode=p2.World.BODY_SLEEPING,t.world.gravity=[0,9.8]},t.prototype.createWall=function(){},t.prototype.updateContent=function(){},t.worldBegin=function(e){return t.world.step(1/60,e/1e3,10),!1},t.world=null,t}(GameObject);__reflect(CreateWorld.prototype,"CreateWorld");var Wall=function(e){function t(){var t=e.call(this)||this;return t.ceilingHeight=50,t.createWall(),t}return __extends(t,e),t.prototype.createWall=function(){this.body=new p2.Body({mass:1,position:[CreateGameScene.width,300],fixedRotation:!0,type:p2.Body.STATIC}),this.bodyShape=new p2.Box({whidth:CreateGameScene.width,height:this.ceilingHeight,collisionGroup:GraphicShape.CEILING,collisionMask:GraphicShape.CIECLE}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body),this.setShape(CreateGameScene.width,this.ceilingHeight)},t.prototype.setShape=function(e,t){this.shape&&GameObject.display.removeChild(this.shape),this.shape=new egret.Shape,this.shape.anchorOffsetX+=e/2,this.shape.anchorOffsetY+=t/2,this.shape.x=this.body.position[0],this.shape.y=this.body.position[1],this.shape.graphics.beginFill(16760703),this.shape.graphics.drawRect(0,0,e,t),this.shape.graphics.endFill(),GameObject.display.addChild(this.shape)},t.prototype.updateContent=function(){},t}(GameObject);__reflect(Wall.prototype,"Wall");var Background=function(e){function t(){var t=e.call(this)||this;return t.obj=new egret.Shape,t.obj.graphics.beginFill(128),t.obj.graphics.drawRect(0,0,CreateGameScene.width,CreateGameScene.height),t.obj.graphics.endFill(),GameObject.display.addChild(t.obj),t}return __extends(t,e),t.prototype.updateContent=function(){},t}(GameObject);__reflect(Background.prototype,"Background");var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,o){function i(i){t.call(o,i,e)}if(RES.hasRes(e)){var n=RES.getRes(e);n?i(n):RES.getResAsync(e,i,this)}else RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Ball=function(e){function t(){var o=e.call(this)||this;return o.radius=20,t.I=o,o.setBody(CreateGameScene.width/2,CreateGameScene.height-100,o.radius),o.setShape(o.radius),t.ballPosY=o.body.position[1],t.finalBallPosY=CreateGameScene.height-100,GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){return o.touchMove(e)},o),o}return __extends(t,e),t.prototype.setBody=function(e,t,o){this.body=new p2.Body({mass:1,position:[e,t]}),this.bodyShape=new p2.Circle({radius:o,collisionGroup:GraphicShape.CIECLE,collisionMask:GraphicShape.BOX|GraphicShape.CEILING|GraphicShape.DEAD_LINE|GraphicShape.DOWN_CEILING|GraphicShape.WALL,fixedRotation:!0}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.setShape=function(e){this.shape&&GameObject.display.removeChild(this.shape),this.shape=new egret.Shape,this.shape.x=this.body.position[0],this.shape.y=this.body.position[1],this.shape.graphics.beginFill(16711680),this.shape.graphics.drawCircle(0,0,e),this.shape.graphics.endFill(),GameObject.display.addChild(this.shape)},t.prototype.updateDrowShape=function(){this.shape.x=this.body.position[0],this.shape.y=this.body.position[1],GameObject.display.addChild(this.shape)},t.prototype.updateContent=function(){this.updateDrowShape(),this.checkRise(),0==CreateGameScene.gameOverFlag&&(CreateGameScene.score+=Box.blockdownSpeed),this.gameOver()},t.prototype.touchMove=function(e){e.stageX<=this.shape.x&&this.shape.x>80?this.body.applyForce([-500,0],[0,0]):e.stageX>this.shape.x&&this.shape.x<CreateGameScene.width-80&&this.body.applyForce([500,0],[0,0])},t.prototype.checkRise=function(){t.ballPosY=this.body.position[1],t.ballPosY<this.body.position[1]?t.checkRiseFlag=!0:t.checkRiseFlag=!1},t.prototype.gameOver=function(){1==CreateGameScene.gameOverFlag&&(t.I=null)},t.I=null,t.checkRiseFlag=!1,t}(GameObject);__reflect(Ball.prototype,"Ball");var Box=function(e){function t(t,o,i,n,a){var r=e.call(this)||this;return r.boxPositionX=t,r.boxPositionY=o,r.boxWidth=i,r.boxHeight=n,r.boxColor=a,r.setBody(r.boxPositionX,r.boxPositionY,r.boxWidth,r.boxHeight),r.setShape(r.boxWidth,r.boxHeight),CreateWorld.world.on("beginContact",r.collision,r),r}return __extends(t,e),t.prototype.setBody=function(e,t,o,i){this.body=new p2.Body({mass:1,position:[e,t],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:i,collisionGroup:GraphicShape.BOX,collisionMask:GraphicShape.CIECLE,fixedRotation:!0,sensor:!0}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.setShape=function(e,t){this.shape&&GameObject.display.removeChild(this.shape),this.shape=new egret.Shape,this.shape.anchorOffsetX+=e/2,this.shape.anchorOffsetY+=t/2,this.shape.x=this.body.position[0],this.shape.y=this.body.position[1],this.shape.graphics.beginFill(this.boxColor),this.shape.graphics.drawRect(0,0,e,t),this.shape.graphics.endFill(),GameObject.display.addChild(this.shape)},t.prototype.updateContent=function(){this.moveBlock(),this.gameOver()},t.prototype.moveBlock=function(){1==t.boxMove&&(this.body.position[1]+=t.blockdownSpeed,this.shape.y+=t.blockdownSpeed,this.shape.y>CreateGameScene.height&&(this.body.position[1]=-CreateGameScene.boxInterval,this.shape.y=-CreateGameScene.boxInterval))},t.prototype.collision=function(e){var o=e.bodyA;e.shapeA;0==Ball.checkRiseFlag&&(0==t.boxMove&&(t.boxMove=!0),Ball.ballPosY<o.position[1]&&Ball.I.body.applyForce([0,-1e4],[0,0]))},t.prototype.gameOver=function(){1==CreateGameScene.gameOverFlag&&CreateWorld.world.off("beginContact",this.collision)},t.boxMove=!1,t.blockdownSpeed=3,t}(GameObject);__reflect(Box.prototype,"Box");var NormalBlock=function(e){function t(t,o,i,n,a){return e.call(this,t,o,i,n,a)||this}return __extends(t,e),t}(Box);__reflect(NormalBlock.prototype,"NormalBlock");var HorizontalMoveBlock=function(e){function t(t,o,i,n,a){var r=e.call(this,t,o,i,n,a)||this,s=Main.randomInt(0,1);switch(s){case 0:r.rightMove=!1;break;case 1:r.rightMove=!0}return r}return __extends(t,e),t.prototype.updateContent=function(){switch(this.moveBlock(),this.rightMove){case!1:this.body.position[0]<=0?this.rightMove=!0:(this.body.position[0]-=t.horizontalMoveSpeed,this.shape.x=this.body.position[0]);break;case!0:this.body.position[0]>CreateGameScene.width?this.rightMove=!1:(this.body.position[0]+=t.horizontalMoveSpeed,this.shape.x=this.body.position[0])}},t.horizontalMoveSpeed=2,t}(Box);__reflect(HorizontalMoveBlock.prototype,"HorizontalMoveBlock");var VerticalMoveBlock=function(e){function t(t,o,i,n,a){var r=e.call(this,t,o,i,n,a)||this;r.moveLength=0;var s=Main.randomInt(0,1);switch(s){case 0:r.upMove=!1;break;case 1:r.upMove=!0}return r}return __extends(t,e),t.prototype.updateContent=function(){switch(this.moveBlock(),this.upMove){case!1:this.moveLength>=t.clampVerticalMoveLength?(this.upMove=!0,this.moveLength=0):(this.body.position[1]-=t.verticalMoveSpeed,this.shape.y=this.body.position[1],this.moveLength+=t.verticalMoveSpeed);break;case!0:this.moveLength>=t.clampVerticalMoveLength?(this.upMove=!1,this.moveLength=0):(this.body.position[1]+=t.verticalMoveSpeed,this.shape.y=this.body.position[1],this.moveLength+=t.verticalMoveSpeed)}},t.verticalMoveSpeed=2,t.clampVerticalMoveLength=200,t}(Box);__reflect(VerticalMoveBlock.prototype,"VerticalMoveBlock");var CeilingBlock=function(e){function t(t,o,i,n,a){return e.call(this,t,o,i,n,a)||this}return __extends(t,e),t.prototype.setBody=function(e,t,o,i){this.body=new p2.Body({mass:1,position:[e,t],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:i,collisionGroup:GraphicShape.CEILING,collisionMask:GraphicShape.CIECLE,fixedRotation:!0,sensor:!1}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.updateContent=function(){},t}(Box);__reflect(CeilingBlock.prototype,"CeilingBlock");var DownCeilingBlock=function(e){function t(t,o,i,n,a,r){var s=e.call(this,t,o,i,n,a)||this;return s.life=1,s.lifeText=null,s.life=r||1,s.lifeText=new DownCeilingText(t,o,s.life.toString(),100,.5,16777215,"Meiryo",0,0),s}return __extends(t,e),t.prototype.setBody=function(e,t,o,i){this.body=new p2.Body({mass:1,position:[e,t],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:i,collisionGroup:GraphicShape.DOWN_CEILING,collisionMask:GraphicShape.CIECLE,fixedRotation:!0,sensor:!1}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.updateContent=function(){this.moveBlock(),this.gameOver()},t.prototype.moveBlock=function(){1==Box.boxMove&&0==this.lifeText.deleteFlag&&(this.body.position[1]+=t.blockdownSpeed,this.shape.y+=t.blockdownSpeed,this.lifeText.y=this.shape.y,this.lifeText.text=this.life.toString())},t.prototype.collision=function(e){var t=(e.bodyA,e.shapeA),o=(e.bodyB,e.shapeB);o.collisionGroup==GraphicShape.CIECLE&&t.collisionGroup==GraphicShape.DOWN_CEILING&&(this.life-=1,this.life<=0&&(CreateWorld.world.removeBody(this.body),GameObject.display.removeChild(this.shape),this.lifeText.deleteFlag=!0,this.lifeText.text=null))},t.prototype.gameOver=function(){1==CreateGameScene.gameOverFlag&&(this.lifeText.deleteFlag=!0,this.lifeText.text=null)},t.blockdownSpeed=.5,t}(CeilingBlock);__reflect(DownCeilingBlock.prototype,"DownCeilingBlock");var DeadBlock=function(e){function t(t,o,i,n,a){return e.call(this,t,o,i,n,a)||this}return __extends(t,e),t.prototype.setBody=function(e,t,o,i){this.body=new p2.Body({mass:1,position:[e,t],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:i,collisionGroup:GraphicShape.DEAD_LINE,collisionMask:GraphicShape.CIECLE,fixedRotation:!0,sensor:!0}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.updateContent=function(){},t.prototype.collision=function(e){var t=this,o=(e.bodyA,e.shapeA),i=(e.bodyB,e.shapeB);i.collisionGroup==GraphicShape.CIECLE&&o.collisionGroup==GraphicShape.DEAD_LINE&&(CreateGameScene.gameOverFlag=!0,null==CreateGameScene.gameOverText&&(CreateGameScene.gameOverText=[],CreateGameScene.gameOverText[0]=new GameOverText(CreateGameScene.width/2,CreateGameScene.height/2-50,"GAME OVER",180,.5,16777215,"Meiryo",0,2),CreateGameScene.gameOverText[1]=new GameOverText(CreateGameScene.width/2,CreateGameScene.height/2+50,"Score "+Math.floor(CreateGameScene.score).toString(),120,.5,16777215,"Meiryo",0,2)),GameObject.display.stage.once(egret.TouchEvent.TOUCH_BEGIN,function(e){return t.retry(e)},this))},t.prototype.retry=function(e){CreateGameScene.init()},t}(Box);__reflect(DeadBlock.prototype,"DeadBlock");var WallBlock=function(e){function t(t,o,i,n,a){var r=e.call(this)||this;return r.boxPositionX=t,r.boxPositionY=o,r.boxWidth=i,r.boxHeight=n,r.boxColor=a,r.setBody(r.boxPositionX,r.boxPositionY,r.boxWidth,r.boxHeight),r.setShape(r.boxWidth,r.boxHeight),r}return __extends(t,e),t.prototype.setBody=function(e,t,o,i){this.body=new p2.Body({mass:1,position:[e,t],type:p2.Body.STATIC}),this.bodyShape=new p2.Box({width:o,height:i,collisionGroup:GraphicShape.WALL,collisionMask:GraphicShape.CIECLE,fixedRotation:!0,sensor:!1}),this.body.addShape(this.bodyShape),CreateWorld.world.addBody(this.body)},t.prototype.setShape=function(e,t){this.shape&&GameObject.display.removeChild(this.shape),this.shape=new egret.Shape,this.shape.anchorOffsetX+=e/2,this.shape.anchorOffsetY+=t/2,this.shape.x=this.body.position[0],this.shape.y=this.body.position[1],this.shape.graphics.beginFill(this.boxColor),this.shape.graphics.drawRect(0,0,e,t),this.shape.graphics.endFill(),GameObject.display.addChild(this.shape)},t.prototype.updateContent=function(){},t.boxMove=!1,t.blockdownSpeed=3,t}(GameObject);__reflect(WallBlock.prototype,"WallBlock");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var MyText=function(e){function t(t,o,i,n,a,r,s,h,l){var c=e.call(this)||this;return c.myTextField=null,c.myText=null,c.x=0,c.y=0,c.size=1,c.ratio=1,c.color=0,c.stColor=0,c.stSize=0,c.font="Meiryo",c.text="",c.newText(t,o,i,n,a,r,s,h,l),c.x=t,c.y=o,c.text=i,c.size=n,c.ratio=a,c.color=r,c.font=s,c.stColor=h,c.stSize=l,c}return __extends(t,e),t.prototype.newText=function(e,t,o,i,n,a,r,s,h){this.myTextField=new egret.TextField,this.myTextField.x=e||0,this.myTextField.y=t||0,this.myTextField.scaleX=n||1,this.myTextField.scaleY=n||1,this.myTextField.textFlow=[{text:o,style:{textColor:a||0,size:i||1,fontFamily:r||"Meiryo",strokeColor:s||0,stroke:h||0}}],GameObject.display.addChild(this.myTextField)},t.prototype.updateText=function(e){this.myTextField.textFlow=[{text:e,style:{textColor:this.color||0,size:this.size||1,fontFamily:this.font||"Meiryo",strokeColor:this.stColor||0,stroke:this.stSize||0}}],GameObject.display.addChild(this.myTextField)},t.prototype.updateContent=function(){},t}(GameObject);__reflect(MyText.prototype,"MyText");var ScoreText=function(e){function t(t,o,i,n,a,r,s,h,l){return e.call(this,t,o,i,n,a,r,s,h,l)||this}return __extends(t,e),t.prototype.updateContent=function(){this.updateText("Score "+Math.floor(CreateGameScene.score).toString())},t}(MyText);__reflect(ScoreText.prototype,"ScoreText");var GameOverText=function(e){function t(t,o,i,n,a,r,s,h,l){var c=e.call(this,t,o,i,n,a,r,s,h,l)||this;return c.myTextField.anchorOffsetX=c.myTextField.width/2,c.myTextField.anchorOffsetY=c.myTextField.height/2,c}return __extends(t,e),t.prototype.updateContent=function(){},t}(MyText);__reflect(GameOverText.prototype,"GameOverText");var DownCeilingText=function(e){function t(t,o,i,n,a,r,s,h,l){var c=e.call(this,t,o,i,n,a,r,s,h,l)||this;return c.deleteFlag=!1,c.myTextField.anchorOffsetX=c.myTextField.width/2,c.myTextField.anchorOffsetY=c.myTextField.height/2,c.text=i,c}return __extends(t,e),t.prototype.updateContent=function(){this.updateDownText(this.y,this.text,this.deleteFlag)},t.prototype.updateDownText=function(e,t,o){1==this.deleteFlag?this.myTextField.text="":(this.myTextField.y=e,this.myTextField.textFlow=[{text:t,style:{textColor:this.color||0,size:this.size||1,fontFamily:this.font||"Meiryo",strokeColor:this.stColor||0,stroke:this.stSize||0}}])},t}(MyText);__reflect(DownCeilingText.prototype,"DownCeilingText");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,o,i){function n(e){t.call(i,e)}function a(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,a,null),o.call(i))}var r=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(i,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,o){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(i,generateEUI2)},r)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var s=e.split("/");s.pop();var h=s.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(i,generateJSON.paths[e])},this):RES.getResByUrl(h,function(o){window.JSONParseClass.setData(o),egret.callLater(function(){t.call(i,generateJSON.paths[e])},r)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(i,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,a,null),RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);