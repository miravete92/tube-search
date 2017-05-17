var OMDB_BASE_URL = 'https://www.googleapis.com/youtube/v3/search/';
var KEY = 'AIzaSyC6VRZhBxshBbLlBeuohK7NvJeqL0u5dt8';
var nextPageToken;
var prevPageToken;
function getDataFromApi(searchTerm, pageToken, callback) {
  var query = {
    part: 'snippet',
    key: KEY,
    q: searchTerm,
    pageToken: pageToken
  }
  $.getJSON(OMDB_BASE_URL, query, callback);
}


function displayOMDBSearchData(data) {
  var resultElement = '';
  console.log(data);
  if (data.items.length>0) {
    data.items.forEach(function(item) {
        resultElement += 
        '<div class="searchResult">'+
          '<h3>' + item.snippet.title + '</h3>'+
          '<a href="https://www.youtube.com/watch?v='+ item.id.videoId +'">' +
            '<img src="' + item.snippet.thumbnails.medium.url + '" alt="thumbnail"></img>'+
          '</a>' +
          '<p>' + item.snippet.description + '</p>'+
          '<a href="https://www.youtube.com/channel/'+item.snippet.channelId+'">More from this channel</a>'+
        '</div>';
    });
    if(data.prevPageToken){
      resultElement += '<button class="prevPage">Prev Page</button>';
      prevPageToken = data.prevPageToken;
    }
    if(data.nextPageToken){
      resultElement += '<button class="nextPage">Next Page</button>';
      nextPageToken = data.nextPageToken;
    }
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, null, displayOMDBSearchData);
  });

  $('.js-search-results').on("click",".prevPage",function(e) {
    e.preventDefault();
    var query = $('.js-query').val();
    getDataFromApi(query, prevPageToken, displayOMDBSearchData);
  });
  $('.js-search-results').on("click",".nextPage",function(e) {
    e.preventDefault();
    var query = $('.js-query').val();
    getDataFromApi(query, nextPageToken, displayOMDBSearchData);
  });
}
$(function(){watchSubmit();});
