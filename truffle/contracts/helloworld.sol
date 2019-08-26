pragma solidity ^0.5.0;
contract hello {
    string greeting;
    
    function sayhello(string memory _greeting) public {
        greeting = _greeting;
        
    }

    function say() public returns (string memory) {
        return greeting;
    }
}
