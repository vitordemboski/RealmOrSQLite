import Realm from 'realm';
import Cliente from '../schemas/Cliente';

export default getRealm = () => {
  return Realm.open({
    schema: [Cliente],
  });
};
