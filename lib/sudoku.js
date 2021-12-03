'use strict'
let board1 = [
    [0, 4, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 0, 0, 1, 0],
    [2, 3, 1, 0, 0, 0, 6, 0, 9],
    [9, 0, 0, 0, 3, 0, 1, 0, 0],
    [0, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 0, 2, 0, 7, 0, 0, 0, 8],
    [8, 0, 3, 0, 0, 0, 4, 7, 1],
    [0, 2, 0, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 8, 0]];

let board2 = [
    [5, 0, 0, 0, 9, 0, 2, 0, 1],
    [0, 0, 2, 1, 0, 7, 0, 0, 8],
    [0, 8, 0, 0, 0, 0, 3, 0, 0],
    [0, 1, 4, 0, 0, 5, 0, 0, 0],
    [0, 0, 0, 9, 0, 3, 0, 0, 0],
    [0, 0, 0, 8, 0, 0, 9, 4, 0],
    [0, 0, 3, 0, 0, 0, 0, 6, 0],
    [6, 0, 0, 2, 0, 0, 1, 0, 0],
    [8, 0, 9, 0, 6, 0, 0, 0, 5]];

    let board3 = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],];

        let board4 = [
            [0, 1, 0, 5, 7, 0, 0, 0, 8],
            [0, 0, 0, 0, 8, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 1, 9, 0, 0],
            [0, 8, 4, 0, 0, 0, 0, 0, 6],
            [0, 0, 6, 4, 1, 0, 0, 0, 2],
            [0, 2, 1, 0, 0, 0, 4, 0, 9],
            [0, 0, 0, 0, 6, 3, 2, 0, 0],
            [6, 0, 0, 1, 5, 7, 8, 0, 0],
            [3, 7, 0, 9, 4, 0, 6, 0, 1],];

let updateRemaining = function (board, remaining) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != 0) {  				//number on board
                remaining[i][j] = [];

                for (let row = 0; row < 9; row++) {
                    if (remaining[row][j].indexOf(board[i][j]) != -1) {
                        remaining[row][j] = remaining[row][j].slice(0, remaining[row][j].indexOf(board[i][j])).concat(remaining[row][j].slice(remaining[row][j].indexOf(board[i][j]) + 1))
                    }
                }
                for (let column = 0; column < 9; column++) {
                    if (remaining[i][column].indexOf(board[i][j]) != -1) {
                        remaining[i][column] = remaining[i][column].slice(0, remaining[i][column].indexOf(board[i][j])).concat(remaining[i][column].slice(remaining[i][column].indexOf(board[i][j]) + 1))
                    }
                }

                //room=(Math.floor(i/3))*3+Math.floor(j/3)+1	//宫
                for (let column = Math.floor(j / 3) * 3; column < Math.floor(j / 3) * 3 + 3; column++) {
                    for (let row = Math.floor(i / 3) * 3; row < Math.floor(i / 3) * 3 + 3; row++) {
                        //console.log("i=",i,"j=",j,"row=",row,"column=",column)
                        if (remaining[row][column].indexOf(board[i][j]) != -1) {
                            remaining[row][column] = remaining[row][column].slice(0, remaining[row][column].indexOf(board[i][j])).concat(remaining[row][column].slice(remaining[row][column].indexOf(board[i][j]) + 1))
                            //console.log(i,j,row,column)
                        }
                    }
                }
            }
        }
    }
}

let solutionMayExist = function (board,remaining) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0 && remaining[i][j].length == 0) {
                return false;           //no available solution
            }
        }
    }
    for (let row = 0; row < 9; row++) {
      for (let number = 1; number <= 9; number++) {
          let found = false;
          for (let column = 0; column < 9; column++) {
              if (board[row][column] == number) {
                  
                  if (found==false) {
                    found = true;
                  }
                  else {
                    //console.log(row,number,column)
                    return false;
                  }
              }
          }
      }
    }
    for (let column = 0; column < 9; column++) {
      for (let number = 1; number <= 9; number++) {
        let found = false;
          for (let row = 0; row < 9; row++) {
              if (board[row][column] == number) {
                if (found==false) {
                  found = true;
                }
                else {
                  return false;
                }
              }	
            }
      }
    }
    for (let room = 1; room <= 9; room++) {
      for (let number = 1; number <= 9; number++) {
        let found = false;
          for (let row = Math.floor((room - 1) / 3) * 3; row <= Math.floor((room - 1) / 3) * 3 + 2; row++) {
              for (let column = (room - 1) % 3 * 3; column <= (room - 1) % 3 * 3 + 2; column++) {

                  if (board[row][column] == number) {
                    if (found==false) {
                      found = true;
                    }
                    else {
                      return false;
                    }
                  }

              }
          }

      }
    }

    return true;
}

let solutionFound = function (board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return false;           //0 still exists
            }
        }
    }
    return true;
}

export default function solveSudoku(board) {
    //console.log("initial", board)
    let remaining = [
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]]];
    updateRemaining(board, remaining);

    //solve till sln found 
    do {
        //余数法/唯一法&&排除法
        let boardChanged = false;
        do {
            boardChanged = false;
            //余数法/唯一法
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (remaining[i][j].length == 1) {
                        //console.log(i,j);
                        board[i][j] = remaining[i][j][0];
                        boardChanged = true;
                    }
                }
            }
            updateRemaining(board, remaining);

            //行排除法
            for (let row = 0; row < 9; row++) {
                for (let number = 1; number <= 9; number++) {
                    let foundLocation = [];
                    for (let column = 0; column < 9; column++) {
                        if (board[row][column] == number) {
                            foundLocation = [];
                            break;
                        }	//这一行已经有number这个数字了
                        if (remaining[row][column].indexOf(number) != -1) {
                            foundLocation.push([row, column]);
                        }
                    }
                    if (foundLocation.length == 1) {				//这一行中只有唯一的地方可以填number，行排除法有效
                        board[foundLocation[0][0]][foundLocation[0][1]] = number;
                        boardChanged = true;
                    }
                }
            }
            updateRemaining(board, remaining);

            //列排除法
            for (let column = 0; column < 9; column++) {
                for (let number = 1; number <= 9; number++) {
                    let foundLocation = [];
                    for (let row = 0; row < 9; row++) {
                        if (board[row][column] == number) {
                            foundLocation = [];
                            break;
                        }	//这一行已经有number这个数字了
                        if (remaining[row][column].indexOf(number) != -1) {
                            foundLocation.push([row, column]);
                        }
                    }
                    //console.log(foundLocation)
                    if (foundLocation.length == 1) {				//这一列中只有唯一的地方可以填number，列排除法有效
                        board[foundLocation[0][0]][foundLocation[0][1]] = number;
                        boardChanged = true;
                    }
                }
            }
            updateRemaining(board, remaining);

            //宫排除法
            for (let room = 1; room <= 9; room++) {
                for (let number = 1; number <= 9; number++) {
                    let foundLocation = [];
                    for (let row = Math.floor((room - 1) / 3) * 3; row <= Math.floor((room - 1) / 3) * 3 + 2; row++) {
                        for (let column = (room - 1) % 3 * 3; column <= (room - 1) % 3 * 3 + 2; column++) {
                            //console.log(room, row, column)
                            if (board[row][column] == number) {
                                foundLocation = [];
                                break;
                            }	//这一宫已经有number这个数字了
                            if (remaining[row][column].indexOf(number) != -1) {
                                foundLocation.push([row, column]);
                                //console.log(room, number, row, column)
                            }
                        }
                    }
                    if (foundLocation.length == 1) {				//这一宫中只有唯一的地方可以填number，宫排除法有效
                        board[foundLocation[0][0]][foundLocation[0][1]] = number;
                        boardChanged = true;
                    }
                }
            }
            updateRemaining(board, remaining);
        } while (boardChanged);

        //check if solution exists
        updateRemaining(board, remaining);
        if (!solutionMayExist(board,remaining)) return false;
        //console.log(board)
        //need assumption
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] == 0) {
                    updateRemaining(board, remaining);
                    let list = remaining[i][j];
                    //console.log("assumption", i + 1, j + 1, list);
                    if (i==1&&j==0){
                      //console.log("assumption on 1 0", i + 1, j + 1, list);
                    }
                    if (list.length == 0) return false;
                    for (let index = 0; index < list.length; index++) {
                        let boardCopy = JSON.parse(JSON.stringify(board));	     
                        boardCopy[i][j] = list[index]
                        if (i==1&&j==0){
                          //console.log("assumption on 1 0", i + 1, j + 1, list[index],boardCopy);
                        }
                        //updateRemaining(board, remaining);
                        //console.log(i + 1, j + 1, list, index, newboard)
                        boardCopy=solveSudoku(boardCopy)
                        if (boardCopy) {
                            //console.log("bingo")
                            //console.log("solved")
                            //console.log("beforesolve", boardCopy)
                            //boardCopy=solveSudoku(boardCopy)
                            //console.log("aftersolve",boardCopy)
                            return boardCopy;
                        }
                        
                    }
                    return false;
                }
            }
        }

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                updateRemaining(board, remaining);
                if (board[i][j] == 0 && remaining[i][j].length == 0) {
                    return false
                }
                if (board[i][j] == 0 && remaining[i][j].length != 0) {
                    let list = remaining[i][j];
                    for (let index = 0; index < list.length; index++) {
                        let newboard = board;
                        newboard[i][j] = list[index]
                        if (solveSudoku(newboard)) {
                            board[i][j] = list[index]
                            break;
                        }

                    }
                }
            }
        }



    } while (!solutionFound);
    //console.log("return true")
    return board;
}

console.log(solveSudoku(board4));