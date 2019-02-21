class MyText extends GameObject{

    protected myTextField : egret.TextField | null = null;
    protected myText : string | null = null;

    protected x : number|null = 0;
    protected y : number|null = 0;
    protected size : number|null = 1;
    protected ratio : number|null = 1;
    protected color : number|null = 0x000000;
    protected stColor : number|null =0x0000000;
    protected stSize : number|null = 0;
    protected font : string|null = "Meiryo";
    protected text : string|null = "";

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
        this.updateText("Score " + Math.floor(CreateGameScene.score).toString());
    }


}

