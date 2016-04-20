	var upTabLi=document.getElementById('upTab').getElementsByTagName('li');
	var man=document.getElementById('man');
	var woman=document.getElementById('woman');
	var manRightTabs=man.getElementsByTagName('a');
	var manLi=man.getElementsByTagName('li');
	var womanRightTabs=woman.getElementsByTagName('a');
	var womanLi=woman.getElementsByTagName('li');


	function tab(btn,tabDom,time){
		var count=0,t;
		if(btn.length != tabDom.length)return;
		if(time == undefined)time=2000;
		for(var i=0;i<btn.length;i++){
			btn[i].index=i;
			btn[i].onclick=function(){
				count=this.index;
				btnTab(count);
			};
		}
		clearInterval(t);
		t=setInterval(timeTab, time);
		function btnTab(n){
			for(var i=0;i<btn.length;i++){
				btn[i].className='';
				tabDom[i].className='';
			}
			btn[n].className='cur';
			tabDom[n].className='show';
		}
		function timeTab(){
			count++;
			if(count >= btn.length){
				count=0;
			}
			for(var i=0;i<btn.length;i++){
				btn[i].className='';
				tabDom[i].className='';
			}
			btn[count].className='cur';
			tabDom[count].className='show';
		}
	}

	tab(upTabLi,[woman,man],6000);
	tab(manRightTabs,manLi);
	tab(womanRightTabs,womanLi);
		

