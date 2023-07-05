import { User } from '@supabase/supabase-js'

export interface ActiveUser extends User {
  name: string | null
}
