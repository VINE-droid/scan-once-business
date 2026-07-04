import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const testConnection = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(1);

  console.log("DATA:", data);
  console.log("ERROR:", error);
};

testConnection();

export default supabase;