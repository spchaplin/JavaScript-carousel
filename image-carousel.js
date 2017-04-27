window.onload = function() {

  //set height of contanier holding absolutely positioned img (so CSS has a val to use for the page layout) --- 
  setContainerHeight();
  //also set container height on resize
  window.addEventListener("resize", setContainerHeight);
  //definition of function to set container height
  function setContainerHeight() {
    //use first image's size as a reference since they will all be the same dimensions
    var firstPic = document.getElementById("slide-container").firstElementChild;
    var firstPicHeight = window.getComputedStyle(firstPic, null).getPropertyValue("height");
    document.getElementById("slide-container").style.height = firstPicHeight;
  }

  //restore opacity to each image subsequent to the first ---
  //opacity was set to 0 in CSS so no images appeared in the stack before the first animated into position
  //initialize a variable that contains every image except the first one
  var notFirstElements = document.getElementsByClassName("notFirst");
  //a loop to restore opacity to each image (subsequent to the first) before it needs to display
  for (i = 0; i < notFirstElements.length; i++) {
    setTimeout(restoreOpacity, 400, notFirstElements[i]);
  }
  //definition of function to restore opacity  
  function restoreOpacity(elementToRestore) {
    elementToRestore.style.opacity = 1;
  }

  //create an array that contains the image id names ---
  //create empty array
  var imageIds = [];
  //create a variable equal to the number of images
  var numberOfSlides = document.getElementById("slide-container").childElementCount;
  //a loop that pushes each image id into the array in the format "img-x"
  for (i = 1; i <= numberOfSlides; i++) {
    imageIds.push("img-" + i);
  }

  //setup for slider ---
  //create variable for the index number of image in the array being worked with
  var index = 0;
  //remove class containing CSS animation from the first slide near animation completion
  var firstElement = document.getElementById("img-1");
  setTimeout(removeClass, 300, firstElement);
  //removeClass function defined
  function removeClass(element) {
    void element.offsetWidth;
    element.classList.remove("moves");
  }
  //init variable for z-index of image currently displayed
  var onTop = 1;
  //create variable for interval between each slide showing
  var origInterval = 2000;
  var currentInterval = origInterval;
  //display each slide at interval (functionName, ms)
  var myTimer = setInterval(showSlide, origInterval);

  //define function to show the next slide ---
  function showSlide() {
    //advance to next index in the array of images
    index++;
    //but if the next slide index number goes beyond the number of indexes in the array, go to the first slide
    if (index === numberOfSlides) {
      index = 0;
    }
    //if the index number is before the first index in the array, go to the last slide
    if (index < 0) {
      index = numberOfSlides - 1;
    }
    //set a variable equal to the image at the current array index
    var element = document.getElementById(imageIds[index]);
    //add the animation class to the current image, so it begins to move into position
    element.classList.add("moves");
    //increase z-index counter by 1
    onTop++;
    //assign higher z-index to current img (so it displays on top of other stacked images)
    element.style.zIndex = onTop;
    //remove the class containing the animation from the current slide near animation completion
    setTimeout(removeClass, 300, element);
  }

  //"Next" button ---
  //when "Next" button is clicked, run the advance function
  document.getElementById("next").addEventListener("click", advance);
  //definition of advance function
  function advance() {
    //show next slide as normal
    showSlide();
    //clear the setInterval time elapsed, so auto slide advance doesn't happen right after a manual advance
    clearInterval(myTimer);
    //restart the setInterval method to automatically advance slides;
    //clearing and then restarting this method has the effect of resetting the time elapsed back to zero
    myTimer = setInterval(showSlide, origInterval);
  }
  
  //"Previous" button ---
  //when "Previous" button is clicked, run the previous function
  document.getElementById("prev").addEventListener("click", previous);
  //definition of previous function
  function previous() {
    //set index back 2, so showSlide will display slide back 1 index position
    index -= 2;
    //show next slide as normal
    showSlide();
    //clear the setInterval time elapsed, so auto slide advance doesn't happen right after a manual slide change
    clearInterval(myTimer);
    //restart the setInterval method to automatically advance slides;
    //clearing and then restarting this method has the effect of resetting the time elapsed back to zero
    myTimer = setInterval(showSlide, origInterval);
  } 
};