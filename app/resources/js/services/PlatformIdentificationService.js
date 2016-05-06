const Platforms = require("../statics/PlatformsEnum.js");

PlatformIdentificationService = {

    getCurrentPlatform: function() {
        if (process.platform === 'darwin') {
            return Platforms.OSX;
        } else if (process.platform === 'linux') {
            return Platforms.LINUX;
        } else if (process.platform === 'win32' || process.platform === 'win64') {
            return Platforms.WINDOWS;
        }
        return false
    }
};

module.exports = PlatformIdentificationService;