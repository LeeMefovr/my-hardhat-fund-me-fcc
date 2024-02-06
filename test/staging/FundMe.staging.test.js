const { ethers, getNamedAccounts, deployments, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", async function () {
          let fundMe, deployer
          const sendValue = ethers.parseEther("0.1") // 1ETH
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
              //   console.log(fundMe)
          })

          it("allows people to fund and withdraw", async function () {
              const fundTxResponse = await fundMe.fund({ value: sendValue })
              await fundTxResponse.wait(1)
              const withdrawTxResponse = await fundMe.withdraw()
              await withdrawTxResponse.wait(1)
              const endingBalance = await ethers.provider.getBalance(
                  fundMe.target
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
