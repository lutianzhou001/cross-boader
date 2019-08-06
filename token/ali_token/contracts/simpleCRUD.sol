pragma solidity ^0.4.6;

contract simpleList {
    
    struct RecordStruct {
        address RecordAddress;
        uint RecordData;
        //定义对象record，需要什么字段可以在这里添加
    }
    
    RecordStruct[] public RecordStructs;
    
    function newRecord(address RecordAddress, uint RecordData) public returns(uint rowNumber) {
        RecordStruct memory newRecord;
        newRecord.RecordAddress = RecordAddress;
        newRecord.RecordData    = RecordData;
        return RecordStructs.push(newRecord)-1;
    }
    //获取记录数量
    function getRecordCount() public constant returns(uint RecordCount) {
        return RecordStructs.length;
    }
}


contract mappingWithStruct {
    
    struct RecordStruct {
        uint RecordData;
        bool isRecord;
    }
    
    mapping (uint => RecordStruct) public RecordStructs;
    
    function isRecord(address RecordAddress) public constant returns(bool isIndeed) {
        return RecordStructs[RecordAddress].isRecord;
    }
    
    //新增record的kv键值对（无序）
    function newRecord(address RecordAddress, uint RecordData) public returns(bool success) {
        if(isRecord(RecordAddress)) throw; 
        RecordStructs[RecordAddress].RecordData = RecordData;
        RecordStructs[RecordAddress].isRecord = true;
        return true;
    }
    
    //删除record
    function deleteRecord(address RecordAddress) public returns(bool success) {
        if(!isRecord(RecordAddress)) throw;
        RecordStructs[RecordAddress].isRecord = false;
        return true;
    }
    
    //更新record
    function updateRecord(address RecordAddress, uint RecordData) public returns(bool success) {
        //如找不到该地址，抛出错误
        if(!isRecord(RecordAddress)) throw;
        RecordStructs[RecordAddress].RecordData = RecordData;
        return true;
    }
}

contract arrayWithUniqueIds {
    
    struct RecordStruct {
        address RecordAddress;
        uint RecordData;
    }
    
    RecordStruct[] public RecordStructs;
    mapping(address => bool) knownRecord;
    
    function isRecord(address RecordAddress) public constant returns(bool isIndeed) {
        return knownRecord[RecordAddress];
    }
    
    function getRecordCount() public constant returns(uint RecordCount) {
        return RecordStructs.length;
    }
    
    function newRecord(address RecordAddress, uint RecordData) public returns(uint rowNumber) {
        //如果找不到这个地址 则抛出错误
        if(isRecord(RecordAddress)) throw;      
        RecordStruct newRecord;
        newRecord.RecordAddress = RecordAddress;
        newRecord.RecordData = RecordData;
        knownRecord[RecordAddress] = true;
        return RecordStructs.push(newRecord) - 1;
        //按序插入（队列）
    }
    
    function updateRecord(uint rowNumber, address RecordAddress, uint RecordData) public returns(bool success) {
        if(!isRecord(RecordAddress)) throw;
        if(RecordStructs[rowNumber].RecordAddress != RecordAddress) throw;
        RecordStructs[rowNumber].RecordData    = RecordData;
        return true;
    }
}

contract mappedStructWithUnorderedIndexAndDelete {
    
    struct RecordStruct {
        uint RecordData;
        //列表指针
        uint listPointer;
    }
    
    mapping(address => RecordStruct) public RecordStructs;
    address[] public RecordList;
    
    function isRecord(address RecordAddress) public constant returns(bool isIndeed) {
        if(RecordList.length == 0) return false;
        return (RecordList[RecordStructs[RecordAddress].listPointer] == RecordAddress);
    }
    
    function getRecordCount() public constant returns(uint RecordCount) {
        return RecordList.length;
    }
    
    function newRecord(address RecordAddress, uint RecordData) public returns(bool success) {
        if(isRecord(RecordAddress)) throw;
        RecordStructs[RecordAddress].RecordData = RecordData;
        RecordStructs[RecordAddress].listPointer = RecordList.push(RecordAddress) - 1;
        return true;
    }
    
    function updateRecord(address RecordAddress, uint RecordData) public returns(bool success) {
        if(!isRecord(RecordAddress)) throw;
        RecordStructs[RecordAddress].RecordData = RecordData;
        return true;
    }
    
    function deleteRecord(address RecordAddress) public returns(bool success) {
        if(!isRecord(RecordAddress)) throw;
        uint rowToDelete = RecordStructs[RecordAddress].listPointer;
        address keyToMove   = RecordList[RecordList.length-1];
        RecordList[rowToDelete] = keyToMove;
        RecordStructs[keyToMove].listPointer = rowToDelete;
        RecordList.length--;
        return true;
    }
    
}



