(function() {
  window.onload = function() {
    var canvas = document.getElementById("marimo_canvas");
    var ctx = canvas.getContext("2d");
    var canvas_height = canvas.height;
    var canvas_width = canvas.width;
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, (canvas_width - img.width)/2, (canvas_height-img.height)/2);
    };
    img.src = "img/marimo-ball.png";
  }
})()
