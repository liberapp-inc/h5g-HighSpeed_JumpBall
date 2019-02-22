class MyText extends GameObject{

    public myTextField : egret.TextField | null = null;
    public myText : string | null = null;

    public x : number|null = 0;
    public y : number|null = 0;
    public size : number|null = 1;
    public ratio : number|null = 1;
    public color : number|null = 0x000000;
    public stColor : number|null =0x0000000;
    public stSize : number|null = 0;
    public font : string|null = "Meiryo";
    public text : string|null = "";

    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        super();
        this.newText(x, y, text, size, ratio, color, font, stColor, stSize);
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        this.ratio = ratio;
        this.color= color;
        this.font = font;
        this.stColor = stColor;
        this.stSize = stSize;
    }

    protected newText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number): void {
        
        this.myTextField = new egret.TextField();
        this.myTextField.x = x || 0;
        this.myTextField.y = y || 0;

        this.myTextField.scaleX = ratio || 1;
        this.myTextField.scaleY = ratio || 1;
        this.myTextField.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": color || 0x000000, "size": size ||1, "fontFamily": font ||"Meiryo", "strokeColor": stColor || 0x000000, "stroke": stSize || 0,
                }
            }
        ];    
        GameObject.display.addChild(this.myTextField);

    }

    protected updateText(text:string): void{

        this.myTextField.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": this.color || 0x000000, "size": this.size ||1, "fontFamily": this.font ||"Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                }
            }
        ];    
        GameObject.display.addChild(this.myTextField);
    }

    
    updateContent(){

    }



}

class ScoreText extends MyText{
    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        super(x, y, text, size, ratio, color, font, stColor, stSize);

    }

    updateContent(){
        this.updateText("Score " + Math.floor(CreateGameScene.score).toString());        
    }

}


class GameOverText extends MyText{
    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        super(x, y, text, size, ratio, color, font, stColor, stSize);
        this.myTextField.anchorOffsetX = this.myTextField.width/2;
        this.myTextField.anchorOffsetY = this.myTextField.height/2;

    }

    updateContent(){

    }

}

class DownCeilingText extends MyText{

    public deleteFlag : boolean = false;

    public constructor(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number){
        super(x, y, text, size, ratio, color, font, stColor, stSize);
        this.myTextField.anchorOffsetX = this.myTextField.width/2;
        this.myTextField.anchorOffsetY = this.myTextField.height/2;
        this.text = text;

    }

    updateContent(){
        //this.myTextField.y += CreateGameScene.downCeilingLife;
        this.updateDownText( this.y, this.text, this.deleteFlag);        

    }


    public updateDownText(y:number, text:string, deleteflag : boolean): void{

        if(this.deleteFlag == true){
            this.myTextField.text = "";
        }else{
        this.myTextField.y = y;

        this.myTextField.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": this.color || 0x000000, "size": this.size ||1, "fontFamily": this.font ||"Meiryo", "strokeColor": this.stColor || 0x000000, "stroke": this.stSize || 0,
                }
            }
        ];    

        }
        //GameObject.display.addChild(this.myTextField);        


    }

}