export type CourseType = "Starter" | "Main Course" | "Dessert";
export type FilterType = "All" | CourseType;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
}
