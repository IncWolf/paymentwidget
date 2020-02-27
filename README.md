# PaymentWidget
Test Task from PaymentWall

## Goal
Build a JavaScript-based payment widget

## Stack
You can use any of the following JavaScript frameworks: React, Angular (except AngularJS 1.x) or you
can go with Vanilla JavaScript.
You can use any front-end framework. For e.g. Bootstrap, Foundation, etc.
You can use any suitable build tool for the framework of choice.

## Requirements
Widget should work in the latest versions of Chrome, Firefox and Safari and in IE10 and up.
Widget should be mobile-first and support screen width from 320px and up.
Widget should accept amount parameter. For e.g. "5 USD".
Widget should contain following components:
* Country selector
* payment method selector
* payment method form
* success/error screen

## Country selector
By default geolocated country is used. If user changes the country, payment methods should be pulled from the
API. (Instructions how to get an API key are in the next section)
Payment method selector
The following steps should be completed to get an API key:
* Sign up as a merchant at https://www.paymentwall.com (You can use any URL in the Merchant URL
field);
* go to https://api.paymentwall.com/developers/applications;
* select your project;
* activate evaluation mode;
* get an API key.

After previous steps are completed, payment methods can be pulled from the API.
Payment methods in selector should have a logotype and a name.

## Payment method form
Payment method form for any of the payment methods should be a card form (only for the test task).
Card form should contain the following elements and fields that should pass the respective validation
requirements:
* cardholder name (characters only);
* card number (numbers only, Luhn algorithm);
* exp. date (a valid date in future);
* cvv (numbers only);
submit button `Pay ${amount} ${currency}`.

Fields shoud be validated on input, focus change and submit. Proper error messages should be shown. If the
form is valid success screen should be shown.

The source code of the test task should be shared through GitHub or similar service and the test task itself
should be hosted on the GitHub Pages or similar service.
