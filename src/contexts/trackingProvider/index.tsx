import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import ITrackingProvider, { PackageListType } from './types';
import { rastrearEncomendas } from 'correios-brasil';

export const TrackingContext = createContext({} as ITrackingProvider);

interface ITrackingProviderProps {
  children: React.ReactNode;
}

const TrackingProvider = ({ children }: ITrackingProviderProps) => {
  const [packageListState, setPackageListState] = useState<{
    loading: boolean;
    packages?: PackageListType[];
  }>({ loading: false });

  const trackPackage = useCallback(
    async (packageInfo: { description: string; trackingCode: string }) => {
      const { trackingCode } = packageInfo;

      try {
        setPackageListState({ ...packageListState, loading: true });
        const packages: PackageListType[] = await rastrearEncomendas([
          trackingCode,
        ]);

        if (packages[0]?.mensagem) {
          Alert.alert(
            'Objeto não encontrado',
            `${packages[0]?.mensagem} deseja adicionar mesmo assim ?`,
            [
              {
                text: 'Sim',
              },
              {
                text: 'Não',
              },
            ],
          );
        } else {
          setPackageListState({
            ...packageListState,
            loading: false,
            packages,
          });
        }
      } catch (error) {
        setPackageListState({ ...packageListState, loading: false });
        Alert.alert('Erro', 'Ocorreu um erro na busca', [
          {
            text: 'OK',
          },
        ]);
      } finally {
        setPackageListState({ ...packageListState, loading: false });
      }
    },
    [packageListState],
  );

  const value = useMemo(() => {
    return {
      trackPackage,
      packageListState,
    };
  }, [trackPackage, packageListState]);

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
};

export default TrackingProvider;
