import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

function strToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minutesToStr(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const OPENING_HOURS: Record<number, [string, string] | null> = {
  0: null, // Sunday closed
  1: ["10:00", "18:00"],
  2: ["10:00", "18:00"],
  3: ["10:00", "18:00"],
  4: ["10:00", "18:00"],
  5: ["10:00", "18:00"],
  6: ["10:00", "16:00"],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("service_id");
  const date = searchParams.get("date");
  if (!serviceId || !date) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .single();

  if (!service) return NextResponse.json([]);

  const dow = new Date(date).getDay();
  const hours = OPENING_HOURS[dow];
  if (!hours) return NextResponse.json([]);

  const [open, close] = hours.map(strToMinutes);
  let slots: string[] = [];
  for (let t = open; t + service.minutes <= close; t += 10) {
    slots.push(minutesToStr(t));
  }

  // Filter out taken slots
  const { data: bookings } = await supabase
    .from("bookings")
    .select("time, service_id")
    .eq("date", date);

  const taken = new Set(bookings?.map((b) => strToMinutes(b.time)) || []);

  slots = slots.filter((s) => !taken.has(strToMinutes(s)));

  return NextResponse.json(slots);
}
