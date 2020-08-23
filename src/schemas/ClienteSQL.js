import { openDatabase, enablePromise } from 'react-native-sqlite-storage';
var conexao = openDatabase({ name: 'file.db', location: 'default' });
enablePromise(true);
export default {
  get: async () => {
    return (await conexao.executeSql('SELECT * FROM CLIENTE'))[0].rows.raw();
  },
  set: (nome, email, cpf, rg, pais, quantREG) => {
    conexao.transaction((tx) => {
      for (let i = 0; i < quantREG; i++) {
        tx.executeSql(' \
        INSERT INTO CLIENTE VALUES(?, ?, ?, ?, ?, ?) \
         ', [
          i,
          nome,
          email,
          cpf,
          rg,
          pais,
        ]);
      }
    });
  },
  create: () => {
    conexao.executeSql(
      'CREATE TABLE IF NOT EXISTS CLIENTE (ID INTEGER PRIMARY KEY, \
        NOME  VARCHAR(80), \
        EMAIL  VARCHAR(80), \
        CPF  VARCHAR(80), \
        RG  VARCHAR(80), \
        PAIS  VARCHAR(80))',
    );
  },
};
