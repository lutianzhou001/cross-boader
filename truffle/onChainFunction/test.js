const web3 = require("web3")
const web3eth = require('web3-eth')
console.log(web3)
console.log(web3eth)
var source = "" + 
    "contract test {\n" +
    "   function multiply(uint a) returns(uint d) {\n" +
    "       return a * 7;\n" +
    "   }\n" +
    "}\n";
var compiled = web3eth.compile.solidity(source);
console.log(compiled); 
