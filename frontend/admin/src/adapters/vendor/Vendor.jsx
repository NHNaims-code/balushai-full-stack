import { Get , Update} from "../xhr";

export function Vendors(path) {
    return Get(path);
}

export function UpdateVendor(path, data) {
    return Update(path, data);
}

export function SingleVendor(path) {
    return Get(path);
}
export function CountVendors(path) {
    return Get(path);
}

