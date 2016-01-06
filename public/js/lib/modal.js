


;(function($) {

    "use strict"

    var defaults = {
        
    };

    var Modal = function(element,options) {
        this.opts = $.extend({},defaults,options);
        this.$body = $('body');
        this.$mask = $('#mask');
        this.$el = $(element);
        this.scrollbarWidth = 0;
        this.bodyIsOverflowing = false;
        this.render();
    };

    Modal.prototype = {
        constructor: Modal,

        measureScrollbar: function () {
            var scrollDiv = document.createElement('div');
            scrollDiv.className = 'modal-scrollbar-measure';
            this.$body.append(scrollDiv);
            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            this.$body[0].removeChild(scrollDiv);
            return scrollbarWidth;
        },

        checkScrollbar: function () {
            var fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                var documentElementRect = document.documentElement.getBoundingClientRect()
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
            this.scrollbarWidth = this.measureScrollbar();
        },

        render: function() {
            var _this = this;

            _this.checkScrollbar();

            _this.$el.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                _this.$target = $($(this).data('target'));

                if (_this.bodyIsOverflowing) {
                    _this.$body.addClass('modal-open').css('padding-right',_this.scrollbarWidth+'px');
                } else {
                    _this.$body.addClass('modal-open');
                }
                
                _this.$target.show();
                _this.$mask.show();

                setTimeout(function() {
                    _this.$target.addClass('in');
                    _this.$mask.addClass('in');
                },0);

                _this.$target.on('click', function(ev) {

                    if (ev.target !== _this.$target[0]) {
                        return false;
                    }
                    _this.hide();
                });
                _this.$target.on('click','[data-dismiss="modal"]', function() {
                    _this.hide();
                })
            });
        },
        hide: function() {
            var _this = this;
            
            _this.$mask.removeClass('in');
            _this.$target.removeClass('in');

            setTimeout(function() {
                _this.$target.hide();
                _this.$mask.hide();
                _this.$body.removeClass('modal-open').css('padding-right','0px');
            },150);
        }

    };

    $.fn.modal = function(options) {
        return this.each(function() {
            $(this).data('modal', new Modal($(this)[0], options || {}));
        });
    }


})(window.jQuery)
