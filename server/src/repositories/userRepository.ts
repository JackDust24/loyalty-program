import { rpcTransaction, runTransaction } from '../db/transactions';
import { comparePasswords, hashPassword } from '../utils/helpers';
import { UserInsert, UserUpdate } from '../utils/types';
import { supabase } from '../db/client';

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../db/database.types';

// Private helper functions (only visible in this file) TODO
async function getUserRoleId(
  client: SupabaseClient<Database>,
  roleName: string
) {
  const { data: role, error } = await client
    .from('roles')
    .select('role_id')
    .eq('name', roleName)
    .single();

  if (error || !role) throw new Error(`Role ${roleName} not found`);
  return role.role_id;
}

async function verifyUserPassword(
  client: SupabaseClient<Database>,
  userId: string,
  plainTextPassword: string
) {
  const { data: user, error } = await client
    .from('users')
    .select('password_hash')
    .eq('user_id', userId)
    .single();

  if (error) throw new Error('User not found');
  const isMatch = await comparePasswords(plainTextPassword, user.password_hash);
  if (!isMatch) throw new Error('Invalid current password');
}

export const createUserRepository = (
  client: SupabaseClient<Database>,
  hashUtil: {
    hash: (pw: string) => Promise<string>;
    compare: (plain: string, hash: string) => Promise<boolean>;
  }
) => ({
  saveUser: async (user: UserInsert) => {
    try {
      const { data, error } = await client.rpc('create_user_with_role', {
        p_email: user.email,
        p_password_hash: user.password_hash,
        p_is_active: user.is_active ?? true,
        p_role_name: 'user',
      });

      if (error) {
        console.error('Error:', error);
        if (error.hint === 'USER_ALREADY_EXISTS') {
          console.error('User already exists');
          throw new Error('Email already taken');
        }

        if (error.message.includes('USER_ALREADY_EXISTS')) {
          throw new Error('Email already taken');
        }
        if (error.message.includes('ROLE_NOT_FOUND')) {
          throw new Error('Role does not exist');
        }

        throw new Error('Failed to register user');
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  findUserById: async (userId: string) => {
    const { data: user, error } = await client
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw new Error('User not found');
    return user;
  },

  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    await verifyUserPassword(client, userId, currentPassword);

    const newPasswordHash = await hashUtil.hash(newPassword);

    const { error } = await client
      .from('users')
      .update({ password_hash: newPasswordHash })
      .eq('user_id', userId);

    if (error) throw new Error('Password update failed');
  },
});

export const userRepository = createUserRepository(supabase, {
  hash: hashPassword,
  compare: comparePasswords,
});
