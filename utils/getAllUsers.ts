import { supabase } from './supabaseClient'

export const getAllUsers = async () => {
  return await supabase.from('users').select('name, id')
}
