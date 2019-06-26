# CPSC436I—Runtime

![Image of Run Plan view](https://raw.githubusercontent.com/mostlyfabulous/Runtime/master/screenshots/Runtime%20Run%20Plan%20page.png)


### Project Description
Our project will encourage users to be more physically active by suggesting runs that fit within the user's schedule. Users can choose when to exercise based on preferences such as weather conditions, time of day and their availability. It can store details of the run such as the distance travelled, time taken, weather and then build a visualization to log their progress and show their current efforts. Given enough time, we would like to algorithmically provide best runs that suit the user instead of only being manually added and integrate a map to suggest points of interest as destinations
### Project task requirements:
3-5 minimal requirements (will definitely complete):
  - Real time weather retrieved with REST protocols periodically (every hour?)
  - Show weather for given time slot.
  - Create a visualization overlaying the time blocks to illustrate the weather conditions. 
  - UI can save and load user data (runs, preferences, etc...) to and from relevant database tables to history page.
  - User history page: view history, edit actual time taken to run, rate runs (shows optimal weather user likes to run in).
  
3-7 "standard" requirements (will most likely complete):
  - Scheduling runs according to user's schedule on top of other constraints - users manually add their own schedule
  - Allow users to schedule runs in advance and save them. 
  - Display user's scheduled runs.
  - Users can store and edit their preferences (some like running in the rain, or when it's below 10 degrees) - used to rate weather conditions in the scheduler.
  - Display user history as a calendar [example](https://fullcalendar.io/).
  
2-3 stretch requirements (hope to complete 1!):
  - Integrate calendar with ical and/or Google Calendar
  - Interval scheduling! We suggest optimal times to run - user give duration.
  - Explore: show weather in different areas (e.g. it's raining in UBC but not downtown).
  
### Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller tasks!
* Real time weather retrieved with REST protocols periodically (every hour?)
  - Set up database table for weather with attributes: temperature, wind, precipitation, sun/clouds.
  - Periodically retrieve weather data for a range (i.e. 1 week), process and save attributes in database table. 
  
* Create a visualization overlaying the time blocks to illustrate the weather conditions. 
  - Display different color for different weather conditions (hot/cold temperature, winds)
  - (standard requirements) ^ Colors reflect preferences. 

[Prototypes](https://github.com/mostlyfabulous/CPSC436I-Project/blob/master/CPSC436-Prototype.pdf)
