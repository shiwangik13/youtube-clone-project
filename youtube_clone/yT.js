
const baseUrl1="https://www.googleapis.com/youtube/v3";
const APIKey1="AIzaSyBdt4RAMzQVbC4ZaGY8Wbfj_ePKBuUJK8Y";


const videoContainer=document.getElementById("ytvideo");
const videoId=sessionStorage.getItem("videoId");
videoContainer.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
const videodesc=document.getElementById("description");
const commentsContainer=document.getElementById("comments");

async function detailofplayvideo(videoId){
const url=`${baseUrl}/videos?key=${APIKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
    
const response= await fetch(url,{
    method:"get",
});
const data = await response.json();
console.log(data);
videodesc.innerHTML=`<div id="videotitle">${data.items[0].snippet.localized.title} </div>
                <div class="viewsdescription">
                    <div class="leftside">${data.items[0].statistics.viewCount}  views</div>
                    <div class="rightside">
                    <span><img src="assets/img/liked.svg" width="22px">
                    ${data.items[0].statistics.likeCount}</span>
                    <span><img src="assets/img/DisLiked.svg" width="22px">
                    20</span>
                    <span><img src="assets/img/share.svg">
                        SHARE</span>
                    <span><img src="assets/img/save.svg">
                     SAVE</span> 
                    <span><img src="assets/img/threedot.svg"></span>            
                    </div>
                    </div>

<div class="aboutchanal">
    <div class="logochanal"><img src="assets/img/Profile.svg"></div>
    <div class="chanaeldes">
        <div class="channelname"><p>${data.items[0].snippet.channelTitle}</p>
        <img src="assets/img/Subscribes-Btn.svg"></div>
        <div class="desaboutchanel"><p>${data.items[0].snippet.description}</p>
        <h4>SHOW MORE</h4></div>
    </div>
    </div>
    <div class="commentsdetail">
    <div>${data.items[0].statistics.commentCount} comments</div>
    <div class="commentsort"><img src="assets/img/sortby.svg">
    <p>SORT BY</p></div>
   </div>
</div>`}

async function getComments(){
   
        const url=`${baseUrl1}/commentThreads?key=${APIKey1}&videoId=${videoId}&maxResults=80&&order=time&part=snippet`;
        const response= await fetch(url,{
            method:"get",
        });
        const data = await response.json();
        const comments=data.items;
      
        renderComments(comments);
}

function renderComments(comments){
    videodesc.innerHtml="";
    
commentsContainer.innerHTML="";
comments.forEach((comments)=>{
commentsContainer.innerHTML+=`<div class="commentdesbox">
       <div class="authorlogo"><img src="${comments.snippet.topLevelComment.snippet.authorProfileImageUrl}"></div>
       <div class="authorcomt">
            <p>${comments.snippet.topLevelComment.snippet.authorDisplayName}</p>
            <p>${comments.snippet.topLevelComment.snippet.textDisplay}</p>
            <div class="likedis">
                    <img src="assets/img/liked.svg">
                    <span>${comments.snippet.topLevelComment.snippet.likeCount}</span>
                    <img src="assets/img/DisLiked.svg">
                    <span> REPLY</span>
            </div>
        </div>
        </div>`
})
}

detailofplayvideo(videoId);
getComments();

function searchstring(){
    const searchstring=document.getElementById("searchitem").value;
            
    sessionStorage.setItem("searchstrings",searchstring);
    sessionStorage.removeItem("videoId",videoId);
    window.open("index.html");   
}