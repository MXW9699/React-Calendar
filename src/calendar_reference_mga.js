class Calendar {
  constructor(schedule) {

    // List of weeks

    const mainTable = this.setupTable();


    const nWeeks = schedule.length;
    mainTable.style.gridTemplateRows = '50px ' + 'minmax(100px, 200px) '.repeat(nWeeks)

    const nColumns = 6;
    mainTable.style.gridTemplateColumns = '100px ' + '1fr '.repeat(nColumns)

    const dayItems = []
    {
      const firstLabel = document.createElement('div');
      dayItems.push(firstLabel)
      dayItems.className = 'emptyItem'
      mainTable.appendChild(firstLabel);
    }


    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    for (const day of DAYS) {
      const dayLabel = document.createElement('div');
      dayItems.push(dayLabel)
      dayLabel.innerText = day;
      dayLabel.className = 'topDay'
      mainTable.appendChild(dayLabel);
      console.log('appending', day)
    }

    const weeks = [];

    for (let w = 1; w <= nWeeks; w++) {
      const weekItems = []
      const weekStart = document.createElement('div');
      {
        weekItems.push(weekStart);
        weekStart.className = 'weekStart calendarItem';
        weekStart.innerText = `Week ${w}`
        mainTable.appendChild(weekStart);
      }

      const weekSchedule = schedule.filter(e => e.week === w)
      // week, day, unit, challenge, goals

      for (const day of DAYS) {
        const scheduled = weekSchedule.filter(e => e.day === day)
        let dayItem;
        if (scheduled.length === 0) {
          dayItem = document.createElement('div');
          dayItem.innerText = 'Nothing scheduled'
          dayItem.className = 'freeDay calendarItem'
        }
        else {
          const dayData = scheduled[0]
          dayItem = document.createElement('div');
          dayItem.className = 'scheduleDay calendarItem'
          const unitLabel = document.createElement('div');
          unitLabel.className = 'unitLabel'
          dayItem.appendChild(unitLabel);
          unitLabel.innerText = `Unit ${dayData.unit}: ${dayData.challenge}\n`;
          const dayLabel = document.createElement('div');
          dayLabel.className = 'dayLabel'
          dayItem.appendChild(dayLabel);
          const goalsList = document.createElement('ol');
          dayItem.appendChild(goalsList);
          dayData.goals.forEach( (goal) => {
            const li = document.createElement('li');
            li.innerText = goal;
            goalsList.appendChild(li)
          });
        }

        weekItems.push(dayItem);
        mainTable.appendChild(dayItem);
      }
    }
  }


  setupTable() {


    // const title = document.createElement('h1');
    // title.innerText = 'Social Calendar';
    // document.querySelector('body').appendChild(title);
    // document.getElementById('JSONDump').innerText = data;

    const titleCenter = document.createElement('div');
    titleCenter.className = 'center';
    const title = document.createElement('h1');
    title.innerHTML = 'Social Calendar';
    document.body.appendChild(titleCenter);
    titleCenter.appendChild(title);

    const outerDiv = document.createElement('div');
    outerDiv.id = 'structure';
    document.body.appendChild(outerDiv);

    const mainTable = document.createElement('div');
    outerDiv.appendChild(mainTable);
    mainTable.style.display = 'grid'
    mainTable.id = 'calendarGrid'
    return mainTable;

  }
}

class Event {
  constructor(data) {
    this.startTime = data.start.dateTime;
    this.endTime = data.end.dateTime;
    this.description = data.description;
    this.location = data.location;
    this.summary = data.summary;
  }
}

class Day {
  constructor(name) {
    this.name = name;
    this.date = new Date(name);
    this.events = [];
    this.orderEvents = () => {
      // go through events and sort them by start and end time
      this.events = this.events.sort((e1, e2) => Date(e1.endTime) - Date(e2.endTime))
    }
  }

  addEvent(eventData) {
    (eventData) => this.events.push(new Event(eventData));
  }
}

class Week {
  constructor(number) {
    this.days = new Array(6);
    this.addDay = (name) => {
      const day = new Day(name);
      this.days[day.date.getDay() - 1] = day;
      return day;
    }
  }
}

async function start() {
  const response = await fetch('http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/8');
  const data = await response.json();

  console.log(data)

  // Keys are date strings
  const weeks = []
  let dayOfWeek = Infinity;
  let week;
  let weekNum = 0;
  for (const key in data) {
    const date = new Date(key)
    if (date.getDay() < dayOfWeek) {
      week = new Week(weekNum++);
      weeks.push(week);
    }
    dayOfWeek = date.getDay();
    const day = week.addDay(key)
    data[key].forEach( event => day.addEvent(event));
    day.orderEvents();
  }


  console.log(weeks.length)
  console.log(weeks[0])

  const C = new Calendar(weeks)

}

start()


// document.addEventListener('DOMContentLoaded', start());


