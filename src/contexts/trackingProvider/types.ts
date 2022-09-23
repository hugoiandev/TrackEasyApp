type PackageEventType = {
  codigo: string;
  descricao: string;
  dtHrCriado: string;
  tipo: string;
  unidade: { codSro: string; endereco: {}; nome: string; tipo: string };
  urlIcone: string;
};

type PostalType = {
  categoria: string;
  descricao: string;
  sigla: string;
};

type PackageListType = {
  codObjeto: string;
  eventos: PackageEventType[];
  modalidade: string;
  tipoPostal: PostalType;
  mensagem?: string;
};

export default interface ITrackingProvider {
  packageListState: {
    loading: boolean;
    packages?: PackageListType[];
  };
  trackPackage: (packageInfo: {
    description: string;
    trackingCode: string;
  }) => Promise<void>;
}

export type { PackageEventType, PostalType, PackageListType };
