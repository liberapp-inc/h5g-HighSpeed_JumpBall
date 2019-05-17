//衝突判定用の列挙
enum GraphicShape{
    NONE = Math.pow(2,0),
    CIECLE = Math.pow(2,1),
    BLOCK = Math.pow(2,2)
}
//連続実行したいメソッドはfixedUpdateへ記入
//destroy時に実行したいメソッドはaddDestroyPhysicsMethodへ記入
//maxSubStepはGameクラスで初期化している
abstract class PhysicsObject extends GameCompornent {

    public body : p2.Body = null;
    public bodyShape : p2.Circle | p2.Box | p2.Line | p2.Plane = null;
    static world : p2.World = null;

    private static lastTime: number;
    public  static deltaScale: number = 1;

    private static pixelPerMeter: number;
    private static meterPerPixel: number;
    public  static width: number;    
    public  static height: number;

    public  static maxSubStep : number = 35;

    constructor(x : number, y : number, width : number, height : number) {
        super(x,y,width,height);
        this.setCompornent(x,y,width,height);

    }

    static prepare( pixelPerMeter:number ){
        PhysicsObject.pixelPerMeter = pixelPerMeter;
        PhysicsObject.meterPerPixel = 1 / pixelPerMeter;
        PhysicsObject.width  = PhysicsObject.pixelToMeter(Util.width);
        PhysicsObject.height = PhysicsObject.pixelToMeter(Util.height);

        PhysicsObject.world = new p2.World();
        PhysicsObject.world.gravity = [0, 9.8];

        
        
    }


    //オーバーライド禁止
    updateContent(){
        if( this.compornent ) {
            if(this.compornent.y > Util.height){
                this.destroy();
                return;
            }

        }
        this.fixedUpdate();
    };

    abstract fixedUpdate() : void;
   
    updateDrowShape(){
        this.compornent.x = this.body.position[0];
        this.compornent.y = this.body.position[1];
    }

    addDestroyMethod(){
        if(this.body){
            PhysicsObject.world.removeBody(this.body);
            this.body = null;
        }
        this.addDestroyPhysicsMethod();
    }

    addDestroyPhysicsMethod(){}


    static step(dt : number) : boolean{
        if(GameOver.gameOverFlag){return true;}
        PhysicsObject.world.step(1/60, dt/1000, PhysicsObject.maxSubStep);
        return false;
    }

    static pixelToMeter(pixel: number)  : number { return pixel * PhysicsObject.meterPerPixel; }
    static meterToPixel(meter: number)  : number { return meter * PhysicsObject.pixelPerMeter; }
    
    m2p(meter: number) : number { return PhysicsObject.meterToPixel(meter); }
    p2m(pixel: number) : number { return PhysicsObject.pixelToMeter(pixel); }

    get px():number { return PhysicsObject.meterToPixel( this.mx ); }
    get py():number { return PhysicsObject.meterToPixel( this.my ); }
    get mx():number { return this.body.position[0]; }
    get my():number { return this.body.position[1]; }
    
    set px( px:number ){ this.mx = PhysicsObject.pixelToMeter(px); }
    set py( py:number ){ this.my = PhysicsObject.pixelToMeter(py); }
    set mx( mx:number ){ this.body.position[0] = mx; }
    set my( my:number ){ this.body.position[1] = my; }


}

