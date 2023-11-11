import IDataWithId from "../components/infiniteScroll/types/IDataWithId";

export default interface IPerson extends IDataWithId {
  firstName: string;
  age: number;
}
