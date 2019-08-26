pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./iterable_mapping.sol";
import "./stringTools.sol";

contract International {
    
    IterableMapping.itmap public assetdata;
    
    struct confirmPurchase {
        string OrderId;    //Confirmpurchase
        //string createAt;    //1566278738 uinx
        IterableMapping.itmap confirmPurchaseData;    //map{"buyer","tdergouzi"}
    }
    uint256 public totalConfirmPurchases;
    
    constructor() public{
        totalConfirmPurchases = 0;
    }
    
    struct shipping {
        string OrderId;    //Transportation
        //string createAt;    //1566278924 uinx
        IterableMapping.itmap shippingData; //
    }
    
    struct label {
        string OrderId;    //Marking
        //string createAt;    //1566278924 uinx
        IterableMapping.itmap labelData; 
    }
    
    struct store {
        string OrderId; //Into
        //string createAt;
        IterableMapping.itmap storeData;
    }
    
    
    mapping(uint256 => confirmPurchase)  tokenIdtoconfirmPurchase;
    
    function insertconfirmPurchase(uint256 _num,string memory OrderId,string[] memory keys, string[] memory values) public returns(bool){
        confirmPurchase storage newConfirmPurchase = tokenIdtoconfirmPurchase[_num];
        newConfirmPurchase.OrderId = OrderId;
        for (uint i = 0; i < keys.length; i++) {
            IterableMapping.insert(newConfirmPurchase.confirmPurchaseData,keys[i], values[i]);
        }
        totalConfirmPurchases++;
        return true;
    }
    
    function queryconfirmPurchase(uint256 _num, string memory OrderId,string memory key, string[] memory values) public returns(string memory){
         for (uint i=0; i<totalConfirmPurchases;i++){
             if (StringTools.compareStrings(tokenIdtoconfirmPurchase[i].OrderId, OrderId)){
                string memory KVS = keyValues(tokenIdtoconfirmPurchase[i].confirmPurchaseData);         
                //string memory values = values(tokenIdtoconfirmPurchase[i].confirmPurchaseData);
                //string memory results = StringTools._strConcat(keys,values);
                return KVS;
             }
         }
         //return tokenIdtoconfirmPurchase[_num].confirmPurchaseData.data[key].value;
    }
    
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
                values = StringTools._strConcat(values,values);
            }
        }
        //return values;
        return results = StringTools._strConcat(keys,values);
        //return results;
    }
    
}
    
