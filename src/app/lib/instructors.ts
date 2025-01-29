export interface Instructors {
  id?: string|number;
  course_id?: string|number;
  user_id?: string|number;
  type: string;
  user: {[key: string]: string|number},
}
