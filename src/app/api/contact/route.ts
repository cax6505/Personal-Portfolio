import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields (name, email, message)." },
        { status: 400 }
      );
    }

    // Safely sanitize the access key (strip quotes or surrounding spaces)
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim().replace(/['"]/g, "");

    if (!accessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY is missing or empty in env variables.");
      console.log("Simulating contact form email to charanadithya6505@gmail.com:", { name, email, message });
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return NextResponse.json(
        { 
          success: true, 
          message: "Demo Mode: Message simulated! Configure WEB3FORMS_ACCESS_KEY in .env.local to send real emails." 
        },
        { status: 200 }
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
        name: name,
        email: email,
        message: message,
        subject: `New Portfolio Message from ${name}`,
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const htmlText = await response.text();
      console.error("Web3Forms API returned HTML instead of JSON. Server output snippet:", htmlText.slice(0, 500));
      return NextResponse.json(
        { 
          error: "Mail server returned an invalid response page. Please verify your access key in .env.local matches the key Web3Forms sent you." 
        },
        { status: 502 }
      );
    }

    if (!response.ok || !data.success) {
      console.error("Web3Forms API failed:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send message via Web3Forms." },
        { status: response.status || 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { success: true, message: "Thank you! Your message was sent successfully." },
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
