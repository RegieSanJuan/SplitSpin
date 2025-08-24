const fs = require("fs");
const path = require("path");

// Read the file
const filePath = path.join(__dirname, "app", "page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// Function to add image property and fix video IDs
function addImageAndFixVideos() {
  // Fix problematic video IDs
  const videoFixes = {
    jthXMLGaP3M: "SrqOu55lrYU", // Incline Bench Press
    UCXxvVItLoM: "FWJR5Ve8bnQ", // Wide-Grip Row -> Barbell Row
    tyWVbcHHjkg: "d_KZxkY_0cM", // JM Press -> Skull Crushers
    EdtaJRBqEYI: "ultWZbUMPL8", // Hack Squat -> Regular Squat
    g6qZGh9f6d0: "rep-qVOkqgk", // Kelso Shrugs -> Face Pulls
    RTraFBdS428: "2C-uNgKwPLE", // Adductors -> Bulgarian Split Squats
    ph3pddpKzzw: "jEy_czb3RKA", // Seated Back Extension -> Romanian Deadlift
    wkD8rjkodUI: "ASdvN_XEl_c", // Torso Rotation -> Light activity
    CLDthJcMZgQ: "zC3nLlEvin4", // Forearms -> Hammer Curls
  };

  // Apply video fixes
  Object.entries(videoFixes).forEach(([oldId, newId]) => {
    content = content.replace(
      new RegExp(`youtubeId: "${oldId}"`, "g"),
      `youtubeId: "${newId}"`
    );
  });

  // Add image property to exercises that don't have it
  // Pattern: youtubeId: "ID", followed by } or other properties but not image
  const exercisePattern = /(\s*youtubeId: "[^"]+",)\s*(\n\s*\})/g;
  content = content.replace(
    exercisePattern,
    '$1\n            image: "/placeholder.jpg",$2'
  );

  return content;
}

// Apply updates
const updatedContent = addImageAndFixVideos();

// Write back to file
fs.writeFileSync(filePath, updatedContent, "utf8");

console.log("Updated exercises with images and fixed video IDs");
