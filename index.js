/* Your Code Here */
function createEmployeeRecord(employeeInfo) {
    return {
      firstName: employeeInfo[0],
      familyName: employeeInfo[1],
      title: employeeInfo[2],
      payPerHour: employeeInfo[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeInfo => createEmployeeRecord(employeeInfo));
  }
function createTimeInEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const [hour] = time.split(":").map(num => parseInt(num, 10));  
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}
function createTimeOutEvent (employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const [hour] = time.split (":").map(num => parseInt(num, 10));
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}
function hoursWorkedOnDate (employeeRecord, date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    const timeIn = new Date(`2000-01-01T${timeInEvent.hour}:00:00`);
    const timeOut = new Date(`2000-01-01T${timeOutEvent.hour}:00:00`);

    const hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60)
    return hoursWorked;
}
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payOwed = hoursWorked * employeeRecord.payPerHour;
    if (isNaN(payOwed)) {
        console.error("Invalid wagesEarned calculation for employeeRecord:", employeeRecord);
        return 0;
      }

    return payOwed;
  }

  function allWages(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    const allWages = dates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return allWages;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
    return totalPayroll;
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

