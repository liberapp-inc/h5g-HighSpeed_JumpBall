class ScoreText extends GameObject{

    static I : ScoreText = null;
    public myTextField : egret.TextField | null = null;
    public myText : string | null = null;



    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, bold :boolean){
        super();
        ScoreText.I = this;
        this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild( this.myTextField );

    }

    onDestroy() {
        GameObject.display.removeChild( this.myTextField );
        this.myTextField = null;
    }

    updateContent(){
        this.myTextField.text = "SCORE : " + Math.floor(CreateGameScene.score).toString();

    }



}


class GameOverText extends GameObject{
    //static I : ScoreText = null;
    public myTextField : egret.TextField | null = null;
    public myText : string | null = null;

    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, bold : boolean){
        super();
        this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild( this.myTextField );
        this.myTextField.anchorOffsetX = this.myTextField.width/2;
        this.myTextField.anchorOffsetY = this.myTextField.height/2;


    }


    onDestroy() {
        GameObject.display.removeChild( this.myTextField );
        this.myTextField = null;
    }


    updateContent(){
        //this.myTextField.text = "SCORE : " + Math.floor(CreateGameScene.score).toString();

    }


}

class DownCeilingText extends GameObject{
    public myTextField : egret.TextField | null = null;
    public myText : string | null = null;
    public deleteFlag : boolean = false;
    public y :number;



    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number,bold : boolean){
        super();
        this.myTextField = Main.newTextField(x, y, text, size, ratio, color, bold);
        GameObject.display.addChild( this.myTextField );
        this.myTextField.anchorOffsetX = this.myTextField.width/2;
        this.myTextField.anchorOffsetY = this.myTextField.height/2;
        this.myText = text;
        this.y=y;

    }

    updateContent(){
        //this.myTextField.y += CreateGameScene.downCeilingLife;
        this.updateDownText( this.y, this.myText, this.deleteFlag);        

    }

    onDestroy() {
        GameObject.display.removeChild( this.myTextField );
        this.myTextField = null;
    }
    
    public updateDownText(y:number, text:string, deleteflag : boolean): void{

        if(this.deleteFlag == true){
            this.myTextField.text = "";
        }else{
            this.myTextField.y = y;
            this.myTextField.text = text;
        }

    }

}