/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import Input from '../../components/TextInput';
import Button from '../../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { TrackingContext } from '../../contexts/trackingProvider';

type FormData = {
  description: string;
  trackingCode: string;
};

const Add = (): JSX.Element => {
  const { trackPackage } = useContext(TrackingContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: '',
      trackingCode: '',
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 15,
        height: '100%',
        backgroundColor: '#fff8a9',
      }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Input
              label="Descrição"
              placeholder="Ex: Roupa de praia"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.description}
              errorMessage="Campo obrigatório"
            />
          );
        }}
        name="description"
      />
      <Controller
        control={control}
        rules={{ required: true, maxLength: 13, minLength: 13 }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Input
              label="Código de rastreio"
              placeholder="Ex: AA123456789BR"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.trackingCode}
              errorMessage="No minimo 13 caracteres"
              upperCase={true}
              maxLength={13}
            />
          );
        }}
        name="trackingCode"
      />
      <Button onPress={handleSubmit(trackPackage)}>
        <Text style={{ fontSize: 15, color: '#ffffff' }}>Salvar encomenda</Text>
      </Button>
    </ScrollView>
  );
};

export default Add;
