<?php

namespace App\Listeners;

use App\Events\SendNews as EventsSendNews;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Models\Home\News as NewsModel;
use Request;

class SendNews
{
    private $model;

    /**
     * Create the event handler.
     *
     * @return void
     */
    public function __construct()
    {
        $this->model = new NewsModel();
    }

    /**
     * Handle the event.
     *
     * @param  EventsActionLog  $event
     * @return void
     */
    public function handle(EventsSendNews $event)
    {
        $newsData['rid'] = $event->rid;
        $newsData['content'] = $event->content;
        $newsData['type'] = $event->type;
        $newsData['addtime'] = $event->addtime;
        $newsData['status'] = $event->status;
        $this->model->addNew($newsData);
    }
}