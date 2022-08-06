import { createContext, useContext, useState, useMemo } from "react";
import { SHA256 } from "crypto-js";
const BlockChainContext = createContext(null);

const GenesisBlock = {
  hash: "",
  transitions: [],
};

export const BlockChainProvider = ({ children }) => {
  const [transitions, setTransitions] = useState([]);
  const [blocks, setBlocks] = useState([GenesisBlock]);

  const addTransition = (transition) => {
    setTransitions([...transitions, transition]);
  };

  const writeBlock = () => {
    const prevBlock = blocks[blocks.length - 1];
    const hash = SHA256(
      prevBlock.hash + JSON.stringify(transitions)
    ).toString();
    const newBlock = {
      hash,
      transitions: [...transitions],
    };
    setBlocks([...blocks, newBlock]);
    setTransitions([]);
  };

  const hack = () => {
    const fakeBlocks = [...blocks];
    fakeBlocks.splice(0, 1);
    const index = Math.floor(Math.random() * fakeBlocks.length);
    fakeBlocks[index].transitions = [
      "篡改交易1" + Math.random(),
      "篡改交易2" + Math.random(),
    ];
    setBlocks([GenesisBlock, ...fakeBlocks]);
  };

  const isValid = useMemo(() => {
    return blocks.every((block, index) => {
      if (index === 0) return block.hash === "";
      const hash = SHA256(
        blocks[index - 1].hash + JSON.stringify(block.transitions)
      ).toString();
      return block.hash === hash;
    });
  }, [blocks]);

  return (
    <BlockChainContext.Provider
      value={{ transitions, blocks, addTransition, writeBlock, hack, isValid }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};

export const useBlockChain = () => {
  return useContext(BlockChainContext);
};
