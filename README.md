# JavaScript-carousel
An image carousel made with pure JavaScript and CSS3 keyframe animation

This carousel was an exercise in writing pure JavaScript without dependency on any libraries such as jQuery.  One of the challenges of working with a CSS animation in conjunction with JavaScript is restarting the animation at just the right time after it has completed an iteration.  I found the cleanest way to do this was to add a CSS class containing the animation to the slide using JavaScript just when the slide needed to be displayed.  Near the end of the animation, I then removed the class.  When the slide needed to be shown again, I added the class back, which restarted the animation.
