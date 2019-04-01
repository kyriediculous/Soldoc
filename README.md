# SolDoc - Generate Solidity Comments

SolDoc is a library to easily generate comments in your solidity smart contracts based on the function parameters and return types. 
It follows the official [ethereum natspec](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format). 

Example: 

```
pragma solidity ^0.5.1;


/// @title BugsBunny
/// @author 
/// @notice
/// @dev
contract BugsBunny {

    /// @notice
    /// @dev
    /// @param food (string)
    /// @return yesno (bool)
    function doesEat(string calldata food) external pure returns (bool yesno) {
        return keccak256(bytes(food)) == keccak256("carrot");
    }
}
```

## Library 
The `soldoc` module can be used as a standalone typescript library (TODO: write declaration files)

## Installation 
As an extension: ... url 

As a library : 
`git clone` & `npm install` 
```
import { generateCommentsFromFile } from '../soldoc/index';
import * as path from 'path';
const file = path.resolve(__dirname, './bugsbunny.sol')
generateCommentsFromFile(file)
```


**Enjoy!**
