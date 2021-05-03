# request-o-bot

## Description
Checks the provided url with set periodicity, logs and notifies specific entries through dedicated channels, managed by plugins.
Client can provide self-written plugins and notification mappers, to add complementary messaging channels and change sending messages.

## Plugins available at this moment
    * SMS - Done
    * Email - In progress
    * Messangers - To be done

## Setup
  1) npm i
  2) Follow the examples and setup your personal request environment

## Configurations
To run the bot, one MUST provide envirenment variables that feed services: 
- SCHEDULE_FOR=30 - How long should scheduler run the task(TO BE DONE).
- REQUEST_URL=https://path/to/api - Endpoint to fetch data from.
- SHOULD_LOG=TRUE - Logging flag.
- LOGS_PATH=C:/path/to/logs or ./logs - Logging path.
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN - creds from twilio, you must register account and get your phone number if you want to get sms notifications.
- PHONE_FROM=+15558675310 - Twilio registered phone that is used to send notifications to your phone.
- PHONE_TO=+15558675310 - Your phone to recieve notifications.

## Run examples:
    * Advanced: npm run example1
    * This example shows how one can provide custom Notification mapper, that will mutate notification message for SMS notification.

# IN PROGRESS