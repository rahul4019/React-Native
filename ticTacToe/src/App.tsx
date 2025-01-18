import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';
import {FlatList} from 'react-native';
import {Pressable} from 'react-native';

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

    const isDraw = board.flat().every(cell => cell !== null);
    if (isDraw) {
      setGameWinner('Its a Draw...⌛');
    }
  };

  const onChangeItem = (rowNum: number, colNum: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    if (board[rowNum][colNum] === null) {
      board[rowNum][colNum] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#ffffff',
      });
    }

    isWinner();
  };

  const boardData = [
    {row: 0, col: 0},
    {row: 0, col: 1},
    {row: 0, col: 2},
    {row: 1, col: 0},
    {row: 1, col: 1},
    {row: 1, col: 2},
    {row: 2, col: 0},
    {row: 2, col: 1},
    {row: 2, col: 2},
  ];

  return (
    <SafeAreaView>
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Text style={styles.gameTurnTxt}>
            Player{isCross ? ' X' : ' O'}'s Turn
          </Text>
        </View>
      )}
      {/*Game Board*/}
      <FlatList
        data={boardData}
        numColumns={3}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(item.row, item.col)}>
            <Icons name={board[item.row][item.col]} />
          </Pressable>
        )}
      />

      {/* game reset */}
      <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'Reload the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
export default App;
