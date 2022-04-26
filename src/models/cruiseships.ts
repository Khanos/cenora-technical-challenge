import { v4 as uuidv4 } from 'uuid';
import { Cruise } from '../interfaces/Cruise';
const CruiseShips: Cruise[] = [];
export default {
  addData: (data: Cruise) => {
    data.id = uuidv4();
    return CruiseShips.push(data);
  },
  addBulkData: (data: Cruise[]) => {
    return CruiseShips.push(...data);
  },
  getData: () => {
    return CruiseShips;
  },
}