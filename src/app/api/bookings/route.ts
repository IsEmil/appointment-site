import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const { service_id, date, time, firstName, lastName, email, phone } = data;

  const { error } = await supabase.from("bookings").insert({
    service_id,
    date,
    time,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
