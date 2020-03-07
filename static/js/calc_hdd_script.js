jQuery(function($) {
	$('.ch-sel').selectBoxIt().change(function(){
		calculate();
	});        	
	
	$('.cl-sp-input').keyup(function(){
		calculate();
	});
	
	$('.btn-minus').click(function(){
		var tmp=parseFloat($(this).parent().find('.cl-sp-input').val());		
		if (isNaN(tmp)) tmp=0;
		if (tmp>0) $(this).parent().find('.cl-sp-input').val(--tmp);
		calculate();
	});
	
	$('.btn-plus').click(function(){
		var tmp=parseFloat($(this).parent().find('.cl-sp-input').val());
		if (isNaN(tmp)) tmp=0;
		var id=$(this).parent().find('.cl-sp-input').attr('id');
		if ((id=="fps") && (tmp>24)) { calculate(); return;}
		if ((id=="hours") && (tmp>23)) { calculate(); return;}		
		$(this).parent().find('.cl-sp-input').val(++tmp);
		calculate();
	});
	
	var formatNumber=function (_number,_decimal,_separator){
		var decimal=(typeof(_decimal)!='undefined')?_decimal:2;
		var separator=(typeof(_separator)!='undefined')?_separator:'';
		var r=parseFloat(_number)
		var exp10=Math.pow(10,decimal);
		r=Math.round(r*exp10)/exp10;
		var rr=Number(r).toFixed(decimal).toString().split('.');
		var b=rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1"+separator);
		r=(rr[1]?b+'.'+rr[1]:b);
		return r;
	}		
	
	var calculate=function(){
		var res = parseInt($('#resolution').val());
		var	motion = parseInt($('#motion').val());
		var difficulty = parseInt($('#difficulty').val());
		var codec = parseInt($('#codec').val());
		var cam_cnt = parseInt($('#cam_cnt').val());
		if (isNaN(cam_cnt)) return;
		var	fps = parseInt($('#fps').val());
		if (isNaN(fps)) return;
		var hours = parseInt($('#hours').val());
		if (isNaN(hours)) return;
		var days = parseInt($('#days').val());
		if (isNaN(days)) return;
		var v1 = eval(24 * res / 8 / 1024);
		var m = [[.154, 1], [.272, 1], [.49, 1], [.6348, 1], [.65, 1], [1, 1], [1.14, 1]][motion][codec];
		var n = [[195.9354, 42.8412], [164.1621, 35.5131], [132.0434, 28.4105], [121.48, 26.4607]][difficulty][codec];
		var v2 = Math.floor(v1 * m / n);
		var v3 = eval(3600 * fps);
		var v4 = eval(v2 * v3);
		var v5 = eval(v4 * hours);
		var v6 = eval(v5 * cam_cnt);
		var v7 = eval(v6 * days);
		var tbytes = eval(v7 / 1E3 / 1E3 / 1E3);
		var bandwidth = eval(v2 * fps * cam_cnt / 128);					
		$('#res_space').html(formatNumber(tbytes,2,' '));
		$('#res_bandwidth').html(formatNumber(bandwidth,0,' '));		
	}
	
	calculate();
		
});