# Realm ou SQLite

Projeto react native de exemplo que implementa realm e sqlite.

## Objetivo

Objetivo é analisar a diferença de performance entre esses dois bancos usados para o desenvolvimento mobile.

### Simulações

O primeiro gif é utilizando o banco realm e o outro o sqlite, carregando os mesmos dados com a mesma quantidade de 10.000 registros.

#### Realm

Estrutura utilizada no banco.

```js
export default class Cliente {
  static schema = {
    name: 'Cliente',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      nome: 'string',
      email: 'string',
      cpf: 'string',
      rg: 'string',
      pais: 'string',
    },
  };
}
```

Criação do schema, inserção e consulta dos 10.000 "clientes"
Tempo aproximado: 1,1 segundos

![realmInsert](realmInsert.gif)

Apenas a consulta
Tempo aproximado: 0,3 segundos

![realm](realm.gif)

#### SQLite

Estrutura utilizada no banco.

```sql
CREATE TABLE IF NOT EXISTS CLIENTE (ID INTEGER PRIMARY KEY,
        NOME  VARCHAR(80),
        EMAIL  VARCHAR(80),
        CPF  VARCHAR(80),
        RG  VARCHAR(80),
        PAIS  VARCHAR(80))
```

Criação da tabela, inserção e consulta dos 10.000 "clientes"
Tempo aproximado: 10,2 segundos

![sqliteInsert](sqliteInsert.gif)

Apenas a consulta
Tempo aproximado: 3,0 segundos

![sqlite](sqlite.gif)

## Conclução

Com base nesses testes podemos concluir que o banco realm é 10X mais rápido que o SQLite independente se tem inserts ou não.

Se sua aplicação necessita de velocidade em suas consultas, que os dados sejam entregues rapidamente talvez o SQLite não seja uma boa escolha.

## Como começar

Primeiramente é necessário fazer o clone do repositório, e seguir as
instruções de instalação.

### Instalação

Ao fazer o clone do projeto realize as instalações seguintes.

Para instalar as dependências do projeto execute no prompt de comando

```sh
npm install
```

Defina o qual o banco que irá carregar os registros de teste.

```js
// index.js
import { AppRegistry } from 'react-native';
import App from './src/Main/realm'; // Defina o banco de entrada
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

### Links de documentações

- [React Native Database – Choosing the right database for your React Native app](https://www.simform.com/react-native-database-selection-guide/)
- [Realm](https://realm.io/docs/javascript/latest/)
- [SQLite](https://github.com/andpor/react-native-sqlite-storage)
