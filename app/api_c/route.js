export async function GET() {
    try {
        // Set CORS headers
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST",
            "Access-Control-Allow-Headers": "Content-Type",
        };
        console.log("Next.js API GET() triggered");
        // Fetch data from Google Apps Script
        const result = await fetch(
            "https://script.google.com/a/macros/iith.ac.in/s/AKfycby3roeXlgcrLfWUA7OHP4qmZ_b3HYVc5-UnWs1SsI_OjlQEuk9Q1tkLH7oHlcRxhpBO4g/exec"
        );
        console.log("Generating mail status:",result.status);
        console.log("Fetch request sent...");
        const htmlText = await result.text(); // ✅ Ensure response is awaited
        console.log("Response received:", text);
        // Check for response success
        if (!result.ok) {
            throw new Error(`Fetch failed: ${result.status} ${result.statusText}`);
        }


        return new Response(htmlText, {
            status: 200,
            headers
        });
    } catch (error) {
        console.error("Error fetching HTML:", error);
        return new Response("<h1>Error 500</h1><p>Failed to fetch HTML page.</p>", {
            status: 500,
            headers
        });
    }
};
