odoo.define('vms_kanban_view.ActivityMenu', function (require) {
    "use strict";
    
    var core = require('web.core');
    var session = require('web.session');
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');
    var QWeb = core.qweb;
    var ActivityMenu = require('mail.systray.ActivityMenu');

    ActivityMenu.include({
        _onActivityFilterClick: function (event) {
            // fetch the data from the button otherwise fetch the ones from the parent (.o_mail_preview).
            var data = _.extend({}, $(event.currentTarget).data(), $(event.target).data());
            var context = {};
            if (data.filter === 'my') {
                context['search_default_activities_overdue'] = 1;
                context['search_default_activities_today'] = 1;
            } else {
                context['search_default_activities_' + data.filter] = 1;
            }
            // Necessary because activity_ids of mail.activity.mixin has auto_join
            // So, duplicates are faking the count and "Load more" doesn't show up
            context['force_search_count'] = 1;
            this.do_action('rt_activity_mgmt.mail_activity_action');
            // this.do_action({
            //     type: 'ir.actions.act_window',
            //     name: data.model_name,
            //     res_model:  'mail.activity',
            //     views: [[false, 'kanban'], [false, 'list'], [false, 'form']],
            //     search_view_id: [false],
            //     // domain: [['activity_user_id', '=', session.uid]],
            //     context:context,
            // }, {
            //     clear_breadcrumbs: true,
            // });
        },
    })

})