

;(function($) {
	"use strict"

	var defaults = {
		maxTags: 3,
		tags: [],
		search: false,        //是否支持搜索
		url: '',			  //搜索的地址
		newTag: function(tag) {} //创建新tag
	};

	var TagsInput = function(element,options) {
		this.opts = $.extend({},defaults,options);
		this.itemsArray = this.opts.tags;

		if (this.itemsArray.length>this.opts.maxTags) {
			this.itemsArray = this.itemsArray.slice(0,this.opts.maxTags);
		} else {
			this.itemsArray = this.opts.tags;
		}

		this.$element = $(element);
		this.$element.hide();

		this.timer = null;

		this.render();
		this.$element.show();
	};
	TagsInput.prototype = {
		constructor: TagsInput,
		
		tpl: function(name) {
			return '<span class="tag">'+
						'<span>'+name+'</span>&nbsp;&nbsp;'+
						'<a href="javascript:;" class="tagsinput-remove-link fa fa-close"></a>'+
					'</span>';
		},

		render: function() {
			var _this = this;
			
			if (_this.itemsArray.length!=0) {
				var tag_str = '';

				var len = _this.itemsArray.length;

				for (var i=0; i<_this.itemsArray.length; i++) {
					tag_str += _this.tpl(_this.itemsArray[i]);
				}
				_this.$element.children('.tagsinput-add-container').before(tag_str);
			}
			_this.bindEvent();
		},

		bindEvent: function() {
			var _this = this;
			var $el = _this.$element;

			$el.on('click','.tagsinput-remove-link',function(e) {
				e.preventDefault();
				e.stopPropagation();

				var item = $(this).siblings('span').text();
				var index = $(this).parent('span.tag').index();

				_this.itemsArray.splice(index,1);
				$el.find('input[type=hidden]').val(_this.itemsArray.join(','));

				$(this).parent().remove();
			});
			// 添加标签
			$el.find('.tagsinput-add-container>input').on('keypress',function(e) {
				if (e.which==13) {
					e.preventDefault();
					e.stopPropagation();
					if (trim($(this).val())!='') {
						_this.add($el,$(this));
					} else {
						$(this).val('');
					}
				}
			});
			$el.find('.tagsinput-add-container>input').on('keyup',function(e) {
				var $input = $(this);
				if (e.which==188) {
					if (trim($(this).val())!='') {
						_this.add($el,$(this));
					} else {
						$(this).val('');
					}
				}

				if (_this.opts.search) {
					if ($(this).val()=='') return false;

					if (_this.timer) clearTimeout(_this.timer);

					_this.timer = setTimeout(function() {
						$.post(_this.opts.url,{name:$input.val()},function(data) {
							if (!data.error) {
								_this.showTagsList(data['data'],$input.val());
								// _this.addTag($input);
							}
						},'json');
					},300)
				}
			});

			//删除标签
			$el.find('.tagsinput-add-container>input').on('keydown',function(e) {
				if (e.which==8 && trim($(this).val())=='') {
					_this.remove();
				}
			});

			$el.on('click',function() {
				$el.find('.tagsinput-add-container>input').focus();
			})
		},

		add: function(container,input) {
			var _this = this;
			var tag = trim(input.val());

			// 如果按的是『,』键，把『,』去掉
			if (tag.indexOf(',')==tag.length-1) {
				tag = tag.substr(0,tag.length-1);
				if (tag=='') return false;
			}

			if (_this.itemsArray.length<_this.opts.maxTags) {

				if (checkRepeat(container,tag,_this.itemsArray)) {
					input.val('');
					return false;
				} else {
					_this.itemsArray.push(tag);
					container.find('input[type=hidden]').val(_this.itemsArray.join(','));

					input.parent().before(_this.tpl(tag));
					input.val('');
				}
			} else {
				input.val('');
				return false;
			}
		},

		remove: function() {
			var _this = this;
			var $el = _this.$element;
			var len = _this.itemsArray.length;
			
			$el.children('.tag:last').remove();
			_this.itemsArray.splice(len-1,1);
			$el.find('input[type=hidden]').val(_this.itemsArray.join(','));
		},
		// 创建下拉提示菜单
		showTagsList: function(tags,val) {
			var _this = this,createStatus = false;
			var $el = _this.$element;

			var str = '<ul class="nav">';

			tags.forEach(function(tag,i) {
				if (tag['name']==val) {
					createStatus = true;
				}
				str += '<li data-id="'+tag['id']+'"><a href="javascript:void(0);" class="active">'+tag['name']+'</a></li>';
			});
			if (!createStatus) {
				str += '<li><a href="javascript:void(0);">创建 <span>'+val+'</span></a></li>';
			}
			str += '</ul>';
			$el.find('.tagsinput-add-container').find('ul').remove();
			$el.find('.tagsinput-add-container').append(str);
			_this.bindList();
		},
		//下拉提示菜单的事件处理
		bindList: function() {
			var _this = this;
			var $el = _this.$element;
			var input = $el.find('.tagsinput-add-container > input');
			$el.find('ul li a').on('click',function() {

				if (!$(this).data('id')) {
					var tag = _this.opts.newTag(input.val());
				} else {
					var tag = $(this).html();
				}

				if (_this.itemsArray.length<_this.opts.maxTags) {
					if (!checkRepeat($el,tag,_this.itemsArray)) {
						_this.itemsArray.push(tag);
						$el.find('input[type=hidden]').val(_this.itemsArray.join(','));

						$el.find('.tagsinput-add-container').before(_this.tpl(tag));
					}
				}
				$(this).parents('ul').remove();
				input.val('');
				return false;
			});
		},

	};

	var checkRepeat = function($el,tag,tags) {
		var index = inArray(tag,tags);

		if (index!=-1) {
			$el.find('span.tag').eq(index).hide().fadeIn();
			return true;
		} else {
			return false;
		}
	};
	var inArray = function(value,arr) {
	    var status = -1;
	    for(var i=0;i<arr.length;i++) {
	        if(arr[i] == value) {
	           status = i;
	        }
	    }
	    return status;
	};
	var trim = function(str) {
        return (!String.prototype.trim) ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : str.trim();
	};


	$.fn.tagsInput = function(options) {
		return this.each(function() {
			$(this).data('tagsInput', new TagsInput($(this)[0], options || {}));
		});
    }

})(window.jQuery)