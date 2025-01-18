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
        return `player ${board[i][0]} is winner!`;
      }
    }
    // column wise wnner check
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== null
      ) {
        return `player ${board[0][i]} is winner!`;
      }
    }
    // diagonal check
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== null
    ) {
      return `player ${board[0][0]} is winner!`;
    }

    // anti diagonal check
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== null
    ) {
      return `player ${board[0][2]} is winner!`;
    }
    return null;
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
