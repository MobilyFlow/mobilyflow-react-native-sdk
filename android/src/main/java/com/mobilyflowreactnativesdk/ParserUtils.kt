package com.mobilyflowreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.format
import org.json.JSONArray
import org.json.JSONObject
import kotlin.reflect.full.isSubclassOf
import kotlin.reflect.full.memberProperties

/**
 * Take a value and return String, Int, Double, Boolean, ReadableArray or ReadableMap
 */
private fun getJsonRawValue(value: Any?): Any? {
  when (value) {
    null -> return null
    is String -> return value
    is Int -> return value
    is Double -> return value
    is Boolean -> return value
    is ReadableArray -> return value
    is ReadableMap -> return value
    is LocalDateTime -> return value.format(LocalDateTime.Formats.ISO) + 'Z'
    is Map<*, *> -> return value.toReadableMap()
    is JSONObject -> return value.toReadableMap()
    is Collection<*> -> return value.toReadableArray()
    is JSONArray -> return value.toReadableArray()
    else -> {
      if (value::class.isSubclassOf(Enum::class)) {
        val enumValue = value::class.memberProperties.find { x -> x.name == "value" }
        if (enumValue != null) {
          val rawValue = enumValue.call(value)
          return getJsonRawValue(rawValue)
        } else {
          return value.toString()
        }
      } else {
        return value.toReadableMap()
      }
    }
  }
}

private fun WritableMap.put(key: String, value: Any?) {
  when (val rawValue = getJsonRawValue(value)) {
    null -> this.putNull(key)
    is String -> this.putString(key, rawValue)
    is Int -> this.putInt(key, rawValue)
    is Double -> this.putDouble(key, rawValue)
    is Boolean -> this.putBoolean(key, rawValue)
    is ReadableArray -> this.putArray(key, rawValue)
    is ReadableMap -> this.putMap(key, rawValue)
    else -> throw IllegalArgumentException("Unsupported type: ${value!!::class.simpleName}")
  }
}

private fun WritableArray.push(value: Any?) {
  when (val rawValue = getJsonRawValue(value)) {
    null -> this.pushNull()
    is String -> this.pushString(rawValue)
    is Int -> this.pushInt(rawValue)
    is Double -> this.pushDouble(rawValue)
    is Boolean -> this.pushBoolean(rawValue)
    is ReadableArray -> this.pushArray(rawValue)
    is ReadableMap -> this.pushMap(rawValue)
    else -> throw IllegalArgumentException("Unsupported type: ${value!!::class.simpleName}")
  }
}

fun Any?.toReadableMap(): ReadableMap? {
  if (this == null) {
    return null
  } else {
    val map = Arguments.createMap()
    this::class.memberProperties.forEach { property ->
      val key = property.name
      val value = property.getter.call(this)
      map.put(key, value)
    }
    return map
  }
}

fun Map<*, *>.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()
  forEach { (key, value) ->
    if (key is String) {
      map.put(key, value)
    }
  }
  return map
}

fun JSONObject.toReadableMap(): ReadableMap {
  val map = Arguments.createMap()

  for (key in this.keys()) {
    map.put(key, this.get(key))
  }

  return map
}

fun Collection<*>.toReadableArray(): ReadableArray {
  val array = Arguments.createArray()
  forEach { item ->
    array.push(item)
  }
  return array
}

fun JSONArray.toReadableArray(): ReadableArray {
  val array = Arguments.createArray()

  for (index in 0..<this.length()) {
    array.push(this.get(index))
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
  return if (this.hasKey(key) && !this.isNull(key)) {
    this.getBoolean(key)
  } else {
    defaultValue
  }
}

fun ReadableMap.optInt(key: String, defaultValue: Int? = null): Int? {
  return if (this.hasKey(key) && !this.isNull(key)) {
    this.getInt(key)
  } else {
    defaultValue
  }
}
