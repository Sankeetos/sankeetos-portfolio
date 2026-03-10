import { MediaQuery } from "svelte/reactivity";
import { DEFAULT_MOBILE_BREAKPOINT } from "../components/ui/sankkit-model/constants.ts";

export class IsMobile extends MediaQuery {
	constructor(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
}
