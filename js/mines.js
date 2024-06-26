'use strict'
console.log('firstConsoleCheck')

function createMinesOnBoard(board, mines, firstClickI, firstClickJ) {
  var minesOnBoard = 0
  while (minesOnBoard < mines) {
    var i = getRandomInt(0, gLevel.SIZE - 1)
    var j = getRandomInt(0, gLevel.SIZE - 1)

    if (i === firstClickI && j === firstClickJ) continue

    if (!board[i][j].isMine) {
      board[i][j].isMine = true
      minesOnBoard++
    }
  }
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (!board[i][j].isMine) {
        board[i][j].minesAroundCount = getMineNegsCount(i, j)
      }
    }
  }
}

function getMineNegsCount(cellI, cellJ) {
  var negsMinesCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue
      if (i === cellI && j === cellJ) continue
      if (gBoard[i][j].isMine) negsMinesCount++
    }
  }
  return negsMinesCount
}

function expandShown(board, cellI, cellJ) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= board[i].length) continue
      if (i === cellI && j === cellJ) continue
      var cell = board[i][j]
      if (!cell.isShown && !cell.isMarked) {
        cell.isShown = true
        gGame.shownCount++
        if (!cell.minesAroundCount) {
          expandShown(board, i, j)
        }
      }
    }
  }
}
