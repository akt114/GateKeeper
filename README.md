

# GateKeeper
> An Entry Management Software

GateKeeper is an entry management software used to keep track of the visitors in and out of the office.
GateKeeper provides hassle free experience for visitors to Check-in & Check-out easily and accuratelysss

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


## Features




## Links

- Repository: https://github.com/akt114/GateKeeper
