How to run test
======
1. go to 'api-tests' folder

   $cd api-tests

2. choose ENV and run test cases:

   NODE_ENV=BOS npm run BOS

   NODE_ENV=Xendit npm run Xendit
   
3. console will print api request and response log

4. when finished, will generate json and xml report in local folder, 
   you can open it via browser and view the result report

clean report files
======
   Json and xml report files are saved in folder api-tests/results, you can clean this folder by run:

   $npm run clean