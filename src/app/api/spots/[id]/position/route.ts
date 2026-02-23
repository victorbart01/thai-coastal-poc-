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
  try {
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
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: "Server misconfigured: missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

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
  } catch (err) {
    console.error("PATCH /api/spots/[id]/position error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
