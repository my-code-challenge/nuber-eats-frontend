import { useLocation } from "react-router";

export function useQueryString(string: string) {
    return new URLSearchParams(useLocation().search).get(string);
}
