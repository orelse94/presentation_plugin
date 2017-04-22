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
  var overlayMenu = $('<div class="presentation-overlay-menu"></div>');
  var overlayMenuSave = $('<div class="presentation-overlay-menu-button">Save</div>');
  var overlayMenuCancel = $('<div class="presentation-overlay-menu-button">Cancel</div>');
  overlayMenuCancel.click(function(){
    selectedWidgets={};
    overlayDiv.remove();
  });
  overlayMenuSave.click(function(){
    console.log(selectedWidgets);
    selectedWidgets={};
    overlayDiv.remove();
  });
  overlayMenu.append(overlayMenuCancel);
  overlayMenu.append(overlayMenuSave);

  return overlayMenu;
}

function createOverlay(){
  console.clear();
  var overlayDiv = $('<div id="presentationOverlay" class="presentation-overlay"></div>');
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
  var left = sizing.position.left;
  var top = sizing.position.top;
  var widgetId = sizing.widgetId;
  var dashboardId = sizing.dashboardId;

  var widgetContainer = $('<div class="presentation-widget-container" dashboardId="'+dashboardId+'" widgetId="'+widgetId+'" style="width:'+width+'px;height:'+height+'px;left:'+left+'px;top:'+top+'px;"></div>');
  var titleTextbox = $('<input class="textbox" />');
  titleTextbox.click(function (e) {
    e.stopPropagation();
  });
  widgetContainer.append(titleTextbox);

  var descriptionTextbox = $('<textarea class="textbox" />');
  descriptionTextbox.click(function (e) {
    e.stopPropagation();
  });
  widgetContainer.append(descriptionTextbox);

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

var presButton = {
  id: 'pres',
  caption: 'pres',
  desc: 'pres1',
  execute: function () {
    // var widgetsObj = {};
    // var widgetsArray = window.prism.activeDashboard.widgets.$$widgets;
    // var widgets = widgetsArray
    // .map(function(widget) {
    //   var id = widget._id;
    //   var dashId = widget.dashboardid;
    //   var title = widget.title;
    //   var desc = widget.desc;
    //   return {
    //     id:id,
    //     dashId:dashId,
    //     title:title,
    //     desc:desc,
    //   };
    //
    // });
    // window.O = $;
    // widgetsObj.widgets = widgets;
    // console.log(widgetsObj);

    createOverlay();
  },
};

window.prism.on('beforemenu',function (event, args) {
  if (args.settings.name == 'dashboard') {
    args.settings.items.push(presButton);
  }

});
