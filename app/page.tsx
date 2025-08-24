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
            youtubeId: "jthXMLGaP3M",
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
            youtubeId: "UCXxvVItLoM",
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
            youtubeId: "tyWVbcHHjkg",
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
            youtubeId: "EdtaJRBqEYI",
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
            youtubeId: "tyWVbcHHjkg",
          },
          {
            name: "Kelso Shrugs",
            sets: "1 set",
            muscle: "Upper Body",
            youtubeId: "g6qZGh9f6d0",
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
            youtubeId: "RTraFBdS428",
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
            youtubeId: "jthXMLGaP3M",
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
            youtubeId: "CLDthJcMZgQ",
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
            youtubeId: "EdtaJRBqEYI",
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
            youtubeId: "ph3pddpKzzw",
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
            youtubeId: "wkD8rjkodUI",
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

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowWorkoutProgram(false);
    setShowCongratulations(false);

    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      const segmentAngle = 360 / workoutSplits.length;
      const normalizedRotation = finalRotation % 360;

      // Adjust for pointer position and account for clockwise rotation
      const adjustedAngle = (normalizedRotation + 90) % 360;
      const selectedIndex =
        Math.floor(adjustedAngle / segmentAngle) % workoutSplits.length;

      setSelectedSplit(workoutSplits[selectedIndex].name);
      setIsSpinning(false);
      setShowCongratulations(true);
    }, 4000); // Increased spin duration for better effect
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            SplitSpin
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-4">
            Hirap Ka Na Ba sa Workout Split Mo?
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            Let the wheel decide your next training plan for this week!
          </p>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            🇵🇭 Filipino Fitness Spinner
          </Badge>
        </div>

        {!showWorkoutProgram ? (
          <>
            {/* Spinning Wheel */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                {/* Main Wheel Container */}
                <div className="relative w-[500px] h-[500px] drop-shadow-2xl">
                  <svg
                    width="500"
                    height="500"
                    viewBox="0 0 500 500"
                    className="transition-transform duration-[4000ms] ease-out cursor-pointer"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={spinWheel}
                  >
                    {workoutSplits.map((split, index) => {
                      const segmentAngle = 360 / workoutSplits.length;
                      const startAngle =
                        (index * segmentAngle - 90) * (Math.PI / 180);
                      const endAngle =
                        ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
                      const midAngle = (startAngle + endAngle) / 2;

                      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                      const radius = 240;
                      const x1 = 250 + radius * Math.cos(startAngle);
                      const y1 = 250 + radius * Math.sin(startAngle);
                      const x2 = 250 + radius * Math.cos(endAngle);
                      const y2 = 250 + radius * Math.sin(endAngle);

                      // Text positioning along the arc
                      const textRadius = 160;
                      const textAngle = midAngle + Math.PI / 2; // Rotate text to follow arc

                      return (
                        <g key={index}>
                          {/* Segment path */}
                          <path
                            d={`M 250 250 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={split.color}
                            stroke="#ffffff"
                            strokeWidth="3"
                            className="hover:brightness-110 transition-all duration-200"
                          />

                          {/* Text path for curved text */}
                          <defs>
                            <path
                              id={`textPath${index}`}
                              d={`M ${
                                250 + textRadius * Math.cos(startAngle)
                              } ${
                                250 + textRadius * Math.sin(startAngle)
                              } A ${textRadius} ${textRadius} 0 ${largeArcFlag} 1 ${
                                250 + textRadius * Math.cos(endAngle)
                              } ${250 + textRadius * Math.sin(endAngle)}`}
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
                              {split.name}
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

                  {/* Enhanced triangular pointer */}
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3">
                    <div className="relative">
                      <div
                        className="w-0 h-0 border-t-[20px] border-b-[20px] border-l-[35px] border-t-transparent border-b-transparent border-l-blue-500"
                        style={{
                          filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.3))",
                        }}
                      ></div>
                      {/* Inner highlight for 3D effect */}
                      <div
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 w-0 h-0 border-t-[15px] border-b-[15px] border-l-[25px] border-t-transparent border-b-transparent border-l-blue-400"
                        style={{ left: "-30px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <div className="text-center mb-12">
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSpinning ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Spinning...
                  </div>
                ) : (
                  "🎯 Spin the Wheel!"
                )}
              </Button>
            </div>
          </>
        ) : (
          selectedSplit &&
          workoutPrograms[selectedSplit as keyof typeof workoutPrograms] && (
            <div>
              {/* Back to Wheel Button */}
              <div className="text-center mb-8">
                <Button
                  onClick={handleBackToWheel}
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-8 py-3 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  ← Back to Wheel
                </Button>
              </div>

              <div className="space-y-8">
                {/* Header Card */}
                <Card className="shadow-2xl border-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 text-white p-8">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-white/20 p-4 rounded-full">
                          <span className="text-4xl">🎯</span>
                        </div>
                      </div>
                      <CardTitle className="text-4xl font-bold mb-3">
                        Your Workout Split
                      </CardTitle>
                      <div className="text-3xl font-bold text-yellow-300 mb-4">
                        {selectedSplit}
                      </div>
                      <CardDescription className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        {
                          workoutPrograms[
                            selectedSplit as keyof typeof workoutPrograms
                          ].description
                        }
                      </CardDescription>
                    </div>
                    <div className="flex justify-center gap-6 mt-8">
                      <Button
                        onClick={copyToClipboard}
                        variant="secondary"
                        size="lg"
                        className="bg-white/90 text-blue-700 hover:bg-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Program
                      </Button>
                      <Button
                        onClick={takeScreenshot}
                        variant="secondary"
                        size="lg"
                        className="bg-white/90 text-green-700 hover:bg-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Screenshot
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                    <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                      <span className="text-2xl">💪</span>
                      Workout Schedule & Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {workoutPrograms[
                      selectedSplit as keyof typeof workoutPrograms
                    ].sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="mb-10 last:mb-0">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-6 rounded-t-xl">
                          <h3 className="text-2xl font-bold text-center flex items-center justify-center gap-3 mb-2">
                            <span className="text-2xl">🏋️</span>
                            {session.name}
                          </h3>
                          <div className="text-center">
                            <Badge
                              variant="secondary"
                              className="bg-yellow-500 text-black font-semibold px-4 py-2 text-lg"
                            >
                              📅 {session.schedule}
                            </Badge>
                          </div>
                        </div>
                        <div className="bg-white rounded-b-xl shadow-lg border-2 border-gray-100 p-6">
                          <div className="grid gap-4">
                            {session.exercises.map(
                              (exercise, exerciseIndex) => (
                                <div
                                  key={exerciseIndex}
                                  className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200"
                                >
                                  {/* Thumbnail + details */}
                                  <div className="flex items-center flex-1">
                                    <div className="w-28 h-20 flex-shrink-0 mr-4">
                                      <a
                                        href={`https://www.youtube.com/watch?v=${exercise.youtubeId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Watch ${exercise.name} demo on YouTube`}
                                      >
                                        <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-gray-100">
                                          <img
                                            src={`https://img.youtube.com/vi/${exercise.youtubeId}/hqdefault.jpg`}
                                            alt={`${exercise.name} thumbnail`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white" />
                                          </div>
                                        </div>
                                      </a>
                                    </div>

                                    <div className="flex-1">
                                      <div className="flex items-center gap-4 mb-3">
                                        <span className="font-bold text-gray-800 text-lg">
                                          {exercise.name}
                                        </span>
                                        <Badge
                                          variant="secondary"
                                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-3 py-1"
                                        >
                                          {exercise.muscle}
                                        </Badge>
                                      </div>
                                      <span className="text-gray-700 font-semibold text-lg bg-yellow-100 px-3 py-1 rounded-full">
                                        {exercise.sets}
                                      </span>
                                    </div>
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={() =>
                                      window.open(
                                        `https://www.youtube.com/watch?v=${exercise.youtubeId}`,
                                        "_blank"
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 px-6 py-3 font-semibold rounded-full border-2 border-red-200 hover:border-red-300 transition-all duration-300"
                                  >
                                    <Play className="w-5 h-5 mr-2" />
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
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
              {/* Modal Header */}
              <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">We have a winner!</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 text-center">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedSplit}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {
                      workoutSplits.find((s) => s.name === selectedSplit)
                        ?.description
                    }
                  </p>
                </div>

                {/* Modal Buttons */}
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleCloseModal}
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 text-lg font-semibold bg-transparent"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleShowSplit}
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Show Split
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="text-lg font-medium">
            💪 Stay consistent, stay strong! 🇵🇭
          </p>
          <p className="mt-2">
            All exercise videos are linked to proper form demonstrations on
            YouTube.
          </p>
        </div>
      </div>
    </div>
  );
}
