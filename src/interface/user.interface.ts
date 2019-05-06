export default interface IUser {
  id: string;
  roles: {
    admin?: boolean;
    property?: number[];
  };
}
