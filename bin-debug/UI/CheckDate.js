var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CheckDate = (function () {
    function CheckDate() {
    }
    CheckDate.init = function () {
        CheckDate.getDate();
        //CheckDate.save();
    };
    CheckDate.getDate = function () {
        //登録日の取得
        (function getRegistrationDate() {
            var registrationDate = window.localStorage.getItem("registrationDate"); // string
            if (registrationDate == null || registrationDate == undefined) {
                registrationDate = (new Date().getTime()).toString(); //ms
                window.localStorage.setItem("registrationDate", registrationDate);
            }
            CheckDate.registrationDate = parseInt(registrationDate);
        })();
        (function getLastDate() {
            var now = new Date();
            CheckDate.lastDate = now.getTime(); //ms
            CheckDate.lastDate = parseInt(CheckDate.lastDate.toString());
        })();
    };
    CheckDate.save = function () {
        SaveData.object.registrationDate = CheckDate.registrationDate;
        SaveData.object.lastDate = CheckDate.lastDate;
        SaveData.save();
    };
    CheckDate.deleteDate = function () {
        CheckDate.registrationDate = null;
        CheckDate.lastDate = null;
        Util.clearLocalStrage("registrationDate");
    };
    CheckDate.I = null;
    CheckDate.registrationDate = null; //ms
    CheckDate.lastDate = null; //ms
    return CheckDate;
}());
__reflect(CheckDate.prototype, "CheckDate");
//# sourceMappingURL=CheckDate.js.map