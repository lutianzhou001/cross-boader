// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package CRUD

import (
	"math/big"
	"strings"

	"github.com/astra-x/go-ethereum/accounts/abi"
	"github.com/astra-x/go-ethereum/accounts/abi/bind"
	"github.com/astra-x/go-ethereum/common"
	"github.com/astra-x/go-ethereum/core/types"
)

// CRUDABI is the input ABI used to generate the binding from.
const CRUDABI = "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"countries\",\"outputs\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"leader\",\"type\":\"string\"},{\"name\":\"population\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalCountries\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"countryName\",\"type\":\"string\"},{\"name\":\"newLeader\",\"type\":\"string\"}],\"name\":\"updateLeader\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"countryName\",\"type\":\"string\"}],\"name\":\"getCountry\",\"outputs\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"leader\",\"type\":\"string\"},{\"name\":\"population\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getTotalCountries\",\"outputs\":[{\"name\":\"length\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"countryName\",\"type\":\"string\"},{\"name\":\"leader\",\"type\":\"string\"},{\"name\":\"population\",\"type\":\"uint256\"}],\"name\":\"insert\",\"outputs\":[{\"name\":\"totalCountries\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"countryName\",\"type\":\"string\"}],\"name\":\"deleteCountry\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"countryName\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"leader\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"population\",\"type\":\"uint256\"}],\"name\":\"CountryEvent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"countryName\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"leader\",\"type\":\"string\"}],\"name\":\"LeaderUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"countryName\",\"type\":\"string\"}],\"name\":\"CountryDelete\",\"type\":\"event\"}]"

// CRUDBin is the compiled bytecode used for deploying new contracts.
const CRUDBin = `608060405234801561001057600080fd5b506000600181905550611424806100286000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806308e9daa51461008857806362738129146101a157806381ba02be146101cc578063848924cb14610293578063acf75458146103e8578063c1356d2614610413578063cae65058146104e0575b600080fd5b34801561009457600080fd5b506100b360048036038101908080359060200190929190505050610561565b604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b838110156100fd5780820151818401526020810190506100e2565b50505050905090810190601f16801561012a5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b83811015610163578082015181840152602081019050610148565b50505050905090810190601f1680156101905780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3480156101ad57600080fd5b506101b66106ca565b6040518082815260200191505060405180910390f35b3480156101d857600080fd5b50610279600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506106d0565b604051808215151515815260200191505060405180910390f35b34801561029f57600080fd5b506102fa600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610909565b604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b83811015610344578082015181840152602081019050610329565b50505050905090810190601f1680156103715780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b838110156103aa57808201518184015260208101905061038f565b50505050905090810190601f1680156103d75780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b3480156103f457600080fd5b506103fd610c0c565b6040518082815260200191505060405180910390f35b34801561041f57600080fd5b506104ca600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929080359060200190929190505050610c18565b6040518082815260200191505060405180910390f35b3480156104ec57600080fd5b50610547600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610dd9565b604051808215151515815260200191505060405180910390f35b60008181548110151561057057fe5b9060005260206000209060030201600091509050806000018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561061c5780601f106105f15761010080835404028352916020019161061c565b820191906000526020600020905b8154815290600101906020018083116105ff57829003601f168201915b505050505090806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106ba5780601f1061068f576101008083540402835291602001916106ba565b820191906000526020600020905b81548152906001019060200180831161069d57829003601f168201915b5050505050908060020154905083565b60015481565b600080600090505b6001548110156108fd576107a46000828154811015156106f457fe5b90600052602060002090600302016000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107995780601f1061076e57610100808354040283529160200191610799565b820191906000526020600020905b81548152906001019060200180831161077c57829003601f168201915b505050505085611090565b156108f057826000828154811015156107b957fe5b906000526020600020906003020160010190805190602001906107dd929190611169565b507fdcbffcd2bd990a26d28efebebb6f9a7a35f2abf2f0e25720c56a457fce2211588484604051808060200180602001838103835285818151815260200191508051906020019080838360005b8381101561084557808201518184015260208101905061082a565b50505050905090810190601f1680156108725780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b838110156108ab578082015181840152602081019050610890565b50505050905090810190601f1680156108d85780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a160019150610902565b80806001019150506106d8565b600091505b5092915050565b606080600080600090505b600154811015610b96576109e060008281548110151561093057fe5b90600052602060002090600302016000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109d55780601f106109aa576101008083540402835291602001916109d5565b820191906000526020600020905b8154815290600101906020018083116109b857829003601f168201915b505050505086611090565b15610b89576000818154811015156109f457fe5b9060005260206000209060030201600001600082815481101515610a1457fe5b9060005260206000209060030201600101600083815481101515610a3457fe5b906000526020600020906003020160020154828054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610adb5780601f10610ab057610100808354040283529160200191610adb565b820191906000526020600020905b815481529060010190602001808311610abe57829003601f168201915b50505050509250818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b775780601f10610b4c57610100808354040283529160200191610b77565b820191906000526020600020905b815481529060010190602001808311610b5a57829003601f168201915b50505050509150935093509350610c04565b8080600101915050610914565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f636f756e747279206e6f7420666f756e6400000000000000000000000000000081525060200191505060405180910390fd5b509193909250565b60008080549050905090565b6000610c226111e9565b606060405190810160405280868152602001858152602001848152509050600081908060018154018082558091505090600182039060005260206000209060030201600090919290919091506000820151816000019080519060200190610c8a92919061120b565b506020820151816001019080519060200190610ca792919061120b565b506040820151816002015550505081806001019250507f0468dc69df7bee8f1d38fbb57d4c42ac20476b6d66c4477d41c677b7e2d63893858585604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b83811015610d2b578082015181840152602081019050610d10565b50505050905090810190601f168015610d585780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b83811015610d91578082015181840152602081019050610d76565b50505050905090810190601f168015610dbe5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390a1819150509392505050565b6000806000600154111515610ded57600080fd5b600090505b60015481101561108557610ebe600082815481101515610e0e57fe5b90600052602060002090600302016000018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610eb35780601f10610e8857610100808354040283529160200191610eb3565b820191906000526020600020905b815481529060010190602001808311610e9657829003601f168201915b505050505084611090565b156110785760006001805403815481101515610ed657fe5b9060005260206000209060030201600082815481101515610ef357fe5b906000526020600020906003020160008201816000019080546001816001161561010002031660029004610f2892919061128b565b5060018201816001019080546001816001161561010002031660029004610f5092919061128b565b506002820154816002015590505060006001805403815481101515610f7157fe5b906000526020600020906003020160008082016000610f909190611312565b600182016000610fa09190611312565b60028201600090555050600160008154809291906001900391905055506000805480919060019003610fd2919061135a565b507f1aae94a171c3e578099f7103bbb8a169533e0d22f84eb9807747a1c5bebbbc41836040518080602001828103825283818151815260200191508051906020019080838360005b8381101561103557808201518184015260208101905061101a565b50505050905090810190601f1680156110625780820380516001836020036101000a031916815260200191505b509250505060405180910390a16001915061108a565b8080600101915050610df2565b600091505b50919050565b6000816040518082805190602001908083835b6020831015156110c857805182526020820191506020810190506020830392506110a3565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916836040518082805190602001908083835b60208310151561112f578051825260208201915060208101905060208303925061110a565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191614905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106111aa57805160ff19168380011785556111d8565b828001600101855582156111d8579182015b828111156111d75782518255916020019190600101906111bc565b5b5090506111e5919061138c565b5090565b6060604051908101604052806060815260200160608152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061124c57805160ff191683800117855561127a565b8280016001018555821561127a579182015b8281111561127957825182559160200191906001019061125e565b5b509050611287919061138c565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112c45780548555611301565b8280016001018555821561130157600052602060002091601f016020900482015b828111156113005782548255916001019190600101906112e5565b5b50905061130e919061138c565b5090565b50805460018160011615610100020316600290046000825580601f106113385750611357565b601f016020900490600052602060002090810190611356919061138c565b5b50565b8154818355818111156113875760030281600302836000526020600020918201910161138691906113b1565b5b505050565b6113ae91905b808211156113aa576000816000905550600101611392565b5090565b90565b6113f591905b808211156113f157600080820160006113d09190611312565b6001820160006113e09190611312565b6002820160009055506003016113b7565b5090565b905600a165627a7a72305820736d17a8ac06a398561b0dbecc08aae8c23868d7557cd52de0f9aecd994400320029`

// DeployCRUD deploys a new Ethereum contract, binding an instance of CRUD to it.
func DeployCRUD(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *CRUD, error) {
	parsed, err := abi.JSON(strings.NewReader(CRUDABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(CRUDBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &CRUD{CRUDCaller: CRUDCaller{contract: contract}, CRUDTransactor: CRUDTransactor{contract: contract}}, nil
}

// CRUD is an auto generated Go binding around an Ethereum contract.
type CRUD struct {
	CRUDCaller     // Read-only binding to the contract
	CRUDTransactor // Write-only binding to the contract
}

// CRUDCaller is an auto generated read-only Go binding around an Ethereum contract.
type CRUDCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CRUDTransactor is an auto generated write-only Go binding around an Ethereum contract.
type CRUDTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// CRUDSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type CRUDSession struct {
	Contract     *CRUD             // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CRUDCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type CRUDCallerSession struct {
	Contract *CRUDCaller   // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts // Call options to use throughout this session
}

// CRUDTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type CRUDTransactorSession struct {
	Contract     *CRUDTransactor   // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// CRUDRaw is an auto generated low-level Go binding around an Ethereum contract.
type CRUDRaw struct {
	Contract *CRUD // Generic contract binding to access the raw methods on
}

// CRUDCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type CRUDCallerRaw struct {
	Contract *CRUDCaller // Generic read-only contract binding to access the raw methods on
}

// CRUDTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type CRUDTransactorRaw struct {
	Contract *CRUDTransactor // Generic write-only contract binding to access the raw methods on
}

// NewCRUD creates a new instance of CRUD, bound to a specific deployed contract.
func NewCRUD(address common.Address, backend bind.ContractBackend) (*CRUD, error) {
	contract, err := bindCRUD(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &CRUD{CRUDCaller: CRUDCaller{contract: contract}, CRUDTransactor: CRUDTransactor{contract: contract}}, nil
}

// NewCRUDCaller creates a new read-only instance of CRUD, bound to a specific deployed contract.
func NewCRUDCaller(address common.Address, caller bind.ContractCaller) (*CRUDCaller, error) {
	contract, err := bindCRUD(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &CRUDCaller{contract: contract}, nil
}

// NewCRUDTransactor creates a new write-only instance of CRUD, bound to a specific deployed contract.
func NewCRUDTransactor(address common.Address, transactor bind.ContractTransactor) (*CRUDTransactor, error) {
	contract, err := bindCRUD(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &CRUDTransactor{contract: contract}, nil
}

// bindCRUD binds a generic wrapper to an already deployed contract.
func bindCRUD(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(CRUDABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CRUD *CRUDRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CRUD.Contract.CRUDCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CRUD *CRUDRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CRUD.Contract.CRUDTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CRUD *CRUDRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CRUD.Contract.CRUDTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_CRUD *CRUDCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _CRUD.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_CRUD *CRUDTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _CRUD.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_CRUD *CRUDTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _CRUD.Contract.contract.Transact(opts, method, params...)
}

// Countries is a free data retrieval call binding the contract method 0x08e9daa5.
//
// Solidity: function countries( uint256) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDCaller) Countries(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	ret := new(struct {
		Name       string
		Leader     string
		Population *big.Int
	})
	out := ret
	err := _CRUD.contract.Call(opts, out, "countries", arg0)
	return *ret, err
}

// Countries is a free data retrieval call binding the contract method 0x08e9daa5.
//
// Solidity: function countries( uint256) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDSession) Countries(arg0 *big.Int) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	return _CRUD.Contract.Countries(&_CRUD.CallOpts, arg0)
}

// Countries is a free data retrieval call binding the contract method 0x08e9daa5.
//
// Solidity: function countries( uint256) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDCallerSession) Countries(arg0 *big.Int) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	return _CRUD.Contract.Countries(&_CRUD.CallOpts, arg0)
}

// GetCountry is a free data retrieval call binding the contract method 0x848924cb.
//
// Solidity: function getCountry(countryName string) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDCaller) GetCountry(opts *bind.CallOpts, countryName string) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	ret := new(struct {
		Name       string
		Leader     string
		Population *big.Int
	})
	out := ret
	err := _CRUD.contract.Call(opts, out, "getCountry", countryName)
	return *ret, err
}

// GetCountry is a free data retrieval call binding the contract method 0x848924cb.
//
// Solidity: function getCountry(countryName string) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDSession) GetCountry(countryName string) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	return _CRUD.Contract.GetCountry(&_CRUD.CallOpts, countryName)
}

// GetCountry is a free data retrieval call binding the contract method 0x848924cb.
//
// Solidity: function getCountry(countryName string) constant returns(name string, leader string, population uint256)
func (_CRUD *CRUDCallerSession) GetCountry(countryName string) (struct {
	Name       string
	Leader     string
	Population *big.Int
}, error) {
	return _CRUD.Contract.GetCountry(&_CRUD.CallOpts, countryName)
}

// GetTotalCountries is a free data retrieval call binding the contract method 0xacf75458.
//
// Solidity: function getTotalCountries() constant returns(length uint256)
func (_CRUD *CRUDCaller) GetTotalCountries(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CRUD.contract.Call(opts, out, "getTotalCountries")
	return *ret0, err
}

// GetTotalCountries is a free data retrieval call binding the contract method 0xacf75458.
//
// Solidity: function getTotalCountries() constant returns(length uint256)
func (_CRUD *CRUDSession) GetTotalCountries() (*big.Int, error) {
	return _CRUD.Contract.GetTotalCountries(&_CRUD.CallOpts)
}

// GetTotalCountries is a free data retrieval call binding the contract method 0xacf75458.
//
// Solidity: function getTotalCountries() constant returns(length uint256)
func (_CRUD *CRUDCallerSession) GetTotalCountries() (*big.Int, error) {
	return _CRUD.Contract.GetTotalCountries(&_CRUD.CallOpts)
}

// TotalCountries is a free data retrieval call binding the contract method 0x62738129.
//
// Solidity: function totalCountries() constant returns(uint256)
func (_CRUD *CRUDCaller) TotalCountries(opts *bind.CallOpts) (*big.Int, error) {
	var (
		ret0 = new(*big.Int)
	)
	out := ret0
	err := _CRUD.contract.Call(opts, out, "totalCountries")
	return *ret0, err
}

// TotalCountries is a free data retrieval call binding the contract method 0x62738129.
//
// Solidity: function totalCountries() constant returns(uint256)
func (_CRUD *CRUDSession) TotalCountries() (*big.Int, error) {
	return _CRUD.Contract.TotalCountries(&_CRUD.CallOpts)
}

// TotalCountries is a free data retrieval call binding the contract method 0x62738129.
//
// Solidity: function totalCountries() constant returns(uint256)
func (_CRUD *CRUDCallerSession) TotalCountries() (*big.Int, error) {
	return _CRUD.Contract.TotalCountries(&_CRUD.CallOpts)
}

// DeleteCountry is a paid mutator transaction binding the contract method 0xcae65058.
//
// Solidity: function deleteCountry(countryName string) returns(success bool)
func (_CRUD *CRUDTransactor) DeleteCountry(opts *bind.TransactOpts, countryName string) (*types.Transaction, error) {
	return _CRUD.contract.Transact(opts, "deleteCountry", countryName)
}

// DeleteCountry is a paid mutator transaction binding the contract method 0xcae65058.
//
// Solidity: function deleteCountry(countryName string) returns(success bool)
func (_CRUD *CRUDSession) DeleteCountry(countryName string) (*types.Transaction, error) {
	return _CRUD.Contract.DeleteCountry(&_CRUD.TransactOpts, countryName)
}

// DeleteCountry is a paid mutator transaction binding the contract method 0xcae65058.
//
// Solidity: function deleteCountry(countryName string) returns(success bool)
func (_CRUD *CRUDTransactorSession) DeleteCountry(countryName string) (*types.Transaction, error) {
	return _CRUD.Contract.DeleteCountry(&_CRUD.TransactOpts, countryName)
}

// Insert is a paid mutator transaction binding the contract method 0xc1356d26.
//
// Solidity: function insert(countryName string, leader string, population uint256) returns(totalCountries uint256)
func (_CRUD *CRUDTransactor) Insert(opts *bind.TransactOpts, countryName string, leader string, population *big.Int) (*types.Transaction, error) {
	return _CRUD.contract.Transact(opts, "insert", countryName, leader, population)
}

// Insert is a paid mutator transaction binding the contract method 0xc1356d26.
//
// Solidity: function insert(countryName string, leader string, population uint256) returns(totalCountries uint256)
func (_CRUD *CRUDSession) Insert(countryName string, leader string, population *big.Int) (*types.Transaction, error) {
	return _CRUD.Contract.Insert(&_CRUD.TransactOpts, countryName, leader, population)
}

// Insert is a paid mutator transaction binding the contract method 0xc1356d26.
//
// Solidity: function insert(countryName string, leader string, population uint256) returns(totalCountries uint256)
func (_CRUD *CRUDTransactorSession) Insert(countryName string, leader string, population *big.Int) (*types.Transaction, error) {
	return _CRUD.Contract.Insert(&_CRUD.TransactOpts, countryName, leader, population)
}

// UpdateLeader is a paid mutator transaction binding the contract method 0x81ba02be.
//
// Solidity: function updateLeader(countryName string, newLeader string) returns(success bool)
func (_CRUD *CRUDTransactor) UpdateLeader(opts *bind.TransactOpts, countryName string, newLeader string) (*types.Transaction, error) {
	return _CRUD.contract.Transact(opts, "updateLeader", countryName, newLeader)
}

// UpdateLeader is a paid mutator transaction binding the contract method 0x81ba02be.
//
// Solidity: function updateLeader(countryName string, newLeader string) returns(success bool)
func (_CRUD *CRUDSession) UpdateLeader(countryName string, newLeader string) (*types.Transaction, error) {
	return _CRUD.Contract.UpdateLeader(&_CRUD.TransactOpts, countryName, newLeader)
}

// UpdateLeader is a paid mutator transaction binding the contract method 0x81ba02be.
//
// Solidity: function updateLeader(countryName string, newLeader string) returns(success bool)
func (_CRUD *CRUDTransactorSession) UpdateLeader(countryName string, newLeader string) (*types.Transaction, error) {
	return _CRUD.Contract.UpdateLeader(&_CRUD.TransactOpts, countryName, newLeader)
}
