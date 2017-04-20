const $dom = prism.$injector.get('ux-controls.services.$dom');

const presButton = {
  id: 'pres',
  caption: 'pres',
  desc: 'pres1',
  execute: function () {
    const widgets = prism.activeDashboard.widgets.$$widgets;
    console.log(widgets);
  },
  templateUrl: '',


}

prism.on('beforemenu',function (event, args) {
  if (args.settings.name == 'dashboard') {
    args.settings.items.push(presButton);
  }

});
