//GameNameを変更すると、ゲームごとにアカウント作成。

class SaveData{

    static object : any = null;
    static gameName : string = "High_Speed_Jump_Ball";
    static playerID: string = null;
    static gameID: string = null;

    static setObject(){
        SaveData.object = {
            "gameName"              : SaveData.gameName,
            "playerID"               : SaveData.playerID,
            "gameID"               : SaveData.gameID,
            "registrationDate"      : CheckDate.registrationDate, 
            "lastDate"              : CheckDate.lastDate, 
            "bestScore"             : Score.bestScore
        };

    }
    static save(){
        SaveData.object.gameName = SaveData.gameName;
        SaveData.object.playerID = SaveData.playerID;
        SaveData.object.gameID = SaveData.gameID;
        SaveData.object.registrationDate = CheckDate.registrationDate;
        SaveData.object.lastDate = CheckDate.lastDate;
        SaveData.object.bestScore = Score.bestScore;
        Util.saveJSONLocalStrage(SaveData.gameID, SaveData.object);
        SaveData.test();
    }

    static load(){
        
        SaveData.object = Util.loadJSONLocalStrage(SaveData.gameID);
        SaveData.test();
    }

    static deleteData(){
        console.log("データを消去します");
        SaveData.object = null;
        CheckDate.registrationDate = null;
        Util.clearLocalStrage(SaveData.gameID);
    }
    
    //テストコード
    static testUser(){
        SaveData.deletePlayerID();
        SaveData.deleteGameID();
        SaveData.deleteData();
        SaveData.getPlayerID();
        SaveData.getGameID();
        SaveData.load();
        SaveData.save();
    }

    static init(){
        SaveData.getPlayerID();
        SaveData.getGameID();
        SaveData.load();
    }


    static getPlayerID(){
        SaveData.playerID = Util.loadStringLocalStrage("playerID");
        if(SaveData.playerID == null){
            console.log("playerIDがありません");
            SaveData.setPlayerID();
        }
    }

    static setPlayerID(){
        console.log("playerIDを新規作成");
        CheckDate.deleteDate();
        CheckDate.getDate();
        SaveData.playerID = CheckDate.registrationDate.toString();
        Util.saveStringLocalStrage("playerID", SaveData.playerID);
        console.log("playerIDを作成しました");

    }

    static deletePlayerID(){
        console.log("playerIDを削除します");
        Util.clearLocalStrage("playerID");
    }


    static getGameID() {
        SaveData.gameID = SaveData.gameName + SaveData.playerID.toString();//Util.loadStringLocalStrage(SaveData.objectKey);
    }

    static setGameID(){
        console.log("gameIDを作成します");
        SaveData.gameID = SaveData.gameName + SaveData.playerID.toString();
    }

    static deleteGameID(){
        console.log("gameIDを消去します");
        SaveData.gameID = null;
        Util.clearLocalStrage(SaveData.gameID);

    }


    static test(){
        console.log(SaveData.object);
        
    }
}