/**
 * Created by xionghuan on 8/9/17.
 */


function getIdentityId(){
    var coefficientArray = [ "7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];// 加权因子
    var lastNumberArray = [ "1","0","X","9","8","7","6","5","4","3","2"];// 校验码
    var address = "420101"; // 住址
    var birthday = "19810101"; // 生日
    var s = Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString() + Math.floor(Math.random()*10).toString();
    var array = (address + birthday + s).split("");
    var total = 0;
    for(i in array){
        total = total + parseInt(array[i])*parseInt(coefficientArray[i]);
    }
    var lastNumber = lastNumberArray[parseInt(total%11)];
    var id_no_String = address + birthday + s + lastNumber;
    console.log(">>> IdNo: "+ id_no_String);
    return id_no_String
}
 exports.getIdentityId=getIdentityId;

//--------------------------------------------
var banks={
   // "工商银行":"622202"
    "中国农业银行":"622848"
 //   "中国银行":"621661"

}

function getBankCard(){

    var keys = [];
    for(key in banks){
        keys.push(key)
    }

    var len =Object.keys(banks).length;
    var i = Math.floor(Math.random() * len);
    var _key = keys[i];
    var _value = banks[_key];
    var prefix = _value;
    for (var j = 0; j < 13; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    var card = prefix;
    console.log(">>> bankName: "+_key+" card: "+card);
    return {
        "bankName" : _key,
        "cardId" : card,
    }
}

exports.getBankCard =getBankCard;
//---------------------------------------------------------------

function getMobilePhone() {
    var prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}
exports.getMobilePhone =getMobilePhone;

//---------------------------------------------------------------

function getAcctName(){
    var firstName = "测";
    var lastName = "试"
    // lastName = lastName+ Math.floor(Math.random()*100);
    return {
        "firstName" : firstName,
        "lastName" : lastName
    };
}
exports.getAcctName =getAcctName;


