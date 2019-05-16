abstract class Button extends UICompornent{

    indexText : eui.Label = null;
    indexTextColor : number = Util.color(230,230,230);
    shapeColor : number = Util.color(230,0,0);
    mask : egret.Shape = null;
    maskColor : number = Util.color(0,0,0);
    onMask : boolean = false;

    constructor(x : number, y : number, width : number, height : number, index : string){
        super(x, y, width, height);
        this.setCompornentStatus(x, y, width, height);
    }

    setCompornentStatus(x : number, y : number, width : number, height : number){
        this.compornent.anchorOffsetX += width/2;
        this.compornent.anchorOffsetY += height/2;
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.touchEnabled = true;
        this.compornent.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
    }

    setShape(x : number, y : number, width : number, height : number, color?:number){
        if( this.shapes[0] ){
            GameObject.display.removeChild(this.shapes[0]);        
        }
        if(color){
            this.shapeColor = color;
        }
        this.shapes[0] = new egret.Shape();
        this.shapes[0].x = 0;
        this.shapes[0].y = 0;
        this.shapes[0].graphics.beginFill(this.shapeColor);
        this.shapes[0].graphics.drawRoundRect(0, 0, width , height, 30);
        this.shapes[0].graphics.endFill();
        this.compornent.addChild(this.shapes[0]);
    }

    setMask(x : number, y : number, width : number, height : number, color?:number){

        if(color){
            this.maskColor = color;
        }
        this.mask = new egret.Shape();
        this.mask.x = 0;
        this.mask.y = 0;
        this.mask.alpha = 0;
        this.mask.graphics.beginFill(this.maskColor);
        this.mask.graphics.drawRoundRect(0, 0, width , height, 30);
        this.mask.graphics.endFill();
        this.shapes.push(this.mask);
        this.compornent.addChild(this.mask);
    }
    

    setIndexText(x : number, y : number, width : number, height : number, index:string, size?:number,ratio?:number,color?:number){
        size = size | 80;
        ratio = ratio | 0.5;
        this.indexTextColor = color | this.indexTextColor;
        this.indexText = Util.myText(x,y, index, size, ratio, this.indexTextColor, true);
        this.indexText.width = this.compornent.width/ratio;
        this.indexText.height = this.compornent.height/ratio;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        //this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.compornent.addChild(this.indexText);
    }


    addDestroyMethod(){
        if( this.compornent.hasEventListener ){
            this.compornent.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
        }
        if(this.indexText){
            this.compornent.removeChild(this.indexText);
            this.indexText = null;
        }

    }


    abstract tap() :void;

}

