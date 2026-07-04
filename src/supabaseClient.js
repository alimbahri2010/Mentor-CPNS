import { createClient } from "@supabase/supabase-js";

// ============================================================================
// KONFIGURASI SUPABASE
// ============================================================================
// Silakan ganti nilai di bawah ini dengan URL dan Public Key Supabase Anda sendiri:
// ============================================================================

const SUPABASE_URL = "https://ejiodedflncwzrnpiuaq.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_b4fdVIAdFm_xtp7-AvYSbA_iLcu7M4i";

// ============================================================================
// INISIALISASI DAN EKSPORT KLIEN SUPABASE
// ============================================================================

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
