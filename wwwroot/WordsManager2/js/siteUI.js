let search = "";
let endOfData = false;
let pageManager;
Init_UI();

function Init_UI() {
    $('#aboutContainer').hide();
    let wordItemLayout = {
        width: $("#sample").outerWidth(),
        height: $("#sample").outerHeight()
    };
    pageManager = new PageManager('scrollPanel', 'wordsPanel', wordItemLayout, renderWords);   
    $("#actionTitle").text("Mots");
    $("#search").show();
    $("#abort").hide();
    
    $('#abort').on("click", async function () {
        $("#aboutContainer").hide();
        $("#abort").hide();
        $("#search").show();
        $("#scrollPanel").show();
        $("#actionTitle").text("Mots");
    });
    $('#aboutCmd').on("click", function () {
        renderAbout();
    });
    $("#searchKey").on("change", () => {
        doSearch();
    })
    $('#doSearch').on('click', () => {
        doSearch();
    })
}
function doSearch() {
    search = $("#searchKey").val().replace(' ',',');
    pageManager.reset();
}
function renderAbout() {
    $("#scrollPanel").hide();
    $("#abort").show();
    $("#search").hide();
    $("#actionTitle").text("À propos...");
    $("#aboutContainer").show();
}
async function renderWords(queryString) {
    if (search != "") queryString += "&keywords=" + search;
    let words = await API_GetWords(queryString);
    if (words.length > 0) {
        addWaitingGif();
        words.forEach(word => {
            $("#wordsPanel").append(renderWord(word));
        });
        removeWaitingGif();
    }
}
function addWaitingGif() {
    $("#wordsPanel").append($("<div id='waitingGif' class='waitingGifcontainer'><img class='waitingGif' src='Loading_icon.gif' /></div>'"));
}
function removeWaitingGif() {
    $("#waitingGif").remove('');
}
function renderError(message) {
    $("#wordsPanel").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function renderWord(word) {
    return $(`
     <div class="wordRow" word_id=${word.Id}">
        <div class="wordContainer ">
            <div class="wordLayout">
                 <div></div>
                 <div class="wordInfo">
                    <span class="word">${word.Val}</span>
                    <span class="wordDef">${word.Def}</span>                   
                </div>
            </div>      
        </div>
    </div>           
    `);
}