<?php

namespace App\Exceptions;

use Exception, Request;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Debug\ExceptionHandler as SymfonyDisplayer;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if($e instanceof ModelNotFoundException){

            if($request->ajax()){

                return response()->json(['ret'=>'ERROR','msg'=>'Model Not Found'],404);

            }

            return response()->view('errors.404',[],404);

        }

        if($e instanceof TokenMismatchException){

            if($request->ajax()){

                return response()->json(['ret'=>'ERROR','msg'=>'Token Mismatch'],400);

            }

            \Flash::error('表单重复提交，请刷新页面再试！');

            return \Redirect::back()->withInput()->withErrors('表单重复提交，请刷新页面再试！');

        }

        return parent::render($request, $e);
    }



}
