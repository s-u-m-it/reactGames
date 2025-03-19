import { useState } from "react";
import Button from "./Button";
import classes from "./ConnectBoard.module.css";

const DIMENSIONS: { row: number; column: number } = { row: 6, column: 7 };

let initialBoardState: string[][] = Array.from({ length: DIMENSIONS.row }, () =>
  Array(DIMENSIONS.column).fill(" "),
);

const ConnectBoard: React.FC = () => {
  const [boardState, setBoardState] = useState(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState("Blue");
  let x: number = -1;
  let y: number = -1;

  function winCheck(board: string[][], player: string): boolean {
    const maxRow = 6;
    const maxCol = 7;
    const winCondition = 4;

    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let r = 0; r < maxRow; r++) {
      for (let c = 0; c < maxCol; c++) {
        if (board[r][c] !== player) continue;

        for (const [dr, dc] of directions) {
          let count = 0;

          for (let i = 0; i < winCondition; i++) {
            const nr = r + dr * i;
            const nc = c + dc * i;

            if (nr < 0 || nr >= maxRow || nc < 0 || nc >= maxCol) break;
            if (board[nr][nc] !== player) break;

            count++;
          }

          if (count === winCondition) return true;
        }
      }
    }
    return false;
  }

  function gridClickHandler(x: number, y: number): void {
    let i: number = x;
    for (i = x; i <= 5; i++) {
      if (boardState[i][y] !== " ") {
        i = i - 1;
        break;
      }
    }
    if (i === 6) {
      i = 5;
    }

    //console.log(currentPlayer);

    const latestBoard: string[][] = JSON.parse(JSON.stringify(boardState));
    latestBoard[i][y] = currentPlayer;

    const isWinner = winCheck(latestBoard, currentPlayer);
    console.log(isWinner ? currentPlayer + " is winner" : "Continue");
    console.log(`(x,y)=(${i},${y})`);

    setBoardState((prevBoardState) => {
      prevBoardState[i][y] = currentPlayer;
      return prevBoardState;
    });
    setCurrentPlayer((curPlayer) => (curPlayer === "Blue" ? "Red" : "Blue"));
  }

  return (
    <>
      <>
        <div>
          <table className={classes.board}>
            <tbody>
              {boardState.map((eachRow: string[]) => {
                x++;
                y = -1;
                return (
                  <tr key={`x${x}`}>
                    {eachRow.map((eachEntry: string) => {
                      y++;
                      return (
                        <td key={`y${y}`}>
                          <Button
                            key={`x${x},y${y}`}
                            loc={`x${x},y${y}`}
                            xLoc={x}
                            yLoc={y}
                            onClick={gridClickHandler}
                            disabled={boardState[x][y] !== " "}
                          >
                            {eachEntry}
                          </Button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default ConnectBoard;
