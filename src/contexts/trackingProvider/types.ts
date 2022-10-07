type AddressType = { cidade?: string; uf?: string };

type PackageEventType = {
  codigo: string;
  descricao: string;
  dtHrCriado: string;
  tipo: string;
  unidade: {
    codSro: string;
    endereco?: AddressType;
    nome: string;
    tipo: string;
  };
  urlIcone: string;
};

type PostalType = {
  categoria: string;
  descricao: string;
  sigla: string;
};

type PackageListType = {
  descricao: string;
  codObjeto: string;
  eventos?: PackageEventType[];
  modalidade: string;
  tipoPostal?: PostalType;
  mensagem?: string;
};

export default interface ITrackingProvider {
  packageState: {
    loading: boolean;
    packages?: PackageListType[];
  };
  trackPackage: (packageInfo: {
    description: string;
    trackingCode: string;
  }) => Promise<void>;
  getAllPackages: () => Promise<void>;
  packagesListState: { loading: boolean; packages: PackageListType[] };
}

export type { PackageEventType, PostalType, PackageListType };
