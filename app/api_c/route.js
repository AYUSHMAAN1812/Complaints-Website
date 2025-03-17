import { headers } from "next/headers";
import admin from "firebase-admin";
// Set CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
};
// 🔹 Securely load Firebase credentials from environment variables
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}
// 🔹 Function to Get OAuth Access Token (If Not Using a Static Token)
async function getGoogleAccessToken() {
    try {
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
                grant_type: "refresh_token",
            }),
        });
        const tokenData = await tokenResponse.json();
        if (!tokenData.access_token) {
            throw new Error(`Failed to retrieve access token: ${JSON.stringify(tokenData)}`);
        }
    
        console.log("🔹 Retrieved OAuth Access Token");
        return tokenData.access_token;
    } catch (error) {
        console.error("🔴 Error fetching OAuth access token:", error);
    return null;
    }
}

export async function GET() {
    try {
        console.log("Next.js API GET() triggered");
        const reqHeaders = await headers();
        const authHeader = reqHeaders.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: new Headers(corsHeaders),
            });
        }

        const idToken = authHeader.split("Bearer ")[1];

        // 🔹 Verify Firebase ID Token
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log("Authenticated User:", decodedToken.email);
        } catch (error) {
            console.error("Invalid Firebase Token:", error);
            return new Response(JSON.stringify({ error: "Unauthorized - Invalid Token" }), {
                status: 401,
                headers: new Headers(corsHeaders),
            });
        }
        // 🔹 3. Get OAuth Access Token
        const accessToken = "ya29.a0AeXRPp4W7cQhq1vleoKwPFyvDyXJh66hMmI2qvKK8V0hI14H3u4TRlqH7hXZTe5lh6tNePWY3EMS_tkxYxR-0iE8ehqU1_Ae20ikFnTus0N3C2yp71WwEOJvhJepwufH2Et40Q2whuBOUmE5aZr9GQndiP8iOVnZK2b2Q4rxaCgYKATQSARESFQHGX2MiRpigDHWASNGMH_d-1p4tpg0175";

        // Fetch data from Google Apps Script
        const result = await fetch(
            `https://script.google.com/a/macros/iith.ac.in/s/AKfycbx_YK3T1Gp3KSbkpmvM1eino-yqlUeqxuawmv9Ybk4SagIEHjR1hD1PkfI8VDaOQwiD/exec?access_token=${encodeURIComponent(accessToken)}`,
            {
                method: "GET",
            }
        );
        if (!result.ok) {
            const errorText = await result.text();
            console.error("❌ Fetch failed:", result.status, result.statusText, "Response:", errorText);
            throw new Error(`Fetch failed: ${result.status} ${result.statusText} - ${errorText}`);
        }
        console.log("Generating mail status:", result.status);
        console.log("Fetch request sent...");
        const htmlText = await result.text(); // ✅ Ensure response is awaited
        console.log("Response received:", htmlText);



        return new Response(htmlText, {
            status: 200,
            headers: new Headers(corsHeaders),
        });
    } catch (error) {
        console.error("Error fetching HTML:", error);
        return new Response("<h1>Error 500</h1><p>Failed to fetch HTML page.</p>", {
            status: 500,
            headers: new Headers(corsHeaders),
        });
    }
};
