function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function labfunc_1() {
      let answer = [];
      for (let i = 0 ; i<arrLab7.length; i++){
          if (arrLab7[i].includes("maximas")) answer.push("<span style='font-size:"+getRandomInt(14,72)+"pt'>"+arrLab7[i][0]+"</span>");
      }
  
      let x = "";
      for (let i = 0; i < answer.length; i++){
          x+=answer[i];
      }
      document.getElementById('ans1').insertAdjacentHTML("afterend", x);
      console.log(x);
  }
  
  function labfunc_2() {
          let answer = [];
          arrLab7.sort();
          for (let i = 0 ; i<arrLab7.length; i++){
          if (arrLab7[i].split('.').length-1 == 5) answer.push("<span style='font-size:"+getRandomInt(14,72)+"pt'>"+arrLab7[i][0]+"</span>");
      }
      let x = "";
      for (let i = 0; i < answer.length; i++){
          x+=answer[i];
      }
          document.getElementById('ans2').insertAdjacentHTML("afterend", x);
          console.log(x);
  }
  
  function labfunc_3() {
          let answer = [];
          for (let i = 0 ; i<arrLab7.length; i++){
              let x = arrLab7[i].indexOf("translate(");
          if (x!=-1) {
              let a = arrLab7[i].substring(0,x+9);
              let b = arrLab7[i].substring(x+9, arrLab7[i].length);
              arrLab7[i] = a + b;
              answer.push (arrLab7[i]);
          }
      }
      let x = "";
      for (let i = 0; i < answer.length; i++){
          x+=answer[i]+ " ";
      }
          document.getElementById('ans3').insertAdjacentHTML("afterend", x);
          console.log(x);
  }
  
  function labfunc_4() {
      
      let answer = [];
      for (let i = 0 ; i<arrLab7.length; i++){
          let arr = arrLab7[i].toLowerCase();
          let x = arr.indexOf("style");
      if (x!=-1) {
          let y = arr.indexOf("font-family:");
          let z = "Georgia";
          if (y!=-1){
          
  
          arr = arr.replace(/#[a-f0-9]{6}/gi, z);
          }
          else {
              let a = arr.substring(0, x+11);
              let b = arr.substring(x+7, arr.length)
              arr = a + "font-family:"+ z +";"+b;
          }
          answer.push (arr);
      }
  }
  let x = "";
  for (let i = 0; i < answer.length; i++){
      x+=answer[i]+ " ";
  }
      document.getElementById('ans4').insertAdjacentHTML("afterend", x);
      console.log(x);
  }
  
  function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;

  }
  
  function labfunc_5 (){
      let hexBlock = document.getElementById('ans5');
      let hex = document.getElementById('labfunc_5_hex').value;
      if (hex[0]!='#') hex='#'+hex;
      let regexp = /#[a-f0-9]/gi;
      if (regexp.test(hex) == false) {
          hexBlock.textContent = "Ошибка. Неверный формат данных.";
          return;
      }
      document.getElementById('labfunc_5_hex').value = hex;
      let r,g,b;
      if (hex.length==4 || hex.length==7) {
      hexBlock.textContent = "("+hexToRgb(hex).r+","+hexToRgb(hex).g+","+hexToRgb(hex).b+")";
      }
      else {
          hexBlock.textContent = "Ошибка. Неверная длина кода.";
          return;
      }
  }







const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const pixelRatio = window.devicePixelRatio || 1;

const snowflakes = [];

class Snowflake {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    const maxSize = 3;
    this.size = Math.random() * (maxSize - 1) + 1;
    this.velocity = this.size * 0.35;
    const opacity = this.size / maxSize;
    this.fill = `rgb(255 255 255 / ${opacity})`;
    
    this.windSpeed = (Math.random() - 0.5) * 0.1;
    this.windAngle = Math.random() * Math.PI * 2;
  }
  isOutsideCanvas() {
    return this.y > canvas.height + this.size;
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -this.size;
  }
  update() {
    this.windAngle += this.windSpeed;
    this.wind = Math.cos(this.windAngle) * 0.5;

    this.x += this.wind;
    this.y += this.velocity;

    if (this.isOutsideCanvas()) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.closePath();
  }
}

const createSnowflakes = () => {
  snowflakeCount = Math.floor(window.innerWidth * window.innerHeight / 1400);
  
  for (let i = 0; i < snowflakeCount; i++) {  
    snowflakes.push(new Snowflake());
  }
}

const resizeCanvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(pixelRatio, pixelRatio);
  snowflakes.length = 0;
  createSnowflakes();
};

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

const render = () => {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach(snowflake => {
    snowflake.update();
    snowflake.draw();
  });
};

render();




//   const canvas = document.querySelector('.canvas');

// const pixelRatio = window.devicePixelRatio || 1;

// const snowflakes = [];

// class Snowflake {
//   constructor() {
//     this.x = Math.random() * canvas.width;
//     this.y = Math.random() * canvas.height;
    
//     const maxSize = 3;
//     this.size = Math.random() * (maxSize - 1) + 1;
//     this.velocity = this.size * 0.35;
//     const opacity = this.size / maxSize;
//     this.fill = `rgb(255 255 255 / ${opacity})`;
    
//     this.windSpeed = (Math.random() - 0.5) * 0.1;
//     this.windAngle = Math.random() * Math.PI * 2;
//   }
//   isOutsideCanvas() {
//     return this.y > canvas.height + this.size;
//   }
//   reset() {
//     this.x = Math.random() * canvas.width;
//     this.y = -this.size;
//   }
//   update() {
//     this.windAngle += this.windSpeed;
//     this.wind = Math.cos(this.windAngle) * 0.5;

//     this.x += this.wind;
//     this.y += this.velocity;

//     if (this.isOutsideCanvas()) {
//       this.reset();
//     }
//   }
//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fillStyle = this.fill;
//     ctx.fill();
//     ctx.closePath();
//   }
// }

// const createSnowflakes = () => {
//   snowflakeCount = Math.floor(window.innerWidth * window.innerHeight / 1400);
  
//   for (let i = 0; i < snowflakeCount; i++) {  
//     snowflakes.push(new Snowflake());
//   }
// }

//  const resizeCanvas = () => {
//    const width = window.innerWidth;
//    const height = window.innerHeight;
//    canvas.width = width * pixelRatio;
//    canvas.height = height * pixelRatio;
//    canvas.style.width = `${width}px`;
//    canvas.style.height = `${height}px`;
//    ctx.scale(pixelRatio, pixelRatio);
//    snowflakes.length = 0;
//    createSnowflakes();
//  };

// window.addEventListener('resize', resizeCanvas);

// resizeCanvas();

// const render = () => {
//   requestAnimationFrame(render);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   snowflakes.forEach(snowflake => {
//     snowflake.update();
//     snowflake.draw();
//   });
// };

// render();