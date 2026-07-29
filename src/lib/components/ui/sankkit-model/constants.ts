import { Vector3 } from 'three';

// The field of view of the scene seen on the display at any given moment
export const FOV = 75;
export const LARGE_SCALE = 1.3;
export const WIDTH = window.innerWidth;
export const HEIGHT = window.innerHeight;
export const DEFAULT_MOBILE_BREAKPOINT = 768;
// Width of the element divided by the height, to not get a squished image
export const ASPECT_RATIO = WIDTH / HEIGHT;
export const DEFAULT_POSITION = new Vector3(0, 1.5, 0);
