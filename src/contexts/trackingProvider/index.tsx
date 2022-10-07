import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import ITrackingProvider, { PackageListType } from './types';
import { rastrearEncomendas } from 'correios-brasil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const TrackingContext = createContext({} as ITrackingProvider);

interface ITrackingProviderProps {
  children: React.ReactNode;
}

type Navigate = {
  navigate: (route: string) => void;
};

const TrackingProvider = ({ children }: ITrackingProviderProps) => {
  const [packageState, setPackageState] = useState<{
    loading: boolean;
    packages?: PackageListType[];
  }>({ loading: false });

  const [packagesListState, setPackagesListState] = useState<{
    loading: boolean;
    packages: PackageListType[];
  }>({ loading: false, packages: [] });

  const { navigate } = useNavigation<Navigate>();

  const getAllPackages = useCallback(async () => {
    setPackagesListState({ ...packagesListState, loading: true });
    const allPackages = await AsyncStorage.getItem('packages');
    console.log(allPackages);
    if (allPackages) {
      setPackagesListState({
        ...packagesListState,
        packages: JSON.parse(allPackages),
      });
    }
  }, [packagesListState]);

  const savePackage = useCallback(
    async (title: string, trackingPackage: PackageListType) => {
      const savedPackages = await AsyncStorage.getItem('packages');

      if (savedPackages) {
        const updatePackages: PackageListType[] = JSON.parse(savedPackages);

        if (
          updatePackages.some(
            item => item.codObjeto === trackingPackage.codObjeto,
          )
        ) {
          Alert.alert(
            'Código de rastreio existente',
            'O código de rastreio já está cadastrado.',
            [
              {
                text: 'OK',
              },
            ],
          );
        } else {
          updatePackages.push({ ...trackingPackage, descricao: title });
          await AsyncStorage.setItem(
            'packages',
            JSON.stringify(updatePackages),
          );
          getAllPackages();
          navigate('Em curso');
        }
      } else {
        await AsyncStorage.setItem(
          'packages',
          JSON.stringify([{ ...trackingPackage, descricao: title }]),
        );
        getAllPackages();
        navigate('Em curso');
      }
    },
    [navigate, getAllPackages],
  );

  const trackPackage = useCallback(
    async (packageInfo: { description: string; trackingCode: string }) => {
      const { trackingCode } = packageInfo;

      try {
        setPackageState({ ...packageState, loading: true });
        const packages: PackageListType[] = await rastrearEncomendas([
          trackingCode,
        ]);

        if (packages[0]?.mensagem) {
          Alert.alert(
            'Objeto não encontrado',
            `${packages[0]?.mensagem} deseja salvar mesmo assim ?`,
            [
              {
                text: 'Sim',
                onPress: () =>
                  savePackage(packageInfo.description, packages[0]),
              },
              {
                text: 'Não',
              },
            ],
          );
        } else {
          Alert.alert(
            'Objeto encontrado',
            `${packages[0].codObjeto} encontrado deseja salvar ?`,
            [
              {
                text: 'Sim',
                onPress: () =>
                  savePackage(packageInfo.description, packages[0]),
              },
              {
                text: 'Não',
              },
            ],
          );
          setPackageState({
            ...packageState,
            loading: false,
            packages,
          });
        }
      } catch (error) {
        setPackageState({ ...packageState, loading: false });
        Alert.alert('Erro', 'Ocorreu um erro na busca', [
          {
            text: 'OK',
          },
        ]);
      } finally {
        setPackageState({ ...packageState, loading: false });
      }
    },
    [packageState, savePackage],
  );

  // const trackAllPackages = useCallback(async () => {}, []);

  const value = useMemo(() => {
    return {
      trackPackage,
      packageState,
      getAllPackages,
      packagesListState,
    };
  }, [trackPackage, packageState, getAllPackages, packagesListState]);

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingProvider;
