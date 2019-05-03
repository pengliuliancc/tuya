/*  初始化js */
var   canvas = document.getElementById("canvas");//抓到画板 
var  cv = canvas.getContext('2d');//获得绘画环境

var  eraser = document.getElementById("eraser");
var  actions = document.getElementById("actions");
/*设置画布宽高  把画板做成全屏的，所以接下来设置一下canvas的宽高*/
 var pageWidth = document.documentElement.clientWidth;
 var pageHeight = document.documentElement.clientHeight;
 canvas.width = pageWidth;
 canvas.height = pageHeight;


//设置笔触的颜色
cv.strokeStyle = 'yellow';
//设置笔触的粗细
cv.lineWidth = 10;

//  给画板加鼠标按下事件 ，用onmousedown事件。
canvas.onmousedown = function (e) {//鼠标按下
//  获得事件对象 声明一个全局变量event 。逻辑或||，遇到true就返回，而不会继续往下执行。
	var ev = window.event ||  e ;
//  获得鼠标开始时候的位置
	var m_start_left = ev.layerX || ev.offsetX;
	var m_start_top = ev.layerY || ev.offsetY;
	/*alert(m_start_top);*/
//   开始一条路径
	cv.beginPath();


// 定义笔触起始位置 moveTo（，）把路径移动到画布中的指定位置，不创建线条。
	cv.moveTo(m_start_left,m_start_top) ;

//  给画板添加鼠标移动事件
	canvas.onmousemove = function(e) {
//    获得事件对象
		var ev = window.event ||  e ;
//  获得鼠标当前的位置
		var m_now_left = ev.layerX || ev.offsetX;
		var m_now_top = ev.layerY || ev.offsetY;
//		将线条画到这个位置上来.定义路径绘制出通过 moveTo() 和 lineTo() 方法定义的路径
//      lineTo（，）添加一个新点，创建从该点到最后指定的线条
		cv.lineTo( m_now_left,m_now_top);
		cv.stroke();//绘制已定义的路径（连接线条）
	}

}


//鼠标按下事件结束
//鼠标抬起事件
canvas.onmouseup = function () {
	// 取消canvas的鼠标移动事件
	canvas.onmousemove = null;
}
//鼠标抬起事件结束
//给颜色选择器表单加事件
document.getElementById("yanse").onchange = function(){
//将笔触颜色改成当前的颜色表单的value值
cv.strokeStyle = this.value;
};


//给滑块添加事件
document.getElementById("cuxi").onchange = function(){
	//修改笔触的粗细
	cv.lineWidth = this.value;
	//修改span的值
	document.getElementById("cx").innerHTML = this.value;
}


//添加橡皮擦功能
document.getElementById("eraser").onclick = function(){
	alert("请尽情的檫吧");
	//将笔触的颜色改成背景颜色
	cv.strokeStyle = "#eee";
}
/* 选择哪个动作 */
function takeAction(element) {
  if (element === 'eraser') {
   eraserEnabled = true
    eraser.classList.add("active")
  } else if (element === 'clearall') {
    cv.clearRect(0, 0, canvas.width, canvas.height)    //清屏
    eraserEnabled = false
   eraser.classList.remove("active")
  } else if (element === 'save') {
    let a = document.createElement("a")
    a.href = canvas.toDataURL()           //获得图片地址
    a.target = "_blank"
    a.download = "image.png"
    a.click()
  }
}



//执行用户动作
actions.addEventListener('click', (e) => {
  if (e.target.tagName === 'svg') {
    takeAction(e.target.id)
  } else if (e.target.tagName === 'use') {
    takeAction(e.target.parentElement.id)
  } else if (e.target.tagName === 'LI') {
    takeAction(e.target.children[0].id)
  }
})
  
