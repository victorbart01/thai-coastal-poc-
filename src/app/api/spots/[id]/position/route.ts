import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const ADMIN_IDS = (process.env.ADMIN_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Authenticate caller
  const supabaseAuth = await createServerClient();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user || !ADMIN_IDS.includes(user.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Validate body
  const body = await request.json();
  const { latitude, longitude } = body;

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return NextResponse.json(
      { error: "latitude and longitude must be numbers" },
      { status: 400 }
    );
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return NextResponse.json(
      { error: "Coordinates out of range" },
      { status: 400 }
    );
  }

  // Use service role key to bypass RLS
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabaseAdmin
    .from("spots")
    .update({ latitude, longitude })
    .eq("id", id)
    .select("id, latitude, longitude")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
