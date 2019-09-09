pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./iterable_mapping.sol";
import "./stringTools.sol";

contract International {
    
    IterableMapping.itmap public assetdata;
    
    struct confirmPurchase {
        string orderId;    //Confirmpurchase
        string contract_name;
        //string createAt;    //1566278738 uinx
        IterableMapping.itmap confirmPurchaseData;    //map{"buyer","tdergouzi"}
    }
    uint256 public totalConfirmPurchases;
    
    constructor() public{
        totalConfirmPurchases = 0;
    }
    
    mapping(uint256 => confirmPurchase)  tokenIdtoconfirmPurchase;
    
    function insertconfirmPurchase(uint256 _num,string memory orderId,string memory contract_name,string[] memory keys, string[] memory values) public returns(bool){
        confirmPurchase storage newConfirmPurchase = tokenIdtoconfirmPurchase[_num];
        newConfirmPurchase.orderId = orderId;
        newConfirmPurchase.contract_name = contract_name;
        for (uint i = 0; i < keys.length; i++) {
            IterableMapping.insert(newConfirmPurchase.confirmPurchaseData,keys[i], values[i]);
        }
        totalConfirmPurchases++;
        return true;
    }
    
    function queryconfirmPurchase(uint256 total, uint256 _num, string memory orderId, string memory contract_name, string memory key, string[] memory values) public returns(string memory){
        string memory results;
        for (uint i=1; i< total ; i++){
             //searching contract_name,ignore which orderId is 
             if (  (StringTools.compareStrings2(orderId, "NA"))    &&   (!(StringTools.compareStrings2(contract_name, "NA"))) ){
               if (StringTools.compareStrings(tokenIdtoconfirmPurchase[i].contract_name, contract_name)){
                string memory KVS = keyValues(tokenIdtoconfirmPurchase[i].confirmPurchaseData);
                results = StringTools._strConcat(results,KVS);
             }
           }
              //searching orderId, ignore which contract_name is 
              if (  (StringTools.compareStrings2(contract_name, "NA"))    &&   (!(StringTools.compareStrings2(orderId, "NA"))) ){
                if (StringTools.compareStrings(tokenIdtoconfirmPurchase[i].orderId, orderId)){
                string memory KVS = keyValues(tokenIdtoconfirmPurchase[i].confirmPurchaseData);
                results = StringTools._strConcat(results,KVS);
             }
           }
               //searching both orderId and contract_name
              if (  (!(StringTools.compareStrings2(contract_name, "NA")))    &&   (!(StringTools.compareStrings2(orderId, "NA"))) ){
                if (   (StringTools.compareStrings(tokenIdtoconfirmPurchase[i].orderId, orderId))   &&     (StringTools.compareStrings(tokenIdtoconfirmPurchase[i].contract_name, contract_name)) ){
                string memory KVS = keyValues(tokenIdtoconfirmPurchase[i].confirmPurchaseData);
                results = StringTools._strConcat(results,KVS);
             }
           }
        }
        return results;
    }
    
    //function querybyContractname(...){

    
    function queryTotalPurchase() public returns(uint256){
        return totalConfirmPurchases;
    }
    
    function keyValues(IterableMapping.itmap storage im) internal returns (string memory) {
        string memory keys;
        string memory values;
        string memory results;
        for (uint i = IterableMapping.iterate_start(im); IterableMapping.iterate_valid(im, i); i = IterableMapping.iterate_next(im, i)) {
            string memory key;
            string memory value;
            (key,value) = IterableMapping.iterate_get(im, i);
            if (i == 0) {
                keys = key;
                values = value;
            }else {
                keys = StringTools._strConcat(keys,key);
                values = StringTools._strConcat(values,value);
            }
        }
        return results = StringTools._strConcat(keys,values);
        
    }
}
    
