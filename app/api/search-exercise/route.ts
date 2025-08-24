import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exerciseName = searchParams.get("exercise");

  if (!exerciseName) {
    return NextResponse.json(
      { error: "Exercise name is required" },
      { status: 400 }
    );
  }

  try {
    // Free alternative: Use DuckDuckGo Instant Answer API or SerpAPI alternative
    // For this example, I'll implement a web scraping approach that searches for exercise images

    const searchQuery = `${exerciseName} exercise form demonstration`;

    // Alternative approach: Use a free image search API
    // We'll use the Pixabay API as an alternative (requires free API key)
    const pixabayApiKey = process.env.PIXABAY_API_KEY || "";

    if (pixabayApiKey) {
      const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&category=sports&safesearch=true&per_page=5`;

      const response = await fetch(pixabayUrl);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        return NextResponse.json({
          imageUrl: data.hits[0].webformatURL,
          source: "pixabay",
        });
      }
    }

    // Fallback: Return a curated exercise image based on exercise type
    const exerciseImageMap: { [key: string]: string } = {
      // Include key exercises with verified image URLs
      "bench press":
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      squat:
        "https://images.unsplash.com/photo-1566241134633-5fad79f83c65?w=600&h=400&fit=crop",
      deadlift:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop",
      "pull-ups":
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&h=400&fit=crop",
      "shoulder press":
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&h=400&fit=crop",
    };

    const cleanName = exerciseName.toLowerCase().trim();
    const fallbackImage =
      exerciseImageMap[cleanName] ||
      `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&auto=format&q=${encodeURIComponent(
        exerciseName
      )}`;

    return NextResponse.json({
      imageUrl: fallbackImage,
      source: "fallback",
    });
  } catch (error) {
    console.error("Error searching for exercise image:", error);
    return NextResponse.json(
      {
        error: "Failed to search for exercise image",
      },
      { status: 500 }
    );
  }
}
