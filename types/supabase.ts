export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      debt_users: {
        Row: {
          created_at: string | null
          debt_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          debt_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          debt_id?: number | null
          id?: number
          user_id?: string | null
        }
      }
      debts: {
        Row: {
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
