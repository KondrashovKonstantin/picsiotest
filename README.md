# TEST TASK FOR PICS.IO  

### Get started

**Preconditions:**

- [Docker](https://docs.docker.com/desktop/) installed  
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/) installed  

Clone repository  
`git clone https://github.com/KondrashovKonstantin/picsiotest.git`  

Navigate to the root folder  
`cd picsiotest`

Run `docker-compose build` to build the app  
Then run `dockor-compose up -d` to up the app  
  
You need to run build and up commands after each code change.  

Use `docker-compose logs app -f` command to check app logs
  
Go to `http://localhost:3000/docs` if swagger documentation is opened then setup is ok.

Use `mongodb://localhost:27018` to access containerized db locally

### Swagger documentation
  
You can use Swagger docs page to test the app.  
  
To create a new user:  
1. go to User Controler sign-up router
2. click **"Try it out"**
3. change the username and password or use the default
4. click **"execute"**  
  
To login:
1. go to User Controler sign-in router
2. click **"Try it out"**
3. change the username and password or use the default
4. click **"execute"**  
5. copy `token` from the response body
6. click **"authorize"** at the top of the screen
7. paste the token to the login field
8. Done! Now you can use *protected* `events` API

### .env  

Set **STRATEGY** variable in `.env` file to change the default strategy  

By default, the app contains 3 destination dictionaries (dictionaries from "TEST" paragraph of the task), also
you can add your custom JSON dictionaries to the root folder.
Set **DEFAULT_DESTINATIONS_JSON** variable in `.env` file with destination dictionary JSON file name *(without extension)*
to change default destinations.

Also, you can check `payload.txt` file from the root of the project, it contains test payloads in JSON format



