import { Day, Program } from "@/logic/classes";

export const initialProgram = new Program("Strength Training", [
  new Day("Push Day", "Monday", ["Squat", "Bench Press", "Deadlift"]),
  new Day("Pull Day", "Wednesday", ["Pull Up", "Barbell Row", "Bicep Curl"]),
  new Day("Legs Day", "Friday", ["Leg Press", "Lunges", "Calf Raises"]),
]);
