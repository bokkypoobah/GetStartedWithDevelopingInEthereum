const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


// const { ZERO_ADDRESS, PAIRKEY_NULL, ORDERKEY_SENTINEL, BUYORSELL, ANYORALL, BUYORSELLSTRING, ANYORALLSTRING, Data, generateRange } = require('./helpers/common');
// const { singletons, expectRevert } = require("@openzeppelin/test-helpers");
// const { expect, assert } = require("chai");
// const { BigNumber } = require("ethers");
// const util = require('util');

// const BuySell = {
//   Buy: 0,
//   Sell: 1,
// };

// const Action = {
//   FillAny: 0,
//   FillAllOrNothing: 1,
//   FillAnyAndAddOrder: 2,
//   RemoveOrder: 3,
//   UpdateExpiryAndTokens: 4,
// }

let data;

describe("Chadex", function () {
  const DETAILS = 1;

  beforeEach(async function () {
    console.log();
    console.log("      beforeEach");
    const Token  = await ethers.getContractFactory("ERC20");
    // const Weth  = await ethers.getContractFactory("WETH9");
    // const Chadex  = await ethers.getContractFactory("Chadex");
    // data = new Data();
    // await data.init();
    //
    // console.log("        --- Setup Tokens and Chadex Contracts. Assuming gasPrice: " + ethers.utils.formatUnits(data.gasPrice, "gwei") + " gwei, ethUsd: " + ethers.utils.formatUnits(data.ethUsd, 18) + " ---");
    //
    // const token0 = await Token.deploy("TOK0", "Token0", 18, ethers.utils.parseUnits("400", 18));
    // const token0 = await Token.deploy("TOK0", "Token0", 18, "400_000_000_000_000_000_000");
    // await token0.deployed();
    // await data.setToken0(token0);
    // const token0Receipt = await data.token0.deployTransaction.wait();
    // if (DETAILS > 0) {
    //   await data.printEvents("Deployed Token0", token0Receipt);
    // }
    // console.log("        Token0 deployed");
    //
    // const token1 = await Token.deploy("TOK1", "Token1", 18, ethers.utils.parseUnits("400", 18));
    // await token1.deployed();
    // await data.setToken1(token1);
    // const token1Receipt = await data.token1.deployTransaction.wait();
    // if (DETAILS > 0) {
    //   await data.printEvents("Deployed Token1", token1Receipt);
    // }
    // console.log("        Token1 deployed");
    //
    // const weth = await Weth.deploy();
    // await weth.deployed();
    // await data.setWeth(weth);
    // const wethReceipt = await data.weth.deployTransaction.wait();
    // if (DETAILS > 0) {
    //   await data.printEvents("Deployed WETH", wethReceipt);
    // }
    // console.log("        WETH deployed");
    //
    // const chadex = await Chadex.deploy();
    // await chadex.deployed();
    // await data.setChadex(chadex);
    // const chadexReceipt = await data.chadex.deployTransaction.wait();
    // if (DETAILS > 0) {
    //   await data.printEvents("Deployed Chadex", chadexReceipt);
    // }
    // console.log("        Chadex deployed");
    //
    // const setup1 = [];
    // const amount0 = ethers.utils.parseUnits("100", data.decimals0);
    // setup1.push(token0.transfer(data.user0, amount0));
    // setup1.push(token0.transfer(data.user1, amount0));
    // setup1.push(token0.transfer(data.user2, amount0));
    // setup1.push(token0.transfer(data.user3, amount0));
    // const [transferToken00Tx, transferToken01Tx, transferToken02Tx, transferToken03Tx] = await Promise.all(setup1);
    // if (DETAILS > 0) {
    //   [transferToken00Tx, transferToken01Tx, transferToken02Tx, transferToken03Tx].forEach( async function (a) {
    //     await data.printEvents("Transfer Token0", await a.wait());
    //   });
    // }
    // const setup2 = [];
    // const amount1 = ethers.utils.parseUnits("100", data.decimals1);
    // setup2.push(token1.transfer(data.user0, amount1));
    // setup2.push(token1.transfer(data.user1, amount1));
    // setup2.push(token1.transfer(data.user2, amount1));
    // setup2.push(token1.transfer(data.user3, amount1));
    // const [transferToken10Tx, transferToken11Tx, transferToken12Tx, transferToken13Tx] = await Promise.all(setup2);
    // if (DETAILS > 0) {
    //   [transferToken10Tx, transferToken11Tx, transferToken12Tx, transferToken13Tx].forEach( async function (a) {
    //     await data.printEvents("Transfer Token1", await a.wait());
    //   });
    // }
    // console.log("        Tokens transferred");

    // const amountWeth = ethers.utils.parseUnits("100", data.decimalsWeth);
    // const weth0Tx = await data.user0Signer.sendTransaction({ to: data.weth.address, value: amountWeth });
    // const weth1Tx = await data.user1Signer.sendTransaction({ to: data.weth.address, value: amountWeth });
    // const weth2Tx = await data.user2Signer.sendTransaction({ to: data.weth.address, value: amountWeth });
    // const weth3Tx = await data.user3Signer.sendTransaction({ to: data.weth.address, value: amountWeth });
    // await data.printEvents("Send weth" , await weth0Tx.wait());
    // await data.printEvents("Send weth" , await weth1Tx.wait());
    // await data.printEvents("Send weth" , await weth2Tx.wait());
    // await data.printEvents("Send weth" , await weth3Tx.wait());
    //
    // const approveAmount0 = ethers.utils.parseUnits("10", data.decimals0);
    // const approveAmount1 = ethers.utils.parseUnits("10", data.decimals1);
    // const approveAmountWeth = ethers.utils.parseUnits("2.69", data.decimalsWeth);
    //
    // const approve00Tx = await data.token0.connect(data.user0Signer).approve(data.chadex.address, approveAmount0);
    // const approve10Tx = await data.token1.connect(data.user0Signer).approve(data.chadex.address, approveAmount1);
    // const approve20Tx = await data.weth.connect(data.user0Signer).approve(data.chadex.address, approveAmountWeth);
    //
    // const approve01Tx = await data.token0.connect(data.user1Signer).approve(data.chadex.address, approveAmount0);
    // const approve11Tx = await data.token1.connect(data.user1Signer).approve(data.chadex.address, approveAmount1);
    // const approve21Tx = await data.weth.connect(data.user1Signer).approve(data.chadex.address, approveAmountWeth);
    //
    // const approve02Tx = await data.token0.connect(data.user2Signer).approve(data.chadex.address, approveAmount0);
    // const approve12Tx = await data.token1.connect(data.user2Signer).approve(data.chadex.address, approveAmount1);
    // const approve22Tx = await data.weth.connect(data.user2Signer).approve(data.chadex.address, approveAmountWeth);
    //
    // const approve03Tx = await data.token0.connect(data.user3Signer).approve(data.chadex.address, approveAmount0);
    // const approve13Tx = await data.token1.connect(data.user3Signer).approve(data.chadex.address, approveAmount1);
    // const approve23Tx = await data.weth.connect(data.user3Signer).approve(data.chadex.address, approveAmountWeth);
    //
    // await data.printEvents("user0->token0.approve(chadex, " + ethers.utils.formatUnits(approveAmount0, data.decimals0) + ")", await approve00Tx.wait());
    // await data.printEvents("user0->token1.approve(chadex, " + ethers.utils.formatUnits(approveAmount1, data.decimals1) + ")", await approve10Tx.wait());
    // await data.printEvents("user0->weth.approve(chadex, " + ethers.utils.formatUnits(approveAmountWeth, data.decimalsWeth) + ")", await approve20Tx.wait());
    // await data.printEvents("user1->token0.approve(chadex, " + ethers.utils.formatUnits(approveAmount0, data.decimals0) + ")", await approve01Tx.wait());
    // await data.printEvents("user1->token1.approve(chadex, " + ethers.utils.formatUnits(approveAmount1, data.decimals1) + ")", await approve11Tx.wait());
    // await data.printEvents("user1->weth.approve(chadex, " + ethers.utils.formatUnits(approveAmountWeth, data.decimalsWeth) + ")", await approve21Tx.wait());
    //
    // await data.printEvents("user2->token0.approve(chadex, " + ethers.utils.formatUnits(approveAmount0, data.decimals0) + ")", await approve02Tx.wait());
    // await data.printEvents("user2->token1.approve(chadex, " + ethers.utils.formatUnits(approveAmount1, data.decimals1) + ")", await approve12Tx.wait());
    // await data.printEvents("user2->weth.approve(chadex, " + ethers.utils.formatUnits(approveAmountWeth, data.decimalsWeth) + ")", await approve22Tx.wait());
    //
    // await data.printEvents("user3->token0.approve(chadex, " + ethers.utils.formatUnits(approveAmount0, data.decimals0) + ")", await approve03Tx.wait());
    // await data.printEvents("user3->token1.approve(chadex, " + ethers.utils.formatUnits(approveAmount1, data.decimals1) + ")", await approve13Tx.wait());
    // await data.printEvents("user3->weth.approve(chadex, " + ethers.utils.formatUnits(approveAmountWeth, data.decimalsWeth) + ")", await approve23Tx.wait());
    //
    // //   await data.printState("user0 approved user1 to transfer " + approveAmount + " umswaps");
    //
    // await data.printState("Setup Completed. Chadex bytecode ~" + JSON.stringify(data.chadex.deployTransaction.data.length/2, null, 2));
  });

  it("00. Test 00", async function () {
    console.log("      00. Test 00 - Happy Path - Specified Set");

    // // Add Orders
    // const price1 = "0.6901";
    // const price2 = "0.6902";
    // const price3 = "0.6903";
    // const price5 = "0.6905";
    // const price6 = "0.6906";
    // const price7 = "0.6907";
    // const expired = parseInt(new Date()/1000) - 60*60;
    // const expiry = parseInt(new Date()/1000) + 60*60;
    // const baseTokens1 = ethers.utils.parseUnits("1", data.decimals0);
    // const baseTokens2 = ethers.utils.parseUnits("2", data.decimals0);
    // const baseTokens3 = ethers.utils.parseUnits("3", data.decimals0);
    // const baseTokens4 = ethers.utils.parseUnits("6.9", data.decimals0);
    // const baseTokens5 = ethers.utils.parseUnits("69", data.decimals0);
    //
    // const actionsA = [
    //   { action: Action.FillAnyAndAddOrder, buySell: BuySell.Buy, base: data.token0.address, quote: data.weth.address, price: ethers.utils.parseUnits(price1, 12).toString(), targetPrice: ethers.utils.parseUnits(price1, 12).toString(), expiry: expiry, tokens: baseTokens1.toString(), skipCheck: false },
    //   // { action: Action.FillAnyAndAddOrder, buySell: BuySell.Buy, base: data.token0.address, quote: data.weth.address, price: ethers.utils.parseUnits(price2, 12).toString(), targetPrice: ethers.utils.parseUnits(price2, 12).toString(), expiry: expiry, tokens: baseTokens2.toString(), skipCheck: false },
    //   // { action: Action.FillAnyAndAddOrder, buySell: BuySell.Buy, base: data.token0.address, quote: data.weth.address, price: ethers.utils.parseUnits(price3, 12).toString(), targetPrice: ethers.utils.parseUnits(price3, 12).toString(), expiry: expiry, tokens: baseTokens3.toString(), skipCheck: false },
    // ];
    // console.log("        Executing: " + JSON.stringify(actionsA, null, 2));
    //
    // const execute0aTx = await data.chadex.connect(data.user0Signer).execute(actionsA);
    // await data.printEvents("user0->chadex.execute(actionsA)", await execute0aTx.wait());
    //
    // const execute1aTx = await data.chadex.connect(data.user1Signer).execute(actionsA);
    // await data.printEvents("user1->chadex.execute(actionsA)", await execute1aTx.wait());
    //
    // const execute1bTx = await data.chadex.connect(data.user2Signer).execute(actionsA);
    // await data.printEvents("user2->chadex.execute(actionsA)", await execute1bTx.wait());
    //
    // await data.printState("After Adding Orders");
    //
    // const targetPrice1 = "0.6901";
    // const baseTokensB1 = ethers.utils.parseUnits("1", data.decimals0);
    // const actionsB1 = [
    //   { action: Action.FillAnyAndAddOrder, buySell: BuySell.Sell, base: data.token0.address, quote: data.weth.address, price: ethers.utils.parseUnits(price1, 12).toString(), targetPrice: ethers.utils.parseUnits(targetPrice1, 12).toString(), expiry: expiry, tokens: baseTokensB1.toString(), skipCheck: false },
    //   // { action: Action.FillAnyAndAddOrder, buySell: BuySell.Sell, base: data.token0.address, quote: data.weth.address, price: ethers.utils.parseUnits(price3, 12).toString(), targetPrice: ethers.utils.parseUnits(targetPrice1, 12).toString(), expiry: expiry, tokens: baseTokensB1.toString() },
    // ];
    // console.log("        Executing: " + JSON.stringify(actionsB1, null, 2));
    // const executeB1Tx = await data.chadex.connect(data.user3Signer).execute(actionsB1);
    // await data.printEvents("user3->chadex.execute(actions)", await executeB1Tx.wait());


    // await data.printState("After Executing Against Orders");

    // const owners = [data.user0];
    // const tokens = [data.token0.address];
    // const tokenBalanceAndAllowance = await data.chadex.getTokenBalanceAndAllowance(owners, tokens);
    // console.log("tokenBalanceAndAllowance: " + JSON.stringify(tokenBalanceAndAllowance, null, 2));

    // // Delete orders
    // const chadexData = await data.getChadexData();
    // console.log();
  });
});
