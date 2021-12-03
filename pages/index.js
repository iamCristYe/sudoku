import React from 'react';
import Head from 'next/head'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import solveSudoku from '../lib/sudoku'



export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]],

      isUserInput: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]],


      focus: [4, 4],



      color: [],

      variant: [],
    }
    this.state.color = this.updatedColor();
    this.state.variant = this.updatedVariant();
  }

  updatedColor = () => {
    let color = [];
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        if (i == this.state.focus[0] && j == this.state.focus[1]) {
          temp.push("success")
        }
        else {
          temp.push("")
        }
      }
      color.push(temp)
    }
    return color
  }

  updatedVariant = () => {
    let variant = [];
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        if (i == this.state.focus[0] && j == this.state.focus[1]) {
          console.log(this.state.focus)
          temp.push("contained")
        }
        else {
          temp.push("")
        }
      }
      variant.push(temp)
    }
    return variant
  }


  refresh = () => {
    console.log(this.state.board)

    let boardToSolve = []
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        if (this.state.isUserInput[i][j] && this.state.board[i][j] > 0) {

          temp.push(this.state.board[i][j])
        }
        else {
          temp.push(0)
        }

      }
      boardToSolve.push(temp)
    }
    //console.log(boardToSolve, this.state.isUserInput)
    boardToSolve = solveSudoku(boardToSolve)
    //console.log(boardToSolve, this.state.isUserInput)
    if (boardToSolve) {
      for (let i = 0; i < 9; i++) {
        let temp = []
        for (let j = 0; j < 9; j++) {
          if (!this.state.isUserInput[i][j]) {
            boardToSolve[i][j] = String.fromCodePoint(parseInt(boardToSolve[i][j] +9311))
           // ①②③④⑤⑥⑦⑧⑨
          }


        }

      }
      this.setState({ board: boardToSolve });
    }

    this.setState({ color: this.updatedColor() });

    this.setState({ variant: this.updatedVariant() });

  }





  handleKeyDown = (event) => {
    event = event || window.event;
    console.log(event.key)
    if (event.key == "ArrowUp") {
      this.state.focus[0]--
      if (this.state.focus[0] <= 0) {
        this.state.focus[0] = 0
      }

    }
    if (event.key == "ArrowDown") {
      this.state.focus[0]++
      if (this.state.focus[0] >= 8) {
        this.state.focus[0] = 8
      }
    }
    if (event.key == "ArrowLeft") {
      this.state.focus[1]--
      if (this.state.focus[1] <= 0) {
        this.state.focus[1] = 0
      }
    }
    if (event.key == "ArrowRight") {
      this.state.focus[1]++
      if (this.state.focus[1] >= 8) {
        this.state.focus[1] = 8
      }
    }
    console.log(event.keyCode)
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      this.state.board[this.state.focus[0]][this.state.focus[1]] = event.keyCode - 48;
      this.state.isUserInput[this.state.focus[0]][this.state.focus[1]] = 1
    }

    this.refresh()
  }

  handleChange = (event) => {

    this.refresh()

  }


  render() {
    return (
      <div className="container" onKeyDown={this.handleKeyDown} onChange={this.handleChange}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[0][0]} variant={this.state.variant[0][0]}>{this.state.board[0][0]}</Button>
            <Button color={this.state.color[0][1]} variant={this.state.variant[0][1]}>{this.state.board[0][1]}</Button>
            <Button color={this.state.color[0][2]} variant={this.state.variant[0][2]}>{this.state.board[0][2]}</Button>
            <Button color={this.state.color[0][3]} variant={this.state.variant[0][3]}>{this.state.board[0][3]}</Button>
            <Button color={this.state.color[0][4]} variant={this.state.variant[0][4]}>{this.state.board[0][4]}</Button>
            <Button color={this.state.color[0][5]} variant={this.state.variant[0][5]}>{this.state.board[0][5]}</Button>
            <Button color={this.state.color[0][6]} variant={this.state.variant[0][6]}>{this.state.board[0][6]}</Button>
            <Button color={this.state.color[0][7]} variant={this.state.variant[0][7]}>{this.state.board[0][7]}</Button>
            <Button color={this.state.color[0][8]} variant={this.state.variant[0][8]}>{this.state.board[0][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[1][0]} variant={this.state.variant[1][0]}>{this.state.board[1][0]}</Button>
            <Button color={this.state.color[1][1]} variant={this.state.variant[1][1]}>{this.state.board[1][1]}</Button>
            <Button color={this.state.color[1][2]} variant={this.state.variant[1][2]}>{this.state.board[1][2]}</Button>
            <Button color={this.state.color[1][3]} variant={this.state.variant[1][3]}>{this.state.board[1][3]}</Button>
            <Button color={this.state.color[1][4]} variant={this.state.variant[1][4]}>{this.state.board[1][4]}</Button>
            <Button color={this.state.color[1][5]} variant={this.state.variant[1][5]}>{this.state.board[1][5]}</Button>
            <Button color={this.state.color[1][6]} variant={this.state.variant[1][6]}>{this.state.board[1][6]}</Button>
            <Button color={this.state.color[1][7]} variant={this.state.variant[1][7]}>{this.state.board[1][7]}</Button>
            <Button color={this.state.color[1][8]} variant={this.state.variant[1][8]}>{this.state.board[1][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[2][0]} variant={this.state.variant[2][0]}>{this.state.board[2][0]}</Button>
            <Button color={this.state.color[2][1]} variant={this.state.variant[2][1]}>{this.state.board[2][1]}</Button>
            <Button color={this.state.color[2][2]} variant={this.state.variant[2][2]}>{this.state.board[2][2]}</Button>
            <Button color={this.state.color[2][3]} variant={this.state.variant[2][3]}>{this.state.board[2][3]}</Button>
            <Button color={this.state.color[2][4]} variant={this.state.variant[2][4]}>{this.state.board[2][4]}</Button>
            <Button color={this.state.color[2][5]} variant={this.state.variant[2][5]}>{this.state.board[2][5]}</Button>
            <Button color={this.state.color[2][6]} variant={this.state.variant[2][6]}>{this.state.board[2][6]}</Button>
            <Button color={this.state.color[2][7]} variant={this.state.variant[2][7]}>{this.state.board[2][7]}</Button>
            <Button color={this.state.color[2][8]} variant={this.state.variant[2][8]}>{this.state.board[2][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[3][0]} variant={this.state.variant[3][0]}>{this.state.board[3][0]}</Button>
            <Button color={this.state.color[3][1]} variant={this.state.variant[3][1]}>{this.state.board[3][1]}</Button>
            <Button color={this.state.color[3][2]} variant={this.state.variant[3][2]}>{this.state.board[3][2]}</Button>
            <Button color={this.state.color[3][3]} variant={this.state.variant[3][3]}>{this.state.board[3][3]}</Button>
            <Button color={this.state.color[3][4]} variant={this.state.variant[3][4]}>{this.state.board[3][4]}</Button>
            <Button color={this.state.color[3][5]} variant={this.state.variant[3][5]}>{this.state.board[3][5]}</Button>
            <Button color={this.state.color[3][6]} variant={this.state.variant[3][6]}>{this.state.board[3][6]}</Button>
            <Button color={this.state.color[3][7]} variant={this.state.variant[3][7]}>{this.state.board[3][7]}</Button>
            <Button color={this.state.color[3][8]} variant={this.state.variant[3][8]}>{this.state.board[3][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[4][0]} variant={this.state.variant[4][0]}>{this.state.board[4][0]}</Button>
            <Button color={this.state.color[4][1]} variant={this.state.variant[4][1]}>{this.state.board[4][1]}</Button>
            <Button color={this.state.color[4][2]} variant={this.state.variant[4][2]}>{this.state.board[4][2]}</Button>
            <Button color={this.state.color[4][3]} variant={this.state.variant[4][3]}>{this.state.board[4][3]}</Button>
            <Button color={this.state.color[4][4]} variant={this.state.variant[4][4]}>{this.state.board[4][4]}</Button>
            <Button color={this.state.color[4][5]} variant={this.state.variant[4][5]}>{this.state.board[4][5]}</Button>
            <Button color={this.state.color[4][6]} variant={this.state.variant[4][6]}>{this.state.board[4][6]}</Button>
            <Button color={this.state.color[4][7]} variant={this.state.variant[4][7]}>{this.state.board[4][7]}</Button>
            <Button color={this.state.color[4][8]} variant={this.state.variant[4][8]}>{this.state.board[4][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[5][0]} variant={this.state.variant[5][0]}>{this.state.board[5][0]}</Button>
            <Button color={this.state.color[5][1]} variant={this.state.variant[5][1]}>{this.state.board[5][1]}</Button>
            <Button color={this.state.color[5][2]} variant={this.state.variant[5][2]}>{this.state.board[5][2]}</Button>
            <Button color={this.state.color[5][3]} variant={this.state.variant[5][3]}>{this.state.board[5][3]}</Button>
            <Button color={this.state.color[5][4]} variant={this.state.variant[5][4]}>{this.state.board[5][4]}</Button>
            <Button color={this.state.color[5][5]} variant={this.state.variant[5][5]}>{this.state.board[5][5]}</Button>
            <Button color={this.state.color[5][6]} variant={this.state.variant[5][6]}>{this.state.board[5][6]}</Button>
            <Button color={this.state.color[5][7]} variant={this.state.variant[5][7]}>{this.state.board[5][7]}</Button>
            <Button color={this.state.color[5][8]} variant={this.state.variant[5][8]}>{this.state.board[5][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[6][0]} variant={this.state.variant[6][0]}>{this.state.board[6][0]}</Button>
            <Button color={this.state.color[6][1]} variant={this.state.variant[6][1]}>{this.state.board[6][1]}</Button>
            <Button color={this.state.color[6][2]} variant={this.state.variant[6][2]}>{this.state.board[6][2]}</Button>
            <Button color={this.state.color[6][3]} variant={this.state.variant[6][3]}>{this.state.board[6][3]}</Button>
            <Button color={this.state.color[6][4]} variant={this.state.variant[6][4]}>{this.state.board[6][4]}</Button>
            <Button color={this.state.color[6][5]} variant={this.state.variant[6][5]}>{this.state.board[6][5]}</Button>
            <Button color={this.state.color[6][6]} variant={this.state.variant[6][6]}>{this.state.board[6][6]}</Button>
            <Button color={this.state.color[6][7]} variant={this.state.variant[6][7]}>{this.state.board[6][7]}</Button>
            <Button color={this.state.color[6][8]} variant={this.state.variant[6][8]}>{this.state.board[6][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[7][0]} variant={this.state.variant[7][0]}>{this.state.board[7][0]}</Button>
            <Button color={this.state.color[7][1]} variant={this.state.variant[7][1]}>{this.state.board[7][1]}</Button>
            <Button color={this.state.color[7][2]} variant={this.state.variant[7][2]}>{this.state.board[7][2]}</Button>
            <Button color={this.state.color[7][3]} variant={this.state.variant[7][3]}>{this.state.board[7][3]}</Button>
            <Button color={this.state.color[7][4]} variant={this.state.variant[7][4]}>{this.state.board[7][4]}</Button>
            <Button color={this.state.color[7][5]} variant={this.state.variant[7][5]}>{this.state.board[7][5]}</Button>
            <Button color={this.state.color[7][6]} variant={this.state.variant[7][6]}>{this.state.board[7][6]}</Button>
            <Button color={this.state.color[7][7]} variant={this.state.variant[7][7]}>{this.state.board[7][7]}</Button>
            <Button color={this.state.color[7][8]} variant={this.state.variant[7][8]}>{this.state.board[7][8]}</Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color={this.state.color[8][0]} variant={this.state.variant[8][0]}>{this.state.board[8][0]}</Button>
            <Button color={this.state.color[8][1]} variant={this.state.variant[8][1]}>{this.state.board[8][1]}</Button>
            <Button color={this.state.color[8][2]} variant={this.state.variant[8][2]}>{this.state.board[8][2]}</Button>
            <Button color={this.state.color[8][3]} variant={this.state.variant[8][3]}>{this.state.board[8][3]}</Button>
            <Button color={this.state.color[8][4]} variant={this.state.variant[8][4]}>{this.state.board[8][4]}</Button>
            <Button color={this.state.color[8][5]} variant={this.state.variant[8][5]}>{this.state.board[8][5]}</Button>
            <Button color={this.state.color[8][6]} variant={this.state.variant[8][6]}>{this.state.board[8][6]}</Button>
            <Button color={this.state.color[8][7]} variant={this.state.variant[8][7]}>{this.state.board[8][7]}</Button>
            <Button color={this.state.color[8][8]} variant={this.state.variant[8][8]}>{this.state.board[8][8]}</Button>
          </ButtonGroup>

        </main>


        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </div>
    )
  }
}
