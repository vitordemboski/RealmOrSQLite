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
