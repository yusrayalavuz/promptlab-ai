import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

const VALID_SERVICES = [
  "AI Chatbot",
  "RAG & Bilgi Asistanı",
  "AI Otomasyonu",
  "Veri & AI Çözümleri",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const service = typeof body.service === "string" ? body.service.trim() : "";

    const description =
      typeof body.description === "string" ? body.description.trim() : "";

    // Server-side validation
    if (!name || !email || !service || !description) {
      return NextResponse.json(
        {
          error: "Tüm alanların doldurulması gerekiyor.",
        },
        { status: 400 },
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          error: "Ad Soyad 2-100 karakter arasında olmalıdır.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json(
        {
          error: "Geçerli bir e-posta adresi girin.",
        },
        { status: 400 },
      );
    }

    if (!VALID_SERVICES.includes(service)) {
      return NextResponse.json(
        {
          error: "Geçersiz hizmet seçimi.",
        },
        { status: 400 },
      );
    }

    if (description.length < 10 || description.length > 2000) {
      return NextResponse.json(
        {
          error: "Proje açıklaması 10-2000 karakter arasında olmalıdır.",
        },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("requests").insert({
      name,
      email,
      service,
      description,
    });

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        {
          error: "Talep kaydedilemedi.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Talep başarıyla kaydedildi.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Request error:", error);

    return NextResponse.json(
      {
        error: "Geçersiz istek.",
      },
      { status: 400 },
    );
  }
}
