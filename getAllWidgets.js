// const $dom = prism.$injector.get('ux-controls.services.$dom');

function createOverlay(){
  var overlayDiv = $('<div id="presentationOverlay" class="presentation_overlay"></div>');
  $('body').append(overlayDiv);
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
