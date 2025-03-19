import HeaderConnect from "./components/ConnectBoard/Header.tsx";
import ConnectBoard from "./components/ConnectBoard/ConnectBoard.tsx";
import TetrisBoard from "./components/Tetris/TetrisBoard.tsx";
import HeaderTetris from "./components/Tetris/HeaderTetris.tsx";

function App() {
  return (
    <>
      <HeaderConnect />
      <ConnectBoard />
      <HeaderTetris />
      <TetrisBoard />
    </>
  );
}

export default App;
