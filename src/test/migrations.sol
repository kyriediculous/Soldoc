pragma solidity ^0.5.1;


/// @title BugsBunny
/// @author 
/// @notice
/// @dev
contract BugsBunny {

    /// @notice
    /// @dev
    /// @param food (string)
    /// @return  (bool)
    function doesEat(string calldata food) external pure returns (bool) {
        return keccak256(bytes(food)) == keccak256("carrot");
    }
}
