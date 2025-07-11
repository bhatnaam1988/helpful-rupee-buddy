export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      budget_categories: {
        Row: {
          category_name: string
          created_at: string | null
          current_spent: number | null
          id: string
          monthly_limit: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_name: string
          created_at?: string | null
          current_spent?: number | null
          id?: string
          monthly_limit: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_name?: string
          created_at?: string | null
          current_spent?: number | null
          id?: string
          monthly_limit?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      expense_categories: {
        Row: {
          created_at: string | null
          icon_name: string
          id: string
          is_default: boolean | null
          name_en: string
          name_hi: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          icon_name: string
          id?: string
          is_default?: boolean | null
          name_en: string
          name_hi: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          icon_name?: string
          id?: string
          is_default?: boolean | null
          name_en?: string
          name_hi?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          description: string | null
          expense_date: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_reports: {
        Row: {
          created_at: string | null
          id: string
          report_data: Json | null
          report_period: string
          report_type: string
          savings_rate: number | null
          total_expenses: number | null
          total_income: number | null
          total_investments: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          report_data?: Json | null
          report_period: string
          report_type: string
          savings_rate?: number | null
          total_expenses?: number | null
          total_income?: number | null
          total_investments?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          report_data?: Json | null
          report_period?: string
          report_type?: string
          savings_rate?: number | null
          total_expenses?: number | null
          total_income?: number | null
          total_investments?: number | null
          user_id?: string
        }
        Relationships: []
      }
      goal_templates: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_hi: string | null
          icon_name: string | null
          id: string
          is_popular: boolean | null
          name_en: string
          name_hi: string
          priority: string | null
          suggested_amount: number | null
          suggested_timeline_months: number | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_hi?: string | null
          icon_name?: string | null
          id?: string
          is_popular?: boolean | null
          name_en: string
          name_hi: string
          priority?: string | null
          suggested_amount?: number | null
          suggested_timeline_months?: number | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_hi?: string | null
          icon_name?: string | null
          id?: string
          is_popular?: boolean | null
          name_en?: string
          name_hi?: string
          priority?: string | null
          suggested_amount?: number | null
          suggested_timeline_months?: number | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string | null
          current_amount: number | null
          id: string
          name: string
          priority: string | null
          target_amount: number
          timeline_months: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          name: string
          priority?: string | null
          target_amount: number
          timeline_months?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_amount?: number | null
          id?: string
          name?: string
          priority?: string | null
          target_amount?: number
          timeline_months?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      investment_advice: {
        Row: {
          advice_text_en: string | null
          advice_text_hi: string | null
          created_at: string | null
          id: string
          monthly_surplus: number
          recommended_instruments: Json | null
          risk_level: string
          suggested_investment_amount: number
          time_horizon: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          advice_text_en?: string | null
          advice_text_hi?: string | null
          created_at?: string | null
          id?: string
          monthly_surplus: number
          recommended_instruments?: Json | null
          risk_level: string
          suggested_investment_amount: number
          time_horizon: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          advice_text_en?: string | null
          advice_text_hi?: string | null
          created_at?: string | null
          id?: string
          monthly_surplus?: number
          recommended_instruments?: Json | null
          risk_level?: string
          suggested_investment_amount?: number
          time_horizon?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      investments: {
        Row: {
          amount: number
          created_at: string | null
          current_value: number | null
          expected_return_rate: number | null
          id: string
          instrument_name: string
          investment_date: string
          investment_type: string
          maturity_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          current_value?: number | null
          expected_return_rate?: number | null
          id?: string
          instrument_name: string
          investment_date?: string
          investment_type: string
          maturity_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          current_value?: number | null
          expected_return_rate?: number | null
          id?: string
          instrument_name?: string
          investment_date?: string
          investment_type?: string
          maturity_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string | null
          family_size: number | null
          id: string
          location: string | null
          monthly_income: number | null
          name: string
          occupation: string | null
          phone: string | null
          preferred_language: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          family_size?: number | null
          id: string
          location?: string | null
          monthly_income?: number | null
          name: string
          occupation?: string | null
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          family_size?: number | null
          id?: string
          location?: string | null
          monthly_income?: number | null
          name?: string
          occupation?: string | null
          phone?: string | null
          preferred_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          ai_advice: string | null
          created_at: string | null
          id: string
          monthly_investment_amount: number | null
          recommended_instruments: Json | null
          user_id: string
        }
        Insert: {
          ai_advice?: string | null
          created_at?: string | null
          id?: string
          monthly_investment_amount?: number | null
          recommended_instruments?: Json | null
          user_id: string
        }
        Update: {
          ai_advice?: string | null
          created_at?: string | null
          id?: string
          monthly_investment_amount?: number | null
          recommended_instruments?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_onboarding: {
        Row: {
          created_at: string | null
          has_completed_onboarding: boolean | null
          id: string
          last_onboarding_shown: string | null
          onboarding_version: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_onboarding_shown?: string | null
          onboarding_version?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          has_completed_onboarding?: boolean | null
          id?: string
          last_onboarding_shown?: string | null
          onboarding_version?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
