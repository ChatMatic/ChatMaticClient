AccountConfigurationModels = {
    NewAccount: function(accountTypeId, accountName, showNotifications, muteAllSounds) {

        return {
            accountTypeId: accountTypeId,
            accountName: accountName,
            showNotifications: showNotifications,
            muteAllSounds: muteAllSounds
        }
    }
};


module.exports = AccountConfigurationModels;