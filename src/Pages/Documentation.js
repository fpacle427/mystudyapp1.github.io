import React from 'react';

function Documentation ()  {
  return (
    <div className="documentation">
      <h1>Welcome to [My Study App] Documentation</h1>

      <h2>Description </h2>
      <p>[There are three controls, the first of which is called pomodoro and has a default time of 25 minutes. The default time for the second control, short break, is 3 minutes. The third control, long break, has a default time of 15 minutes.
]</p>

      <h2>Description</h2>
      <ul>
        <li>At the header of the app we have a randomize inspiration quote</li>
        <li>The Pomodoro timer has a default time of 25 mins</li>
        <li>The short break control has a default time of 3mins</li>
        <li>The long break control has a default time of 15mins</li>
        <li>users can customize the timers by clicking the settings button</li>
        <li>Inside the settings, user can customize the time and the font size as well as the color</li>
        <li>After Choosing which timer the user will use, by pressing the start button the timer starts.</li>
        <li>At the top of the timer there is an icon for volume which users have an option to mute the sounds or not</li>
        <li>Everytime the app is loaded a background music will play</li>
        <li>The user has an option to turn off the bg music by clicking the pause music and they can resume while clicking the play button</li>
        <li></li>
      </ul>
  </div>
  );
};

export default Documentation;
