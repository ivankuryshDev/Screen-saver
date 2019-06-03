
window.onload = function() {
  var panel;
  var delay = 5000, interval = 5000;
  var delayInput, intervalInput, submitButton;
  var mouseTimeOut, mouseInterval;
  var randomPicture = 0, previousPicture = 0;
  var randomPositionX = 0, randomPositionY = 0;
  var pic = {};
  var events = ["touchstart", "mousedown", "mousemove", "touchmove", "keypress"];
  var urls = [
    "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
    "https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
    "https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
    "https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
    "https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
    "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
    "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  ];
  
  document.body.style.overflowX = "hidden";
  window.addEventListener("scroll", startScreenSaver);
  
  for(var i = 0; i < events.length; i++){
    document.body.addEventListener(events[i], startScreenSaver);
  }
  
  function createSettingPanel(){
    panel = document.createElement("div");
    panel.style.width = "200px";
    panel.style.height = "60px";
    panel.style.backgroundColor = "red";
    panel.style.position = "fixed";
    panel.style.bottom = "5px";
    panel.style.right = "-170px";
    panel.style.zIndex = 999;
    panel.style.opacity = 0.3;
    document.body.appendChild(panel);
    
    panel.addEventListener("click", function(){
      panel.style.right = "-5px";
    });
    
    delayInput = document.createElement("input");
    delayInput.setAttribute("placeholder", "Delay in milliseconds");
    delayInput.setAttribute("type", "number");
    delayInput.style.left = "30px";
    delayInput.style.position = "relative";
    panel.appendChild(delayInput);
    
    intervalInput = document.createElement("input");
    intervalInput.setAttribute("placeholder", "Interval in milliseconds");
    intervalInput.setAttribute("type", "number");
    intervalInput.style.left = "30px";
    intervalInput.style.position = "relative";
    panel.appendChild(intervalInput);
    
    submitButton = document.createElement("button");
    submitButton.style.display = "block";
    submitButton.style.left = "30px";
    submitButton.style.position = "relative";
    submitButton.style.width = "167px";
    submitButton.style.height = "18px";
    submitButton.innerHTML = 'Ok';
    submitButton.addEventListener("click", myFunction);
    panel.appendChild(submitButton);
    
  }
  
  function myFunction(){
    interval = intervalInput.value;
    if(delayInput.value - intervalInput.value >= 0){
      delay = delayInput.value - intervalInput.value;
    }else{
      alert("The delay value must be bigger than the interval value")
    }
    delay = Math.abs(delayInput.value - intervalInput.value);
  }
  
  function pictureFactory(){
    for (var i = 0; i < urls.length; i++) {
      pic[i] = document.createElement("img");     
      pic[i].style.opacity = 0;
      pic[i].setAttribute("src", urls[i]);
      pic[i].setAttribute("alt", "img" + i);      
      pic[i].style.position = "absolute";
      document.body.appendChild(pic[i]);
    } 
  }
  
  function setRandomPicture(min, max) {
    do{
      randomPicture = Math.floor(Math.random() * (max - min + 1) ) + min;
    }while(window.innerWidth - pic[randomPicture].naturalWidth <= 0 || window.innerHeight - pic[randomPicture].naturalHeight <= 0 ||  randomPicture === previousPicture);
    previousPicture = randomPicture;
  }
  
  function getRandomPicture() {
    return randomPicture;
  }
  
  function setRandomPosition(maxX, maxY){
    randomPositionX = Math.floor(Math.random() * (maxX - 0 + 1) ) + 0;
    randomPositionY = Math.floor(Math.random() * ((maxY + window.scrollY) - window.scrollY + 1) ) + window.scrollY;
  }
  
  function getRandomPosition() {
    return {
      X: randomPositionX,
      Y: randomPositionY
    };
  }
  
  function startScreenSaver() {
    clearInterval(mouseInterval);
    clearTimeout(mouseTimeOut);
  
    pic[getRandomPicture()].style.opacity = 0;
    pic[getRandomPicture()].style.visibility = "hidden";
    pic[getRandomPicture()].style.transition = "visibility 0s 1s, opacity 1s linear";

    mouseTimeOut = setTimeout(function(){
      panel.style.right = "-170px";
      mouseInterval = setInterval(function(){
      
        pic[getRandomPicture()].style.opacity = 0;
        pic[getRandomPicture()].style.visibility = "hidden";
        pic[getRandomPicture()].style.transition = "visibility 0s 1s, opacity 1s linear";

        setRandomPicture(0,6);
        
        pic[getRandomPicture()].style.opacity = 1;
        pic[getRandomPicture()].style.visibility = "visible";
        pic[getRandomPicture()].style.transition = "opacity 1s linear";

        setRandomPosition(window.innerWidth - pic[getRandomPicture()].naturalWidth,
          window.innerHeight - pic[getRandomPicture()].naturalHeight);
        pic[getRandomPicture()].style.top = getRandomPosition().Y + "px";
        pic[getRandomPicture()].style.left = getRandomPosition().X + "px";
        
      },interval);
    }, delay);
    
    
  }
  createSettingPanel();
  pictureFactory();
  startScreenSaver();
}