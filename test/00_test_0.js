const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("00_test_0", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const TOTALSUPPLY = "1000000000000000000000000";
    // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // const ONE_GWEI = 1_000_000_000;
    //
    // const lockedAmount = ONE_GWEI;
    // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    console.log("        Signers");
    console.log("        * owner: " + owner.address);
    console.log("        * otherAccount: " + otherAccount.address);

    // const Lock = await ethers.getContractFactory("Lock");
    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    console.log("        Deploying ERC20");
    const ERC20Token = await ethers.getContractFactory("ERC20");
    const erc20Token = await ERC20Token.deploy("MYSYMBOL", "My Name", 18, TOTALSUPPLY);
    console.log("        * symbol: " + await erc20Token.symbol());
    console.log("        * name: " + await erc20Token.name());
    console.log("        * decimals: " + await erc20Token.decimals());
    console.log("        * totalSupply: " + await erc20Token.totalSupply());

    console.log("        Deploying SimpleVault");
    const SimpleVault = await ethers.getContractFactory("SimpleVault");
    const simpleVault = await SimpleVault.deploy();
    const simpleVaultOwner = await simpleVault.owner()
    console.log("        * owner: " + simpleVaultOwner);

    return { /*lock, unlockTime, lockedAmount,*/ erc20Token, simpleVault, owner, otherAccount, TOTALSUPPLY };
  }

  describe("Deployment", function () {

    it("ERC20 token should have the correct symbol, name, decimals and totalSupply", async function () {
      const { erc20Token, owner, TOTALSUPPLY } = await loadFixture(deployOneYearLockFixture);
      expect(await erc20Token.symbol()).to.equal("MYSYMBOL");
      expect(await erc20Token.name()).to.equal("My Name");
      expect(await erc20Token.decimals()).to.equal(18);
      expect(await erc20Token.totalSupply()).to.equal(TOTALSUPPLY);
    });

    it("ERC20 token should emit an event on transfers and balanceOf adds up", async function () {
      const { erc20Token, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);

      await expect(erc20Token.transfer(otherAccount, "1"))
        .to.emit(erc20Token, "Transfer")
        .withArgs(owner, otherAccount, anyValue);
      expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999999");
      expect(await erc20Token.balanceOf(otherAccount)).to.equal("1");

      await expect(erc20Token.transfer(otherAccount, "2"))
        .to.emit(erc20Token, "Transfer")
        .withArgs(owner, otherAccount, "2");
      expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999997");
      expect(await erc20Token.balanceOf(otherAccount)).to.equal("3");

    });

    it("SimpleVault should process token deposits and withdrawals correctly", async function () {
      const { erc20Token, simpleVault, owner, otherAccount, TOTALSUPPLY } = await loadFixture(deployOneYearLockFixture);

      await expect(simpleVault.depositTokens(erc20Token, "1")).to.be.reverted;

      await expect(erc20Token.approve(simpleVault, "100"))
        .to.emit(erc20Token, "Approval")
        .withArgs(owner, simpleVault, "100");

      await expect(simpleVault.depositTokens(erc20Token, "1"))
        .to.emit(erc20Token, "Transfer")
        .withArgs(owner, simpleVault, "1")
        .to.emit(simpleVault, "TokensDeposited")
        .withArgs(owner, erc20Token, "1");

      expect(await erc20Token.balanceOf(owner)).to.equal("999999999999999999999999");
      expect(await erc20Token.balanceOf(simpleVault)).to.equal("1");

      await expect(simpleVault.withdrawTokens(erc20Token, "1"))
        .to.emit(erc20Token, "Transfer")
        .withArgs(simpleVault, owner, "1")
        .to.emit(simpleVault, "TokensWithdrawn")
        .withArgs(owner, erc20Token, "1");

      expect(await erc20Token.balanceOf(owner)).to.equal(TOTALSUPPLY);
      expect(await erc20Token.balanceOf(simpleVault)).to.equal("0");
    });

    // it("Should set the right unlockTime", async function () {
    //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    //
    //   expect(await lock.unlockTime()).to.equal(unlockTime);
    // });
    //
    // it("Should set the right owner", async function () {
    //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);
    //
    //   expect(await lock.owner()).to.equal(owner.address);
    // });
    //
    // it("Should receive and store the funds to lock", async function () {
    //   const { lock, lockedAmount } = await loadFixture(
    //     deployOneYearLockFixture
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
  //       const { lock } = await loadFixture(deployOneYearLockFixture);
  //
  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });
  //
  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
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
  //         deployOneYearLockFixture
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
  //         deployOneYearLockFixture
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
  //         deployOneYearLockFixture
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
