// Some code snippets have been provided to you for ease of coding.
// You can choose to remove or change any of them to suit your needs.

var outstandingtasks=[];
var finishedtasks=[];
var maxtaskid=0;
var maxTaskCount = 10;

function bootstrap()
{
    // Code for Q7 starts here. This code restores the values
    // of variables to their previous values (i.e., before browser
    // was closed). 
    var storedOutstanding = localStorage.getItem("outstandingtasks");

    if (storedOutstanding) {
        outstandingtasks = JSON.parse(storedOutstanding);
    }

    var storedFinished = localStorage.getItem("finishedtasks");

    if (storedFinished) {
        finishedtasks = JSON.parse(storedFinished);
    }

    var storedmaxtaskid = localStorage.getItem("maxtaskid");

    if (storedmaxtaskid) {
        maxtaskid = JSON.parse(storedmaxtaskid);
    }

    displayfunction();
    // Code for Q7 ends here.
}

function addfunction()
{
    // Code for Q2 starts here. This function uses DOM read
    // to get the values of HTML fields. Subsequently, it
    // adds them to the JS variable called outstandingtasks. 
    // You are also required to save the contents of this variable
    // in a JS cookie (Q7). 
    var description = document.getElementById("taskDescription").value;
    var priority = document.getElementById("priority").value;
    var deadline = document.getElementById("deadline").value;

    if (outstandingtasks.length >= maxTaskCount) {
        alert("Error: The outstanding tasks list is already full.");
        return;
    }

    if (description && priority && deadline) {
        maxtaskid++;
        var newTask = {
            Serial: maxtaskid,
            Description: description,
            Priority: priority,
            Deadline: deadline
        };
        outstandingtasks.push(newTask);
        displayfunction();
        localStorage.setItem("maxtaskid", JSON.stringify(maxtaskid));
        localStorage.setItem("outstandingtasks", JSON.stringify(outstandingtasks));
    } else {
        alert("Error: Please fill in all the fields.");
    }
    //Code for Q2 ends here.
    console.log(outstandingtasks);
}

function finishfunction()
{
    // Code for Q3 starts here. This function uses DOM read to
    // get the serial number from the user. Subsequently, it
    // searches/finds the Task matching the serial number and
    // deletes the task from outstandingtasks. Do not forget to
    // add the task to finished tasks before deleting it.
    var taskID = document.getElementById("taskID").value;

    if (taskID) {
        var index = outstandingtasks.findIndex(task => task.Serial == taskID);
        if (index !== -1) {
            var completedTask = outstandingtasks.splice(index, 1)[0];
            finishedtasks.push(completedTask);
            displayfunction();
            localStorage.setItem("outstandingtasks", JSON.stringify(outstandingtasks));
            localStorage.setItem("finishedtasks", JSON.stringify(finishedtasks));
        } else {
            alert("Error: Task not found in outstanding tasks.");
        }
    } else {
        alert("Error: Please enter a task ID.");
    }
    // Code for Q3 ends.
    console.log(outstandingtasks);
}

function displayfunction()
{
    // Code for Q4 starts here. This function identifies the HTML
    // element corresponding to the Tables for outstanding 
    // and finished tasks. You must create the table by adding rows,
    // columns, and finally populate the text in the table. Code
    // for Outstanding tasks and finished tasks is similar. Use
    // the Demo code used in class as a starting point for table
    // creation using JS.
    var outstandingTable = document.getElementById("displayoutstanding").getElementsByTagName('tbody')[0];

    outstandingTable.innerHTML = "";

    for (var i = 0; i < outstandingtasks.length; i++) {
        var row = outstandingTable.insertRow();
        row.insertCell(0).textContent = outstandingtasks[i].Serial;
        row.insertCell(1).textContent = outstandingtasks[i].Description;
        row.insertCell(2).textContent = outstandingtasks[i].Priority;
        row.insertCell(3).textContent = outstandingtasks[i].Deadline;
        row.insertCell(4).textContent = "Outstanding";
    }

    var completedTable = document.getElementById("displaycompleted").getElementsByTagName('tbody')[0];

    completedTable.innerHTML = "";

    for (var i = 0; i < finishedtasks.length; i++) {
        var row = completedTable.insertRow();
        row.insertCell(0).textContent = finishedtasks[i].Serial;
        row.insertCell(1).textContent = finishedtasks[i].Description;
        row.insertCell(2).textContent = finishedtasks[i].Priority;
        row.insertCell(3).textContent = finishedtasks[i].Deadline;
        row.insertCell(4).textContent = "Completed";
    }
    // Code for Q4 ends.
}

function clearAllLists() 
{
    outstandingtasks=[];
    finishedtasks=[];
    maxtaskid=0;

    localStorage.setItem("outstandingtasks", JSON.stringify(outstandingtasks));
    localStorage.setItem("finishedtasks", JSON.stringify(finishedtasks));
    localStorage.setItem("maxtaskid", JSON.stringify(maxtaskid));

    var outstandingTable = document.getElementById("displayoutstanding").getElementsByTagName('tbody')[0];
    outstandingTable.innerHTML = "";

    var completedTable = document.getElementById("displaycompleted").getElementsByTagName('tbody')[0];
    completedTable.innerHTML = "";
}