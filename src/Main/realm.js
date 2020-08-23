import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import getRealm from '../services/realm';
import moment from 'moment';

const Main = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const load = async () => {
      const data = moment();
      const realm = await getRealm();
      const clientes = realm.objects('Cliente');
      if (clientes.length === 0) {
        realm.write(() => {
          for (let i = 0; i < 10000; i++) {
            realm.create('Cliente', {
              id: i,
              nome: 'TEXTO NOME',
              email: 'TEXTO EMAIL@gmail.com',
              cpf: '1561651123',
              rg: '5156156156',
              pais: 'BRASIL',
            });
          }
        });
      }
      setClientes(clientes);
      setLoading(false);
      setMilliseconds(moment().diff(data, 'milliseconds'));
    };
    load();
  }, []);
  return (
    <View>
      {loading ? (
        <ActivityIndicator color="#000" style={{ flex: 1 }} size={30} />
      ) : (
        <>
          <Text style={{ alignSelf: 'center', fontSize: 17 }}>
            {milliseconds} milliseconds ou {parseFloat(milliseconds / 1000).toFixed(1)} segundos
          </Text>
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 20 }}>
                  <Text>{item.id}</Text>
                  <Text>{item.nome}</Text>
                  <Text>{item.email}</Text>
                  <Text>{item.cpf}</Text>
                  <Text>{item.rg}</Text>
                  <Text>{item.pais}</Text>
                </View>
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default Main;
