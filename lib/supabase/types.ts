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
          business_type: string;
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
          business_type: string;
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
          business_type?: string;
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
          template_id: string | null;
          template_type: string | null;
          generated_content: Record<string, unknown> | null;
          slug: string | null;
          published: boolean;
          status: ProjectStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          template_id?: string | null;
          template_type?: string | null;
          generated_content?: Record<string, unknown> | null;
          slug?: string | null;
          published?: boolean;
          status?: ProjectStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          template_id?: string | null;
          template_type?: string | null;
          generated_content?: Record<string, unknown> | null;
          slug?: string | null;
          published?: boolean;
          status?: ProjectStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_products: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          slug: string | null;
          description: string | null;
          price: number | null;
          original_price: number | null;
          image_url: string | null;
          images: string[];
          category: string | null;
          badge: string | null;
          sizes: string[];
          colors: string[];
          stock: number;
          available: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          slug?: string | null;
          description?: string | null;
          price?: number | null;
          original_price?: number | null;
          image_url?: string | null;
          images?: string[];
          category?: string | null;
          badge?: string | null;
          sizes?: string[];
          colors?: string[];
          stock?: number;
          available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          slug?: string | null;
          description?: string | null;
          price?: number | null;
          original_price?: number | null;
          image_url?: string | null;
          images?: string[];
          category?: string | null;
          badge?: string | null;
          sizes?: string[];
          colors?: string[];
          stock?: number;
          available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_orders: {
        Row: {
          id: string;
          project_id: string;
          order_number: string | null;
          customer_name: string | null;
          customer_phone: string | null;
          customer_address: string | null;
          customer_note: string | null;
          items: unknown;
          subtotal: number;
          discount: number;
          total: number;
          payment_method: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          order_number?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          customer_address?: string | null;
          customer_note?: string | null;
          items?: unknown;
          subtotal?: number;
          discount?: number;
          total?: number;
          payment_method?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          order_number?: string | null;
          customer_name?: string | null;
          customer_phone?: string | null;
          customer_address?: string | null;
          customer_note?: string | null;
          items?: unknown;
          subtotal?: number;
          discount?: number;
          total?: number;
          payment_method?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_bookings: {
        Row: {
          id: string;
          project_id: string;
          client_name: string | null;
          client_phone: string | null;
          client_email: string | null;
          program_name: string | null;
          preferred_time: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          client_name?: string | null;
          client_phone?: string | null;
          client_email?: string | null;
          program_name?: string | null;
          preferred_time?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          client_name?: string | null;
          client_phone?: string | null;
          client_email?: string | null;
          program_name?: string | null;
          preferred_time?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant";
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: "user" | "assistant";
          content?: string;
          created_at?: string;
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
