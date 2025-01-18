import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [board, setBoard] = useState(
    Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
  );

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
    );
  };

  const isWinner = () => {
    // row wise winner check
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== null
      ) {
        setGameWinner(`Player ${board[i][0]} has won the game! 🥳`);
      }
    }
    // column wise wnner check
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        setGameWinner(`Player ${board[0][i]} has won the game! 🥳`);
      }
    }
    // diagonal check
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== null
    ) {
      setGameWinner(`Player ${board[0][0]} has won the game! 🥳`);
    }

    // anti diagonal check
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== null
    ) {
      setGameWinner(`Player ${board[0][2]} has won the game! 🥳`);
    }

    const isDraw = board.map(arr => arr.includes(null));
    if (isDraw) {
      setGameWinner('Its a Draw...⌛');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text>Hello world</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
