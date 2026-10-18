const outputColors = ['red', 'green', 'orange', 'blue', 'purple']
let outputColorIndex = -1

function applyOutputTextColor() {
  if (outputColorIndex === -1) return

  const output = document.getElementById('out')
  const color = outputColors[outputColorIndex]
  output.style.setProperty('color', color, 'important')
  output.querySelectorAll('*').forEach(element => {
    element.style.setProperty('color', color, 'important')
  })
}

// Helper function: writes any HTML into the #out div
function render(html) {
  document.getElementById('out').innerHTML = html
  applyOutputTextColor()
}

/* 
  Function 1 — greet()
  ---------------------
  - Prompt the user for their name
  - If they type something, display "Hello, NAME!"
  - If they cancel or leave blank, show a friendly message
*/
function greet() {
  const userName = prompt('What is your name?')
  if (!userName || !userName.trim()) {
    render("<p class= 'text-muted'> No name entered. </p>")
    return
  } else {
    render(`<p> Hello ${userName}! </p>`)
  }
}

/* 
  Function 2 — averageNumbers()
  ------------------------------
  - Prompt the user for a list of numbers separated by commas
  - Split the input into an array, turn into numbers
  - Calculate the average
  - Display the average AND the list of numbers
*/
function averageNumbers() {
  const nums = prompt('Enter a list of numbers separated by commas')
  if (!nums) {
    render("<p class= 'text-muted'> No numbers entered. </p>")
    return
  }

  const numArray = nums
    .split(',')
    .map(n => parseFloat(n.trim()))
    .filter(n => !isNaN(n))

  const sum = numArray.reduce((a, b) => a + b, 0)

  const avg = sum / numArray.length

  const list = numArray.map(n => `<li class = "list-group-item">${n}</li>`).join('')

  render(`<p> Average: <strong>${avg}</strong></p>
        <ul class = "list-group"> ${list}</ul>`)
}

/* 
  Function 3 — timeOfDay()
  -------------------------
  - Get the current hour from the computer clock
  - Decide whether it's morning, afternoon, or evening
  - Display a message like "Good morning!" 
*/
function timeOfDay() {
  const h = new Date().getHours()
  let msg = ''

  if (h < 12) {
    msg = 'Good morning!'
  } else if (h > 12 && h < 15) {
    msg = 'Good afternoon!'
  } else if (h > 15 && h < 18) {
    msg = 'Good evening!'
  }
  else {
    msg = 'Good night!'
  }

  render(`<p> ${msg} </p>`)
}


/* 
  Function 4 — randomBetween()
  -----------------------------
  - Prompt the user for a minimum and maximum number
  - Generate a random number between them
  - Display the result
  - Handle invalid input (like blanks or min >= max)
*/
function randomBetween() {
  // TODO: Write your code here
}

/* 
  Function 5 — clearOutput()
  ---------------------------
  - Clear whatever is inside #out
  - Replace it with a placeholder message like "Output cleared."
*/
function clearOutput() {
  render("<p class= 'text-muted'> Output cleared. </p>")
}

// ---- Event listeners for the demo buttons ----
document.getElementById('btnGreet').addEventListener('click', greet)
document.getElementById('btnAvg').addEventListener('click', averageNumbers)
document.getElementById('btnTime').addEventListener('click', timeOfDay)
document.getElementById('btnRandom').addEventListener('click', randomBetween)
document.getElementById('btnClear').addEventListener('click', clearOutput)
document.getElementById('btnBackground').addEventListener('click', changeBackground)

const topActionButtonIds = ['btnGreet', 'btnAvg', 'btnTime', 'btnRandom', 'btnClear']
topActionButtonIds.forEach(id => {
  document.getElementById(id).addEventListener('click', cycleOutputTextColor)
})



/* 
  ------------------------------------------
  Student Challenge Section 
  ------------------------------------------
  Add 4 new functions here, each with its own button in index.html:
  
  1) DONE: Change the page title text to something new.
  2) DONE: Each time you press the button, the output text color cycles through a few choices (red, green, orange, etc.).
  3) DONE: Press the button to change the background color of the output box to a random color.
  4) DONE: Angry mode 
  
  Write each function below, and don’t forget to connect each one 
  to a new button in index.html using addEventListener.
*/

// 2)
function cycleOutputTextColor() {
  outputColorIndex = (outputColorIndex + 1) % outputColors.length
  applyOutputTextColor()
}

// 3)
function changeBackground() {
  const color = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`
  document.getElementById('out').style.backgroundColor = color
}

//4)
function toggleAngryMode() {
  const isAngry = document.body.classList.toggle('angry-mode')

  document.title = isAngry ? 'Runtime Rumble: Bugged Out!' : 'Random Buttons'
  document.querySelector('header h1').textContent =
    isAngry ? '⚠ CODE CHAOS: THE BUG STRIKES ⚠' : '🍂 Random Buttons'
  document.getElementById('btnAngry').textContent =
    isAngry ? 'Exit Code Chaos' : 'Angry Mode'
}

document.getElementById('btnAngry').addEventListener('click', toggleAngryMode)
