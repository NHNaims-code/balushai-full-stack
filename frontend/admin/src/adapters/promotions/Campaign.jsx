import { Get, Post, Update } from "adapters/xhr";

export function addNewCampaign(path, data) {
    return Post(path, data);
}
export function GetCampaigns(path) {
    return Get(path);
}
export function UpdateCampaign(path, data) {
    return Update(path, data);
}