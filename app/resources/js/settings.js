var toggleAddAccountForms = function(identifier) {
    jQuery('#' + identifier).toggle();

};

var addAccountFormSubmitted = function(formIdentifier) {

    switch (formIdentifier) {

        case AccountTypes.Facebook_Messenger:
            console.log('meow');
    }

};