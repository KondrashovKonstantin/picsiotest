# TEST TASK FOR PICS.IO  

### Get started

**Preconditions:**

- [Docker](https://docs.docker.com/desktop/) installed  
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/) installed  

Clone repository  
`git clone https://github.com/KondrashovKonstantin/picsiotest.git`  

Navigate to root folder  
`cd picsiotest`

Run `docker-compose build` to build the app  
Then run `dockor-compose up -d` to up the app  
  
You need to run build and up commands after each code changes.  
  
Go to `http://localhost:3000/docs` if swagger documentation is opened then setup is ok.  

### Swagger documentation
  
You can use swagger docs page to test the app.  
  
To create new user:  
1. go to User Controler sign-up router
2. click **"try it out"**
3. change username and password or use the default
4. click **"execute"**  
  
To login:
1. go to User Controler sign-in router
2. click **"try it out"**
3. change username and password or use the default
4. click **"execute"**  
5. copy `token` from the response body
6. click **"authorize"** at the top of the screen
7. paste token to login field
8. Done! Now you can use *protected* `events` API

### .env  

Set **STRATEGY** variable in `.env` file to change default strategy  

By default app contains 3 destination dictonaries (dictonaries from "TEST" paragraph of task), also
you can add your custom json dictionaries to root folder.
Set **DEFAULT_DESTINATIONS_JSON** variable in `.env` file with destination dictonary json file name *(without extension)*
to change default destinations.

Also you can check `payload.txt` file from the root of project, it contains test payloads in json format



