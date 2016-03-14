# ChemBot
A Facebook Messenger bot that provides utilities to help you with chemistry homework.

## How to Use
Send a Facebook message query to [Chem Bot](https://www.facebook.com/profile.php?id=100011464905608&fref=ts).

### Available Commands
+ [element symbol] - finds the element with that symbol and returns relevant information.
+ mm [compound] - returns the molar mass of a compound. Requires proper capitalization.
+ balance [equation] - returns a balanced form of a chemical equation. Requires proper capitalization.
+ help - displays list of commands and descriptions.

## Set up Your Own
You might want to set up your own ChemBot, as mine will not always be running. Here's how.

1. Create a Facebook account with the name of your own ChemBot and a fake email. 
Remember to verify the Facebook account through the fake email account before proceeding.

2. Clone this repo
  ```shell
  git clone https://github.com/avikj/ChemBot.git
  ```

3. Install necessary modules from npm, making sure that you are using Python 2.7.
  ```shell
  npm install --python=python2.7
  ```

4. Rename secretData.json.example to secretData.json and supply your own Wolfram|Alpha API key, the fake email address that you used, and the Facebook account's password.
  It should look something like this.
  ```json
  {
  	"WOLFRAM_API_KEY": "ABCDE-F124XYZ",
  	"FACEBOOK_EMAIL": "chembot@example.com",
  	"FACEBOOK_PASSWORD": "chembotpassword"
  }
  ```

5. Now that the bot has been set up, you can run it.
  ```javascript
  node main.js
  ```
This process must be running continuously, as the bot will only be able to respond while it is listening on incoming data. 
You can run the process on a separate computer or use a service such as Heroku to keep it up consistently.

6. Once the program is running, you can send Facebook messages to your ChemBot's Facebook account and recieve replies.

