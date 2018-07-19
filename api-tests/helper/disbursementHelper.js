/**
 * Created by xionghuan on 8/15/17.
 */



function fillBaseInfo(payload, idNo, cardId, firstName, lastName){
    payload.beneficiary.additionalInfo.personalIdNumber = idNo;
    payload.beneficiary.bankDetails.accountNumber = cardId;
    payload.beneficiary.bankDetails.accountName = lastName+firstName;
    payload.beneficiary.additionalInfo.personalFirstNameInChinese =firstName;
    payload.beneficiary.additionalInfo.personalLastNameInChinese =lastName;
    return payload;
}

exports.fillBaseInfo =fillBaseInfo;