 class CreateGameScene extends GameObject{
    
/*    static createPosY : number = 0;
    static rightWall : Wall[] = [];
    static leftWall : Wall[] = [];*/

    //static coin : Coin[] = [];

    static block : Block[] = [];
    private blockWidth : number;
    private blockHeight : number;
    private blockInterval : number;
    static createBlockPosY : number = 0;
    private initialDistance : number;

    constructor(){
        super();
        //CreateGameScene.createPosY = Game.height;
        CreateGameScene.createBlockPosY  = Game.height*0.7;
        this.blockWidth = Game.width*0.15;
        this.blockHeight = Game.width*0.05;
        this.blockInterval = Game.height*0.2;
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

        new Block(Game.width/2,CreateGameScene.createBlockPosY, this.blockWidth,this.blockHeight);


        for(let i = 0; i < 50; i ++){
            if(Player.I.compornent.y - CreateGameScene.createBlockPosY < Game.height*1.5){
                const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
                const y :number = CreateGameScene.createBlockPosY - this.blockInterval;
                CreateGameScene.createBlockPosY -= this.blockInterval;
                new Block(x, y, this.blockWidth,this.blockHeight);
                
            }

        }

        



    }

    private createBlock(){
        if(!Player.I.getStart()){return;}
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

}