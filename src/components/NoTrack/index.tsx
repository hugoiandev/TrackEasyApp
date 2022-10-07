import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import styles from './styles';

interface INoTrackProps {
  title: string;
  iconName: string;
}

const NoTrack = ({ title, iconName }: INoTrackProps): JSX.Element => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Icon style={styles.icon} size={25} name={iconName} />
        <Text>{title}</Text>
      </View>
    </View>
  );
};

export default NoTrack;
