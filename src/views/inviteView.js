define('views/inviteView', ['text!views/templates/invite.html', 'modules/log', 'models/models', 'views/buddyView'], function(template, log, models, BuddyView) {

    "use strict";

    return Backbone.View.extend({

        tagName: 'div',

        className: 'displayed',

        initialize: function(){
        },

        events: {
            'click #cancelBtn': 'onCancel',
            'click #inviteBtn': 'onInvite'
        },

        subscriptions: {
        },

        render: function() {
            this.$el.html(template);
            this.$('.invite').i18n();

            var buddies = models.buddies();

            this.displayBuddies(buddies);

            return this;
        },

        displayBuddies: function(buddies) {

            var that = this;

            buddies.each(function(model) {
                that.onAddBuddy(model);
            });
        },

        onAddBuddy: function(model) {
            this.hideEmptyArea();

            var view = new BuddyView({model: model});
            this.$('.invites').append(view.render().el);
            //this.conferencesView[model.get('vanity')] = view; 
        },

        hideEmptyArea: function() {

        },

        close: function() {
            this.remove();
            this.undelegateEvents();
            this.unbind();
            this.off();
        },

        onCancel: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Backbone.Mediator.publish('invite-close', false);
        },

        onInvite: function(e) {
            e.preventDefault();
            e.stopPropagation();

            Backbone.Mediator.publish('invite-close', true);
        }

    });

});