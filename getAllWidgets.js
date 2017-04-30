// var $dom = prism.$injector.get('ux-controls.services.$dom');
var selectedWidgets = {};

function selectWidget(){
  var $this = $(this);
  var id = $this.attr('widgetId');

  if ($this.hasClass('selected')){
    $this.removeClass('selected');
    selectedWidgets[id]=undefined;
  }else{
    var dashboardId = $this.attr('dashboardId');
    selectedWidgets[id]={
      id:id,
      dashboardId:dashboardId,
    };
    $this.addClass('selected');
  }
}

function createOverlayMenu(overlayDiv){
  $('.btn-immutable.btn-action.btn-settings.fl-icon-container').css('visibility','hidden');
  var overlayMenu = $('<div class="presentation-overlay-menu"></div>');
  var overlayMenuSave = $('<div class="presentation-overlay-menu-button save">Save</div>');
  var overlayMenuCancel = $('<div class="presentation-overlay-menu-button">Cancel</div>');
  // console.log({overlayTop,overlayLeft,overlayRight});
  overlayMenuCancel.click(function(){
    selectedWidgets={};
    overlayDiv.remove();
    $('.btn-immutable.btn-action.btn-settings.fl-icon-container').css('visibility','visible');

  });

  // var selectedWidgets = {};
  overlayMenuSave.click(function(){
    var index = 0;
    selectedWidgets={};

    var widgetHolder = $('.presentation-widget-container.selected');

    $.map(widgetHolder, function (e) {
      var title =  $(e).find('.title-desc-container .title-container input.textbox').val();
      var desc =  $(e).find('.title-desc-container .desc-container textarea.textbox').val();
      var dashboardid = $(e).attr('dashboardid');
      var widgetid =  $(e).attr('widgetid');
      var widgetData = {dashboardid,widgetid,title,desc};
      selectedWidgets[index] = widgetData;
      index ++;
      return index;
    });

    console.log(selectedWidgets);

    overlayDiv.remove();
    $('.btn-immutable.btn-action.btn-settings.fl-icon-container').css('visibility','visible');

  });
  overlayMenu.append(overlayMenuCancel);
  overlayMenu.append(overlayMenuSave);

  return overlayMenu;
}

function createOverlay(){
  console.clear();
  var overlayTop = $('#prism-toolbar').position().top + $('#prism-toolbar').height();
  var overlayLeft = $('#prism-toolbar').position().left;
  var overlayRight = $('#prism-toolbar').position().left + $('prism-toolbar').width();
  // var overlayMenu = $('<div class="presentation-overlay"></div>');
  var overlayDiv = $('<div id="presentationOverlay" class="presentation-overlay"  style="top:'+overlayTop+'px;left:'+overlayLeft+'px;right:'+overlayRight+'px;""></div>');
  var $mainScrollableSection = $('dashboard .content');
  overlayDiv.on('scroll', function(e){
    $mainScrollableSection.scrollTop($(this).scrollTop());
  });

  findWidgetsPositions().map(function(widgetContainer){
    overlayDiv.append(widgetContainer);
  });

  overlayDiv.append(createOverlayMenu(overlayDiv));
  $('body').append(overlayDiv);
}


function widgetsDivMaker(sizing){
  var width = sizing.width;
  var height = sizing.height;
  var left = sizing.position.left - $('#prism-toolbar').position().left;
  var top = sizing.position.top - $('#prism-toolbar').position().top - $('#prism-toolbar').height();
  var widgetId = sizing.widgetId;
  var dashboardId = sizing.dashboardId;
  var title = prism.activeDashboard.widgets.$$widgets.filter(function(w) {return w.oid === widgetId;}).map(function(t) {return t.title;})[0];
  var titleDescDiv = $('<div class="title-desc-container"></div>');
  var widgetContainer = $('<div class="presentation-widget-container" dashboardId="'+dashboardId+'" widgetId="'+widgetId+'" style="width:'+width+'px;height:'+height+'px;left:'+left+'px;top:'+top+'px;"></div>');
  var titleContainer = $('<div class="title-container"></div>');
  var titleLabel = $('<label class="widgets-label" for="title">title</label>');
  var titleTextbox = $('<input class="textbox" value="'+title+'"/>');

  titleContainer.append(titleLabel);
  titleContainer.append(titleTextbox);

  titleTextbox.click(function (e) {
    e.stopPropagation();
  });
  titleDescDiv.append(titleContainer);

  var descriptionContainer = $('<div class="desc-container"></div>');
  var descriptionTextbox = $('<textarea class="textbox" />');
  var descriptionLabel = $('<label class="widgets-label" for="description">description</label>');
  descriptionContainer.append(descriptionLabel);
  descriptionContainer.append(descriptionTextbox);

  descriptionTextbox.click(function (e) {
    e.stopPropagation();
  });
  titleDescDiv.append(descriptionContainer);
  widgetContainer.append(titleDescDiv);

  widgetContainer.click(selectWidget);
  return widgetContainer;
}

function findWidgetsPositions() {
  var widgets = $('widget');
  var widgetsContainers = [];
  var offsetColl = [];

  for (var i=0;i < widgets.length; i ++) {
    var sizing = {
      position: widgets.eq(i).offset(),
      width: widgets.eq(i).width(),
      height: widgets.eq(i).height(),
      dashboardId: window.prism.activeDashboard.oid,
      widgetId: widgets.eq(i).attr('widgetid'),
      widgetTitle: widgets.eq(i).attr('title'),
    };
    widgetsContainers.push(widgetsDivMaker(sizing));
    offsetColl.push(sizing);
  }

  return widgetsContainers;
}

var presButton = $('<div class="btn-immutable btn-action btn-settings fl-icon-container" style="display: block; text-shadow: 1px 1px 10px yellow; height: 100%; width: 135px; padding-top: 5px; margin: 2px;text-align: center; color: grey;">Create Presentation</div>');
presButton.click(createOverlay);


window.prism.on('beforedashboardloaded',function () {
  $('.actions-box').append(presButton);

});
