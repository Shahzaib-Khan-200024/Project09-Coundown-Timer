#!/usr/bin/env node

// // Project 9
// import { differenceInSeconds } from 'date-fns';
// import inquirer from 'inquirer';

// const res = await inquirer.prompt({
//     type: "number",
//     name: "userInput",
//     message: "Enter amount of second",
//     validate: (input) => {
//         if (isNaN(input )){
//             return "Please enter valid number"

//         } else if (input > 60){
//             return "second must within 60"

//         } else {
//             return true;
//         }
//     }


// });

// let input = res.userInput

// function startTime(val: number) {
//     const intTime = new Date().setSeconds(new Date().getSeconds() + val)
//     const intervalTime = new Date(intTime);
//     setInterval(()=>{
//         const currentTime = new Date()
//         const timeDiff = differenceInSeconds(intervalTime,currentTime)
//         if(timeDiff <=0){
//             console.log('Time has expired');
//             process.exit();
//         }
//         const min = Math.floor((timeDiff%(3600*24))/3600)
//         const sec = Math.floor(timeDiff% 60);
//         console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}}`);
        
//     }, 1000);
    
// }

// startTime(input)




// uper wale code mn 4 se 5 errors the is liye niche wala code chatGPT se generated hai but still is mn ek error hai jo solve nahi ho raha lekin us error ke saath code run ho raha hai








import { differenceInSeconds } from 'date-fns';
import inquirer from 'inquirer';

interface Answer {
  userInput: number;
}

const questions: inquirer.QuestionCollection = [
  {
    type: 'number',
    name: 'userInput',
    message: 'Enter amount of seconds',
    validate: (input: any) => {
      if (isNaN(input)) {
        return 'Please enter a valid number';
      } else if (input > 60) {
        return 'Seconds must be within 60';
      } else {
        return true;
      }
    },
  },
];

(async () => {
  const res = await inquirer.prompt<Answer>(questions);

  const input: number = res.userInput;

  function startTime(val: number) {
    const endTime = new Date(new Date().getTime() + val * 1000); // Set the end time

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = differenceInSeconds(endTime, currentTime);

      if (timeDiff <= 0) {
        console.log('Time has expired');
        clearInterval(intervalId); // Clear the interval to stop the timer
        process.exit();
      }

      const minutes = Math.floor(timeDiff / 60);
      const seconds = Math.floor(timeDiff % 60);
      console.log(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

    }, 1000);

    // Allow user to cancel the countdown
    process.stdin.on('data', (data) => {
      const input = data.toString().trim().toLowerCase();
      if (input === 'exit') {
        console.log('Countdown canceled.');
        clearInterval(intervalId);
        process.exit();
      }
    });
  }

  startTime(input);
})();
