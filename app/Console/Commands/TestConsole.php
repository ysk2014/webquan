<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestConsole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:name {user} {--queue=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'test description.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info($this->argument('user'));
        $this->error($this->option('queue'));
    }
}
