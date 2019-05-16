class CheckDate {

    static I : CheckDate = null;
    static registrationDate : number = null;//ms
    static lastDate :number = null;//ms

    static init(){
        CheckDate.getDate();
        //CheckDate.save();

    }

    static getDate(){

        //登録日の取得
        (function getRegistrationDate(){
            let registrationDate : string = window.localStorage.getItem("registrationDate"); // string
            if(registrationDate == null || registrationDate == undefined){
                registrationDate = (new Date().getTime()).toString();//ms
                window.localStorage.setItem("registrationDate", registrationDate);
            }
            CheckDate.registrationDate = parseInt(registrationDate);

        })();

        (function getLastDate(){
            let now = new Date();
            CheckDate.lastDate = now.getTime();//ms
            CheckDate.lastDate = parseInt(CheckDate.lastDate.toString());
        })();
        
    }

    static save(){
        SaveData.object.registrationDate = CheckDate.registrationDate;
        SaveData.object.lastDate = CheckDate.lastDate;
        SaveData.save();
    }

    static deleteDate(){
        CheckDate.registrationDate = null;
        CheckDate.lastDate = null;
        Util.clearLocalStrage("registrationDate");
    }

}