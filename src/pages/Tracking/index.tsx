import React, { useEffect, useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem';
import { TrackingContext } from '../../contexts/trackingProvider';
import NoTrack from '../../components/NoTrack';

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 5,
  },
});

const Tracking = () => {
  const { getAllPackages, packagesListState } = useContext(TrackingContext);

  useEffect(() => {
    getAllPackages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {packagesListState.packages.map(({ codObjeto, descricao, eventos }) => {
        if (eventos && eventos[0].codigo !== 'BDE') {
          return (
            <ListItem
              key={codObjeto}
              description={descricao}
              codObjeto={codObjeto}
              imgSource={eventos && eventos[0].urlIcone}
              statusText={eventos && eventos[0].descricao}
              locationText={
                eventos &&
                `${eventos[0].unidade.endereco?.cidade}/${eventos[0].unidade.endereco?.uf}`
              }
            />
          );
        } else {
          return (
            <NoTrack
              title="Não há rastreios em andamento."
              iconName="error-outline"
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default Tracking;
