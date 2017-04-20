// const $dom = prism.$injector.get('ux-controls.services.$dom');
selectedWidgets = [];

function selectWidget(widgetId){
  let realWidgetId = widgetId.target.attributes[1].nodeValue;
  console.log(['before',selectedWidgets]);
  //
  // if (selectedWidgets.indexOf(realWidgetId) !== 1)  {
  //   selectedWidgets.push(realWidgetId)} else {selectedWidgets.splice(realWidgetId)}
  selectedWidgets.push(realWidgetId);
  let widgetTitle =
  console.log(selectedWidgets);

//   if (()=>{return selectedWidgets.indexOf(realWidgetId) } == '-1') {
//     //do nothing
//     console.log(['true',selectedWidgets]);
//     selectedWidgets.splice(realWidgetId)
//   } else {
//     console.log('false');
//     selectedWidgets.push(realWidgetId);
//   }
//   console.log(selectedWidgets);
}

function createOverlay(){
  var overlayDiv = $('<div id="presentationOverlay" class="presentation_overlay"></div>');
  findPosition().map(function(widgetContainer){
    overlayDiv.append(widgetContainer);
  });
  $('body').append(overlayDiv);
  // console.log(widgetsPositions);
}


function widgetsDivMaker(width,height,left,top,widgetId){
  var widgetContainer = $(`<div class="widgets" widgetId="${widgetId}" style="width:${width}px;height:${height}px;left:${left}px;top:${top}px;"></div>`);
  widgetContainer.click(selectWidget);
  return widgetContainer;
}

function findPosition() {
  const widgets = $('widget');
  const widgetsContainers = [];
  const offsetColl = [];

  for (i=0;i < widgets.length; i ++) {
    // console.log({i});
    let sizings = {
      position: widgets.eq(i).offset(),
      width: widgets.eq(i).width(),
      height: widgets.eq(i).height(),
      widgetId: widgets.eq(i).attr('widgetid'),
      // widgetTitle: widgets.eq(i).attr('title')
    };
    widgetsContainers.push(widgetsDivMaker(sizings.width,sizings.height,sizings.position.left,sizings.position.top,sizings.widgetId,sizings.widgetTitle));
    offsetColl.push(sizings);
  };

  console.log({offsetColl});
  return widgetsContainers;
  // return offsetColl;
  // var positions = widgets.map(widget){}
  console.log({selectedWidgets});

}

const presButton = {
  id: 'pres',
  caption: 'pres',
  desc: 'pres1',
  execute: function () {
    const widgetsObj = {};
    const widgetsArray = prism.activeDashboard.widgets.$$widgets;
    const widgets = widgetsArray
    .map((widget) => {
      let id = widget._id;
      let dashId = widget.dashboardid;
      let title = widget.title;
      let desc = widget.desc;
      return {id,dashId,title,desc};

    });
    window.O = $;

    widgetsObj.widgets = widgets;
    console.log(widgetsObj);

    // templateUrl: '/plugins/presentation_plugin/overlay.html',
    createOverlay();
  },
};

prism.on('beforemenu',function (event, args) {
  if (args.settings.name == 'dashboard') {
    args.settings.items.push(presButton);
  }

});
