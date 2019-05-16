class Score extends UICompornent{

    static I:Score = null;   // singleton instance

    static score:number = 0;
    static bestScore:number = 0;

    text:eui.Label = null;
    textBest:eui.Label = null;
    textColor : number = 0x000000;


    constructor(x : number, y : number, width : number, height : number, color : number) {
        super(x,y,width,height);
        Score.I = this;
        Score.score = 0;
        Score.bestScore = 0;
        this.textColor = color;
        Score.bestScore = SaveData.object.bestScore;
        this.setText();
        
    }

    setText(){
        this.text = Util.myText(0, 0, "SCORE : 0", 100, 0.5, this.textColor, true);
        this.compornent.addChild( this.text );

        this.textBest = Util.myText(0, 50, "BEST : " + Score.bestScore.toString(), 100, 0.5, this.textColor, true);
        Score.bestScore = SaveData.object.bestScore;
        this.textBest.text = "BEST : " + Score.bestScore.toString();
        this.compornent.addChild( this.textBest );

    }

    saveBestScore(){
        if(Score.bestScore > SaveData.object.bestScore){
            SaveData.object.bestScore = Score.bestScore;
            SaveData.save();
        }

    }
    
    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
            this.compornent = null;
        }
        this.text = null;
        this.textBest = null;
        Score.score = 0;

    }

    updateContent() {
        this.text.text = "SCORE : " + Score.score.toFixed();
        if( Score.bestScore < Score.score ){
            Score.bestScore = Score.score;
            this.textBest.text = "BEST : " + Score.bestScore.toFixed();
        }
    }

    static addScore(){
        Score.score += 1;
        
    }


}