const Migrations = artifacts.require("International");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
