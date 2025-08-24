"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Camera, Play, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const workoutSplits = [
  {
    name: "Full Body (FBEOD)",
    description: "Full-body every other day (3x/week)",
    color: "#4285F4", // Google Blue
  },
  {
    name: "Bro Split",
    description: "Each muscle group once per week",
    color: "#34A853", // Google Green
  },
  {
    name: "Upper/Lower",
    description: "Alternating upper-body and lower-body days",
    color: "#FBBC04", // Google Yellow
  },
  {
    name: "Push/Pull/Legs (PPL)",
    description: "Push, Pull, Legs rotation",
    color: "#EA4335", // Google Red
  },
  {
    name: "Upper/Lower x PPL Hybrid",
    description: "Mix of upper/lower and PPL weekly",
    color: "#9C27B0", // Purple
  },
  {
    name: "PPL x Arnold Split",
    description: "PPL combined with Arnold split",
    color: "#FF9800", // Orange
  },
  {
    name: "Arnold Split",
    description: "Chest/Back, Shoulders/Arms, Legs",
    color: "#00BCD4", // Cyan
  },
];

// Precise segment calculations for 360-degree wheel
const totalSegments = workoutSplits.length; // 7 segments
const degreesPerSegment = 360 / totalSegments; // 51.428571... degrees per segment

// Create precise segment boundaries
const wheelSegments = workoutSplits.map((split, index) => {
  const startAngle = index * degreesPerSegment; // Start of this segment
  const endAngle = (index + 1) * degreesPerSegment; // End of this segment
  const middleAngle = startAngle + degreesPerSegment / 2; // Middle of this segment

  return {
    ...split,
    index,
    startAngle, // 0, 51.43, 102.86, 154.29, 205.71, 257.14, 308.57
    endAngle, // 51.43, 102.86, 154.29, 205.71, 257.14, 308.57, 360
    middleAngle,
    degreesPerSegment,
  };
});

console.log("Wheel segments with precise angles:", wheelSegments);

// Define angle ranges for each segment (like the Chart.js reference)
const workoutPrograms = {
  "Full Body (FBEOD)": {
    description:
      "Perfect for beginners. Train your entire body every other day with compound movements.",
    sessions: [
      {
        name: "Session A",
        schedule: "Day 1, 5 (Mon, Fri)",
        exercises: [
          {
            name: "Incline Bench Press",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "SrqOu55lrYU",
          },
          {
            name: "Chest Flys",
            sets: "2 sets",
            muscle: "Upper Body",
            youtubeId: "eozdVDA78K0",
          },
          {
            name: "Shoulder Press",
            sets: "2 sets",
            muscle: "Upper Body",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Wide-Grip Row",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Lat Pulldown",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "CAwf7n6Luuc",
          },
          {
            name: "Hammer Curls",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "zC3nLlEvin4",
          },
          {
            name: "Preacher Curl",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "fIWP-FRFNU0",
          },
          {
            name: "Single-Arm Triceps Pushdowns",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "vB5OHsJ3EME",
          },
          {
            name: "JM Press",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "d_KZxkY_0cM",
          },
          {
            name: "Reverse Flys",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "ea7qmaN9nKk",
          },
          {
            name: "Lateral Raises",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Hack Squat",
            sets: "1 set",
            muscle: "Lower Body",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Leg Curls",
            sets: "2 sets",
            muscle: "Lower Body",
            youtubeId: "ELOCsoDSmrg",
          },
          {
            name: "Calf Raises",
            sets: "1 set",
            muscle: "Lower Body",
            youtubeId: "gwLzBJYoWlI",
          },
          {
            name: "Hanging Leg Raises",
            sets: "2 sets",
            muscle: "Lower Body",
            youtubeId: "Pr1ieGZ5atk",
          },
          {
            name: "Ab Machine",
            sets: "2 sets",
            muscle: "Lower Body",
            youtubeId: "uOHvzBJBfuA",
          },
        ],
      },
      {
        name: "Session B",
        schedule: "Day 3 (Wed)",
        exercises: [
          {
            name: "Chest Press Machine",
            sets: "2 sets",
            muscle: "Upper Body",
            youtubeId: "xUm0BiZCWlQ",
          },
          {
            name: "Seated Row Machine (narrow)",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "GZbfZ033f74",
          },
          {
            name: "Lateral Raises",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Reverse Cable Flys",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "ea7qmaN9nKk",
          },
          {
            name: "Hammer Curls",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "zC3nLlEvin4",
          },
          {
            name: "Preacher Curl",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "fIWP-FRFNU0",
          },
          {
            name: "Single-Arm Triceps Pushdowns",
            sets: "2 sets",
            muscle: "Upper Body",
            youtubeId: "vB5OHsJ3EME",
          },
          {
            name: "JM Press",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "d_KZxkY_0cM",
          },
          {
            name: "Kelso Shrugs",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "rep-qVOkqgk",
          },
          {
            name: "Leg Press",
            sets: "1 set",
            muscle: "Lower Body",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Leg Extensions",
            sets: "1 set",
            muscle: "Lower Body",
            youtubeId: "YyvSfVjQeL0",
          },
          {
            name: "Adductors Machine",
            sets: "1 set",
            muscle: "Lower Body",
            youtubeId: "2C-uNgKwPLE",
          },
          {
            name: "Ab Machine",
            sets: "2 sets",
            muscle: "Lower Body",
            youtubeId: "uOHvzBJBfuA",
          },
        ],
      },
      {
        name: "Rest Days",
        schedule: "Day 2, 4, 6, 7 (Tue, Thu, Sat, Sun)",
        exercises: [
          {
            name: "Complete Rest or Light Walking",
            sets: "As needed",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "Push/Pull/Legs (PPL)": {
    description:
      "Popular intermediate split focusing on movement patterns. Great for building muscle mass and strength.",
    sessions: [
      {
        name: "Push Day",
        schedule: "Day 1, 4 (Mon, Thu)",
        exercises: [
          {
            name: "Chest Press",
            sets: "3x12",
            muscle: "Chest",
            youtubeId: "xUm0BiZCWlQ",
          },
          {
            name: "Incline Bench Press",
            sets: "3x12",
            muscle: "Chest",
            youtubeId: "SrqOu55lrYU",
          },
          {
            name: "Chest Flies",
            sets: "3x12",
            muscle: "Chest",
            youtubeId: "eozdVDA78K0",
          },
          {
            name: "Shoulder Press",
            sets: "3x12",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Lateral Raises",
            sets: "3x12",
            muscle: "Shoulders",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Tricep Pushdowns (Drop Set)",
            sets: "4x10",
            muscle: "Triceps",
            youtubeId: "vB5OHsJ3EME",
          },
        ],
      },
      {
        name: "Pull Day",
        schedule: "Day 2, 5 (Tue, Fri)",
        exercises: [
          {
            name: "Seated Rows",
            sets: "3x12",
            muscle: "Back",
            youtubeId: "GZbfZ033f74",
          },
          {
            name: "Lat Pulldowns",
            sets: "3x12",
            muscle: "Back",
            youtubeId: "CAwf7n6Luuc",
          },
          {
            name: "Bent Over Barbell Rows",
            sets: "3x12",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Rear Delts",
            sets: "3x12",
            muscle: "Shoulders",
            youtubeId: "ea7qmaN9nKk",
          },
          {
            name: "Preacher Curl Machine (Drop Set)",
            sets: "4x10",
            muscle: "Biceps",
            youtubeId: "fIWP-FRFNU0",
          },
          {
            name: "Forearms (SS Extensor/Flexor)",
            sets: "3x12",
            muscle: "Forearms",
            youtubeId: "zC3nLlEvin4",
          },
        ],
      },
      {
        name: "Legs/Core Day",
        schedule: "Day 3, 6 (Wed, Sat)",
        exercises: [
          {
            name: "V-Squats",
            sets: "3x12",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Leg Press",
            sets: "3x12",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Lying Leg Curls",
            sets: "3x12",
            muscle: "Legs",
            youtubeId: "ELOCsoDSmrg",
          },
          {
            name: "Leg Extensions",
            sets: "3x12",
            muscle: "Legs",
            youtubeId: "YyvSfVjQeL0",
          },
          {
            name: "Seated Calf Raises",
            sets: "4x15",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
          {
            name: "Seated Back Extension (Machine)",
            sets: "3x12",
            muscle: "Lower Back",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Ab Crunch (Machine)",
            sets: "3x12",
            muscle: "Abs",
            youtubeId: "uOHvzBJBfuA",
          },
          {
            name: "Torso Rotation (SS Both Sides)",
            sets: "3x12",
            muscle: "Core",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
      {
        name: "Rest Day",
        schedule: "Day 7 (Sun)",
        exercises: [
          {
            name: "Complete Rest or Active Recovery",
            sets: "As needed",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "Bro Split": {
    description:
      "Classic bodybuilding split targeting one muscle group per day. Ideal for advanced lifters seeking high volume training.",
    sessions: [
      {
        name: "Chest Day",
        schedule: "Day 1 (Mon)",
        exercises: [
          {
            name: "Bench Press",
            sets: "4x8-10",
            muscle: "Chest",
            youtubeId: "rT7DgCr-3pg",
          },
          {
            name: "Incline DB Press",
            sets: "3x10-12",
            muscle: "Chest",
            youtubeId: "hChxWk6k8kQ",
          },
          {
            name: "Chest Flys",
            sets: "3x12-15",
            muscle: "Chest",
            youtubeId: "eozdVDA78K0",
          },
          {
            name: "Push-ups",
            sets: "3xAMRAP",
            muscle: "Chest",
            youtubeId: "IODxDxX7oi4",
          },
        ],
      },
      {
        name: "Back Day",
        schedule: "Day 2 (Tue)",
        exercises: [
          {
            name: "Deadlift",
            sets: "4x6-8",
            muscle: "Back",
            youtubeId: "ytGaGIn3SjE",
          },
          {
            name: "Pull-ups",
            sets: "4x8-12",
            muscle: "Back",
            youtubeId: "eGo4IYlbE5g",
          },
          {
            name: "Barbell Rows",
            sets: "3x8-10",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Lat Pulldown",
            sets: "3x10-12",
            muscle: "Back",
            youtubeId: "CAwf7n6Luuc",
          },
        ],
      },
      {
        name: "Shoulders Day",
        schedule: "Day 3 (Wed)",
        exercises: [
          {
            name: "Overhead Press",
            sets: "4x8-10",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Lateral Raises",
            sets: "4x12-15",
            muscle: "Shoulders",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Arnold Press",
            sets: "3x10-12",
            muscle: "Shoulders",
            youtubeId: "VxNX1bk8Ibo",
          },
          {
            name: "Face Pulls",
            sets: "3x15-20",
            muscle: "Shoulders",
            youtubeId: "rep-qVOkqgk",
          },
        ],
      },
      {
        name: "Arms Day",
        schedule: "Day 4 (Thu)",
        exercises: [
          {
            name: "Barbell Curl",
            sets: "4x10-12",
            muscle: "Biceps",
            youtubeId: "kwG2ipFRgfo",
          },
          {
            name: "Hammer Curl",
            sets: "3x12-15",
            muscle: "Biceps",
            youtubeId: "zC3nLlEvin4",
          },
          {
            name: "Skull Crushers",
            sets: "4x10-12",
            muscle: "Triceps",
            youtubeId: "d_KZxkY_0cM",
          },
          {
            name: "Dips",
            sets: "3x10-15",
            muscle: "Triceps",
            youtubeId: "2z8JmcrW-As",
          },
          {
            name: "Rope Pushdowns",
            sets: "3x12-15",
            muscle: "Triceps",
            youtubeId: "vB5OHsJ3EME",
          },
        ],
      },
      {
        name: "Legs Day",
        schedule: "Day 5 (Fri)",
        exercises: [
          {
            name: "Squat",
            sets: "4x8-10",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Leg Press",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Romanian Deadlift",
            sets: "3x10-12",
            muscle: "Legs",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Lunges",
            sets: "3x12 each leg",
            muscle: "Legs",
            youtubeId: "QOVaHwm-Q6U",
          },
          {
            name: "Calf Raises",
            sets: "4x15-20",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
        ],
      },
      {
        name: "Rest Days",
        schedule: "Day 6-7 (Sat-Sun)",
        exercises: [
          {
            name: "Complete Rest or Light Activity",
            sets: "As needed",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "Upper/Lower": {
    description:
      "Efficient split alternating between upper and lower body. Perfect balance of frequency and recovery for intermediate lifters.",
    sessions: [
      {
        name: "Upper Body Day",
        schedule: "Day 1, 4 (Mon, Thu)",
        exercises: [
          {
            name: "Bench Press",
            sets: "4x6-8",
            muscle: "Chest",
            youtubeId: "rT7DgCr-3pg",
          },
          {
            name: "Barbell Rows",
            sets: "4x6-8",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Overhead Press",
            sets: "3x8-10",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Pull-ups/Lat Pulldown",
            sets: "3x8-12",
            muscle: "Back",
            youtubeId: "CAwf7n6Luuc",
          },
          {
            name: "Dips",
            sets: "3x10-12",
            muscle: "Triceps",
            youtubeId: "2z8JmcrW-As",
          },
          {
            name: "Barbell Curls",
            sets: "3x10-12",
            muscle: "Biceps",
            youtubeId: "kwG2ipFRgfo",
          },
        ],
      },
      {
        name: "Lower Body Day",
        schedule: "Day 2, 5 (Tue, Fri)",
        exercises: [
          {
            name: "Squat",
            sets: "4x6-8",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Romanian Deadlift",
            sets: "3x8-10",
            muscle: "Legs",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Bulgarian Split Squats",
            sets: "3x10 each leg",
            muscle: "Legs",
            youtubeId: "2C-uNgKwPLE",
          },
          {
            name: "Leg Curls",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "ELOCsoDSmrg",
          },
          {
            name: "Calf Raises",
            sets: "4x15-20",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
          {
            name: "Plank",
            sets: "3x30-60s",
            muscle: "Core",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
      {
        name: "Rest Days",
        schedule: "Day 3, 6-7 (Wed, Sat-Sun)",
        exercises: [
          {
            name: "Active Recovery or Complete Rest",
            sets: "As needed",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "Upper/Lower x PPL Hybrid": {
    description:
      "Advanced hybrid combining upper/lower and PPL principles. Offers variety and prevents plateaus for experienced lifters.",
    sessions: [
      {
        name: "Upper Body Day",
        schedule: "Day 1 (Mon)",
        exercises: [
          {
            name: "Bench Press",
            sets: "4x6-8",
            muscle: "Chest",
            youtubeId: "rT7DgCr-3pg",
          },
          {
            name: "Barbell Rows",
            sets: "4x6-8",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Overhead Press",
            sets: "3x8-10",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Pull-ups",
            sets: "3x8-12",
            muscle: "Back",
            youtubeId: "eGo4IYlbE5g",
          },
        ],
      },
      {
        name: "Lower Body Day",
        schedule: "Day 2 (Tue)",
        exercises: [
          {
            name: "Squat",
            sets: "4x6-8",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Romanian Deadlift",
            sets: "3x8-10",
            muscle: "Legs",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Leg Press",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
        ],
      },
      {
        name: "Push Day",
        schedule: "Day 3 (Wed)",
        exercises: [
          {
            name: "Incline DB Press",
            sets: "3x10-12",
            muscle: "Chest",
            youtubeId: "hChxWk6k8kQ",
          },
          {
            name: "Lateral Raises",
            sets: "4x12-15",
            muscle: "Shoulders",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Tricep Pushdowns",
            sets: "3x12-15",
            muscle: "Triceps",
            youtubeId: "vB5OHsJ3EME",
          },
        ],
      },
      {
        name: "Pull Day",
        schedule: "Day 4 (Thu)",
        exercises: [
          {
            name: "Lat Pulldowns",
            sets: "3x10-12",
            muscle: "Back",
            youtubeId: "CAwf7n6Luuc",
          },
          {
            name: "Cable Rows",
            sets: "3x10-12",
            muscle: "Back",
            youtubeId: "GZbfZ033f74",
          },
          {
            name: "Barbell Curls",
            sets: "3x10-12",
            muscle: "Biceps",
            youtubeId: "kwG2ipFRgfo",
          },
        ],
      },
      {
        name: "Legs Day",
        schedule: "Day 5 (Fri)",
        exercises: [
          {
            name: "Leg Press",
            sets: "4x12-15",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Leg Curls",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "ELOCsoDSmrg",
          },
          {
            name: "Calf Raises",
            sets: "4x15-20",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
        ],
      },
      {
        name: "Rest Days",
        schedule: "Day 6-7 (Sat-Sun)",
        exercises: [
          {
            name: "Active Recovery",
            sets: "Light cardio/stretching",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "PPL x Arnold Split": {
    description:
      "Hybrid approach combining PPL efficiency with Arnold's antagonist training. Advanced split for experienced lifters wanting variety.",
    sessions: [
      {
        name: "Push Day (PPL)",
        schedule: "Day 1 (Mon)",
        exercises: [
          {
            name: "Bench Press",
            sets: "4x8-10",
            muscle: "Chest",
            youtubeId: "rT7DgCr-3pg",
          },
          {
            name: "Overhead Press",
            sets: "3x8-10",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Tricep Pushdowns",
            sets: "3x12-15",
            muscle: "Triceps",
            youtubeId: "vB5OHsJ3EME",
          },
        ],
      },
      {
        name: "Pull Day (PPL)",
        schedule: "Day 2 (Tue)",
        exercises: [
          {
            name: "Pull-ups",
            sets: "4x8-12",
            muscle: "Back",
            youtubeId: "eGo4IYlbE5g",
          },
          {
            name: "Barbell Rows",
            sets: "3x8-10",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Barbell Curls",
            sets: "3x10-12",
            muscle: "Biceps",
            youtubeId: "kwG2ipFRgfo",
          },
        ],
      },
      {
        name: "Legs Day (PPL)",
        schedule: "Day 3 (Wed)",
        exercises: [
          {
            name: "Squat",
            sets: "4x8-10",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Romanian Deadlift",
            sets: "3x8-10",
            muscle: "Legs",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Calf Raises",
            sets: "4x15-20",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
        ],
      },
      {
        name: "Chest & Back (Arnold)",
        schedule: "Day 4 (Thu)",
        exercises: [
          {
            name: "Incline DB Press",
            sets: "3x10-12",
            muscle: "Chest",
            youtubeId: "hChxWk6k8kQ",
          },
          {
            name: "Lat Pulldowns",
            sets: "3x10-12",
            muscle: "Back",
            youtubeId: "CAwf7n6Luuc",
          },
          {
            name: "Chest Flys",
            sets: "3x12-15",
            muscle: "Chest",
            youtubeId: "eozdVDA78K0",
          },
        ],
      },
      {
        name: "Shoulders & Arms (Arnold)",
        schedule: "Day 5 (Fri)",
        exercises: [
          {
            name: "Lateral Raises",
            sets: "4x12-15",
            muscle: "Shoulders",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Hammer Curls",
            sets: "3x12-15",
            muscle: "Biceps",
            youtubeId: "zC3nLlEvin4",
          },
          {
            name: "Skull Crushers",
            sets: "3x10-12",
            muscle: "Triceps",
            youtubeId: "d_KZxkY_0cM",
          },
        ],
      },
      {
        name: "Legs (Arnold)",
        schedule: "Day 6 (Sat)",
        exercises: [
          {
            name: "Leg Press",
            sets: "4x12-15",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Leg Curls",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "ELOCsoDSmrg",
          },
        ],
      },
      {
        name: "Rest Day",
        schedule: "Day 7 (Sun)",
        exercises: [
          {
            name: "Complete Rest",
            sets: "Recovery day",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
  "Arnold Split": {
    description:
      "The legendary Arnold Schwarzenegger's favorite split. Trains antagonist muscle groups together for incredible pumps and muscle growth.",
    sessions: [
      {
        name: "Chest & Back",
        schedule: "Day 1, 4 (Mon, Thu)",
        exercises: [
          {
            name: "Bench Press",
            sets: "4x8-10",
            muscle: "Chest",
            youtubeId: "rT7DgCr-3pg",
          },
          {
            name: "Barbell Rows",
            sets: "4x8-10",
            muscle: "Back",
            youtubeId: "FWJR5Ve8bnQ",
          },
          {
            name: "Incline DB Press",
            sets: "3x10-12",
            muscle: "Chest",
            youtubeId: "hChxWk6k8kQ",
          },
          {
            name: "Pull-ups",
            sets: "3x8-12",
            muscle: "Back",
            youtubeId: "eGo4IYlbE5g",
          },
          {
            name: "Chest Flys",
            sets: "3x12-15",
            muscle: "Chest",
            youtubeId: "eozdVDA78K0",
          },
          {
            name: "Cable Rows",
            sets: "3x12-15",
            muscle: "Back",
            youtubeId: "GZbfZ033f74",
          },
        ],
      },
      {
        name: "Shoulders & Arms",
        schedule: "Day 2, 5 (Tue, Fri)",
        exercises: [
          {
            name: "Overhead Press",
            sets: "4x8-10",
            muscle: "Shoulders",
            youtubeId: "qEwKCR5JCog",
          },
          {
            name: "Barbell Curls",
            sets: "4x10-12",
            muscle: "Biceps",
            youtubeId: "kwG2ipFRgfo",
          },
          {
            name: "Lateral Raises",
            sets: "4x12-15",
            muscle: "Shoulders",
            youtubeId: "3VcKaXpzqRo",
          },
          {
            name: "Close-Grip Bench Press",
            sets: "4x10-12",
            muscle: "Triceps",
            youtubeId: "nEF0bv2FW94",
          },
          {
            name: "Rear Delt Flys",
            sets: "3x15-20",
            muscle: "Shoulders",
            youtubeId: "ea7qmaN9nKk",
          },
          {
            name: "Hammer Curls",
            sets: "3x12-15",
            muscle: "Biceps",
            youtubeId: "zC3nLlEvin4",
          },
        ],
      },
      {
        name: "Legs",
        schedule: "Day 3, 6 (Wed, Sat)",
        exercises: [
          {
            name: "Squat",
            sets: "4x8-10",
            muscle: "Legs",
            youtubeId: "ultWZbUMPL8",
          },
          {
            name: "Romanian Deadlift",
            sets: "4x8-10",
            muscle: "Legs",
            youtubeId: "jEy_czb3RKA",
          },
          {
            name: "Leg Press",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "IZxyjW7MPJQ",
          },
          {
            name: "Leg Curls",
            sets: "3x12-15",
            muscle: "Legs",
            youtubeId: "ELOCsoDSmrg",
          },
          {
            name: "Calf Raises",
            sets: "4x15-20",
            muscle: "Calves",
            youtubeId: "gwLzBJYoWlI",
          },
          {
            name: "Leg Extensions",
            sets: "3x15-20",
            muscle: "Legs",
            youtubeId: "YyvSfVjQeL0",
          },
        ],
      },
      {
        name: "Rest Day",
        schedule: "Day 7 (Sun)",
        exercises: [
          {
            name: "Complete Rest",
            sets: "Recovery day",
            muscle: "Recovery",
            youtubeId: "ASdvN_XEl_c",
          },
        ],
      },
    ],
  },
};

export default function WorkoutSpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSplit, setSelectedSplit] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showWorkoutProgram, setShowWorkoutProgram] = useState(false);

  // Function to determine which segment is under the pointer (at top - 90 degrees)
  const getSegmentAtPointer = (wheelRotation: number) => {
    // Normalize the rotation to 0-360 degrees
    const normalizedRotation = ((wheelRotation % 360) + 360) % 360;

    // The pointer is at the top (90 degrees from the right/0 degrees)
    // We need to find which segment is currently at the top position
    // Since segments start from 0 degrees and go clockwise, and the wheel rotates,
    // we need to calculate which segment is now at the 90-degree position

    // The effective angle that's now at the pointer position (top)
    const pointerAngle = (90 - normalizedRotation + 360) % 360;

    // Find which segment this angle falls into
    for (let i = 0; i < wheelSegments.length; i++) {
      const segment = wheelSegments[i];
      if (
        pointerAngle >= segment.startAngle &&
        pointerAngle < segment.endAngle
      ) {
        console.log("Pointer angle:", pointerAngle);
        console.log("Found segment:", segment.name);
        console.log(
          "Segment range:",
          segment.startAngle,
          "to",
          segment.endAngle
        );
        return segment;
      }
    }

    // Fallback to first segment if no match (shouldn't happen)
    return wheelSegments[0];
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowWorkoutProgram(false);
    setShowCongratulations(false);

    // Generate a random final rotation
    const spins = 5 + Math.random() * 3; // 5-8 full rotations for effect
    const randomAngle = Math.random() * 360; // Random final position
    const finalRotation = rotation + spins * 360 + randomAngle;

    console.log("Current rotation:", rotation);
    console.log("Spins:", spins);
    console.log("Random angle:", randomAngle);
    console.log("Final rotation:", finalRotation);

    setRotation(finalRotation);

    setTimeout(() => {
      // Determine which segment is under the pointer after spinning
      const selectedSegment = getSegmentAtPointer(finalRotation);

      console.log(
        "Final wheel position - selected segment:",
        selectedSegment.name
      );
      console.log("Segment details:", selectedSegment);

      setSelectedSplit(selectedSegment.name);
      setIsSpinning(false);
      setShowCongratulations(true);
    }, 4000); // Match the CSS transition duration
  };

  const handleShowSplit = () => {
    setShowCongratulations(false);
    setShowWorkoutProgram(true);
  };

  const handleCloseModal = () => {
    setShowCongratulations(false);
    setSelectedSplit(null);
  };

  const handleBackToWheel = () => {
    setShowWorkoutProgram(false);
    setSelectedSplit(null);
  };

  const copyToClipboard = () => {
    if (
      !selectedSplit ||
      !workoutPrograms[selectedSplit as keyof typeof workoutPrograms]
    )
      return;

    const program =
      workoutPrograms[selectedSplit as keyof typeof workoutPrograms];
    let text = `${selectedSplit} Workout Program\n\n`;

    program.sessions.forEach((session) => {
      text += `${session.name}:\n`;
      session.exercises.forEach((exercise) => {
        text += `• ${exercise.name} - ${exercise.sets}\n`;
      });
      text += "\n";
    });

    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Your workout program has been copied.",
    });
  };

  const takeScreenshot = () => {
    toast({
      title: "Screenshot tip!",
      description:
        "Use your device's screenshot function to save this workout.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2 leading-tight">
            SplitSpin
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-3 sm:mb-4 px-2">
            Hirap Ka Na Ba sa Workout Split Mo?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 sm:mb-4 px-2 max-w-3xl mx-auto">
            Let the wheel decide your next training plan for this week!
          </p>
          <Badge variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2">
            🇵🇭 Filipino Fitness Spinner
          </Badge>
        </div>

        {!showWorkoutProgram ? (
          <>
            {/* Spinning Wheel */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] aspect-square">
                {/* Main Wheel Container */}
                <div className="relative w-full h-full drop-shadow-2xl">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 500"
                    className="transition-transform duration-[4000ms] ease-out cursor-pointer w-full h-full"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={spinWheel}
                  >
                    {wheelSegments.map((segment, index) => {
                      // Convert degrees to radians, segments start from 0 degrees (right side)
                      const startAngleRad =
                        segment.startAngle * (Math.PI / 180);
                      const endAngleRad = segment.endAngle * (Math.PI / 180);
                      const midAngleRad = segment.middleAngle * (Math.PI / 180);

                      const largeArcFlag =
                        segment.degreesPerSegment > 180 ? 1 : 0;
                      const radius = 240;
                      const x1 = 250 + radius * Math.cos(startAngleRad);
                      const y1 = 250 + radius * Math.sin(startAngleRad);
                      const x2 = 250 + radius * Math.cos(endAngleRad);
                      const y2 = 250 + radius * Math.sin(endAngleRad);

                      // Text positioning along the arc
                      const textRadius = 160;

                      return (
                        <g key={index}>
                          {/* Segment path */}
                          <path
                            d={`M 250 250 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={segment.color}
                            stroke="#ffffff"
                            strokeWidth="3"
                            className="hover:brightness-110 transition-all duration-200"
                          />

                          {/* Text path for curved text */}
                          <defs>
                            <path
                              id={`textPath${index}`}
                              d={`M ${
                                250 + textRadius * Math.cos(startAngleRad)
                              } ${
                                250 + textRadius * Math.sin(startAngleRad)
                              } A ${textRadius} ${textRadius} 0 ${largeArcFlag} 1 ${
                                250 + textRadius * Math.cos(endAngleRad)
                              } ${250 + textRadius * Math.sin(endAngleRad)}`}
                            />
                          </defs>

                          {/* Curved text */}
                          <text
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            textAnchor="middle"
                            className="select-none font-sans"
                            style={{
                              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                            }}
                          >
                            <textPath
                              href={`#textPath${index}`}
                              startOffset="50%"
                            >
                              {segment.name}
                            </textPath>
                          </text>
                        </g>
                      );
                    })}

                    {/* Center circle with gradient */}
                    <defs>
                      <radialGradient
                        id="centerGradient"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f8f9fa" />
                      </radialGradient>
                    </defs>
                    <circle
                      cx="250"
                      cy="250"
                      r="60"
                      fill="url(#centerGradient)"
                      stroke="#e9ecef"
                      strokeWidth="4"
                      className="drop-shadow-lg"
                    />

                    {/* Center text */}
                    <text
                      x="250"
                      y="240"
                      fill="#495057"
                      fontSize="18"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none cursor-pointer font-sans"
                      onClick={spinWheel}
                    >
                      Tap to
                    </text>
                    <text
                      x="250"
                      y="265"
                      fill="#495057"
                      fontSize="18"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="select-none cursor-pointer font-sans"
                      onClick={spinWheel}
                    >
                      spin
                    </text>
                  </svg>

                  {/* Enhanced triangular pointer - pointing down from the top */}
                  <div className="absolute top-[-4px] sm:top-[-6px] md:top-[-8px] left-1/2 transform -translate-x-1/2 z-10">
                    <div className="relative">
                      {/* Main pointer triangle pointing down */}
                      <div
                        className="w-0 h-0 border-l-[15px] sm:border-l-[20px] md:border-l-[25px] border-r-[15px] sm:border-r-[20px] md:border-r-[25px] border-t-[25px] sm:border-t-[32px] md:border-t-[40px] border-l-transparent border-r-transparent border-t-red-600"
                        style={{
                          filter: "drop-shadow(2px 2px 6px rgba(0,0,0,0.4))",
                        }}
                      ></div>
                      {/* Inner highlight for 3D effect */}
                      <div className="absolute top-[7px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[18px] border-r-[18px] border-t-[28px] border-l-transparent border-r-transparent border-t-red-400"></div>
                      {/* White center dot */}
                      <div className="absolute top-[-3px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-red-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <div className="text-center mb-8 sm:mb-12 px-4">
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 text-sm sm:text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full max-w-xs sm:max-w-sm md:max-w-none md:w-auto"
              >
                {isSpinning ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm sm:text-base md:text-lg">Spinning...</span>
                  </div>
                ) : (
                  <span className="text-sm sm:text-base md:text-lg">🎯 Spin the Wheel!</span>
                )}
              </Button>
            </div>
          </>
        ) : (
          selectedSplit &&
          workoutPrograms[selectedSplit as keyof typeof workoutPrograms] && (
            <div className="px-2 sm:px-4">
              {/* Back to Wheel Button */}
              <div className="text-center mb-6 sm:mb-8">
                <Button
                  onClick={handleBackToWheel}
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  ← Back to Wheel
                </Button>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Header Card */}
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white p-4 sm:p-6 md:p-8">
                    <div className="text-center">
                      <div className="flex justify-center mb-3 sm:mb-4">
                        <div className="bg-white/20 p-3 sm:p-4 rounded-full">
                          <span className="text-2xl sm:text-3xl md:text-4xl">🎯</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                        Your Workout Split
                      </CardTitle>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-3 sm:mb-4 px-2">
                        {selectedSplit}
                      </div>
                      <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-2">
                        {
                          workoutPrograms[
                            selectedSplit as keyof typeof workoutPrograms
                          ].description
                        }
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 px-2">
                      <Button
                        onClick={copyToClipboard}
                        variant="secondary"
                        size="lg"
                        className="bg-white/90 text-blue-700 hover:bg-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Copy Program
                      </Button>
                      <Button
                        onClick={takeScreenshot}
                        variant="secondary"
                        size="lg"
                        className="bg-white/90 text-green-700 hover:bg-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Screenshot
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">💪</span>
                      <span>Workout Schedule & Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    {workoutPrograms[
                      selectedSplit as keyof typeof workoutPrograms
                    ].sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="mb-6 sm:mb-8 md:mb-10 last:mb-0">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 sm:p-5 md:p-6 rounded-t-xl">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-2">
                            <span className="text-lg sm:text-xl md:text-2xl">🏋️</span>
                            <span>{session.name}</span>
                          </h3>
                          <div className="text-center">
                            <Badge
                              variant="secondary"
                              className="bg-yellow-500 text-black font-semibold px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base md:text-lg"
                            >
                              📅 {session.schedule}
                            </Badge>
                          </div>
                        </div>
                        <div className="bg-white rounded-b-xl shadow-lg border-2 border-gray-100 p-4 sm:p-5 md:p-6">
                          <div className="grid gap-3 sm:gap-4">
                            {session.exercises.map(
                              (exercise, exerciseIndex) => (
                                <div
                                  key={exerciseIndex}
                                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200"
                                >
                                  {/* Exercise details without image */}
                                  <div className="flex items-center flex-1 w-full sm:w-auto mb-3 sm:mb-0">
                                    <div className="flex-1">
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                                        <span className="font-bold text-gray-800 text-sm sm:text-base md:text-lg">
                                          {exercise.name}
                                        </span>
                                        <Badge
                                          variant="secondary"
                                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm w-fit"
                                        >
                                          {exercise.muscle}
                                        </Badge>
                                      </div>
                                      <span className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg bg-yellow-100 px-2 sm:px-3 py-1 rounded-full inline-block">
                                        {exercise.sets}
                                      </span>
                                    </div>
                                  </div>

                                  <Button
                                    variant="ghost"
                                    onClick={() =>
                                      window.open(
                                        `https://www.youtube.com/watch?v=${exercise.youtubeId}`,
                                        "_blank"
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-semibold rounded-full border-2 border-red-200 hover:border-red-300 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                                  >
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Watch Demo
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        )}

        {showCongratulations && selectedSplit && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-4 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-blue-500 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold">We have a winner!</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 md:p-8 text-center">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {selectedSplit}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                    {
                      workoutSplits.find((s) => s.name === selectedSplit)
                        ?.description
                    }
                  </p>
                </div>

                {/* Modal Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold bg-transparent"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleShowSplit}
                    size="lg"
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold"
                  >
                    Show Split
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-600 px-4 sm:px-6 lg:px-8">
          <p className="text-base sm:text-lg font-medium">
            💪 Stay consistent, stay strong! 🇵🇭
          </p>
          <p className="mt-2 text-sm sm:text-base">
            All exercise videos are linked to proper form demonstrations on
            YouTube.
          </p>
        </div>
      </div>
    </div>
  );
}
