// get response from bot
function getBotResponse() {
  var rawText = $("#textInput").val();
  if (rawText==="") return;
  $("#textInput").val("");
  // append user input in chatbox
  var chatbox=document.getElementById('chatbox');
  var userDiv=document.createElement('div');
  var userP=document.createElement('p');
  var userImg=document.createElement('img');
  userP.className="userText";
  userP.textContent = rawText;
  userImg.setAttribute('src', "https://em-content.zobj.net/thumbs/60/google/350/person_1f9d1.png");
  userDiv.appendChild(userImg);
  userDiv.appendChild(userP);
  chatbox.append(userDiv);
  // append bot input in chatbox
  var botDiv=document.createElement('div');
  var botP=document.createElement('p');
  var botImg=document.createElement('img');
  botDiv.className="botInput";
  botP.className="botText";
  botP.textContent="Loading...";
  botImg.setAttribute('src', "https://em-content.zobj.net/thumbs/60/google/350/robot_1f916.png");
  botDiv.appendChild(botImg);
  botDiv.appendChild(botP);
  chatbox.append(botDiv);
  $.get("/get", { msg: rawText }).done(function(data) {
    botP.textContent=data;
  });
}
// press enter to send message and get response
$("#textInput").keypress(function(e) {
  if (e.which == 13) {
    getBotResponse();
    scrollDown();
  }
});
// auto scroll down when messages appended
function scrollDown(){
	$("#chatbox").animate({scrollTop: $('#chatbox').prop("scrollHeight")}, 500);
}