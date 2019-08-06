pragma solidity ^0.4.0;
contract HelloWorld {
string message;
function HelloWorld(string _message) public {
     message = _message;   
}

function echo() public constant returns(string){
    return message;
}

}



