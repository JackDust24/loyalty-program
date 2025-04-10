/* Only run this if you want to seed the database with initial data. */

import { supabase } from './client';

export async function seedRoles() {
  // Check existing roles
  const { data, error } = await supabase
    .from('roles')
    .select('*', { count: 'exact' });

  if (error) throw error;

  if (data?.length === 0) {
    const { error: insertError } = await supabase.from('roles').insert([
      { name: 'admin', description: 'System administrator with full access' },
      {
        name: 'client',
        description: 'Business owner who creates loyalty programs',
      },
      {
        name: 'user',
        description: 'Customer who participates in loyalty programs',
      },
    ]);

    if (insertError) throw insertError;
    console.log('✅ Roles seeded.');
  } else {
    console.log('⚠️ Roles already exist, skipping seed.');
  }
}

seedRoles();
