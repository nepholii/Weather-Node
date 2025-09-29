import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { city } = await req.json();

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const API_KEY = "fc28c49a106f8b2811c505cac4ac997e"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || "City not found" }, { status: 400 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
