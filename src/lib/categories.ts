export const CATEGORIES: { [key: string]: { color: string } } = {
  "General Knowledge": { color: "#e7e5e4" },
  "Entertainment: Books": { color: "#ec4899" },
  "Entertainment: Film": { color: "#f9a828" },
  "Entertainment: Music": { color: "#ec4899" },
  "Entertainment: Musicals & Theatres": { color: "#ec4899" },
  "Entertainment: Television": { color: "#ec4899" },
  "Entertainment: Video Games": { color: "#ec4899" },
  "Entertainment: Board Games": { color: "#ec4899" },
  "Science & Nature": { color: "#16a34a" },
  "Science: Computers": { color: "#16a34a" },
  "Science: Mathematics": { color: "#16a34a" },
  Mythology: { color: "#16a34a" },
  Sports: { color: "#fde047" },
  Geography: { color: "#3b82f6" },
  History: { color: "#fbbf24" },
  Politics: { color: "#fbbf24" },
  Art: { color: "#ec4899" },
  Celebrities: { color: "#ec4899" },
  Animals: { color: "#16a34a" },
  Vehicles: { color: "#fde047" },
  "Entertainment: Comics": { color: "#ec4899" },
  "Science: Gadgets": { color: "#16a34a" },
  "Entertainment: Cartoon & Animations": { color: "#ec4899" },
};

export function getColor(category: string) {
  return CATEGORIES[category].color;
}
