interface AuthState {
  isSignedIn: boolean;
  userName: string | null;
  userId: string | null;
}

// Tambahkan di file types atau root.tsx
type AuthContext = {
  isSignedIn: boolean;
  userName: string | null; // ✅ Sesuai kode Anda (bukan username)
  userId: string | null;
  puterReady: boolean; // ✅ Tambahkan ini
  refreshAuth: () => Promise<boolean>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
};
