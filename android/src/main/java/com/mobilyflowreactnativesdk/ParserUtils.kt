package com.mobilyflowreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import kotlin.reflect.full.memberProperties

private fun putInMap(map: WritableMap, key: String, value: Any?) {
  return when (value) {
    is String -> map.putString(key, value)
    is Int -> map.putInt(key, value)
    is Double -> map.putDouble(key, value)
    is Boolean -> map.putBoolean(key, value)
    is List<*> -> map.putArray(key, value.toReadableArray())
    is Map<*, *> -> map.putMap(key, value.toReadableMap())
    null -> map.putNull(key)
    else -> throw IllegalArgumentException("Unsupported type: ${value::class.simpleName}")
  }
}

fun Any.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  this::class.memberProperties.forEach { property ->
    val key = property.name
    val value = property.getter.call(this)
    putInMap(map, key, value)
  }
  return map
}

fun Map<*, *>.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  forEach { (key, value) ->
    if (key is String) {
      putInMap(map, key, value)
    }
  }
  return map
}

fun List<*>.toReadableArray(): ReadableArray {
  val array = Arguments.createArray()
  forEach { item ->
    when (item) {
      is String -> array.pushString(item)
      is Int -> array.pushInt(item)
      is Double -> array.pushDouble(item)
      is Boolean -> array.pushBoolean(item)
      is List<*> -> array.pushArray(item.toReadableArray())
      is Map<*, *> -> array.pushMap(item.toReadableMap())
      null -> array.pushNull()
      else -> throw IllegalArgumentException("Unsupported type in array: ${item::class.simpleName}")
    }
  }
  return array
}

fun ReadableArray?.toStringArray(): Array<String>? {
  return if (this != null) {
    Array(this.size()) { i -> this.getString(i) ?: "" }
  } else {
    null
  }
}

fun ReadableMap.optBoolean(key: String, defaultValue: Boolean? = false): Boolean? {
  return if (this.hasKey(key)) {
    this.getBoolean(key)
  } else {
    defaultValue
  }
}
