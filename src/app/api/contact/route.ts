import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};
    try {
      const raw = await request.text();
      body = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json(
        { error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (
      !name || name.length > 100 ||
      !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || message.length > 500
    ) {
      return NextResponse.json(
        { error: "Enter a valid name, email, and message (up to 500 characters)." },
        { status: 400 }
      );
    }

    // Safely sanitize the access key (strip quotes or surrounding spaces)
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
      ?.trim()
      .replace(/['"]/g, "");

    if (!accessKey || accessKey.toLowerCase() === "your_access_key_here") {
      console.warn("WEB3FORMS_ACCESS_KEY is missing or empty in env variables.");
      return NextResponse.json(
        {
          error:
            "The contact form is not configured yet. Please email charanadithya6505@gmail.com directly.",
        },
        { status: 503 },
      );
    }

    // Call Web3Forms API to send real email to user's registered address
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: `New Portfolio Message from ${name}`,
      }),
    });

    const responseText = await response.text();
    let data: Record<string, unknown> = {};

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      console.error("Web3Forms API returned non-JSON response:", responseText.slice(0, 500));
      return NextResponse.json(
        { 
          error: "Mail server returned an invalid response. Please verify your access key." 
        },
        { status: 502 }
      );
    }

    if (!response.ok || (data as { success?: boolean }).success !== true) {
      console.error("Web3Forms API failed:", data);
      return NextResponse.json(
        { error: (data as { message?: string }).message || "Failed to send message via Web3Forms." },
        { status: response.status >= 400 ? response.status : 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { success: true, message: data.message || "Thank you! Your message was sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
