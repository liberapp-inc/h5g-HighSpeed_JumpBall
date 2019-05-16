class MyTween {

    static cameraScroll(display : egret.DisplayObjectContainer, toPos : number){

        egret.Tween.get(display) 
            .to({y:toPos }, 500, egret.Ease.quadIn)
            .call(()=> {
                Camera2D.y = toPos;
                egret.Tween.removeTweens(display);

            });
    }

}