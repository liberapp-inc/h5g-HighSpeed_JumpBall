//GameNameを変更すると、ゲームごとにアカウント作成。
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SaveData = (function () {
    function SaveData() {
    }
    SaveData.setObject = function () {
        SaveData.object = {
            "gameName": SaveData.gameName,
            "playerID": SaveData.playerID,
            "gameID": SaveData.gameID,
            "registrationDate": CheckDate.registrationDate,
            "lastDate": CheckDate.lastDate,
            "bestScore": Score.bestScore
        };
    };
    SaveData.save = function () {
        SaveData.object.gameName = SaveData.gameName;
        SaveData.object.playerID = SaveData.playerID;
        SaveData.object.gameID = SaveData.gameID;
        SaveData.object.registrationDate = CheckDate.registrationDate;
        SaveData.object.lastDate = CheckDate.lastDate;
        SaveData.object.bestScore = Score.bestScore;
        Util.saveJSONLocalStrage(SaveData.gameID, SaveData.object);
        SaveData.test();
    };
    SaveData.load = function () {
        SaveData.object = Util.loadJSONLocalStrage(SaveData.gameID);
        SaveData.test();
    };
    SaveData.deleteData = function () {
        console.log("データを消去します");
        SaveData.object = null;
        CheckDate.registrationDate = null;
        Util.clearLocalStrage(SaveData.gameID);
    };
    //テストコード
    SaveData.testUser = function () {
        SaveData.deletePlayerID();
        SaveData.deleteGameID();
        SaveData.deleteData();
        SaveData.getPlayerID();
        SaveData.getGameID();
        SaveData.load();
        SaveData.save();
    };
    SaveData.init = function () {
        SaveData.getPlayerID();
        SaveData.getGameID();
        SaveData.load();
    };
    SaveData.getPlayerID = function () {
        SaveData.playerID = Util.loadStringLocalStrage("playerID");
        if (SaveData.playerID == null) {
            console.log("playerIDがありません");
            SaveData.setPlayerID();
        }
    };
    SaveData.setPlayerID = function () {
        console.log("playerIDを新規作成");
        CheckDate.deleteDate();
        CheckDate.getDate();
        SaveData.playerID = CheckDate.registrationDate.toString();
        Util.saveStringLocalStrage("playerID", SaveData.playerID);
        console.log("playerIDを作成しました");
    };
    SaveData.deletePlayerID = function () {
        console.log("playerIDを削除します");
        Util.clearLocalStrage("playerID");
    };
    SaveData.getGameID = function () {
        SaveData.gameID = SaveData.gameName + SaveData.playerID.toString(); //Util.loadStringLocalStrage(SaveData.objectKey);
    };
    SaveData.setGameID = function () {
        console.log("gameIDを作成します");
        SaveData.gameID = SaveData.gameName + SaveData.playerID.toString();
    };
    SaveData.deleteGameID = function () {
        console.log("gameIDを消去します");
        SaveData.gameID = null;
        Util.clearLocalStrage(SaveData.gameID);
    };
    SaveData.test = function () {
        console.log(SaveData.object);
    };
    SaveData.object = null;
    SaveData.gameName = "High_Speed_Jump_Ball";
    SaveData.playerID = null;
    SaveData.gameID = null;
    return SaveData;
}());
__reflect(SaveData.prototype, "SaveData");
//# sourceMappingURL=SaveData.js.map