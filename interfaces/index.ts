export interface UserInterface {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
  profile_image: string | null;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthState {
  user: UserInterface | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// app/types/index.ts
export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  artifacts?: Artifact[];
}

export interface ChatResponse {
  id: string;
  message: string;
  artifacts?: Artifact[];
}

export interface SearchResult {
  source: "serper" | "brave";
  data: any;
}

export type ArtifactType = "code" | "search" | "visualization" | "text";

export interface Artifact {
  id: string;
  type: ArtifactType;
  content: any;
  metadata?: {
    language?: string;
    title?: string;
    description?: string;
  };
}
