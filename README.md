# LightningWebComponents
A collection of my custom Lightning Web Components (LWCs) that enhance the functionality and user experience of the Salesforce org. Lightning Web Components are a modern way to build Salesforce Lightning applications with enhanced performance and reusability.

## LWC Collection
<details>
  <summary>Calculator</summary>
</details>
<details>
  <summary>Confetti</summary>

  ![](https://github.com/MissSherBear/confetti-lwc/blob/main/confetti.png)

  Code for static resource confetti.js file:
  ```javascript
!function(t,e){!function(){var o=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e){t.setTimeout(e,1e3/60)},n={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,ticks:200,x:.5,y:.5,zIndex:100,colors:["#610B0B","#FFFF00","#FF00BF","#0040FF","#585858","#00FFBF","#FE642E","#FFBF00","#0101DF","#FF8000","#00FF00","#FF0040","#A901DB","#0B0B3B","#FF0000"]};function i(){}function r(t,e,o){return function(t,e){return e?e(t):t}(t&&null!=t[e]?t[e]:n[e],o)}function a(t){return parseInt(t,16)}function l(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function c(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function s(n,r,a,s,u){var d=r.slice(),f=n.getContext("2d"),h=n.width,m=n.height,b=a?l:c;function g(){h=m=null}var y,v=(y=function(e){o(function i(){h||m||(b(n),h=n.width,m=n.height),f.clearRect(0,0,h,m),(d=d.filter(function(t){return function(t,e){e.x+=Math.cos(e.angle2D)*e.velocity,e.y+=Math.sin(e.angle2D)*e.velocity+3,e.wobble+=.1,e.velocity*=e.decay,e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+5,e.wobbleX=e.x+10*Math.cos(e.wobble),e.wobbleY=e.y+10*Math.sin(e.wobble);var o=e.tick++/e.totalTicks,n=e.x+e.random*e.tiltCos,i=e.y+e.random*e.tiltSin,r=e.wobbleX+e.random*e.tiltCos,a=e.wobbleY+e.random*e.tiltSin;return t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-o)+")",t.beginPath(),t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(i)),t.lineTo(Math.floor(r),Math.floor(a)),t.lineTo(Math.floor(n),Math.floor(e.wobbleY)),t.closePath(),t.fill(),e.tick<e.totalTicks}(f,t)})).length?o(i):(s&&t.removeEventListener("resize",g),u(),e())})},e.exports.Promise?new e.exports.Promise(y):(y(i,i),null));return s&&t.addEventListener("resize",g,!1),{addFettis:function(t){return d=d.concat(t),v},canvas:n,promise:v}}function u(t,e){var o,n=!t,i=!!r(e||{},"resize"),u=!1;return function(e){var d=r(e,"particleCount",Math.floor),f=r(e,"angle",Number),h=r(e,"spread",Number),m=r(e,"startVelocity",Number),b=r(e,"decay",Number),g=r(e,"colors"),y=r(e,"ticks",Number),v=r(e,"zIndex",Number),p=function(t){var e=r(t,"origin",Object);return e.x=r(e,"x",Number),e.y=r(e,"y",Number),e}(e),x=d,M=[];n?t=o?o.canvas:function(t){var e=document.createElement("canvas");return l(e),e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}(v):i&&!u&&(c(t),u=!0);for(var w,k,C,A,P,N=t.width*p.x,T=t.height*p.y;x--;)M.push((w={x:N,y:T,angle:f,spread:h,startVelocity:m,color:g[x%g.length],ticks:y,decay:b},k=void 0,C=void 0,A=void 0,P=void 0,A=w.angle*(Math.PI/180),P=w.spread*(Math.PI/180),{x:w.x,y:w.y,wobble:10*Math.random(),velocity:.5*w.startVelocity+Math.random()*w.startVelocity,angle2D:-A+(.5*P-Math.random()*P),tiltAngle:Math.random()*Math.PI,color:(k=w.color,C=String(k).replace(/[^0-9a-f]/gi,""),C.length<6&&(C=C[0]+C[0]+C[1]+C[1]+C[2]+C[2]),{r:a(C.substring(0,2)),g:a(C.substring(2,4)),b:a(C.substring(4,6))}),tick:0,totalTicks:w.ticks,decay:w.decay,random:Math.random()+5,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0}));return o?o.addFettis(M):(n&&document.body.appendChild(t),(o=s(t,M,n,n||i,function(){o=null,n&&document.body.removeChild(t)})).promise)}}e.exports=u(),e.exports.create=u,e.exports.Promise=t.Promise||null}(),t.confetti=e.exports}(window,{}); //# sourceMappingURL=/sm/a35a3af602da0416611bbb29c85b9df4d35cd22e54ede0aba8f1fcf410e9b0ae.map
```
</details>
<details>
  <summary>Course Add/Drop</summary>

  ![](https://github.com/MissSherBear/course-registration/blob/main/Screenshots/course-add-drop-gif.gif)
  ![](https://github.com/MissSherBear/course-registration/blob/main/Screenshots/course-available-sections.png)
</details>
<details>
  <summary>Course Interest Selection</summary>

  ![](https://github.com/MissSherBear/course-registration/blob/main/Screenshots/course-registration.png)
  ![]()
</details>
<details>
  <summary>Custom Button</summary>
  
  #### [custom-button](https://github.com/MissSherBear/custom-button)
  ![](https://github.com/MissSherBear/custom-button/blob/main/custom-button-config.png) 
  ![](https://github.com/MissSherBear/custom-button/blob/main/custom-button-config2.png)
  ![Custom Button LWC](https://github.com/MissSherBear/custom-button/blob/main/custom-button-lwc.png)
</details>
<details>
  <summary>File Uploader</summary>
</details>
<details>
  <summary>Invoice</summary>
</details>
<details>
  <summary>Invoice PDF</summary>
</details>
<details>
  <summary>Record Creator</summary>
</details>
<details>
  <summary>Record List</summary>
</details>
<details>
  <summary>Related Records</summary>
</details>
<details>
  <summary>Student Grades</summary>
</details>
<details>
  <summary>Student Schedule</summary>
  
  ![Screenshot](https://github.com/MissSherBear/course-registration/blob/main/Screenshots/class-schedule-gif.gif)
</details>
<details>
  <summary>Webinar</summary>
</details>
<details>
  <summary></summary>
</details>

  
