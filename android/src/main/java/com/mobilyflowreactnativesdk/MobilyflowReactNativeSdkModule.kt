package com.mobilyflowreactnativesdk

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.mobilyflow.mobilypurchasesdk.Enums.MobilyEnvironment
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyException
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyPurchaseException
import com.mobilyflow.mobilypurchasesdk.Exceptions.MobilyTransferOwnershipException
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDK
import com.mobilyflow.mobilypurchasesdk.MobilyPurchaseSDKOptions
import com.mobilyflow.mobilypurchasesdk.Models.PurchaseOptions
import java.util.UUID

@ReactModule(name = MobilyflowReactNativeSdkModule.NAME)
class MobilyflowReactNativeSdkModule(reactContext: ReactApplicationContext) : NativeMobilyflowReactNativeSdkSpec(reactContext) {
  private val _sdkInstances = mutableMapOf<String, MobilyPurchaseSDK>()

  private fun throwError(error: Exception, promise: Promise) {
    when (error) {
      is MobilyException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      is MobilyPurchaseException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      is MobilyTransferOwnershipException -> promise.reject(error.type.ordinal.toString(), error.message, error)
      else -> promise.reject("-1", error.message, error)
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
      promise.resolve(products.toReadableArray())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getSubscriptionGroups(uuid: String, identifiers: ReadableArray?, promise: Promise) {
    try {
      val groups = _sdkInstances[uuid]!!.getSubscriptionGroups(identifiers.toStringArray(), false)
      promise.resolve(groups.toReadableArray())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getEntitlementForSubscription(uuid: String, subscriptionGroupId: String, promise: Promise) {
    try {
      val entitlement = _sdkInstances[uuid]!!.getEntitlementForSubscription(subscriptionGroupId)
      promise.resolve(entitlement.toReadableMap())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getEntitlement(uuid: String, productId: String, promise: Promise) {
    try {
      val entitlement = _sdkInstances[uuid]!!.getEntitlement(productId)
      promise.resolve(entitlement.toReadableMap())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun getEntitlements(uuid: String, productIds: ReadableArray, promise: Promise) {
    try {
      val entitlements = _sdkInstances[uuid]!!.getEntitlements(productIds.toStringArray()!!)
      promise.resolve(entitlements.toReadableArray())
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun requestTransferOwnership(uuid: String, promise: Promise) {
    try {
      val status = _sdkInstances[uuid]!!.requestTransferOwnership()
      promise.resolve(status.value)
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun openManageSubscription(uuid: String, promise: Promise) {
    try {
      _sdkInstances[uuid]!!.openManageSubscription()
      promise.resolve(0)
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun purchaseProduct(uuid: String, productId: String, options: ReadableMap?, promise: Promise) {
    try {
      if (reactApplicationContext.currentActivity == null) {
        throw MobilyException(MobilyException.Type.UNKNOWN_ERROR)
      }

      val sdk = _sdkInstances[uuid]!!

      val purchaseOptions = PurchaseOptions()
      val offerId = options?.getString("offerId")

      val product = sdk.getProducts(null, false).find { x -> x.id == productId }
      if (product == null) {
        throw MobilyPurchaseException(MobilyPurchaseException.Type.PRODUCT_UNAVAILABLE)
      }

      if (offerId != null) {
        if (product.subscriptionProduct!!.baseOffer.id == offerId) {
          purchaseOptions.setOffer(product.subscriptionProduct!!.baseOffer)
        } else if (product.subscriptionProduct!!.freeTrial?.id == offerId) {
          purchaseOptions.setOffer(product.subscriptionProduct!!.freeTrial)
        } else {
          val offer = product.subscriptionProduct!!.promotionalOffers.find { x -> x.id == offerId }
          if (offer != null) {
            purchaseOptions.setOffer(offer)
          }
        }
      }

      sdk.purchaseProduct(reactApplicationContext.currentActivity!!, product, purchaseOptions)
    } catch (error: Exception) {
      throwError(error, promise)
    }
  }

  override fun sendDiagnotic(uuid: String) {
      _sdkInstances[uuid]!!.sendDiagnostic()
  }

  override fun getStoreCountry(uuid: String, promise: Promise) {
    /*try {
      val status = _sdkInstances[uuid]!!.getS()
      promise.resolve(status.value)
    } catch (error: Exception) {
      throwError(error, promise)
    }*/
    // TODO
    return promise.resolve("FRA")
  }

  companion object {
    const val NAME = "MobilyflowReactNativeSdk"
  }
}
