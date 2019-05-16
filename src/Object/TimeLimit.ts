class TimeLimit extends UICompornent{
    

    static limitTimer : egret.Timer = null;
    static limitInterval :number = 1000;
    coinCount :number = 0;

    private time: number  = 60;
    private timeText : eui.Label = null;
    private textColor : number = 0x000000;


    constructor(x:number, y:number,width:number,height:number, color :number){
        super(x,y,width,height);

        TimeLimit.limitTimer = new egret.Timer(TimeLimit.limitInterval,0);
        TimeLimit.limitTimer.addEventListener(egret.TimerEvent.TIMER,this.timePass,this);
        TimeLimit.limitTimer.start();

        this.textColor = color;
        this.setText();
        

    }

    private setText(){
        this.timeText = Util.myText(0,0,"TIME : " + this.time.toString(),100, 0.5,this.textColor, true);
        this.compornent.addChild(this.timeText);
    }

    public resetTimer(){

        TimeLimit.limitTimer.stop();
        TimeLimit.limitTimer.removeEventListener(egret.TimerEvent.TIMER,this.timePass,this);
        TimeLimit.limitTimer = new egret.Timer(TimeLimit.limitInterval,0);
        TimeLimit.limitTimer.addEventListener(egret.TimerEvent.TIMER,this.timePass,this);
        TimeLimit.limitTimer.start();
        
    }

    private timePass(){
        if(GameOver.gameOverFlag == false){
            if(this.time > 0){
                this.time -= 1;
            }
            if(this.time == 0){
                this.time = 0;
                new GameOver(0,0,0,0);
            }

        }
    }

    addDestroyMethod(){
        GameObject.display.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.timePass, this );
        TimeLimit.limitTimer.stop();
        TimeLimit.limitTimer.removeEventListener(egret.TimerEvent.TIMER,this.timePass,this);

        if(this.compornent){
            this.compornent.removeChildren();
            this.compornent = null;
        }
        this.timeText = null;

    }

    updateContent(){
        this.timeText.text = "TIME : " + this.time.toString();
        
    }

}