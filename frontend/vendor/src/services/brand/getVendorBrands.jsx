import { BrandList } from "adapters/brand/brandList";

export function getVendorBrands(){
  return BrandList('get-brands');
}