import { Database } from '../db/database.types';

type UserRequest = {
  email: string;
  password: string;
};

type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];
type UserRow = Database['public']['Tables']['users']['Row'];
type UserGet = Omit<UserRow, 'password_hash'>;

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileGet = Database['public']['Tables']['profiles']['Row'];

export {
  UserRequest,
  UserInsert,
  UserGet,
  ProfileInsert,
  ProfileGet,
  UserUpdate,
};

export type UserWithRole = {
  user_id: string;
  email: string;
  password_hash: string;
  user_roles: {
    roles: {
      name: string;
    };
  }[];
};
