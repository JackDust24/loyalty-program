export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          business_address: string | null
          business_logo_url: string | null
          business_name: string
          business_phone: string | null
          client_id: string
          created_at: string
          tax_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          business_address?: string | null
          business_logo_url?: string | null
          business_name: string
          business_phone?: string | null
          client_id?: string
          created_at?: string
          tax_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          business_address?: string | null
          business_logo_url?: string | null
          business_name?: string
          business_phone?: string | null
          client_id?: string
          created_at?: string
          tax_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          profile_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          profile_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          profile_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      programs: {
        Row: {
          client_id: string | null
          created_at: string
          description: string | null
          is_active: boolean
          name: string
          program_id: string
          stamp_image_url: string | null
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          is_active?: boolean
          name: string
          program_id?: string
          stamp_image_url?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          description?: string | null
          is_active?: boolean
          name?: string
          program_id?: string
          stamp_image_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["client_id"]
          },
        ]
      }
      redemptions: {
        Row: {
          fulfilled_at: string | null
          fulfilled_by: string | null
          redeemed_at: string
          redemption_id: string
          reward_id: string | null
          status: string
          user_program_id: string | null
        }
        Insert: {
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          redeemed_at?: string
          redemption_id?: string
          reward_id?: string | null
          status?: string
          user_program_id?: string | null
        }
        Update: {
          fulfilled_at?: string | null
          fulfilled_by?: string | null
          redeemed_at?: string
          redemption_id?: string
          reward_id?: string | null
          status?: string
          user_program_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_fulfilled_by_fkey"
            columns: ["fulfilled_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["reward_id"]
          },
          {
            foreignKeyName: "redemptions_user_program_id_fkey"
            columns: ["user_program_id"]
            isOneToOne: false
            referencedRelation: "user_programs"
            referencedColumns: ["user_program_id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string
          description: string | null
          is_active: boolean
          name: string
          program_id: string | null
          required_stamps: number
          reward_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          is_active?: boolean
          name: string
          program_id?: string | null
          required_stamps: number
          reward_id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          is_active?: boolean
          name?: string
          program_id?: string | null
          required_stamps?: number
          reward_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          name: string
          role_id: number
        }
        Insert: {
          description?: string | null
          name: string
          role_id?: number
        }
        Update: {
          description?: string | null
          name?: string
          role_id?: number
        }
        Relationships: []
      }
      stamps: {
        Row: {
          awarded_by: string | null
          earned_at: string
          notes: string | null
          stamp_id: string
          user_program_id: string | null
        }
        Insert: {
          awarded_by?: string | null
          earned_at?: string
          notes?: string | null
          stamp_id?: string
          user_program_id?: string | null
        }
        Update: {
          awarded_by?: string | null
          earned_at?: string
          notes?: string | null
          stamp_id?: string
          user_program_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stamps_awarded_by_fkey"
            columns: ["awarded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "stamps_user_program_id_fkey"
            columns: ["user_program_id"]
            isOneToOne: false
            referencedRelation: "user_programs"
            referencedColumns: ["user_program_id"]
          },
        ]
      }
      user_programs: {
        Row: {
          enrolled_at: string
          program_id: string | null
          user_id: string | null
          user_program_id: string
        }
        Insert: {
          enrolled_at?: string
          program_id?: string | null
          user_id?: string | null
          user_program_id?: string
        }
        Update: {
          enrolled_at?: string
          program_id?: string | null
          user_id?: string | null
          user_program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["program_id"]
          },
          {
            foreignKeyName: "user_programs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role_id: number
          user_id: string
        }
        Insert: {
          role_id: number
          user_id: string
        }
        Update: {
          role_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          is_active: boolean
          password_hash: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          is_active?: boolean
          password_hash: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string
          is_active?: boolean
          password_hash?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_user_with_role: {
        Args: {
          p_email: string
          p_password_hash: string
          p_is_active?: boolean
          p_role_name?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
