import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, Text } from 'react-native';
import Sqlite from '../schemas/ClienteSQL';
import moment from 'moment';

const Main = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const load = async () => {
      const data = moment();
      Sqlite.create();
      let clientes = await Sqlite.get();
      if (clientes.length === 0) {
        await Sqlite.set('TEXTO NOME', 'TEXTO EMAIL@gmail.com', '1561651123', '5156156156', 'BRASIL', 10000);
        clientes = await Sqlite.get();
      }
      setClientes(clientes);
      setLoading(false);
      setMilliseconds(moment().diff(data, 'milliseconds'));
    };
    load();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator color="#000" style={{ flex: 1 }} size={30} />
      ) : (
        <>
          <Text style={{ alignSelf: 'center', fontSize: 17 }}>
            {milliseconds} milliseconds ou {parseFloat(milliseconds / 1000).toFixed(1)} segundos
          </Text>
          <FlatList
            data={clientes}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 20 }}>
                  <Text>{item.ID}</Text>
                  <Text>{item.NOME}</Text>
                  <Text>{item.EMAIL}</Text>
                  <Text>{item.CPF}</Text>
                  <Text>{item.RG}</Text>
                  <Text>{item.PAIS}</Text>
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
