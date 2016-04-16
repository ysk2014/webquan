<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Redis;

class SendNews extends Event
{
    use SerializesModels;

    /**
     * 消息内容
     * 
     * @var string
     */
    public $content;

    /**
     * 消息发送对象
     * 
     * @var intval
     */
    public $rid;

    /**
     * 消息类型
     * 
     * @var intval  默认为0--评论消息，
     */
    public $type=0;

    /**
     * 消息状态
     * 
     * @var intval  默认为0-未读，
     */
    public $status=0;

    /**
     * 消息添加时间
     * 
     * @var intval  默认为0-未读，
     */
    public $addtime;

    /**
     * redis缓存链接
     * 
     * @var object
     */
    private $redis;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        if( ! $this->redis) $this->redis = Redis::connection();

        $article = $this->redis->hgetall('article_'.$data['aid']);

        $this->addtime = $data['addtime']; 

        $this->content = '<a href="/user/'.$data['uid'].'">'.$data['username'].'</a>'; 
        if (isset($data['reply'])) {
            $this->rid = $data['reply']['id'];
            $this->content .= '在<a href="/article/'.$data['aid'].'">《'.$article['title'].'》</a> 回复了你';
        } else {
            $this->rid = $article['uid']; 
            $this->content .= '在<a href="/article/'.$data['aid'].'">《'.$article['title'].'》</a> 评论了你';
        }
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
