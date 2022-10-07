import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

interface IListItemProps {
  backgroundColor?: string;
  imgSource?: string;
  description?: string;
  codObjeto?: string;
  statusText?: string;
  locationText?: string;
  uf?: string;
}

const ListItem = ({
  backgroundColor = '#ffed24',
  imgSource,
  description,
  codObjeto,
  statusText,
  locationText,
  uf,
}: IListItemProps) => {
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <Image
        resizeMode="cover"
        style={styles.itemImg}
        source={{ uri: `https://proxyapp.correios.com.br${imgSource}` }}
      />
      <View>
        <Text style={styles.listText}>{description}</Text>
        <Text style={styles.trackCodeText}>{codObjeto}</Text>
        <Text style={styles.statusText}>{statusText}</Text>
        <Text style={styles.locationText}>{locationText}</Text>
        <Text style={styles.locationText}>{uf}</Text>
      </View>
    </View>
  );
};

export default ListItem;
