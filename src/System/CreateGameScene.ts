 class CreateGameScene extends GameObject{
    
    static I : CreateGameScene = null;
    static block : Block[] = [];
    private blockWidth : number;
    private blockHeight : number;
    private blockInterval : number;
    static createBlockPosY : number = 0;
    private initialDistance : number;
    private setInitialBlock : boolean = false;
    private limitMaxSubStep : number = 40;

    constructor(){
        super();
        CreateGameScene.I = this;
        CreateGameScene.createBlockPosY  = Game.height*0.7;
        this.blockWidth = Game.width*0.4;
        this.blockHeight = Game.width*0.04;
        this.blockInterval = Game.height*0.4;

        CreateGameScene.block = [];
        this.initialBlock();
        

    }


    private initialBlock(){
        new Block(Game.width/2,CreateGameScene.createBlockPosY, Game.width,this.blockHeight);
        for(let i = 0; i < 5; i ++){
            if(Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height*1.5){
                const x :number = Util.randomInt(Game.width*0.1, Game.width*0.9);
                const y :number = CreateGameScene.createBlockPosY - this.blockInterval;
                CreateGameScene.createBlockPosY -= this.blockInterval;
                new Block(x, y, this.blockWidth,this.blockHeight);
                
            }

        }

        this.setInitialBlock = true;

    }

    private createBlock(){
        if(!this.setInitialBlock){return;}
        if(Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height*1.5){
            const interval : number = this.blockInterval;
            const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
            const y :number = CreateGameScene.createBlockPosY - interval;
            CreateGameScene.createBlockPosY -= interval;
            new Block(x, y, this.blockWidth,this.blockHeight);
            
        }
        
    }



    public changeBlockWidth(){
        if(this.blockWidth == Player.I.compornent.width){return;}
        if((Score.score % 10) == 0){
            if(this.blockWidth < Player.I.compornent.width){
                this.blockWidth = Player.I.compornent.width;
            }
            else{
                this.blockWidth -= 20;
            }
 
        }
    }

    public changeMaxSubStep(){
        if(PhysicsObject.maxSubStep == this.limitMaxSubStep){return;}
        if((Score.score % 10) == 0){
            if(PhysicsObject.maxSubStep >= this.limitMaxSubStep){
                PhysicsObject.maxSubStep = this.limitMaxSubStep;
            }
            else{
                PhysicsObject.maxSubStep += 1;
           }
            
        }
    }

    static freshArray(){            
            const newArray3 : Block[] = CreateGameScene.block.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.block = newArray3;
    }

    updateContent(){
        this.createBlock();
    }

    getBlockInterval():number{return this.blockInterval;}

}