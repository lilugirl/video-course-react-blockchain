import { useRef } from "react";
import { useBlockChain } from "./BlockChainContext";

const Header = () => {
  const { addTransition, writeBlock, hack, isValid } = useBlockChain();
  const inputRef = useRef(null);
  return (
    <div>
      <h1>狗蛋区块链交易平台</h1>
      <div>
        <input ref={inputRef} />{" "}
        <button
          onClick={() => {
            addTransition(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          添加交易
        </button>
        <button onClick={() => writeBlock()}>上链</button>
        <button onClick={() => hack()}>篡改</button>
        {isValid ? "数据正确" : "数据被篡改"}
      </div>
    </div>
  );
};
export default Header;
