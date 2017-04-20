const $dom = prism.$injector.get('ux-controls.services.$dom');

const presButton = {
  id: 'pres',
  caption: 'pres',
  desc: 'pres1',
  execute: function () {
    const widgetsArray = prism.activeDashboard.widgets.$$widgets;
    const widgets = widgetsArray
    .map((widget) => {
      let id = widget._id;
      let dashId = widget.dashboardid;
      let title = widget.title;
      let desc = widget.desc;
      return {id,dashId,title,desc}      

    });
    console.log(widgets);
  },
  templateUrl: '',


}

prism.on('beforemenu',function (event, args) {
  if (args.settings.name == 'dashboard') {
    args.settings.items.push(presButton);
  }

});
