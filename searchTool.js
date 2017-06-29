$.fn.searchTool=function(autocomplete){
  var searchbar=this;
  if(autocomplete){
    var parentdiv=$('<div class="searchbarParent"></div>');
    $(searchbar).before(parentdiv);
    $(parentdiv).append(searchbar);
    var autoBox=$('<div class="autocomplete"></div>');
    $(searchbar).before(autoBox);
    var autoVal=$('<p id="autoVal"></p>');
    $(autoBox).append(autoVal);
    $(autoBox).copyCSS(searchbar,['height','max-height','width']);
    $(this.parent()).css({
      'position':'relative'
    })
    $(searchbar).css({
      'background-color':'transparent',
      'position':'absolute',
      'left':'0px',
      'top':'0px',
      'overflow':'hidden'
    })
    $(autoBox).css({
      'position':'absolute',
      'left':'0px',
      'top':'0px',
      'color':'grey',
      'padding-top':'2px',
      'padding-left': '2px',
      'overflow':'hidden'
    })
    $('#autoVal').copyCSS($(searchbar),['font-size','max-height','width','font-family']);
    $('#autoVal').css({
      'position':'relative',
      'margin':'0px',
      'top': '50%',
      'transform': 'translateY(-50%)',
      'overflow':'hidden'
    })
  }
  $(this).keydown(function(e){
    $(autoBox).css('display','block');
    if(e.originalEvent.code==="ArrowRight"){
      $(autoBox).css('display','none');
      $(searchbar).val($('.singlesuggestion').first().text());
      return 0;
    }

    //======= Removing previously instantiated suggestion Box =======

      $('.suggestionBox').remove();

    //======= Manipulating css properties of searchBar
    var barWidth=$(searchbar).css('width');

    $(searchbar).css({
      position : 'relative'
    });

    //========= data manipulation =========

    setTimeout(function(){
      var key=$(searchbar).val();
      $('.suggestionBox').remove();
      if(key!=''){
        var suggestionBox = $('<div class="suggestionBox"></div>');
        $(searchbar).after(suggestionBox);
        $('.suggestionBox').copyCSS(searchbar,['width']);
        $('.suggestionBox').css({
          'display':'block',
          'position': 'absolute',
          'border-left': '1px solid',
          'border-right': '1px solid',
          'cursor':'pointer',
          'background-color':'white'
        });
        var url = 'http://35.154.56.172/api/project-search/Gurgaon/'+key+'/Flats';
        $.getJSON(url).done( function(responseObj) {
          if(!responseObj.error){
            $(responseObj.data).each(function(index,singledata){
              var singlesuggestion = $('<div class="singlesuggestion">'+singledata.name+'</div>')
              $('.suggestionBox').append(singlesuggestion);
            })
            $('.singlesuggestion').css({
              'display':'block',
              'padding': '5px',
              'border-bottom': '1px solid black'
            });
            $('#autoVal').text($('.singlesuggestion').first().text());
          }
        });
      }
      else{
        $('#autoVal').text('');
        $('.singlesuggestion').remove();
        $('.suggestionBox').remove();
      }
      $('.suggestionBox').on('click',$('.singlesuggestion'),function(e){
        $('#autoVal').text('');
        $(searchbar).val(e.target.textContent);
      })
    },0);
  });
};
