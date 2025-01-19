import React from 'react';
import {StyleSheet, View} from 'react-native/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {playbackService} from '../../musicPlayerServices';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {Pressable} from 'react-native';

export default function ControlCenter() {
  const playBackState = usePlaybackState();

  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  // previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  // play/pause toggle
  const togglePlayback = async (playback: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playback === State.Paused || playback === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable
        onPress={() => {
          if (playBackState.state !== undefined) {
            togglePlayback(playBackState.state);
          }
        }}>
        <Icon
          style={styles.icon}
          name={playBackState.state === State.Playing ? 'pause' : 'play-arrow'}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});
