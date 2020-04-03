window.onload = pageLoad;

var jdata;
var imgdata;

function pageLoad(){
	// alert(imgfile);
	document.getElementById('displayPic').onclick = fileUpload;
	document.getElementById('fileField').onchange = fileSubmit;
	document.getElementById('postbutton').onclick = getData;
	readJson();
}

function fileUpload(){
	//เปิด explorer สำหรับเลือกรูป
	document.getElementById("fileField").click();
}

function fileSubmit(){
	//มีการเปลี่ยนแปลงไฟล์

	document.getElementById('formId').submit()

	var y=new XMLHttpRequest();
	y.open("GET","js/userDB.json");
	y.onload = function(){
		imgdata= JSON.parse(y.responseText);
		var key = Object.keys(imgdata);
		alert(key.length);
		for (var j = 0; j < key.length; j++) {
			var user = imgdata[key[j]].username;
			var user1 = username;
			alert(j);
			if(user == user1){
				var url = "img/"+imgdata[key[j]].img;
				console.log(url);
				document.getElementById("Profile").src = url;
				alert(url);
			}
		}
	}
	y.send();

	
	
	var x = new XMLHttpRequest();
	var jsonData = JSON.stringify(imgdata)
	x.open("POST", "js/writeImage.php?data=" + jsonData)
	x.send()
}

function getData(){
	//  homework
	var msg = document.getElementById("textmsg").value;
	writeJson(msg);
}

function readJson(){
	// complete this function
	// อ่าน post ที่เคยเขียนไว้ ใน file ที่ชื่อว่า postDB.json และทำการ show post ทั้งหมดที่มีใน file
	var xhr = new XMLHttpRequest();
    xhr.open("GET", "js/postDB.JSON");
    xhr.onload = function() {
		// var text = xhr.responseText;
		jdata = JSON.parse(xhr.responseText);
		// console.log(text);
		showPost(jdata)
    };
    xhr.onerror = function() {
        alert("ERROR!")
    };
    xhr.send();
}

function writeJson(msg){
	//add code here 
	//  homework
	// ส่งข้อความที่เพิ่งพิมพ์และข้อความเก่าเข้ามาเพื่อทำการบันทึกทับใน postDB.json โดย AJAX ทำการส่ง json string ไปให้ writeJson.php ถ้าทำสำเร็จจะแสดง post ข้อความ โดยใช้ showPost function
	var keys = Object.keys(jdata);
    var data = { post1: { user: username, message: msg } };
    for (var i = 0; i < keys.length; i++) {
        data['post' + (i + 2)] = { user: jdata[keys[i]]["user"], message: jdata[keys[i]]["message"] };
    }

    var Sdata = JSON.stringify(data);
    var http = new XMLHttpRequest();
    http.open("GET", "js/writeJson.php?data=" + Sdata);
    http.send();
    var defeed = document.querySelectorAll("#feed-container .newsfeed");
    for (var i = 0; i < defeed.length; i++) {
        defeed[i].parentNode.removeChild(defeed[i]);
    }
    showPost(JSON.parse(Sdata));
	// showPost(JSON.parse(Sdata));
	// console.log(keys.length);
	// console.log(keys);

}

function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("feed-container");
	
	for (var i = 0; i < keys.length; i++) {
		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);
		var temp1 = document.createElement("div");
		temp1.className = "postmsg";
		temp1.innerHTML = data[keys[i]]["message"];
		temp.appendChild(temp1);
		var temp1 = document.createElement("div");
		temp1.className = "postuser";
		temp1.innerHTML = "Post by: "+data[keys[i]]["user"];
		temp.appendChild(temp1);
		
	}
}