const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai"); // https://hardhat.org/hardhat-chai-matchers/docs/reference
const ADDRESS0 = "0x0000000000000000000000000000000000000000";

describe("00_test_0", function () {
  async function deployContracts() {
    const CONSTANTS = {
      SYMBOL: "HIHIHI",
      NAME: "Hi 👋, Hi 👋, Hi 👋",
      DECIMALS: 18,
      TOTALSUPPLY: "1000000000000000000000000",
    };

    const accounts = await ethers.getSigners();

    const FixedSupplyToken = await ethers.getContractFactory("FixedSupplyToken");
    const fixedSupplyToken = await FixedSupplyToken.deploy();

    return { CONSTANTS, accounts, fixedSupplyToken };
  }

  describe("Deployment", function () {

    it("FixedSupplyToken - Test symbol, name, decimals, totalSupply and balanceOf", async function () {
      const { CONSTANTS, accounts, fixedSupplyToken } = await loadFixture(deployContracts);
      console.log("        * accounts: " + JSON.stringify(accounts.slice(0, 2).map(e => e.address)));
      console.log("        * FixedSupplyToken: '" + await fixedSupplyToken.symbol() + "', '" + await fixedSupplyToken.name() + "', " + await fixedSupplyToken.decimals() + ", " + await fixedSupplyToken.totalSupply());
      expect(await fixedSupplyToken.symbol()).to.equal(CONSTANTS.SYMBOL);
      expect(await fixedSupplyToken.name()).to.equal(CONSTANTS.NAME);
      expect(await fixedSupplyToken.decimals()).to.equal(CONSTANTS.DECIMALS);
      expect(await fixedSupplyToken.totalSupply()).to.equal(CONSTANTS.TOTALSUPPLY);
      expect(await fixedSupplyToken.balanceOf(accounts[0])).to.equal(CONSTANTS.TOTALSUPPLY);
      expect(await fixedSupplyToken.balanceOf(accounts[1])).to.equal(0);
    });

    it("FixedSupplyToken - Test transfer", async function () {
      const { CONSTANTS, accounts, fixedSupplyToken } = await loadFixture(deployContracts);
      await expect(fixedSupplyToken.transfer(accounts[1], "10"))
        .to.emit(fixedSupplyToken, "Transfer")
        .withArgs(accounts[0], accounts[1], anyValue);
      expect(await fixedSupplyToken.balanceOf(accounts[0])).to.equal("999999999999999999999990");
      expect(await fixedSupplyToken.balanceOf(accounts[1])).to.equal("10");
      await expect(fixedSupplyToken.transfer(accounts[1], "1"))
        .to.emit(fixedSupplyToken, "Transfer")
        .withArgs(accounts[0], accounts[1], "1");
      expect(await fixedSupplyToken.balanceOf(accounts[0])).to.equal("999999999999999999999989");
      expect(await fixedSupplyToken.balanceOf(accounts[1])).to.equal("11");
    });

    it("FixedSupplyToken - Test approve and transferFrom", async function () {
      const { CONSTANTS, accounts, fixedSupplyToken } = await loadFixture(deployContracts);
      await expect(fixedSupplyToken.approve(accounts[1], "100"))
        .to.emit(fixedSupplyToken, "Approval")
        .withArgs(accounts[0], accounts[1], "100");
      expect(await fixedSupplyToken.allowance(accounts[0], accounts[1])).to.equal("100");
      await expect(fixedSupplyToken.connect(accounts[1]).transferFrom(accounts[0], accounts[1], "37"))
        .to.emit(fixedSupplyToken, "Transfer")
        .withArgs(accounts[0], accounts[1], "37");
      expect(await fixedSupplyToken.allowance(accounts[0], accounts[1])).to.equal("63");
      expect(await fixedSupplyToken.balanceOf(accounts[0])).to.equal("999999999999999999999963");
      expect(await fixedSupplyToken.balanceOf(accounts[1])).to.equal("37");
    });

    it("FixedSupplyToken - Test burns, i.e., transfer to address(0) that reduces totalSupply", async function () {
      const { CONSTANTS, accounts, fixedSupplyToken } = await loadFixture(deployContracts);
      await expect(fixedSupplyToken.transfer(ADDRESS0, "123456789"))
        .to.emit(fixedSupplyToken, "Transfer")
        .withArgs(accounts[0], ADDRESS0, "123456789");
      expect(await fixedSupplyToken.balanceOf(accounts[0])).to.equal("999999999999999876543211");
      expect(await fixedSupplyToken.balanceOf(ADDRESS0)).to.equal("123456789");
      expect(await fixedSupplyToken.totalSupply()).to.equal("999999999999999876543211");
    });

    it("FixedSupplyToken - Test invalid transfer and transferFrom", async function () {
      const { CONSTANTS, accounts, fixedSupplyToken } = await loadFixture(deployContracts);
      await expect(fixedSupplyToken.connect(accounts[1]).transfer(accounts[0], "1")).to.be.revertedWithPanic(0x11);
      await expect(fixedSupplyToken.connect(accounts[1]).transferFrom(accounts[0], accounts[1], "1")).to.be.revertedWithPanic(0x11);
    });

    // it("ERC20 token should emit an event on transfers and balanceOf adds up", async function () {
    //   const { erc20Token, owner, account2 } = await loadFixture(deployContracts);
    //
    //   await expect(erc20Token.transfer(account2, "1"))
    //     .to.emit(erc20Token, "Transfer")
    //     .withArgs(owner, account2, anyValue);
    //   expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999999");
    //   expect(await erc20Token.balanceOf(account2)).to.equal("1");
    //
    //   await expect(erc20Token.transfer(account2, "2"))
    //     .to.emit(erc20Token, "Transfer")
    //     .withArgs(owner, account2, "2");
    //   expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999997");
    //   expect(await erc20Token.balanceOf(account2)).to.equal("3");
    //
    // });

    // it("SimpleVault should process token deposits and withdrawals correctly", async function () {
    //   const { erc20Token, simpleVault, owner, otherAccount, TOTALSUPPLY } = await loadFixture(deployContracts);
    //
    //   await expect(simpleVault.depositTokens(erc20Token, "1")).to.be.revertedWithPanic(0x11);
    //
    //   await expect(erc20Token.approve(simpleVault, "100"))
    //     .to.emit(erc20Token, "Approval")
    //     .withArgs(owner, simpleVault, "100");
    //
    //   await expect(simpleVault.depositTokens(erc20Token, "1"))
    //     .to.emit(erc20Token, "Transfer")
    //     .withArgs(owner, simpleVault, "1")
    //     .to.emit(simpleVault, "TokensDeposited")
    //     .withArgs(owner, erc20Token, "1");
    //
    //   expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999999");
    //   expect(await erc20Token.balanceOf(simpleVault)).to.equal("1");
    //
    //   await expect(simpleVault.connect(otherAccount).withdrawTokens(erc20Token, "1")).to.be.reverted;
    //
    //   const withdrawTokens = await simpleVault.withdrawTokens(erc20Token, "1");
    //   expect(withdrawTokens)
    //     .to.emit(erc20Token, "Transfer")
    //     .withArgs(simpleVault, owner, "1")
    //     .to.emit(simpleVault, "TokensWithdrawn")
    //     .withArgs(owner, erc20Token, "1");
    //   // console.log("withdrawTokens: " + JSON.stringify(withdrawTokens, null, 2));
    //   // const receipt = await withdrawTokens.wait();
    //   // console.log("receipt: " + JSON.stringify(receipt, null, 2));
    //
    //   expect(await erc20Token.balanceOf(owner)).to.equal(TOTALSUPPLY);
    //   expect(await erc20Token.balanceOf(simpleVault)).to.equal("0");
    // });

    // it("Should set the right unlockTime", async function () {
    //   const { lock, unlockTime } = await loadFixture(deployContracts);
    //
    //   expect(await lock.unlockTime()).to.equal(unlockTime);
    // });
    //
    // it("Should set the right owner", async function () {
    //   const { lock, owner } = await loadFixture(deployContracts);
    //
    //   expect(await lock.owner()).to.equal(owner.address);
    // });
    //
    // it("Should receive and store the funds to lock", async function () {
    //   const { lock, lockedAmount } = await loadFixture(
    //     deployContracts
    //   );
    //
    //   expect(await ethers.provider.getBalance(lock.target)).to.equal(
    //     lockedAmount
    //   );
    // });
    //
    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployContracts);
  //
  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });
  //
  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployContracts
  //       );
  //
  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);
  //
  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });
  //
  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployContracts
  //       );
  //
  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);
  //
  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });
  //
  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployContracts
  //       );
  //
  //       await time.increaseTo(unlockTime);
  //
  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });
  //
  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployContracts
  //       );
  //
  //       await time.increaseTo(unlockTime);
  //
  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
