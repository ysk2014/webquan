<?php
namespace App\Services;

use ArrayAccess;

/**
* 参数容器
*
* @author ysk
*/
abstract class AbstractParam implements ArrayAccess
{
	/**
	* 用来保存传进来的值
	*
	* @var array
	*/
	protected $attributes = [];

	/**
	* 判断参数是否定义
	*
	* @param mixed $offset
	* @return bool
	*/
    public function offsetExists($offset)
    {
        return isset($this->$offset);
    }

	/**
	* 返回参数的值
	*
	* @param mixed $offset
	* @return bool
	*/
    public function offsetGet($offset)
    {
        return $this->$offset;
    }

	/**
	* 为参数的赋值
	*
	* @param mixed $offset
	* @param mixed $value
	* @return void
	*/
    public function offsetSet($offset,$value)
    {
        $this->$offset = $value;
    }

    /**
     * 删除一个元素
     *
     * @param  mixed  $offset
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->$offset);
    }

    /**
     * 返回该类的数组形式
     *
     * @return array
     */
    public function toArray()
    {
        return $this->attributes;
    }

    /**
     * Dynamically access container services.
     *
     * @param  string  $key
     * @return mixed
     */
    public function __get($key)
    {
        return $this[$key];
    }

    /**
     * magic function
     */
    public function __isset($key)
    {
        return isset($this[$key]) and isset($this->attributes[$key]);
    }

    /**
     * magic function
     */
    public function __unset($key)
    {
        if(isset($this->attributes[$key])) unset($this->attributes[$key], $this[$key]);
    }

    /**
     * 把值赋予到参数容器中
     * 
     * @param array $attributes 传入的值数值
     */
    public function setAttributes($attributes)
    {
        $reflection = new \ReflectionClass($this);
        $attributes = (array) $attributes;
        foreach($attributes as $key => $value)
        {
            if($reflection->hasProperty($key) and ! isset($this->attributes[$key]))
            {
                $this->$key = $this->attributes[$key] = $value;
            }
        }
        return $this;
    }
}
?>