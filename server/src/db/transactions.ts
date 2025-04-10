/*
    This file will be for Transaction wrappers
*/

import { supabase } from './client';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

export async function runTransaction<T>(
  operations: (supabase: SupabaseClient) => Promise<T>
): Promise<T> {
  try {
    // Supabase doesn't have traditional transactions, so we use RPC
    // For multiple operations, consider wrapping in a PostgreSQL function
    const result = await operations(supabase);
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
}

export async function rpcTransaction<T>(
  functionName: string,
  args: Record<string, unknown>
): Promise<T> {
  const { data, error } = await supabase
    .rpc(functionName, args)
    .select()
    .single();

  if (error) throw error;
  return data as T;
}
