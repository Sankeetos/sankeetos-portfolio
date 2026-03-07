/**
 * Helper function to check the operating system is MacOS or not.
 * @returns True if on MacOS or false otherwise.
 */
export const isMacOS = () => {
    const platform = globalThis.navigator.userAgentData.platform;

    if (platform == "macOS") {
        return true;
    }

    return false;
};
