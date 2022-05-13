//import that secure hash algorithm from the crypto-js package
const SHA256 = require("crypto-js/sha256");

//create a JavaScript class to represent a Block
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }
  createGenesisBlock() {
    return new Block(0, "04/05/2022", "May the force be with you.", "0");
  }
  getLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.generateHash();
    this.blockchain.push(newBlock);
  }

  // testing the integrity of the chain
  validateChainIntegrity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      return true;
    }
  }
}

let forceCoin = new Blockchain();
console.log("mining forceCoin in progress...");
forceCoin.addNewBlock(
    new Block(1, "13/05/2022", {
        sender: "Luke Skywalker",
        recipient: "Yoda",
        quantity: 25
    })
);

forceCoin.addNewBlock(
    new Block(2, "13/05/2022", {
        sender: "Yoda",
        recipient: "Obi Wan",
        quantity: 20
    })
);

forceCoin.addNewBlock(
    new Block(3, "13/05/2022", {
        sender: "Obi Wan",
        recipient: "R2D2",
        quantity: 10
    })
);
console.log(JSON.stringify(forceCoin, null, 5))