export class Program {
  name: string = "";
  days: Day[] = [];
  constructor(name: string,days: Day[] = []) {
    this.name = name;
    this.days = days;
  }
  addDay(day: Day) {
    this.days.push(day);
  }
}

export class Day {
  name: string;
  day: string;
  exercises: string[];
  constructor(name: string, day: string, exercises: string[] = []) {
    this.name = name;
    this.day = day;
    this.exercises = exercises;
  }
  addExercise(exercise: string) {
    this.exercises.push(exercise);
  }
}

export class Set {
  weight: number;
  reps: number;
  constructor(weight: number, reps: number) {
    this.weight = weight;
    this.reps = reps;
  }
}
export class Performance {
  exerciseName: string;
  sets: Set[] = [];
  constructor(exerciseName: string) {
    this.exerciseName = exerciseName;
  }
  addSet(weight: number, reps: number) {
    this.sets.push(new Set(weight, reps));
  }
}

export class Session {
  date: Date;
  program: Day;
  performances: Performance[] = [];
  constructor(date: Date, program: Day) {
    this.date = date;
    this.program = program;
  }
}
