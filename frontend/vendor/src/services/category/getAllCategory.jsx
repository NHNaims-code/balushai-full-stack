import { CategoryList } from "adapters/category/categoryList";

export function getAllNestedCategory(){
  return CategoryList('get-categories');
}