import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const ADMIN_IDS = (process.env.ADMIN_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

export async function DELETE(
  _request: NextRequest,
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

    // Fetch storage paths for photos before deleting the spot
    const { data: photos } = await supabaseAdmin
      .from("spot_photos")
      .select("storage_path")
      .eq("spot_id", id);

    // Delete storage files if any exist
    if (photos && photos.length > 0) {
      const paths = photos.map((p) => p.storage_path);
      const { error: storageError } = await supabaseAdmin.storage
        .from("spot-photos")
        .remove(paths);

      if (storageError) {
        console.error("Failed to delete storage files:", storageError);
        // Continue with spot deletion — orphaned files are less harmful than a stuck spot
      }
    }

    // Delete the spot row (cascade handles comments, likes, saves, spot_photos rows)
    const { error } = await supabaseAdmin
      .from("spots")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/spots/[id] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
