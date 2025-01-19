import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({track}: SongInfoProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.container}>{track?.title}</Text>
        <Text style={styles.container}>
          {track?.artist} . {track?.album}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
