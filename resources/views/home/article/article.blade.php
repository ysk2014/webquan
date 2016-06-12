

<?php echo widget('Home.Common')->header($articleInfo['data']['title'].' | Web圈'); ?>

<?php echo widget('Home.Common')->top(); ?>

<link rel="stylesheet" type="text/css" href="{{ asset('css/simditor.css') }}" />

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
    		<div class="content-wrapper simditor">
    			<h1>{{ $articleInfo['data']['title'] }}</h1>
    			<div class="desc">
					<a href="{{ '/user/'.$articleInfo['data']['uid'] }}" class="author"><img class="img-circle" src="{{ $articleInfo['data']['userUrl'] }}"/><span>{{ $articleInfo['data']['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$articleInfo['data']['addtime']) }}</span>
	            	<span class="view">浏览：{{ $articleInfo['data']['view'] }}</span>
	            	@if (!empty($articleInfo['data']['tags'][0]))
	            	<span class="tags">
	            		<i class="fa fa-tags"></i>
	            		@foreach ($articleInfo['data']['tags'] as $tag)
	            			@if (!empty($tag))
	            			<a href="{{'/t/'.$tag}}">{{ $tag }}</a>
	            			@endif
	            		@endforeach
	            	</span>
	            	@endif
				</div>
				<div class="content simditor-body">
					{!! $articleInfo['data']['content'] !!}
				</div>
				<div class="single-share" data-aid="{{ $articleInfo['data']['id'] }}">
					<ul class="clearfix">
						<li><a href="javascript:void(0);" class="store @if (!empty($articleInfo['data']['store_id'])) active @endif" @if (!empty($articleInfo['data']['store_id'])) data-sid="{{ $articleInfo['data']['store_id'] }}" @endif><i class="fa fa-star" style="position: relative;top: 1px;margin-left: 1px;"></i><span>{{ $articleInfo['data']['store'] }}</span></a></li>
						<li><a href="javascript:void(0);" class="praise @if (!empty($articleInfo['data']['praise_id'])) active @endif" @if (!empty($articleInfo['data']['praise_id'])) data-pid="{{ $articleInfo['data']['praise_id'] }}" @endif><i class="fa fa-thumbs-up" style="position: relative;top: 1px;margin-left: 2px;"></i><span>{{ $articleInfo['data']['praise'] }}</span></a></li>

						@if ($userinfo['id']==$articleInfo['data']['uid']) 
							<li style="margin-right: 18px;"><a href="{{ '/note/'.$articleInfo['data']['nid'].'/edit' }}"><i class="fa fa-edit" style="position: relative;top: 2px;margin-left: 2px;"></i></a></li>
							<li><a href="javascript:void(0);" class="del" data-nid="{{ $articleInfo['data']['nid'] }}"><i class="fa fa-trash-o" style="position: relative;top: 1px;margin-left: 1px;"></i></a></li>
						@endif
					</ul>
				</div>
    		</div>
			<div class="comment-wrapper">
				<h4>文章评论(<span> @if ($comments['rc']==0) {{ $comments['count'] }} @else 0 @endif </span>)</h4>

				<div class="comment-list">
					@if ($comments['rc']==0)
						@foreach ($comments['data'] as $comment)
							<div class="comment-item clearfix" id="comment-{{ $comment['id'] }}" data-id="{{ $comment['id'] }}">
								<div class="content">
									<div class="meta-top">
										<a class="avatar img-circle" href="{{ '/user/'.$comment['uid'] }}"><img src="{{ $comment['userUrl'] }}"></a>
										<p><a href="{{ '/user/'.$comment['uid'] }}" class="author-name">{{ $comment['username'] }}</a></p>
										<span class="reply-time">{{ date('Y.m.d H:i',$comment['addtime']) }}</span>
									</div>
									<p>{{ $comment['content'] }}</p>
									<div class="comment-footer clearfix text-right">
										<a class="reply" data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" data-pid="{{ $comment['id'] }}" data-fid="{{ $comment['id'] }}" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}" href="javascript:;">回复</a>
										@if ($userinfo['id']==$comment['uid'])
											<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $comment['id'] }}" data-url="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}"  href="javascript:;">删除</a>
										@endif
									</div>
									<div class="child-comment-list @if (isset($comment['children']) && count($comment['children'])>0) show @else hide @endif">
										@if (isset($comment['children']) && count($comment['children'])>0)
											@foreach ($comment['children'] as $childComment)
												<div class="child-comment" id="comment-{{ $childComment['id'] }}" data-id="{{ $childComment['id'] }}">
													<p><a href="{{ '/user/'.$childComment['uid'] }}">{{ $childComment['username'] }}</a>: <?php echo $childComment['content']; ?></p>
													<div class="child-comment-footer text-right clearfix">
														<span class="reply-time pull-left">{{ date('Y.m.d H:i',$childComment['addtime']) }}</span>
														<a data-id="{{ $childComment['id'] }}" data-nick="{{ $childComment['username'] }}" class="reply" data-pid="{{ $childComment['id'] }}" data-fid="{{ $childComment['fid'] }}" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}" href="javascript:void(null)">回复</a>
														@if ($userinfo['id']==$childComment['uid'])
															<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $childComment['id'] }}" data-url="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}"  href="javascript:;">删除</a>
														@endif
													</div>
												</div>
											@endforeach
										@endif
										<div data-state="remaining-child-comments"></div>
									</div>
								</div>
							</div>
						@endforeach

						@if ($comments['next'])
							<p class="load-more"><a href="javascript:;" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment/page/1' }}" class="">加载更多<i style="margin-left: 5px;" class="fa fa-arrow-down"></i></a></p>
						@endif
					@endif

					@if (isset($userinfo) && $userinfo) 
						<form method="post" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}">
							<div class="comment-text">
								<textarea maxLangth="1000" name="data[content]" placeholder="写下你的评论..."></textarea>
								<a class="btn btn-primary btn-sm submit" >发表</a>
							</div>
						</form>
					@else 
						<a class="btn btn-primary btn-sm login" href="#myLogin" data-toggle="modal" data-target="#myLogin">登录后才能评论</a>
					@endif
				</div>
			</div>
    	</div>
    	<div class="col-md-4 sidebar">
    		<?php echo widget('Home.Common')->artAside($author,$cloumn); ?>
    	</div>
    </div>
</div>

<link rel="stylesheet" href="{{ asset('css/github-gist.css') }}">
<script src="{{ asset('js/lib/highlight.min.js') }}"></script>
<script>hljs.initHighlightingOnLoad();</script>
<script type="text/javascript" src="{{ asset('js/article.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/comment.js') }}"></script>
<script>
	/**!
 * 微信内置浏览器的Javascript API，功能包括：
 *
 * 1、分享到微信朋友圈
 * 2、分享给微信好友
 * 3、分享到腾讯微博
 * 4、新的分享接口，包含朋友圈、好友、微博的分享（for iOS）
 * 5、隐藏/显示右上角的菜单入口
 * 6、隐藏/显示底部浏览器工具栏
 * 7、获取当前的网络状态
 * 8、调起微信客户端的图片播放组件
 * 9、关闭公众平台Web页面
 */
var WeixinApi = (function () {
 
  "use strict";
 
  /**
   * 分享到微信朋友圈
   * @param    {Object}  data    待分享的信息
   * @p-config  {String}  appId   公众平台的appId（服务号可用）
   * @p-config  {String}  imgUrl   图片地址
   * @p-config  {String}  link    链接地址
   * @p-config  {String}  desc    描述
   * @p-config  {String}  title   分享的标题
   *
   * @param    {Object}  callbacks 相关回调方法
   * @p-config  {Boolean}  async          ready方法是否需要异步执行，默认false
   * @p-config  {Function} ready(argv)       就绪状态
   * @p-config  {Function} dataLoaded(data)    数据加载完成后调用，async为true时有用，也可以为空
   * @p-config  {Function} cancel(resp)  取消
   * @p-config  {Function} fail(resp)   失败
   * @p-config  {Function} confirm(resp)  成功
   * @p-config  {Function} all(resp)    无论成功失败都会执行的回调
   */
  function weixinShareTimeline(data, callbacks) {
    callbacks = callbacks || {};
    var shareTimeline = function (theData) {
      WeixinJSBridge.invoke('shareTimeline', {
        "appid":theData.appId ? theData.appId : '',
        "img_url":theData.imgUrl,
        "link":theData.link,
        "desc":theData.title,
        "title":theData.desc, // 注意这里要分享出去的内容是desc
        "img_width":"640",
        "img_height":"640"
      }, function (resp) {
        switch (resp.err_msg) {
          // share_timeline:cancel 用户取消
          case 'share_timeline:cancel':
            callbacks.cancel && callbacks.cancel(resp);
            break;
          // share_timeline:confirm 发送成功
          case 'share_timeline:confirm':
          case 'share_timeline:ok':
            callbacks.confirm && callbacks.confirm(resp);
            break;
          // share_timeline:fail　发送失败
          case 'share_timeline:fail':
          default:
            callbacks.fail && callbacks.fail(resp);
            break;
        }
        // 无论成功失败都会执行的回调
        callbacks.all && callbacks.all(resp);
      });
    };
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
      if (callbacks.async && callbacks.ready) {
        window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
        if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
          window["_wx_loadedCb_"] = new Function();
        }
        callbacks.dataLoaded = function (newData) {
          window["_wx_loadedCb_"](newData);
          shareTimeline(newData);
        };
        // 然后就绪
        callbacks.ready && callbacks.ready(argv);
      } else {
        // 就绪状态
        callbacks.ready && callbacks.ready(argv);
        shareTimeline(data);
      }
    });
  }
 
  /**
   * 发送给微信上的好友
   * @param    {Object}  data    待分享的信息
   * @p-config  {String}  appId   公众平台的appId（服务号可用）
   * @p-config  {String}  imgUrl   图片地址
   * @p-config  {String}  link    链接地址
   * @p-config  {String}  desc    描述
   * @p-config  {String}  title   分享的标题
   *
   * @param    {Object}  callbacks 相关回调方法
   * @p-config  {Boolean}  async          ready方法是否需要异步执行，默认false
   * @p-config  {Function} ready(argv)       就绪状态
   * @p-config  {Function} dataLoaded(data)    数据加载完成后调用，async为true时有用，也可以为空
   * @p-config  {Function} cancel(resp)  取消
   * @p-config  {Function} fail(resp)   失败
   * @p-config  {Function} confirm(resp)  成功
   * @p-config  {Function} all(resp)    无论成功失败都会执行的回调
   */
  function weixinSendAppMessage(data, callbacks) {
    callbacks = callbacks || {};
    var sendAppMessage = function (theData) {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid":theData.appId ? theData.appId : '',
        "img_url":theData.imgUrl,
        "link":theData.link,
        "desc":theData.desc,
        "title":theData.title,
        "img_width":"640",
        "img_height":"640"
      }, function (resp) {
        switch (resp.err_msg) {
          // send_app_msg:cancel 用户取消
          case 'send_app_msg:cancel':
            callbacks.cancel && callbacks.cancel(resp);
            break;
          // send_app_msg:confirm 发送成功
          case 'send_app_msg:confirm':
          case 'send_app_msg:ok':
            callbacks.confirm && callbacks.confirm(resp);
            break;
          // send_app_msg:fail　发送失败
          case 'send_app_msg:fail':
          default:
            callbacks.fail && callbacks.fail(resp);
            break;
        }
        // 无论成功失败都会执行的回调
        callbacks.all && callbacks.all(resp);
      });
    };
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
      if (callbacks.async && callbacks.ready) {
        window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
        if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
          window["_wx_loadedCb_"] = new Function();
        }
        callbacks.dataLoaded = function (newData) {
          window["_wx_loadedCb_"](newData);
          sendAppMessage(newData);
        };
        // 然后就绪
        callbacks.ready && callbacks.ready(argv);
      } else {
        // 就绪状态
        callbacks.ready && callbacks.ready(argv);
        sendAppMessage(data);
      }
    });
  }
 
  /**
   * 分享到腾讯微博
   * @param    {Object}  data    待分享的信息
   * @p-config  {String}  link    链接地址
   * @p-config  {String}  desc    描述
   *
   * @param    {Object}  callbacks 相关回调方法
   * @p-config  {Boolean}  async          ready方法是否需要异步执行，默认false
   * @p-config  {Function} ready(argv)       就绪状态
   * @p-config  {Function} dataLoaded(data)    数据加载完成后调用，async为true时有用，也可以为空
   * @p-config  {Function} cancel(resp)  取消
   * @p-config  {Function} fail(resp)   失败
   * @p-config  {Function} confirm(resp)  成功
   * @p-config  {Function} all(resp)    无论成功失败都会执行的回调
   */
  function weixinShareWeibo(data, callbacks) {
    callbacks = callbacks || {};
    var shareWeibo = function (theData) {
      WeixinJSBridge.invoke('shareWeibo', {
        "content":theData.desc,
        "url":theData.link
      }, function (resp) {
        switch (resp.err_msg) {
          // share_weibo:cancel 用户取消
          case 'share_weibo:cancel':
            callbacks.cancel && callbacks.cancel(resp);
            break;
          // share_weibo:confirm 发送成功
          case 'share_weibo:confirm':
          case 'share_weibo:ok':
            callbacks.confirm && callbacks.confirm(resp);
            break;
          // share_weibo:fail　发送失败
          case 'share_weibo:fail':
          default:
            callbacks.fail && callbacks.fail(resp);
            break;
        }
        // 无论成功失败都会执行的回调
        callbacks.all && callbacks.all(resp);
      });
    };
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
      if (callbacks.async && callbacks.ready) {
        window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
        if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
          window["_wx_loadedCb_"] = new Function();
        }
        callbacks.dataLoaded = function (newData) {
          window["_wx_loadedCb_"](newData);
          shareWeibo(newData);
        };
        // 然后就绪
        callbacks.ready && callbacks.ready(argv);
      } else {
        // 就绪状态
        callbacks.ready && callbacks.ready(argv);
        shareWeibo(data);
      }
    });
  }
 
 
  /**
   * 新的分享接口
   * @param    {Object}  data    待分享的信息
   * @p-config  {String}  appId   公众平台的appId（服务号可用）
   * @p-config  {String}  imgUrl   图片地址
   * @p-config  {String}  link    链接地址
   * @p-config  {String}  desc    描述
   * @p-config  {String}  title   分享的标题
   *
   * @param    {Object}  callbacks 相关回调方法
   * @p-config  {Boolean}  async          ready方法是否需要异步执行，默认false
   * @p-config  {Function} ready(argv,shareTo)       就绪状态
   * @p-config  {Function} dataLoaded(data)    数据加载完成后调用，async为true时有用，也可以为空
   * @p-config  {Function} cancel(resp,shareTo)  取消
   * @p-config  {Function} fail(resp,shareTo)   失败
   * @p-config  {Function} confirm(resp,shareTo)  成功
   * @p-config  {Function} all(resp,shareTo)    无论成功失败都会执行的回调
   */
  function weixinGeneralShare(data, callbacks) {
    callbacks = callbacks || {};
    var generalShare = function (general,theData) {
 
      // 如果是分享到朋友圈，则需要把title和desc交换一下
      if(general.shareTo == 'timeline') {
        var title = theData.title;
        theData.title = theData.desc || title;
        theData.desc = title;
      }
 
      // 分享出去
      general.generalShare({
        "appid":theData.appId ? theData.appId : '',
        "img_url":theData.imgUrl,
        "link":theData.link,
        "desc":theData.desc,
        "title":theData.title,
        "img_width":"640",
        "img_height":"640"
      }, function (resp) {
        switch (resp.err_msg) {
          // general_share:cancel 用户取消
          case 'general_share:cancel':
            callbacks.cancel && callbacks.cancel(resp ,general.shareTo);
            break;
          // general_share:confirm 发送成功
          case 'general_share:confirm':
          case 'general_share:ok':
            callbacks.confirm && callbacks.confirm(resp ,general.shareTo);
            break;
          // general_share:fail　发送失败
          case 'general_share:fail':
          default:
            callbacks.fail && callbacks.fail(resp ,general.shareTo);
            break;
        }
        // 无论成功失败都会执行的回调
        callbacks.all && callbacks.all(resp ,general.shareTo);
      });
    };
    WeixinJSBridge.on('menu:general:share', function (general) {
      if (callbacks.async && callbacks.ready) {
        window["_wx_loadedCb_"] = callbacks.dataLoaded || new Function();
        if(window["_wx_loadedCb_"].toString().indexOf("_wx_loadedCb_") > 0) {
          window["_wx_loadedCb_"] = new Function();
        }
        callbacks.dataLoaded = function (newData) {
          window["_wx_loadedCb_"](newData);
          generalShare(general,newData);
        };
        // 然后就绪
        callbacks.ready && callbacks.ready(general,general.shareTo);
      } else {
        // 就绪状态
        callbacks.ready && callbacks.ready(general,general.shareTo);
        generalShare(general,data);
      }
    });
  }
 
  /**
   * 加关注（此功能只是暂时先加上，不过因为权限限制问题，不能用，如果你的站点是部署在*.qq.com下，也许可行）
   * @param    {String}  appWeixinId   微信公众号ID
   * @param    {Object}  callbacks    回调方法
   * @p-config  {Function} fail(resp)   失败
   * @p-config  {Function} confirm(resp)  成功
   */
  function addContact(appWeixinId,callbacks){
    callbacks = callbacks || {};
    WeixinJSBridge.invoke("addContact", {
      webtype: "1",
      username: appWeixinId
    }, function (resp) {
      var success = !resp.err_msg || "add_contact:ok" == resp.err_msg || "add_contact:added" == resp.err_msg;
      if(success) {
        callbacks.success && callbacks.success(resp);
      }else{
        callbacks.fail && callbacks.fail(resp);
      }
    })
  }
 
  /**
   * 调起微信Native的图片播放组件。
   * 这里必须对参数进行强检测，如果参数不合法，直接会导致微信客户端crash
   *
   * @param {String} curSrc 当前播放的图片地址
   * @param {Array} srcList 图片地址列表
   */
  function imagePreview(curSrc,srcList) {
    if(!curSrc || !srcList || srcList.length == 0) {
      return;
    }
    WeixinJSBridge.invoke('imagePreview', {
      'current' : curSrc,
      'urls' : srcList
    });
  }
 
  /**
   * 显示网页右上角的按钮
   */
  function showOptionMenu() {
    WeixinJSBridge.call('showOptionMenu');
  }
 
 
  /**
   * 隐藏网页右上角的按钮
   */
  function hideOptionMenu() {
    WeixinJSBridge.call('hideOptionMenu');
  }
 
  /**
   * 显示底部工具栏
   */
  function showToolbar() {
    WeixinJSBridge.call('showToolbar');
  }
 
  /**
   * 隐藏底部工具栏
   */
  function hideToolbar() {
    WeixinJSBridge.call('hideToolbar');
  }
 
  /**
   * 返回如下几种类型：
   *
   * network_type:wifi   wifi网络
   * network_type:edge   非wifi,包含3G/2G
   * network_type:fail   网络断开连接
   * network_type:wwan   2g或者3g
   *
   * 使用方法：
   * WeixinApi.getNetworkType(function(networkType){
   *
   * });
   *
   * @param callback
   */
  function getNetworkType(callback) {
    if (callback && typeof callback == 'function') {
      WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
        callback(e.err_msg);
      });
    }
  }
 
  /**
   * 关闭当前微信公众平台页面
   */
  function closeWindow() {
    WeixinJSBridge.call("closeWindow");
  }
 
  /**
   * 当页面加载完毕后执行，使用方法：
   * WeixinApi.ready(function(Api){
   *   // 从这里只用Api即是WeixinApi
   * });
   * @param readyCallback
   */
  function wxJsBridgeReady(readyCallback) {
    if (readyCallback && typeof readyCallback == 'function') {
      var Api = this;
      var wxReadyFunc = function () {
        readyCallback(Api);
      };
      if (typeof window.WeixinJSBridge == "undefined"){
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', wxReadyFunc, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', wxReadyFunc);
          document.attachEvent('onWeixinJSBridgeReady', wxReadyFunc);
        }
      }else{
        wxReadyFunc();
      }
    }
  }
 
  return {
    version     :"2.0",
    ready      :wxJsBridgeReady,
    shareToTimeline :weixinShareTimeline,
    shareToWeibo  :weixinShareWeibo,
    shareToFriend  :weixinSendAppMessage,
    generalShare  :weixinGeneralShare,
    addContact   :addContact,
    showOptionMenu :showOptionMenu,
    hideOptionMenu :hideOptionMenu,
    showToolbar   :showToolbar,
    hideToolbar   :hideToolbar,
    getNetworkType :getNetworkType,
    imagePreview  :imagePreview,
    closeWindow   :closeWindow
  };
})();
</script>
<script>
	var wxData = {
        "imgUrl":'http://www.baidufe.com/fe/blog/static/img/weixin-qrcode-2.jpg',
        "link":'http://www.baidufe.com',
        "desc":'大家好，我是Alien，Web前端&Android客户端码农，喜欢技术上的瞎倒腾！欢迎多交流',
        "title":"大家好，我是赵先烈"
    };
    WeixinApi.ready(function(api) {
    	Api.shareToFriend(wxData, function() {
    		alert(11);
    	});
    });
</script>

<?php echo widget('Home.Common')->footer(); ?>