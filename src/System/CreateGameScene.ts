 class CreateGameScene extends GameObject{
    
/*    static createPosY : number = 0;
    static rightWall : Wall[] = [];
    static leftWall : Wall[] = [];*/

    //static coin : Coin[] = [];

    static I : CreateGameScene = null;
    static block : Block[] = [];
    private blockWidth : number;
    private blockHeight : number;
    private blockInterval : number;
    static createBlockPosY : number = 0;
    private initialDistance : number;
    private setInitialBlock : boolean = false;

    constructor(){
        super();
        CreateGameScene.I = this;
        //CreateGameScene.createPosY = Game.height;
        CreateGameScene.createBlockPosY  = Game.height*0.7;
        this.blockWidth = Game.width*0.4;
        this.blockHeight = Game.width*0.04;
        this.blockInterval = Game.height*0.4;
/*        CreateGameScene.rightWall = [];
        CreateGameScene.leftWall = [];*/
        CreateGameScene.block = [];
        this.initialBlock();
        

    }


    private initialBlock(){
/*        new Wall(Game.width*0.9,   -Game.height * 1, Game.width*0.1, Game.height*0.98);
        new Wall(0,                -Game.height * 1, Game.width*0.1, Game.height*0.98);
        new Wall(Game.width*0.9,    Game.height * 0, Game.width*0.1, Game.height*1.5);
        new Wall(0,                 Game.height * 0, Game.width*0.1, Game.height*1.5);*/

        new Block(Game.width/2,CreateGameScene.createBlockPosY, Game.width,this.blockHeight);


        for(let i = 0; i < 5; i ++){
            if(Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height*1.5){
                const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
                const y :number = CreateGameScene.createBlockPosY - this.blockInterval;
                CreateGameScene.createBlockPosY -= this.blockInterval;
                new Block(x, y, this.blockWidth,this.blockHeight);
                
            }

        }

        this.setInitialBlock = true;



    }

    private createBlock(){
        if(!this.setInitialBlock){return;}
        //if(!Player.I.getStart()){return;}
        if(Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height*1.5){
            const interval : number = this.blockInterval;
            const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
            const y :number = CreateGameScene.createBlockPosY - interval;
            CreateGameScene.createBlockPosY -= interval;
            new Block(x, y, this.blockWidth,this.blockHeight);
            
            
        }
/*        if(CreateGameScene.createBlockPosY - Player.I.compornent.y  > Game.height*0.1){
            const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
            const y :number = Player.I.compornent.y - Game.height*1;// -Util.randomInt(0, Game.height*0.5);
            CreateGameScene.createBlockPosY -= Game.height*0.1;

            new Block(x, y, this.blockWidth,this.blockHeight);
            
        }*/
        
    }

    public changeBlockParameter(){
        if(this.blockWidth == Player.I.compornent.width && PhysicsObject.maxSubStep == 40){
            return;
        }
        if((Score.score % 10) == 0){
            if(this.blockWidth == Player.I.compornent.width){

            }
            else if(this.blockWidth < Player.I.compornent.width){//大体50pxくらい
                this.blockWidth = Player.I.compornent.width;
            }
/*            if(this.blockWidth <= Game.width*0.07){//大体50pxくらい
                this.blockWidth = Game.width*0.07;
            }*/
            else{
                this.blockWidth -= 20;
            }

            if(PhysicsObject.maxSubStep == 40){

            }
            else if(PhysicsObject.maxSubStep >= 40){
                PhysicsObject.maxSubStep = 40;
            }
            else{
                PhysicsObject.maxSubStep += 1;
           }
            
        }
    }

    static freshArray(){
/*            const newArray : Wall[] = CreateGameScene.rightWall.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.rightWall = newArray;

            const newArray2 : Wall[] = CreateGameScene.leftWall.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.leftWall = newArray2;*/
            
            const newArray3 : Block[] = CreateGameScene.block.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.block = newArray3;
    }

    updateContent(){
        this.createBlock();
    }

    getBlockInterval():number{return this.blockInterval;}

}