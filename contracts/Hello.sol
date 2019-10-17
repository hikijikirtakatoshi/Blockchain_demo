pragma solidity ^0.5.0;

contract Hello {
    string message;
    
    constructor() public {
        message = "Hello";
    }
    
    function getMessage() public view returns(string memory) {
        return message;
    }
    
    function changeMessage(string memory _message) public {
        message = _message;
    }
}


