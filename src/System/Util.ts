// ゲームで便利に使えるUtilityクラス

class Util{

    public static height: number;
    public static width: number;
    public static ui:eui.UILayer;

    static init( eui:eui.UILayer ) {
        this.height = eui.stage.stageHeight;
        this.width  = eui.stage.stageWidth;
        this.ui = eui;
    }

    static random(min:number, max:number):number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min:number, max:number):number {
        return Math.floor( min + Math.random() * (max+0.999 - min) );
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    //rgbを16進数へ変換
    static color( r:number, g:number, b:number):number {
        //小数点の切り捨て
        let r16 = r.toFixed(0);
        let g16 = g.toFixed(0);
        let b16 = b.toFixed(0);

        //16進数へ変換
        r16 = r.toString(16);
        g16 = g.toString(16);
        b16 = b.toString(16);

        //r = 0だと r16 =0なので00にするために'00'加算
        r16 = ('00' + r16).slice(-2);
        g16 = ('00' + g16).slice(-2);
        b16 = ('00' + b16).slice(-2);

        //色コードへ変換
        let code :number = parseInt(("0x" +r16 + g16 + b16), 16) ;

        return code;
    }


    static myText(x:number, y:number, text:string, size:number, ratio:number, color:number, bold:boolean): eui.Label {
        
        let label :eui.Label = new eui.Label();
        label.scaleX = ratio;
        label.scaleY = ratio;
        label.bold = bold;
        label.size = size;
        label.text = text;
        label.textColor = color;
        label.x = x;
        label.y = y;
        label.multiline = true;
        return label;
    }

    static myStrokeText(x:number, y:number, text:string, size:number, ratio:number, color:number, font:string, stColor:number, stSize:number): egret.TextField {
        
        let label :eui.Label = new eui.Label();
        label.x = x;
        label.y = y;

        label.scaleX = ratio;
        label.scaleY = ratio;
        label.textFlow = <Array<egret.ITextElement>>[ 
            {text: text, 
                style: {
                    "textColor": color, "size": size, "fontFamily": font, "strokeColor": stColor, "stroke": stSize,
                }
            }
        ];    

        return label;
    }

    static saveLocalStrage(key :string, saveValue : number){
        window.localStorage.setItem(key, saveValue.toString());
    }

    static loadLocalStrage(key : string, initialValue : number):number{
        let stringValue :string =  window.localStorage.getItem(key); // string
        if( stringValue == null ){
            stringValue = initialValue.toString();
            window.localStorage.setItem(key, stringValue.toString());
        }
        let value : number = parseInt(stringValue);
        return value;
    }

    static saveStringLocalStrage(key :string, saveValue : string){
        window.localStorage.setItem(key, saveValue);
    }

    static loadStringLocalStrage(key : string):string{
        let stringValue :string =  window.localStorage.getItem(key); // string
        let value : string = stringValue;
        return value;
    }

    static clearLocalStrage(key : string){
        if(key)
        window.localStorage.removeItem(key);
    }

    static saveJSONLocalStrage(key :string, saveObject : any){
        let jObject : string = JSON.stringify(saveObject);
        window.localStorage.setItem(key, jObject);
    }

    static loadJSONLocalStrage(key : string):any{
        let jObject :string =  window.localStorage.getItem(key); // string
        if( jObject == null ){
            SaveData.setObject();
            jObject = JSON.stringify(SaveData.object);
            window.localStorage.setItem(key, jObject);
        }
        let object : any = JSON.parse(jObject);
        return object;
    }

    static setRect(x : number, y : number, width : number, height : number, color:number, round:number, fill:boolean, lineWidth?:number):egret.Shape{

        const shape:egret.Shape = new egret.Shape();
        shape.x = x;
        shape.y = y;
        if(fill){
            shape.graphics.beginFill(color);
            shape.graphics.drawRoundRect(0, 0, width , height, round);
            shape.graphics.endFill();

        }
        else{
            shape.graphics.lineStyle(lineWidth,color);
            shape.graphics.drawRoundRect(0, 0, width , height, round);
        }
        return shape;
    }

    static setCircle(x : number, y : number, radius : number, color:number, fill : boolean, lineWidth?: number):egret.Shape{
        const shape:egret.Shape = new egret.Shape();
        shape.x = x;
        shape.y = y;
        if(fill){
            shape.graphics.beginFill(color);
            shape.graphics.drawCircle(0, 0, radius);
            shape.graphics.endFill();

        }
        else{
            shape.graphics.lineStyle(lineWidth,color);
            shape.graphics.drawCircle(0, 0, radius);
        }
        return shape;
    }
    static setEllipse(x : number, y : number, width : number, height : number, color:number, fill : boolean, lineWidth?: number):egret.Shape{
        const shape:egret.Shape = new egret.Shape();
        shape.x = x;
        shape.y = y;
        if(fill){
            shape.graphics.beginFill(color);
            shape.graphics.drawEllipse(0, 0, width,height);
            shape.graphics.endFill();

        }
        else{
            shape.graphics.lineStyle(lineWidth,color);
            shape.graphics.drawEllipse(0, 0, width,height);
        }
        return shape;
    }

    static setLine(x : number, y : number, length : number, degree : number, lineWidth:number, color:number ):egret.Shape{

        const rad :number = (360 - degree) * Math.PI/180;//Egretの角度は時計回りが正
        const shape:egret.Shape = new egret.Shape();
        shape.x = x;
        shape.y = y;
        shape.graphics.lineStyle(lineWidth, color);
        shape.graphics.moveTo(x, y);
        shape.graphics.lineTo(length*Math.cos(rad), length*Math.sin(rad));
        return shape;
    }


    static remove(display : egret.DisplayObjectContainer, removeObject : egret.DisplayObject){
        
        if(display && removeObject){
            display.removeChild(removeObject);
        }
        removeObject = null;
    }


    //-----------------------------
    //ベクトル系は間違っている可能性あり

    static vector(size : number, degree : number, startPointX?:number, startPointY?:number) : number[]{
        let rad : number = (360 - degree) * Math.PI/180;//Egretの角度は時計回りが正
        let v : number[] = [];

        if(startPointX == undefined && startPointY == undefined){
            v[0] = size * Math.cos(rad);//x
            v[1] = size * Math.sin(rad);//y
        }
        else{
            v[0] = size * Math.cos(rad) - startPointX;//x
            v[1] = size * Math.sin(rad) - startPointY;//y
        }
        v[2] = size;
        return v;
    }

    //外積
    static cross(v1 : number[], v2 : number[]):number{
        let cross : number = v1[0]*v2[1] - v1[1]*v2[0];
        return cross;
    }

    //内積
    static dot(v1 : number[], v2 : number[]):number{
        let dot :number = v1[0] * v2[0] + v1[1]* v2[1];
        return dot;
    }

    static cos(v1 : number[], v2 : number[]):number{
        let v1Size : number = Math.sqrt(v1[0]**2 + v1[1]**2);       
        let v2Size : number = Math.sqrt(v2[0]**2 + v2[1]**2);
        if(v1Size < 0){v1Size *= -1;}
        if(v2Size < 0){v2Size *= -1;}
        let cos :number = Util.dot(v1,v2)/(v1Size*v2Size);
        return cos;
    }

    static sin(v1 : number[], v2 : number[]):number{
        let v1Size : number = Math.sqrt(v1[0]**2 + v1[1]**2);
        let v2Size : number = Math.sqrt(v2[0]**2 + v2[1]**2);
        if(v1Size < 0){v1Size *= -1;}
        if(v2Size < 0){v2Size *= -1;}
        let sin : number = Util.cross(v1,v2)/(v1Size*v2Size);
        return sin;
    }

    static size(v : number[]):number{
        let size :number = Math.sqrt(v[0]**2 + v[1]**2);
        return size;
    }

    
}
