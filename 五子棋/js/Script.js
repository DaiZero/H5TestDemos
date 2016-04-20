var chess=document.getElementById('chess');
var context=chess.getContext('2d');
context.strokeStyle="#636766";
var over=false;
var me=true;
var chessBox=[];
for (var i = 0; i<15; i++) {
	chessBox[i]=[];
	for (var j= 0; j <15; j++) {
		chessBox[i][j]=0;
	}
}
var Wins=[];//赢法数组
for (var i = 0; i<15; i++) {
	Wins[i]=[];
	for (var j= 0; j <15; j++) {
		Wins[i][j]=[];
	}
}
function FivechessWinSum(xcount,ycount)
{
  var Sum=0;
//横排的赢法
for(var x = 0; x < xcount; x++){
    for(var y = 0; y<ycount-4;y++){
        for(var k = 0; k<5;k++){
            Wins[x][y+k][Sum] = true;
        }
        Sum++;
    }
}

//竖排的赢法
for(var x = 0; x < xcount; x++){
    for(var y = 0; y<ycount-4;y++){
        for(var k = 0; k<5;k++){
            Wins[y+k][x][Sum] = true;
        }
        Sum++;
    }
}

//正斜线的赢法
for(var x = 0; x < xcount-4; x++){
    for(var y = 0; y<ycount-4;y++){
        for(var k = 0; k<5;k++){
            Wins[x+k][y+k][Sum] = true;
        }
        Sum++;
    }
}

//反斜线的赢法
for(var x = 0; x < xcount-4; x++){
    for(var y = ycount-1; y>3;y--){
        for(var k = 0; k<5;k++){
            Wins[x+k][y-k][Sum] = true;
        }
        Sum++;
    }
}
return Sum;
}
var  count=FivechessWinSum(15,15);//统计赢法数量


//赢法的统计数组
var mywin=[];
var computerwin=[];
for (var i = 0; i <count; i++) {
	mywin[i]=0;
	computerwin[i]=0;
}
var logo=new Image();
logo.src="image/logo.jpg";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawchessboard();
}
//画棋盘
var drawchessboard=function () {
for (var i = 0; i<16; i++) {
	context.moveTo(15+i*30,15);
	context.lineTo(15+i*30,435);
	context.stroke();
	context.moveTo(15,15+i*30);
	context.lineTo(435,15+i*30);
	context.stroke();
}
}

//落子
var OneStep=function(i,j,me){
    context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI)
	context.closePath();
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0)
	if (me) {
        gradient.addColorStop(0,"#0A0A0A");
	    gradient.addColorStop(1,"#636766");
	}else
	{
        gradient.addColorStop(0,"#D1D1D1");
	    gradient.addColorStop(1,"#F9F9F9");
	}
	
	context.fillStyle=gradient;
	context.fill();
}

chess.onclick=function(e){
	if (over||!me) {
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if (chessBox[i][j]==0) {
       OneStep(i,j,me);
       if (me) {
         chessBox[i][j]=1;
       }
       else
       {
       	chessBox[i][j]=2;
       }
       
       for (var k=0;k<count;k++) {
       	if (Wins[i][j][k]) {
       		mywin[k]++;
       		computerwin[k]=6;
       		if (mywin[k]==5) {
       			window.alert("你赢了！");
       			over=true;
       		}
       	}
       }
       if (!over) {
        me=!me;
         computerAI();
       }
	}
	
}

var computerAI=function(){
  var myScore=[];
  var computerScore=[];
  var max=0;
  var u=0,v=0;
  for (var i = 0; i <15; i++) {
     myScore[i]=[];
     computerScore[i]=[];
    for (var j = 0; j <15; j++) 
    {
      myScore[i][j]=0;
      computerScore[i][j]=0;
    }
  }

   for (var i = 0; i <15; i++) {
    for (var j = 0; j <15; j++) 
    {
      if (chessBox[i][j]==0) {
          for (var k = 0; k<count; k++) {
            if (Wins[i][j][k]) {
                if (mywin[k]==1) {
                myScore[i][j]+=200;
                }
                if (mywin[k]==2) {
                myScore[i][j]+=400;
                }
                if (mywin[k]==3) {
                myScore[i][j]+=2000;
                }
                if (mywin[k]==4) {
                myScore[i][j]+=10000;
                }
                 if (computerwin[k]==1) {
                computerScore[i][j]+=220;
                }
                if (computerwin[k]==2) {
                computerScore[i][j]+=420;
                }
                if (computerwin[k]==3) {
                computerScore[i][j]+=2100;
                }
                if (computerwin[k]==4) {
                computerScore[i][j]+=20000;
                }
            }
          }
          if (myScore[i][j]>max) {
            max=myScore[i][j];
            u=i;
            v=j;
            } else if(myScore[i][j]=max)
            {
             if (computerScore[i][j]>computerScore[u][v]) {
                 u=i;
                 v=j;
              }
            }
         if (computerScore[i][j]>max) {
            max=computerScore[i][j];
            u=i;
            v=j;
            } else if(computerScore[i][j]=max)
            {
             if (myScore[i][j]>myScore[u][v]) {
                 u=i;
                 v=j;
              }
            }
             
          
      }
    }
   }
   OneStep(u,v,false);
   chessBox[u][v]=2;

for (var k=0;k<count;k++) {
        if (Wins[u][v][k]) {
          computerwin[k]++;
          mywin[k]=6;
          if (computerwin[k]==5) {
            window.alert("计算机赢了！");
            over=true;
          }
        }
       }
       if (!over) {
        me=!me;
       }
}