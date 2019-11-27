

# GateKeeper
> An Entry Management Software

GateKeeper is an entry management software used to keep track of the visitors in and out of the office.
GateKeeper provides hassle free experience for visitors to Check-in & Check-out easily and accurately.

## Technologies Used

Frontend : HTML ,CSS ,JAVASCRIPT, ParticlesJS
Backend  : NodeJS
Database : MongoDB
API's    : Twilio


## Installing / Getting started

A quick introduction of the minimal setup you need to set up the app &
running.

Make sure Nodejs is installed.After successfully installing Nodejs,run the following commands in the terminal.

```shell
npm install --save  #installs all the dependencies used in the project
node index.js       #starts the app server
```

The first command initializes the project with a package.json file and installs all the dependencies used in the project which are listed down in package.json file.
The second command starts the app server and you can access the web app by visiting http://localhost:3000/ on your laptop/pc.
Note:- If you change the port number in config.js file , then remember to change the port number while visiting the above URL too.

### Initial Configuration

Open the config.js file located in the config folder.

In the config.js file,
* User must configure the Twilio credentials by entering the authToken and accounSid information.
* User must configure the mLab credentials by entering the mLab database username and password.
* User can also change the port number, if required.

In the index.js file,
* User must enter the email id and password in order to allow nodemailer to send emails using the provided email id.
Note:- The Allow less secured apps must be checked in Gmail so as to send mails smoothly.

P.S: Twilio API has been used for sending out SMS and Nodejs nodemailer has been used for sending out emails.

## Features

* While entering the office,the Visitor needs to check-in using GateKeeper Software. During        Check-in he/she is required to fill the checkin form which contains fields like vistors name,    email and number along with the host's name,email and number.

* As soon as the visitor submits the checkin form :-

    * The visitor receives an email and a SMS which contains his/her visiting ID (which is         unique for everyone & will be required during checkout).

    * The host also receives an email and a SMS which contains the Visitor's information like      the visitor's name,email,number,checkin time.


* After the meeting or visit is over, the visitor needs to check out by entering his visiting ID   in the checkout form, which is then verified and the visitor ,thus,successfully checks out.

* As soon as the visitor successfully checks out :-

    * The visitor receives an email and a SMS which contains his/her visiting details, which       includes his name,number,checkin time,checkout time,host name and the address visited.
    * The host also receives an email and a SMS notifying him that the visitor has checked out     successfully.


## Links

- Repository: https://github.com/akt114/GateKeeper
