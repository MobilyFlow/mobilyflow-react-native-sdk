package com.mobilyflowreactnativesdk

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.mobilyflow.mobilypurchasesdk.Enums.MobilyEnvironment
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyException
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDK
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDKOptions
import java.util.UUID

@ReactModule(name = MobilyflowReactNativeSdkModule.NAME)
class MobilyflowReactNativeSdkModule(reactContext: ReactApplicationContext) : NativeMobilyflowReactNativeSdkSpec(reactContext) {
  private val _sdkInstances = mutableMapOf<String, MobilyPurchaseSDK>()

  private fun throwError(error: Exception, promise: Promise) {
    when (error) {
      is MobilyException -> promise.reject(error.type.toString(), error.message, error) // TODO: Error code
      else -> promise.reject("0", error.message, error)
    }
  }

  override fun getName(): String {
    return NAME
  }

  override fun instantiate(appId: String, apiKey: String, environment: Double, options: ReadableMap?): String {
    val uuid = UUID.randomUUID().toString()

    var realOptions: MobilyPurchaseSDKOptions? = null
    if (options != null) {
      realOptions = MobilyPurchaseSDKOptions(
        options.getArray("languages").toStringArray(),
        options.optBoolean("debug"),
        options.getString("apiURL")
      )
    }

    val realEnvironment = MobilyEnvironment.entries.find { x -> x.value == environment.toInt() }
    val sdk = MobilyPurchaseSDK(reactApplicationContext, appId, apiKey, realEnvironment!!, realOptions)
    _sdkInstances[uuid] = sdk

    return uuid
  }

  override fun close(uuid: String) {
    _sdkInstances[uuid]!!.close()
  }

  override fun login(uuid: String, externalId: String, promise: Promise) {
    try {
      _sdkInstances[uuid]!!.login(externalId)
      promise.resolve(1)
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getProducts(uuid: String, identifiers: ReadableArray?, promise: Promise) {
    try {
      val products = _sdkInstances[uuid]!!.getProducts(identifiers.toStringArray(), false)
      promise.resolve(products.toReadableMap())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getSubscriptionGroups(uuid: String?, identifiers: ReadableArray?, promise: Promise?) {

  }

  override fun getEntitlementForSubscription(uuid: String?, subscriptionGroupId: String?, promise: Promise?) {

  }

  override fun getEntitlement(uuid: String?, productId: String?, promise: Promise?) {

  }

  override fun getEntitlements(uuid: String?, productIds: ReadableArray?, promise: Promise?) {

  }

  override fun requestTransferOwnership(uuid: String?, promise: Promise?) {

  }

  override fun openManageSubscription(uuid: String?, promise: Promise?) {

  }

  override fun purchaseProduct(uuid: String?, productId: String?, options: ReadableMap?, promise: Promise?) {

  }

  override fun sendDiagnotic(uuid: String?) {

  }

  override fun getStoreCountry(uuid: String?, promise: Promise?) {

  }

  companion object {
    const val NAME = "MobilyflowReactNativeSdk"
  }
}
