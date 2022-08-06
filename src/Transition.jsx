import { useBlockChain } from "./BlockChainContext";

const Transition = () => {
  const { transitions, blocks } = useBlockChain();
  const myBlocks = [...blocks];
  myBlocks.splice(0, 1);
  return (
    <div>
      未上链交易
      <ul>
        {transitions.map((transition, index) => {
          return <li key={index}>{transition}</li>;
        })}
      </ul>
      已上链交易
      <ul>
        {myBlocks.map((block) => {
          return (
            <li key={block.hash}>
              {block.hash}
              {block.transitions.map((transition, index) => {
                return <span key={index}>{transition}</span>;
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Transition;
