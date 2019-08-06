pragma solidity ^0.4.6;

contract CustomerCrud {

  struct CustomerStruct {
    bytes32 customerEmail;
    uint customerAge;
    uint index;
    //可以增加其他客户信息
  }
  
  mapping(address => CustomerStruct) private customerStructs;
  address[] private customerIndex;

  event LogNewCustomer   (address indexed customerAddress, uint index, bytes32 customerEmail, uint customerAge);
  event LogUpdateCustomer(address indexed customerAddress, uint index, bytes32 customerEmail, uint customerAge);
  event LogDeleteCustomer(address indexed customerAddress, uint index);
  
  function isCustomer(address customerAddress)
    public 
    constant
    returns(bool isIndeed) 
  {
    if(customerIndex.length == 0) return false;
    return (customerIndex[customerStructs[customerAddress].index] == customerAddress);
  }

  function insertCustomer(
    address customerAddress, 
    bytes32 customerEmail, 
    uint    customerAge) 
    public
    returns(uint index)
  {
    //如果没找到这个地址 抛出错误
    if(isCustomer(customerAddress)) throw; 
    customerStructs[customerAddress].customerEmail = customerEmail;
    customerStructs[customerAddress].customerAge   = customerAge;
    customerStructs[customerAddress].index     = customerIndex.push(customerAddress)-1;
    LogNewCustomer(
        customerAddress, 
        customerStructs[customerAddress].index, 
        customerEmail, 
        customerAge);
    return customerIndex.length-1;
  }

  function deleteCustomer(address customerAddress) 
    public
    returns(uint index)
  {
    if(!isCustomer(customerAddress)) throw; 
    uint rowToDelete = customerStructs[customerAddress].index;
    address keyToMove = customerIndex[customerIndex.length-1];
    customerIndex[rowToDelete] = keyToMove;
    customerStructs[keyToMove].index = rowToDelete; 
    //总数减1
    customerIndex.length--;
    LogDeleteCustomer(
        customerAddress, 
        rowToDelete);
    LogUpdateCustomer(
        keyToMove, 
        rowToDelete, 
        customerStructs[keyToMove].customerEmail, 
        customerStructs[keyToMove].customerAge);
    return rowToDelete;
  }
  
  function getCustomer(address customerAddress)
    public 
    constant
    returns(bytes32 customerEmail, uint customerAge, uint index)
  {
    if(!isCustomer(customerAddress)) throw; 
    return(
      customerStructs[customerAddress].customerEmail, 
      customerStructs[customerAddress].customerAge, 
      customerStructs[customerAddress].index);
  } 
  
  function updateCustomerEmail(address customerAddress, bytes32 customerEmail) 
    public
    returns(bool success) 
  {
    if(!isCustomer(customerAddress)) throw; 
    customerStructs[customerAddress].customerEmail = customerEmail;
    LogUpdateCustomer(
      customerAddress, 
      customerStructs[customerAddress].index,
      customerEmail, 
      customerStructs[customerAddress].customerAge);
    return true;
  }
  
  function updateCustomerAge(address customerAddress, uint customerAge) 
    public
    returns(bool success) 
  {
    if(!isCustomer(customerAddress)) throw; 
    customerStructs[customerAddress].customerAge = customerAge;
    LogUpdateCustomer(
      customerAddress, 
      customerStructs[customerAddress].index,
      customerStructs[customerAddress].customerEmail, 
      customerAge);
    return true;
  }

  //以下可以根据customer的属性自己增加函数

  function getCustomerCount() 
    public
    constant
    returns(uint count)
  {
    return customerIndex.length;
  }

  function getCustomerAtIndex(uint index)
    public
    constant
    returns(address customerAddress)
  {
    return customerIndex[index];
  }

}

