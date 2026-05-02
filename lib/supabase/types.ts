export type UserRole = "admin" | "user";
export type BusinessType = "khoa-hoc" | "shop-online" | "dich-vu" | "coaching" | "khac";
export type ProjectStatus = "draft" | "active" | "paused";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          onboarding_done: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          onboarding_done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          onboarding_done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      business_info: {
        Row: {
          id: string;
          user_id: string;
          brand_name: string;
          business_type: BusinessType;
          description: string | null;
          phone: string | null;
          website: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          brand_name: string;
          business_type: BusinessType;
          description?: string | null;
          phone?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          brand_name?: string;
          business_type?: BusinessType;
          description?: string | null;
          phone?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          price: number | null;
          usp: string | null;
          target_audience: string | null;
          sales_channels: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          price?: number | null;
          usp?: string | null;
          target_audience?: string | null;
          sales_channels?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          price?: number | null;
          usp?: string | null;
          target_audience?: string | null;
          sales_channels?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          template_type: string | null;
          status: ProjectStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          template_type?: string | null;
          status?: ProjectStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          template_type?: string | null;
          status?: ProjectStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      user_role: UserRole;
      business_type: BusinessType;
      project_status: ProjectStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
}
