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
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      submission_images: {
        Row: {
          created_at: string | null
          id: string
          image_name: string | null
          image_url: string
          submission_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_name?: string | null
          image_url: string
          submission_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_name?: string | null
          image_url?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_images_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          activity_date: string | null
          club: Database["public"]["Enums"]["club_type"] | null
          contributor_name: string | null
          created_at: string | null
          department: Database["public"]["Enums"]["department_type"] | null
          description: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          section: Database["public"]["Enums"]["department_section"] | null
          status: Database["public"]["Enums"]["submission_status"] | null
          title: string
          type: Database["public"]["Enums"]["submission_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activity_date?: string | null
          club?: Database["public"]["Enums"]["club_type"] | null
          contributor_name?: string | null
          created_at?: string | null
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          section?: Database["public"]["Enums"]["department_section"] | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          title: string
          type: Database["public"]["Enums"]["submission_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activity_date?: string | null
          club?: Database["public"]["Enums"]["club_type"] | null
          contributor_name?: string | null
          created_at?: string | null
          department?: Database["public"]["Enums"]["department_type"] | null
          description?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          section?: Database["public"]["Enums"]["department_section"] | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["submission_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      club_type:
        | "IEEE SB MITS"
        | "NSS MITS"
        | "IEDC MITS"
        | "ETERNIA"
        | "μLearn MITS"
        | "Tinkerhub MITS"
        | "YI YUVA MITS"
        | "FOSS"
        | "Polaris Game Labs"
        | "LINC"
        | "ICI"
        | "Math Club"
        | "Quiz Club"
        | "ASCE"
        | "Rotract MITS"
      department_section:
        | "Department Activities"
        | "Faculty Achievements"
        | "Student Achievements"
        | "NPTEL Certifications"
      department_type:
        | "Artificial Intelligence and Data Science"
        | "Basic Science and Humanities"
        | "Civil Engineering"
        | "Computer Science and Engineering"
        | "Electrical and Communications Engineering"
        | "Electrical and Electronics Engineering"
        | "Mechanical Engineering"
        | "MCA"
      submission_status: "pending" | "approved" | "rejected"
      submission_type: "department" | "club"
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
    Enums: {
      club_type: [
        "IEEE SB MITS",
        "NSS MITS",
        "IEDC MITS",
        "ETERNIA",
        "μLearn MITS",
        "Tinkerhub MITS",
        "YI YUVA MITS",
        "FOSS",
        "Polaris Game Labs",
        "LINC",
        "ICI",
        "Math Club",
        "Quiz Club",
        "ASCE",
        "Rotract MITS",
      ],
      department_section: [
        "Department Activities",
        "Faculty Achievements",
        "Student Achievements",
        "NPTEL Certifications",
      ],
      department_type: [
        "Artificial Intelligence and Data Science",
        "Basic Science and Humanities",
        "Civil Engineering",
        "Computer Science and Engineering",
        "Electrical and Communications Engineering",
        "Electrical and Electronics Engineering",
        "Mechanical Engineering",
        "MCA",
      ],
      submission_status: ["pending", "approved", "rejected"],
      submission_type: ["department", "club"],
    },
  },
} as const
